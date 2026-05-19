# Game AI OS

Game AI OS is a modular AI-powered asset creation system for modern mobile casual and puzzle games. It is inspired by agent-style creative pipelines, but the focus is not pixel art, retro sheets, RPG packs, or AAA realism. The system is built around visual consistency, precise mobile UI, scalable assets, satisfying feedback, and engine-ready exports.

The intended target games are in the family of Paper.io, Block Blast, Block Out, Color Sort Puzzle, Bubble Shooter, and puzzle escape games.

## Commands

Game AI OS intentionally exposes only five commands:

| Command | Purpose |
| --- | --- |
| `$SPRITE_GEN` | Gameplay characters and animated gameplay assets |
| `$UI_GEN` | Complete mobile game UI systems |
| `$OBJECT_GEN` | Puzzle objects, obstacles, collectibles, boosters, tiles, tubes, balls, and barriers |
| `$BACKGROUND_GEN` | Layered casual-game backgrounds and parallax environments |
| `$VFX_GEN` | Satisfying effects such as score pops, combo glows, explosions, and win feedback |

Any other command is rejected by the parser.

## Install

### Windows PowerShell

```powershell
irm https://raw.githubusercontent.com/eliyah1111/game-ai-os/main/install.ps1 | iex
```

### macOS / Linux

```bash
curl -fsSL https://raw.githubusercontent.com/eliyah1111/game-ai-os/main/install.sh | bash
```

The installer clones or downloads this repository into `~/.codex/game-ai-os`, installs Node dependencies when `npm` is available, builds the TypeScript tools, and copies the five Forge-style skills into `~/.codex/skills`.

Restart Codex after installation so the new skills load cleanly.

## Quick Start

```bash
npm install
npm run build
npm run generate:ui
```

Run a custom prompt:

```bash
node dist/src/cli.js --input examples/object_gen_blocks.prompt
```

Forge-style local processing tools:

```bash
npm run make:layout-guide -- --output exports/tmp/ui-guide.svg --rows 4 --cols 4
npm run process:sheet -- --input raw-sheet.png --output exports/tmp/sprite --rows 2 --cols 2 --name spr_idle --chroma-key "#FF00FF"
```

Each generation writes an export folder under `exports/` with:

- `generated_assets/`
- `metadata.json`
- `style_profile.json`
- `layout_data.json`
- `export_ready/unity/`
- `export_ready/godot/`
- `export_ready/web/`

The local preview provider creates transparent PNG placeholders, SVG previews, and production render recipes. Connect your preferred image model or internal renderer to the recipe files to produce final art while preserving the metadata contract.

## Example Prompt

```text
$UI_GEN
Create:
- start menu
- settings menu
- game over popup

Style:
modern glossy puzzle game

Layout:
- notch-safe portrait layout
- responsive tablet rules
- exact button alignment
```

## Architecture

```text
game-ai-os/
  skills/
    sprite_gen/
      SKILL.md
      agents/
      references/
      scripts/
    ui_gen/
    object_gen/
    background_gen/
    vfx_gen/
  src/
    commands/
    core/
    exports/
    prompt_parser/
    utils/
  style_engine/
  layout_engine/
  prompt_parser/
  memory/
  exports/
  assets/
  examples/
  docs/
```

Each skill follows a Forge-style package contract:

- `SKILL.md` for agent behavior and workflow
- `agents/openai.yaml` for interface defaults
- `references/` for mode, prompt, layout, collision, timing, or strategy rules
- `scripts/` for deterministic local processing

## Core Systems

### Style Lock Engine

The Style Lock Engine resolves the active visual style and stores it in local memory. Every command inherits the same palette, lighting language, shape language, shadow style, border radius system, spacing scale, typography, outlines, and animation easing.

Built-in styles:

- Glossy Mobile Arcade
- Clean Puzzle Minimalism
- Soft Neon Casual
- Colorful Toy-Like UI
- Modern Hypercasual

### Design Language Engine

The Design Language Engine converts the active style into shared production tokens for buttons, icons, objects, VFX, gradients, shadows, and easing. This keeps UI, sprites, objects, backgrounds, and VFX visually synchronized.

### Layout Engine

The Layout Engine produces exact mobile positioning metadata:

- anchors
- frames
- z-index values
- safe-area rules
- portrait, landscape, and tablet responsive rules
- UI synchronization rules
- layer hierarchy

### Prompt Parser

The parser converts natural language into structured generation intent:

- command
- style instructions
- asset types
- animation requests
- layout rules
- output metadata

## Export Targets

Game AI OS writes engine-ready manifests for:

- Unity
- Godot
- Web games

The manifests include import recommendations, sprite mode hints, preload strategy, texture behavior, CSS tokens, and references to generated assets and recipes.

## Screenshots

Add screenshots or generated previews here as production renderers are connected.

## Development

```bash
npm run build
npm test
```

## Guardrails

Game AI OS is optimized for modern mobile casual and puzzle game creation. It deliberately avoids:

- pixel-art generators
- retro RPG systems
- complex 3D AAA pipelines
- overly realistic texture-heavy assets
