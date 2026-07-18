/**
 * Visible digital signature appearance generation.
 *
 * The built-in layouts mirror the useful rendering modes from OpenPDF and can
 * optionally produce its legacy n0-n4 Form XObject layer stack. A provider
 * callback remains available for fully custom main appearance streams.
 */

import type { PDF } from "#src/api/pdf";
import type { Operator } from "#src/content/operators";
import { drawRectangleOps, setFillColor } from "#src/drawing/operations";
import { serializeOperators } from "#src/drawing/serialize";
import { layoutText } from "#src/drawing/text-layout";
import type { FontInput } from "#src/drawing/types";
import type { EmbeddedFont } from "#src/fonts/embedded-font";
import {
  getEncodingForStandard14,
  getStandard14BasicMetrics,
  isWinAnsiStandard14,
  type Standard14FontName,
} from "#src/fonts/standard-14";
import { black, type Color } from "#src/helpers/colors";
import {
  beginText,
  clip,
  concatMatrix,
  endPath,
  endText,
  paintXObject,
  popGraphicsState,
  pushGraphicsState,
  rectangle,
  setFont,
  setTextMatrix,
  showText,
} from "#src/helpers/operators";
import type { PDFImage } from "#src/images/pdf-image";
import { PdfArray } from "#src/objects/pdf-array";
import { PdfDict } from "#src/objects/pdf-dict";
import { PdfName } from "#src/objects/pdf-name";
import { PdfNumber } from "#src/objects/pdf-number";
import { PdfStream } from "#src/objects/pdf-stream";
import { PdfString } from "#src/objects/pdf-string";

import { parseCertificate } from "./formats/common";
import {
  SignatureError,
  type SignatureAppearanceImage,
  type SignatureAppearanceLegacyLayersOptions,
  type SignatureAppearanceOptions,
  type SignatureAppearanceProviderContext,
} from "./types";

/** Metadata used by the appearance generator. */
export interface SignatureAppearanceMetadata {
  signerName: string;
  signingTime: Date;
  reason?: string;
  location?: string;
  contactInfo?: string;
}

/** Per-widget rendering context. */
export interface SignatureAppearanceRenderContext {
  pageIndex: number;
  width: number;
  height: number;
  rotation: 0 | 90 | 180 | 270;
}

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ResolvedAssets {
  graphic?: PDFImage;
  backgroundImage?: PDFImage;
}

const DEFAULT_FONT: Standard14FontName = "Helvetica";
const LEGACY_LAYER_SIZE = 100;
const LEGACY_TOP_SECTION = 0.3;
const LEGACY_UNKNOWN_APPEARANCE = `% DSUnknown
q
1 G
1 g
0.1 0 0 0.1 9 0 cm
0 J 0 j 4 M []0 d
1 i${" "}
0 g
313 292 m
313 404 325 453 432 529 c
478 561 504 597 504 645 c
504 736 440 760 391 760 c
286 760 271 681 265 626 c
265 625 l
100 625 l
100 828 253 898 381 898 c
451 898 679 878 679 650 c
679 555 628 499 538 435 c
488 399 467 376 467 292 c
313 292 l
h
308 214 170 -164 re
f
0.44 G
1.2 w
1 1 0.4 rg
287 318 m
287 430 299 479 406 555 c
451 587 478 623 478 671 c
478 762 414 786 365 786 c
260 786 245 707 239 652 c
239 651 l
74 651 l
74 854 227 924 355 924 c
425 924 653 904 653 676 c
653 581 602 525 512 461 c
462 425 441 402 441 318 c
287 318 l
h
282 240 170 -164 re
B
Q
`;

interface ResolvedLegacyLayersOptions {
  statusText: string;
  statusTextColor: Color;
}

/** Generate built-in or provider-based visible signature appearances. */
export class SignatureAppearanceGenerator {
  private constructor(
    private readonly pdf: PDF,
    private readonly options: SignatureAppearanceOptions,
    private readonly metadata: SignatureAppearanceMetadata,
    private readonly assets: ResolvedAssets,
  ) {}

