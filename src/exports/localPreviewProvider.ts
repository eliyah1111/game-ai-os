import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PNG } from "pngjs";
import { AssetRequest, GeneratedAssetFile, StyleProfile } from "../types";
import { writeJson } from "../utils/json";

export class LocalPreviewProvider {
  writeAssets(outputDir: string, assets: AssetRequest[], style: StyleProfile): GeneratedAssetFile[] {
    const assetDir = join(outputDir, "generated_assets");
    mkdirSync(assetDir, { recursive: true });

    return assets.map((asset) => {
      const pngPath = join(assetDir, `${asset.fileBaseName}.png`);
      const svgPreviewPath = join(assetDir, `${asset.fileBaseName}.preview.svg`);
      const recipePath = join(assetDir, `${asset.fileBaseName}.recipe.json`);

      writeFileSync(pngPath, createTransparentPlaceholderPng());
      writeFileSync(svgPreviewPath, createSvgPreview(asset, style), "utf8");
      writeJson(recipePath, {
        asset,
        provider: "local-preview",
        note: "The PNG is a transparent placeholder. Connect a production image provider to render final art from this recipe.",
        productionRenderRequirements: [
          "transparent PNG for sprites, objects, UI, and VFX",
          "layered source retained where provider supports it",
          "no pixel-art upscaling",
          "preserve Style Lock Engine tokens"
        ]
      });

      return {
        assetId: asset.id,
        pngPath,
        svgPreviewPath,
        recipePath
      };
    });
  }
}

function createTransparentPlaceholderPng(): Buffer {
  const png = new PNG({ width: 1, height: 1 });
  png.data[0] = 0;
  png.data[1] = 0;
  png.data[2] = 0;
  png.data[3] = 0;
  return PNG.sync.write(png);
}

function createSvgPreview(asset: AssetRequest, style: StyleProfile): string {
  const width = Math.min(asset.dimensions.width, 900);
  const height = Math.min(asset.dimensions.height, 900);
  const radius = asset.kind === "background" ? 0 : style.borderRadius.xl;
  const bg = asset.transparent ? "none" : style.palette.surfaceAlt;
  const title = escapeXml(asset.name);
  const description = escapeXml(asset.role);

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    "  <defs>",
    `    <linearGradient id="body" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${style.palette.primary}"/><stop offset="1" stop-color="${style.palette.secondary}"/></linearGradient>`,
    `    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="${style.shadowStyle.offsetX}" dy="${style.shadowStyle.offsetY}" stdDeviation="${Math.max(2, style.shadowStyle.blur / 3)}" flood-color="${style.shadowStyle.color}" flood-opacity="${style.shadowStyle.opacity}"/></filter>`,
    "  </defs>",
    `  <rect width="100%" height="100%" fill="${bg}"/>`,
    `  <rect x="${width * 0.16}" y="${height * 0.22}" width="${width * 0.68}" height="${height * 0.48}" rx="${radius}" fill="url(#body)" filter="url(#shadow)"/>`,
    `  <path d="M ${width * 0.24} ${height * 0.3} C ${width * 0.38} ${height * 0.2}, ${width * 0.58} ${height * 0.2}, ${width * 0.74} ${height * 0.32}" stroke="${style.palette.surface}" stroke-width="${style.outline.thickness * 3}" stroke-linecap="round" opacity="0.55" fill="none"/>`,
    `  <text x="${width / 2}" y="${height * 0.8}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${Math.max(18, width * 0.04)}" font-weight="800" fill="${style.palette.text}">${title}</text>`,
    `  <text x="${width / 2}" y="${height * 0.86}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${Math.max(14, width * 0.025)}" fill="${style.palette.text}" opacity="0.72">${description}</text>`,
    "</svg>",
    ""
  ].join("\n");
}

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
