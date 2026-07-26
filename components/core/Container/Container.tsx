import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Horizontally-centered, max-width content container.
 * Widths map to the design-token container scale (1280px / 1440px).
 */
const containerVariants = cva("mx-auto w-full px-5 sm:px-6 lg:px-8", {
  variants: {
    size: {
      lg: "max-w-[var(--token-container-lg)]",
      xl: "max-w-[var(--token-container-xl)]",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

type ContainerProps = React.ComponentProps<"div"> &
  VariantProps<typeof containerVariants>;

function Container({ className, size, ...props }: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn(containerVariants({ size, className }))}
      {...props}
    />
  );
}

export { Container, containerVariants };
export type { ContainerProps };
