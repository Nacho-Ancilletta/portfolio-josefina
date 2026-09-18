import type { TitlePart } from "@/data/projects";

const weightClass: Record<TitlePart["weight"], string> = {
  low: "font-light",
  mid: "font-semibold",
  high: "font-extrabold",
};

/**
 * Técnica de contraste de grosores: palabra principal alta+itálica,
 * conectores bajos+itálicos+chicos, resto en peso medio sin itálica.
 */
export function ProjectTitle({
  parts,
  subtitle,
  as: Tag = "h1",
  className = "",
}: {
  parts: TitlePart[];
  subtitle?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={className}>
      <Tag className="flex flex-wrap items-baseline gap-x-3 font-serif leading-[0.95] text-4xl text-bordeaux sm:text-5xl md:text-6xl">
        {parts.map((part, i) => (
          <span
            key={i}
            className={[
              weightClass[part.weight],
              part.italic ? "italic" : "",
              part.small ? "text-[0.42em]" : "",
            ].join(" ")}
          >
            {part.text}
          </span>
        ))}
      </Tag>
      {subtitle ? (
        <p className="mt-2 font-serif-alt text-xl italic text-navy sm:text-2xl">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
