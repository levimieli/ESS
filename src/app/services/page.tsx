import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { ServicesSection } from "@/components/home/services-section";
import { Approach } from "@/components/home/approach";
import { Faq } from "@/components/site/faq";
import { CtaBand } from "@/components/site/cta-band";
import { img } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "WHS auditing & compliance, site inspections, WHS management systems and ISO 45001 readiness — delivered across New South Wales by Eternal Safety Solutions.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Our Services"
        title="Safety, engineered end to end."
        intro="Every discipline that together takes your business from uncertain to certified. Engage one, or run them as a single staged program scoped to your sites and risk."
        imageId={img.scaffoldWorker.id}
        imageAlt={img.scaffoldWorker.alt}
      />
      <ServicesSection heading={false} />
      <Approach />
      <Faq />
      <CtaBand
        heading="Not sure where to start?"
        sub="Tell us about your operation and we'll recommend the right first engagement — usually a scoping call and a single site walk."
        imageId={img.siteWide.id}
        imageAlt={img.siteWide.alt}
      />
    </>
  );
}
