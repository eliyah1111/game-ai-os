# UI Component System

## Components

- `primary_button`: main action
- `secondary_button`: alternate action
- `icon_button`: settings, close, pause, home
- `popup`: modal shell
- `score_counter`: HUD numeric display
- `progress_bar`: level, streak, timer, objective
- `toggle`: binary setting
- `slider`: volume or sensitivity
- `tab`: mode selection

## Touch Rules

- minimum target: 56 dp
- primary CTA height: 72 to 96 px at 1080x1920 base
- icon-only buttons must still include hitbox metadata

## Animation Language

- tap: quick squash and brightness lift
- modal enter: scale 0.94 to 1.0 with opacity
- reward number: upward pop with slight overshoot
- settings controls: restrained, no distracting bounce
