# VFX Timing

## Common Effects

- `score_pop`: 6 to 9 frames, quick scale and fade
- `combo_glow`: 9 to 12 frames, pulse, peak glow, soft fade
- `explosion`: 8 to 12 frames, ignition, expansion, peak, dissolve
- `win`: 12 to 18 frames, burst, particles, lingering sparkle
- `collect`: 6 to 9 frames, snap, trail, vanish
- `unlock`: 8 to 12 frames, glow ring, pop, settle
- `fail`: 4 to 6 frames, shake, dim, puff

## Curves

- scale: `0.72 -> 1.18 -> 1.0`
- alpha: `0 -> 1 -> 0`
- glow: `0 -> peak at 32% -> fade`
- particle spread: `compact -> wide -> dissolve`

## Blend Modes

- glossy arcade: additive
- clean puzzle minimalism: normal or screen
- soft neon casual: screen
- toy-like UI: additive for rewards, normal for object feedback
- hypercasual: additive with restrained particle count
