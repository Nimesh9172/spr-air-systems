"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type AnimatedCounterProps = {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  /** How much of the element must be visible before the count starts. */
  amount?: number | "some" | "all";
};

/**
 * Counts from `from` to `to` when the element first enters the viewport.
 * Ideal for landing-page stats that sit below the fold.
 */
export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  className,
  amount = 0.4,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = Math.floor(value).toLocaleString();
        }
      },
    });

    return () => controls.stop();
  }, [from, to, duration, isInView]);

  return (
    <span ref={ref} className={cn(className)}>
      {from.toLocaleString()}
    </span>
  );
}
