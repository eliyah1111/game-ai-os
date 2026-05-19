import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { ExportResult, GenerationPackage } from "../types";
import { writeJson } from "../utils/json";
import { clampName, timestampForFolder } from "../utils/naming";
import { LocalPreviewProvider } from "./localPreviewProvider";

export class Exporter {
  constructor(private readonly projectRoot: string, private readonly previewProvider = new LocalPreviewProvider()) {}

  write(pkg: GenerationPackage): ExportResult {
    const folderName = [
      timestampForFolder(),
      pkg.parsedPrompt.command.replace("$", "").toLowerCase(),
      clampName(pkg.parsedPrompt.subject, "asset")
    ].join("_");

    const outputDir = join(this.projectRoot, "exports", folderName);
    const exportReadyDir = join(outputDir, "export_ready");
    mkdirSync(exportReadyDir, { recursive: true });

    const generatedAssets = this.previewProvider.writeAssets(outputDir, pkg.skillGeneration.assets, pkg.styleProfile, pkg.commandSignature);
    const metadataPath = join(outputDir, "metadata.json");
    const styleProfilePath = join(outputDir, "style_profile.json");
    const layoutDataPath = join(outputDir, "layout_data.json");

    const metadata = {
      id: folderName,
      createdAt: new Date().toISOString(),
      command: pkg.parsedPrompt.command,
      commandSignature: pkg.commandSignature,
      subject: pkg.parsedPrompt.subject,
      promptHash: createHash("sha256").update(pkg.parsedPrompt.raw).digest("hex"),
      generatedAssets,
      assetRequests: pkg.skillGeneration.assets,
      skillMetadata: pkg.skillGeneration.metadata,
      designLanguage: pkg.designLanguage,
      imageGenerationRequired: pkg.commandSignature.imageGeneration.required,
      namingConvention: "snake_case with role prefixes such as btn_, popup_, vfx_, bg_, obj_, spr_"
    };

    writeJson(metadataPath, metadata);
    writeJson(styleProfilePath, pkg.styleProfile);
    writeJson(layoutDataPath, pkg.layoutData);
    this.writeEngineExports(exportReadyDir, pkg, generatedAssets);
    this.writeOutputReadme(outputDir, pkg);

    return {
      outputDir,
      generatedAssets,
      metadataPath,
      styleProfilePath,
      layoutDataPath,
      exportReadyDir
    };
  }

  private writeEngineExports(exportReadyDir: string, pkg: GenerationPackage, generatedAssets: ExportResult["generatedAssets"]): void {
    const unityDir = join(exportReadyDir, "unity");
    const godotDir = join(exportReadyDir, "godot");
    const webDir = join(exportReadyDir, "web");
    mkdirSync(unityDir, { recursive: true });
    mkdirSync(godotDir, { recursive: true });
    mkdirSync(webDir, { recursive: true });

    writeJson(join(unityDir, "UnityAssetManifest.json"), {
      target: "Unity",
      pixelsPerUnit: 100,
      spriteMode: pkg.parsedPrompt.command === "$SPRITE_GEN" || pkg.parsedPrompt.command === "$VFX_GEN" ? "Multiple" : "Single",
      meshType: "Tight",
      compression: "Normal Quality",
      assets: generatedAssets.map((asset) => ({
        id: asset.assetId,
        png: asset.pngPath,
        pivot: "Center",
        generatePhysicsShape: pkg.parsedPrompt.command === "$OBJECT_GEN" || pkg.parsedPrompt.command === "$SPRITE_GEN"
      }))
    });

    writeJson(join(godotDir, "godot_import_manifest.json"), {
      target: "Godot",
      importType: "Texture2D",
      filter: true,
      mipmaps: false,
      repeat: pkg.parsedPrompt.command === "$BACKGROUND_GEN" ? "enabled" : "disabled",
      assets: generatedAssets.map((asset) => ({
        id: asset.assetId,
        source: asset.pngPath,
        recipe: asset.recipePath
      }))
    });

    writeJson(join(webDir, "asset-manifest.json"), {
      target: "Web",
      loading: "preload critical UI, lazy-load backgrounds and VFX",
      cssTokens: {
        primary: pkg.styleProfile.palette.primary,
        secondary: pkg.styleProfile.palette.secondary,
        radius: `${pkg.styleProfile.borderRadius.md}px`,
        easing: pkg.styleProfile.animation.easing,
        fontFamily: pkg.styleProfile.typography.family
      },
      assets: generatedAssets.map((asset) => ({
        id: asset.assetId,
        png: asset.pngPath,
        preview: asset.svgPreviewPath
      }))
    });
  }

  private writeOutputReadme(outputDir: string, pkg: GenerationPackage): void {
    const readme = [
      `# ${pkg.parsedPrompt.command} Export`,
      "",
      `Subject: ${pkg.parsedPrompt.subject}`,
      `Style: ${pkg.styleProfile.name}`,
      `Command Signature: ${pkg.commandSignature.signatureId}`,
      "",
      "This folder contains generated asset placeholders, image-generation recipes, metadata, style profile, layout data, and engine-ready manifests.",
      "",
      "When this command is used as a Codex skill, it must create actual images with built-in image generation. The local CLI writes recipes and metadata for the same image-first contract.",
      ""
    ].join("\n");

    writeFileSync(join(outputDir, "README.md"), readme, "utf8");
  }
}
