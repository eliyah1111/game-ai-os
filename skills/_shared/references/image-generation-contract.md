# Image Generation Contract

Every `$..._GEN` command is image-first.

## Non-Negotiable Rule

When a command is invoked in Codex, the agent must create actual bitmap images with built-in image generation. The agent must not stop at planning, metadata, JSON, prompts, or placeholder files.

## Required Flow

1. Resolve the active Style Lock profile.
2. Apply the command's fixed signature.
3. Write the final image prompt manually.
4. Use built-in image generation for the visible art.
5. Save or reference the generated images in the export bundle.
6. Run deterministic scripts when sheet slicing, layout guides, light-pink key cleanup, or QC metadata are needed.
7. Return image paths plus `metadata.json`, `style_profile.json`, and `layout_data.json`.

## Pink Key Extraction

Use exact flat light pink `#FFD6E7` as the raw extraction background for UI, sprites, objects, separated background layers, and VFX frames.

The processor must:

- remove only the exact key color by default, with tolerance `0`
- preserve a full transparent canvas for exact coordinates
- write trimmed per-frame or per-cell PNGs into `extracted/`
- write exact `x`, `y`, `width`, `height`, `sourceX`, `sourceY`, and pivot metadata into `placement-data.json`
- reject or regenerate sheets where the key color appears inside the actual asset

## Local CLI Caveat

The local TypeScript CLI cannot call Codex image generation directly. It writes image recipes, metadata, preview placeholders, and engine manifests. In a Codex skill session, the skill must use built-in image generation and replace placeholders with real images.
