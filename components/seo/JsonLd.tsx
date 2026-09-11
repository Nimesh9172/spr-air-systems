type JsonLdProps = {
  data: Record<string, unknown> | readonly Record<string, unknown>[];
};

/**
 * Server-rendered JSON-LD for search engines.
 * Place in Server Components only (layout or page).
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
