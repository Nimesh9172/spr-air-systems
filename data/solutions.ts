import type {
  FilterGrade,
  SolutionCategory,
  SolutionLine,
  SolutionServiceItem,
} from "@/types/solution";

const FILTERS_PRODUCT = {
  href: "/products/compressed-air-filters",
  label: "View product",
} as const;

/**
 * Cover categories from the SPR product catalogue.
 */
export const solutionCategories: readonly SolutionCategory[] = [
  {
    id: "air-compressors",
    title: "Air Compressors",
    icon: "compressor",
    description:
      "Reciprocating, PM-motor VFD, base-mounted screw, tank-mounted, and 16 Bar packages — 5 to 500 HP, sized to the plant.",
    link: { href: "/products?family=air-compressors", label: "Browse compressors" },
  },
  {
    id: "air-treatment",
    title: "Air Treatment Equipments",
    icon: "treatment",
    description:
      "Dryers, filters, moisture separators, and auto drains so the air that leaves the compressor is the air the process can use.",
    link: { href: "/products?family=air-dryers", label: "Browse dryers" },
  },
  {
    id: "piping",
    title: "PPR Piping",
    icon: "piping",
    description:
      "SPR-PPR leak-proof, corrosion-resistant piping for compressor rooms and plant headers — distribution is part of the system.",
    link: { href: "/products/ppr-piping", label: "View PPR piping" },
  },
  {
    id: "spares-service",
    title: "Spares & Service Support",
    icon: "service",
    description:
      "Installation, preventive maintenance, AMCs, and genuine spares so the system keeps the numbers we commissioned to.",
    link: { href: "/products?family=spares", label: "Browse spares" },
  },
];

export const solutionValues = [
  "Reliable Performance",
  "Energy Efficient",
  "Advanced Technology",
  "Expert Support",
] as const;

/**
 * Catalogue product families with published ranges.
 */
export const solutionLines: readonly SolutionLine[] = [
  {
    id: "screw-compressors",
    series: "SPR-SC",
    name: "Screw Air Compressors",
    icon: "compressor",
    description:
      "High-performance screw packages for continuous operation in demanding plants. Low noise, heavy-duty construction, and a service life built for 24/7 duty.",
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
    link: {
      href: "/products/base-mounted-screw-compressor",
      label: "View product",
    },
  },
  {
    id: "refrigerated-dryers",
    series: "SPR-AD",
    name: "Refrigerated Air Dryers",
    icon: "dryer",
    description:
      "Removes moisture from plant air with a stable dew point. The default treatment layer for general manufacturing, workshops, and most pneumatic lines.",
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
    link: {
      href: "/products/refrigerated-air-dryer",
      label: "View product",
    },
  },
  {
    id: "desiccant-dryers",
    series: "SPR-DD",
    name: "Desiccant Air Dryers",
    icon: "desiccant",
    description:
      "Ultra-low dew point for critical applications — pharmaceuticals, process air, and any line where condensate is a quality event, not a nuisance.",
    features: [
      "Ultra-low dew point",
      "Consistent performance",
      "Robust construction",
      "Critical-process ready",
    ],
    specs: [
      { label: "Capacity range", value: "20 CFM to 1000 CFM" },
      { label: "Dew point", value: "-40°C to -70°C" },
      { label: "Max working pressure", value: "10 / 16 Bar(g)" },
      { label: "Regeneration", value: "Heatless / Heated" },
      { label: "Control", value: "Digital controller" },
    ],
    link: {
      href: "/products/desiccant-air-dryer",
      label: "View product",
    },
  },
  {
    id: "air-filters",
    series: "SPR-XF",
    name: "Compressed Air Filters",
    icon: "filter",
    description:
      "Staged filtration to take out bulk water, oil, vapour, and fine particles. Specify the grade to the process — not every line needs 0.01 micron.",
    features: [
      "Pre, after, carbon, and micro grades",
      "1 micron to 0.01 micron",
      "Activated carbon for vapour and odour",
    ],
    specs: [
      { label: "Capacity range", value: "25 CFM to 1500 CFM" },
      { label: "Filtration grade", value: "1 µm, 0.01 µm, activated carbon" },
      { label: "Max working pressure", value: "16 Bar(g)" },
      { label: "Element life", value: "Up to 6000 hours" },
    ],
    link: FILTERS_PRODUCT,
  },
  {
    id: "moisture-drains",
    series: "SPR-MS / SPR-ADV",
    name: "Moisture Separators & Auto Drains",
    icon: "separator",
    description:
      "Knock water out before it reaches the dryer, then dump condensate without wasting compressed air. Small components that protect everything downstream.",
    features: [
      "99% separation efficiency",
      "Low pressure drop",
      "SS 316 cartridge",
      "Zero air-loss drain options",
    ],
    specs: [
      { label: "Separators", value: "SPR-MS — 99% efficiency, SS 316" },
      { label: "Auto drains", value: "SPR-ADV — electronic / level sensing" },
      { label: "Air loss", value: "Zero air-loss options" },
    ],
    link: { href: "/contact", label: "Enquire now" },
  },
];

