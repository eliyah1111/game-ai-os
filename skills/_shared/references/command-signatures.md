# Command Signatures

Each command has a fixed signature, or visual stamp. This keeps behavior predictable and prevents the commands from becoming generic prompt helpers.

| Command | Signature | Required Image Output |
| --- | --- | --- |
| `$SPRITE_GEN` | modern mobile casual gameplay sprite, transparent frames, stable identity | sprite frames and atlas |
| `$UI_GEN` | modern mobile casual puzzle UI, exact safe-area layout, synchronized components | layered UI images |
| `$OBJECT_GEN` | readable board-scale puzzle objects, transparent variants, collision-ready | object PNG variants |
| `$BACKGROUND_GEN` | gameplay-safe layered mobile background, depth and blur metadata | layered background PNGs |
| `$VFX_GEN` | short satisfying casual-game VFX, transparent frames, blend/timing metadata | VFX frame sequence |

## Shared Stamp Rules

- The command name with `$` is part of the identity.
- The active Style Lock profile is mandatory.
- The image prompt must include the command signature.
- The output must include real images when run as a Codex skill.
- The output must include engine-ready metadata.
- Pixel art, retro RPG defaults, and complex AAA realism are forbidden unless the user explicitly overrides the project direction.
