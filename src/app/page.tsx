import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { ServicesSection } from "@/components/home/services-section";
import { Approach } from "@/components/home/approach";
import { Outcomes } from "@/components/home/outcomes";
import { Testimonial } from "@/components/home/testimonial";
import { CtaBand } from "@/components/site/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesSection />
      <Approach titleType="type" />
      <Outcomes />
      <Testimonial />
      <CtaBand titleType="type" />
    </>
  );
}
