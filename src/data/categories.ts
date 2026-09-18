export type CategoryId =
  | "health"
  | "art"
  | "audiovisual"
  | "product"
  | "editorial"
  | "digital";

export interface CategoryMeta {
  id: CategoryId;
  /** clave de traducción bajo el namespace "categories" */
  labelKey: CategoryId;
  bg: string;
  border: string;
  text: string;
}

export const categories: Record<CategoryId, CategoryMeta> = {
  health: {
    id: "health",
    labelKey: "health",
    bg: "#1E3A8A",
    border: "#1E3A8A",
    text: "#F5EFE0",
  },
  digital: {
    id: "digital",
    labelKey: "digital",
    bg: "#4A63A8",
    border: "#4A63A8",
    text: "#F5EFE0",
  },
  audiovisual: {
    id: "audiovisual",
    labelKey: "audiovisual",
    bg: "#142863",
    border: "#142863",
    text: "#F5EFE0",
  },
  art: {
    id: "art",
    labelKey: "art",
    bg: "#6B1F2A",
    border: "#6B1F2A",
    text: "#F5EFE0",
  },
  editorial: {
    id: "editorial",
    labelKey: "editorial",
    bg: "#96434C",
    border: "#96434C",
    text: "#F5EFE0",
  },
  product: {
    id: "product",
    labelKey: "product",
    bg: "#4A1119",
    border: "#4A1119",
    text: "#F5EFE0",
  },
};
