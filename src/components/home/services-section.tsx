import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { TypeHeading } from "@/components/site/type-heading";
import { services, unsplash, type Service } from "@/lib/site";
import { cn } from "@/lib/utils";

function ServiceRow({ service, flip }: { service: Service; flip: boolean }) {
  return (
    <article
      id={service.slug}
      className="scroll-mt-28 grid items-center gap-x-14 gap-y-8 lg:grid-cols-2"
    >
      {/* Image */}
      <Reveal
        className={cn("group relative", flip && "lg:order-2")}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface-2">
          <Image
            src={unsplash(service.image.id, 1200, 78)}
            alt={service.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          <span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-graphite-deep/80 px-3 py-1 font-display text-sm text-onDark backdrop-blur-sm">
            {service.index}
          </span>
        </div>
      </Reveal>

      {/* Copy */}
      <div className={cn(flip && "lg:order-1")}>
        <Reveal>
          <TypeHeading
            as="h3"
            text={service.title}
            className="text-h3 font-display font-medium text-ink"
          />
          <p className="measure mt-4 text-ink-soft">{service.summary}</p>

          <ul className="mt-7 space-y-3">
            {service.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-3 text-sm text-ink-soft">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-soft text-amber-deep">
                  <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                </span>
                {outcome}
              </li>
            ))}
          </ul>

          <Link
            href={`/services/${service.slug}`}
            className="link-underline mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
          >
            Explore this service
            <ArrowUpRight className="size-4 text-amber-deep" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </article>
  );
}

export function ServicesSection({
  heading = true,
}: {
  heading?: boolean;
}) {
  return (
    <section id="services" className="section bg-surface scroll-mt-20">
      <div className="container-x">
        {heading && (
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="kicker mb-6">What we do</p>
              <TypeHeading
                as="h2"
                text="Everything you need, under one standard."
                className="text-h2 max-w-[16ch] font-display font-medium text-ink"
              />
            </div>
            <Reveal>
              <p className="measure-sm text-muted md:text-right">
                Engaged individually or as a single, staged program — scoped to
                your operation, your sites and your risk.
              </p>
            </Reveal>
          </div>
        )}

        <div className="space-y-20 lg:space-y-28">
          {services.map((service, i) => (
            <ServiceRow key={service.slug} service={service} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
