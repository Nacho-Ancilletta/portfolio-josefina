import { useTranslations } from "next-intl";
import { categories, type CategoryId } from "@/data/categories";

export function CategoryTag({ category }: { category: CategoryId }) {
  const t = useTranslations("categories");
  const meta = categories[category];

  return (
    <span
      className="inline-block rounded-sm border px-3 py-1 font-mono text-[11px] uppercase tracking-wide"
      style={{
        backgroundColor: meta.bg,
        borderColor: meta.border,
        color: meta.text,
      }}
    >
      {t(meta.labelKey)}
    </span>
  );
}
