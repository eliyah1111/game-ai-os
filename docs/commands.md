# Commands

Only these commands are accepted:

- `$SPRITE_GEN`
- `$UI_GEN`
- `$OBJECT_GEN`
- `$BACKGROUND_GEN`
- `$VFX_GEN`

The first non-empty prompt line must be exactly one of those commands. This keeps the system predictable and prevents accidental expansion into unrelated generator modes.

## `$SPRITE_GEN`

Generates animated gameplay character or character-like assets with animation timing, collision suggestions, transparent PNG expectations, and atlas metadata.

## `$UI_GEN`

Generates mobile game UI systems with layout metadata, responsive rules, safe zones, typography, spacing, and synchronized UI components.

## `$OBJECT_GEN`

Generates gameplay objects such as puzzle blocks, obstacles, collectibles, arrows, balls, tiles, barriers, tubes, and boosters.

## `$BACKGROUND_GEN`

Generates layered backgrounds, looping scene guidance, parallax depth metadata, blur maps, and atmosphere metadata.

## `$VFX_GEN`

Generates casual-game VFX recipes with frames, timing metadata, blend suggestions, and animation curves.
