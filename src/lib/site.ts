/* ------------------------------------------------------------------ *
 * Eternal Safety Solutions — site content & data
 * Single source of truth for copy, nav, services, imagery.
 * ------------------------------------------------------------------ */

export const site = {
  name: "Eternal Safety Solutions",
  shortName: "ESS",
  tagline: "Work health & safety, made certain.",
  description:
    "Eternal Safety Solutions is a NSW work health & safety consultancy. We audit, inspect, and build WHS management systems that keep your people safe and your business compliant — from first site walk to ISO 45001 certification.",
  region: "New South Wales, Australia",
  email: "levi@eternalsafetysolutions.com.au",
  phone: "0478 669 655",
  phoneHref: "tel:0478669655",
  abn: "59 385 498 929",
  address: {
    locality: "Sydney",
    region: "NSW",
    country: "Australia",
  },
  url: "https://eternalsafetysolutions.com.au",
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Approach", href: "/#approach" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/* ------------------------------------------------------------------ *
 * Imagery — every ID verified to resolve (HTTP 200) on the Unsplash CDN.
 * ------------------------------------------------------------------ */

export function unsplash(id: string, w = 1600, q = 80) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const img = {
  heroSite: {
    id: "1584844654932-1b5c8b11fef1",
    alt: "A large NSW civil worksite at first light, haze rising over earthworks and idle machinery.",
  },
  siteWide: {
    id: "1577335029365-35029f68d093",
    alt: "Wide view of an active infrastructure site with cranes and graded roadways.",
  },
  hazardSign: {
    id: "1566417108845-5ba9c2f9ea1b",
    alt: "A hazardous-voltage danger sign fixed to an industrial switchboard panel.",
  },
  inspection: {
    id: "1488257907837-523fe2051fc3",
    alt: "A safety officer in a high-visibility vest inspecting scaffolding on a build.",
  },
  steelFrame: {
    id: "1611906566714-3ebd58190500",
    alt: "The steel frame of a building under construction against a warm sky.",
  },
  scaffoldWorker: {
    id: "1623002891503-fd1274ea9800",
    alt: "A worker in orange high-vis carrying out track work beneath tall scaffolding.",
  },
  workerBokeh: {
    id: "1614213951697-a45781262acf",
    alt: "A worker in a hard hat walks a worksite at dusk, warm site lights blurred behind.",
  },
  sunsetDeck: {
    id: "1513692398020-cbaea622c427",
    alt: "A worker fixing reinforcement on an elevated deck as the sun sets over the city.",
  },
  craneFlag: {
    id: "1517880450833-38a21ade4be5",
    alt: "A red and white tower crane flying the Australian flag against a clear sky.",
  },
  hardHatsFloor: {
    id: "1509453721491-c3af5961df76",
    alt: "Hard hats lined up on a dark, worn workshop floor.",
  },
} as const;

/* ------------------------------------------------------------------ *
 * Services
 * ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  index: string;
  title: string;
  short: string;
  summary: string;
  why: string;
  outcomes: string[];
  image: { id: string; alt: string };
};

export const services: Service[] = [
  {
    slug: "whs-management-systems",
    index: "01",
    title: "WHS Management Systems",
    short: "Documented safety systems your team will actually use.",
    summary:
      "A WHS management system is the backbone of a compliant business — the policies, procedures and responsibilities that turn safety from a reaction into a routine. We design yours around how your business really operates, so it stands up to an audit and works on a busy Monday morning.",
    why: "Under the WHS Act 2011, every business (as a PCBU) must manage risk so far as is reasonably practicable. Without a documented system you can't demonstrate you've met that duty — and you're exposed the moment something goes wrong. A right-sized system is your evidence, your induction tool and your defence, all at once.",
    outcomes: [
      "Policy and procedure suite scoped to your operation",
      "Roles, responsibilities and consultation structure",
      "Incident, hazard and corrective-action workflows",
      "Records and review cadence that keeps it current",
    ],
    image: img.steelFrame,
  },
  {
    slug: "risk-assessments-swms",
    index: "02",
    title: "Risk Assessments & SWMS",
    short: "Identify the hazard, rank the risk, control it — on paper and on site.",
    summary:
      "Risk assessments and Safe Work Method Statements (SWMS) are where safety gets specific. We work through your high-risk activities, apply the hierarchy of controls, and produce clear, task-level documents your crews can actually follow — not generic templates that sit in a drawer.",
    why: "SWMS are legally required for the eighteen categories of high-risk construction work under the WHS Regulation 2017, and risk assessments underpin nearly every duty you hold. Done well, they prevent incidents and give supervisors a defensible record. Done as a copy-paste exercise, they fail workers and inspectors alike.",
    outcomes: [
      "Task-based risk assessments using the hierarchy of controls",
      "SWMS for high-risk construction work",
      "Plant, chemical and manual-handling assessments",
      "Practical control measures your crews can follow",
    ],
    image: img.scaffoldWorker,
  },
  {
    slug: "whs-documentation",
    index: "03",
    title: "WHS Documentation",
    short: "Every policy, register and form — accurate, current and audit-ready.",
    summary:
      "The paperwork that proves your safety program is real: policies, registers, inductions, permits and records. We build a documentation set that's complete without being bloated, version-controlled, and easy for your team to keep up to date.",
    why: "In an incident investigation or a SafeWork NSW inspection, your documentation is the first thing scrutinised. Gaps, out-of-date forms or missing records shift the burden onto you. A clean, current document suite is the difference between demonstrating due diligence and scrambling to explain.",
    outcomes: [
      "Core policies and safe operating procedures",
      "Registers: hazard, risk, chemical, plant and training",
      "Site inductions, permits and toolbox records",
      "Version control and a review schedule",
    ],
    image: img.hazardSign,
  },
  {
    slug: "audits-site-inspections",
    index: "04",
    title: "Audits & Site Inspections",
    short: "Independent eyes on your system and your sites.",
    summary:
      "Two complementary checks: a systems audit against the WHS Act, regulation and standards; and boots-on-the-ground inspections that verify your controls are actually in place. You get a risk-ranked picture of where you stand and a clear list of what to fix first.",
    why: "You can't manage what you don't measure. Regular audits and inspections catch drift before it becomes an incident, satisfy your due-diligence obligations as an officer, and give you the evidence that your system works in practice — not just on paper.",
    outcomes: [
      "Systems audit mapped to legislation and standards",
      "Scheduled and reactive site inspections",
      "Photographic hazard register and control verification",
      "Risk-ranked findings with corrective actions",
    ],
    image: img.inspection,
  },
  {
    slug: "iso-system-support",
    index: "05",
    title: "ISO System Support",
    short: "From current state to ISO 45001 certification — and beyond.",
    summary:
      "Whether you're pursuing ISO 45001 for the first time or maintaining an existing certification, we run the gap assessment, build the missing pieces, set up your internal audits and management reviews, and stand beside you through the certification audit.",
    why: "ISO 45001 is increasingly a condition of tendering for government and tier-one work in NSW. Beyond winning contracts, a certified system embeds continual improvement — turning safety from a compliance cost into a measurable operational advantage. The hard part is doing it without drowning your team in bureaucracy.",
    outcomes: [
      "ISO 45001 gap assessment and roadmap",
      "Internal audit program and management review",
      "Continual-improvement and objectives framework",
      "Certification and surveillance audit support",
    ],
    image: img.craneFlag,
  },
  {
    slug: "training-toolbox-talks",
    index: "06",
    title: "Training & Toolbox Talks",
    short: "Safety knowledge that lands with the people doing the work.",
    summary:
      "A system only works if your people understand it. We deliver practical WHS training and toolbox talks — inductions, responsibilities, specific hazards and refreshers — pitched to your crews and your sites, not a generic e-learning module.",
    why: "Consultation and training aren't optional extras — they're duties under the WHS Act, and they're what make controls stick. Workers who understand why a control exists follow it; workers handed a form don't. Good training also demonstrates that you've genuinely informed and consulted your team.",
    outcomes: [
      "Site and role-specific inductions",
      "Toolbox talks on live hazards and controls",
      "WHS responsibilities for supervisors and officers",
      "Refreshers with consultation records",
    ],
    image: img.hardHatsFloor,
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

/* ------------------------------------------------------------------ *
 * Approach — the working method
 * ------------------------------------------------------------------ */

export const approach = [
  {
    step: "01",
    title: "Understand",
    body: "We start on your site, not in a template. We learn your operations, your people, and the risks that are specific to your work.",
  },
  {
    step: "02",
    title: "Assess",
    body: "A rigorous review against the WHS Act, regulation and standards — every finding evidenced, ranked, and tied to a control.",
  },
  {
    step: "03",
    title: "Build",
    body: "We close the gaps: systems, documents and controls designed to be used, then embedded with the teams who own them.",
  },
  {
    step: "04",
    title: "Sustain",
    body: "Safety isn't a project. We set the cadence — audits, reviews and training — that keeps you certain, quarter after quarter.",
  },
] as const;

/* ------------------------------------------------------------------ *
 * Proof points
 * ------------------------------------------------------------------ */

export const sectors = [
  "Construction",
  "Civil & Infrastructure",
  "Manufacturing",
  "Warehousing & Logistics",
  "Facilities & Property",
  "Local Government",
] as const;

export const values = [
  {
    title: "Evidence over assumption",
    body: "Every finding is grounded in what we see on site and what the legislation requires — never a hunch or a template.",
  },
  {
    title: "Built to be used",
    body: "A safety system nobody opens is a liability. We design for the supervisor at 6am, not the auditor at year-end.",
  },
  {
    title: "Plain language",
    body: "Risk is complex; communicating it shouldn't be. We write so your whole team understands their duties.",
  },
  {
    title: "In it for the long run",
    body: "We measure success in years without incident, not projects delivered. Your certainty is an ongoing relationship.",
  },
] as const;

export const testimonial = {
  quote:
    "Levi has been instrumental in supporting our WHS commitment through his expertise, professionalism, and proactive approach — strengthening our safety framework and fostering a positive safety culture across our projects.",
  name: "Client",
  org: "NSW civil contractor",
} as const;

export const faqs = [
  {
    q: "Do you work across all of New South Wales?",
    a: "Yes. We're based in Sydney and work with clients across metropolitan and regional NSW, on-site and remotely. For multi-site operations we coordinate a single inspection and audit program statewide.",
  },
  {
    q: "How quickly can you start an audit?",
    a: "For most engagements we can be on site within one to two weeks. Reactive inspections following an incident or a SafeWork NSW notice are prioritised and often scheduled within 48 hours.",
  },
  {
    q: "We're a small business — is a full WHS system overkill?",
    a: "No. We right-size everything to your operation. A small team gets a lean, plain-language system that meets its legal duties without drowning supervisors in paperwork.",
  },
  {
    q: "Can you support us through a SafeWork NSW inspection or notice?",
    a: "Absolutely. We help you interpret notices, build the corrective-action response, and put controls in place so the same issue doesn't recur.",
  },
] as const;
