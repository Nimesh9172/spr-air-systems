"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRightIcon,
  CogIcon,
  CylinderIcon,
  DropletsIcon,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";
import { productCategories } from "@/data/products";
import { cn } from "@/lib/utils";
import type { ProductCategoryIcon } from "@/types/product";

/** Resolve a serializable category icon key to its Lucide component. */
const CATEGORY_ICONS: Record<ProductCategoryIcon, LucideIcon> = {
  "air-compressor": CylinderIcon,
  "screw-compressor": CogIcon,
  pump: DropletsIcon,
};

/** Homepage links point at the catalog; deep links can use the slugs later. */
const CATEGORY_HREF = "/products";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.6, ease: EASE_OUT } as const;
const ACCENT = "oklch(0.52 0.16 255)";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: ITEM_TRANSITION },
};

const reducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: ITEM_TRANSITION },
};

/**
 * Homepage product categories — category rows with product cards.
 * Content is sourced from `@/data/products`; swap that for an API fetch later.
 * Not the full Products catalog page.
 */
export function ProductCategories() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;

  return (
    <Section
      data-slot="product-categories"
      spacing="sm"
      className="relative overflow-hidden bg-[oklch(0.97_0.01_250)]"
    >
      {/* Decorative flowing air-lines — subtle, behind the header only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] [mask-image:linear-gradient(to_bottom,black_45%,transparent)]"
      >
        <svg
          viewBox="0 0 1440 420"
          className="h-full w-full text-[oklch(0.8_0.05_250)] opacity-45"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path
            d="M-40 150C260 60 480 300 760 220s520-220 760-120"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M-40 220C280 130 500 350 780 270s520-200 720-96"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.7"
          />
          <path
            d="M-40 90C240 20 460 240 740 170s540-190 780-104"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>
      </div>

      <Container className="relative z-10">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.p
            className="text-small font-semibold tracking-[0.16em] text-[oklch(0.52_0.16_255)] uppercase"
            variants={item}
          >
            — Our Product Portfolio —
          </motion.p>
          <motion.h2
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
            variants={item}
          >
            Engineered for{" "}
            <span className="text-[oklch(0.52_0.16_255)]">Performance.</span>{" "}
            Built for{" "}
            <span className="text-[oklch(0.52_0.16_255)]">Industry.</span>
          </motion.h2>
          <motion.div
            className="mx-auto mt-5 h-px w-12"
            style={{ backgroundColor: ACCENT }}
            variants={item}
            aria-hidden
          />
          <motion.p
            className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
            variants={item}
          >
            Discover our range of heavy-duty industrial air solutions designed
            for 24/7 operations.
          </motion.p>
        </motion.div>

        <div className="mt-14 flex flex-col gap-12 lg:mt-16 lg:gap-14">
          {productCategories.map((category) => {
            const Icon = CATEGORY_ICONS[category.icon];

            return (
              <motion.section
                key={category.id}
                aria-labelledby={`portfolio-${category.id}`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <motion.div
                  className="mb-5 flex items-center justify-between gap-4"
                  variants={item}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center text-[oklch(0.5_0.16_255)]">
                      <Icon className="size-5" aria-hidden strokeWidth={1.75} />
                    </span>
                    <span
                      className="hidden h-5 w-px bg-border sm:block"
                      aria-hidden
                    />
                    <h3
                      id={`portfolio-${category.id}`}
                      className="truncate text-sm font-bold tracking-[0.12em] text-foreground uppercase sm:text-[0.9375rem]"
                    >
                      {category.title}
                    </h3>
                  </div>

                  <Link
                    href={CATEGORY_HREF}
                    className="group/view inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[oklch(0.5_0.16_255)] outline-none transition-opacity hover:opacity-80 focus-visible:opacity-80"
                  >
                    View All
                    <ArrowRightIcon
                      className={cn(
                        "size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        !prefersReducedMotion &&
                          "group-hover/view:translate-x-0.5 group-focus-visible/view:translate-x-0.5",
                      )}
                      aria-hidden
                    />
                  </Link>
                </motion.div>

                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                  {category.products.map((product) => (
                    <motion.li key={product.name} variants={item}>
                      <motion.div
                        whileHover={
                          prefersReducedMotion ? undefined : { y: -5 }
                        }
                        transition={{
                          type: "tween",
                          duration: 0.55,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <Link
                          href={CATEGORY_HREF}
                          aria-label={`View ${product.name}`}
                          className="group/card flex flex-col overflow-hidden rounded-xl border border-border/60 bg-white shadow-[0_8px_28px_-18px_oklch(0.26_0.09_260_/_24%)] outline-none transition-shadow duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_18px_40px_-16px_oklch(0.35_0.08_255_/_0.26)] focus-visible:shadow-[0_18px_40px_-16px_oklch(0.35_0.08_255_/_0.26)]"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden bg-[oklch(0.985_0.005_250)]">
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.imageAlt ?? product.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className={cn(
                                  "object-contain object-center p-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
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
                                <Icon
                                  className="size-14 opacity-70"
                                  strokeWidth={1.25}
                                />
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between gap-3 border-t border-border/70 px-4 py-3.5">
                            <span className="min-w-0 text-sm font-medium leading-snug text-foreground">
                              {product.name}
                            </span>
                            <span className="flex size-7 shrink-0 items-center justify-center text-[oklch(0.5_0.16_255)]">
                              <ArrowRightIcon
                                className={cn(
                                  "size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                                  !prefersReducedMotion &&
                                    "group-hover/card:translate-x-0.5 group-focus-visible/card:translate-x-0.5",
                                )}
                                aria-hidden
                              />
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
