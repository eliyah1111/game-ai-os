---
name: "$OBJECT_GEN"
description: "Generate modern mobile puzzle gameplay objects, variants, collision metadata, scale rules, transparent PNG recipes, and deterministic variant-sheet processing. Use for $OBJECT_GEN only."
---

# $OBJECT_GEN

Use this skill only when the user invokes `$OBJECT_GEN`.

This skill creates puzzle blocks, obstacles, collectibles, arrows, balls, tiles, barriers, tubes, boosters, and similar gameplay objects for modern casual games.

## Parameters

Infer these from the user request:

- `object_type`: block | tile | ball | tube | barrier | obstacle | booster | collectible | arrow
- `state`: normal | selected | locked | disabled | charged | reward
- `variant_count`: auto or explicit
- `collision`: box | circle | capsule | polygon | none
- `scale_rule`: board_cell | draggable | hud_icon | world_object
- `style`: active Style Lock profile
- `name`: output-safe slug

## Agent Rules

- Use only `$OBJECT_GEN` as the user-facing command.
- This command is image-first: create actual transparent object images with built-in image generation before returning.
- Always apply the fixed `$OBJECT_GEN` command signature: modern mobile puzzle object, readable board-scale silhouette, style-locked variants.
- Preserve the active Style Lock profile across every variant.
- Keep silhouettes identical across color variants when gameplay meaning depends on color.
- Use clear collision metadata and keep colliders slightly inset from glossy edges.
- Do not make RPG props, pixel-art tilesets, or realism-heavy object renders.
- For variant sheets, use deterministic slicing and QC rather than hand-written frame names.

## Workflow

1. Classify objects with `references/object-taxonomy.md`.
2. Resolve collision and scale rules with `references/collision-rules.md`.
3. Apply the `$OBJECT_GEN` command signature and active Style Lock profile.
4. Use built-in image generation to create transparent object assets or a variant sheet.
4. Use `scripts/slice_object_variants.mjs` for sheet splitting and QC metadata when needed.
5. Return transparent PNGs, variants, object metadata, scale rules, and collision metadata.

## Output

- transparent PNGs
- variant assets
- object metadata
- scale rules
- collision metadata
- engine manifests

## Pink Key Object Extraction

- raw object sheets use exact flat light-pink `#FFD6E7`
- do not use the key color inside the object artwork
- each variant stays inside its own cell
- extracted objects are trimmed to visible pixels
- `placement-data.json` stores exact source cell, bounding box, offset, and pivot

## Resources

- `references/object-taxonomy.md`
- `references/collision-rules.md`
- `scripts/slice_object_variants.mjs`
- `../_shared/references/image-generation-contract.md`
- `../_shared/references/command-signatures.md`
- `../_shared/references/style-lock-contract.md`
- `../_shared/references/mobile-export-contract.md`
