import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { PNG } from "pngjs";
import { DEFAULT_PINK_KEY, processPngSheet } from "../src/processors/pngSheetProcessor";

const tempDir = mkdtempSync(join(tmpdir(), "game-ai-os-processor-"));

try {
  const source = new PNG({ width: 8, height: 8 });
  const pink = [0xff, 0xd6, 0xe7, 0xff];

  for (let y = 0; y < source.height; y += 1) {
    for (let x = 0; x < source.width; x += 1) {
      const idx = (source.width * y + x) << 2;
      source.data[idx] = pink[0];
      source.data[idx + 1] = pink[1];
      source.data[idx + 2] = pink[2];
      source.data[idx + 3] = pink[3];
    }
  }

  for (let y = 3; y <= 4; y += 1) {
    for (let x = 2; x <= 4; x += 1) {
      const idx = (source.width * y + x) << 2;
      source.data[idx] = 0x22;
      source.data[idx + 1] = 0x77;
      source.data[idx + 2] = 0xff;
      source.data[idx + 3] = 0xff;
    }
  }

  const inputPath = join(tempDir, "pink-key-source.png");
  const outputDir = join(tempDir, "out");
  writeFileSync(inputPath, PNG.sync.write(source));

  const result = processPngSheet({
    inputPath,
    outputDir,
    rows: 1,
    cols: 1,
    name: "ui_test",
    chromaKey: DEFAULT_PINK_KEY,
    tolerance: 0
  });

  assert.equal(result.qc.length, 1);
  assert.deepEqual(result.qc[0].bbox, { x: 2, y: 3, width: 3, height: 2 });
  assert.deepEqual(result.qc[0].placement, {
    x: 2,
    y: 3,
    width: 3,
    height: 2,
    sourceX: 2,
    sourceY: 3,
    pivotX: 0.4375,
    pivotY: 0.5
  });
  assert.ok(result.qc[0].extractedFile);

  const placement = JSON.parse(readFileSync(result.placementPath, "utf8"));
  assert.equal(placement.mode, "pixel_exact_pink_key");
  assert.equal(placement.chromaKey, DEFAULT_PINK_KEY);
  assert.equal(placement.tolerance, 0);

  process.stdout.write("processor.test.ts passed\n");
} finally {
  rmSync(tempDir, { recursive: true, force: true });
}
