/**
 * PDFSignature - High-level API for signing PDF documents.
 *
 * Handles the complete signing ceremony including:
 * - Finding or creating signature fields
 * - Creating signature dictionaries with placeholders
 * - Building CMS signatures (PKCS7 or CAdES)
 * - Patching ByteRange and Contents after save
 * - Adding DSS for long-term validation (B-LT)
 * - Adding document timestamps for archival (B-LTA)
 */

import { SignatureField } from "#src/document/forms/fields";
import { hexToBytes } from "#src/helpers/buffer.ts";
import { formatPdfDate } from "#src/helpers/format.ts";
import { generateUniqueName } from "#src/helpers/strings";
import { PdfArray } from "#src/objects/pdf-array";
import { PdfDict } from "#src/objects/pdf-dict";
import { PdfName } from "#src/objects/pdf-name";
import { PdfNumber } from "#src/objects/pdf-number";
import { PdfRef } from "#src/objects/pdf-ref";
import { PdfString } from "#src/objects/pdf-string";
import {
  extractCertificateCommonName,
  SignatureAppearanceGenerator,
  type SignatureAppearanceMetadata,
} from "#src/signatures/appearance";
import { CAdESDetachedBuilder } from "#src/signatures/formats/cades-detached";
import { PKCS7DetachedBuilder } from "#src/signatures/formats/pkcs7-detached";
import type { CMSFormatBuilder } from "#src/signatures/formats/types";
import { DSSBuilder, type LtvData, LtvDataGatherer } from "#src/signatures/ltv";
import {
  calculateByteRange,
  createByteRangePlaceholderObject,
  createContentsPlaceholderObject,
  DEFAULT_PLACEHOLDER_SIZE,
  extractSignedBytes,
  findPlaceholders,
  patchByteRange,
  patchContents,
} from "#src/signatures/placeholder";
import { DefaultRevocationProvider } from "#src/signatures/revocation";
import {
  type ArchivalDataOptions,
  type ArchivalDataResult,
  type DigestAlgorithm,
  type PAdESLevel,
  type RevocationProvider,
  type SignatureAppearanceOptions,
  type SignatureAppearancePlacement,
  type SignatureAppearanceRect,
  SignatureError,
  type SignOptions,
  type SignResult,
  type SignWarning,
  type SubFilter,
  type TimestampAuthority,
  type TimestampOptions,
  type TimestampResult,
  type ValidationDataOptions,
  type ValidationDataResult,
} from "#src/signatures/types";
import { escapePdfString, hashData } from "#src/signatures/utils";

import type { PDF } from "./pdf";

function refsEqual(left: PdfRef, right: PdfRef): boolean {
  return left.objectNumber === right.objectNumber && left.generation === right.generation;
}

