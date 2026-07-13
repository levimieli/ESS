import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a WHS consultation with Eternal Safety Solutions. Servicing construction, civil, manufacturing and logistics operations across New South Wales.",
  alternates: { canonical: "/contact" },
};

const details = [
  { icon: Phone, label: site.phone, href: site.phoneHref },
  { icon: Mail, label: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: `${site.address.locality} & all of NSW` },
];

export default function ContactPage() {
  return (
    <section className="flex min-h-[100svh] flex-col justify-center bg-bg pb-10 pt-24">
      <div className="container-x grid items-center gap-x-16 gap-y-10 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left — brief writing */}
        <div>
          <p className="kicker mb-6">Contact</p>
          <h1 className="text-h2 font-display font-medium text-ink">
            Let&apos;s make it certain.
          </h1>
          <p className="measure mt-5 text-lead text-ink-soft">
            Tell us about your operation and we&apos;ll come back within one
            business day. No obligation — just a clear next step toward a safer,
            compliant business.
          </p>

          <ul className="mt-9 space-y-4">
            {details.map((d) => (
              <li key={d.label} className="flex items-center gap-3.5">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-surface-2 text-amber-deep">
                  <d.icon className="size-5" aria-hidden="true" />
                </span>
                {d.href ? (
                  <a
                    href={d.href}
                    className="link-underline font-medium text-ink"
                  >
                    {d.label}
                  </a>
                ) : (
                  <span className="font-medium text-ink">{d.label}</span>
                )}
              </li>
            ))}
          </ul>

          <p className="mt-9 text-sm text-ink">
            ABN {site.abn} · WHS Act 2011 (NSW) · ISO 45001 · SafeWork NSW
          </p>
        </div>

        {/* Right — form */}
        <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
