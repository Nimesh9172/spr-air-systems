import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";
import { SectionHeading } from "@/components/core/SectionHeading";

type SamplePageProps = {
  title: string;
  description: string;
  eyebrow?: string;
};

/**
 * Lightweight placeholder used while marketing pages are under construction.
 */
export function SamplePage({ title, description, eyebrow }: SamplePageProps) {
  return (
    <main className="flex-1 bg-background">
      <Section spacing="lg">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow={eyebrow ?? "SPR Air Systems"}
            title={title}
            description={description}
          />
        </Container>
      </Section>
    </main>
  );
}
