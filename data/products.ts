import type { ContentSummary } from "@/types/common";

/**
 * Static product records until a backend data source is connected.
 */
export const products = [] as const satisfies readonly ContentSummary[];
