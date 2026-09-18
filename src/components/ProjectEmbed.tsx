import { useTranslations } from "next-intl";
import type { EmbedInfo } from "@/data/projects";

/**
 * Embed de video/prototipo para proyectos audiovisuales o de producto
 * digital. Sin URL real todavía → placeholder gris igual al resto de
 * la galería (misma convención: texto manda, sin decoración encima).
 */
export function ProjectEmbed({ embed }: { embed: EmbedInfo }) {
  const t = useTranslations("project");

  if (!embed.url) {
    return (
      <div className="flex aspect-video items-center justify-center border border-bordeaux/20 bg-bordeaux/5 font-mono text-xs uppercase tracking-wide text-bordeaux/50">
        {embed.provider} · {t(embed.type)} — {t("pending")}
      </div>
    );
  }

  return (
    <iframe
      src={embed.url}
      className="aspect-video w-full border border-bordeaux/20"
      allow="fullscreen"
      allowFullScreen
    />
  );
}
