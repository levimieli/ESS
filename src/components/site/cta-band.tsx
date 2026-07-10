import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { Reveal, MaskHeading } from "@/components/site/reveal";
import { TypeHeading } from "@/components/site/type-heading";
import { img, unsplash, site } from "@/lib/site";

type CtaBandProps = {
  heading?: string;
  sub?: string;
  imageId?: string;
  imageAlt?: string;
  titleType?: "reveal" | "type";
};

export function CtaBand({
  heading = "Let's make your worksites certain.",
  sub = "Book a no-obligation consultation. We'll walk a site, understand your risk, and show you exactly where you stand.",
  imageId = img.craneFlag.id,
  imageAlt = img.craneFlag.alt,
  titleType = "reveal",
}: CtaBandProps) {
  const Heading = titleType === "type" ? TypeHeading : MaskHeading;
  return (
    <section className="relative overflow-hidden bg-graphite-deep text-onDark">
      <div aria-hidden="true" className="absolute inset-0 -z-0 opacity-30">
        <Image
          src={unsplash(imageId, 2000, 70)}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite-deep via-graphite-deep/85 to-graphite-deep/40" />
      </div>

      <div className="container-x relative py-24 sm:py-32">
        <div className="max-w-3xl">
          <p className="kicker kicker-on-dark mb-7">Book a consultation</p>
          <Heading
            as="h2"
            text={heading}
            className="text-h2 font-display font-medium text-onDark"
          />
          <Reveal>
            <p className="measure mt-6 text-lead text-onDark/80">{sub}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-md bg-amber px-6 py-4 font-medium text-graphite-deep transition-colors duration-300 hover:bg-amber-soft"
              >
                Book a consultation
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 font-medium text-onDark transition-colors hover:text-amber"
              >
                <Phone className="size-4" aria-hidden="true" />
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export type { CtaBandProps };
