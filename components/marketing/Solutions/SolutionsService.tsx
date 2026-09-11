"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRightIcon,
  ClipboardCheckIcon,
  HeadsetIcon,
  PackageIcon,
  WrenchIcon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";
import { solutionServices } from "@/data/solutions";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.55, ease: EASE_OUT } as const;
const ACCENT = "oklch(0.52 0.16 255)";

const SERVICE_ICONS: LucideIcon[] = [
  WrenchIcon,
  ClipboardCheckIcon,
  HeadsetIcon,
  PackageIcon,
];

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

/**
 * Spares and service support from the catalogue closing panel.
 */
export function SolutionsService() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;

  return (
    <Section
      data-slot="solutions-service"
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
            — Spares & Service —
          </motion.p>
          <motion.h2
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
            variants={item}
          >
            Clean Air Today.{" "}
            <span className="text-[oklch(0.52_0.16_255)]">
              Better Tomorrow.
            </span>
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
            Genuine spares for compressors and dryers, plus the service work
            that keeps a commissioned system on the numbers we promised.
          </motion.p>
        </motion.div>

        <motion.ul
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {solutionServices.map((service, index) => {
            const Icon = SERVICE_ICONS[index] ?? HeadsetIcon;
            const cardClassName =
              "group/card flex h-full flex-col rounded-2xl border border-border/60 bg-white p-6 outline-none transition-shadow duration-500 hover:shadow-[0_14px_32px_-18px_oklch(0.35_0.08_255_/_0.28)] focus-visible:shadow-[0_14px_32px_-18px_oklch(0.35_0.08_255_/_0.28)]";

            const body = (
              <>
                <span className="flex size-12 items-center justify-center rounded-full bg-[oklch(0.94_0.03_250)] text-[oklch(0.5_0.16_255)]">
                  <Icon className="size-5" aria-hidden strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-base font-bold tracking-tight text-foreground">
                  {service.title}
                </h3>
                <div
                  className="mt-3 h-px w-8"
                  style={{ backgroundColor: ACCENT }}
                  aria-hidden
                />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                {service.link ? (
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[oklch(0.5_0.16_255)]">
                    {service.link.label}
                    <ArrowRightIcon
                      className={cn(
                        "size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        !prefersReducedMotion &&
                          "group-hover/card:translate-x-0.5 group-focus-visible/card:translate-x-0.5",
                      )}
                      aria-hidden
                    />
                  </span>
                ) : null}
              </>
            );

            return (
              <motion.li key={service.id} variants={item} className="h-full">
                {service.link ? (
                  <Link
                    href={service.link.href}
                    aria-label={`${service.link.label}: ${service.title}`}
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
      </Container>
    </Section>
  );
}
