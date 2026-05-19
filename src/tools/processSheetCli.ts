#!/usr/bin/env node
import { resolve } from "node:path";
import { processPngSheet } from "../processors/pngSheetProcessor";

const args = parseArgs(process.argv.slice(2));

if (!args.input || !args.output || !args.rows || !args.cols) {
  throw new Error("Usage: processSheetCli --input raw.png --output out-dir --rows 2 --cols 2 [--name spr_idle] [--chroma-key #FF00FF] [--tolerance 8] [--fps 12]");
}

const result = processPngSheet({
  inputPath: resolve(process.cwd(), args.input),
  outputDir: resolve(process.cwd(), args.output),
  rows: Number(args.rows),
  cols: Number(args.cols),
  name: args.name ?? "sheet",
  chromaKey: args["chroma-key"],
  tolerance: args.tolerance ? Number(args.tolerance) : undefined,
  fps: args.fps ? Number(args.fps) : undefined
});

process.stdout.write(JSON.stringify(result, null, 2));
process.stdout.write("\n");

function parseArgs(values: string[]): Record<string, string | undefined> {
  const parsed: Record<string, string | undefined> = {};

  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (!value.startsWith("--")) {
      continue;
    }

    parsed[value.slice(2)] = values[index + 1];
    index += 1;
  }

  return parsed;
}
