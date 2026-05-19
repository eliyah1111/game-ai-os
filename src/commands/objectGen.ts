import { createAsset } from "./assetFactory";
import { DesignLanguage, ParsedPrompt, SkillGeneration, StyleProfile } from "../types";
import { clampName } from "../utils/naming";

const DEFAULT_OBJECTS = ["puzzle_block", "collectible_star", "booster_bomb"];

export function generateObjects(parsed: ParsedPrompt, style: StyleProfile, design: DesignLanguage): SkillGeneration {
  const objectNames = parsed.assetKeywords.length > 0
    ? parsed.assetKeywords.map((keyword) => clampName(keyword, "object"))
    : DEFAULT_OBJECTS;

  return {
    command: "$OBJECT_GEN",
    assets: objectNames.map((objectName) => createAsset({
      kind: "object",
      role: "gameplay_object",
      name: `obj_${objectName}`,
      description: `Gameplay object variant set for ${objectName}, tuned for casual puzzle readability and consistent shape language.`,
      width: 512,
      height: 512,
      transparent: true,
      layers: ["contact_shadow", "base_shape", "bevel", "highlight", "state_overlay"],
      variants: ["blue", "green", "yellow", "red", "purple", "locked", "boosted"],
      collision: {
        shape: objectName.includes("ball") ? "circle" : "box",
        width: 420,
        height: 420,
        radius: objectName.includes("ball") ? 210 : undefined,
        notes: "Collision is inset from glossy edges to keep drag and match interactions forgiving."
      },
      prompt: `${objectName}, ${style.name}, ${style.shapeLanguage}, ${style.lighting}, ${design.object.outlineWidth}px outline, transparent PNG, modern mobile puzzle object, not pixel art.`,
      exportTags: ["object", "variant_set", "collision_ready"]
    })),
    metadata: {
      scaleRules: {
        phone: "0.82x to 1.0x based on board cell size",
        tablet: "1.0x to 1.18x with unchanged collision inset",
        readabilityMinimum: "44 dp visible tap or drag target"
      },
      variantPolicy: "Color variants keep identical silhouettes and lighting so gameplay rules stay legible."
    }
  };
}