  /** Resolve image assets and validate appearance options. */
  static create(
    pdf: PDF,
    options: SignatureAppearanceOptions,
    metadata: SignatureAppearanceMetadata,
  ): SignatureAppearanceGenerator {
    validateOptions(options);

    const assets: ResolvedAssets = {};

    if (options.graphic) {
      assets.graphic = resolveImage(pdf, options.graphic);
    }

    if (options.backgroundImage) {
      assets.backgroundImage = resolveImage(pdf, options.backgroundImage);
    }

    return new SignatureAppearanceGenerator(pdf, options, metadata, assets);
  }

  /** Generate a Form XObject for one widget placement. */
  async generate(context: SignatureAppearanceRenderContext): Promise<PdfStream> {
    let mainAppearance: PdfStream;

    if (this.options.provider) {
      const providerContext: SignatureAppearanceProviderContext = {
        ...context,
        ...this.metadata,
        createStream: (data, resources) => {
          const stream = new PdfStream([], data);

          if (resources) {
            stream.set("Resources", resources);
          }

          return stream;
        },
      };
      const stream = await this.options.provider(providerContext);

      mainAppearance = normalizeAppearanceStream(stream, context);
    } else {
      mainAppearance = this.generateBuiltIn(context);
    }

    const legacyLayers = resolveLegacyLayersOptions(this.options.legacyLayers);

    return legacyLayers
      ? this.generateLegacyLayers(context, mainAppearance, legacyLayers)
      : mainAppearance;
  }

  private generateBuiltIn(context: SignatureAppearanceRenderContext): PdfStream {
    const { width, height } = context;
    const padding = this.options.padding ?? 2;
    const font = this.options.font ?? DEFAULT_FONT;
    const resources = buildResources(font, this.assets);
    const legacyLayers = resolveLegacyLayersOptions(this.options.legacyLayers);
    const ops = [pushGraphicsState(), rectangle(0, 0, width, height), clip(), endPath()];

    if (this.options.backgroundColor) {
      ops.push(
        ...drawRectangleOps({
          x: 0,
          y: 0,
          width,
          height,
          fillColor: this.options.backgroundColor,
        }),
      );
    }

    if (this.assets.backgroundImage) {
      drawImage(
        ops,
        this.assets.backgroundImage,
        { x: 0, y: 0, width, height },
        "ImBg",
        this.options.backgroundImageFit ?? "contain",
      );
    }

    let contentBox = insetBox({ x: 0, y: 0, width, height }, padding);

    if (legacyLayers) {
      const statusHeight = contentBox.height * 0.3;

      contentBox = {
        x: contentBox.x,
        y: contentBox.y,
        width: contentBox.width,
        height: Math.max(0, contentBox.height - statusHeight - padding),
      };
    } else if (this.options.statusText) {
      const statusHeight = contentBox.height * 0.3;
      const statusBox = {
        x: contentBox.x,
        y: contentBox.y + contentBox.height - statusHeight,
        width: contentBox.width,
        height: statusHeight,
      };

      this.drawText(ops, this.options.statusText, statusBox, font);
      contentBox = {
        x: contentBox.x,
        y: contentBox.y,
        width: contentBox.width,
        height: Math.max(0, contentBox.height - statusHeight - padding),
      };
    }

    const mode = this.options.mode ?? "description";
    const description = this.options.text ?? buildDefaultDescription(this.metadata);

    if (mode === "description") {
      this.drawText(ops, description, contentBox, font);
    }

    if (mode === "name-and-description") {
      const [nameBox, descriptionBox] = splitBox(contentBox, 0.5, padding);

      this.drawText(ops, this.metadata.signerName, nameBox, font);
      this.drawText(ops, description, descriptionBox, font);
    }

    if (mode === "graphic-and-description" && this.assets.graphic) {
      const [graphicBox, descriptionBox] = splitBox(
        contentBox,
        this.options.graphicRatio ?? 0.5,
        padding,
      );

      drawImage(ops, this.assets.graphic, graphicBox, "Im0", "contain");
      this.drawText(ops, description, descriptionBox, font);
    }

    if (mode === "graphic" && this.assets.graphic) {
      drawImage(ops, this.assets.graphic, contentBox, "Im0", "contain");
    }

    if (this.options.borderColor && (this.options.borderWidth ?? 1) > 0) {
      const borderWidth = this.options.borderWidth ?? 1;
      const inset = borderWidth / 2;

      ops.push(
        ...drawRectangleOps({
          x: inset,
          y: inset,
          width: Math.max(0, width - borderWidth),
          height: Math.max(0, height - borderWidth),
          strokeColor: this.options.borderColor,
          strokeWidth: borderWidth,
        }),
      );
    }

    ops.push(popGraphicsState());

    const stream = new PdfStream([], serializeOperators(ops));
    stream.set("Resources", resources);

    return normalizeAppearanceStream(stream, context);
  }

