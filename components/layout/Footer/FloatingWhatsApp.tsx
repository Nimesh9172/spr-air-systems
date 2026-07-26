import { WhatsAppIcon } from "@/components/layout/Navbar/WhatsAppIcon";
import { whatsappLink } from "@/constants/social";
import { cn } from "@/lib/utils";

type FloatingWhatsAppProps = {
  className?: string;
};

/**
 * Fixed WhatsApp chat affordance — bottom-right across marketing pages.
 */
export function FloatingWhatsApp({ className }: FloatingWhatsAppProps) {
  if (!whatsappLink) return null;

  return (
    <a
      href={whatsappLink.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={whatsappLink.label ?? "Chat on WhatsApp"}
      className={cn(
        "fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-6px_rgba(37,211,102,0.55)] transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c1524] sm:right-6 sm:bottom-6",
        className,
      )}
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
