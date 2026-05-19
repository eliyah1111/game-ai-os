#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const candidates = [
  process.env.GAME_AI_OS_HOME,
  process.env.CODEX_HOME ? join(process.env.CODEX_HOME, "game-ai-os") : undefined,
  process.env.HOME ? join(process.env.HOME, ".codex", "game-ai-os") : undefined,
  process.env.USERPROFILE ? join(process.env.USERPROFILE, ".codex", "game-ai-os") : undefined,
  resolve(__dirname, "../../../")
].filter(Boolean);

const root = candidates.find((candidate) => {
  return existsSync(join(candidate, "dist/src/tools/processSheetCli.js"));
});

if (!root) {
  console.error("Could not find Game AI OS build. Run the one-line installer again, or set GAME_AI_OS_HOME.");
  process.exit(1);
}

const cli = join(root, "dist/src/tools/processSheetCli.js");
const result = spawnSync(process.execPath, [cli, ...process.argv.slice(2)], { stdio: "inherit" });
process.exit(result.status ?? 1);
