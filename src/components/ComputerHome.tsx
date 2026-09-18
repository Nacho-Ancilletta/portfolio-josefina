"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { projects } from "@/data/projects";
import { categories } from "@/data/categories";
import { getProjectIcon } from "@/lib/icons";
import { adjustHex } from "@/lib/color";
import { grainLayer } from "@/lib/texture";
import { CategoryTag } from "./CategoryTag";

/**
 * Recorte de la foto placeholder (museo, monitor + una porción de teclado),
 * expresado como caja dentro de la imagen original (1500x1000 aprox., en
 * unidades relativas). Al reemplazar por el asset definitivo, recalcular
 * estos porcentajes contra la nueva imagen.
 */
const MONITOR_CROP = { left: 420, top: 170, width: 620, height: 850 };
const IMAGE_SIZE = { width: 2000, height: 1333 };

/** Ventana de la pantalla (vidrio del CRT) dentro del recorte del monitor. */
const SCREEN_BOX = { left: "10%", top: "6%", width: "76%", height: "70%" };

/**
 * Home: composición de imagen real (nubes de fondo + foto de computadora
 * vintage recortada al monitor) con una fila de "teclas" interactivas
 * superpuesta — una por proyecto. La foto de museo no permite ubicar
 * hotspots sobre teclas reales con precisión, así que las teclas se
 * construyen como botones con volumen propio (mismo tratamiento
 * fotográfico que el resto del sitio: gradiente + grain), no como zonas
 * invisibles sobre la imagen. Hover muestra preview en la pantalla,
 * click/tap navega. Placeholder a reemplazar por assets definitivos.
 */
export function ComputerHome() {
  const t = useTranslations("home");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const active = projects.find((p) => p.id === hoveredId) ?? null;

  return (
    <div className="relative overflow-hidden">
      {/* fondo: cielo con nubes + grano superpuesto */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `${grainLayer}, url(/images/home/sky-clouds.jpg)`,
          backgroundSize: "160px, cover",
          backgroundPosition: "center, center 30%",
          backgroundRepeat: "repeat, no-repeat",
          backgroundBlendMode: "soft-light, normal",
        }}
      />
      {/* velo celeste para unificar la foto con la paleta */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundColor: "var(--color-sky)", mixBlendMode: "multiply", opacity: 0.12 }}
      />

      <div className="relative mx-auto flex max-w-lg flex-col items-center px-6 py-20 sm:py-28">
        {/* título superpuesto al borde superior del monitor */}
        <div className="relative z-20 -mb-5 text-center sm:-mb-7">
          <p className="font-serif leading-none text-navy">
            <span className="text-lg font-light italic sm:text-xl">portfolio</span>{" "}
            <span className="text-5xl font-extrabold italic sm:text-6xl">Josefina</span>{" "}
            <span className="text-3xl font-semibold sm:text-4xl">Moldes</span>
          </p>
        </div>

        {/* monitor: foto recortada + pantalla con contenido dinámico */}
        <div
          className="relative z-10 w-full max-w-[380px]"
          style={{ aspectRatio: `${MONITOR_CROP.width} / ${MONITOR_CROP.height}` }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[6%] shadow-[0_30px_50px_rgba(30,58,138,0.35)]">
            <img
              src="/images/home/computer-source.jpg"
              alt=""
              aria-hidden
              className="pointer-events-none absolute max-w-none"
              style={{
                width: `${(IMAGE_SIZE.width / MONITOR_CROP.width) * 100}%`,
                height: `${(IMAGE_SIZE.height / MONITOR_CROP.height) * 100}%`,
                left: `${-(MONITOR_CROP.left / MONITOR_CROP.width) * 100}%`,
                top: `${-(MONITOR_CROP.top / MONITOR_CROP.height) * 100}%`,
              }}
            />
          </div>

          {/* pantalla: preview del proyecto activo */}
          <div
            className="absolute flex items-center justify-center overflow-hidden rounded-sm px-3 text-center"
            style={{
              ...SCREEN_BOX,
              backgroundColor: "rgba(20,40,99,0.18)",
              transform: "rotate(-1.5deg)",
            }}
          >
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.16 }}
                  className="flex flex-col items-center gap-2"
                >
                  <p className="font-serif text-sm italic leading-tight text-cream drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] sm:text-base">
                    {active.titleParts.map((p) => p.text).join(" ")}
                  </p>
                  <CategoryTag category={active.category} />
                </motion.div>
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85 }}
                  exit={{ opacity: 0 }}
                  className="px-2 font-serif text-sm italic text-cream drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] sm:text-base"
                >
                  {t("emptyPanel")}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* fila de teclas: una por proyecto */}
        <div className="relative z-10 -mt-3 flex w-full max-w-[420px] flex-wrap justify-center gap-1.5 rounded-b-lg bg-[#e9dcb8] p-3 shadow-[0_16px_24px_rgba(20,40,99,0.25)] sm:gap-2 sm:p-4">
          {projects.map((project, i) => {
            const Icon = getProjectIcon(project.icon);
            const meta = categories[project.category];
            const label = project.titleParts.map((p) => p.text).join(" ");
            const rotation = ((i % 3) - 1) * 2;

            return (
              <Link
                key={project.id}
                href={`/proyectos/${project.slug}`}
                aria-label={label}
                onMouseEnter={() => setHoveredId(project.id)}
                onFocus={() => setHoveredId(project.id)}
                onMouseLeave={() =>
                  setHoveredId((h) => (h === project.id ? null : h))
                }
                onBlur={() => setHoveredId((h) => (h === project.id ? null : h))}
                onTouchStart={() => setHoveredId(project.id)}
                style={{ transform: `rotate(${rotation}deg)` }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] transition-transform hover:-translate-y-0.5 hover:scale-105 focus:-translate-y-0.5 focus:scale-105 focus:outline-none sm:h-10 sm:w-10"
              >
                <span
                  className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[4px]"
                  style={{
                    backgroundImage: `${grainLayer}, radial-gradient(circle at 35% 30%, ${adjustHex(meta.bg, 40)} 0%, ${meta.bg} 55%, ${adjustHex(meta.bg, -30)} 100%)`,
                    backgroundBlendMode: "soft-light, normal",
                    boxShadow:
                      "inset 0 1.5px 2px rgba(255,255,255,0.35), inset 0 -2px 4px rgba(0,0,0,0.35), 0 2px 3px rgba(0,0,0,0.25)",
                  }}
                >
                  <Icon
                    className="h-[52%] w-[52%]"
                    style={{ color: meta.text, filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.4))" }}
                    strokeWidth={1.75}
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
