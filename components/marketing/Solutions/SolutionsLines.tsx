"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";
import { SOLUTION_ICONS } from "@/components/marketing/Solutions/icons";
import { solutionLines } from "@/data/solutions";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.5, ease: EASE_OUT } as const;
const ACCENT = "oklch(0.52 0.16 255)";

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

/**
 * Catalogue product families with published technical ranges.
 */
export function SolutionsLines() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;

  return (
    <Section
      data-slot="solutions-lines"
      spacing="sm"
      className="bg-[oklch(0.975_0.008_250)]"
    >
      <Container>
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
            — Product Lines —
          </motion.p>
          <motion.h2
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
            variants={item}
          >
            Specified Ranges.{" "}
            <span className="text-[oklch(0.52_0.16_255)]">Not Guesswork.</span>
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
            The SPR series — reciprocating and screw compressors, refrigerated
            and desiccant dryers, filters, and condensate handling. Open a line
            to see the matching product and specs.
          </motion.p>
        </motion.div>

        <motion.ul
          className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
        >
          {solutionLines.map((line) => {
            const Icon = SOLUTION_ICONS[line.icon];
            const cardClassName =
              "group/card flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_8px_28px_-18px_oklch(0.26_0.09_260_/_20%)] outline-none transition-shadow duration-500 hover:shadow-[0_18px_40px_-16px_oklch(0.35_0.08_255_/_0.26)] focus-visible:shadow-[0_18px_40px_-16px_oklch(0.35_0.08_255_/_0.26)]";

            const body = (
              <>
                {line.image ? (
                  <div className="relative aspect-[16/10] overflow-hidden bg-[oklch(0.985_0.005_250)]">
                    <Image
                      src={line.image}
                      alt={line.imageAlt ?? line.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className={cn(
                        "object-contain object-center p-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        !prefersReducedMotion &&
                          "group-hover/card:scale-[1.03]",
                      )}
                    />
                    <span className="absolute top-3 right-3 rounded-md bg-[oklch(0.52_0.16_255)] px-2.5 py-1 text-[0.625rem] font-bold tracking-[0.1em] text-white uppercase">
                      {line.series}
                    </span>
                  </div>
                ) : null}

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  {line.image ? null : (
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[oklch(0.94_0.03_250)] text-[oklch(0.5_0.16_255)]">
                        <Icon
                          className="size-5"
                          aria-hidden
                          strokeWidth={1.75}
                        />
                      </span>
                      <span className="rounded-md bg-[oklch(0.52_0.16_255)] px-2.5 py-1 text-[0.625rem] font-bold tracking-[0.1em] text-white uppercase">
                        {line.series}
                      </span>
                    </div>
                  )}

                  <h3
                    className={cn(
                      "text-lg font-bold tracking-tight text-foreground",
                      line.image ? "mt-0" : "mt-5",
                    )}
                  >
                    {line.name}
                  </h3>
                  <div
                    className="mt-3 h-px w-8"
                    style={{ backgroundColor: ACCENT }}
                    aria-hidden
                  />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {line.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {line.features.map((feature) => (
                      <li
                        key={feature}
                        className="rounded-full bg-[oklch(0.96_0.02_250)] px-2.5 py-1 text-[0.7rem] font-medium text-[oklch(0.38_0.1_255)]"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <dl className="grid gap-px border-t border-border/60 bg-border/60 sm:grid-cols-2">
                  {line.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="bg-[oklch(0.985_0.006_250)] px-5 py-3.5"
                    >
                      <dt className="text-[0.65rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                        {spec.label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-foreground">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {line.link ? (
                  <div className="flex items-center justify-between gap-3 border-t border-border/70 px-5 py-3.5 sm:px-6">
                    <span className="text-[0.65rem] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                      {line.link.href.startsWith("/products/")
                        ? "Product specs"
                        : "Next step"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[oklch(0.5_0.16_255)]">
                      {line.link.label}
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
                ) : null}
              </>
            );

            return (
              <motion.li key={line.id} variants={item} className="h-full">
                {line.link ? (
                  <Link
                    href={line.link.href}
                    aria-label={`${line.link.label}: ${line.name}`}
                    className={cardClassName}
                  >
                    {body}
                  </Link>
                ) : (
                  <div className={cardClassName}>{body}</div>
                )}
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.div
          className="mt-10 flex justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.div variants={item}>
            <Link
              href="/products"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[oklch(0.5_0.16_255)] outline-none transition-opacity hover:opacity-80 focus-visible:underline"
            >
              Browse full product catalog
              <ArrowRightIcon
                className={cn(
                  "size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  !prefersReducedMotion && "group-hover:translate-x-0.5",
                )}
                aria-hidden
              />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
