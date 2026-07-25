/**
 * Contracts for navigation configuration consumed by future layouts.
 */
export type NavigationItem = {
  readonly label: string;
  readonly href: string;
  readonly kind?: "link" | "cta";
};

export type NavigationConfig = readonly NavigationItem[];