  /** Wrap the main n2 appearance in the historical n0-n4/FRM structure. */
  private generateLegacyLayers(
    context: SignatureAppearanceRenderContext,
    mainAppearance: PdfStream,
    options: ResolvedLegacyLayersOptions,
  ): PdfStream {
    const registry = this.pdf.context.registry;
    const n0 = createLegacyLayer("% DSBlank\n", [0, 0, 100, 100]);
    const n1 = createLegacyLayer(LEGACY_UNKNOWN_APPEARANCE, [0, 0, 100, 100]);
    // OpenPDF leaves n3 blank. The PDF viewer, not the document author,
    // calculates validity and may draw a status icon at runtime.
    const n3 = createLegacyLayer("% DSBlank\n", [0, 0, 100, 100]);
    const n4 = this.createStatusLayer(context, options);
    const layerResources = new PdfDict();

    setLegacyFormGeometry(mainAppearance, [0, 0, context.width, context.height]);

    layerResources.set("n0", registry.register(n0));
    layerResources.set("n1", registry.register(n1));
    layerResources.set("n2", registry.register(mainAppearance));
    layerResources.set("n3", registry.register(n3));
    layerResources.set("n4", registry.register(n4));

    const scaledSize = Math.min(context.width, context.height) * 0.9;
    // OpenPDF's content writer serializes this transform with two decimals.
    const validityScale = Math.round((scaledSize / LEGACY_LAYER_SIZE) * 100) / 100;
    const validityX = (context.width - scaledSize) / 2;
    const validityY = (context.height - scaledSize) / 2;
    const form = new PdfStream(
      [],
      serializeOperators([
        ...paintLegacyLayer("n0", 1, 0, 0, 1, 0, 0),
        ...paintLegacyLayer("n1", validityScale, 0, 0, validityScale, validityX, validityY),
        ...paintLegacyLayer("n2", 1, 0, 0, 1, 0, 0),
        ...paintLegacyLayer("n3", validityScale, 0, 0, validityScale, validityX, validityY),
        ...paintLegacyLayer("n4", 1, 0, 0, 1, 0, 0),
      ]),
    );

    form.set("Resources", PdfDict.of({ XObject: layerResources }));
    setLegacyFormGeometry(form, [0, 0, context.width, context.height]);

    const formRef = registry.register(form);
    const appearance = new PdfStream(
      [],
      serializeOperators(paintLegacyLayer("FRM", 1, 0, 0, 1, 0, 0)),
    );

    appearance.set("Resources", PdfDict.of({ XObject: PdfDict.of({ FRM: formRef }) }));
    setLegacyFormGeometry(appearance, [0, 0, context.width, context.height]);

    return appearance;
  }

  /** Create the n4 validity status text. */
  private createStatusLayer(
    context: SignatureAppearanceRenderContext,
    options: ResolvedLegacyLayersOptions,
  ): PdfStream {
    const { width, height } = context;
    const padding = this.options.padding ?? 2;
    const statusBottom = height - height * LEGACY_TOP_SECTION;
    const ops: Operator[] = [];

    this.drawText(
      ops,
      options.statusText,
      {
        x: padding,
        y: statusBottom + padding,
        width: Math.max(0, width - padding * 2),
        height: Math.max(0, height * LEGACY_TOP_SECTION - padding * 2),
      },
      this.options.font ?? DEFAULT_FONT,
      options.statusTextColor,
      "left",
    );

    const stream = new PdfStream([], serializeOperators(ops));

    stream.set("Resources", buildResources(this.options.font ?? DEFAULT_FONT, {}));
    setLegacyFormGeometry(stream, [0, statusBottom, width, height]);

    return stream;
  }

