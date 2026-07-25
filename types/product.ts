/**
 * Product domain types for catalog, detail pages, and API contracts.
 * Align field names with the future Django product serializer.
 */

export type Product = {
  id: string;
  slug: string;
  name: string;
};
