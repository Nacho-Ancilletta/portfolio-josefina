import type { CategoryId } from "./categories";

/**
 * Un fragmento del título con la técnica de contraste de grosores:
 * palabra principal alta+itálica, conectores bajos+itálicos+chicos,
 * resto en peso medio sin itálica.
 */
export interface TitlePart {
  text: string;
  weight: "low" | "mid" | "high";
  italic?: boolean;
  small?: boolean;
}

/**
 * Una pieza gráfica dentro de un proyecto. `word` solo se define cuando
 * la pieza participa de la sopa de letras (proyectos con 3+ piezas
 * nombradas); si falta, la pieza se muestra como grupo etiquetado
 * dentro de una galería simple.
 *
 * Si la pieza es un link externo (ej. "Página web"), lleva `link` en vez
 * de `images` — vive como palabra más dentro de la sopa de letras igual
 * que cualquier otra pieza, pero el click abre el link en vez de mostrar
 * imágenes.
 */
export interface ProjectPiece {
  id: string;
  label: string;
  word?: string;
  /** cantidad de imágenes placeholder para esa pieza */
  images?: number;
  /** si está presente, la pieza es un link externo en vez de imágenes */
  link?: string;
}

export interface EmbedInfo {
  type: "video" | "prototype";
  provider: string;
  /** URL real del embed — mientras no esté, se muestra un placeholder */
  url?: string;
}

export interface Project {
  id: string;
  slug: string;
  year: number;
  category: CategoryId;
  /** nombre del ícono lucide-react usado como placeholder del parche */
  icon: string;
  titleParts: TitlePart[];
  subtitle?: string;
  description: { es: string; en: string };
  /** cantidad de imágenes placeholder para galería simple sin piezas nombradas */
  galleryCount?: number;
  /** piezas nombradas: con `word` en todas y 3+ → sopa de letras; si no, galería etiquetada */
  pieces?: ProjectPiece[];
  embed?: EmbedInfo;
  credits?: string[];
}

