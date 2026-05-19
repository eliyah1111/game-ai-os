# Collision Rules

## Defaults

- blocks and tiles: inset box collider
- balls and bubbles: circle collider
- tubes: capsule or rounded box collider
- barriers: box or polygon collider
- collectibles: circle collider for pickup range
- arrows: no collision unless gameplay requires it
- boosters: box or circle based on silhouette

## Mobile Feel

- Keep drag colliders forgiving.
- Inset collider bounds from glossy highlights and outer shadows.
- Store collision offset relative to visual center.
- Separate gameplay collision from decorative shadow layers.

## Metadata Required

- shape
- width
- height
- radius when circular
- offset
- notes for runtime behavior
