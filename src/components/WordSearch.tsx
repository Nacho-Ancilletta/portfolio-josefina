"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ProjectPiece } from "@/data/projects";
import { categories, type CategoryId } from "@/data/categories";
import { buildWordSearch } from "@/lib/wordsearch";

const GRID_SIZE = 13;

/**
 * Sopa de letras interactiva para proyectos con múltiples piezas gráficas.
 * Cada palabra resaltada corresponde a una pieza (totebag, logo, stickers...).
 * Sin texto de instrucción: la interacción se descubre al pasar el mouse
 * (o al tocar, en mobile) sobre las letras resaltadas.
 */
export function WordSearch({
  pieces,
  category,
  seed,
}: {
  pieces: (ProjectPiece & { word: string })[];
  category: CategoryId;
  seed: string;
}) {
  const { grid, placements } = useMemo(
    () =>
      buildWordSearch(
        pieces.map((p) => ({ id: p.id, word: p.word })),
        GRID_SIZE,
        seed
      ),
    [pieces, seed]
  );

  const cellToPiece = useMemo(() => {
    const map = new Map<string, string>();
    placements.forEach((pl) => {
      pl.cells.forEach(([r, c]) => map.set(`${r}-${c}`, pl.pieceId));
    });
    return map;
  }, [placements]);

  const [hoveredPiece, setHoveredPiece] = useState<string | null>(null);
  const activePiece = pieces.find((p) => p.id === hoveredPiece) ?? null;
  const meta = categories[category];
  const t = useTranslations("project");

  function handleActivate(piece: (ProjectPiece & { word: string }) | undefined) {
    if (!piece) return;
    if (piece.link) {
      window.open(piece.link, "_blank", "noopener,noreferrer");
      return;
    }
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {activePiece ? (
          <motion.div
            key={activePiece.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-x-0 top-full z-20 mt-3 flex flex-wrap justify-center gap-3 border p-3"
            style={{
              borderColor: meta.border,
              backgroundColor: `${meta.bg}1a`,
            }}
          >
            {activePiece.link ? (
              <span
                className="font-mono text-xs uppercase tracking-wide"
                style={{ color: meta.bg }}
              >
                {t("visitLink")}
              </span>
            ) : (
              Array.from({ length: activePiece.images ?? 0 }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-24 w-20 items-center justify-center bg-bordeaux/5 font-mono text-[10px] uppercase text-bordeaux/50"
                >
                  {activePiece.label} {i + 1}
                </div>
              ))
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div
        className="mx-auto grid w-fit select-none gap-0.5"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
      >
        {grid.map((row, r) =>
          row.map((letter, c) => {
            const pieceId = cellToPiece.get(`${r}-${c}`);
            const isActive = Boolean(pieceId) && pieceId === hoveredPiece;
            const piece = pieceId ? pieces.find((p) => p.id === pieceId) : undefined;

            return (
              <span
                key={`${r}-${c}`}
                onMouseEnter={() => pieceId && setHoveredPiece(pieceId)}
                onMouseLeave={() => pieceId && setHoveredPiece(null)}
                onClick={() => handleActivate(piece)}
                onTouchStart={() =>
                  pieceId &&
                  setHoveredPiece((h) => (h === pieceId ? null : pieceId))
                }
                className={[
                  "flex h-6 w-6 items-center justify-center font-mono text-[10px] uppercase transition-colors sm:h-8 sm:w-8 sm:text-xs",
                  pieceId ? "cursor-pointer font-bold" : "text-bordeaux/25",
                ].join(" ")}
                style={
                  pieceId
                    ? {
                        color: isActive ? meta.text : meta.bg,
                        backgroundColor: isActive ? meta.bg : "transparent",
                      }
                    : undefined
                }
              >
                {letter}
              </span>
            );
          })
        )}
      </div>
    </div>
  );
}