export const projects: Project[] = [
  {
    id: "surgery-with-compassion",
    slug: "surgery-with-compassion",
    year: 2026,
    category: "health",
    icon: "Flower2",
    titleParts: [
      { text: "Surgery", weight: "mid" },
      { text: "with", weight: "low", italic: true, small: true },
      { text: "Compassion", weight: "high", italic: true },
    ],
    description: {
      es: "Identidad visual para una iniciativa que promueve un enfoque más humano en la práctica quirúrgica. Explora la síntesis entre el bisturí (práctica quirúrgica) y la flor (cuidado y compasión), dando origen a un símbolo y un sistema desplegable en redes sociales.",
      en: "Visual identity for an initiative that promotes a more humane approach to surgical practice. It explores the synthesis between the scalpel (surgical practice) and the flower (care and compassion), giving rise to a symbol and a system deployable across social media.",
    },
    pieces: [
      { id: "logo", label: "Logo", images: 3 },
      { id: "instagram", label: "Instagram", images: 3 },
    ],
  },
  {
    id: "grupo-de-extrofia-chile",
    slug: "grupo-de-extrofia-chile",
    year: 2025,
    category: "health",
    icon: "Smile",
    titleParts: [
      { text: "Grupo", weight: "mid" },
      { text: "de", weight: "low", italic: true, small: true },
      { text: "Extrofia Chile", weight: "high", italic: true },
    ],
    description: {
      es: "Logotipo para el Grupo de Extrofia Chile, parte de Uroped Chile. A partir de la sonrisa del logo original y dos de sus colores, se desarrolló un símbolo simple y dinámico que mantiene el vínculo con la marca pero con identidad propia.",
      en: "Logotype for Grupo de Extrofia Chile, part of Uroped Chile. Starting from the smile in the original logo and two of its colors, a simple and dynamic symbol was developed that keeps the link with the brand while having an identity of its own.",
    },
    galleryCount: 6,
    embed: { type: "video", provider: "Video" },
  },
  {
    id: "tienda-oficial-de-puro-diseno",
    slug: "tienda-oficial-de-puro-diseno",
    year: 2025,
    category: "product",
    icon: "Stamp",
    titleParts: [
      { text: "Tienda oficial", weight: "mid" },
      { text: "de", weight: "low", italic: true, small: true },
      { text: "Puro Diseño", weight: "high", italic: true },
    ],
    description: {
      es: "Merch para la Tienda Oficial de Puro Diseño, feria de diseño (25 años), a partir de un boceto de la tienda física traducido en sistema gráfico.",
      en: "Merch for the Tienda Oficial de Puro Diseño, a design fair celebrating its 25th anniversary, based on a sketch of the physical store translated into a graphic system.",
    },
    pieces: [
      { id: "poster", label: "Póster", word: "POSTER", images: 3 },
      { id: "libreta", label: "Libreta", word: "LIBRETA", images: 3 },
      { id: "totebag", label: "Totebag", word: "TOTEBAG", images: 3 },
      { id: "stickers", label: "Stickers", word: "STICKERS", images: 4 },
    ],
  },
  {
    id: "rainbow-pediatric-urology-team",
    slug: "rainbow-pediatric-urology-team",
    year: 2025,
    category: "health",
    icon: "Rainbow",
    titleParts: [
      { text: "Rainbow", weight: "high", italic: true },
      { text: "Pediatric Urology Team", weight: "mid" },
    ],
    description: {
      es: "Identidad visual para el servicio de Urología Pediátrica de Rainbow Babies & Children's Hospital (Cleveland, Ohio, parte de University Hospitals). Sistema que organiza el logotipo y su aplicación en web, redes sociales y piezas gráficas.",
      en: "Visual identity for the Pediatric Urology service at Rainbow Babies & Children's Hospital (Cleveland, Ohio, part of University Hospitals). A system that organizes the logotype and its application across web, social media and graphic pieces.",
    },
    pieces: [
      { id: "identidad", label: "Identidad de marca y logotipo", word: "IDENTIDAD", images: 4 },
      { id: "instagram", label: "Instagram", word: "INSTAGRAM", images: 3 },
      {
        id: "web",
        label: "Página web",
        word: "WEB",
        link: "https://www.rainbowpedsurology.org/es/",
      },
    ],
  },
  {
    id: "amigos-del-bellas-artes-x-la-cupula",
    slug: "amigos-del-bellas-artes-x-la-cupula",
    year: 2024,
    category: "art",
    icon: "Frame",
    titleParts: [
      { text: "Amigos del Bellas Artes", weight: "mid" },
      { text: "x", weight: "low", italic: true, small: true },
      { text: "La Cúpula", weight: "high", italic: true },
    ],
    description: {
      es: "Piezas gráficas para \"Constelación\", pop-up store de La Cúpula en el MNBA, en colaboración con Amigos del Bellas Artes.",
      en: "Graphic pieces for \"Constelación\", a pop-up store by La Cúpula at the MNBA, in collaboration with Amigos del Bellas Artes.",
    },
    pieces: [
      { id: "totebag", label: "Totebag", word: "TOTEBAG", images: 3 },
      { id: "logo", label: "Logo", word: "LOGO", images: 2 },
      { id: "stickers", label: "Stickers", word: "STICKERS", images: 4 },
      { id: "posters-2024", label: "Posters / Edición 2024", word: "POSTERS", images: 4 },
      { id: "poster-2025", label: "Poster / Edición 2025", word: "POSTER", images: 2 },
      { id: "tarjeton", label: "Tarjetón serie de objetos", word: "TARJETON", images: 2 },
    ],
  },
  {
    id: "garden-of-flavor",
    slug: "garden-of-flavor",
    year: 2024,
    category: "product",
    icon: "CupSoda",
    titleParts: [
      { text: "Garden", weight: "mid" },
      { text: "of", weight: "low", italic: true, small: true },
      { text: "Flavor", weight: "high", italic: true },
    ],
    description: {
      es: "Rediseño conceptual de identidad visual para marca estadounidense de jugos naturales. Nuevo logotipo y sistema gráfico para etiquetas.",
      en: "Conceptual visual identity redesign for a US natural juice brand. New logotype and graphic system for labels.",
    },
    galleryCount: 6,
  },
  {
    id: "nt-al-sol-video-lyrics",
    slug: "nt-al-sol-video-lyrics",
    year: 2024,
    category: "audiovisual",
    icon: "Sun",
    titleParts: [{ text: "NT al Sol", weight: "high", italic: true }],
    subtitle: "Video Lyrics",
    description: {
      es: "Videolyrics para la canción \"NT al Sol\" de Melanie Williams y El Cabloide (Tresmo, 2023).",
      en: "Video lyrics for the song \"NT al Sol\" by Melanie Williams and El Cabloide (Tresmo, 2023).",
    },
    embed: { type: "video", provider: "Behance" },
  },
  {
    id: "portadores-de-luz",
    slug: "portadores-de-luz",
    year: 2024,
    category: "audiovisual",
    icon: "Lightbulb",
    titleParts: [
      { text: "Portadores", weight: "mid" },
      { text: "de", weight: "low", italic: true, small: true },
      { text: "luz", weight: "high", italic: true },
    ],
    subtitle: "Experiencia interactiva",
    description: {
      es: "Experiencia interactiva para el Media Lab de la Universidad Torcuato Di Tella, basada en un Objetivo de Desarrollo Sostenible de la ONU. Multisensorial e interactiva.",
      en: "Interactive experience for the Media Lab at Universidad Torcuato Di Tella, based on a UN Sustainable Development Goal. Multisensory and interactive.",
    },
    galleryCount: 5,
    embed: { type: "video", provider: "YouTube" },
    credits: ["Martina Menem", "Josefina Moldes"],
  },
  {
    id: "video-mapping",
    slug: "video-mapping",
    year: 2024,
    category: "audiovisual",
    icon: "Box",
    titleParts: [
      { text: "Video", weight: "mid" },
      { text: "Mapping", weight: "high", italic: true },
    ],
    description: {
      es: "Video mapping sobre estructura de cubos y paneles, canción \"Bike\" de Autechre.",
      en: "Video mapping over a structure of cubes and panels, set to \"Bike\" by Autechre.",
    },
    embed: { type: "video", provider: "YouTube" },
  },
  {
    id: "fan-paper-cazzu",
    slug: "fan-paper-cazzu",
    year: 2023,
    category: "editorial",
    icon: "Ticket",
    titleParts: [
      { text: "Fan", weight: "mid" },
      { text: "Paper", weight: "high", italic: true },
    ],
    subtitle: "Cazzu",
    description: {
      es: "Publicación editorial reversible sobre la artista Cazzu — al desarmarse revela un póster en el reverso. Restricción de duotono.",
      en: "Reversible editorial publication about the artist Cazzu — when taken apart it reveals a poster on the back. Built under a duotone constraint.",
    },
    pieces: [
      { id: "publicacion", label: "Publicación", images: 3 },
      { id: "poster", label: "Poster", images: 3 },
    ],
  },
  {
    id: "viauni",
    slug: "viauni",
    year: 2023,
    category: "digital",
    icon: "Bus",
    titleParts: [{ text: "ViaUni", weight: "high", italic: true }],
    subtitle: "Aplicación de transporte estudiantil",
    description: {
      es: "Prototipo de app de transporte estudiantil (carpooling), desarrollo integral desde investigación (insights, wireframes, prototipado, testeo) hasta interfaz final.",
      en: "Student carpooling app prototype, end-to-end development from research (insights, wireframes, prototyping, testing) to final interface.",
    },
    pieces: [{ id: "portada", label: "Portada", images: 1 }],
    embed: { type: "prototype", provider: "Figma" },
    credits: ["Emilia Marchant", "Ana Mayoraz", "Martina Menem", "Josefina Moldes"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
