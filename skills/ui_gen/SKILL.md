---
name: "$UI_GEN"
description: "Generate precise responsive mobile casual-game UI systems with Style Lock consistency, safe areas, anchors, layered assets, typography, spacing, layout metadata, and deterministic layout guides. Use for $UI_GEN only."
---

# $UI_GEN

Use this skill only when the user invokes `$UI_GEN`.

This skill is the UI-framework side of Game AI OS: it treats generated UI as a synchronized mobile layout system, not isolated button art.

## Parameters

Infer these from the user request:

- `screens`: start_menu | settings_menu | pause_screen | hud | game_over | level_complete | shop | popup
- `components`: button | icon_button | popup | progress_bar | score_counter | tab | slider | toggle
- `orientation`: portrait | landscape | adaptive
- `safe_area`: phone | tablet | notch_safe
- `layout_density`: compact | standard | spacious
- `style`: active Style Lock profile
- `name`: output-safe slug

## Agent Rules

- Use only `$UI_GEN` as the user-facing command.
- This command is image-first: create actual UI bitmap assets with built-in image generation before returning.
- Always apply the fixed `$UI_GEN` command signature: modern mobile casual puzzle UI, exact safe-area layout, style-locked components, synchronized spacing.
- Exact positioning is mandatory: anchors, frames, z-index, safe-area flags, and responsive rules.
- Any component size change must update related spacing, icon scale, font size, and alignment metadata.
- Keep gameplay visible; HUD must not cover critical board space.
- Use modern casual/puzzle UI aesthetics only.
- Do not produce marketing landing pages.
- Do not use pixel-art UI, RPG menu language, or tiny unreadable labels.

## Workflow

1. Infer screens and components.
2. Resolve the active Style Lock profile.
3. Apply the `$UI_GEN` command signature.
4. Create a layout plan from `references/layout-contract.md`.
5. Optionally create a layout guide with `scripts/make_layout_guide.mjs`.
6. Use built-in image generation to create layered UI assets and composition images.
7. Write `layout_data.json` with anchors, frames, z-index, safe areas, responsive rules, and sync rules.

## Output

- layered UI assets
- layout metadata
- responsive rules
- typography system
- spacing system
- animation suggestions
- Unity/Godot/Web manifests

## Resources

- `references/layout-contract.md`
- `references/component-system.md`
- `scripts/make_layout_guide.mjs`
- `../_shared/references/image-generation-contract.md`
- `../_shared/references/command-signatures.md`
- `../_shared/references/style-lock-contract.md`
- `../_shared/references/mobile-export-contract.md`
