import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PNG } from "pngjs";
import { writeJson } from "../utils/json";

export interface ProcessSheetOptions {
  inputPath: string;
  outputDir: string;
  rows: number;
  cols: number;
  name: string;
  chromaKey?: string;
  tolerance?: number;
  fps?: number;
}

export interface FrameQc {
  index: number;
  row: number;
  col: number;
  file: string;
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
  edgeTouch: boolean;
  alphaPixels: number;
}

export interface ProcessSheetResult {
  cleanSheetPath: string;
  transparentSheetPath: string;
  framesDir: string;
  metadataPath: string;
  frameCount: number;
  frameWidth: number;
  frameHeight: number;
  qc: FrameQc[];
}

export function processPngSheet(options: ProcessSheetOptions): ProcessSheetResult {
  validateOptions(options);

  const source = PNG.sync.read(readFileSync(options.inputPath));
  const clean = new PNG({ width: source.width, height: source.height });
  source.data.copy(clean.data);

  const chroma = options.chromaKey ? parseHexColor(options.chromaKey) : undefined;
  const tolerance = options.tolerance ?? 8;

  if (chroma) {
    applyChromaKey(clean, chroma, tolerance);
  }

  if (clean.width % options.cols !== 0 || clean.height % options.rows !== 0) {
    throw new Error(`Image size ${clean.width}x${clean.height} is not evenly divisible by ${options.cols} cols and ${options.rows} rows.`);
  }

  const frameWidth = clean.width / options.cols;
  const frameHeight = clean.height / options.rows;
  const framesDir = join(options.outputDir, "frames");

  mkdirSync(options.outputDir, { recursive: true });
  mkdirSync(framesDir, { recursive: true });

  const cleanSheetPath = join(options.outputDir, `${options.name}-clean.png`);
  const transparentSheetPath = join(options.outputDir, `${options.name}-transparent.png`);
  writeFileSync(cleanSheetPath, PNG.sync.write(clean));
  writeFileSync(transparentSheetPath, PNG.sync.write(clean));

  const qc: FrameQc[] = [];
  let index = 0;

  for (let row = 0; row < options.rows; row += 1) {
    for (let col = 0; col < options.cols; col += 1) {
      index += 1;
      const frame = cropPng(clean, col * frameWidth, row * frameHeight, frameWidth, frameHeight);
      const frameName = `${options.name}_${String(index).padStart(2, "0")}.png`;
      const framePath = join(framesDir, frameName);
      writeFileSync(framePath, PNG.sync.write(frame));
      qc.push(analyzeFrame(frame, index, row, col, framePath));
    }
  }

  const metadataPath = join(options.outputDir, "pipeline-meta.json");
  writeJson(metadataPath, {
    processor: "game-ai-os/pngSheetProcessor",
    inputPath: options.inputPath,
    cleanSheetPath,
    transparentSheetPath,
    framesDir,
    rows: options.rows,
    cols: options.cols,
    frameCount: options.rows * options.cols,
    frameWidth,
    frameHeight,
    fps: options.fps ?? 12,
    chromaKey: options.chromaKey ?? null,
    tolerance,
    qc,
    warnings: qc.filter((frame) => frame.edgeTouch).map((frame) => `Frame ${frame.index} touches an edge.`)
  });

  return {
    cleanSheetPath,
    transparentSheetPath,
    framesDir,
    metadataPath,
    frameCount: options.rows * options.cols,
    frameWidth,
    frameHeight,
    qc
  };
}

function validateOptions(options: ProcessSheetOptions): void {
  if (options.rows < 1 || options.cols < 1) {
    throw new Error("rows and cols must both be at least 1.");
  }

  if (!options.name.match(/^[a-z0-9][a-z0-9_-]*$/i)) {
    throw new Error("name must be filesystem-safe: letters, numbers, underscores, and dashes only.");
  }
}

function parseHexColor(value: string): [number, number, number] {
  const normalized = value.trim().replace(/^#/, "");
  if (!normalized.match(/^[0-9a-fA-F]{6}$/)) {
    throw new Error(`Invalid chroma key color: ${value}`);
  }

  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16)
  ];
}

function applyChromaKey(png: PNG, chroma: [number, number, number], tolerance: number): void {
  for (let y = 0; y < png.height; y += 1) {
    for (let x = 0; x < png.width; x += 1) {
      const idx = (png.width * y + x) << 2;
      const distance =
        Math.abs(png.data[idx] - chroma[0]) +
        Math.abs(png.data[idx + 1] - chroma[1]) +
        Math.abs(png.data[idx + 2] - chroma[2]);

      if (distance <= tolerance) {
        png.data[idx + 3] = 0;
      }
    }
  }
}

function cropPng(source: PNG, startX: number, startY: number, width: number, height: number): PNG {
  const frame = new PNG({ width, height });

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const srcIdx = (source.width * (startY + y) + (startX + x)) << 2;
      const dstIdx = (width * y + x) << 2;
      frame.data[dstIdx] = source.data[srcIdx];
      frame.data[dstIdx + 1] = source.data[srcIdx + 1];
      frame.data[dstIdx + 2] = source.data[srcIdx + 2];
      frame.data[dstIdx + 3] = source.data[srcIdx + 3];
    }
  }

  return frame;
}

function analyzeFrame(frame: PNG, index: number, row: number, col: number, file: string): FrameQc {
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  let alphaPixels = 0;
  let edgeTouch = false;

  for (let y = 0; y < frame.height; y += 1) {
    for (let x = 0; x < frame.width; x += 1) {
      const idx = (frame.width * y + x) << 2;
      if (frame.data[idx + 3] > 0) {
        alphaPixels += 1;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);

        if (x === 0 || y === 0 || x === frame.width - 1 || y === frame.height - 1) {
          edgeTouch = true;
        }
      }
    }
  }

  return {
    index,
    row,
    col,
    file,
    bbox: alphaPixels === 0
      ? null
      : {
          x: minX,
          y: minY,
          width: maxX - minX + 1,
          height: maxY - minY + 1
        },
    edgeTouch,
    alphaPixels
  };
}
