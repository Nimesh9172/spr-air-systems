/**
 * Solution-page contracts for catalogue categories, product lines, and specs.
 * Serializable so content can later come from a Django serializer.
 */

export type SolutionIconKey =
  | "compressor"
  | "treatment"
  | "piping"
  | "service"
  | "dryer"
  | "desiccant"
  | "filter"
  | "separator";

/** Optional deep link into the product catalog or contact flow. */
export type SolutionLink = {
  readonly href: string;
  readonly label: string;
};

export type SolutionCategory = {
  readonly id: string;
  readonly title: string;
  readonly icon: SolutionIconKey;
  readonly description: string;
  readonly link?: SolutionLink;
};

export type SolutionSpec = {
  readonly label: string;
  readonly value: string;
};

export type SolutionLine = {
  readonly id: string;
  readonly series: string;
  readonly name: string;
  readonly icon: SolutionIconKey;
  readonly description: string;
  readonly features: readonly string[];
  readonly specs: readonly SolutionSpec[];
  readonly link?: SolutionLink;
  /** Optional product photo shown on the Solutions line card. */
  readonly image?: string;
  readonly imageAlt?: string;
};

export type FilterGradeTone = "blue" | "green" | "red" | "silver";

export type FilterGrade = {
  readonly id: string;
  readonly name: string;
  readonly tone: FilterGradeTone;
  readonly role: string;
  readonly link?: SolutionLink;
};

export type SolutionServiceItem = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly link?: SolutionLink;
};
