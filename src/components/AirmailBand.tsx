/** Franja de rayas diagonales estilo correo aéreo, coronando la página. */
export function AirmailBand({ title }: { title: string }) {
  return (
    <div className="relative h-14 overflow-hidden sm:h-16">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #6B1F2A 0px, #6B1F2A 18px, #A8D0E6 18px, #A8D0E6 36px)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="bg-cream px-4 py-1 font-serif text-2xl italic text-bordeaux sm:text-3xl">
          {title}
        </span>
      </div>
    </div>
  );
}
