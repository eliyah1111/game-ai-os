export function toSnakeCase(input: string): string {
  return input
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_{2,}/g, "_")
    .toLowerCase();
}

export function clampName(input: string, fallback: string): string {
  const name = toSnakeCase(input);
  return name.length > 0 ? name : fallback;
}

export function timestampForFolder(date = new Date()): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\..+$/, "Z");
}

export function titleCase(input: string): string {
  return input
    .replace(/[_-]+/g, " ")
    .replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}
