/**
 * URL slug helpers for product, industry, and blog routes.
 * Keep pure and framework-agnostic for reuse in server and client code.
 */

export function toSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}
