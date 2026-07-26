import type { ContentSummary } from "@/types/common";
import type { ProductCategory } from "@/types/product";

/**
 * Static product records until a backend data source is connected.
 */
export const products = [] as const satisfies readonly ContentSummary[];

/**
 * Product categories shown on the homepage showcase.
 * Shape is API/DB-ready: swap this constant for a fetch (e.g. via
 * `services/product.service`) without touching the UI. `icon` is a string key
 * resolved to a component in the UI layer to keep this data serializable.
 */
export const productCategories: readonly ProductCategory[] = [
  {
    id: "air-compressors",
    title: "Air Compressors",
    slug: "air-compressors",
    icon: "air-compressor",
    products: [
      { name: "Reciprocating Air Compressor", slug: "reciprocating-air-compressor" },
      { name: "Rotary Screw Air Compressor", slug: "rotary-screw-air-compressor" },
      { name: "Portable Air Compressor", slug: "portable-air-compressor" },
      { name: "High Pressure Air Compressor", slug: "high-pressure-air-compressor" },
    ],
  },
  {
    id: "screw-compressors",
    title: "Screw Compressors",
    slug: "screw-compressors",
    icon: "screw-compressor",
    products: [
      { name: "Oil Injected Screw Compressor", slug: "oil-injected-screw-compressor" },
      { name: "Oil Free Screw Compressor", slug: "oil-free-screw-compressor" },
      { name: "VSD Screw Compressor", slug: "vsd-screw-compressor" },
      { name: "Two Stage Screw Compressor", slug: "two-stage-screw-compressor" },
    ],
  },
  {
    id: "industrial-pumps",
    title: "Industrial Pumps",
    slug: "industrial-pumps",
    icon: "pump",
    products: [
      { name: "Centrifugal Pump", slug: "centrifugal-pump" },
      { name: "Multistage Pump", slug: "multistage-pump" },
      { name: "Submersible Pump", slug: "submersible-pump" },
      { name: "Self Priming Pump", slug: "self-priming-pump" },
    ],
  },
];
