"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Forces the window to the top on App Router navigations.
 * Global `scroll-behavior: smooth` can leave pages mid-scroll under a sticky header.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
