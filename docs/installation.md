# Installation

Game AI OS supports one-command installation inspired by Forge-style skill packs.

## Windows PowerShell

```powershell
irm https://raw.githubusercontent.com/eliyah1111/game-ai-os/main/install.ps1 | iex
```

## macOS / Linux

```bash
curl -fsSL https://raw.githubusercontent.com/eliyah1111/game-ai-os/main/install.sh | bash
```

## What The Installer Does

- clones or downloads `eliyah1111/game-ai-os`
- installs it under `~/.codex/game-ai-os`
- runs `npm install` when npm is available
- runs `npm run build` when npm is available
- copies all skill packs into `~/.codex/skills`

## Installed Commands

- `$SPRITE_GEN`
- `$UI_GEN`
- `$OBJECT_GEN`
- `$BACKGROUND_GEN`
- `$VFX_GEN`

Restart Codex after installation so the new skills are loaded.

The commands appear as Codex skills after restart:

- `$SPRITE_GEN`
- `$UI_GEN`
- `$OBJECT_GEN`
- `$BACKGROUND_GEN`
- `$VFX_GEN`

They are not plugins. Type the command at the start of a message, then write the asset request underneath it.
