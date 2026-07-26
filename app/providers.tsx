"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { themeConfig } from "@/config/theme";

type ProvidersProps = {
  children: React.ReactNode;
};

/**
 * Global client providers for the App Router.
 * Add analytics, auth, and feature flags here as the app grows.
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={themeConfig.defaultMode}
      enableSystem
      disableTransitionOnChange
    >
      <ScrollToTop />
      {children}
      <Toaster richColors closeButton position="top-right" />
    </ThemeProvider>
  );
}
