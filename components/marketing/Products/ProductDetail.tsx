"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowLeftIcon,
  CheckIcon,
  CylinderIcon,
  FileTextIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";
import { RequestQuoteDialog } from "@/components/forms/RequestQuote";
import { buttonVariants } from "@/components/ui/button";
import { productFamilies } from "@/data/products";
import { cn } from "@/lib/utils";
import type { CatalogProduct } from "@/types/product";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.55, ease: EASE_OUT } as const;
const ACCENT = "oklch(0.52 0.16 255)";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
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

const toneClass = {
  default: "bg-[oklch(0.52_0.16_255)] text-white",
  eco: "bg-ds-success text-ds-success-foreground",
} as const;

type ProductDetailProps = {
  product: CatalogProduct;
};

/**
 * Product detail — large image, description, feature list, and specs table.
 */
export function ProductDetail({ product }: ProductDetailProps) {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;
  const [quoteOpen, setQuoteOpen] = useState(false);

  const familyLabel =
    productFamilies.find((family) => family.id === product.family)?.label ??
    "Products";

  return (
    <Section
      data-slot="product-detail"
      spacing="sm"
      className="bg-[oklch(0.975_0.008_250)]"
    >
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item}>
            <Link
              href="/products"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
            >
              <ArrowLeftIcon
                className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
                aria-hidden
              />
              Back to products
            </Link>
          </motion.div>

          <div className="mt-6 grid gap-8 lg:mt-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:items-start">
            <motion.div
              variants={item}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_8px_28px_-18px_oklch(0.26_0.09_260_/_20%)]"
            >
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.imageAlt ?? product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain object-center p-6 sm:p-8"
                />
              ) : (
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_42%,oklch(0.94_0.03_250)_0%,oklch(0.985_0.005_250)_70%)] text-[oklch(0.72_0.08_250)]"
                >
                  <CylinderIcon className="size-20 opacity-70" strokeWidth={1.25} />
                </span>
              )}

              <span
                className={cn(
                  "absolute top-4 left-4 rounded-md px-2.5 py-1 text-[0.625rem] font-bold tracking-[0.08em] uppercase",
                  toneClass[product.tone],
                )}
              >
                {product.badge}
              </span>
            </motion.div>

            <motion.div variants={item} className="flex flex-col">
              <p className="text-small font-semibold tracking-[0.14em] text-[oklch(0.52_0.16_255)] uppercase">
                {familyLabel}
              </p>

              <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
                {product.name}
              </h1>

              <div
                className="mt-4 h-px w-10"
                style={{ backgroundColor: ACCENT }}
                aria-hidden
              />

              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              <p className="mt-4 text-sm font-semibold text-[oklch(0.5_0.16_255)]">
                {product.spec}
              </p>

              {product.features && product.features.length > 0 ? (
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[oklch(0.94_0.03_250)] text-[oklch(0.5_0.16_255)]">
                        <CheckIcon className="size-2.5" strokeWidth={3} aria-hidden />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuoteOpen(true)}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 cursor-pointer rounded-md bg-[oklch(0.52_0.16_255)] px-5 text-sm font-semibold text-white hover:bg-[oklch(0.46_0.16_255)]",
                  )}
                >
                  <FileTextIcon className="size-4" aria-hidden />
                  Request Quote
                </button>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-11 rounded-md border-[oklch(0.52_0.16_255)] bg-white px-5 text-sm font-semibold text-[oklch(0.52_0.16_255)] hover:bg-[oklch(0.96_0.02_250)] hover:text-[oklch(0.46_0.16_255)]",
                  )}
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>

          {product.specs && product.specs.length > 0 ? (
            <motion.div
              variants={item}
              className="mt-10 overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_8px_28px_-18px_oklch(0.26_0.09_260_/_20%)] lg:mt-12"
            >
              <div className="border-b border-border/70 px-5 py-4 sm:px-6">
                <h2 className="text-base font-bold tracking-tight text-foreground">
                  Specifications
                </h2>
              </div>
              <dl className="divide-y divide-border/60">
                {product.specs.map((row) => (
                  <div
                    key={row.label}
                    className="grid gap-1 px-5 py-3.5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6 sm:px-6"
                  >
                    <dt className="text-sm font-medium text-muted-foreground">
                      {row.label}
                    </dt>
                    <dd className="text-sm font-semibold text-foreground">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          ) : null}
        </motion.div>
      </Container>

      <RequestQuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </Section>
  );
}
