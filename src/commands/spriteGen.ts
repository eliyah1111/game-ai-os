import { createAnimation, createAsset } from "./assetFactory";
import { DesignLanguage, ParsedPrompt, SkillGeneration, StyleProfile } from "../types";
import { clampName } from "../utils/naming";

export function generateSprites(parsed: ParsedPrompt, style: StyleProfile, design: DesignLanguage): SkillGeneration {
  const subject = clampName(parsed.subject, "gameplay_character");
  const requested = parsed.requestedAnimations.length > 0 ? parsed.requestedAnimations : ["idle"];
  const normalizedAnimations = [...new Set(requested.map((item) => item === "loop" ? "idle_loop" : item))];
  const animationSpecs = normalizedAnimations.map((animation) =>
    createAnimation(animation, `${subject}_${animation}`, animation.includes("hit") ? 5 : 8, animation.includes("hit") ? 14 : 12, !["hit", "win", "lose"].includes(animation), style.animation.easing)
  );

  return {
    command: "$SPRITE_GEN",
    assets: [
      createAsset({
        kind: "sprite",
        role: "animated_gameplay_character",
        name: `spr_${subject}_atlas`,
        description: `Engine-ready animated sprite atlas for ${parsed.subject}. Designed for modern casual mobile readability with ${style.shapeLanguage}.`,
        width: 1024,
        height: 1024,
        transparent: true,
        layers: ["silhouette", "base_fill", "gloss_highlight", "face_or_symbol", "contact_shadow"],
        variants: ["default", "selected", "disabled_readability_check"],
        animations: animationSpecs,
        collision: {
          shape: "capsule",
          width: 120,
          height: 148,
          offsetX: 0,
          offsetY: 8,
          notes: "Keep collision slightly smaller than the visible glossy silhouette for forgiving mobile play."
        },
        prompt: [
          parsed.subject,
          `style=${style.name}`,
          `lighting=${style.lighting}`,
          `outline=${design.object.outlineWidth}px`,
          "transparent background",
          "not pixel art",
          "mobile casual puzzle game character"
        ].join("; "),
        exportTags: ["sprite", "atlas", "animation", "mobile"]
      })
    ],
    metadata: {
      animationCount: animationSpecs.length,
      timingModel: "per-animation fps with engine event hooks",
      collisionPolicy: "forgiving gameplay capsule",
      readability: "minimum silhouette contrast checked against active style palette"
    }
  };
}
