export const COMMAND_NAMES = [
  "$SPRITE_GEN",
  "$UI_GEN",
  "$OBJECT_GEN",
  "$BACKGROUND_GEN",
  "$VFX_GEN"
] as const;

export type CommandName = (typeof COMMAND_NAMES)[number];

export type ExportTarget = "unity" | "godot" | "web";

export interface CommandSignature {
  command: CommandName;
  signatureId: string;
  displayName: string;
  fixedIntent: string;
  imageGeneration: {
    required: boolean;
    provider: "codex_image_gen";
    rawBackground: "transparent" | "#FFD6E7" | "style_background";
    finalFormat: "transparent_png" | "layered_png" | "png_sequence";
    preferredAspectRatio: string;
    minimumResolution: {
      width: number;
      height: number;
    };
    extraction: {
      mode: "pixel_exact_pink_key";
      matteColor: "#FFD6E7";
      tolerance: number;
      preserveCanvasCoordinates: boolean;
      trimTransparentBounds: boolean;
    };
  };
  visualStamp: {
    promptPrefix: string;
    promptSuffix: string;
    namingPrefix: string;
    outputFolder: string;
  };
  requiredOutputs: string[];
  forbiddenOutputs: string[];
}

export interface ParsedPrompt {
  command: CommandName;
  raw: string;
  subject: string;
  sections: Record<string, string[]>;
  requestedStyle?: string;
  requestedAnimations: string[];
  requestedScreens: string[];
  assetKeywords: string[];
  layoutRules: string[];
  metadata: Record<string, string | string[]>;
}

export interface StyleProfile {
  id: string;
  name: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    success: string;
    warning: string;
    danger: string;
  };
  lighting: string;
  shapeLanguage: string;
  shadowStyle: {
    color: string;
    opacity: number;
    blur: number;
    offsetX: number;
    offsetY: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    pill: number;
  };
  spacing: {
    unit: number;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    family: string;
    headingWeight: number;
    bodyWeight: number;
    numberWeight: number;
  };
  outline: {
    thickness: number;
    color: string;
    opacity: number;
  };
  animation: {
    easing: string;
    microDurationMs: number;
    enterDurationMs: number;
    loopDurationMs: number;
    squashStretch: number;
  };
  notes: string[];
}

export interface DesignLanguage {
  styleId: string;
  button: {
    height: number;
    minWidth: number;
    radius: number;
    paddingX: number;
    iconSize: number;
    shadow: string;
  };
  icon: {
    strokeWidth: number;
    cornerRadius: number;
    highlight: string;
  };
  object: {
    outlineWidth: number;
    highlightAngle: number;
    contactShadowOpacity: number;
  };
  vfx: {
    blendMode: "normal" | "screen" | "additive";
    glowRadius: number;
    particleShape: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    surface: string;
  };
  easing: string;
}

export interface ResponsiveRule {
  id: string;
  appliesTo: string;
  portrait: Record<string, number | string>;
  landscape: Record<string, number | string>;
  tablet: Record<string, number | string>;
}

export interface LayoutElement {
  id: string;
  type: string;
  anchor: "top" | "bottom" | "left" | "right" | "center" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  frame: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  zIndex: number;
  safeAreaAware: boolean;
  scaleMode: "fixed" | "fit" | "fill" | "nineSlice" | "textAuto";
  syncGroup?: string;
}

export interface LayoutData {
  canvas: {
    width: number;
    height: number;
    orientation: "portrait" | "landscape" | "adaptive";
  };
  safeAreas: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  grid: {
    columns: number;
    rows: number;
    gutter: number;
    margin: number;
  };
  elements: LayoutElement[];
  layerHierarchy: string[];
  responsiveRules: ResponsiveRule[];
  syncRules: string[];
}

export interface CollisionSuggestion {
  shape: "circle" | "box" | "capsule" | "polygon" | "none";
  width?: number;
  height?: number;
  radius?: number;
  offsetX?: number;
  offsetY?: number;
  notes?: string;
}

export interface AnimationSpec {
  id: string;
  frames: string[];
  fps: number;
  loop: boolean;
  easing: string;
  durationMs: number;
  events?: Array<{
    atMs: number;
    name: string;
  }>;
}

export interface AssetRequest {
  id: string;
  kind: "sprite" | "ui" | "object" | "background" | "vfx";
  role: string;
  name: string;
  fileBaseName: string;
  description: string;
  dimensions: {
    width: number;
    height: number;
  };
  transparent: boolean;
  layers: string[];
  variants: string[];
  animations: AnimationSpec[];
  collision: CollisionSuggestion;
  prompt: string;
  exportTags: string[];
}

export interface SkillGeneration {
  command: CommandName;
  assets: AssetRequest[];
  metadata: Record<string, unknown>;
}

export interface GeneratedAssetFile {
  assetId: string;
  pngPath: string;
  svgPreviewPath: string;
  recipePath: string;
}

export interface GenerationPackage {
  parsedPrompt: ParsedPrompt;
  commandSignature: CommandSignature;
  styleProfile: StyleProfile;
  designLanguage: DesignLanguage;
  layoutData: LayoutData;
  skillGeneration: SkillGeneration;
}

export interface ExportResult {
  outputDir: string;
  generatedAssets: GeneratedAssetFile[];
  metadataPath: string;
  styleProfilePath: string;
  layoutDataPath: string;
  exportReadyDir: string;
}
