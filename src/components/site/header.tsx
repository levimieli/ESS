"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";
import { nav, services, site } from "@/lib/site";
import { cn } from "@/lib/utils";

// Routes that render on a light background with no dark hero behind the
// fixed header. On these, the header stays in its solid (ink) state.
const LIGHT_ROUTES = ["/contact"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || LIGHT_ROUTES.includes(pathname);
  const tone: "ink" | "onDark" = solid ? "ink" : "onDark";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500",
        solid
          ? "border-b border-line bg-bg/85 backdrop-blur-md shadow-[var(--shadow-sm)]"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-x flex h-[4.75rem] items-center justify-between gap-6">
        <Logo tone={tone} />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-9 md:flex"
        >
          {nav.map((item) => {
            const linkCls = cn(
              "text-sm font-medium transition-colors duration-300",
              solid ? "text-ink-soft hover:text-ink" : "text-onDark/85 hover:text-onDark",
            );

            if (item.href === "/services") {
              return (
                <div key={item.href} className="group relative">
                  <Link
                    href="/services"
                    aria-haspopup="true"
                    className={cn(linkCls, "inline-flex items-center gap-1")}
                  >
                    Services
                    <ChevronDown
                      className="size-3.5 transition-transform duration-300 group-hover:rotate-180"
                      aria-hidden="true"
                    />
                  </Link>

                  {/* Dropdown */}
                  <div className="invisible absolute left-0 top-full z-50 w-[27rem] pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="overflow-hidden rounded-xl border border-line bg-bg p-2 shadow-[var(--shadow-lg)]">
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-2"
                        >
                          <span className="mt-px w-6 shrink-0 font-display text-sm text-amber-deep">
                            {s.index}
                          </span>
                          <span className="flex flex-col">
                            <span className="text-sm font-medium text-ink">{s.title}</span>
                            <span className="text-xs leading-snug text-ink">{s.short}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link key={item.href} href={item.href} className={cn(linkCls, "link-underline")}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={cn(
              "group hidden items-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-medium transition-colors duration-300 sm:inline-flex",
              solid
                ? "bg-graphite text-onDark hover:bg-graphite-deep"
                : "bg-onDark text-graphite hover:bg-amber",
            )}
          >
            Book a consultation
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>

          {/* Mobile */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-md transition-colors md:hidden",
                solid ? "text-ink hover:bg-surface-2" : "text-onDark hover:bg-white/10",
              )}
            >
              <Menu className="size-6" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-[min(88vw,22rem)] border-line bg-bg p-0"
            >
              <SheetTitle className="sr-only">Site menu</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="border-b border-line px-6 py-5">
                  <Logo tone="ink" />
                </div>
                <nav
                  aria-label="Mobile"
                  className="flex flex-col overflow-y-auto px-3 py-4"
                >
                  {nav.map((item) => {
                    if (item.href === "/services") {
                      return (
                        <div key={item.href} className="flex flex-col">
                          <Link
                            href="/services"
                            onClick={() => setMenuOpen(false)}
                            className="rounded-md px-3 py-3.5 font-display text-lg text-ink transition-colors hover:bg-surface-2"
                          >
                            Services
                          </Link>
                          <div className="mb-1 ml-4 flex flex-col border-l border-line pl-3">
                            {services.map((s) => (
                              <Link
                                key={s.slug}
                                href={`/services/${s.slug}`}
                                onClick={() => setMenuOpen(false)}
                                className="rounded-md px-3 py-2.5 text-sm text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
                              >
                                {s.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="rounded-md px-3 py-3.5 font-display text-lg text-ink transition-colors hover:bg-surface-2"
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
                <div className="mt-auto space-y-3 border-t border-line px-6 py-6">
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-graphite px-4 py-3.5 font-medium text-onDark transition-colors hover:bg-graphite-deep"
                  >
                    Book a consultation
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={site.phoneHref}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 text-sm font-medium text-ink"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    {site.phone}
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
