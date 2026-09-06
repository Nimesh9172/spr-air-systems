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
  | "air-dryer"
  | "air-filter"
  | "ppr-piping"
  | "spares";

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

/** Product family used to filter the catalog. */
export type ProductFamily =
  | "air-compressors"
  | "air-dryers"
  | "air-filters"
  | "ppr-piping"
  | "spares";

/**
 * Visual emphasis for catalog badges and spec labels.
 * `eco` maps to the success/green tone, `default` to the brand blue.
 */
export type ProductTone = "default" | "eco";

/** A catalog entry rendered as a card on the /products page. */
export type CatalogProduct = {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly badge: string;
  readonly description: string;
  /** Short spec highlight shown in the card footer. */
  readonly spec: string;
  readonly tone: ProductTone;
  readonly family: ProductFamily;
  readonly image?: string;
  readonly imageAlt?: string;
};