function refKey(ref: PdfRef): string {
  return `${ref.objectNumber} ${ref.generation}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper functions (moved from sign.ts)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Resolved and validated sign options.
 */
interface ResolvedSignOptions {
  digestAlgorithm: DigestAlgorithm;
  subFilter: SubFilter;
  estimatedSize: number;
  signingTime: Date;
  signer: SignOptions["signer"];
  reason?: string;
  location?: string;
  contactInfo?: string;
  fieldName?: string;
  appearance?: SignatureAppearanceOptions;
  timestampAuthority?: SignOptions["timestampAuthority"];
  longTermValidation: boolean;
  revocationProvider?: RevocationProvider;
  archivalTimestamp: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// PDFSignature class
// ─────────────────────────────────────────────────────────────────────────────

/**
 * PDFSignature handles the signing process for a PDF document.
 *
 * This class uses the reload pattern: after each signing operation,
 * the PDF is saved incrementally and reloaded to update internal state.
 *
 * @example
 * ```typescript
 * const pdf = await PDF.load(bytes);
 * const signature = new PDFSignature(pdf);
 *
 * // Sign with full options
 * const result = await signature.sign({
 *   signer,
 *   reason: "Approved",
 *   level: "B-LT",
 *   timestampAuthority,
 * });
 *
 * // PDF is now updated, get final bytes
 * const signedBytes = await pdf.save();
 * ```
 */
export class PDFSignature {
  constructor(private pdf: PDF) {}

  /**
   * Sign the PDF document.
   *
   * Creates a digital signature using PAdES (PDF Advanced Electronic Signatures)
   * format. The signature is embedded as an incremental update, preserving any
   * existing signatures.
   *
   * After signing, the PDF instance is automatically reloaded with the signed
   * bytes, so you can continue using it or call save() to get the final bytes.
   *
   * @param options Signing options including signer, reason, location, etc.
   * @returns Sign result with warnings (bytes are in the PDF instance)
   */
  async sign(options: SignOptions): Promise<SignResult> {
    const warnings: SignWarning[] = [];

    // Resolve and validate options
    const resolved = this.resolveOptions(options);

    // Check for MDP violations
    const mdpWarning = this.checkMdpViolation();

    if (mdpWarning) {
      warnings.push(mdpWarning);
    }

    // Get first page reference (for widget annotation placement)
    const firstPageRef = this.pdf.context.pages.getPage(0);

    if (!firstPageRef) {
      throw new SignatureError("NO_PAGES", "Document has no pages - cannot create signature field");
    }

    // Create signature dictionary with placeholders
    const signatureDict = PdfDict.of({
      Type: PdfName.of("Sig"),
      Filter: PdfName.of("Adobe.PPKLite"),
      SubFilter: PdfName.of(resolved.subFilter),
      ByteRange: createByteRangePlaceholderObject(),
      Contents: createContentsPlaceholderObject(resolved.estimatedSize),
    });

    // Include /M (signing time) - the timestamp provides authoritative proof,
    // but /M is still useful as a fallback display time.
    signatureDict.set("M", PdfString.fromString(formatPdfDate(resolved.signingTime)));

    if (resolved.reason) {
      signatureDict.set("Reason", PdfString.fromString(escapePdfString(resolved.reason)));
    }

    if (resolved.location) {
      signatureDict.set("Location", PdfString.fromString(escapePdfString(resolved.location)));
    }

    if (resolved.contactInfo) {
      signatureDict.set("ContactInfo", PdfString.fromString(escapePdfString(resolved.contactInfo)));
    }

    const signatureRef = this.pdf.context.registry.register(signatureDict);

    // Find or create signature field
    const signatureField = this.prepareSignatureField({
      fieldName: resolved.fieldName,
      valueRef: signatureRef,
      namePrefix: "Signature_",
      reuseFirstEmpty: true,
    });

    await this.configureSignatureField(signatureField, firstPageRef, resolved.appearance, {
      signerName:
        resolved.appearance?.signerName ??
        extractCertificateCommonName(resolved.signer.certificate),
      signingTime: resolved.signingTime,
      reason: resolved.reason,
      location: resolved.location,
      contactInfo: resolved.contactInfo,
    });

    // Save incrementally to get bytes with placeholders
    const pdfBytes = await this.pdf.save({ incremental: true });

    // Find placeholders and calculate ByteRange
    const placeholders = findPlaceholders(pdfBytes);
    const byteRange = calculateByteRange(pdfBytes, placeholders);

    // Patch ByteRange
    patchByteRange(pdfBytes, placeholders, byteRange);

    // Extract bytes to sign and hash them
    const signedBytes = extractSignedBytes(pdfBytes, byteRange);
    const documentHash = await hashData(signedBytes, resolved.digestAlgorithm);

    // Build CMS signature
    const formatBuilder = this.getFormatBuilder(resolved.subFilter);

    // Create the CMS structure (signs the document)
    // Note: PDFBox includes signingTime even when using a timestamp.
    // The timestamp provides the authoritative time, but signingTime
    // may be needed for Adobe to recognize the timestamp token.
    const signedData = await formatBuilder.create({
      signer: resolved.signer,
      documentHash,
      digestAlgorithm: resolved.digestAlgorithm,
      signingTime: resolved.signingTime,
    });

    // If timestamp authority is configured, add timestamp token
    if (resolved.timestampAuthority) {
      // Hash the signature value for timestamping
      const signatureValue = signedData.getSignatureValue();
      const signatureHash = await hashData(signatureValue, resolved.digestAlgorithm);

      // Request timestamp from TSA
      const timestampToken = await resolved.timestampAuthority.timestamp(
        signatureHash,
        resolved.digestAlgorithm,
      );

      // Add timestamp token as unsigned attribute
      signedData.addTimestampToken(timestampToken);
    }

    // Serialize to DER
    const signatureDer = signedData.toDER();

    // Patch Contents with signature
    const { paddedHex } = patchContents(pdfBytes, placeholders, signatureDer);

    // Reload PDF with signed bytes
    await this.pdf.reload(pdfBytes);

    // Gather LTV data if requested
    let ltvData: LtvData | undefined;

    if (resolved.longTermValidation) {
      // Create padded signature bytes (for correct VRI hash computation).
      // The VRI key is the SHA-1 hash of the FULL /Contents value as stored
      // in the PDF, including zero padding - not just the raw CMS bytes.
      // See ETSI EN 319 142-2 and PDF 2.0 spec section 12.8.4.3.
      const gatherer = new LtvDataGatherer({
        revocationProvider: resolved.revocationProvider ?? new DefaultRevocationProvider(),
      });
      ltvData = await gatherer.gather(hexToBytes(paddedHex));

      // Convert gatherer warnings to sign warnings
      for (const warning of ltvData.warnings) {
        warnings.push({ code: warning.code, message: warning.message });
      }
    }

    // If LTV data is present, add DSS as second incremental update
    if (ltvData) {
      await this.addDss(ltvData);

      // For B-LTA, add document timestamp after DSS, then add DSS for the timestamp
      if (resolved.archivalTimestamp && resolved.timestampAuthority) {
        const paddedTimestampBytes = await this.placeDocumentTimestamp({
          timestampAuthority: resolved.timestampAuthority,
          digestAlgorithm: resolved.digestAlgorithm,
          estimatedSize: DEFAULT_PLACEHOLDER_SIZE,
        });

        // Add DSS for the document timestamp's certificate chain.
        // This is more proactive than EU DSS (which waits for future LTA extensions),
        // but ensures the timestamp is fully LTV-enabled from the start.
        const docTsLtvData = await this.gatherTimestampLtvData(
          paddedTimestampBytes,
          resolved.revocationProvider,
          warnings,
        );

        if (docTsLtvData) {
          await this.addDss(docTsLtvData);
        }
      }
    }

    // Get final bytes from the reloaded PDF
    const finalBytes = await this.pdf.save({ incremental: true });

    return {
      bytes: finalBytes,
      warnings,
    };
  }

  /**
   * Find or create the /FT /Sig field that will hold a signature or document
   * timestamp value. Widget configuration happens separately so existing
   * visible fields can be preserved or replaced intentionally.
   *
   * Lookup behavior:
   * - `fieldName` provided + matches an unsigned signature field -> reuse
   * - `fieldName` provided + matches a signed signature field    -> throw
   * - `fieldName` provided + matches a non-signature field       -> throw
   * - `fieldName` provided + no match                            -> create
   * - `fieldName` omitted + `reuseFirstEmpty`                    -> reuse first
   *   empty signature field, or create with `<namePrefix>N`
   * - `fieldName` omitted otherwise                              -> create with
   *   `<namePrefix>N`
   */
  private prepareSignatureField(options: {
    fieldName?: string;
    valueRef: PdfRef;
    namePrefix: string;
    reuseFirstEmpty: boolean;
  }): SignatureField {
    const { fieldName, valueRef, namePrefix, reuseFirstEmpty } = options;

    const form = this.pdf.getOrCreateForm();

    // Collect existing field names so we can both look up a named field
    // and generate a unique fallback name when none is supplied.
    const existingNames = new Set<string>();

    let signatureField: SignatureField | undefined;

    for (const field of form.getFields()) {
      existingNames.add(field.name);

      // If requested name matches an existing field
      if (fieldName && field.name === fieldName) {
        if (!(field instanceof SignatureField)) {
          throw new SignatureError(
            "FIELD_NOT_SIGNATURE",
            `Field "${fieldName}" exists but is not a signature field`,
          );
        }

        if (field.isSigned()) {
          throw new SignatureError(
            "FIELD_ALREADY_SIGNED",
            `Signature field "${fieldName}" is already signed`,
          );
        }

        signatureField = field;
        break;
      }

      // If no name requested, optionally reuse the first empty signature field
      if (!fieldName && reuseFirstEmpty && field instanceof SignatureField && !field.isSigned()) {
        signatureField = field;
        break;
      }
    }

    if (!signatureField) {
      // PDFForm handles registry registration, /Fields, and /SigFlags 3.
      signatureField = form.createSignatureField(
        fieldName ?? generateUniqueName(existingNames, namePrefix),
      );
    }

    // Set signature value
    signatureField.getDict().set("V", valueRef);

    return signatureField;
  }

  /**
   * Configure an invisible field, preserve an existing visible field, or
   * generate visible signature widgets and appearances.
   */
  private async configureSignatureField(
    field: SignatureField,
    firstPageRef: PdfRef,
    appearance?: SignatureAppearanceOptions,
    metadata?: SignatureAppearanceMetadata,
  ): Promise<void> {
    const existingWidgets = field.getWidgets();

    if (!appearance) {
      if (existingWidgets.length > 0) {
        this.lockWidgets(existingWidgets.map(widget => widget.dict));

        return;
      }

      this.configureInvisibleWidget(field, firstPageRef);

      return;
    }

    const appearanceMetadata = metadata ?? {
      signerName: "Document timestamp",
      signingTime: new Date(),
    };
    const generator = SignatureAppearanceGenerator.create(this.pdf, appearance, appearanceMetadata);

    if (!appearance.placements) {
      await this.updateExistingWidgetAppearances(field, generator);

      return;
    }

    const placements = this.resolveAppearancePlacements(appearance.placements);

    this.replaceWidgets(field);

    const fieldRef = field.getRef();

    if (!fieldRef) {
      throw new SignatureError(
        "INVALID_APPEARANCE",
        `Signature field "${field.name}" must be an indirect object`,
      );
    }

    const fieldDict = field.getDict();
    const kids = new PdfArray();
    fieldDict.set("Kids", kids);

    for (const placement of placements) {
      const page = this.pdf.getPage(placement.pageIndex);

      if (!page) {
        throw new SignatureError(
          "INVALID_APPEARANCE",
          `Signature appearance page index ${placement.pageIndex} does not exist`,
        );
      }

      const { x, y, width, height } = placement.rect;
      const widgetDict = PdfDict.of({
        Type: PdfName.of("Annot"),
        Subtype: PdfName.of("Widget"),
        Rect: new PdfArray([
          PdfNumber.of(x),
          PdfNumber.of(y),
          PdfNumber.of(x + width),
          PdfNumber.of(y + height),
        ]),
        P: page.ref,
        Parent: fieldRef,
        F: PdfNumber.of(132),
      });
      const stream = await generator.generate({
        pageIndex: placement.pageIndex,
        width,
        height,
        rotation: page.rotation,
      });
      const streamRef = this.pdf.context.registry.register(stream);

      widgetDict.set("AP", PdfDict.of({ N: streamRef }));

      const widgetRef = this.pdf.context.registry.register(widgetDict);

      kids.push(widgetRef);
      this.addAnnotationToPage(page.dict, widgetRef);
    }
  }

  /** Preserve existing positions while replacing each widget's normal appearance. */
  private async updateExistingWidgetAppearances(
    field: SignatureField,
    generator: SignatureAppearanceGenerator,
  ): Promise<void> {
    const widgets = field.getWidgets();

    if (widgets.length === 0) {
      throw new SignatureError(
        "INVALID_APPEARANCE",
        "Signature appearance placements are required when the field has no visible widgets",
      );
    }

    for (const widget of widgets) {
      if (widget.width <= 0 || widget.height <= 0) {
        throw new SignatureError(
          "INVALID_APPEARANCE",
          "Signature appearance placements are required when an existing widget is invisible",
        );
      }

      const pageIndex = this.findWidgetPageIndex(widget.ref, widget.dict);

      if (pageIndex < 0) {
        throw new SignatureError(
          "INVALID_APPEARANCE",
          `Could not resolve the page for signature field "${field.name}"`,
        );
      }

      const page = this.pdf.getPage(pageIndex);

      if (!page) {
        throw new SignatureError(
          "INVALID_APPEARANCE",
          `Signature appearance page index ${pageIndex} does not exist`,
        );
      }

      const stream = await generator.generate({
        pageIndex,
        width: widget.width,
        height: widget.height,
        rotation: page.rotation,
      });

      widget.setNormalAppearance(stream);
      this.lockWidgets([widget.dict]);
    }
  }

  /** Convert a field without widgets into the merged invisible widget model. */
  private configureInvisibleWidget(field: SignatureField, pageRef: PdfRef): void {
    const fieldDict = field.getDict();
    const fieldRef = field.getRef();

    fieldDict.delete("Kids");
    fieldDict.set("Type", PdfName.of("Annot"));
    fieldDict.set("Subtype", PdfName.of("Widget"));
    fieldDict.set("F", PdfNumber.of(132));
    fieldDict.set("P", pageRef);
    fieldDict.set(
      "Rect",
      new PdfArray([PdfNumber.of(0), PdfNumber.of(0), PdfNumber.of(0), PdfNumber.of(0)]),
    );

    if (!fieldRef) {
      return;
    }

    const page = this.pdf.getPages().find(candidate => refsEqual(candidate.ref, pageRef));

    if (page) {
      this.addAnnotationToPage(page.dict, fieldRef);
    }
  }

  /** Remove old merged/separate widget entries before installing placements. */
  private replaceWidgets(field: SignatureField): void {
    const fieldDict = field.getDict();
    const refs = new Set<string>();
    const dicts = new Set<PdfDict>();

    for (const widget of field.getWidgets()) {
      dicts.add(widget.dict);

      if (widget.ref) {
        refs.add(refKey(widget.ref));
      }
    }

    if (fieldDict.has("Rect")) {
      dicts.add(fieldDict);
      const fieldRef = field.getRef();

      if (fieldRef) {
        refs.add(refKey(fieldRef));
      }
    }

    const registry = this.pdf.context.registry;
    const resolve = registry.resolve.bind(registry);

    for (const page of this.pdf.getPages()) {
      const annots = page.dict.getArray("Annots", resolve);

      if (!annots) {
        continue;
      }

      for (let i = annots.length - 1; i >= 0; i--) {
        const item = annots.at(i);
        const resolved = item instanceof PdfRef ? resolve(item) : item;

        if (
          (item instanceof PdfRef && refs.has(refKey(item))) ||
          (resolved instanceof PdfDict && dicts.has(resolved))
        ) {
          annots.remove(i);
        }
      }
    }

    fieldDict.delete("Type");
    fieldDict.delete("Subtype");
    fieldDict.delete("Rect");
    fieldDict.delete("P");
    fieldDict.delete("AP");
    fieldDict.delete("MK");
    fieldDict.delete("BS");
    fieldDict.delete("F");
    fieldDict.delete("Kids");
  }

  private resolveAppearancePlacements(
    placements: SignatureAppearancePlacement[],
  ): Array<{ pageIndex: number; rect: SignatureAppearanceRect }> {
    if (placements.length === 0) {
      throw new SignatureError(
        "INVALID_APPEARANCE",
        "Signature appearance placements cannot be empty",
      );
    }

    const result: Array<{ pageIndex: number; rect: SignatureAppearanceRect }> = [];
    const pageCount = this.pdf.getPageCount();

    for (const placement of placements) {
      this.validateAppearanceRect(placement.rect);

      if (placement.pageIndex === "all") {
        for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
          result.push({ pageIndex, rect: { ...placement.rect } });
        }

        continue;
      }

      if (
        !Number.isInteger(placement.pageIndex) ||
        placement.pageIndex < 0 ||
        placement.pageIndex >= pageCount
      ) {
        throw new SignatureError(
          "INVALID_APPEARANCE",
          `Signature appearance page index ${placement.pageIndex} is outside 0-${pageCount - 1}`,
        );
      }

      result.push({ pageIndex: placement.pageIndex, rect: { ...placement.rect } });
    }

    return result;
  }

  private validateAppearanceRect(rect: SignatureAppearanceRect): void {
    for (const [name, value] of Object.entries(rect)) {
      if (!Number.isFinite(value)) {
        throw new SignatureError(
          "INVALID_APPEARANCE",
          `Signature appearance rectangle ${name} must be finite`,
        );
      }
    }

    if (rect.width <= 0 || rect.height <= 0) {
      throw new SignatureError(
        "INVALID_APPEARANCE",
        "Signature appearance rectangle width and height must be greater than zero",
      );
    }
  }

  private findWidgetPageIndex(widgetRef: PdfRef | null, widgetDict: PdfDict): number {
    const pageRef = widgetDict.getRef("P");

    if (pageRef) {
      const index = this.pdf.getPages().findIndex(page => refsEqual(page.ref, pageRef));

      if (index >= 0) {
        return index;
      }
    }

    const registry = this.pdf.context.registry;
    const resolve = registry.resolve.bind(registry);

    return this.pdf.getPages().findIndex(page => {
      const annots = page.dict.getArray("Annots", resolve);

      if (!annots) {
        return false;
      }

      for (const item of annots) {
        if (widgetRef && item instanceof PdfRef && refsEqual(item, widgetRef)) {
          return true;
        }

        const resolved = item instanceof PdfRef ? resolve(item) : item;

        if (resolved === widgetDict) {
          return true;
        }
      }

      return false;
    });
  }

  private addAnnotationToPage(pageDict: PdfDict, annotationRef: PdfRef): void {
    const resolve = this.pdf.context.registry.resolve.bind(this.pdf.context.registry);
    let annots = pageDict.getArray("Annots", resolve);

    if (!annots) {
      annots = new PdfArray();
      pageDict.set("Annots", annots);
    }

    for (const item of annots) {
      if (item instanceof PdfRef && refsEqual(item, annotationRef)) {
        return;
      }
    }

    annots.push(annotationRef);
  }

  private lockWidgets(widgetDicts: PdfDict[]): void {
    for (const widgetDict of widgetDicts) {
      const flags = widgetDict.getNumber("F")?.value ?? 0;

      widgetDict.set("F", PdfNumber.of(flags | 132));
    }
  }

  /**
   * Check for MDP (certification signature) violations.
   */
  private checkMdpViolation(): SignWarning | null {
    const form = this.pdf.getForm();

    if (!form) {
      return null;
    }

    const fields = form.getFields();

    for (const field of fields) {
      if (field instanceof SignatureField && field.isSigned()) {
        const sigDict = field.getSignatureDict();

        if (sigDict) {
          const reference = sigDict.getArray("Reference");

          if (reference) {
            return {
              code: "MDP_VIOLATION",
              message: "Document has a certification signature that may restrict modifications",
            };
          }
        }
      }
    }

    return null;
  }

  /**
   * Add DSS (Document Security Store) for long-term validation.
   *
   * Embeds certificates, OCSP responses, and CRLs so signatures can be
   * validated even after certificates expire.
   *
   * After adding DSS, the PDF is reloaded with the updated bytes.
   *
   * @param ltvData The validation data to embed
   */
  async addDss(ltvData: LtvData): Promise<void> {
    const registry = this.pdf.context.registry;
    const catalogDict = this.pdf.getCatalog();

    // Load existing DSS for merging, or create new builder
    const dssBuilder = await DSSBuilder.fromCatalog(catalogDict, registry);

    // Add the LTV data (handles deduplication and VRI entries)
    await dssBuilder.addLtvData(ltvData);

    // Build and register DSS
    const dssRef = dssBuilder.build();
    catalogDict.set("DSS", dssRef);

    await this.saveAndReload();
  }

  /**
   * Save incrementally and reload the PDF instance so it reflects the saved
   * bytes. Skips the reload (a full re-parse) when nothing was written -
   * `save()` short-circuits and returns the current bytes in that case.
   */
  private async saveAndReload(): Promise<Uint8Array> {
    const hadChanges = this.pdf.hasChanges();
    const bytes = await this.pdf.save({ incremental: true });

    if (hadChanges) {
      await this.pdf.reload(bytes);
    }

    return bytes;
  }

  /**
   * Throw when the document cannot be saved incrementally.
   *
   * Timestamping and validation-data updates exist to extend documents that
   * already carry signatures. A silent fall back to a full rewrite would
   * change every byte offset and invalidate all existing signatures, so we
   * refuse up front instead.
   */
  private ensureIncrementalSave(operation: string): void {
    const blocker = this.pdf.canSaveIncrementally();

    if (blocker) {
      throw new SignatureError(
        "INCREMENTAL_SAVE_BLOCKED",
        `${operation} requires an incremental save to preserve existing signatures, ` +
          `but incremental save is not possible (${blocker}). ` +
          `Save the document with a full rewrite first, reload it, and retry.`,
      );
    }
  }

  /**
   * Add an archival document timestamp to the PDF.
   *
   * Creates a `/Type /DocTimeStamp` signature whose ByteRange covers the
   * entire current document, extending the validity of any prior signatures.
   * This is the timestamping step used at the end of a PAdES B-LTA flow
   * when signatures have been appended.
   *
   * Does **not** gather validation data for pre-existing signatures - use
   * `addValidationData()` for that, or `addArchivalData()` to do both in
   * one call.
   *
   * The PDF instance is reloaded with the updated bytes, so subsequent
   * calls (e.g. another `addTimestamp()`) operate on the timestamped state.
   *
   * If this method throws after partial progress (e.g. the TSA request
   * fails), the in-memory PDF instance may be out of sync with its bytes.
   * Discard the instance and reload from the last known-good bytes.
   *
   * @param options Timestamping options including the TSA
   * @returns The PDF bytes with the timestamp embedded, plus any warnings
   *
   * @example
   * ```typescript
   * // Append an archival timestamp to an already-signed PDF.
   * const tsa = new HttpTimestampAuthority("https://freetsa.org/tsr");
   * const { bytes } = await pdf.addTimestamp({
   *   timestampAuthority: tsa,
   *   longTermValidation: true,
   * });
   * ```
   */
  async addTimestamp(options: TimestampOptions): Promise<TimestampResult> {
    if (!options.timestampAuthority) {
      throw new SignatureError("INVALID_OPTIONS", "addTimestamp() requires a timestampAuthority");
    }

    this.ensureIncrementalSave("addTimestamp()");

    return this.addTimestampInternal(options);
  }

  /**
   * Implementation of `addTimestamp()`, with an optional shared gatherer so
   * `addArchivalData()` can reuse OCSP/CRL/AIA results fetched while
   * gathering validation data for existing signatures.
   */
  private async addTimestampInternal(
    options: TimestampOptions,
    gatherer?: LtvDataGatherer,
  ): Promise<TimestampResult> {
    const warnings: SignWarning[] = [];
    const digestAlgorithm = options.digestAlgorithm ?? "SHA-256";
    const estimatedSize = options.estimatedSize ?? DEFAULT_PLACEHOLDER_SIZE;
    const longTermValidation = options.longTermValidation ?? false;

    // Place the document timestamp (writes /DocTimeStamp dict, registers the
    // field with AcroForm, saves incrementally, requests the TSA token, and
    // patches the placeholders). Returns the padded /Contents bytes that
    // viewers use as the VRI key for the next DSS update.
    const paddedTimestampBytes = await this.placeDocumentTimestamp({
      timestampAuthority: options.timestampAuthority,
      digestAlgorithm,
      estimatedSize,
      fieldName: options.fieldName,
    });

    // Optionally embed LTV data for the timestamp's certificate chain so the
    // timestamp itself remains verifiable after the TSA certificate expires.
    if (longTermValidation) {
      const ltvData = await this.gatherTimestampLtvData(
        paddedTimestampBytes,
        options.revocationProvider,
        warnings,
        gatherer,
      );

      if (ltvData) {
        await this.addDss(ltvData);
      }
    }

    const bytes = await this.saveAndReload();

    return { bytes, warnings };
  }

  /**
   * Gather LTV (Long-Term Validation) data for every signed signature
   * field currently in the document and write it as a single DSS
   * incremental update.
   *
   * This upgrades the validation grade of every existing signature in the
   * document — turning B-T signatures into B-LT and ensuring document
   * timestamps have their TSA chain embedded for offline validation.
   * Validation data is fetched once per issuer (shared OCSP/CRL cache)
   * and merged with any existing DSS, deduplicating certs/OCSP/CRL.
   *
   * Does **not** add a timestamp - use `addTimestamp()` for that, or
   * `addArchivalData()` to do both in one call.
   *
   * Safe to call on a document with no signatures (returns
   * `signatureCount: 0`, no DSS update written).
   *
   * If this method throws after partial progress, the in-memory PDF
   * instance may be out of sync with its bytes. Discard the instance and
   * reload from the last known-good bytes.
   *
   * @example
   * ```typescript
   * // After every recipient has signed (B-T), upgrade all sigs to B-LT.
   * await pdf.addValidationData();
   * ```
   */
  async addValidationData(options: ValidationDataOptions = {}): Promise<ValidationDataResult> {
    this.ensureIncrementalSave("addValidationData()");

    // A single LtvDataGatherer so its OCSP / CRL cache is shared across
    // every signature we process.
    const gatherer = new LtvDataGatherer({
      revocationProvider: options.revocationProvider ?? new DefaultRevocationProvider(),
    });

    return this.addValidationDataInternal(gatherer);
  }

  /**
   * Implementation of `addValidationData()`, with the gatherer injected so
   * `addArchivalData()` can share one OCSP/CRL cache across both its
   * validation-data and timestamp steps.
   */
  private async addValidationDataInternal(
    gatherer: LtvDataGatherer,
  ): Promise<ValidationDataResult> {
    const warnings: SignWarning[] = [];

    // Collect signed signature fields - both regular signatures and
    // /Type /DocTimeStamp use a /FT /Sig field with a /V signature dict,
    // so SignatureField + isSigned() finds both. Without an AcroForm there
    // are no signature fields at all.
    const form = this.pdf.getForm();
    const signedFields = form?.getSignatureFields().filter(field => field.isSigned()) ?? [];

    if (signedFields.length === 0) {
      const bytes = await this.saveAndReload();

      return { bytes, warnings, signatureCount: 0 };
    }

    // Build a single DSSBuilder that merges with whatever DSS already
    // exists in the catalog.
    const catalogDict = this.pdf.getCatalog();
    const builder = await DSSBuilder.fromCatalog(catalogDict, this.pdf.context.registry);

    let processed = 0;

    for (const field of signedFields) {
      const sigDict = field.getSignatureDict();

      if (!sigDict) {
        warnings.push({
          code: "LTV_GATHER_FAILED",
          message: `Signature field "${field.name}" has no /V dictionary`,
        });
        continue;
      }

      // The padded /Contents bytes are exactly what viewers SHA-1 to
      // compute the VRI key, so we must pass the raw bytes including
      // zero padding (PdfString.bytes preserves that).
      const contents = sigDict.get("Contents");

      if (!(contents instanceof PdfString)) {
        warnings.push({
          code: "LTV_GATHER_FAILED",
          message: `Signature field "${field.name}" has no /Contents string`,
        });
        continue;
      }

      try {
        const ltvData = await gatherer.gather(contents.bytes);

        // Prefix gatherer warnings with the field name so callers can
        // tell which signature each warning is about.
        for (const w of ltvData.warnings) {
          warnings.push({
            code: w.code,
            message: `${field.name}: ${w.message}`,
          });
        }

        await builder.addLtvData(ltvData);
        processed += 1;
      } catch (error) {
        warnings.push({
          code: "LTV_GATHER_FAILED",
          message: `Could not gather LTV for "${field.name}": ${
            error instanceof Error ? error.message : String(error)
          }`,
        });
      }
    }

    // If nothing could be gathered, don't write an empty DSS revision.
    if (processed === 0) {
      const bytes = await this.saveAndReload();

      return { bytes, warnings, signatureCount: 0 };
    }

    // Write a single incremental update for the DSS, even if some
    // signatures failed - partial data is still useful for verifiers.
    const dssRef = builder.build();

    catalogDict.set("DSS", dssRef);

    const bytes = await this.saveAndReload();

    return { bytes, warnings, signatureCount: processed };
  }

  /**
   * Finalize the document with full PAdES B-LTA semantics in a single
   * call: gather LTV for every existing signature, write a DSS update,
   * add an archival `/DocTimeStamp`, then add a second DSS update for
   * the timestamp's own certificate chain.
   *
   * Equivalent to:
   *
   * ```typescript
   * await pdf.addValidationData({ revocationProvider });
   * await pdf.addTimestamp({
   *   timestampAuthority,
   *   longTermValidation: true,
   *   revocationProvider,
   *   ...
   * });
   * ```
   *
   * Use this as the last step of a multi-signer flow once every signer
   * has appended their signature and you want to seal the document.
   *
   * If this method throws after partial progress (e.g. the TSA request
   * fails after the DSS update was written), the in-memory PDF instance
   * may be out of sync with its bytes. Discard the instance and reload
   * from the last known-good bytes.
   *
   * @example
   * ```typescript
   * const tsa = new HttpTimestampAuthority("https://freetsa.org/tsr");
   * const { bytes, warnings } = await pdf.addArchivalData({
   *   timestampAuthority: tsa,
   * });
   * ```
   */
  async addArchivalData(options: ArchivalDataOptions): Promise<ArchivalDataResult> {
    if (!options.timestampAuthority) {
      throw new SignatureError(
        "INVALID_OPTIONS",
        "addArchivalData() requires a timestampAuthority",
      );
    }

    this.ensureIncrementalSave("addArchivalData()");

    const warnings: SignWarning[] = [];

    // One gatherer for both steps so OCSP/CRL responses fetched for the
    // existing signatures (typically including the same TSA chain the
    // archival timestamp will use) are not re-fetched in step 2.
    const gatherer = new LtvDataGatherer({
      revocationProvider: options.revocationProvider ?? new DefaultRevocationProvider(),
    });

    // Step 1: gather LTV for all existing signatures and write one DSS.
    const validation = await this.addValidationDataInternal(gatherer);

    warnings.push(...validation.warnings);

    // Step 2: add the archival timestamp and let addTimestamp handle the
    // timestamp's own LTV / second DSS write.
    const timestamp = await this.addTimestampInternal(
      {
        timestampAuthority: options.timestampAuthority,
        digestAlgorithm: options.digestAlgorithm,
        estimatedSize: options.estimatedSize,
        fieldName: options.fieldName,
        longTermValidation: true,
        revocationProvider: options.revocationProvider,
      },
      gatherer,
    );

    warnings.push(...timestamp.warnings);

    return {
      bytes: timestamp.bytes,
      warnings,
      signatureCount: validation.signatureCount,
    };
  }

  /**
   * Place a document timestamp in the PDF (shared by `addTimestamp()` and the
   * B-LTA path of `sign()`).
   *
   * Returns the padded timestamp bytes (raw token + zero padding to fill the
   * placeholder) so callers can compute the SHA-1 VRI key per ETSI EN 319
   * 142-2 / PDF 2.0 § 12.8.4.3.
   */
  private async placeDocumentTimestamp(options: {
    timestampAuthority: TimestampAuthority;
    digestAlgorithm: DigestAlgorithm;
    estimatedSize: number;
    fieldName?: string;
  }): Promise<Uint8Array> {
    const { timestampAuthority, digestAlgorithm, estimatedSize, fieldName } = options;

    const firstPageRef = this.pdf.context.pages.getPage(0);

    if (!firstPageRef) {
      throw new SignatureError("NO_PAGES", "Document has no pages - cannot create timestamp field");
    }

    // Build the /Type /DocTimeStamp dictionary with placeholders.
    const timestampDict = PdfDict.of({
      Type: PdfName.of("DocTimeStamp"),
      Filter: PdfName.of("Adobe.PPKLite"),
      SubFilter: PdfName.of("ETSI.RFC3161"),
      ByteRange: createByteRangePlaceholderObject(),
      Contents: createContentsPlaceholderObject(estimatedSize),
    });

    const timestampRef = this.pdf.context.registry.register(timestampDict);

    // Create a /FT /Sig field for the timestamp and register it with the
    // AcroForm so /SigFlags is set and the field is reachable from /Fields.
    //
    // Reusing a pre-allocated field (via fieldName) is the recommended
    // pattern for multi-signer AdES / DocMDP flows where the author locks
    // down the /AcroForm /Fields structure before the certification
    // signature is applied. Unlike signing, we never auto-reuse the first
    // empty signature field when no name is given - users typically reserve
    // those for actual signers, not timestamps.
    const timestampField = this.prepareSignatureField({
      fieldName,
      valueRef: timestampRef,
      namePrefix: "Timestamp_",
      reuseFirstEmpty: false,
    });

    await this.configureSignatureField(timestampField, firstPageRef);

    // Save incrementally so the file contains the new dict with placeholders.
    const pdfBytes = await this.pdf.save({ incremental: true });

    // Locate the placeholders, compute the ByteRange, and patch it in place.
    const placeholders = findPlaceholders(pdfBytes);
    const byteRange = calculateByteRange(pdfBytes, placeholders);

    patchByteRange(pdfBytes, placeholders, byteRange);

    // Hash everything outside the /Contents placeholder and request a token.
    const signedBytes = extractSignedBytes(pdfBytes, byteRange);
    const documentHash = await hashData(signedBytes, digestAlgorithm);
    const timestampToken = await timestampAuthority.timestamp(documentHash, digestAlgorithm);

    // Write the token into the /Contents placeholder.
    patchContents(pdfBytes, placeholders, timestampToken);

    // Reload so the PDF instance reflects the on-disk state.
    await this.pdf.reload(pdfBytes);

    // Return the padded /Contents bytes (raw token + trailing zeros) for VRI
    // hash computation. The VRI key is SHA-1 over the full /Contents value
    // as stored, including the zero padding - not just the raw token.
    const contentsSize = placeholders.contentsLength / 2; // hex chars -> bytes
    const paddedTimestampBytes = new Uint8Array(contentsSize);
    paddedTimestampBytes.set(timestampToken);

    return paddedTimestampBytes;
  }

  /**
   * Gather LTV data for a timestamp token.
   *
   * Used for B-LTA to add validation data for the document timestamp.
   *
   * When a shared gatherer is provided (by `addArchivalData()`), it is
   * reused so cached OCSP/CRL responses carry over. Timestamp tokens carry
   * no embedded signature timestamps, so the shared gatherer's
   * `gatherTimestampLtv: true` default has no effect here.
   */
  private async gatherTimestampLtvData(
    timestampToken: Uint8Array,
    revocationProvider: RevocationProvider | undefined,
    warnings: SignWarning[],
    sharedGatherer?: LtvDataGatherer,
  ): Promise<LtvData | null> {
    // Use LtvDataGatherer - timestamp tokens are just CMS structures
    const gatherer =
      sharedGatherer ??
      new LtvDataGatherer({
        revocationProvider: revocationProvider ?? new DefaultRevocationProvider(),
        gatherTimestampLtv: false, // Don't recurse for doc timestamps
      });

    try {
      const ltvData = await gatherer.gather(timestampToken);

      // Convert gatherer warnings to sign warnings
      for (const warning of ltvData.warnings) {
        warnings.push({ code: warning.code, message: warning.message });
      }

      // Check if we got any certificates
      if (ltvData.certificates.length === 0) {
        warnings.push({
          code: "DOC_TS_NO_CERTS",
          message: "No certificates found in document timestamp",
        });

        return null;
      }

      return ltvData;
    } catch (error) {
      warnings.push({
        code: "DOC_TS_LTV_FAILED",
        message: `Could not gather LTV data for document timestamp: ${error instanceof Error ? error.message : String(error)}`,
      });

      return null;
    }
  }

  /**
   * Validate and resolve sign options.
   */
  private resolveOptions(options: SignOptions): ResolvedSignOptions {
    // Apply PAdES level defaults
    if (options.level) {
      const levelDefaults = this.resolvePAdESLevel(options.level);

      options = { ...levelDefaults, ...options };
    }

    // Validate subFilter + level compatibility
    const subFilter = options.subFilter ?? "ETSI.CAdES.detached";

    if (options.level && subFilter === "adbe.pkcs7.detached") {
      throw new SignatureError(
        "INVALID_OPTIONS",
        "PAdES levels require ETSI.CAdES.detached subFilter",
      );
    }

    // Validate timestamp requirements
    if (
      (options.level === "B-T" || options.level === "B-LT" || options.level === "B-LTA") &&
      !options.timestampAuthority
    ) {
      throw new SignatureError(
        "INVALID_OPTIONS",
        `PAdES level ${options.level} requires a timestampAuthority`,
      );
    }

    return {
      signer: options.signer,
      digestAlgorithm: options.digestAlgorithm ?? "SHA-256",
      subFilter,
      estimatedSize: options.estimatedSize ?? DEFAULT_PLACEHOLDER_SIZE,
      signingTime: options.signingTime ?? new Date(),
      reason: options.reason,
      location: options.location,
      contactInfo: options.contactInfo,
      fieldName: options.fieldName,
      appearance: options.appearance,
      timestampAuthority: options.timestampAuthority,
      longTermValidation: options.longTermValidation ?? false,
      revocationProvider: options.revocationProvider,
      archivalTimestamp: options.archivalTimestamp ?? false,
    };
  }

  /**
   * Get the CMS format builder for the given subFilter.
   */
  private getFormatBuilder(subFilter: SubFilter): CMSFormatBuilder {
    switch (subFilter) {
      case "adbe.pkcs7.detached":
        return new PKCS7DetachedBuilder();
      case "ETSI.CAdES.detached":
        return new CAdESDetachedBuilder();
    }
  }

  /**
   * Resolve PAdES level to individual options.
   */
  private resolvePAdESLevel(level: PAdESLevel): Partial<SignOptions> {
    switch (level) {
      case "B-B":
        return {};
      case "B-T":
        return {}; // timestampAuthority must be provided separately
      case "B-LT":
        return { longTermValidation: true };
      case "B-LTA":
        return { longTermValidation: true, archivalTimestamp: true };
    }
  }
}
