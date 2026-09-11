import {
  catalogProducts,
  getCatalogProductBySlug,
} from "@/data/products";
import type { CatalogProduct } from "@/types/product";

/**
 * Product catalog API service layer.
 * Swap the implementation to call Django endpoints without changing UI callers.
 */

export async function getProducts(): Promise<CatalogProduct[]> {
  return [...catalogProducts];
}

export async function getProductBySlug(
  slug: string,
): Promise<CatalogProduct | null> {
  return getCatalogProductBySlug(slug) ?? null;
}
