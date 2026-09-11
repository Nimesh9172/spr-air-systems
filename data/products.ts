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
      {
        name: "Reciprocating Air Compressors",
        slug: "reciprocating-air-compressor",
        image: "/images/reciprocating.png",
        imageAlt: "SPR reciprocating air compressor",
      },
      {
        name: "Direct Drive With PM Motor VFD",
        slug: "direct-drive-pm-motor-vfd",
        image: "/images/pm-vfd.png",
        imageAlt: "SPR direct drive PM motor VFD air compressor",
      },
      {
        name: "Base Mounted Screw Compressors",
        slug: "base-mounted-screw-compressor",
        image: "/images/base-screw-comp.png",
        imageAlt: "SPR base mounted screw air compressor",
      },
      {
        name: "Tank Mounted Full Feature",
        slug: "tank-mounted-full-feature",
        image: "/images/tank-mounted-comp.png",
        imageAlt: "SPR tank mounted full feature air compressor",
      },
      {
        name: "High Pressure 16 Bar",
        slug: "high-pressure-16-bar",
        image: "/images/16bar.png",
        imageAlt: "SPR high pressure 16 Bar air compressor",
      },
    ],
  },
  {
    id: "air-dryers",
    title: "Air Dryers",
    slug: "air-dryers",
    icon: "air-dryer",
    products: [
      {
        name: "Refrigerated Air Dryers",
        slug: "refrigerated-air-dryer",
        image: "/images/refrigerated-air-dryer.png",
        imageAlt: "SPR refrigerated air dryer",
      },
      {
        name: "Desiccant Air Dryers",
        slug: "desiccant-air-dryer",
        image: "/images/desiccant-air-dryer.png",
        imageAlt: "SPR desiccant air dryer",
      },
    ],
  },
  {
    id: "air-filters",
    title: "Compressed Air Filters",
    slug: "compressed-air-filters",
    icon: "air-filter",
    products: [
      {
        name: "Compressed Air Filters",
        slug: "compressed-air-filters",
        image: "/images/filters.png",
        imageAlt: "SPR-XF compressed air filters",
      },
    ],
  },
  {
    id: "ppr-piping",
    title: "PPR Piping",
    slug: "ppr-piping",
    icon: "ppr-piping",
    products: [
      {
        name: "PPR Piping Solutions",
        slug: "ppr-piping",
        image: "/images/ppr-pipping.png",
        imageAlt: "SPR-PPR compressed air piping",
      },
    ],
  },
  {
    id: "spares",
    title: "Compressor & Dryer Spares",
    slug: "spares",
    icon: "spares",
    products: [
      {
        name: "Compressor Spares",
        slug: "compressor-spares",
        image: "/images/comp-spares.png",
        imageAlt: "Genuine SPR compressor spare parts",
      },
      {
        name: "Dryer Spares",
        slug: "dryer-spares",
        image: "/images/dryer-spares.png",
        imageAlt: "Genuine SPR dryer spare parts",
      },
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
    image: "/images/reciprocating.png",
    imageAlt: "SPR reciprocating air compressor",
    features: [
      "Cast-iron construction",
      "Intermittent duty ready",
      "Workshop and plant use",
      "Long service life",
    ],
    specs: [
      { label: "Power", value: "Starting at 5 HP" },
      { label: "Duty", value: "Intermittent / start-stop" },
      { label: "Construction", value: "Cast iron" },
      { label: "Applications", value: "Workshops, garages, light plant air" },
    ],
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
    image: "/images/pm-vfd.png",
    imageAlt: "SPR direct drive PM motor VFD air compressor",
    features: [
      "Permanent-magnet motor",
      "VFD speed control",
      "Direct drive",
      "Cuts unload energy waste",
    ],
    specs: [
      { label: "Drive", value: "Direct drive" },
      { label: "Motor", value: "Permanent magnet (PM)" },
      { label: "Control", value: "VFD — matches speed to demand" },
      { label: "Benefit", value: "Lower unloaded running losses" },
    ],
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
    image: "/images/base-screw-comp.png",
    imageAlt: "SPR base mounted screw air compressor",
    features: [
      "High efficiency",
      "Low energy consumption",
      "Low noise",
      "Heavy-duty performance",
      "Long service life",
    ],
    specs: [
      { label: "Power range", value: "5 HP to 500 HP" },
      { label: "Capacity range", value: "20 CFM to 2500 CFM" },
      { label: "Working pressure", value: "7 / 8 / 10 / 13 / 16 Bar(g)" },
      { label: "Cooling", value: "Air cooled / Water cooled" },
      { label: "Drive", value: "Direct drive / Belt drive" },
    ],
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
    image: "/images/tank-mounted-comp.png",
    imageAlt: "SPR tank mounted full feature air compressor",
    features: [
      "Compressor + receiver on one skid",
      "Treatment options available",
      "Compact footprint",
      "Quick to install",
    ],
    specs: [
      { label: "Package", value: "Tank-mounted full feature" },
      { label: "Receiver", value: "Integrated air receiver" },
      { label: "Use case", value: "Shops without a compressor room" },
      { label: "Install", value: "Ready-to-run skid package" },
    ],
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
    image: "/images/16bar.png",
    imageAlt: "SPR high pressure 16 Bar air compressor",
    catalogImageFit: "contain",
    features: [
      "16 Bar(g) working pressure",
      "Process and testing duty",
      "PET and high-pressure lines",
      "Industrial construction",
    ],
    specs: [
      { label: "Working pressure", value: "16 Bar(g)" },
      { label: "Applications", value: "Testing, PET, process air" },
      { label: "Duty", value: "High-pressure industrial" },
    ],
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
    image: "/images/refrigerated-air-dryer.png",
    imageAlt: "SPR refrigerated air dryer",
    features: [
      "Stable dew point",
      "Energy efficient",
      "Compact design",
      "Easy maintenance",
    ],
    specs: [
      { label: "Capacity range", value: "20 CFM to 2000 CFM" },
      { label: "Dew point", value: "2°C to 10°C" },
      { label: "Max working pressure", value: "16 Bar(g)" },
      { label: "Refrigerant", value: "Environment friendly" },
      { label: "Voltage", value: "230V / 415V / 3 Phase" },
    ],
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
    image: "/images/desiccant-air-dryer.png",
    imageAlt: "SPR desiccant air dryer",
    catalogImageFit: "contain",
    features: [
      "Ultra-low dew point",
      "Consistent performance",
      "Robust construction",
      "Critical-process ready",
    ],
    specs: [
      { label: "Capacity range", value: "20 CFM to 1000 CFM" },
      { label: "Dew point", value: "−40°C to −70°C" },
      { label: "Max working pressure", value: "10 / 16 Bar(g)" },
      { label: "Regeneration", value: "Heatless / Heated" },
      { label: "Control", value: "Digital controller" },
    ],
  },
  {
    id: "compressed-air-filters",
    name: "Compressed Air Filters",
    slug: "compressed-air-filters",
    badge: "SPR-XF",
    description:
      "Staged SPR-XF filtration as one train — Pre, After, Carbon, and Micro grades — to take out bulk water, oil, vapour, and fine particles. Specify the grade to the process.",
    spec: "25 – 1500 CFM · Pre · After · Carbon · Micro",
    tone: "default",
    family: "air-filters",
    image: "/images/filters.png",
    imageAlt: "SPR-XF compressed air filters",
    catalogImageFit: "contain",
    features: [
      "Pre Filter — bulk water, dust, and particles",
      "After Filter — oil and fine particles (1 micron)",
      "Carbon Filter — oil vapour and odours",
      "Micro Filter — 0.01 micron · 99.99%",
    ],
    specs: [
      { label: "Capacity range", value: "25 CFM to 1500 CFM" },
      { label: "Grades", value: "Pre · After · Carbon · Micro" },
      { label: "Filtration", value: "1 µm, 0.01 µm, activated carbon" },
      { label: "Max working pressure", value: "16 Bar(g)" },
      { label: "Element life", value: "Up to 6000 hours" },
    ],
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
    image: "/images/ppr-pipping.png",
    imageAlt: "SPR-PPR compressed air piping",
    features: [
      "Leak-proof",
      "Corrosion resistant",
      "Lightweight",
      "Quick installation",
    ],
    specs: [
      { label: "System", value: "Complete PPR compressed-air piping" },
      { label: "Applications", value: "Compressor rooms, plants, automotive" },
      { label: "Install", value: "Lightweight, durable, fast to join" },
    ],
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
    image: "/images/comp-spares.png",
    imageAlt: "Genuine SPR compressor spare parts",
    features: [
      "OEM-matched parts",
      "Oil / air filters & separators",
      "Belts, valves, O-rings, gauges",
      "Keeps packages on service schedule",
    ],
    specs: [
      { label: "Fitment", value: "SPR compressor packages" },
      { label: "Parts", value: "Filters, separators, belts, valves, seals" },
      { label: "Grade", value: "Genuine / OEM-matched" },
    ],
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
    image: "/images/dryer-spares.png",
    imageAlt: "Genuine SPR dryer spare parts",
    features: [
      "Elements and service kits",
      "Drain parts",
      "SPR-AD and SPR-DD coverage",
      "Keeps dew point on target",
    ],
    specs: [
      { label: "Fitment", value: "SPR-AD refrigerated · SPR-DD desiccant" },
      { label: "Parts", value: "Elements, drains, service kits" },
      { label: "Grade", value: "Genuine / OEM-matched" },
    ],
  },
];

/** Lookup a catalog product by its URL slug. */
export function getCatalogProductBySlug(
  slug: string,
): CatalogProduct | undefined {
  return catalogProducts.find((product) => product.slug === slug);
}
