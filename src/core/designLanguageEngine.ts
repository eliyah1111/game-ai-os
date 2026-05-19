import { DesignLanguage, StyleProfile } from "../types";

export class DesignLanguageEngine {
  create(style: StyleProfile): DesignLanguage {
    return {
      styleId: style.id,
      button: {
        height: Math.max(56, style.spacing.xl + style.spacing.md),
        minWidth: 168,
        radius: style.borderRadius.lg,
        paddingX: style.spacing.lg,
        iconSize: 28,
        shadow: `${style.shadowStyle.offsetX}px ${style.shadowStyle.offsetY}px ${style.shadowStyle.blur}px ${style.shadowStyle.color}`
      },
      icon: {
        strokeWidth: Math.max(2, style.outline.thickness - 1),
        cornerRadius: style.borderRadius.sm,
        highlight: style.palette.accent
      },
      object: {
        outlineWidth: style.outline.thickness,
        highlightAngle: -35,
        contactShadowOpacity: style.shadowStyle.opacity
      },
      vfx: {
        blendMode: style.id === "soft_neon_casual" ? "screen" : "additive",
        glowRadius: style.shadowStyle.blur * 1.5,
        particleShape: style.id === "clean_puzzle_minimalism" ? "rounded-rect" : "soft-disc"
      },
      gradients: {
        primary: `linear-gradient(180deg, ${style.palette.primary}, ${style.palette.secondary})`,
        secondary: `linear-gradient(180deg, ${style.palette.accent}, ${style.palette.warning})`,
        surface: `linear-gradient(180deg, ${style.palette.surface}, ${style.palette.surfaceAlt})`
      },
      easing: style.animation.easing
    };
  }
}
