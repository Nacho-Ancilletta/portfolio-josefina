import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { NavBar } from "@/components/NavBar";
import "../globals.css";

export const metadata: Metadata = {
  title: "Josefina Moldes — Portfolio",
  description: "Diseño gráfico y branding — Josefina Moldes",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={`${fontVariables} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <NextIntlClientProvider>
          <NavBar />
          <main className="flex-1">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
