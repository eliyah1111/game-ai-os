# Background Strategies

## Strategies

- `soft_gradient`: abstract puzzle-friendly gradient with subtle shapes
- `toy_world`: playful object-scale scenery with low detail
- `neon_depth`: dark readable base with soft glow layers
- `room_escape`: casual puzzle room with clean surfaces and readable object zones
- `looping_scroll`: vertically or horizontally repeatable background
- `menu_blur`: blurred and dimmed copy for popups or menus

## Layer Contract

- far layer: broad shapes and color mood
- mid layer: soft scenery, still non-distracting
- near layer: optional frame or decorative edge detail
- gameplay plane: reserved contrast/readability metadata
- overlay layer: vignette, blur, or popup scrim

## Readability Rules

- Keep the board area lower contrast than puzzle pieces.
- Avoid high-frequency texture under HUD text.
- Add blur-map names for modal/menu variants.
- Provide crop-safe focal metadata for portrait and landscape.
