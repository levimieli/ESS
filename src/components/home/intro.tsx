import { Reveal } from "@/components/site/reveal";
import { TypeHeading } from "@/components/site/type-heading";
import { sectors } from "@/lib/site";

export function Intro() {
  return (
    <section className="section bg-bg">
      <div className="container-x">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="kicker mb-6">Why Eternal Safety</p>
            <TypeHeading
              as="h2"
              text="Compliance is the floor. We build for the people standing on it."
              className="text-h2 max-w-[18ch] font-display font-medium text-ink"
            />
          </div>
          <div className="flex flex-col justify-end gap-6">
            <Reveal>
              <p className="measure text-lead text-ink-soft">
                Anyone can hand you a binder of policies. We do the harder,
                quieter work — walking your sites, understanding your
                operations, and designing safety systems your teams will
                genuinely use.
              </p>
            </Reveal>
            <Reveal transition={{ delay: 0.08 }}>
              <p className="measure text-ink">
                The result is a business that meets its duties under the WHS Act
                2011, stands up to any SafeWork NSW inspection, and — most
                importantly — sends every worker home the way they arrived.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Sectors */}
        <Reveal className="mt-16 border-t border-line pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-ink">
              Trusted across
            </p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {sectors.map((sector) => (
                <li
                  key={sector}
                  className="text-sm font-medium text-ink-soft"
                >
                  {sector}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
