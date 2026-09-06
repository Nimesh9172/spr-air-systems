/**
 * Contracts for company identity, contact details, and site configuration.
 */
export type CompanyAddress = {
  readonly street: string;
  readonly city: string;
  readonly region: string;
  readonly postalCode: string;
  readonly country: string;
  readonly lines: readonly string[];
  readonly coordinates: {
    readonly lat: number;
    readonly lng: number;
  };
};

export type CompanyInfo = {
  readonly name: string;
  readonly legalName: string;
  readonly email: string;
  readonly emails: readonly string[];
  readonly phone: string;
  readonly address: CompanyAddress;
};

export type SiteConfig = {
  readonly name: string;
  readonly url: string;
  readonly description: string;
  readonly company: CompanyInfo;
};

export type SocialLink = {
  readonly platform: string;
  readonly href: string;
  readonly label?: string;
};
