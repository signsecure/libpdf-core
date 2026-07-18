/**
 * Example: Sign with a visible appearance
 *
 * This example adds a graphic-and-description appearance while signing with
 * a PKCS#12 certificate.
 *
 * Run: bun run examples/07-signatures/sign-with-visible-appearance.ts
 */

import { black, P12Signer, PDF, rgb } from "../../src/index";
import { formatBytes, loadFixture, saveOutput } from "../utils";

async function main() {
  const source = PDF.create();
  const page = source.addPage({ size: "letter" });

  page.drawText("Release approval", {
    x: 48,
    y: page.height - 72,
    size: 22,
    color: black,
  });
  page.drawText("The visible panel below is also a cryptographic PDF signature.", {
    x: 48,
    y: page.height - 104,
    size: 11,
    color: black,
  });

  // Reload saved bytes so signing can append an incremental update.
  const pdf = await PDF.load(await source.save());
  const p12Bytes = await loadFixture("certificates", "test-signer-aes256.p12");
  const graphic = await loadFixture("images", "gradient-circle.png");
  const signer = await P12Signer.create(p12Bytes, "test123");

  const { bytes, warnings } = await pdf.sign({
    signer,
    fieldName: "ReleaseApproval",
    reason: "Approved for release",
    location: "Mumbai",
    appearance: {
      placements: [
        {
          pageIndex: 0,
          rect: { x: 48, y: 72, width: 420, height: 112 },
        },
      ],
      mode: "graphic-and-description",
      graphic,
      graphicRatio: 0.32,
      backgroundColor: rgb(0.97, 0.98, 1),
      borderColor: rgb(0.16, 0.32, 0.62),
      borderWidth: 1.25,
      padding: 5,
      // Static OpenPDF-compatible n0-n4 artwork. In a production workflow,
      // claim "valid" only after your application has independently verified it.
      legacyLayers: {
        validity: "valid",
        statusText: "SIGNED AND VALID",
      },
    },
  });

  const outputPath = await saveOutput("07-signatures/visible-signature.pdf", bytes);

  console.log(`Saved visible signature to ${outputPath}`);
  console.log(`Size: ${formatBytes(bytes.length)}`);

  for (const warning of warnings) {
    console.warn(`${warning.code}: ${warning.message}`);
  }
}

main().catch(console.error);
