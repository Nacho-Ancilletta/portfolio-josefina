/** Clip metálico decorativo — placeholder vintage, uso puntual. */
export function BinderClip({ color = "#1E3A8A" }: { color?: string }) {
  return (
    <div
      aria-hidden
      className="absolute left-1/2 top-0 h-7 w-16 -translate-x-1/2 -translate-y-1/2 rounded-[3px] shadow-sm"
      style={{ backgroundColor: color }}
    >
      <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream" />
    </div>
  );
}
