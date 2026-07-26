/**
 * Product domain types for catalog, detail pages, and API contracts.
 * Align field names with the future Django product serializer.
 */

export type Product = {
  id: string;
  slug: string;
  name: string;
};

/**
 * Serializable icon key for a product category.
 * Maps to a concrete icon in the UI layer, so category data can safely
 * originate from a database or API response without embedding components.
 */
export type ProductCategoryIcon =
  | "air-compressor"
  | "screw-compressor"
  | "pump";

/** A single product shown within a category showcase. */
export type ProductCategoryItem = {
  readonly name: string;
  readonly slug: string;
  /** Optional product image under `/public/images/products/`. */
  readonly image?: string;
  readonly imageAlt?: string;
};

/** A product category with its representative products (homepage showcase). */
export type ProductCategory = {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly icon: ProductCategoryIcon;
  readonly products: readonly ProductCategoryItem[];
};
