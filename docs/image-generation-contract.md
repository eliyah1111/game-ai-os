# Image Generation Contract

Game AI OS commands are image-first. They are not just metadata commands.

When used inside Codex, each command must create actual bitmap images with built-in image generation:

- `$SPRITE_GEN`: transparent sprite frames and atlases
- `$UI_GEN`: layered mobile UI assets
- `$OBJECT_GEN`: transparent object variants
- `$BACKGROUND_GEN`: layered background images
- `$VFX_GEN`: transparent VFX frame sequences

## Command Signature

Each command has a fixed signature, or stamp, that controls:

- image intent
- prompt prefix and suffix
- required output type
- naming prefix
- forbidden output types
- minimum resolution
- raw background requirements

The signatures live in:

```text
command_signatures/command_signatures.json
src/core/commandSignatureEngine.ts
```

## Pink Key Extraction

The raw generated image must use a flat light-pink background:

```text
#FFD6E7
```

The processor removes that exact color with tolerance `0` by default. It writes:

- `*-transparent.png`: full transparent canvas, preserving original coordinates
- `frames/`: full-cell transparent frames
- `extracted/`: trimmed transparent assets
- `placement-data.json`: pixel-perfect placement data
- `pipeline-meta.json`: QC and warnings

For UI, this means the generator can create all buttons, labels, counters, popups, and panels on the pink canvas. The processor removes the pink background and keeps exact coordinates for engine placement.

## CLI Behavior

The local TypeScript CLI cannot call Codex image generation directly. It writes image recipes, metadata, placeholders, and engine manifests. The Codex skill workflow must use image generation and replace those placeholder assets with actual images.
