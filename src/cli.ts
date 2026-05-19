#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { GenerationPipeline } from "./core/generationPipeline";

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const inputFlagIndex = args.findIndex((arg) => arg === "--input" || arg === "-i");
  const projectRoot = process.cwd();
  let prompt = "";

  if (inputFlagIndex >= 0) {
    const inputPath = args[inputFlagIndex + 1];
    if (!inputPath) {
      throw new Error("Missing path after --input.");
    }

    const resolvedPath = resolve(process.cwd(), inputPath);
    if (!existsSync(resolvedPath)) {
      throw new Error(`Input prompt file not found: ${resolvedPath}`);
    }

    prompt = readFileSync(resolvedPath, "utf8");
  } else if (args.length > 0) {
    prompt = args.join(" ");
  } else {
    prompt = await readStdin();
  }

  const pipeline = new GenerationPipeline(projectRoot);
  const result = pipeline.run(prompt);

  process.stdout.write([
    "Game AI OS generation complete.",
    `Output: ${result.outputDir}`,
    `Metadata: ${result.metadataPath}`,
    `Style Profile: ${result.styleProfilePath}`,
    `Layout Data: ${result.layoutDataPath}`,
    `Export Ready: ${result.exportReadyDir}`,
    ""
  ].join("\n"));
}

function readStdin(): Promise<string> {
  return new Promise((resolvePromise, reject) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => resolvePromise(data));
    process.stdin.on("error", reject);
  });
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
