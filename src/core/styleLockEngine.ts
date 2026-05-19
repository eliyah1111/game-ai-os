import { MemoryStore } from "./memoryStore";
import { ParsedPrompt, StyleProfile } from "../types";

const STYLE_PROFILES: Record<string, StyleProfile> = {
  glossy_mobile_arcade: {
    id: "glossy_mobile_arcade",
    name: "Glossy Mobile Arcade",
    palette: {
      primary: "#2D7FF9",
      secondary: "#7B61FF",
      accent: "#FFCC33",
      surface: "#FFFFFF",
      surfaceAlt: "#EAF4FF",
      text: "#172033",
      success: "#2ED47A",
      warning: "#FFB020",
      danger: "#FF5A7A"
    },
    lighting: "top-left glossy highlights with soft lower contact shadows",
    shapeLanguage: "rounded squircle silhouettes, chunky readable forms, inflated surfaces",
    shadowStyle: {
      color: "#172033",
      opacity: 0.2,
      blur: 22,
      offsetX: 0,
      offsetY: 8
    },
    borderRadius: {
      sm: 8,
      md: 14,
      lg: 22,
      xl: 32,
      pill: 999
    },
    spacing: {
      unit: 8,
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 40
    },
    typography: {
      family: "Nunito Sans, Inter, system-ui",
      headingWeight: 900,
      bodyWeight: 700,
      numberWeight: 900
    },
    outline: {
      thickness: 3,
      color: "#FFFFFF",
      opacity: 0.8
    },
    animation: {
      easing: "cubic-bezier(0.2, 0.9, 0.2, 1)",
      microDurationMs: 120,
      enterDurationMs: 260,
      loopDurationMs: 1200,
      squashStretch: 0.08
    },
    notes: [
      "Prioritize instantly readable silhouettes at phone scale.",
      "Use saturated accents sparingly for rewards, boosters, and primary actions."
    ]
  },
  clean_puzzle_minimalism: {
    id: "clean_puzzle_minimalism",
    name: "Clean Puzzle Minimalism",
    palette: {
      primary: "#2563EB",
      secondary: "#10B981",
      accent: "#F59E0B",
      surface: "#F8FAFC",
      surfaceAlt: "#E2E8F0",
      text: "#0F172A",
      success: "#22C55E",
      warning: "#F97316",
      danger: "#EF4444"
    },
    lighting: "flat-clean surfaces with subtle top edge highlights",
    shapeLanguage: "simple geometric forms, consistent corners, low visual noise",
    shadowStyle: {
      color: "#0F172A",
      opacity: 0.12,
      blur: 14,
      offsetX: 0,
      offsetY: 5
    },
    borderRadius: {
      sm: 6,
      md: 10,
      lg: 16,
      xl: 24,
      pill: 999
    },
    spacing: {
      unit: 8,
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 36
    },
    typography: {
      family: "Inter, system-ui",
      headingWeight: 800,
      bodyWeight: 600,
      numberWeight: 800
    },
    outline: {
      thickness: 2,
      color: "#FFFFFF",
      opacity: 0.55
    },
    animation: {
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      microDurationMs: 110,
      enterDurationMs: 220,
      loopDurationMs: 1400,
      squashStretch: 0.04
    },
    notes: [
      "Keep gameplay objects calmer than reward VFX.",
      "Use whitespace as a readability tool, especially near HUD edges."
    ]
  },
  soft_neon_casual: {
    id: "soft_neon_casual",
    name: "Soft Neon Casual",
    palette: {
      primary: "#25D4FF",
      secondary: "#8B5CF6",
      accent: "#FF4ECD",
      surface: "#101827",
      surfaceAlt: "#1D2A44",
      text: "#F8FBFF",
      success: "#39FFB6",
      warning: "#FFD166",
      danger: "#FF5C8A"
    },
    lighting: "soft neon rims with controlled bloom and darkened gameplay contrast",
    shapeLanguage: "smooth rounded silhouettes, luminous accents, crisp inner symbols",
    shadowStyle: {
      color: "#25D4FF",
      opacity: 0.28,
      blur: 28,
      offsetX: 0,
      offsetY: 8
    },
    borderRadius: {
      sm: 8,
      md: 16,
      lg: 24,
      xl: 34,
      pill: 999
    },
    spacing: {
      unit: 8,
      xs: 4,
      sm: 10,
      md: 18,
      lg: 28,
      xl: 44
    },
    typography: {
      family: "Inter, system-ui",
      headingWeight: 850,
      bodyWeight: 650,
      numberWeight: 900
    },
    outline: {
      thickness: 2,
      color: "#BDEFFF",
      opacity: 0.65
    },
    animation: {
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      microDurationMs: 100,
      enterDurationMs: 280,
      loopDurationMs: 1600,
      squashStretch: 0.05
    },
    notes: [
      "Keep bloom metadata explicit so engines can tune performance.",
      "Protect text contrast by reserving dark surfaces behind readable labels."
    ]
  },
  colorful_toy_like_ui: {
    id: "colorful_toy_like_ui",
    name: "Colorful Toy-Like UI",
    palette: {
      primary: "#FF6B6B",
      secondary: "#4D96FF",
      accent: "#FFD93D",
      surface: "#FFF7E8",
      surfaceAlt: "#DFF7FF",
      text: "#27324A",
      success: "#6BCB77",
      warning: "#FFB84C",
      danger: "#FF5C7A"
    },
    lighting: "soft plastic highlights with friendly contact shadows",
    shapeLanguage: "rounded toy blocks, soft bevels, oversized readable icons",
    shadowStyle: {
      color: "#27324A",
      opacity: 0.18,
      blur: 18,
      offsetX: 0,
      offsetY: 7
    },
    borderRadius: {
      sm: 10,
      md: 18,
      lg: 28,
      xl: 38,
      pill: 999
    },
    spacing: {
      unit: 8,
      xs: 4,
      sm: 10,
      md: 18,
      lg: 28,
      xl: 42
    },
    typography: {
      family: "Nunito Sans, system-ui",
      headingWeight: 900,
      bodyWeight: 800,
      numberWeight: 900
    },
    outline: {
      thickness: 4,
      color: "#FFFFFF",
      opacity: 0.85
    },
    animation: {
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      microDurationMs: 130,
      enterDurationMs: 300,
      loopDurationMs: 1300,
      squashStretch: 0.1
    },
    notes: [
      "Use playful scale changes while preserving touch target stability.",
      "Keep object variants strongly color-coded for puzzle readability."
    ]
  },
  modern_hypercasual: {
    id: "modern_hypercasual",
    name: "Modern Hypercasual",
    palette: {
      primary: "#00A6FF",
      secondary: "#FF7A00",
      accent: "#35E66F",
      surface: "#F2F6FF",
      surfaceAlt: "#DDE8FF",
      text: "#101828",
      success: "#12B76A",
      warning: "#F79009",
      danger: "#F04438"
    },
    lighting: "bright studio-like lighting with clean ambient occlusion",
    shapeLanguage: "simple thick forms, no tiny details, strong readable color groups",
    shadowStyle: {
      color: "#101828",
      opacity: 0.15,
      blur: 20,
      offsetX: 0,
      offsetY: 8
    },
    borderRadius: {
      sm: 8,
      md: 14,
      lg: 20,
      xl: 30,
      pill: 999
    },
    spacing: {
      unit: 8,
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 40
    },
    typography: {
      family: "Inter, system-ui",
      headingWeight: 850,
      bodyWeight: 650,
      numberWeight: 900
    },
    outline: {
      thickness: 2,
      color: "#FFFFFF",
      opacity: 0.75
    },
    animation: {
      easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      microDurationMs: 100,
      enterDurationMs: 240,
      loopDurationMs: 1000,
      squashStretch: 0.06
    },
    notes: [
      "Favor production clarity and low cognitive load.",
      "Avoid texture complexity that harms small-screen object recognition."
    ]
  }
};

const STYLE_ALIASES: Record<string, string> = {
  "glossy mobile arcade": "glossy_mobile_arcade",
  "modern glossy puzzle game": "glossy_mobile_arcade",
  "cute glossy style": "glossy_mobile_arcade",
  "clean puzzle minimalism": "clean_puzzle_minimalism",
  "soft neon casual": "soft_neon_casual",
  "colorful toy-like ui": "colorful_toy_like_ui",
  "modern hypercasual": "modern_hypercasual"
};

export class StyleLockEngine {
  constructor(private readonly memoryStore: MemoryStore) {}

  resolve(parsedPrompt: ParsedPrompt): StyleProfile {
    const explicitStyleId = parsedPrompt.requestedStyle ? STYLE_ALIASES[parsedPrompt.requestedStyle] : undefined;
    const style = explicitStyleId
      ? STYLE_PROFILES[explicitStyleId]
      : this.memoryStore.getActiveStyle() ?? STYLE_PROFILES.glossy_mobile_arcade;

    this.memoryStore.saveActiveStyle(style);
    return style;
  }

  listProfiles(): StyleProfile[] {
    return Object.values(STYLE_PROFILES);
  }
}
