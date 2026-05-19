# Style Lock Engine

The Style Lock Engine keeps all generated assets visually related. It resolves the active style, stores it in `memory/game_ai_os_memory.json`, and feeds the same style profile to every skill.

The style profile includes:

- palette
- lighting language
- shape language
- shadow style
- border radius scale
- spacing scale
- typography system
- outline thickness
- animation language

This allows a `$VFX_GEN` combo glow to match a `$UI_GEN` start button and an `$OBJECT_GEN` puzzle block from the same project.
