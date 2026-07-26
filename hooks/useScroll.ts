"use client";

import { useEffect, useState } from "react";

type UseScrollOptions = {
  /** Pixels past which `scrolled` becomes true. */
  threshold?: number;
};

/**
 * Tracks window scroll for sticky header / reveal behavior.
 */
export function useScroll({ threshold = 8 }: UseScrollOptions = {}) {
  const [y, setY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nextY = window.scrollY;
      setY(nextY);
      setScrolled(nextY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { x: 0, y, scrolled };
}
