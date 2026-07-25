import { COLORS } from "@/constants/colors";

/**
 * Framework-neutral theme preferences and semantic color references.
 */
export const themeConfig = {
  defaultMode: "light",
  colors: COLORS,
} as const satisfies {
  readonly defaultMode: "light" | "dark" | "system";
  readonly colors: typeof COLORS;
};
