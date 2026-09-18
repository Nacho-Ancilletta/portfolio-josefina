/**
 * Galería simple en grid para proyectos de una sola pieza o pocas piezas.
 * Placeholders grises con el nombre del proyecto (o de la pieza, si se
 * pasan piezas nombradas) — las imágenes reales se suben después. Sin
 * decoración vintage encima: la imagen manda.
 */
export function ProjectGallery({
  count,
  label,
  pieces,
}: {
  count?: number;
  label: string;
  pieces?: { id: string; label: string; images?: number }[];
}) {
  const cells = pieces
    ? pieces.flatMap((piece) =>
        Array.from({ length: piece.images ?? 0 }, (_, i) => ({
          key: `${piece.id}-${i}`,
          text: `${piece.label} — ${i + 1}`,
        }))
      )
    : Array.from({ length: count ?? 0 }, (_, i) => ({
        key: i,
        text: `${label} — ${i + 1}`,
      }));

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {cells.map((cell) => (
        <div
          key={cell.key}
          className="flex aspect-[4/3] items-center justify-center border border-bordeaux/20 bg-bordeaux/5 font-mono text-xs uppercase tracking-wide text-bordeaux/50"
        >
          {cell.text}
        </div>
      ))}
    </div>
  );
}
