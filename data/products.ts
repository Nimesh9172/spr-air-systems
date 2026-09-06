import type { ContentSummary } from "@/types/common";
import type {
  CatalogProduct,
  ProductCategory,
  ProductFamily,
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
      { name: "Reciprocating Air Compressors", slug: "reciprocating-air-compressor" },
      { name: "Direct Drive With PM Motor VFD", slug: "direct-drive-pm-motor-vfd" },
      { name: "Base Mounted Screw Compressors", slug: "base-mounted-screw-compressor" },
      { name: "Tank Mounted Full Feature", slug: "tank-mounted-full-feature" },
      { name: "High Pressure 16 Bar", slug: "high-pressure-16-bar" },
    ],
  },
  {
    id: "air-dryers",
    title: "Air Dryers",
    slug: "air-dryers",
    icon: "air-dryer",
    products: [
      { name: "Refrigerated Air Dryers", slug: "refrigerated-air-dryer" },
      { name: "Desiccant Air Dryers", slug: "desiccant-air-dryer" },
    ],
  },
  {
    id: "air-filters",
    title: "Compressed Air Filters",
    slug: "compressed-air-filters",
    icon: "air-filter",
    products: [
      { name: "Pre Filter", slug: "pre-filter" },
      { name: "After Filter", slug: "after-filter" },
      { name: "Carbon Filter", slug: "carbon-filter" },
      { name: "Micro Filter", slug: "micro-filter" },
    ],
  },
  {
    id: "ppr-piping",
    title: "PPR Piping",
    slug: "ppr-piping",
    icon: "ppr-piping",
    products: [
      { name: "PPR Piping Solutions", slug: "ppr-piping" },
    ],
  },
  {
    id: "spares",
    title: "Compressor & Dryer Spares",
    slug: "spares",
    icon: "spares",
    products: [
      { name: "Compressor Spares", slug: "compressor-spares" },
      { name: "Dryer Spares", slug: "dryer-spares" },
    ],
  },
];

/**
 * Family filters offered on the catalog page.
 * `id` matches `CatalogProduct.family`.
 */
export const productFamilies: readonly {
  readonly id: ProductFamily;
  readonly label: string;
}[] = [
  { id: "air-compressors", label: "Air Compressors" },
  { id: "air-dryers", label: "Air Dryers" },
  { id: "air-filters", label: "Compressed Air Filters" },
  { id: "ppr-piping", label: "PPR Piping" },
  { id: "spares", label: "Compressor & Dryer Spares" },
];

/**
 * Catalog entries rendered on the /products page.
 * Serializable by design — replace with a `product.service` fetch later.
 */
