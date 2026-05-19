import { createAsset } from "./assetFactory";
import { DesignLanguage, ParsedPrompt, SkillGeneration, StyleProfile } from "../types";
import { clampName } from "../utils/naming";

export function generateUi(parsed: ParsedPrompt, style: StyleProfile, design: DesignLanguage): SkillGeneration {
  const screens = parsed.requestedScreens.length > 0 ? parsed.requestedScreens : ["start menu", "settings menu", "game over popup"];
  const assets = [
    createAsset({
      kind: "ui",
      role: "primary_button",
      name: "btn_start_primary",
      description: "Primary rounded CTA button with synchronized icon, label, gloss, and pressed state.",
      width: 520,
      height: design.button.height * 2,
      layers: ["shadow", "button_body", "inner_highlight", "label", "icon"],
      variants: ["normal", "pressed", "disabled", "reward"],
      collision: { shape: "box", width: 520, height: design.button.height * 2, notes: "Touch target metadata uses full visual bounds." },
      prompt: `Primary start button, ${style.name}, ${style.lighting}, ${style.shapeLanguage}, no pixel art, transparent PNG, mobile safe UI.`
    }),
    createAsset({
      kind: "ui",
      role: "popup",
      name: "popup_gameover",
      description: "Layered game-over popup shell with safe title, score, reward, and action slots.",
      width: 860,
      height: 920,
      layers: ["scrim_reference", "popup_shadow", "panel", "title_slot", "content_slots", "button_slots"],
      variants: ["game_over", "level_complete", "pause"],
      collision: { shape: "box", width: 860, height: 920 },
      prompt: `Game over popup, ${style.name}, matching shadow ${style.shadowStyle.blur}px, ${style.borderRadius.xl}px radius, transparent PNG, modern mobile puzzle UI.`
    }),
    createAsset({
      kind: "ui",
      role: "score_counter",
      name: "hud_score_counter",
      description: "Compact HUD score counter with number-safe typography and icon slot.",
      width: 320,
      height: 96,
      layers: ["hud_shadow", "counter_surface", "icon_slot", "number_slot"],
      variants: ["score", "coins", "moves", "timer"],
      collision: { shape: "none" },
      prompt: `HUD score counter, ${style.name}, high contrast typography, safe-area aware, transparent PNG.`
    }),
    createAsset({
      kind: "ui",
      role: "progress_bar",
      name: "progress_level_bar",
      description: "Responsive progress bar with fill, glow, milestone ticks, and readable end caps.",
      width: 720,
      height: 72,
      layers: ["track_shadow", "track", "fill", "shine", "milestone_ticks"],
      variants: ["empty", "half", "full", "bonus"],
      collision: { shape: "none" },
      prompt: `Mobile puzzle progress bar, ${style.name}, matching gradients, synchronized radius, transparent PNG.`
    })
  ];

  for (const screen of screens) {
    const screenName = clampName(screen, "screen");
    assets.push(createAsset({
      kind: "ui",
      role: "screen_composition",
      name: `ui_${screenName}_layout`,
      description: `Layered composition guide for ${screen}, using exact anchors, z-index metadata, and responsive spacing.`,
      width: 1080,
      height: 1920,
      transparent: false,
      layers: ["background_reference", "safe_area", "content_stack", "hud", "modal_layer"],
      variants: ["portrait", "landscape", "tablet"],
      collision: { shape: "none" },
      prompt: `${screen}, ${style.name}, modern casual puzzle game UI, responsive mobile layout, not pixel art.`,
      exportTags: ["ui", "layout", "responsive", screenName]
    }));
  }

  return {
    command: "$UI_GEN",
    assets,
    metadata: {
      screens,
      typographySystem: style.typography,
      spacingSystem: style.spacing,
      layoutSynchronization: "button, icon, label, popup, score, and progress dimensions are generated from shared design tokens"
    }
  };
}
