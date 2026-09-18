function clamp(value: number): number {
  return Math.max(0, Math.min(255, value));
}

/** Aclara (amount > 0) u oscurece (amount < 0) un color hex, ej. para degradés. */
export function adjustHex(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = clamp((num >> 16) + amount);
  const g = clamp(((num >> 8) & 0xff) + amount);
  const b = clamp((num & 0xff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
