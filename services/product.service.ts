import type { Product } from "@/types/product";

/**
 * Product catalog API service layer.
 * Swap the implementation to call Django endpoints without changing UI callers.
 */

export async function getProducts(): Promise<Product[]> {
  // Intentionally unimplemented — wire to Django products API later.
  return [];
}

export async function getProductBySlug(_slug: string): Promise<Product | null> {
  // Intentionally unimplemented — wire to Django product detail API later.
  return null;
}
