#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const args = parseArgs(process.argv.slice(2));
const output = resolve(process.cwd(), args.output ?? "background-layer-manifest.json");
const layers = (args.layers ?? "far,mid,near,gameplay_overlay").split(",").map((layer, index) => ({
  id: layer.trim(),
  order: index,
  parallax: Number((0.12 + index * 0.18).toFixed(2)),
  blurPx: layer.includes("overlay") ? 12 : 0
}));

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${JSON.stringify({ target: "Game AI OS", layers }, null, 2)}\n`, "utf8");
process.stdout.write(`${output}\n`);

function parseArgs(values) {
  const parsed = {};
  for (let index = 0; index < values.length; index += 1) {
    if (!values[index].startsWith("--")) continue;
    parsed[values[index].slice(2)] = values[index + 1];
    index += 1;
  }
  return parsed;
}
