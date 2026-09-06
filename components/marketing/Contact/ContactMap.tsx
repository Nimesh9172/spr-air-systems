"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ExternalLinkIcon, MapPinIcon } from "lucide-react";

import { Container } from "@/components/core/Container";
import { Section } from "@/components/core/Section";
import { COMPANY } from "@/constants/company";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const ITEM_TRANSITION = { duration: 0.6, ease: EASE_OUT } as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: ITEM_TRANSITION },
};

const reducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: ITEM_TRANSITION },
};

const { lat, lng } = COMPANY.address.coordinates;
const MAPS_QUERY = `${lat},${lng}`;
const MAPS_LINK = `https://www.google.com/maps?q=${MAPS_QUERY}`;
const MAP_EMBED = `https://maps.google.com/maps?q=${MAPS_QUERY}&z=17&output=embed`;

/**
 * Contact page map — embedded location with floating address card.
 */
export function ContactMap() {
  const prefersReducedMotion = useReducedMotion();
  const item = prefersReducedMotion ? reducedItemVariants : itemVariants;

  return (
    <Section
      data-slot="contact-map"
      spacing="none"
      className="relative overflow-hidden bg-[oklch(0.96_0.01_250)]"
    >
      <div className="relative h-[22rem] w-full sm:h-[26rem] lg:h-[28rem]">
        <iframe
          title={`${COMPANY.name} office location`}
          src={MAP_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0 grayscale-[20%] contrast-[0.95]"
          allowFullScreen
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,oklch(0.97_0.01_250_/_55%)_0%,transparent_40%)]"
        />

        <Container className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-full items-center py-8">
          <motion.div
            variants={item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="pointer-events-auto max-w-sm rounded-2xl border border-border/60 bg-white p-5 shadow-[0_16px_40px_-18px_oklch(0.26_0.09_260_/_35%)] sm:p-6"
          >
            <div className="flex items-start gap-3.5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[oklch(0.94_0.03_250)] text-[oklch(0.5_0.16_255)]">
                <MapPinIcon className="size-5" aria-hidden strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground">
                  {COMPANY.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {COMPANY.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[oklch(0.52_0.16_255)] outline-none transition-colors hover:text-[oklch(0.42_0.14_255)] focus-visible:underline"
                >
                  View on Google Maps
                  <ExternalLinkIcon className="size-3.5" aria-hidden />
                </a>
              </div>
            </div>
          </motion.div>
        </Container>
      </div>
    </Section>
  );
}
