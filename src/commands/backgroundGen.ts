import { createAsset } from "./assetFactory";
import { DesignLanguage, ParsedPrompt, SkillGeneration, StyleProfile } from "../types";
import { clampName } from "../utils/naming";

export function generateBackgrounds(parsed: ParsedPrompt, style: StyleProfile, _design: DesignLanguage): SkillGeneration {
  const subject = clampName(parsed.subject, "puzzle_softgradient");

  return {
    command: "$BACKGROUND_GEN",
    assets: [
      createAsset({
        kind: "background",
        role: "layered_environment",
        name: `bg_${subject}`,
        description: "Layered casual-game background with parallax-ready depth separation and gameplay-safe contrast.",
        width: 1440,
        height: 2560,
        transparent: false,
        layers: ["sky_or_base_gradient", "far_shapes", "mid_shapes", "near_soft_detail", "gameplay_readability_vignette"],
        variants: ["portrait", "landscape_crop", "looping_vertical", "blurred_menu"],
        collision: { shape: "none" },
        prompt: `${parsed.subject}, ${style.name}, layered mobile casual puzzle background, soft depth, clear gameplay visibility, no realism overload, not pixel art.`,
        exportTags: ["background", "parallax", "mobile", "safe_contrast"]
      })
    ],
    metadata: {
      depthSeparation: {
        far: 0.12,
        mid: 0.34,
        near: 0.58,
        gameplayPlane: 1
      },
      blurMaps: ["menu_blur_12px", "popup_scrim_blur_20px"],
      looping: "vertical and horizontal crop-safe variants are described in export metadata"
    }
  };
}
