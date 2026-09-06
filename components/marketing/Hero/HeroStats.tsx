import {
  AwardIcon,
  FactoryIcon,
  HeadsetIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";

import { AnimatedCounter } from "@/components/core/AnimatedCounter";
import { Container } from "@/components/core/Container";
import { COMPANY_STATS } from "@/constants/company";
import { cn } from "@/lib/utils";

const ACCENT = "oklch(0.52 0.16 255)";

const STATS: {
  icon: LucideIcon;
  label: string;
  value?: number;
  suffix?: string;
  display?: string;
}[] = [
  {
    icon: FactoryIcon,
    value: COMPANY_STATS.systemsInstalled,
    suffix: "+",
    label: "Systems Installed",
  },
  {
    icon: UsersIcon,
    value: COMPANY_STATS.happyClients,
    suffix: "+",
    label: "Happy Clients",
  },
  {
    icon: AwardIcon,
    value: COMPANY_STATS.yearsExperience,
    suffix: "+",
    label: "Years of Experience",
  },
  {
    icon: HeadsetIcon,
    display: "24/7",
    label: "Support Available",
  },
];

/**
 * Trust metrics card shown directly under the homepage hero.
 */
export function HeroStats() {
  return (
    <section
      data-slot="hero-stats"
      className="bg-[oklch(0.97_0.01_250)] py-10 sm:py-12 md:py-14"
    >
      <Container>
        <ul className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_16px_48px_-24px_oklch(0.26_0.09_260_/_28%)] sm:grid-cols-4">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            const isLast = index === STATS.length - 1;

            return (
              <li
                key={stat.label}
                className={cn(
                  "relative flex flex-col items-center px-4 py-8 text-center sm:px-5 sm:py-9 md:px-6 md:py-10",
                  !isLast &&
                    "after:absolute after:bg-border/70 max-sm:odd:after:inset-y-6 max-sm:odd:after:right-0 max-sm:odd:after:w-px sm:after:inset-y-8 sm:after:right-0 sm:after:w-px",
                  // Bottom divider between rows on mobile (items 0,1)
                  index < 2 &&
                    "max-sm:before:absolute max-sm:before:inset-x-6 max-sm:before:bottom-0 max-sm:before:h-px max-sm:before:bg-border/70",
                )}
              >
                <span className="mb-4 flex size-12 items-center justify-center rounded-full bg-[oklch(0.94_0.03_250)] text-[oklch(0.5_0.16_255)] md:mb-5 md:size-14">
                  <Icon
                    className="size-5 md:size-6"
                    aria-hidden
                    strokeWidth={1.75}
                  />
                </span>

                <p className="text-3xl font-bold tracking-tight text-[oklch(0.28_0.06_255)] sm:text-[2rem] md:text-[2.25rem]">
                  {stat.display ? (
                    stat.display
                  ) : (
                    <>
                      <AnimatedCounter to={stat.value!} />
                      {stat.suffix}
                    </>
                  )}
                </p>

                <span
                  className="mt-3 h-px w-8"
                  style={{ backgroundColor: ACCENT }}
                  aria-hidden
                />

                <p className="mt-3 text-[0.65rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase sm:text-[0.7rem]">
                  {stat.label}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
