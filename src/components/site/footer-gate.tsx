"use client";

import { usePathname } from "next/navigation";

/**
 * Hides the site footer on routes that are designed to fill the viewport
 * exactly (e.g. the contact page), so no scroll is introduced.
 */
const NO_FOOTER_ROUTES = ["/contact"];

export function FooterGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (NO_FOOTER_ROUTES.includes(pathname)) return null;
  return <>{children}</>;
}
