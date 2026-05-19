# Style Lock Contract

Every skill must preserve the active Style Lock profile.

## Required Tokens

- palette
- lighting language
- shape language
- shadow style
- border radius scale
- UI spacing scale
- typography system
- outline thickness
- animation easing

## Rendering Rules

- Do not switch art direction between generated asset types.
- Do not introduce retro, pixel-art, RPG, or AAA realism language unless the user explicitly overrides the product direction.
- Keep object silhouettes readable at phone scale.
- Keep gameplay objects visually simpler than reward VFX.
- Keep UI components synchronized through shared dimensions, radius, icon scale, font scale, and shadow tokens.

## Output Rules

Every run must preserve:

- `metadata.json`
- `style_profile.json`
- `layout_data.json`
- engine-ready export manifests
