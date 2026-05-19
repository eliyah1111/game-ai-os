# Forge-Style Workflow

Game AI OS follows the same broad pattern as `agent-sprite-forge`: skills are self-contained packages, creative image generation is separated from deterministic postprocessing, and every output carries metadata for engine use.

The difference is the product direction:

- Game AI OS targets modern mobile casual and puzzle games.
- It avoids pixel-art defaults, retro RPG assumptions, and complex AAA realism.
- It treats UI precision, Style Lock consistency, and mobile-safe layout as first-class systems.
- It makes every command image-first: the skill must create actual bitmap images, not only plans or JSON.
- It adds fixed command signatures so each `$..._GEN` command has a stable visual stamp and output contract.

## Skill Package Shape

```text
skills/<skill_name>/
  SKILL.md
  agents/
    openai.yaml
  references/
  scripts/
```

## Production Flow

1. User invokes exactly one of the five commands.
2. The prompt parser extracts structured intent.
3. Style Lock resolves the active visual system.
4. The command signature is applied.
5. The command skill creates actual bitmap art with image generation.
6. Local scripts process sheets, guides, layers, and metadata deterministically.
7. Export manifests make the result ready for Unity, Godot, and Web games.

## Deterministic Scripts

- `processSheetCli`: chroma-key removal, frame slicing, transparent sheet output, frame QC metadata
- `makeLayoutGuideCli`: SVG layout guides for exact grids and safe zones
- background manifest script: layer ordering, blur, and parallax metadata

The scripts are intentionally production helpers. They should not invent art direction or replace the AI generation step.
