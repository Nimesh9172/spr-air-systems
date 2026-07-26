import { CogIcon, HeadsetIcon, UsersIcon, WrenchIcon } from "lucide-react";

import { AnimatedCounter } from "@/components/core/AnimatedCounter";
import { Container } from "@/components/core/Container";
import { cn } from "@/lib/utils";

const STATS = [
  {
    icon: CogIcon,
    value: 1000,
    suffix: "+",
    label: "Machines Installed",
  },
  {
    icon: UsersIcon,
    value: 500,
    suffix: "+",
    label: "Global Clients",
  },
  {
    icon: WrenchIcon,
    value: 25,
    suffix: "+",
    label: "Years Experience",
  },
  {
    icon: HeadsetIcon,
    value: 150,
    suffix: "+",
    label: "Expert Engineers",
  },
] as const;

/**
 * About page stats bar — four counters on a deep blue background.
 */
export function AboutStats() {
  return (
    <section
      data-slot="about-stats"
      className="bg-[oklch(0.32_0.1_255)] py-12 md:py-14"
    >
      <Container>
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            const isLast = index === STATS.length - 1;

            return (
              <li
                key={stat.label}
                className={cn(
                  "flex flex-col items-center bg-[oklch(0.32_0.1_255)] px-6 py-9 text-center",
                  !isLast && "sm:border-r sm:border-r-white/10",
                  index < 2 &&
                    "max-sm:border-b max-sm:border-b-white/10",
                )}
              >
                <span className="mb-4 flex size-12 items-center justify-center rounded-full bg-white/10 text-white">
                  <Icon className="size-5" aria-hidden strokeWidth={1.75} />
                </span>

                <p className="text-3xl font-bold tracking-tight text-white sm:text-[2rem]">
                  <AnimatedCounter to={stat.value} />
                  {stat.suffix}
                </p>

                <div
                  className="mt-3 h-px w-8 bg-white/40"
                  aria-hidden
                />

                <p className="mt-3 text-[0.65rem] font-semibold tracking-[0.14em] text-white/70 uppercase sm:text-[0.7rem]">
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
