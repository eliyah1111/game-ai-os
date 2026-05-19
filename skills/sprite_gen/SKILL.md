---
name: "$SPRITE_GEN"
description: "Generate modern mobile casual-game gameplay sprites and animation bundles with Style Lock consistency, transparent PNG outputs, frame metadata, atlas recipes, collision hints, and deterministic sheet processing. Use for $SPRITE_GEN only."
---

# $SPRITE_GEN

Use this skill only when the user invokes `$SPRITE_GEN`.

This is the Game AI OS equivalent of a Forge-style sprite workflow, adapted away from pixel art and toward polished mobile casual/puzzle assets.

## Parameters

Infer these from the user request:

- `asset_role`: character | mascot | enemy | helper | avatar | animated_gameplay_asset
- `actions`: idle | movement | jump | hit | win | lose | loop
- `view`: front | slight_3_4 | top_readable | board_piece
- `bundle`: single_action | action_bundle | engine_atlas
- `frames`: auto or explicit count
- `anchor`: center | bottom | gameplay_origin
- `style`: active Style Lock profile
- `name`: output-safe slug

## Agent Rules

- Use only `$SPRITE_GEN` as the user-facing command.
- Keep the active Style Lock profile across every action.
- Do not default to pixel art, retro RPG sheets, or 16-bit language.
- Generate one coherent action family per raw sheet.
- For multi-action mascots or characters, plan separate action sheets first, then assemble an engine atlas after QC.
- Keep body scale consistent across idle, movement, hit, win, and lose.
- Keep detached VFX separate unless the runtime metadata explicitly supports wider cells and origins.
- Use built-in image generation for production bitmap art.
- Use scripts only for deterministic cleanup, frame extraction, layout guides, and QC metadata.

## Workflow

1. Infer the animation plan and frame counts.
2. Write a production prompt using `references/prompt-rules.md`.
3. Generate a raw visual sheet with a flat `#FF00FF` background when sheet processing is needed.
4. Run `scripts/process_sprite_sheet.mjs` to remove chroma key, split frames, and write QC metadata.
5. Reject or regenerate if frames touch cell edges, drift in scale, or lose silhouette readability.
6. Return transparent PNGs, frames, atlas metadata, timing, and collision suggestions.

## Defaults

- idle: 4 frames, `2x2`
- movement: 6 frames, `2x3`
- hit: 4 frames, `2x2`, non-looping
- win: 6 frames, `2x3`, non-looping
- lose: 4 frames, `2x2`, non-looping
- loop VFX attached to sprite: separate VFX request unless it is tiny and tightly attached

## Resources

- `references/modes.md`
- `references/prompt-rules.md`
- `scripts/process_sprite_sheet.mjs`
- `../_shared/references/style-lock-contract.md`
- `../_shared/references/mobile-export-contract.md`
