/**
 * Framework-agnostic primitives shared by configuration and static data.
 */

export type Nullable<T> = T | null;

export type ApiResponse<T> = {
  data: T;
  message?: string;
};

export type ContentSummary = {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description: string;
};

export type Testimonial = {
  readonly id: string;
  readonly quote: string;
  readonly author: string;
  readonly company: string;
};
