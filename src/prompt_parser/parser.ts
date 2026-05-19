import { assertCommandName, isCommandName } from "../core/commands";
import { ParsedPrompt } from "../types";

const KNOWN_STYLE_HINTS = [
  "glossy mobile arcade",
  "clean puzzle minimalism",
  "soft neon casual",
  "colorful toy-like ui",
  "modern hypercasual",
  "modern glossy puzzle game",
  "cute glossy style"
];

const ANIMATION_KEYWORDS = [
  "idle",
  "movement",
  "move",
  "run",
  "jump",
  "hit",
  "win",
  "lose",
  "loop",
  "pop",
  "pulse",
  "explode",
  "bounce"
];

const SCREEN_KEYWORDS = [
  "start menu",
  "main menu",
  "settings menu",
  "pause screen",
  "pause menu",
  "game over popup",
  "game over screen",
  "hud",
  "shop",
  "level complete",
  "win screen"
];

const LAYOUT_KEYWORDS = [
  "exact positioning",
  "alignment grid",
  "auto-spacing",
  "responsive",
  "anchor",
  "safe area",
  "notch-safe",
  "portrait",
  "landscape",
  "tablet",
  "touch accessibility",
  "z-index"
];

export function parsePrompt(rawPrompt: string): ParsedPrompt {
  const raw = rawPrompt.replace(/\r\n/g, "\n").trim();
  if (!raw) {
    throw new Error("Prompt is empty. Start with one of the five Game AI OS commands.");
  }

  const lines = raw.split("\n").map((line) => line.trim()).filter(Boolean);
  const commandLine = lines[0];

  if (commandLine.startsWith("$")) {
    assertCommandName(commandLine);
  }

  if (!isCommandName(commandLine)) {
    throw new Error("Prompt must begin with exactly one command: $SPRITE_GEN, $UI_GEN, $OBJECT_GEN, $BACKGROUND_GEN, or $VFX_GEN.");
  }

  const bodyLines = lines.slice(1);
  const sections = parseSections(bodyLines);
  const subject = inferSubject(bodyLines, sections);
  const normalized = raw.toLowerCase();

  return {
    command: commandLine,
    raw,
    subject,
    sections,
    requestedStyle: findFirst(normalized, KNOWN_STYLE_HINTS),
    requestedAnimations: findAll(normalized, ANIMATION_KEYWORDS).map(normalizeAnimationName),
    requestedScreens: findAll(normalized, SCREEN_KEYWORDS),
    assetKeywords: inferAssetKeywords(normalized),
    layoutRules: findAll(normalized, LAYOUT_KEYWORDS),
    metadata: inferMetadata(sections)
  };
}

function parseSections(lines: string[]): Record<string, string[]> {
  const sections: Record<string, string[]> = {};
  let current = "brief";

  for (const line of lines) {
    const sectionMatch = line.match(/^([a-zA-Z][a-zA-Z\s-]{1,40}):$/);
    if (sectionMatch) {
      current = sectionMatch[1].toLowerCase().replace(/\s+/g, "_");
      sections[current] = sections[current] ?? [];
      continue;
    }

    sections[current] = sections[current] ?? [];
    sections[current].push(line.replace(/^[-*]\s*/, ""));
  }

  return sections;
}

function inferSubject(lines: string[], sections: Record<string, string[]>): string {
  const createLines = sections.create ?? [];
  const briefLines = sections.brief ?? [];
  const candidate = [...createLines, ...briefLines, ...lines]
    .find((line) => !line.includes(":") && !line.toLowerCase().startsWith("style"));

  return candidate?.replace(/^[-*]\s*/, "") ?? "mobile casual game asset";
}

function findFirst(text: string, needles: string[]): string | undefined {
  return needles.find((needle) => text.includes(needle));
}

function findAll(text: string, needles: string[]): string[] {
  return [...new Set(needles.filter((needle) => text.includes(needle)))];
}

function normalizeAnimationName(name: string): string {
  if (name === "move" || name === "run") {
    return "movement";
  }

  if (name === "explode") {
    return "explosion";
  }

  return name;
}

function inferAssetKeywords(text: string): string[] {
  const words = [
    "button",
    "popup",
    "progress bar",
    "score counter",
    "cube",
    "block",
    "tile",
    "ball",
    "tube",
    "barrier",
    "booster",
    "background",
    "glow",
    "combo",
    "explosion",
    "collectible",
    "obstacle"
  ];

  return findAll(text, words);
}

function inferMetadata(sections: Record<string, string[]>): Record<string, string | string[]> {
  const metadata: Record<string, string | string[]> = {};

  for (const [section, values] of Object.entries(sections)) {
    if (["style", "output", "exports", "metadata", "layout"].includes(section)) {
      metadata[section] = values;
    }
  }

  return metadata;
}
