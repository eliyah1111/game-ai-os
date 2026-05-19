# Export Pipeline

Every generation writes a run folder under `exports/`.

Required files:

- `generated_assets/`
- `metadata.json`
- `style_profile.json`
- `layout_data.json`
- `export_ready/`

Engine targets:

- `export_ready/unity/UnityAssetManifest.json`
- `export_ready/godot/godot_import_manifest.json`
- `export_ready/web/asset-manifest.json`

The default local provider creates transparent PNG placeholders, SVG previews, and recipe JSON. Production deployments should replace or extend the provider with an AI image/rendering backend.
