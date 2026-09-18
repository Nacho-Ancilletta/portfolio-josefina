import { getTranslations } from "next-intl/server";
import { BinderClip } from "@/components/BinderClip";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="mb-14 text-center font-serif text-3xl italic text-bordeaux">
        {t("title")}
      </h1>

      {/* carnet / credencial plastificada */}
      <div className="relative mx-auto max-w-md -rotate-1 rounded-md border-2 border-bordeaux bg-cream p-6 shadow-[6px_6px_0_0_rgba(107,31,42,0.15)]">
        <BinderClip color="#1E3A8A" />

        {/* sello decorativo, no toca la foto */}
        <div
          aria-hidden
          className="absolute -bottom-4 -right-4 flex h-16 w-16 rotate-12 items-center justify-center rounded-full border-2 border-dashed font-mono text-[8px] uppercase tracking-wide"
          style={{ borderColor: "#1E3A8A", color: "#1E3A8A" }}
        >
          Josefina Moldes
        </div>

        <div className="flex gap-5">
          <div className="flex h-36 w-28 shrink-0 items-center justify-center border border-bordeaux/30 bg-bordeaux/5 text-center font-mono text-[10px] uppercase tracking-wide text-bordeaux/40">
            {t("photoPlaceholder")}
          </div>

          <div className="flex flex-1 flex-col justify-center gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wide text-bordeaux/50">
                {t("nameLabel")}
              </p>
              <p className="font-serif text-xl italic text-bordeaux">
                Josefina Moldes
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wide text-bordeaux/50">
                {t("roleLabel")}
              </p>
              <p className="font-sans text-sm text-bordeaux">{t("role")}</p>
            </div>
          </div>
        </div>

        <p className="mt-6 border-t border-bordeaux/15 pt-4 font-sans text-sm leading-relaxed text-bordeaux/80">
          {t("bio")}
        </p>
      </div>
    </div>
  );
}
