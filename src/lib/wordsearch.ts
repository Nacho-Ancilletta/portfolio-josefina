export type Direction = "H" | "V" | "D";

export interface Placement {
  pieceId: string;
  word: string;
  direction: Direction;
  cells: [number, number][];
}

const DIRS: Record<Direction, [number, number]> = {
  H: [0, 1], // horizontal
  V: [1, 0], // vertical
  D: [1, 1], // diagonal (abajo-derecha)
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// PRNG determinístico (mulberry32): mismo seed = misma grilla siempre,
// server y cliente calculan exactamente lo mismo (evita mismatch de hidratación).
function mulberry32(seed: number) {
  let a = seed;
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h;
}

/**
 * Arma una sopa de letras que contiene cada palabra dada, en direcciones
 * distintas, sin instrucciones visibles: la grilla resultante más el mapa
 * de celda -> pieza es todo lo que necesita el componente para renderizar
 * y resaltar al hacer hover.
 */
export function buildWordSearch(
  words: { id: string; word: string }[],
  size: number,
  seed: string
): { grid: string[][]; placements: Placement[] } {
  const rand = mulberry32(hashString(seed));
  const grid: (string | null)[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => null)
  );
  const placements: Placement[] = [];
  const dirOrder: Direction[] = ["H", "V", "D"];

  words.forEach(({ id, word }, i) => {
    const clean = word.toUpperCase().replace(/[^A-Z]/g, "");
    if (!clean) return;

    let placed = false;

    for (let attempt = 0; attempt < 300 && !placed; attempt++) {
      const direction = dirOrder[(i + attempt) % dirOrder.length];
      const [dr, dc] = DIRS[direction];
      const maxRow = dr === 1 ? size - clean.length : size - 1;
      const maxCol = dc === 1 ? size - clean.length : size - 1;
      if (maxRow < 0 || maxCol < 0) continue;

      const row = Math.floor(rand() * (maxRow + 1));
      const col = Math.floor(rand() * (maxCol + 1));

      const cells: [number, number][] = [];
      let fits = true;
      for (let k = 0; k < clean.length; k++) {
        const r = row + dr * k;
        const c = col + dc * k;
        const existing = grid[r][c];
        if (existing && existing !== clean[k]) {
          fits = false;
          break;
        }
        cells.push([r, c]);
      }

      if (fits) {
        cells.forEach(([r, c], k) => (grid[r][c] = clean[k]));
        placements.push({ pieceId: id, word: clean, direction, cells });
        placed = true;
      }
    }
  });

  const filled: string[][] = grid.map((rowArr) =>
    rowArr.map((cell) => cell ?? ALPHABET[Math.floor(rand() * ALPHABET.length)])
  );

  return { grid: filled, placements };
}
