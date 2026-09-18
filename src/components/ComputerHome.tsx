"use client";

import { useEffect, useState } from "react";
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
 * Recorte de la foto de la computadora (solo el monitor, sin teclado ni
 * mouse), expresado como caja dentro de la imagen original (1536x1024 px).
 * Al reemplazar el archivo, recalcular estos números contra la imagen nueva.
 */
const MONITOR_CROP = { left: 300, top: 0, width: 880, height: 770 };
const IMAGE_SIZE = { width: 1536, height: 1024 };

/** Ventana de la pantalla (vidrio del CRT) dentro del recorte del monitor. */
const SCREEN_BOX = { left: "15%", top: "12%", width: "71%", height: "56%" };

/**
 * Una tecla del teclado: decorativa (`label`, no hace nada) o interactiva
 * (`projectIndex`, referencia a `projects[projectIndex]`). `w` es el ancho
 * relativo dentro de la fila (1 = tecla normal, más para teclas anchas
 * como espaciadora/enter/shift).
 */
type KeyDef = { label?: string; w?: number; projectIndex?: number };

/**
 * Layout de teclado QWERTY completo. Las 11 teclas de proyecto (una por
 * índice de `projects`) están salteadas entre las decorativas, repartidas
 * por todas las filas en vez de agrupadas — así el objeto se lee como una
 * compu real, no como una tira de botones.
 */
const KEY_ROWS: KeyDef[][] = [
  [
    { label: "esc" },
    { label: "1" },
    { label: "2" },
    { projectIndex: 0 },
    { label: "4" },
    { label: "5" },
    { projectIndex: 1 },
    { label: "7" },
    { label: "8" },
    { label: "9" },
    { label: "0" },
    { label: "-" },
    { label: "=" },
    { label: "⌫", w: 1.6 },
  ],
  [
    { label: "tab", w: 1.4 },
    { label: "Q" },
    { label: "W" },
    { projectIndex: 2 },
    { label: "R" },
    { label: "T" },
    { label: "Y" },
    { projectIndex: 3 },
    { label: "I" },
    { label: "O" },
    { label: "P" },
    { label: "[" },
    { label: "]" },
  ],
  [
    { label: "caps", w: 1.6 },
    { label: "A" },
    { label: "S" },
    { projectIndex: 4 },
    { label: "F" },
    { label: "G" },
    { projectIndex: 5 },
    { label: "J" },
    { label: "K" },
    { label: "L" },
    { label: ";" },
    { label: "enter", w: 1.8 },
  ],
  [
    { label: "shift", w: 2 },
    { label: "Z" },
    { projectIndex: 6 },
    { label: "C" },
    { label: "V" },
    { projectIndex: 7 },
    { label: "N" },
    { label: "M" },
    { label: "," },
    { label: "." },
    { label: "shift", w: 2 },
  ],
  [
    { label: "ctrl", w: 1.4 },
    { label: "alt", w: 1.2 },
    { projectIndex: 8 },
    { label: "", w: 5 },
    { projectIndex: 9 },
    { label: "alt", w: 1.2 },
    { projectIndex: 10 },
    { label: "ctrl", w: 1.4 },
  ],
];

/**
 * Home: composición de imagen real (nubes de fondo + foto de computadora
 * vintage recortada al monitor) con una fila de "teclas" interactivas
 * debajo — una por proyecto. En vez de hotspots invisibles calcados sobre
 * el teclado fotografiado (frágil: cualquier cambio de encuadre rompe las
 * coordenadas), las teclas se construyen como botones con volumen propio
 * (mismo tratamiento fotográfico que el resto del sitio: gradiente +
 * grain), robustos a futuros cambios de imagen. Hover muestra preview en
 * la pantalla, click/tap navega.
 */
