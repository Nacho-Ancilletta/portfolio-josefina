import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProjectBySlug, projects } from "@/data/projects";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ProjectTitle } from "@/components/ProjectTitle";
import { CategoryTag } from "@/components/CategoryTag";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectEmbed } from "@/components/ProjectEmbed";
import { WordSearch } from "@/components/WordSearch";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug }))
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "project" });
  const description =
    locale === "en" ? project.description.en : project.description.es;
  const galleryLabel = project.titleParts.map((part) => part.text).join(" ");

  // 3+ piezas, todas con `word` propia → sopa de letras interactiva.
  // Si no, se arma con lo que haya: embed de video/prototipo y/o
  // galería simple (etiquetada por pieza cuando corresponde).
  const wordSearchPieces =
    project.pieces && project.pieces.length >= 3 && project.pieces.every((p) => p.word)
      ? (project.pieces as (typeof project.pieces[number] & { word: string })[])
      : null;

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/"
        className="mb-10 inline-block font-mono text-xs uppercase tracking-wide text-bordeaux/60 hover:text-bordeaux"
      >
        ← {t("backToHome")}
      </Link>

      <ProjectTitle parts={project.titleParts} subtitle={project.subtitle} />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <CategoryTag category={project.category} />
        <span className="font-mono text-xs uppercase tracking-wide text-bordeaux/50">
          {project.year}
        </span>
      </div>

      <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-bordeaux/90">
        {description}
      </p>

      {project.credits && project.credits.length > 0 ? (
        <p className="mt-2 font-mono text-xs uppercase tracking-wide text-bordeaux/50">
          {t("credits")}: {project.credits.join(", ")}
        </p>
      ) : null}

      <div className="mt-4">
        {wordSearchPieces ? (
          <WordSearch
            pieces={wordSearchPieces}
            category={project.category}
            seed={project.slug}
          />
        ) : (
          <div className="flex flex-col gap-8">
            {project.embed ? <ProjectEmbed embed={project.embed} /> : null}
            {project.pieces || project.galleryCount ? (
              <ProjectGallery
                count={project.galleryCount}
                label={galleryLabel}
                pieces={project.pieces}
              />
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}
