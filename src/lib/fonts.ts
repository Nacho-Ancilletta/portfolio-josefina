import { Archivo, Fraunces, Instrument_Serif, Space_Mono } from "next/font/google";

// Títulos de proyecto: técnica de contraste de grosores (ver spec).
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Refuerzo puntual para acentos cuando Fraunces no alcanza.
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  style: ["italic", "normal"],
  weight: "400",
  display: "swap",
});

// Cuerpo de texto y descripciones.
export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Tags de categoría y metadata chica, siempre en mayúsculas.
export const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const fontVariables = [
  fraunces.variable,
  instrumentSerif.variable,
  archivo.variable,
  spaceMono.variable,
].join(" ");
