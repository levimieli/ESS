import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, MaskHeading } from "@/components/site/reveal";
import { faqs } from "@/lib/site";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export function Faq() {
  return (
    <section className="section bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container-x">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="kicker mb-6">Questions</p>
            <MaskHeading
              as="h2"
              text="What clients ask first."
              className="text-h2 max-w-[12ch] font-display font-medium text-ink"
            />
          </div>

          <Reveal>
            <Accordion className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`item-${i}`}
                  className="border-line"
                >
                  <AccordionTrigger className="py-6 text-left font-display text-lg font-medium text-ink hover:no-underline data-[state=open]:text-ink">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="measure pb-6 text-base text-ink-soft">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
