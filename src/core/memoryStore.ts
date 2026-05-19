import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { writeJson } from "../utils/json";
import { StyleProfile } from "../types";

export interface AssetRelationship {
  assetId: string;
  command: string;
  styleId: string;
  createdAt: string;
  tags: string[];
}

interface MemoryState {
  activeStyle?: StyleProfile;
  assetRelationships: AssetRelationship[];
  uiProportions: Record<string, unknown>;
  gameplayReadabilityNotes: string[];
}

const DEFAULT_MEMORY: MemoryState = {
  assetRelationships: [],
  uiProportions: {},
  gameplayReadabilityNotes: []
};

export class MemoryStore {
  private readonly memoryPath: string;

  constructor(projectRoot: string) {
    this.memoryPath = join(projectRoot, "memory", "game_ai_os_memory.json");
  }

  read(): MemoryState {
    if (!existsSync(this.memoryPath)) {
      return DEFAULT_MEMORY;
    }

    return JSON.parse(readFileSync(this.memoryPath, "utf8")) as MemoryState;
  }

  getActiveStyle(): StyleProfile | undefined {
    return this.read().activeStyle;
  }

  saveActiveStyle(styleProfile: StyleProfile): void {
    const state = this.read();
    mkdirSync(join(this.memoryPath, ".."), { recursive: true });
    writeJson(this.memoryPath, {
      ...state,
      activeStyle: styleProfile
    });
  }

  rememberAssets(relationships: AssetRelationship[]): void {
    const state = this.read();
    writeJson(this.memoryPath, {
      ...state,
      assetRelationships: [...relationships, ...state.assetRelationships].slice(0, 200)
    });
  }
}
