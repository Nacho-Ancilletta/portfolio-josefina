import {
  Box,
  Bus,
  Circle,
  CupSoda,
  Flower2,
  Frame,
  Lightbulb,
  Rainbow,
  Smile,
  Stamp,
  Sun,
  Ticket,
  type LucideIcon,
} from "lucide-react";

/**
 * Íconos placeholder por proyecto (uno por "parche"). Se reemplazan
 * más adelante por las ilustraciones bordadas reales.
 */
export const iconMap: Record<string, LucideIcon> = {
  Flower2,
  Smile,
  Stamp,
  Rainbow,
  Frame,
  CupSoda,
  Sun,
  Lightbulb,
  Box,
  Ticket,
  Bus,
};

export function getProjectIcon(name: string): LucideIcon {
  return iconMap[name] ?? Circle;
}
