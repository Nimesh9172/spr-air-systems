"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRightIcon, CheckIcon, CylinderIcon, HeadsetIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";
import { catalogProducts, productFamilies } from "@/data/products";
import { cn } from "@/lib/utils";
import type { ProductFamily } from "@/types/product";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.5, ease: EASE_OUT } as const;
const ACCENT = "oklch(0.52 0.16 255)";

const ALL = "all" as const;
type FilterValue = typeof ALL | ProductFamily;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: ITEM_TRANSITION },
};

const reducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: ITEM_TRANSITION },
};

/** Blue for standard products, green for energy-saving / eco lines. */
const toneClass = {
  default: {
    badge: "bg-[oklch(0.52_0.16_255)] text-white",
    spec: "text-[oklch(0.5_0.16_255)]",
  },
  eco: {
    badge: "bg-ds-success text-ds-success-foreground",
    spec: "text-ds-success",
  },
} as const;

/**
 * Products catalog — application filter sidebar with a responsive product grid.
 * Content comes from `@/data/products`; swap for an API fetch later.
 */
export function ProductCatalog() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;
  const [filter, setFilter] = useState<FilterValue>(ALL);

  const visibleProducts = useMemo(
    () =>
      filter === ALL
        ? catalogProducts
        : catalogProducts.filter((p) => p.family === filter),
    [filter],
  );

  return (
    <Section
      data-slot="product-catalog"
      spacing="sm"
      className="bg-[oklch(0.975_0.008_250)]"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-8">
          {/* Sidebar */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border/60 bg-white p-5 shadow-[0_8px_28px_-18px_oklch(0.26_0.09_260_/_20%)]">
              <h2 className="text-xs font-bold tracking-[0.14em] text-foreground uppercase">
                Product Line
              </h2>
              <div
                className="mt-3 h-0.5 w-8 rounded-full"
                style={{ backgroundColor: ACCENT }}
                aria-hidden
              />

              <ul className="mt-5 flex flex-col gap-1">
                <FilterOption
                  label="All Products"
                  checked={filter === ALL}
                  onSelect={() => setFilter(ALL)}
                />
                {productFamilies.map((family) => (
                  <FilterOption
                    key={family.id}
                    label={family.label}
                    checked={filter === family.id}
                    onSelect={() => setFilter(family.id)}
                  />
                ))}
              </ul>
            </div>

            {/* Technical support card */}
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-[oklch(0.96_0.02_250)] p-5">
              <span className="flex size-11 items-center justify-center rounded-full bg-white text-[oklch(0.5_0.16_255)]">
                <HeadsetIcon className="size-5" aria-hidden strokeWidth={1.75} />
              </span>

              <p className="relative mt-4 text-sm font-bold text-foreground">
                Technical Support
              </p>
              <p className="relative mt-2 text-xs leading-relaxed text-muted-foreground">
                Need help selecting the right system for your facility?
              </p>

              <Link
                href="/contact"
                className="group/consult relative mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[oklch(0.5_0.16_255)] outline-none transition-opacity hover:opacity-80 focus-visible:underline"
              >
                Consult an Engineer
                <ArrowRightIcon
                  className={cn(
                    "size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    !prefersReducedMotion &&
                      "group-hover/consult:translate-x-0.5",
                  )}
                  aria-hidden
                />
              </Link>

              {/* Decorative waves */}
              <svg
                aria-hidden
                viewBox="0 0 240 90"
                className="pointer-events-none absolute inset-x-0 -bottom-1 w-full text-[oklch(0.82_0.05_250)] opacity-60"
                preserveAspectRatio="xMidYMax slice"
                fill="none"
              >
                <path
                  d="M-10 50c50-30 100 30 150 0s70-40 110-15M-10 70c50-30 100 30 150 0s70-40 110-15"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>

          {/* Product grid */}
          <motion.ul
            key={filter}
            className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {visibleProducts.map((product) => {
              const tone = toneClass[product.tone];

              return (
                <motion.li key={product.id} variants={item} className="h-full">
                  <motion.div
                    className="h-full"
                    whileHover={prefersReducedMotion ? undefined : { y: -5 }}
                    transition={{
                      type: "tween",
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href="/contact"
                      aria-label={`View specifications for ${product.name}`}
                      className="group/card flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-white shadow-[0_8px_28px_-18px_oklch(0.26_0.09_260_/_24%)] outline-none transition-shadow duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_18px_40px_-16px_oklch(0.35_0.08_255_/_0.26)] focus-visible:shadow-[0_18px_40px_-16px_oklch(0.35_0.08_255_/_0.26)]"
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-[oklch(0.985_0.005_250)]">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.imageAlt ?? product.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className={cn(
                              "object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                              !prefersReducedMotion &&
                                "group-hover/card:scale-[1.03]",
                            )}
                          />
                        ) : (
                          <span
                            aria-hidden
                            className={cn(
                              "absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_42%,oklch(0.94_0.03_250)_0%,oklch(0.985_0.005_250)_70%)] text-[oklch(0.72_0.08_250)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                              !prefersReducedMotion &&
                                "group-hover/card:scale-[1.03]",
                            )}
                          >
                            <CylinderIcon
                              className="size-14 opacity-70"
                              strokeWidth={1.25}
                            />
                          </span>
                        )}

                        <span
                          className={cn(
                            "absolute top-3 left-3 rounded-md px-2.5 py-1 text-[0.625rem] font-bold tracking-[0.08em] uppercase",
                            tone.badge,
                          )}
                        >
                          {product.badge}
                        </span>
                      </div>

                      {/* Body */}
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="text-base font-bold tracking-tight text-foreground">
                          {product.name}
                        </h3>
                        <div
                          className="mt-2.5 h-px w-8"
                          style={{ backgroundColor: ACCENT }}
                          aria-hidden
                        />
                        <p className="mt-3 flex-1 text-small leading-relaxed text-muted-foreground">
                          {product.description}
                        </p>

                        <div className="mt-5 flex items-end justify-between gap-3 border-t border-border/70 pt-4">
                          <span
                            className={cn(
                              "text-[0.625rem] font-bold tracking-[0.08em] uppercase",
                              tone.spec,
                            )}
                          >
                            {product.spec}
                          </span>

                          <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[oklch(0.5_0.16_255)]">
                            View Specifications
                            <ArrowRightIcon
                              className={cn(
                                "size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                                !prefersReducedMotion &&
                                  "group-hover/card:translate-x-0.5 group-focus-visible/card:translate-x-0.5",
                              )}
                              aria-hidden
                            />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </Container>
    </Section>
  );
}

function FilterOption({
  label,
  checked,
  onSelect,
}: {
  label: string;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={checked}
        className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-2 text-left outline-none transition-colors hover:bg-[oklch(0.96_0.02_250)] focus-visible:bg-[oklch(0.96_0.02_250)]"
      >
        <span
          aria-hidden
          className={cn(
            "flex size-4 shrink-0 items-center justify-center rounded-[0.25rem] border transition-colors",
            checked
              ? "border-[oklch(0.52_0.16_255)] bg-[oklch(0.52_0.16_255)] text-white"
              : "border-border bg-white",
          )}
        >
          {checked ? (
            <CheckIcon className="size-3" strokeWidth={3} />
          ) : null}
        </span>
        <span
          className={cn(
            "text-sm",
            checked
              ? "font-medium text-foreground"
              : "text-muted-foreground",
          )}
        >
          {label}
        </span>
      </button>
    </li>
  );
}