  private drawText(
    ops: Operator[],
    text: string,
    box: Box,
    font: FontInput,
    color: Color = this.options.textColor ?? black,
    align: "left" | "center" | "right" = this.options.textAlign ?? "left",
  ): void {
    if (!text || box.width <= 0 || box.height <= 0) {
      return;
    }

    const fontSize = resolveFontSize(text, box, font, this.options);
    const lineHeight = fontSize * 1.2;
    const layout = layoutText(text, font, fontSize, box.width, lineHeight);
    const ascent = getAscent(font, fontSize);

    ops.push(pushGraphicsState());
    ops.push(rectangle(box.x, box.y, box.width, box.height));
    ops.push(clip());
    ops.push(endPath());
    ops.push(setFillColor(color));
    ops.push(beginText());
    ops.push(setFont("/F0", fontSize));

    for (let index = 0; index < layout.lines.length; index++) {
      const line = layout.lines[index];

      if (!line.text) {
        continue;
      }

      let x = box.x;

      if (align === "center") {
        x += (box.width - line.width) / 2;
      }

      if (align === "right") {
        x += box.width - line.width;
      }

      const y = box.y + box.height - ascent - index * lineHeight;

      ops.push(setTextMatrix(1, 0, 0, 1, x, y));
      ops.push(showText(encodeText(line.text, font)));
    }

    ops.push(endText());
    ops.push(popGraphicsState());
  }
}

/** Extract a human-readable signer name from a DER X.509 certificate. */
export function extractCertificateCommonName(certificateDer: Uint8Array): string {
  try {
    const certificate = parseCertificate(certificateDer);
    const commonName = certificate.subject.typesAndValues.find(value => value.type === "2.5.4.3");
    const value = commonName?.value.valueBlock.value;

    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  } catch {
    // A custom signer may expose a certificate format we cannot parse. The
    // appearance remains usable through the explicit signerName option.
  }

  return "Unknown signer";
}

function resolveLegacyLayersOptions(
  value: SignatureAppearanceOptions["legacyLayers"],
): ResolvedLegacyLayersOptions | null {
  if (!value) {
    return null;
  }

  const options: SignatureAppearanceLegacyLayersOptions = value === true ? {} : value;

  return {
    statusText: options.statusText ?? "Signature Not Verified",
    statusTextColor: options.statusTextColor ?? black,
  };
}

function createLegacyLayer(content: string, bbox: [number, number, number, number]): PdfStream {
  const stream = new PdfStream([], new TextEncoder().encode(content));

  setLegacyFormGeometry(stream, bbox);

  return stream;
}

function setLegacyFormGeometry(stream: PdfStream, bbox: [number, number, number, number]): void {
  stream.set("Type", PdfName.of("XObject"));
  stream.set("Subtype", PdfName.of("Form"));
  stream.set("FormType", PdfNumber.of(1));
  stream.set("BBox", new PdfArray(bbox.map(value => PdfNumber.of(value))));
  stream.set("Matrix", new PdfArray([1, 0, 0, 1, 0, 0].map(value => PdfNumber.of(value))));

  if (!stream.has("Resources")) {
    stream.set("Resources", new PdfDict());
  }
}

function paintLegacyLayer(
  name: string,
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
): Operator[] {
  return [
    pushGraphicsState(),
    concatMatrix(a, b, c, d, e, f),
    paintXObject(name),
    popGraphicsState(),
  ];
}

