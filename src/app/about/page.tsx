import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, RevealGroup, RevealItem, MaskHeading } from "@/components/site/reveal";
import { Outcomes } from "@/components/home/outcomes";
import { CtaBand } from "@/components/site/cta-band";
import { img, unsplash, values, sectors } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Eternal Safety Solutions is a NSW work health & safety consultancy built by practitioners who have walked the site. Evidence-led, plainly written, built to last.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Us"
        title="Built by people who've walked the site."
        intro="Eternal Safety Solutions exists because too many safety systems are written to pass an audit, not to protect a person. We do it the other way around."
        imageId={img.workerBokeh.id}
        imageAlt={img.workerBokeh.alt}
      />

      {/* Story */}
      <section className="section bg-bg">
        <div className="container-x grid gap-x-16 gap-y-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="kicker mb-6">Our story</p>
            <MaskHeading
              as="h2"
              text="Certainty, earned on site."
              className="text-h2 max-w-[14ch] font-display font-medium text-ink"
            />
            <Reveal className="measure mt-7 space-y-5 text-ink-soft">
              <p>
                We started Eternal Safety Solutions after years inside NSW
                construction, civil and manufacturing operations — long enough to
                see the gap between the safety folder on the shelf and the reality
                on the ground.
              </p>
              <p>
                That gap is where incidents happen and where businesses get
                caught short in an audit. We close it: walking sites, listening to
                supervisors, and building systems that hold up to both a SafeWork
                NSW inspector and a busy Monday morning.
              </p>
              <p className="text-ink">
                Today we work with operators of every size across New South Wales,
                from single-site trades to multi-site contractors preparing for
                ISO 45001 certification.
              </p>
            </Reveal>
          </div>

          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-2">
            <Image
              src={unsplash(img.sunsetDeck.id, 1000, 78)}
              alt={img.sunsetDeck.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-surface">
        <div className="container-x">
          <div className="mb-14 max-w-2xl">
            <p className="kicker mb-6">What we stand for</p>
            <MaskHeading
              as="h2"
              text="Four principles behind every engagement."
              className="text-h2 font-display font-medium text-ink"
            />
          </div>

          <RevealGroup className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {values.map((value, i) => (
              <RevealItem
                key={value.title}
                className="flex flex-col gap-3 bg-bg p-8"
              >
                <span className="font-display text-2xl text-amber-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-h3 font-display font-medium text-ink">
                  {value.title}
                </h3>
                <p className="text-ink-soft">{value.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Sectors */}
          <Reveal className="mt-14 border-t border-line pt-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-baseline sm:justify-between">
              <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-ink">
                Sectors we serve
              </p>
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {sectors.map((sector) => (
                  <li key={sector} className="text-sm font-medium text-ink-soft">
                    {sector}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <Outcomes />
      <CtaBand
        heading="Work with a team that gets it."
        sub="If you want safety that protects people first and passes audits as a matter of course, let's talk."
        imageId={img.craneFlag.id}
        imageAlt={img.craneFlag.alt}
      />
    </>
  );
}
