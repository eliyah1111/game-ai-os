# Architecture

Game AI OS is organized as a command-driven generation pipeline.

1. The prompt parser validates one of the five accepted commands.
2. The Style Lock Engine resolves the active visual style from explicit prompt intent or local memory.
3. The Design Language Engine derives shared production tokens.
4. The relevant skill creates asset requests and metadata.
5. The Layout Engine creates positioning, safe-area, responsive, and synchronization metadata.
6. The Exporter writes generated assets, recipes, JSON metadata, and engine manifests.

The core contract is JSON-first so external AI image providers, internal renderers, Unity tooling, Godot import scripts, and web build systems can consume the same outputs.