function validateOptions(options: SignatureAppearanceOptions): void {
  const mode = options.mode ?? "description";

  if ((mode === "graphic" || mode === "graphic-and-description") && !options.graphic) {
    throw new SignatureError(
      "INVALID_APPEARANCE",
      `Signature appearance mode "${mode}" requires a graphic`,
    );
  }

  if (
    options.graphicRatio !== undefined &&
    !(options.graphicRatio > 0 && options.graphicRatio < 1)
  ) {
    throw new SignatureError(
      "INVALID_APPEARANCE",
      "Signature appearance graphicRatio must be greater than 0 and less than 1",
    );
  }

  for (const [name, value] of [
    ["padding", options.padding],
    ["borderWidth", options.borderWidth],
  ] as const) {
    if (value !== undefined && (!Number.isFinite(value) || value < 0)) {
      throw new SignatureError(
        "INVALID_APPEARANCE",
        `Signature appearance ${name} must be a finite non-negative number`,
      );
    }
  }

  if (
    options.fontSize !== undefined &&
    (!Number.isFinite(options.fontSize) || options.fontSize < 0)
  ) {
    throw new SignatureError(
      "INVALID_APPEARANCE",
      "Signature appearance fontSize must be a finite non-negative number",
    );
  }

  for (const [name, value] of [
    ["minFontSize", options.minFontSize],
    ["maxFontSize", options.maxFontSize],
  ] as const) {
    if (value !== undefined && (!Number.isFinite(value) || value <= 0)) {
      throw new SignatureError(
        "INVALID_APPEARANCE",
        `Signature appearance ${name} must be a finite positive number`,
      );
    }
  }

  const minFontSize = options.minFontSize ?? 1;
  const maxFontSize = options.maxFontSize ?? 12;

  if (minFontSize > maxFontSize) {
    throw new SignatureError(
      "INVALID_APPEARANCE",
      "Signature appearance minFontSize cannot exceed maxFontSize",
    );
  }
}

function resolveImage(pdf: PDF, image: SignatureAppearanceImage): PDFImage {
  if (image instanceof Uint8Array) {
    return pdf.embedImage(image);
  }

  return image;
}

function buildResources(font: FontInput, assets: ResolvedAssets): PdfDict {
  const fonts = new PdfDict();

  if (typeof font === "string") {
    const fontDict = PdfDict.of({
      Type: PdfName.of("Font"),
      Subtype: PdfName.of("Type1"),
      BaseFont: PdfName.of(font),
    });

    if (isWinAnsiStandard14(font)) {
      fontDict.set("Encoding", PdfName.of("WinAnsiEncoding"));
    }

    fonts.set("F0", fontDict);
  } else {
    fonts.set("F0", font.ref);
  }

  const resources = PdfDict.of({ Font: fonts });
  const xObjects = new PdfDict();

  if (assets.graphic) {
    xObjects.set("Im0", assets.graphic.ref);
  }

  if (assets.backgroundImage) {
    xObjects.set("ImBg", assets.backgroundImage.ref);
  }

  if (xObjects.size > 0) {
    resources.set("XObject", xObjects);
  }

  return resources;
}

function normalizeAppearanceStream(
  stream: PdfStream,
  context: SignatureAppearanceRenderContext,
): PdfStream {
  stream.set("Type", PdfName.of("XObject"));
  stream.set("Subtype", PdfName.of("Form"));
  stream.set("FormType", PdfNumber.of(1));

  if (!stream.has("BBox")) {
    stream.set(
      "BBox",
      new PdfArray([
        PdfNumber.of(0),
        PdfNumber.of(0),
        PdfNumber.of(context.width),
        PdfNumber.of(context.height),
      ]),
    );
  }

  if (!stream.has("Resources")) {
    stream.set("Resources", new PdfDict());
  }

  return stream;
}

function drawImage(
  ops: Operator[],
  image: PDFImage,
  box: Box,
  resourceName: string,
  fit: "fill" | "contain" | "cover",
): void {
  if (box.width <= 0 || box.height <= 0) {
    return;
  }

  let width = box.width;
  let height = box.height;

  if (fit !== "fill") {
    const scale =
      fit === "cover"
        ? Math.max(box.width / image.width, box.height / image.height)
        : Math.min(box.width / image.width, box.height / image.height);

    width = image.width * scale;
    height = image.height * scale;
  }

  const x = box.x + (box.width - width) / 2;
  const y = box.y + (box.height - height) / 2;

  ops.push(pushGraphicsState());

  if (fit === "cover") {
    ops.push(rectangle(box.x, box.y, box.width, box.height));
    ops.push(clip());
    ops.push(endPath());
  }

  ops.push(concatMatrix(width, 0, 0, height, x, y));
  ops.push(paintXObject(resourceName));
  ops.push(popGraphicsState());
}

