#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const args = parseArgs(process.argv.slice(2));

if (!args.output) {
  throw new Error("Usage: makeLayoutGuideCli --output guide.svg [--rows 4] [--cols 4] [--cell-width 256] [--cell-height 256] [--safe-ratio 0.7]");
}

const rows = Number(args.rows ?? 4);
const cols = Number(args.cols ?? 4);
const cellWidth = Number(args["cell-width"] ?? 256);
const cellHeight = Number(args["cell-height"] ?? 256);
const safeRatio = Number(args["safe-ratio"] ?? 0.7);
const output = resolve(process.cwd(), args.output);
const width = cols * cellWidth;
const height = rows * cellHeight;
const safeWidth = cellWidth * safeRatio;
const safeHeight = cellHeight * safeRatio;

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, createSvg(), "utf8");
process.stdout.write(`${output}\n`);

function createSvg(): string {
  const cells: string[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = col * cellWidth;
      const y = row * cellHeight;
      const safeX = x + (cellWidth - safeWidth) / 2;
      const safeY = y + (cellHeight - safeHeight) / 2;
      cells.push(`  <rect x="${x}" y="${y}" width="${cellWidth}" height="${cellHeight}" fill="none" stroke="#3656FF" stroke-width="2" opacity="0.72"/>`);
      cells.push(`  <rect x="${safeX}" y="${safeY}" width="${safeWidth}" height="${safeHeight}" fill="none" stroke="#00B894" stroke-width="2" stroke-dasharray="8 8" opacity="0.72"/>`);
      cells.push(`  <circle cx="${x + cellWidth / 2}" cy="${y + cellHeight / 2}" r="5" fill="#FF3D71" opacity="0.85"/>`);
    }
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    '  <rect width="100%" height="100%" fill="#FFD6E7"/>',
    ...cells,
    "</svg>",
    ""
  ].join("\n");
}

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
