"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function NavBar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-bordeaux/15 bg-cream/90 px-6 py-4 backdrop-blur-sm">
      <Link href="/" className="font-serif text-lg italic text-bordeaux">
        Josefina Moldes
      </Link>
      <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-wide text-bordeaux">
        <Link href="/">{t("home")}</Link>
        <Link href="/sobre-mi">{t("about")}</Link>
        <Link href="/contacto">{t("contact")}</Link>
        <span className="flex items-center gap-2 border-l border-bordeaux/30 pl-4">
          {routing.locales.map((loc) => (
            <Link
              key={loc}
              href={pathname}
              locale={loc}
              className={loc === locale ? "underline" : "opacity-50"}
            >
              {loc.toUpperCase()}
            </Link>
          ))}
        </span>
      </nav>
    </header>
  );
}
