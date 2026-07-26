import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Composed heading block for section intros: optional eyebrow, title, and description.
 * Renders a real heading element (`as`) for correct document outline / a11y.
 */
const headingVariants = cva(
  "flex flex-col gap-3 [&>p]:text-muted-foreground [&>p]:text-body",
  {
    variants: {
      align: {
        left: "items-start text-left",
        center: "items-center text-center mx-auto max-w-2xl",
      },
    },
    defaultVariants: {
      align: "left",
    },
  },
);

const titleSize = {
  h1: "text-h1 leading-heading tracking-heading",
  h2: "text-h2 leading-heading tracking-heading",
  h3: "text-h3 leading-heading tracking-heading",
} as const;

type HeadingLevel = keyof typeof titleSize;

type SectionHeadingProps = Omit<React.ComponentProps<"div">, "title"> &
  VariantProps<typeof headingVariants> & {
    /** Small label above the title. */
    eyebrow?: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    /** Heading element to render for the title. Defaults to `h2`. */
    as?: HeadingLevel;
  };

function SectionHeading({
  className,
  align,
  eyebrow,
  title,
  description,
  as = "h2",
  ...props
}: SectionHeadingProps) {
  const Title = as;

  return (
    <div
      data-slot="section-heading"
      className={cn(headingVariants({ align, className }))}
      {...props}
    >
      {eyebrow ? (
        <span className="text-small font-medium tracking-wide text-primary uppercase">
          {eyebrow}
        </span>
      ) : null}
      <Title className={cn("font-semibold text-foreground", titleSize[as])}>
        {title}
      </Title>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export { SectionHeading, headingVariants };
export type { SectionHeadingProps };