/**
 * Dedicated SPR-PPR piping block — kept out of the product-lines grid
 * so the photo + distribution story get a full section.
 */
export const solutionPiping = {
  id: "ppr-piping",
  series: "SPR-PPR",
  name: "PPR Piping Solutions",
  description:
    "Complete PPR compressed-air piping for compressor rooms and plant distribution. Leak-proof joints and corrosion-free bore so the pressure you generate is the pressure the tool sees.",
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
  image: "/images/ppr-pipping.png",
  imageAlt: "SPR-PPR compressed air piping",
  link: { href: "/contact", label: "Enquire now" },
} as const;

/**
 * SPR-XF filter grades as published in the catalogue.
 * All grades are part of the single Compressed Air Filters product.
 */
export const filterGrades: readonly FilterGrade[] = [
  {
    id: "pre-filter",
    name: "Pre Filter",
    tone: "blue",
    role: "Removes bulk water, dust, and particles before the dryer.",
    link: FILTERS_PRODUCT,
  },
  {
    id: "after-filter",
    name: "After Filter",
    tone: "green",
    role: "Removes oil and fine particles after generation and drying.",
    link: FILTERS_PRODUCT,
  },
  {
    id: "carbon-filter",
    name: "Carbon Filter",
    tone: "red",
    role: "Removes oil vapour and odours on product-contact or breathing-quality lines.",
    link: FILTERS_PRODUCT,
  },
  {
    id: "micro-filter",
    name: "Micro Filter",
    tone: "silver",
    role: "Removes 99.99% of particles down to 0.01 micron.",
    link: FILTERS_PRODUCT,
  },
];

export const solutionServices: readonly SolutionServiceItem[] = [
  {
    id: "installation",
    title: "Installation & Commissioning",
    description:
      "Professional setup of compressor, treatment, piping, and electrics — then tested so the plant starts on spec.",
    link: { href: "/contact", label: "Talk to an engineer" },
  },
  {
    id: "preventive",
    title: "Preventive Maintenance",
    description:
      "Scheduled service that catches wear before it becomes a production stop.",
    link: { href: "/contact", label: "Talk to an engineer" },
  },
  {
    id: "amc",
    title: "Annual Maintenance Contracts",
    description:
      "AMC cover for compressors and dryers with genuine spares and documented visits.",
    link: { href: "/contact", label: "Request AMC quote" },
  },
  {
    id: "spares",
    title: "Quick Service & Spare Support",
    description:
      "Genuine elements, separators, and compressor spares so downtime is measured in hours, not weeks.",
    link: { href: "/products?family=spares", label: "Browse spares" },
  },
];

export const solutionReasons = [
  "High efficiency and energy saving",
  "Robust and reliable construction",
  "Advanced technology, specified to duty",
  "Easy installation and maintenance",
  "Quick service and genuine spare support",
] as const;
