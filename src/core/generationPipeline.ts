import { SKILL_REGISTRY } from "../commands/registry";
import { Exporter } from "../exports/exporter";
import { parsePrompt } from "../prompt_parser/parser";
import { CommandSignatureEngine } from "./commandSignatureEngine";
import { DesignLanguageEngine } from "./designLanguageEngine";
import { LayoutEngine } from "./layoutEngine";
import { MemoryStore } from "./memoryStore";
import { StyleLockEngine } from "./styleLockEngine";
import { ExportResult, GenerationPackage } from "../types";

export class GenerationPipeline {
  private readonly memoryStore: MemoryStore;
  private readonly commandSignatureEngine = new CommandSignatureEngine();
  private readonly styleLockEngine: StyleLockEngine;
  private readonly designLanguageEngine = new DesignLanguageEngine();
  private readonly layoutEngine = new LayoutEngine();
  private readonly exporter: Exporter;

  constructor(private readonly projectRoot = process.cwd()) {
    this.memoryStore = new MemoryStore(projectRoot);
    this.styleLockEngine = new StyleLockEngine(this.memoryStore);
    this.exporter = new Exporter(projectRoot);
  }

  run(rawPrompt: string): ExportResult {
    const parsedPrompt = parsePrompt(rawPrompt);
    const commandSignature = this.commandSignatureEngine.resolve(parsedPrompt.command);
    const styleProfile = this.styleLockEngine.resolve(parsedPrompt);
    const designLanguage = this.designLanguageEngine.create(styleProfile);
    const skillGeneration = SKILL_REGISTRY[parsedPrompt.command](parsedPrompt, styleProfile, designLanguage);
    const layoutData = this.layoutEngine.create(parsedPrompt, designLanguage, skillGeneration.assets);

    const pkg: GenerationPackage = {
      parsedPrompt,
      commandSignature,
      styleProfile,
      designLanguage,
      layoutData,
      skillGeneration
    };

    const result = this.exporter.write(pkg);

    this.memoryStore.rememberAssets(skillGeneration.assets.map((asset) => ({
      assetId: asset.id,
      command: parsedPrompt.command,
      styleId: styleProfile.id,
      createdAt: new Date().toISOString(),
      tags: asset.exportTags
    })));

    return result;
  }
}