export function ComputerHome() {
  const t = useTranslations("home");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const active = projects.find((p) => p.id === hoveredId) ?? null;

  // Enseñanza no textual: al entrar a la página, una tecla se "toca" sola
  // brevemente (mismo estado que el hover real: se levanta + muestra
  // preview en pantalla) para mostrar que el teclado es interactivo, sin
  // agregar texto de instrucción.
  useEffect(() => {
    const firstId = projects[0]?.id;
    if (!firstId) return;
    const show = setTimeout(() => setHoveredId(firstId), 700);
    const hide = setTimeout(
      () => setHoveredId((h) => (h === firstId ? null : h)),
      1600
    );
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  return (
    <div className="relative flex h-full min-h-[calc(100dvh-4rem)] flex-col">
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

      {/* h-full + justify-center: todo el conjunto centrado en el alto
          disponible (viewport menos header) para que entre sin scroll en
          desktop; si en pantallas chicas no entra, se permite scroll mínimo
          en vez de forzar el achique. */}
      <div className="relative mx-auto flex h-full w-full max-w-lg flex-1 flex-col items-center justify-center px-6 py-6 sm:py-8">
        {/* título superpuesto al borde superior del monitor */}
        <div className="relative z-20 -mb-4 text-center sm:-mb-6">
          <p className="font-serif leading-none text-navy">
            <span className="text-lg font-light italic sm:text-xl">portfolio</span>{" "}
            <span className="text-5xl font-extrabold italic sm:text-6xl">Josefina</span>{" "}
            <span className="text-3xl font-semibold sm:text-4xl">Moldes</span>
          </p>
        </div>

        {/* monitor: foto recortada + pantalla con contenido dinámico */}
        <div
          className="relative z-10 w-full max-w-[280px] sm:max-w-[340px]"
          style={{ aspectRatio: `${MONITOR_CROP.width} / ${MONITOR_CROP.height}` }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[6%] shadow-[0_30px_50px_rgba(30,58,138,0.35)]">
            <img
              src="/images/home/computer.png"
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

        {/* teclado completo: teclas decorativas + 11 de proyecto salteadas */}
        <div className="relative z-10 -mt-3 flex w-full max-w-[350px] flex-col gap-1 rounded-b-lg bg-[#e9dcb8] p-2 shadow-[0_16px_24px_rgba(20,40,99,0.25)] sm:max-w-[420px] sm:gap-1 sm:p-2.5">
          {KEY_ROWS.map((row, rowIdx) => (
            <div key={rowIdx} className="flex h-5 gap-1 sm:h-6 sm:gap-1.5">
              {row.map((key, keyIdx) => {
                const w = key.w ?? 1;

                if (key.projectIndex === undefined) {
                  return (
                    <div
                      key={keyIdx}
                      aria-hidden
                      style={{
                        flex: `${w} ${w} 0%`,
                        backgroundImage: `${grainLayer}, linear-gradient(160deg, #f6efd8, #d9c9a1)`,
                        backgroundBlendMode: "soft-light, normal",
                        boxShadow:
                          "inset 0 1px 1px rgba(255,255,255,0.5), inset 0 -1.5px 3px rgba(0,0,0,0.18)",
                      }}
                      className="flex items-center justify-center rounded-[3px] font-mono text-[6px] uppercase leading-none text-[#8a7c5c] sm:text-[7px]"
                    >
                      {key.label}
                    </div>
                  );
                }

                const project = projects[key.projectIndex];
                const Icon = getProjectIcon(project.icon);
                const meta = categories[project.category];
                const label = project.titleParts.map((p) => p.text).join(" ");

                const isPreviewing = hoveredId === project.id;

                return (
                  <Link
                    key={keyIdx}
                    href={`/proyectos/${project.slug}`}
                    aria-label={label}
                    onMouseEnter={() => setHoveredId(project.id)}
                    onFocus={() => setHoveredId(project.id)}
                    onMouseLeave={() =>
                      setHoveredId((h) => (h === project.id ? null : h))
                    }
                    onBlur={() => setHoveredId((h) => (h === project.id ? null : h))}
                    onTouchEnd={(e) => {
                      if (isPreviewing) return; // 2do tap: navega normal
                      e.preventDefault(); // 1er tap: solo mostrar preview
                      setHoveredId(project.id);
                    }}
                    style={{ flex: `${w} ${w} 0%`, outlineColor: meta.bg }}
                    className={[
                      "flex items-center justify-center rounded-[3px] transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                      isPreviewing ? "-translate-y-0.5" : "hover:-translate-y-0.5",
                    ].join(" ")}
                  >
                    <span
                      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[3px]"
                      style={{
                        backgroundImage: `${grainLayer}, radial-gradient(circle at 35% 30%, ${adjustHex(meta.bg, 40)} 0%, ${meta.bg} 55%, ${adjustHex(meta.bg, -30)} 100%)`,
                        backgroundBlendMode: "soft-light, normal",
                        boxShadow:
                          "inset 0 1px 1.5px rgba(255,255,255,0.35), inset 0 -1.5px 3px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.25)",
                      }}
                    >
                      <Icon
                        className="h-[55%] w-[55%]"
                        style={{ color: meta.text, filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.4))" }}
                        strokeWidth={2}
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
