import { CommandName, CommandSignature } from "../types";

const PINK_KEY_EXTRACTION = {
  mode: "pixel_exact_pink_key" as const,
  matteColor: "#FFD6E7" as const,
  tolerance: 0,
  preserveCanvasCoordinates: true,
  trimTransparentBounds: true
};

const SIGNATURES: Record<CommandName, CommandSignature> = {
  $SPRITE_GEN: {
    command: "$SPRITE_GEN",
    signatureId: "sprite_image_signature_v1",
    displayName: "$SPRITE_GEN",
    fixedIntent: "Create actual transparent gameplay sprite images and animation frames for modern mobile casual games.",
    imageGeneration: {
      required: true,
      provider: "codex_image_gen",
      rawBackground: "#FFD6E7",
      finalFormat: "png_sequence",
      preferredAspectRatio: "1:1",
      minimumResolution: { width: 1024, height: 1024 },
      extraction: PINK_KEY_EXTRACTION
    },
    visualStamp: {
      promptPrefix: "GAME AI OS $SPRITE_GEN IMAGE STAMP: modern mobile casual gameplay sprite, actual bitmap art, exact flat light-pink #FFD6E7 background for pixel-perfect extraction, consistent character identity, style-locked palette, clean scalable silhouette.",
      promptSuffix: "Output must be image-generation-ready, not a text plan; keep #FFD6E7 only as the background key color; no pixel art, no retro RPG sheet, no AAA realism.",
      namingPrefix: "spr_",
      outputFolder: "sprites"
    },
    requiredOutputs: ["transparent PNG frames", "sprite atlas or frame sequence", "animation timing", "collision suggestions"],
    forbiddenOutputs: ["plan-only response", "metadata-only response", "pixel-art default", "retro RPG sprite sheet"]
  },
  $UI_GEN: {
    command: "$UI_GEN",
    signatureId: "ui_image_signature_v1",
    displayName: "$UI_GEN",
    fixedIntent: "Create actual layered mobile game UI images with precise responsive layout metadata.",
    imageGeneration: {
      required: true,
      provider: "codex_image_gen",
      rawBackground: "#FFD6E7",
      finalFormat: "layered_png",
      preferredAspectRatio: "9:16",
      minimumResolution: { width: 1080, height: 1920 },
      extraction: PINK_KEY_EXTRACTION
    },
    visualStamp: {
      promptPrefix: "GAME AI OS $UI_GEN IMAGE STAMP: modern mobile casual puzzle UI, actual UI bitmap assets on exact flat light-pink #FFD6E7 background, pixel-perfect extraction, exact safe-area layout, style-locked components, synchronized spacing.",
      promptSuffix: "Output must include visible UI image assets plus layout metadata; keep #FFD6E7 only as the background key color; no landing page, no pixel UI, no RPG menu skin.",
      namingPrefix: "ui_",
      outputFolder: "ui"
    },
    requiredOutputs: ["layered UI PNGs", "layout_data.json", "responsive rules", "typography and spacing tokens"],
    forbiddenOutputs: ["plan-only response", "metadata-only response", "marketing landing page", "retro RPG menu"]
  },
  $OBJECT_GEN: {
    command: "$OBJECT_GEN",
    signatureId: "object_image_signature_v1",
    displayName: "$OBJECT_GEN",
    fixedIntent: "Create actual transparent gameplay object images and variants for mobile puzzle games.",
    imageGeneration: {
      required: true,
      provider: "codex_image_gen",
      rawBackground: "#FFD6E7",
      finalFormat: "transparent_png",
      preferredAspectRatio: "1:1",
      minimumResolution: { width: 512, height: 512 },
      extraction: PINK_KEY_EXTRACTION
    },
    visualStamp: {
      promptPrefix: "GAME AI OS $OBJECT_GEN IMAGE STAMP: modern mobile puzzle object, actual transparent bitmap on exact flat light-pink #FFD6E7 background, pixel-perfect extraction, readable board-scale silhouette, style-locked variants.",
      promptSuffix: "Output must be renderable object art with collision metadata; keep #FFD6E7 only as the background key color; no RPG props, no pixel tileset, no realism-heavy textures.",
      namingPrefix: "obj_",
      outputFolder: "objects"
    },
    requiredOutputs: ["transparent PNG variants", "object metadata", "scale rules", "collision metadata"],
    forbiddenOutputs: ["plan-only response", "metadata-only response", "RPG prop pack", "pixel-art tiles"]
  },
  $BACKGROUND_GEN: {
    command: "$BACKGROUND_GEN",
    signatureId: "background_image_signature_v1",
    displayName: "$BACKGROUND_GEN",
    fixedIntent: "Create actual layered background images for mobile casual and puzzle games.",
    imageGeneration: {
      required: true,
      provider: "codex_image_gen",
      rawBackground: "#FFD6E7",
      finalFormat: "layered_png",
      preferredAspectRatio: "9:16",
      minimumResolution: { width: 1440, height: 2560 },
      extraction: PINK_KEY_EXTRACTION
    },
    visualStamp: {
      promptPrefix: "GAME AI OS $BACKGROUND_GEN IMAGE STAMP: modern mobile casual puzzle background layers on exact flat light-pink #FFD6E7 extraction background when exporting separated layers, actual bitmap scene, gameplay-safe contrast, layered depth.",
      promptSuffix: "Output must be a visible background image with layer/depth metadata; keep #FFD6E7 only as the extraction background for separated layers; no RPG map, no tilemap default, no AAA realism.",
      namingPrefix: "bg_",
      outputFolder: "backgrounds"
    },
    requiredOutputs: ["layered background PNGs", "depth separation", "blur maps", "atmosphere metadata"],
    forbiddenOutputs: ["plan-only response", "metadata-only response", "RPG map", "complex AAA environment"]
  },
  $VFX_GEN: {
    command: "$VFX_GEN",
    signatureId: "vfx_image_signature_v1",
    displayName: "$VFX_GEN",
    fixedIntent: "Create actual transparent VFX frame images and timing metadata for satisfying casual-game feedback.",
    imageGeneration: {
      required: true,
      provider: "codex_image_gen",
      rawBackground: "#FFD6E7",
      finalFormat: "png_sequence",
      preferredAspectRatio: "1:1",
      minimumResolution: { width: 768, height: 768 },
      extraction: PINK_KEY_EXTRACTION
    },
    visualStamp: {
      promptPrefix: "GAME AI OS $VFX_GEN IMAGE STAMP: modern mobile casual VFX, actual transparent bitmap frames on exact flat light-pink #FFD6E7 background, pixel-perfect extraction, satisfying short feedback, style-locked glow and particles.",
      promptSuffix: "Output must be VFX frames plus timing/blend metadata; keep #FFD6E7 only as the background key color; no plan-only VFX, no pixel explosion, no long screen-blocking effect.",
      namingPrefix: "vfx_",
      outputFolder: "vfx"
    },
    requiredOutputs: ["transparent VFX frames", "timing metadata", "blend suggestions", "animation curves"],
    forbiddenOutputs: ["plan-only response", "metadata-only response", "pixel explosion", "overlong screen-covering effect"]
  }
};

export class CommandSignatureEngine {
  resolve(command: CommandName): CommandSignature {
    return SIGNATURES[command];
  }

  list(): CommandSignature[] {
    return Object.values(SIGNATURES);
  }
}
