import type { ContentSummary } from "@/types/common";
import type {
  CatalogProduct,
  ProductApplication,
  ProductCategory,
} from "@/types/product";

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

/**
 * Application filters offered on the catalog page.
 * `id` doubles as the value matched against `CatalogProduct.applications`.
 */
export const productApplications: readonly {
  readonly id: ProductApplication;
  readonly label: string;
}[] = [
  { id: "manufacturing", label: "Manufacturing" },
  { id: "pharmaceutical", label: "Pharmaceutical" },
  { id: "oil-and-gas", label: "Oil & Gas" },
  { id: "food-and-beverage", label: "Food & Beverage" },
];

/**
 * Catalog entries rendered on the /products page.
 * Serializable by design — replace with a `product.service` fetch later.
 */
export const catalogProducts: readonly CatalogProduct[] = [
  {
    id: "reciprocating",
    name: "Reciprocating",
    slug: "reciprocating-air-compressor",
    badge: "Heavy Duty",
    description:
      "Engineered for intermittent demand and rugged workshop environments. Features cast iron construction for maximum durability.",
    spec: "Starting at 5 HP",
    tone: "default",
    applications: ["manufacturing", "oil-and-gas"],
  },
  {
    id: "rotary-screw",
    name: "Rotary Screw",
    slug: "rotary-screw-air-compressor",
    badge: "Continuous Duty",
    description:
      "Premium efficiency for 24/7 industrial operations. Low noise levels and advanced integrated controls for energy management.",
    spec: "20 – 500 HP",
    tone: "default",
    applications: ["manufacturing", "oil-and-gas", "food-and-beverage"],
  },
  {
    id: "oil-free",
    name: "Oil-free",
    slug: "oil-free-screw-compressor",
    badge: "Oil Free",
    description:
      "Certified 100% oil-free air for pharmaceutical, food & beverage, and sensitive electronics manufacturing applications.",
    spec: "TÜV Certified",
    tone: "eco",
    applications: ["pharmaceutical", "food-and-beverage", "manufacturing"],
  },
  {
    id: "centrifugal",
    name: "Centrifugal",
    slug: "centrifugal-pump",
    badge: "High Flow",
    description:
      "Optimized for high-volume, steady-state air requirements. Features multi-stage compression for superior thermodynamic efficiency.",
    spec: "Up to 90,000 CFM",
    tone: "default",
    applications: ["oil-and-gas", "manufacturing"],
  },
  {
    id: "vsd-systems",
    name: "VSD Systems",
    slug: "vsd-screw-compressor",
    badge: "Eco Efficient",
    description:
      "Variable Speed Drive technology that matches motor speed to air demand, reducing energy consumption by up to 35%.",
    spec: "Smart Logic",
    tone: "eco",
    applications: ["manufacturing", "pharmaceutical", "food-and-beverage"],
  },
  {
    id: "air-dryers",
    name: "Air Dryers",
    slug: "air-dryers",
    badge: "Air Quality",
    description:
      "Refrigerated and desiccant drying solutions to remove moisture and contaminants, protecting downstream equipment.",
    spec: "-40°F Dewpoint",
    tone: "default",
    applications: ["pharmaceutical", "food-and-beverage", "oil-and-gas"],
  },
];
