# UI Layout Contract

## Canvas

- portrait base: `1080x1920`
- landscape base: `1920x1080`
- tablet: scale from the same token system, not separate art direction

## Required Metadata

- element id
- type
- anchor
- frame `{ x, y, width, height }`
- z-index
- safe-area awareness
- scale mode
- sync group

## Safe Areas

- phone portrait: top 88, sides 36, bottom 54
- phone landscape: top 36, sides 76, bottom 28
- tablet: top 52, sides 72, bottom 42

## Synchronization Rules

- button height controls icon size and label font size
- button width controls horizontal gaps
- popup width controls inner padding
- score-counter height controls number font size
- safe-area changes recompute HUD anchors
- orientation changes preserve stack order and minimum touch targets
