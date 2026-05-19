---
name: background_gen
description: "Generate layered modern mobile casual-game backgrounds with parallax metadata, loop rules, blur maps, atmosphere notes, and gameplay readability constraints. Use for $BACKGROUND_GEN only."
---

# Background Gen

Use this skill only when the user invokes `$BACKGROUND_GEN`.

This skill creates game environments and layered backgrounds for casual/puzzle games while preserving gameplay readability.

## Parameters

Infer these from the user request:

- `environment`: abstract | room | garden | sky | toy_world | neon | puzzle_space
- `layering`: flat | layered | parallax | looping
- `orientation`: portrait | landscape | adaptive
- `menu_variant`: sharp | blurred | dimmed | vignette
- `depth`: far | mid | near | gameplay_plane
- `style`: active Style Lock profile
- `name`: output-safe slug

## Agent Rules

- Use only `$BACKGROUND_GEN` as the user-facing command.
- Keep the active Style Lock profile.
- Backgrounds must support gameplay visibility.
- Avoid busy texture detail behind puzzle boards.
- Do not create RPG maps, tilemaps, or complex AAA environments.
- Write depth, blur, parallax, and crop-safe metadata.

## Workflow

1. Select a background strategy from `references/background-strategies.md`.
2. Define layers and gameplay readability constraints.
3. Generate layered background assets or recipes.
4. Use `scripts/compose_background_manifest.mjs` to create an engine layer manifest when needed.
5. Return layered backgrounds, depth separation, blur maps, and atmosphere metadata.

## Output

- layered backgrounds
- depth separation
- blur maps
- atmosphere metadata
- Unity/Godot/Web manifests

## Resources

- `references/background-strategies.md`
- `scripts/compose_background_manifest.mjs`
- `../_shared/references/style-lock-contract.md`
- `../_shared/references/mobile-export-contract.md`
