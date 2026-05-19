import { generateBackgrounds } from "./backgroundGen";
import { generateObjects } from "./objectGen";
import { generateSprites } from "./spriteGen";
import { generateUi } from "./uiGen";
import { generateVfx } from "./vfxGen";
import { CommandName, DesignLanguage, ParsedPrompt, SkillGeneration, StyleProfile } from "../types";

export type SkillHandler = (parsed: ParsedPrompt, style: StyleProfile, design: DesignLanguage) => SkillGeneration;

export const SKILL_REGISTRY: Record<CommandName, SkillHandler> = {
  $SPRITE_GEN: generateSprites,
  $UI_GEN: generateUi,
  $OBJECT_GEN: generateObjects,
  $BACKGROUND_GEN: generateBackgrounds,
  $VFX_GEN: generateVfx
};