function splitBox(box: Box, primaryRatio: number, gap: number): [Box, Box] {
  if (box.height <= box.width) {
    const usableWidth = Math.max(0, box.width - gap);
    const primaryWidth = usableWidth * primaryRatio;

    return [
      { x: box.x, y: box.y, width: primaryWidth, height: box.height },
      {
        x: box.x + primaryWidth + gap,
        y: box.y,
        width: usableWidth - primaryWidth,
        height: box.height,
      },
    ];
  }

  const usableHeight = Math.max(0, box.height - gap);
  const primaryHeight = usableHeight * primaryRatio;

  return [
    {
      x: box.x,
      y: box.y + usableHeight - primaryHeight + gap,
      width: box.width,
      height: primaryHeight,
    },
    {
      x: box.x,
      y: box.y,
      width: box.width,
      height: usableHeight - primaryHeight,
    },
  ];
}

function insetBox(box: Box, inset: number): Box {
  return {
    x: box.x + inset,
    y: box.y + inset,
    width: Math.max(0, box.width - inset * 2),
    height: Math.max(0, box.height - inset * 2),
  };
}

function resolveFontSize(
  text: string,
  box: Box,
  font: FontInput,
  options: SignatureAppearanceOptions,
): number {
  if (options.fontSize && options.fontSize > 0) {
    return options.fontSize;
  }

  const minSize = options.minFontSize ?? 1;
  const maxSize = options.maxFontSize ?? 12;
  let low = minSize;
  let high = maxSize;
  let best = minSize;

  for (let iteration = 0; iteration < 24; iteration++) {
    const size = (low + high) / 2;
    const lineHeight = size * 1.2;
    const layout = layoutText(text, font, size, box.width, lineHeight);
    const fitsWidth = layout.lines.every(line => line.width <= box.width + 0.001);
    const fitsHeight = layout.height <= box.height + 0.001;

    if (fitsWidth && fitsHeight) {
      best = size;
      low = size;
    } else {
      high = size;
    }
  }

  return best;
}

function getAscent(font: FontInput, fontSize: number): number {
  if (typeof font === "string") {
    const metrics = getStandard14BasicMetrics(font);

    return metrics ? (metrics.ascent * fontSize) / 1000 : fontSize * 0.8;
  }

  const descriptor = font.descriptor;

  return descriptor ? (descriptor.ascent * fontSize) / 1000 : fontSize * 0.8;
}

function encodeText(text: string, font: FontInput): PdfString {
  if (typeof font === "string") {
    const encoding = getEncodingForStandard14(font);
    const encoded: number[] = [];
    const fallbackCode = encoding.getCode(0x3f) ?? 0x3f;

    for (const character of text) {
      const codePoint = character.codePointAt(0);

      if (codePoint === undefined || !encoding.canEncode(character)) {
        encoded.push(fallbackCode);
      } else {
        encoded.push(encoding.getCode(codePoint) ?? 0);
      }
    }

    return PdfString.fromBytes(new Uint8Array(encoded));
  }

  return encodeEmbeddedText(text, font);
}

function encodeEmbeddedText(text: string, font: EmbeddedFont): PdfString {
  if (!font.canEncode(text)) {
    const character = font.getUnencodableCharacters(text)[0] ?? "?";

    throw new SignatureError(
      "INVALID_APPEARANCE",
      `Signature appearance font cannot encode character "${character}"`,
    );
  }

  const glyphs = font.encodeTextToGids(text);
  const bytes = new Uint8Array(glyphs.length * 2);

  for (let index = 0; index < glyphs.length; index++) {
    bytes[index * 2] = (glyphs[index] >> 8) & 0xff;
    bytes[index * 2 + 1] = glyphs[index] & 0xff;
  }

  return PdfString.fromBytes(bytes);
}

function buildDefaultDescription(metadata: SignatureAppearanceMetadata): string {
  const lines = [
    `Digitally signed by ${metadata.signerName}`,
    `Date: ${formatAppearanceDate(metadata.signingTime)}`,
  ];

  if (metadata.reason) {
    lines.push(`Reason: ${metadata.reason}`);
  }

  if (metadata.location) {
    lines.push(`Location: ${metadata.location}`);
  }

  return lines.join("\n");
}

function formatAppearanceDate(date: Date): string {
  return date
    .toISOString()
    .replace("T", " ")
    .replace(/\.\d{3}Z$/, " UTC");
}
