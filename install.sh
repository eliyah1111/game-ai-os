#!/usr/bin/env bash
set -euo pipefail

BRANCH="${BRANCH:-main}"
CODEX_HOME_DIR="${CODEX_HOME:-"$HOME/.codex"}"
INSTALL_DIR="${GAME_AI_OS_HOME:-"$CODEX_HOME_DIR/game-ai-os"}"
SKILLS_DIR="${CODEX_SKILLS_DIR:-"$CODEX_HOME_DIR/skills"}"
REPO_URL="https://github.com/eliyah1111/game-ai-os.git"
ZIP_URL="https://github.com/eliyah1111/game-ai-os/archive/refs/heads/${BRANCH}.zip"

step() {
  printf '==> %s\n' "$1"
}

has_cmd() {
  command -v "$1" >/dev/null 2>&1
}

step "Installing Game AI OS"
mkdir -p "$(dirname "$INSTALL_DIR")" "$SKILLS_DIR"

if [ -d "$INSTALL_DIR/.git" ]; then
  step "Updating existing checkout at $INSTALL_DIR"
  git -C "$INSTALL_DIR" fetch origin "$BRANCH"
  git -C "$INSTALL_DIR" checkout "$BRANCH"
  git -C "$INSTALL_DIR" pull --ff-only origin "$BRANCH"
elif [ -e "$INSTALL_DIR" ] && [ "$(find "$INSTALL_DIR" -mindepth 1 -maxdepth 1 | wc -l | tr -d ' ')" != "0" ]; then
  printf 'Install directory already exists and is not an empty Git checkout: %s\n' "$INSTALL_DIR" >&2
  exit 1
fi

if [ ! -f "$INSTALL_DIR/package.json" ]; then
  if has_cmd git; then
    step "Cloning repository"
    git clone --branch "$BRANCH" "$REPO_URL" "$INSTALL_DIR"
  else
    step "Git not found; downloading zip archive"
    tmp_dir="$(mktemp -d)"
    zip_path="$tmp_dir/game-ai-os.zip"
    if has_cmd curl; then
      curl -fsSL "$ZIP_URL" -o "$zip_path"
    elif has_cmd wget; then
      wget -q "$ZIP_URL" -O "$zip_path"
    else
      printf 'Need git, curl, or wget to install Game AI OS.\n' >&2
      exit 1
    fi
    if ! has_cmd unzip; then
      printf 'Need unzip to install from the downloaded archive.\n' >&2
      exit 1
    fi
    unzip -q "$zip_path" -d "$tmp_dir"
    mkdir -p "$INSTALL_DIR"
    cp -R "$tmp_dir"/game-ai-os-"$BRANCH"/* "$INSTALL_DIR"/
    rm -rf "$tmp_dir"
  fi
fi

if has_cmd npm; then
  step "Installing Node dependencies"
  npm --prefix "$INSTALL_DIR" install
  step "Building TypeScript tools"
  npm --prefix "$INSTALL_DIR" run build
else
  printf 'Warning: npm was not found. Skills were installed, but local processor CLI tools need Node.js/npm.\n' >&2
fi

step "Copying skills into $SKILLS_DIR"
cp -R "$INSTALL_DIR"/skills/* "$SKILLS_DIR"/

step "Game AI OS installed"
printf '\nInstalled project: %s\n' "$INSTALL_DIR"
printf 'Installed skills:  %s\n\n' "$SKILLS_DIR"
printf 'Restart Codex so the new skills load cleanly.\n'
printf 'Commands: $SPRITE_GEN, $UI_GEN, $OBJECT_GEN, $BACKGROUND_GEN, $VFX_GEN\n'
