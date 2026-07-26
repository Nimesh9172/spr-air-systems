import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Full-width semantic `<section>` wrapper providing consistent vertical rhythm.
 * Pair with `Container` for horizontal constraints.
 */
const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      sm: "py-12 md:py-16",
      default: "py-16 md:py-22 lg:py-30",
      lg: "py-20 md:py-28 lg:py-36",
      none: "py-0",
    },
  },
  defaultVariants: {
    spacing: "default",
  },
});

type SectionProps = React.ComponentProps<"section"> &
  VariantProps<typeof sectionVariants>;

function Section({ className, spacing, ...props }: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn(sectionVariants({ spacing, className }))}
      {...props}
    />
  );
}

export { Section, sectionVariants };
export type { SectionProps };
