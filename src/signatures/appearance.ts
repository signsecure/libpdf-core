/**
 * Visible digital signature appearance generation.
 *
 * The built-in layouts mirror the useful rendering modes from OpenPDF and can
 * optionally produce its legacy n0-n4 Form XObject layer stack. A provider
 * callback remains available for fully custom main appearance streams.
 */

import type { PDF } from "#src/api/pdf";
import type { Operator } from "#src/content/operators";
import {
  drawCircleOps,
  drawRectangleOps,
  setFillColor,
  wrapPathOps,
} from "#src/drawing/operations";
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
import { black, rgb, white, type Color } from "#src/helpers/colors";
import {
  beginText,
  clip,
  concatMatrix,
  endPath,
  endText,
  lineTo,
  moveTo,
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
const VALID_COLOR = rgb(0.12, 0.62, 0.29);
const UNKNOWN_COLOR = rgb(0.9, 0.62, 0.08);
const INVALID_COLOR = rgb(0.78, 0.16, 0.16);

interface ResolvedLegacyLayersOptions {
  validity: "unknown" | "valid" | "invalid";
  statusText: string;
  markColor: Color;
  statusTextColor: Color;
  showMark: boolean;
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
    const n0 = createBlankLayer(context);
    const n1 =
      options.validity === "unknown" && options.showMark
        ? this.createValidityLayer(context, options)
        : createBlankLayer(context);
    const n3 =
      options.validity !== "unknown" && options.showMark
        ? this.createValidityLayer(context, options)
        : createBlankLayer(context);
    const n4 = this.createStatusLayer(context, options);
    const layerResources = new PdfDict();

    layerResources.set("n0", registry.register(n0));
    layerResources.set("n1", registry.register(n1));
    layerResources.set("n2", registry.register(mainAppearance));
    layerResources.set("n3", registry.register(n3));
    layerResources.set("n4", registry.register(n4));

    const form = new PdfStream(
      [],
      serializeOperators([
        pushGraphicsState(),
        paintXObject("n0"),
        paintXObject("n1"),
        paintXObject("n2"),
        paintXObject("n3"),
        paintXObject("n4"),
        popGraphicsState(),
      ]),
    );

    form.set("Resources", PdfDict.of({ XObject: layerResources }));
    normalizeAppearanceStream(form, context);

    const formRef = registry.register(form);
    const appearance = new PdfStream(
      [],
      serializeOperators([pushGraphicsState(), paintXObject("FRM"), popGraphicsState()]),
    );

    appearance.set("Resources", PdfDict.of({ XObject: PdfDict.of({ FRM: formRef }) }));

    return normalizeAppearanceStream(appearance, context);
  }

  /** Create the n1/n3 validity mark inside the top status band. */
  private createValidityLayer(
    context: SignatureAppearanceRenderContext,
    options: ResolvedLegacyLayersOptions,
  ): PdfStream {
    const { width, height } = context;
    const padding = this.options.padding ?? 2;
    const diameter = validityMarkDiameter(width, height, padding);
    const radius = diameter / 2;
    const centerX = padding + radius;
    const centerY = height - height * 0.15;
    const ops: Operator[] = [
      pushGraphicsState(),
      rectangle(0, 0, width, height),
      clip(),
      endPath(),
    ];

    if (diameter > 0) {
      ops.push(
        ...drawCircleOps({
          cx: centerX,
          cy: centerY,
          radius,
          fillColor: options.markColor,
        }),
      );

      if (options.validity === "valid") {
        ops.push(
          ...wrapPathOps(
            [
              moveTo(centerX - radius * 0.5, centerY),
              lineTo(centerX - radius * 0.1, centerY - radius * 0.38),
              lineTo(centerX + radius * 0.58, centerY + radius * 0.45),
            ],
            {
              strokeColor: white,
              strokeWidth: Math.max(1, radius * 0.22),
              lineCap: "round",
              lineJoin: "round",
            },
          ),
        );
      } else if (options.validity === "invalid") {
        ops.push(
          ...wrapPathOps(
            [
              moveTo(centerX - radius * 0.42, centerY - radius * 0.42),
              lineTo(centerX + radius * 0.42, centerY + radius * 0.42),
              moveTo(centerX - radius * 0.42, centerY + radius * 0.42),
              lineTo(centerX + radius * 0.42, centerY - radius * 0.42),
            ],
            {
              strokeColor: white,
              strokeWidth: Math.max(1, radius * 0.2),
              lineCap: "round",
            },
          ),
        );
      } else {
        this.drawText(
          ops,
          "?",
          {
            x: centerX - radius,
            y: centerY - radius,
            width: diameter,
            height: diameter,
          },
          this.options.font ?? DEFAULT_FONT,
          white,
          "center",
        );
      }
    }

    ops.push(popGraphicsState());

    const stream = new PdfStream([], serializeOperators(ops));

    if (options.validity === "unknown") {
      stream.set("Resources", buildResources(this.options.font ?? DEFAULT_FONT, {}));
    }

    return normalizeAppearanceStream(stream, context);
  }

  /** Create the n4 validity status text. */
  private createStatusLayer(
    context: SignatureAppearanceRenderContext,
    options: ResolvedLegacyLayersOptions,
  ): PdfStream {
    const { width, height } = context;
    const padding = this.options.padding ?? 2;
    const markWidth = options.showMark ? validityMarkDiameter(width, height, padding) + padding : 0;
    const ops: Operator[] = [];

    this.drawText(
      ops,
      options.statusText,
      {
        x: padding + markWidth,
        y: height * 0.7 + padding,
        width: Math.max(0, width - padding * 2 - markWidth),
        height: Math.max(0, height * 0.3 - padding * 2),
      },
      this.options.font ?? DEFAULT_FONT,
      options.statusTextColor,
      "left",
    );

    const stream = new PdfStream([], serializeOperators(ops));

    stream.set("Resources", buildResources(this.options.font ?? DEFAULT_FONT, {}));

    return normalizeAppearanceStream(stream, context);
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
  const validity = options.validity ?? "unknown";
  const defaultColor =
    validity === "valid" ? VALID_COLOR : validity === "invalid" ? INVALID_COLOR : UNKNOWN_COLOR;
  const defaultStatus =
    validity === "valid"
      ? "SIGNED AND VALID"
      : validity === "invalid"
        ? "SIGNATURE INVALID"
        : "SIGNATURE NOT VERIFIED";

  return {
    validity,
    statusText: options.statusText ?? defaultStatus,
    markColor: options.markColor ?? defaultColor,
    statusTextColor: options.statusTextColor ?? options.markColor ?? defaultColor,
    showMark: options.showMark ?? true,
  };
}

function createBlankLayer(context: SignatureAppearanceRenderContext): PdfStream {
  return normalizeAppearanceStream(
    new PdfStream([], new TextEncoder().encode("% DSBlank\n")),
    context,
  );
}

function validityMarkDiameter(width: number, height: number, padding: number): number {
  return Math.max(0, Math.min(height * 0.3 - padding * 2, width * 0.16));
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
