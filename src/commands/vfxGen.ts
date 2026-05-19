import { createAnimation, createAsset } from "./assetFactory";
import { DesignLanguage, ParsedPrompt, SkillGeneration, StyleProfile } from "../types";
import { clampName } from "../utils/naming";

export function generateVfx(parsed: ParsedPrompt, style: StyleProfile, design: DesignLanguage): SkillGeneration {
  const subject = clampName(parsed.subject, "combo_glow");
  const effectType = parsed.assetKeywords.includes("explosion") ? "explosion" : parsed.assetKeywords.includes("combo") ? "combo" : "reward_pop";
  const frameCount = effectType === "explosion" ? 12 : 9;
  const animation = createAnimation(effectType, `vfx_${subject}`, frameCount, 18, false, style.animation.easing);

  animation.events = [
    { atMs: 0, name: "spawn" },
    { atMs: Math.round(animation.durationMs * 0.32), name: "peak_glow" },
    { atMs: Math.round(animation.durationMs * 0.78), name: "fade_particles" }
  ];

  return {
    command: "$VFX_GEN",
    assets: [
      createAsset({
        kind: "vfx",
        role: effectType,
        name: `vfx_${subject}_01`,
        description: `Satisfying ${effectType} VFX tuned for casual puzzle feedback, combo readability, and engine blending.`,
        width: 768,
        height: 768,
        transparent: true,
        layers: ["core_flash", "glow", "particles", "spark_trails", "fade_ring"],
        variants: ["small", "medium", "large", "low_performance"],
        animations: [animation],
        collision: { shape: "none" },
        prompt: `${effectType} VFX, ${style.name}, ${style.lighting}, ${design.vfx.blendMode} blend, transparent PNG frames, satisfying mobile casual feedback, not pixel art.`,
        exportTags: ["vfx", effectType, "frames", "particles"]
      })
    ],
    metadata: {
      blendMode: design.vfx.blendMode,
      animationCurves: {
        scale: "0.72 -> 1.18 -> 1.0",
        alpha: "0 -> 1 -> 0",
        particleGravity: "light upward drift"
      },
      performanceNotes: "Low-performance variant halves particles and preserves core flash timing."
    }
  };
}
