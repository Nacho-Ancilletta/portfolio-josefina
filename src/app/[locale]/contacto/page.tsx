import { getTranslations } from "next-intl/server";
import { AirmailBand } from "@/components/AirmailBand";
import { ContactEnvelope } from "@/components/ContactEnvelope";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <div>
      <AirmailBand title={t("title")} />
      <div className="bg-sky/25">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <ContactEnvelope />
        </div>
      </div>
    </div>
  );
}
