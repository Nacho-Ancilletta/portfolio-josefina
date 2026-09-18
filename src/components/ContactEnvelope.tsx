"use client";

import { type FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

const BORDEAUX = "#6B1F2A";

export function ContactEnvelope() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div className="relative mx-auto max-w-lg">
      {/* matasellos, no toca el formulario */}
      <div
        aria-hidden
        className="absolute -right-3 -top-5 z-10 flex h-16 w-16 rotate-6 items-center justify-center rounded-full border-2 border-dashed text-center font-mono text-[7px] uppercase leading-tight tracking-wide"
        style={{ borderColor: BORDEAUX, color: BORDEAUX }}
      >
        Correo · Josefina Moldes
      </div>

      {/* estampilla */}
      <div
        aria-hidden
        className="absolute -top-4 left-8 h-10 w-8 -rotate-6 border-2 border-dashed"
        style={{ borderColor: BORDEAUX, backgroundColor: "#A8D0E6" }}
      />

      <div className="border-2 border-bordeaux bg-cream p-6 sm:p-8">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-wide text-bordeaux/50">
          {t("addressedTo")}
        </p>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-3 py-10 text-center"
            >
              <div className="flex h-14 w-14 rotate-6 items-center justify-center rounded-full border-2 border-bordeaux font-mono text-[10px] uppercase text-bordeaux">
                OK
              </div>
              <p className="font-serif text-xl italic text-bordeaux">
                {t("sent")}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <label className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-wide text-bordeaux/60">
                  {t("name")}
                </span>
                <input
                  required
                  type="text"
                  className="border-b border-bordeaux/40 bg-transparent py-1 font-sans text-sm text-bordeaux outline-none focus:border-bordeaux"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-wide text-bordeaux/60">
                  {t("email")}
                </span>
                <input
                  required
                  type="email"
                  className="border-b border-bordeaux/40 bg-transparent py-1 font-sans text-sm text-bordeaux outline-none focus:border-bordeaux"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-wide text-bordeaux/60">
                  {t("message")}
                </span>
                <textarea
                  required
                  rows={4}
                  className="resize-none border border-bordeaux/30 bg-transparent py-2 font-sans text-sm text-bordeaux outline-none focus:border-bordeaux"
                />
              </label>
              <button
                type="submit"
                className="mt-2 self-start border-2 border-dashed border-bordeaux px-5 py-2 font-mono text-xs uppercase tracking-wide text-bordeaux transition-colors hover:bg-bordeaux hover:text-cream"
              >
                {t("send")}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
