---
name: "$VFX_GEN"
description: "Generate satisfying modern mobile casual-game VFX frames, timing metadata, blend modes, animation curves, particle recipes, and deterministic frame processing. Use for $VFX_GEN only."
---

# $VFX_GEN

Use this skill only when the user invokes `$VFX_GEN`.

This skill creates score pops, combo glows, explosions, win effects, particle bursts, and other satisfying feedback assets for casual/puzzle games.

## Parameters

Infer these from the user request:

- `effect_type`: score_pop | combo_glow | explosion | win | collect | unlock | fail | streak
- `intensity`: subtle | standard | reward | celebration
- `frames`: auto or explicit count
- `blend_mode`: normal | screen | additive
- `anchor`: center | object_center | hud_counter | board_cell
- `performance`: standard | low_performance
- `style`: active Style Lock profile
- `name`: output-safe slug

## Agent Rules

- Use only `$VFX_GEN` as the user-facing command.
- Match the active Style Lock glow, particle shape, color palette, and easing.
- Keep VFX short, satisfying, and readable.
- Do not cover important puzzle state for too long.
- Keep low-performance variants in metadata.
- Use deterministic processing for frame sheets and QC.

## Workflow

1. Select an effect model from `references/vfx-timing.md`.
2. Write a style-locked prompt for transparent VFX frames.
3. Generate a raw sheet with solid `#FF00FF` background when processing is needed.
4. Use `scripts/process_vfx_sheet.mjs` to remove chroma key, split frames, and emit QC metadata.
5. Return frames, timing metadata, blending suggestions, and animation curves.

## Output

- VFX frames
- timing metadata
- blending suggestions
- animation curves
- particle notes
- low-performance variant notes

## Resources

- `references/vfx-timing.md`
- `scripts/process_vfx_sheet.mjs`
- `../_shared/references/style-lock-contract.md`
- `../_shared/references/mobile-export-contract.md`
