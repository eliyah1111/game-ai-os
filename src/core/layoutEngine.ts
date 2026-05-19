import { AssetRequest, DesignLanguage, LayoutData, LayoutElement, ParsedPrompt } from "../types";
import { clampName } from "../utils/naming";

export class LayoutEngine {
  create(parsedPrompt: ParsedPrompt, design: DesignLanguage, assets: AssetRequest[]): LayoutData {
    const isUi = parsedPrompt.command === "$UI_GEN";
    const elements = isUi
      ? this.createUiElements(parsedPrompt, design)
      : this.createAssetElements(assets);

    return {
      canvas: {
        width: isUi ? 1080 : 1024,
        height: isUi ? 1920 : 1024,
        orientation: isUi ? "adaptive" : "portrait"
      },
      safeAreas: {
        top: 88,
        right: 36,
        bottom: 54,
        left: 36
      },
      grid: {
        columns: 12,
        rows: isUi ? 24 : 12,
        gutter: 16,
        margin: 48
      },
      elements,
      layerHierarchy: [
        "background",
        "gameplay",
        "gameplay_vfx",
        "hud",
        "modal_scrim",
        "popup",
        "tooltip",
        "transition"
      ],
      responsiveRules: [
        {
          id: "safe_area_adaptation",
          appliesTo: "all_safe_area_aware_elements",
          portrait: { topInset: 88, bottomInset: 54, sideInset: 36 },
          landscape: { topInset: 36, bottomInset: 28, sideInset: 76 },
          tablet: { topInset: 52, bottomInset: 42, sideInset: 72 }
        },
        {
          id: "touch_target_scaling",
          appliesTo: "interactive_controls",
          portrait: { minHeight: 56, minWidth: 56 },
          landscape: { minHeight: 52, minWidth: 52 },
          tablet: { minHeight: 64, minWidth: 64 }
        },
        {
          id: "gameplay_visibility",
          appliesTo: "hud",
          portrait: { maxGameplayOcclusionPercent: 14 },
          landscape: { maxGameplayOcclusionPercent: 18 },
          tablet: { maxGameplayOcclusionPercent: 12 }
        }
      ],
      syncRules: [
        "button.height -> icon.size = round(button.height * 0.42)",
        "button.height -> label.fontSize = round(button.height * 0.34)",
        "button.width -> horizontalGap = max(16, round(button.width * 0.08))",
        "popup.width -> contentPadding = round(popup.width * 0.06)",
        "scoreCounter.height -> number.fontSize = round(scoreCounter.height * 0.46)",
        "safeArea.top changes -> hud.y and modal.y are recomputed from anchors",
        "orientation changes -> center stacks preserve visual order and touch target minimums"
      ]
    };
  }

  private createUiElements(parsedPrompt: ParsedPrompt, design: DesignLanguage): LayoutElement[] {
    const screens = parsedPrompt.requestedScreens.length > 0 ? parsedPrompt.requestedScreens : ["start menu"];
    const elements: LayoutElement[] = [];

    screens.forEach((screen, index) => {
      const id = clampName(screen, `screen_${index + 1}`);
      const topOffset = 140 + index * 24;

      elements.push({
        id: `${id}_title`,
        type: "text",
        anchor: "top",
        frame: { x: 140, y: topOffset, width: 800, height: 112 },
        zIndex: 40 + index,
        safeAreaAware: true,
        scaleMode: "textAuto",
        syncGroup: id
      });

      elements.push({
        id: `${id}_primary_action`,
        type: "button",
        anchor: "center",
        frame: {
          x: 300,
          y: 720 + index * 22,
          width: Math.max(360, design.button.minWidth * 2),
          height: design.button.height
        },
        zIndex: 50 + index,
        safeAreaAware: true,
        scaleMode: "nineSlice",
        syncGroup: id
      });
    });

    elements.push({
      id: "hud_score_counter",
      type: "scoreCounter",
      anchor: "topLeft",
      frame: { x: 48, y: 96, width: 220, height: 72 },
      zIndex: 60,
      safeAreaAware: true,
      scaleMode: "fit",
      syncGroup: "hud"
    });

    elements.push({
      id: "hud_currency_counter",
      type: "scoreCounter",
      anchor: "topRight",
      frame: { x: 812, y: 96, width: 220, height: 72 },
      zIndex: 60,
      safeAreaAware: true,
      scaleMode: "fit",
      syncGroup: "hud"
    });

    return elements;
  }

  private createAssetElements(assets: AssetRequest[]): LayoutElement[] {
    return assets.map((asset, index) => ({
      id: `${asset.id}_preview`,
      type: asset.kind,
      anchor: "center",
      frame: {
        x: 256,
        y: 256,
        width: Math.min(asset.dimensions.width, 512),
        height: Math.min(asset.dimensions.height, 512)
      },
      zIndex: 10 + index,
      safeAreaAware: false,
      scaleMode: asset.kind === "ui" ? "nineSlice" : "fit",
      syncGroup: asset.kind
    }));
  }
}
