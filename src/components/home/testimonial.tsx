import Image from "next/image";
import { Reveal } from "@/components/site/reveal";
import { testimonial, img, unsplash } from "@/lib/site";

export function Testimonial() {
  return (
    <section className="section bg-surface">
      <div className="container-x">
        <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="relative order-2 aspect-[4/5] overflow-hidden rounded-lg bg-surface-2 lg:order-1">
            <Image
              src={unsplash(img.sunsetDeck.id, 1000, 78)}
              alt={img.sunsetDeck.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal className="order-1 lg:order-2">
            <svg
              viewBox="0 0 40 32"
              aria-hidden="true"
              className="mb-6 h-8 w-10 fill-amber"
            >
              <path d="M0 32V18C0 8 5 1.5 15 0l2 5C11 6.5 8 10 8 14h7v18H0Zm23 0V18C23 8 28 1.5 38 0l2 5c-6 1.5-9 5-9 9h7v18H23Z" />
            </svg>
            <blockquote className="font-display text-[clamp(1.5rem,1rem+2vw,2.4rem)] font-medium leading-[1.2] tracking-tight text-ink">
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="h-10 w-px bg-amber" />
              <span>
                <span className="block font-medium text-ink">
                  {testimonial.name}
                </span>
                <span className="block text-sm text-ink">
                  {testimonial.org}
                </span>
              </span>
            </figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
