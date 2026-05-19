import assert from "node:assert/strict";
import { parsePrompt } from "../src/prompt_parser/parser";

const uiPrompt = `$UI_GEN
Create:
- start menu
- settings menu

Style:
modern glossy puzzle game

Layout:
- notch-safe responsive layout`;

const parsedUi = parsePrompt(uiPrompt);

assert.equal(parsedUi.command, "$UI_GEN");
assert.equal(parsedUi.requestedStyle, "modern glossy puzzle game");
assert.deepEqual(parsedUi.requestedScreens, ["start menu", "settings menu"]);
assert.ok(parsedUi.layoutRules.includes("responsive"));

const spritePrompt = `$SPRITE_GEN
Flying cube character
Idle animation
Hit animation`;

const parsedSprite = parsePrompt(spritePrompt);

assert.equal(parsedSprite.command, "$SPRITE_GEN");
assert.ok(parsedSprite.requestedAnimations.includes("idle"));
assert.ok(parsedSprite.requestedAnimations.includes("hit"));

assert.throws(() => parsePrompt("$PIXEL_GEN\nRetro knight"), /Unsupported command/);
assert.throws(() => parsePrompt("Make me a button"), /Prompt must begin/);

process.stdout.write("parser.test.ts passed\n");
