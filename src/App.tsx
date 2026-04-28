import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroHeader, HeroSection } from "@/components/blocks/hero-section-1";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const experiences = [
  {
    period: "Dec 2021 - Present",
    company: "Thermo Fisher Scientific",
    role: "Engineer III, Software Quality Assurance",
    proof:
      "Modular Playwright architecture across shopping, quotes, returns, login, and AEM content workflows.",
    points: [
      "Contributed to the design and maintenance of a modular Playwright automation framework supporting 46+ automated specs and 53 reusable page objects.",
      "Standardized automated execution across 17 country storefronts and multiple QA/production environments for B2B and B2C journeys.",
      "Implemented reusable B2B PunchOut/cXML and authentication setup flows to reduce duplication and improve suite stability.",
      "Expanded coverage with Axe accessibility validation, Allure reporting, and Prometheus CI observability.",
    ],
  },
  {
    period: "Jan 2020 - Nov 2021",
    company: "BioSoft Integrators, Inc",
    role: "Software Quality Engineer",
    proof:
      "Manual and automated validation for web applications, APIs, and Agile release cycles.",
    points: [
      "Developed and executed manual and automated test cases from business and technical requirements.",
      "Validated REST and SOAP APIs using JSON and XML payloads, with reproducible evidence in Jira.",
      "Performed functional, regression, and usability testing to support release readiness.",
    ],
  },
  {
    period: "Jan 2019 - Jan 2020",
    company: "Bajalogics",
    role: "Web Developer / QA Tester",
    proof:
      "Development and testing experience across web application features and exploratory validation.",
    points: [
      "Developed web application features using ASP.NET and supported validation of new releases.",
      "Designed test scenarios, documented results, and verified system behavior against requirements.",
    ],
  },
];

const skillCards = [
  {
    title: "Automation Architecture",
    text: "Reusable Playwright page objects, fixtures, storage-state authentication, and cross-market execution patterns.",
    items: ["Playwright", "Selenium", "Cypress", "Node.js"],
    className: "lg:col-span-2 lg:row-span-3",
    image: "https://picsum.photos/seed/automation-lab/1200/1400",
  },
  {
    title: "AI-Assisted QA",
    text: "Codex, Playwright MCP, and playwright-cli used as practical accelerators for design, triage, and browser debugging.",
    items: ["Codex", "Playwright MCP", "playwright-cli"],
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    title: "Delivery Systems",
    text: "CI/CD evidence, Allure reporting, Prometheus metrics, and release-focused defect analysis.",
    items: ["GitHub Actions", "Jenkins", "Allure", "Prometheus"],
    className: "lg:col-span-1 lg:row-span-2",
  },
  {
    title: "Validation Depth",
    text: "API, accessibility, functional, smoke, regression, UAT, and content publishing checks across regions.",
    items: ["REST", "SOAP", "Axe", "Jira"],
    className: "lg:col-span-1 lg:row-span-2",
  },
];

const proofSlides = [
  {
    title: "Frameworks that survive scale",
    body: "Built around reusable objects, setup flows, and environment-aware execution instead of isolated one-off scripts.",
    source: "Playwright architecture",
  },
  {
    title: "Evidence that helps teams decide",
    body: "Allure, Jira evidence, API payloads, trace-driven debugging, and CI metrics make failures easier to classify.",
    source: "Quality reporting",
  },
  {
    title: "Coverage beyond happy paths",
    body: "B2B, B2C, PunchOut, content validation, accessibility, and multi-country storefront paths sit in one operating model.",
    source: "Commerce QA",
  },
];

const marqueeItems = [
  "Playwright architecture",
  "B2B and B2C commerce",
  "Axe accessibility",
  "Allure evidence",
  "Prometheus observability",
  "API validation",
  "AEM regional checks",
  "AI-assisted debugging",
];

const contacts = [
  {
    href: "mailto:garcia.cpu@gmail.com",
    value: "garcia.cpu@gmail.com",
    label: "Email",
    icon: Mail,
  },
  {
    href: "https://wa.me/526642648910",
    value: "+52 664 264 8910",
    label: "WhatsApp",
    icon: MessageCircle,
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/cesar-ogs/",
    value: "in/cesar-ogs",
    label: "LinkedIn",
    icon: LinkedinIcon,
    external: true,
  },
  {
    href: "https://github.com/cesaroctavio",
    value: "cesaroctavio",
    label: "GitHub",
    icon: GithubIcon,
    external: true,
  },
];

