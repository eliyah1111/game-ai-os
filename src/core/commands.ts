import { COMMAND_NAMES, CommandName } from "../types";

export const ALLOWED_COMMANDS = new Set<string>(COMMAND_NAMES);

export function assertCommandName(value: string): asserts value is CommandName {
  if (!ALLOWED_COMMANDS.has(value)) {
    throw new Error(
      `Unsupported command "${value}". Game AI OS only accepts: ${COMMAND_NAMES.join(", ")}.`
    );
  }
}

export function isCommandName(value: string): value is CommandName {
  return ALLOWED_COMMANDS.has(value);
}
