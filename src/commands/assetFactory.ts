import { AnimationSpec, AssetRequest, CollisionSuggestion } from "../types";
import { clampName } from "../utils/naming";

interface CreateAssetInput {
  kind: AssetRequest["kind"];
  role: string;
  name: string;
  description: string;
  width: number;
  height: number;
  transparent?: boolean;
  layers?: string[];
  variants?: string[];
  animations?: AnimationSpec[];
  collision?: CollisionSuggestion;
  prompt: string;
  exportTags?: string[];
}

export function createAsset(input: CreateAssetInput): AssetRequest {
  const base = clampName(input.name, input.role);

  return {
    id: `${input.kind}_${base}`,
    kind: input.kind,
    role: input.role,
    name: input.name,
    fileBaseName: base,
    description: input.description,
    dimensions: {
      width: input.width,
      height: input.height
    },
    transparent: input.transparent ?? input.kind !== "background",
    layers: input.layers ?? ["base", "highlight", "shadow"],
    variants: input.variants ?? [],
    animations: input.animations ?? [],
    collision: input.collision ?? { shape: "none" },
    prompt: input.prompt,
    exportTags: input.exportTags ?? [input.kind, input.role]
  };
}

export function createAnimation(id: string, frameBaseName: string, frameCount: number, fps: number, loop: boolean, easing: string): AnimationSpec {
  const frames = Array.from({ length: frameCount }, (_, index) => `${frameBaseName}_${String(index + 1).padStart(2, "0")}.png`);

  return {
    id,
    frames,
    fps,
    loop,
    easing,
    durationMs: Math.round((frameCount / fps) * 1000)
  };
}
