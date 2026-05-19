# Mobile Export Contract

Game AI OS output is optimized for modern mobile casual and puzzle games.

## Required Export Shape

```text
run-folder/
  generated_assets/
  metadata.json
  style_profile.json
  layout_data.json
  export_ready/
    unity/
    godot/
    web/
```

## Mobile Requirements

- portrait-first layout
- landscape adaptation when relevant
- tablet scaling metadata
- safe-area and notch awareness
- minimum 56 dp touch targets
- readable silhouettes
- consistent object scale rules
- no visual clutter over gameplay-critical areas

## Engine Metadata

Unity, Godot, and Web exports should include import hints, texture behavior, pivots, layout anchors, collision suggestions, animation timing, and preload strategy where relevant.
