import { PDF } from "#src/api/pdf";
import { rgb } from "#src/helpers/colors";
import { PdfNumber } from "#src/objects/pdf-number";
import { PdfRef } from "#src/objects/pdf-ref";
import { PdfStream } from "#src/objects/pdf-stream";
import { loadFixture } from "#src/test-utils";
import { describe, expect, it } from "vitest";

import { SignatureAppearanceGenerator } from "./appearance";

const metadata = {
  signerName: "Alice Example",
  signingTime: new Date("2026-07-18T10:30:00Z"),
  reason: "Approved",
  location: "Mumbai",
};

describe("SignatureAppearanceGenerator", () => {
  it("creates a description appearance with font, background, and border resources", async () => {
    const pdf = PDF.create();
    pdf.addPage();

    const generator = SignatureAppearanceGenerator.create(
      pdf,
      {
        placements: [{ pageIndex: 0, rect: { x: 72, y: 72, width: 240, height: 80 } }],
        text: "Approved by Alice Example",
        backgroundColor: rgb(0.96, 0.98, 1),
        borderColor: rgb(0.2, 0.4, 0.7),
        borderWidth: 1,
      },
      metadata,
    );

    const stream = await generator.generate({
      pageIndex: 0,
      width: 240,
      height: 80,
      rotation: 0,
    });

    expect(stream.getName("Type")?.value).toBe("XObject");
    expect(stream.getName("Subtype")?.value).toBe("Form");
    expect(stream.getNumber("FormType")?.value).toBe(1);

    const bbox = stream.getArray("BBox")?.toArray();
    expect(bbox?.map(value => (value instanceof PdfNumber ? value.value : null))).toEqual([
      0, 0, 240, 80,
    ]);

    const resources = stream.getDict("Resources");
    expect(resources?.getDict("Font")?.size).toBe(1);

    const content = new TextDecoder().decode(stream.getDecodedData());
    expect(content).toContain("BT");
    expect(content).toContain("Tf");
    expect(content).toContain("re");
  });

  it("supports graphic-and-description appearances with a configurable split", async () => {
    const pdf = PDF.create();
    pdf.addPage();
    const graphic = await loadFixture("images", "red-square.png");

    const generator = SignatureAppearanceGenerator.create(
      pdf,
      {
        mode: "graphic-and-description",
        placements: [{ pageIndex: 0, rect: { x: 20, y: 20, width: 300, height: 90 } }],
        graphic,
        graphicRatio: 0.35,
      },
      metadata,
    );

    const stream = await generator.generate({
      pageIndex: 0,
      width: 300,
      height: 90,
      rotation: 0,
    });

    expect(stream.getDict("Resources")?.getDict("XObject")?.size).toBe(1);
    expect(new TextDecoder().decode(stream.getDecodedData())).toContain("/Im0 Do");
  });

  it("matches OpenPDF legacy n0-n4 template geometry and FRM transforms", async () => {
    const pdf = PDF.create();
    pdf.addPage();

    const generator = SignatureAppearanceGenerator.create(
      pdf,
      {
        text: "Signed by Alice Example",
        legacyLayers: true,
      },
      metadata,
    );

    const stream = await generator.generate({
      pageIndex: 0,
      width: 300,
      height: 90,
      rotation: 0,
    });
    const registry = pdf.context.registry;
    const formRef = stream.getDict("Resources")?.getDict("XObject")?.get("FRM");

    const normalAppearanceContent = new TextDecoder().decode(stream.getDecodedData());

    expect(normalAppearanceContent).toContain("1 0 0 1 0 0 cm");
    expect(normalAppearanceContent).toContain("/FRM Do");
    expect(formRef).toBeInstanceOf(PdfRef);

    if (!(formRef instanceof PdfRef)) {
      throw new Error("FRM resource was not registered");
    }

    const form = registry.resolve(formRef);

    expect(form).toBeInstanceOf(PdfStream);

    if (!(form instanceof PdfStream)) {
      throw new Error("FRM resource was not a stream");
    }

    const layers = form.getDict("Resources")?.getDict("XObject");

    expect(layers ? [...layers.keys()].map(key => key.value) : []).toEqual([
      "n0",
      "n1",
      "n2",
      "n3",
      "n4",
    ]);

    const backgroundRef = layers?.get("n0");
    const unverifiedMarkRef = layers?.get("n1");
    const mainAppearanceRef = layers?.get("n2");
    const viewerValidityRef = layers?.get("n3");
    const statusRef = layers?.get("n4");

    expect(backgroundRef).toBeInstanceOf(PdfRef);
    expect(unverifiedMarkRef).toBeInstanceOf(PdfRef);
    expect(mainAppearanceRef).toBeInstanceOf(PdfRef);
    expect(viewerValidityRef).toBeInstanceOf(PdfRef);
    expect(statusRef).toBeInstanceOf(PdfRef);

    if (
      !(backgroundRef instanceof PdfRef) ||
      !(unverifiedMarkRef instanceof PdfRef) ||
      !(mainAppearanceRef instanceof PdfRef) ||
      !(viewerValidityRef instanceof PdfRef) ||
      !(statusRef instanceof PdfRef)
    ) {
      throw new Error("Legacy validity resources were not registered");
    }

    const background = registry.resolve(backgroundRef);
    const unverifiedMark = registry.resolve(unverifiedMarkRef);
    const mainAppearance = registry.resolve(mainAppearanceRef);
    const viewerValidity = registry.resolve(viewerValidityRef);
    const status = registry.resolve(statusRef);

    expect(background).toBeInstanceOf(PdfStream);
    expect(unverifiedMark).toBeInstanceOf(PdfStream);
    expect(mainAppearance).toBeInstanceOf(PdfStream);
    expect(viewerValidity).toBeInstanceOf(PdfStream);
    expect(status).toBeInstanceOf(PdfStream);

    if (
      !(background instanceof PdfStream) ||
      !(unverifiedMark instanceof PdfStream) ||
      !(mainAppearance instanceof PdfStream) ||
      !(viewerValidity instanceof PdfStream) ||
      !(status instanceof PdfStream)
    ) {
      throw new Error("Legacy validity resources were not streams");
    }

    const unverifiedMarkContent = new TextDecoder().decode(unverifiedMark.getDecodedData());
    const formContent = new TextDecoder().decode(form.getDecodedData());
    const numberValues = (stream: PdfStream, key: string) =>
      stream
        .getArray(key)
        ?.toArray()
        .map(value => (value instanceof PdfNumber ? value.value : null));

    expect(numberValues(background, "BBox")).toEqual([0, 0, 100, 100]);
    expect(numberValues(unverifiedMark, "BBox")).toEqual([0, 0, 100, 100]);
    expect(numberValues(mainAppearance, "BBox")).toEqual([0, 0, 300, 90]);
    expect(numberValues(viewerValidity, "BBox")).toEqual([0, 0, 100, 100]);
    expect(numberValues(status, "BBox")).toEqual([0, 63, 300, 90]);
    expect(numberValues(form, "Matrix")).toEqual([1, 0, 0, 1, 0, 0]);
    expect(numberValues(unverifiedMark, "Matrix")).toEqual([1, 0, 0, 1, 0, 0]);
    expect(formContent).toContain("0.81 0 0 0.81 109.5 4.5 cm");
    expect(unverifiedMarkContent.startsWith("% DSUnknown\n")).toBe(true);
    expect(unverifiedMarkContent).toContain("313 404 325 453 432 529 c");
    expect(new TextDecoder().decode(viewerValidity.getDecodedData())).toBe("% DSBlank\n");
    expect(new TextDecoder().decode(status.getDecodedData())).toContain(
      "5369676E6174757265204E6F74205665726966696564",
    );
  });

  it("validates graphic modes and split ratios", () => {
    const pdf = PDF.create();
    pdf.addPage();

    expect(() =>
      SignatureAppearanceGenerator.create(
        pdf,
        {
          mode: "graphic",
          placements: [{ pageIndex: 0, rect: { x: 0, y: 0, width: 100, height: 40 } }],
        },
        metadata,
      ),
    ).toThrow(/graphic/i);

    expect(() =>
      SignatureAppearanceGenerator.create(
        pdf,
        {
          graphicRatio: 1,
          placements: [{ pageIndex: 0, rect: { x: 0, y: 0, width: 100, height: 40 } }],
        },
        metadata,
      ),
    ).toThrow(/graphicRatio/);

    expect(() => SignatureAppearanceGenerator.create(pdf, { maxFontSize: 0 }, metadata)).toThrow(
      /maxFontSize/,
    );

    expect(() =>
      SignatureAppearanceGenerator.create(pdf, { minFontSize: 14, maxFontSize: 12 }, metadata),
    ).toThrow(/minFontSize/);
  });

  it("normalizes custom provider streams and passes placement context", async () => {
    const pdf = PDF.create();
    pdf.addPage();

    const generator = SignatureAppearanceGenerator.create(
      pdf,
      {
        placements: [{ pageIndex: 0, rect: { x: 10, y: 20, width: 150, height: 50 } }],
        provider: context => {
          expect(context.pageIndex).toBe(0);
          expect(context.width).toBe(150);
          expect(context.height).toBe(50);

          return context.createStream(new TextEncoder().encode("0 0 150 50 re S"));
        },
      },
      metadata,
    );

    const stream = await generator.generate({
      pageIndex: 0,
      width: 150,
      height: 50,
      rotation: 90,
    });

    expect(stream.getName("Subtype")?.value).toBe("Form");
    expect(stream.getArray("BBox")?.length).toBe(4);
    expect(stream.getArray("Matrix")).toBeUndefined();
  });
});
