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
6. Run deterministic scripts when sheet slicing, layout guides, chroma key cleanup, or QC metadata are needed.
7. Return image paths plus `metadata.json`, `style_profile.json`, and `layout_data.json`.

## Local CLI Caveat

The local TypeScript CLI cannot call Codex image generation directly. It writes image recipes, metadata, preview placeholders, and engine manifests. In a Codex skill session, the skill must use built-in image generation and replace placeholders with real images.
