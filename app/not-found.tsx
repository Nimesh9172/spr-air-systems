import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * App-level 404 UI for unmatched routes and `notFound()` calls.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
        404
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Page not found
      </h1>
      <p className="max-w-md text-base text-muted-foreground">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
        Back to Home
      </Link>
    </main>
  );
}
