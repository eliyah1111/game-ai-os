# Layout Engine

The Layout Engine treats mobile UI as a synchronized system instead of isolated assets.

It emits:

- canvas dimensions
- safe-area insets
- grid metadata
- anchor-based frames
- layer hierarchy
- z-index values
- responsive rules
- synchronization rules

Examples of synchronization:

- Button height drives icon size and label size.
- Popup width drives content padding.
- Safe-area changes recompute HUD anchors.
- Orientation changes preserve stack order and minimum touch targets.