export const catalogProducts: readonly CatalogProduct[] = [
  {
    id: "reciprocating",
    name: "Reciprocating Air Compressors",
    slug: "reciprocating-air-compressor",
    badge: "Heavy Duty",
    description:
      "Built for intermittent workshop demand and rugged duty. Cast-iron construction for long life where the load is start-stop, not 24/7.",
    spec: "Starting at 5 HP",
    tone: "default",
    family: "air-compressors",
  },
  {
    id: "pm-motor-vfd",
    name: "Direct Drive With PM Motor VFD",
    slug: "direct-drive-pm-motor-vfd",
    badge: "Energy Saving",
    description:
      "Permanent-magnet motor with VFD, direct drive. Matches motor speed to air demand and cuts unloaded running that wastes kWh.",
    spec: "PM motor + VFD",
    tone: "eco",
    family: "air-compressors",
  },
  {
    id: "base-mounted-screw",
    name: "Base Mounted Screw Compressors",
    slug: "base-mounted-screw-compressor",
    badge: "SPR-SC",
    description:
      "High-performance screw packages for continuous industrial operation. Low noise, heavy-duty construction, air or water cooled.",
    spec: "5 – 500 HP · 20 – 2500 CFM",
    tone: "default",
    family: "air-compressors",
  },
  {
    id: "tank-mounted",
    name: "Tank Mounted Full Feature",
    slug: "tank-mounted-full-feature",
    badge: "Ready To Run",
    description:
      "Compressor, receiver, and treatment on one skid. A compact plant-air package for shops that need air without a separate compressor room.",
    spec: "Integrated receiver",
    tone: "default",
    family: "air-compressors",
  },
  {
    id: "high-pressure-16",
    name: "High Pressure 16 Bar",
    slug: "high-pressure-16-bar",
    badge: "16 Bar",
    description:
      "High-pressure packages for processes that need more than plant air — testing, PET, and other 16 Bar(g) duties.",
    spec: "16 Bar(g)",
    tone: "default",
    family: "air-compressors",
  },
  {
    id: "refrigerated-dryer",
    name: "Refrigerated Air Dryers",
    slug: "refrigerated-air-dryer",
    badge: "SPR-AD",
    description:
      "Removes moisture from plant air with a stable dew point. Compact, energy-efficient treatment for general manufacturing and pneumatic lines.",
    spec: "20 – 2000 CFM · 2°C to 10°C",
    tone: "default",
    family: "air-dryers",
  },
  {
    id: "desiccant-dryer",
    name: "Desiccant Air Dryers",
    slug: "desiccant-air-dryer",
    badge: "SPR-DD",
    description:
      "Ultra-low dew point for critical applications. Heatless or heated regeneration with digital control where condensate is a quality event.",
    spec: "20 – 1000 CFM · −40°C to −70°C",
    tone: "eco",
    family: "air-dryers",
  },
  {
    id: "pre-filter",
    name: "Pre Filter",
    slug: "pre-filter",
    badge: "SPR-XF",
    description:
      "Removes bulk water, dust, and particles before the dryer so downstream equipment stays clean and the dryer is not overloaded.",
    spec: "25 – 1500 CFM",
    tone: "default",
    family: "air-filters",
  },
  {
    id: "after-filter",
    name: "After Filter",
    slug: "after-filter",
    badge: "SPR-XF",
    description:
      "Removes oil and fine particles after generation and drying. The working grade for most plant-air lines.",
    spec: "1 micron",
    tone: "default",
    family: "air-filters",
  },
  {
    id: "carbon-filter",
    name: "Carbon Filter",
    slug: "carbon-filter",
    badge: "SPR-XF",
    description:
      "Activated carbon for oil vapour and odours on product-contact or breathing-quality lines.",
    spec: "Activated carbon",
    tone: "eco",
    family: "air-filters",
  },
  {
    id: "micro-filter",
    name: "Micro Filter",
    slug: "micro-filter",
    badge: "SPR-XF",
    description:
      "Removes 99.99% of particles down to 0.01 micron. Use where the process actually needs that class — not on every drop.",
    spec: "0.01 micron",
    tone: "default",
    family: "air-filters",
  },
  {
    id: "ppr-piping",
    name: "PPR Piping Solutions",
    slug: "ppr-piping",
    badge: "SPR-PPR",
    description:
      "Complete PPR compressed-air piping for compressor rooms and plant headers. Leak-proof joints and a corrosion-free bore so the pressure you generate is the pressure the tool sees.",
    spec: "Leak-proof · corrosion resistant",
    tone: "default",
    family: "ppr-piping",
  },
  {
    id: "compressor-spares",
    name: "Compressor Spares",
    slug: "compressor-spares",
    badge: "Genuine",
    description:
      "Oil filters, air filters, separators, belts, valves, O-rings, and gauges matched to SPR compressor packages.",
    spec: "OEM-matched parts",
    tone: "default",
    family: "spares",
  },
  {
    id: "dryer-spares",
    name: "Dryer Spares",
    slug: "dryer-spares",
    badge: "Genuine",
    description:
      "Elements, drain parts, and service kits for refrigerated and desiccant dryers so treatment stays on dew point.",
    spec: "SPR-AD · SPR-DD",
    tone: "default",
    family: "spares",
  },
];
