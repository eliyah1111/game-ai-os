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

## CLI Behavior

The local TypeScript CLI cannot call Codex image generation directly. It writes image recipes, metadata, placeholders, and engine manifests. The Codex skill workflow must use image generation and replace those placeholder assets with actual images.
