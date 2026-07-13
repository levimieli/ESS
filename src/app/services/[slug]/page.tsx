import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Approach } from "@/components/home/approach";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal, MaskHeading } from "@/components/site/reveal";
import { services, getService, img } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.title, description: service.short },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        kicker={`Service · ${service.index}`}
        title={service.title}
        intro={service.short}
        imageId={service.image.id}
        imageAlt={service.image.alt}
      />

      {/* Overview + Why it matters */}
      <section className="section bg-bg">
        <div className="container-x grid gap-x-16 gap-y-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="kicker mb-6">Overview</p>
            <MaskHeading
              as="h2"
              text="What it is."
              className="text-h2 font-display font-medium text-ink"
            />
          </div>
          <div className="flex flex-col justify-end gap-8">
            <Reveal>
              <p className="measure text-lead text-ink-soft">{service.summary}</p>
            </Reveal>
            <Reveal className="rounded-lg border border-line bg-surface p-7">
              <h3 className="text-h3 font-display font-medium text-ink">
                Why it matters
              </h3>
              <p className="measure mt-4 text-ink-soft">{service.why}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="section-sm bg-surface">
        <div className="container-x">
          <div className="mb-12 max-w-2xl">
            <p className="kicker mb-6">What&apos;s included</p>
            <MaskHeading
              as="h2"
              text="Exactly what you get."
              className="text-h2 font-display font-medium text-ink"
            />
          </div>
          <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {service.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex items-start gap-4 bg-bg p-7"
              >
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-soft text-amber-deep">
                  <Check className="size-4" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <span className="text-ink-soft">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Approach />

      {/* Other services */}
      <section className="section bg-bg">
        <div className="container-x">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="kicker mb-6">Keep exploring</p>
              <MaskHeading
                as="h2"
                text="Other services."
                className="text-h2 font-display font-medium text-ink"
              />
            </div>
            <Reveal>
              <Link
                href="/services"
                className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-ink"
              >
                View all services
                <ArrowRight className="size-4 text-amber-deep" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col gap-3 bg-bg p-7 transition-colors hover:bg-surface"
              >
                <span className="font-display text-2xl text-amber-deep">
                  {s.index}
                </span>
                <span className="flex items-center gap-1.5 text-h3 font-display font-medium text-ink">
                  {s.title}
                  <ArrowUpRight className="size-4 text-ink transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-deep" aria-hidden="true" />
                </span>
                <span className="text-sm text-ink">{s.short}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading={`Let's talk ${service.title}.`}
        sub="Book a no-obligation consultation and we'll scope exactly what your business needs."
        imageId={img.siteWide.id}
        imageAlt={img.siteWide.alt}
      />
    </>
  );
}