function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const statement =
    "Senior QA Automation Engineer focused on building durable test systems for large-scale eCommerce platforms. I connect development, release confidence, and observable quality through technical precision and automation discipline.";
  const words = statement.split(" ");

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(wordRefs.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        wordRefs.current,
        { opacity: 0.14, y: 10 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            end: "bottom 55%",
            scrub: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden border-y border-border/10 py-32 md:py-48"
    >
      <div className="absolute inset-x-0 top-1/4 h-64 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--primary-rgb),0.12),transparent_58%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-[var(--container-px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <div>
          <h2
            className="max-w-4xl font-display font-[900] leading-[0.95] text-foreground"
            style={{ fontSize: "clamp(3rem, 7vw, 6.4rem)" }}
          >
            I build release systems
            <span
              className="mx-3 inline-block h-12 w-28 rounded-full align-middle bg-cover bg-center grayscale contrast-125 md:h-16 md:w-40"
              style={{
                backgroundImage:
                  "url(https://picsum.photos/seed/release-control/640/360)",
              }}
            />
            teams can trust.
          </h2>
        </div>

        <div className="flex flex-col justify-end gap-10 lg:pt-36">
          <p
            className="text-2xl font-medium leading-relaxed text-muted-foreground md:text-3xl"
            aria-label={statement}
          >
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                ref={(node) => {
                  if (node) wordRefs.current[index] = node;
                }}
                className="reveal-word mr-2 inline-block"
              >
                {word}
              </span>
            ))}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border border-border/40 bg-foreground/[0.03] p-6">
              <h3 className="mb-4 font-display text-2xl font-[800] text-foreground">
                Current Focus
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Modular Playwright frameworks, CI/CD observability, and
                AI-assisted test design.
              </p>
            </div>
            <div className="border border-border/40 bg-foreground/[0.03] p-6">
              <h3 className="mb-4 font-display text-2xl font-[800] text-foreground">
                Operating Domain
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                B2B/B2C eCommerce, global storefronts, and high-traffic content
                validation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsBento() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-foreground/[0.02] py-32 md:py-48"
    >
      <div className="mx-auto max-w-7xl px-[var(--container-px)]">
        <div className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
          <h2
            className="max-w-4xl font-display font-[900] leading-none text-foreground"
            style={{ fontSize: "clamp(3rem, 8vw, 6.8rem)" }}
          >
            A stack shaped around repeatable evidence.
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
            Four operating strengths, arranged as a 12-cell bento with no dead
            corners.
          </p>
        </div>

        <div className="grid grid-flow-dense gap-4 lg:grid-cols-4 lg:grid-rows-3 lg:auto-rows-[12rem]">
          {skillCards.map((card) => (
            <article
              key={card.title}
              className={cn(
                "group relative overflow-hidden border border-border/50 bg-background p-6 transition-colors duration-500 hover:border-primary/45 hover:bg-foreground/[0.035] lg:p-8",
                card.className,
              )}
            >
              {card.image && (
                <div className="absolute inset-0 opacity-35 transition-opacity duration-700 group-hover:opacity-50">
                  <img
                    src={card.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full scale-100 object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
                </div>
              )}
              <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                <div>
                  <h3 className="mb-5 font-display text-4xl font-[900] leading-none text-foreground md:text-5xl">
                    {card.title}
                  </h3>
                  <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                    {card.text}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {card.items.map((item) => (
                    <span
                      key={item}
                      className="border border-border/60 bg-background/60 px-3 py-1.5 text-xs font-semibold text-foreground/80 backdrop-blur"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityMarquee() {
  const repeated = [...marqueeItems, ...marqueeItems];

  return (
    <div className="overflow-hidden border-y border-border/10 bg-background py-5">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap text-sm font-semibold uppercase text-muted-foreground/60">
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-10">
            <span>{item}</span>
            <span className="h-1 w-1 rounded-full bg-primary/70" />
          </span>
        ))}
      </div>
    </div>
  );
}

function ExperienceStack() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0.45, y: 80, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1 - index * 0.018,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              end: "top 34%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden py-32 md:py-48"
    >
      <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_72%_10%,rgba(var(--primary-rgb),0.14),transparent_56%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-[var(--container-px)] lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <h2
            className="font-display font-[900] leading-none text-foreground"
            style={{ fontSize: "clamp(3rem, 8vw, 6.8rem)" }}
          >
            Proof over polish.
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
            Career evidence presented as stackable cards: the kind of work,
            scope, and systems behind the interface.
          </p>
        </div>

        <div className="space-y-8 lg:space-y-14">
          {experiences.map((exp, index) => (
            <article
              key={exp.company}
              className="stack-card group border border-border/50 bg-card/90 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.18)] backdrop-blur md:p-10 lg:sticky"
              style={{ top: `${112 + index * 26}px` }}
            >
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="mb-3 text-sm font-semibold text-primary">
                    {exp.period}
                  </p>
                  <h3 className="font-display text-4xl font-[900] leading-none text-foreground">
                    {exp.company}
                  </h3>
                  <p className="mt-3 text-sm font-semibold text-muted-foreground">
                    {exp.role}
                  </p>
                </div>
                <ArrowUpRight className="size-6 text-primary transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>

              <p className="mb-8 text-xl font-medium leading-relaxed text-foreground/85">
                {exp.proof}
              </p>

              <ul className="space-y-4">
                {exp.points.map((point) => (
                  <li
                    key={point}
                    className="border-t border-border/40 pt-4 text-sm leading-relaxed text-muted-foreground"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProofCarousel() {
  const [active, setActive] = useState(0);
  const current = proofSlides[active];

  const showPrevious = () => {
    setActive((index) => (index === 0 ? proofSlides.length - 1 : index - 1));
  };

  const showNext = () => {
    setActive((index) => (index + 1) % proofSlides.length);
  };

  return (
    <section className="border-y border-border/10 py-32 md:py-48">
      <div className="mx-auto grid max-w-7xl gap-12 px-[var(--container-px)] lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-24">
        <div className="relative h-[26rem] overflow-hidden border border-border/50 bg-foreground/[0.035]">
          <img
            src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=85"
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center brightness-75 contrast-125 saturate-[0.75] transition-transform duration-700 ease-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/5" />
          <div className="absolute left-6 top-6 border border-primary/35 bg-background/78 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur-md">
            Playwright run
          </div>
          <div className="absolute bottom-28 left-8 grid w-[min(20rem,calc(100%-4rem))] gap-2 font-mono text-xs text-foreground">
            {["46 specs passed", "Axe scan clean", "Trace ready"].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between border border-border/45 bg-background/72 px-4 py-3 backdrop-blur-md"
              >
                <span>{item}</span>
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_rgba(var(--primary-rgb),0.8)]" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-8 left-8 right-8 flex -space-x-5">
            {proofSlides.map((slide, index) => (
              <button
                key={slide.title}
                aria-label={`Show ${slide.title}`}
                onClick={() => setActive(index)}
                className={cn(
                  "h-16 w-16 rounded-full border border-background bg-primary text-sm font-bold text-primary-foreground transition-transform duration-300 hover:-translate-y-1",
                  active !== index && "bg-foreground text-background opacity-70",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Evidence carousel
          </p>
          <h2 className="mb-8 font-display text-5xl font-[900] leading-none text-foreground md:text-7xl">
            {current.title}
          </h2>
          <p className="mb-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            {current.body}
          </p>
          <p className="mb-10 text-sm font-semibold text-foreground/70">
            {current.source}
          </p>
          <div className="flex gap-3">
            <button
              onClick={showPrevious}
              aria-label="Previous proof"
              className="inline-flex h-12 w-12 items-center justify-center border border-border/60 bg-background text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              onClick={showNext}
              aria-label="Next proof"
              className="inline-flex h-12 w-12 items-center justify-center border border-primary bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-48">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.16),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl px-[var(--container-px)]">
        <div className="mb-16 max-w-5xl">
          <h2
            className="font-display font-[900] leading-[0.88] text-foreground"
            style={{ fontSize: "clamp(4rem, 12vw, 11rem)" }}
          >
            Let's build better release confidence.
          </h2>
          <p className="mt-10 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Open for QA automation architecture, framework stabilization,
            technical quality strategy, and senior engineering collaboration.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {contacts.map((contact) => (
            <a
              key={contact.href}
              href={contact.href}
              target={contact.external ? "_blank" : undefined}
              rel={contact.external ? "noopener noreferrer" : undefined}
              className="group relative min-h-48 overflow-hidden border border-border/50 bg-foreground/[0.03] p-6 outline-none transition-colors duration-500 hover:border-primary/50 hover:bg-primary/[0.05] focus-visible:ring-1 focus-visible:ring-primary"
            >
              <div className="mb-10 flex items-center justify-between">
                <div className="inline-flex h-10 w-10 items-center justify-center bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <contact.icon className="size-4" />
                </div>
                <ArrowUpRight className="size-5 text-muted-foreground transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
              </div>
              <p className="mb-3 text-sm font-semibold text-muted-foreground">
                {contact.label}
              </p>
              <p className="break-words font-display text-2xl font-[800] leading-tight text-foreground transition-colors group-hover:text-primary">
                {contact.value}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-3 text-sm font-semibold text-muted-foreground">
          <MapPin className="size-4 text-primary" />
          Tijuana, MX
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/10 bg-card py-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-[var(--container-px)] text-sm text-muted-foreground md:flex-row md:items-center">
        <div>&copy; {new Date().getFullYear()} Cesar Octavio Garcia Sanchez</div>
        <div>Designed for performance and release confidence</div>
      </div>
    </footer>
  );
}

export default function App() {
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollTopVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/30 selection:text-primary">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <HeroHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="w-full max-w-full overflow-x-hidden focus:outline-none"
      >
        <HeroSection />
        <About />
        <SkillsBento />
        <CapabilityMarquee />
        <ExperienceStack />
        <ProofCarousel />
        <Contact />
      </main>
      <Footer />

      <button
        data-scroll-top
        className={`fixed bottom-8 right-8 z-50 border border-border/50 bg-background/80 p-3 text-foreground backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-primary/[0.05] ${isScrollTopVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0"}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        aria-hidden={isScrollTopVisible ? undefined : "true"}
        tabIndex={isScrollTopVisible ? 0 : -1}
      >
        <ArrowRight className="size-5 -rotate-90" />
      </button>
    </div>
  );
}
