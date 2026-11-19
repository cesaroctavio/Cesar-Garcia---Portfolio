import { useEffect, useRef, useState, type ReactNode } from "react";
import { HeroHeader, HeroSection } from "@/components/blocks/hero-section-1";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
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
    highlights: [
      "46+ automated specs",
      "53 reusable page objects",
      "17 country storefronts",
    ],
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

const triageSteps = [
  {
    label: "Signal",
    value:
      "A release check fails in a commerce flow: quote, return, login, list, or content.",
  },
  {
    label: "Evidence",
    value:
      "Trace, screenshot, network payload, auth state, Jira note, and CI report are reviewed together.",
  },
  {
    label: "Classification",
    value: "App behavior, automation design, data/auth setup, or release risk.",
  },
  {
    label: "Outcome",
    value:
      "The team gets a clear next action instead of a generic failed test.",
  },
];

const skillRows = [
  {
    title: "Automation architecture",
    body: "Shared page objects and setup flows turn complex commerce paths into maintainable checks instead of one-off scripts.",
    tools: ["Playwright", "Selenium", "Cypress", "Node.js"],
  },
  {
    title: "Failure triage",
    body: "Failures are treated as signals with trace, screenshot, network, data, and auth context before they become Jira evidence.",
    tools: ["Trace", "Network", "Auth state", "Jira"],
  },
  {
    title: "CI and reporting",
    body: "Allure reports, CI pipelines, and Prometheus metrics make suite behavior readable across repeated runs.",
    tools: ["GitHub Actions", "Jenkins", "Allure", "Prometheus"],
  },
  {
    title: "API validation",
    body: "REST, SOAP, JSON, XML, and cXML validation connect UI evidence to backend contracts and integration behavior.",
    tools: ["REST", "SOAP", "cXML"],
  },
  {
    title: "Accessibility",
    body: "Axe validation keeps visible quality connected to WCAG risk and regression coverage in the same QA story.",
    tools: ["Axe", "WCAG"],
  },
  {
    title: "Multi-market execution",
    body: "Country-aware execution keeps regional storefront, account, and content differences visible before release.",
    tools: ["17 storefronts", "QA/Prod", "AEM"],
  },
  {
    title: "AI-assisted QA",
    body: "Agentic browser debugging shortens triage loops, inspects real UI states, and turns failures into clearer next actions.",
    tools: ["Codex", "Playwright MCP", "playwright-cli"],
  },
];

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="border border-border/55 bg-background/70 px-3 py-1.5 font-mono text-xs font-semibold uppercase leading-none tracking-[0.08em] text-foreground/80">
      {children}
    </span>
  );
}

function Highlighted({ text, terms }: { text: string; terms?: string[] }) {
  if (!terms?.length) return <>{text}</>;
  const escaped = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`));
  return (
    <>
      {parts.map((part, i) =>
        terms.includes(part) ? (
          <strong key={i} className="font-bold tabular-nums text-foreground">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

function ExperienceStack() {
  return (
    <section id="experience" className="relative py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-[var(--container-px)] lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <h2 className="section-title">
            <span className="block">Experience.</span>
            <span className="section-title-sub">Proof over polish.</span>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
            Seven years across commerce test automation, API validation, and
            web delivery.
          </p>
        </div>

        <div className="space-y-6 lg:space-y-10">
          {experiences.map((exp, index) => {
            const isCurrent = index === 0;
            return (
              <article
                key={exp.company}
                className={cn(
                  "experience-card border border-border/45 bg-card",
                  isCurrent ? "p-6 md:p-10" : "p-6 md:p-8",
                )}
              >
                <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                  {exp.period}
                </p>
                <h3
                  className={cn(
                    "font-display font-[900] leading-[1.02] text-foreground",
                    isCurrent ? "text-4xl" : "text-2xl md:text-3xl",
                  )}
                >
                  {exp.company}
                </h3>
                <p className="mt-3 text-sm font-semibold text-muted-foreground">
                  {exp.role}
                </p>

                <p
                  className={cn(
                    "max-w-[60ch] leading-relaxed text-muted-foreground",
                    isCurrent ? "mb-6 mt-6 text-lg" : "mb-5 mt-4 text-base",
                  )}
                >
                  {exp.proof}
                </p>

                <ul className={isCurrent ? "space-y-4" : "space-y-3"}>
                  {exp.points.map((point) => (
                    <li
                      key={point}
                      className={cn(
                        "max-w-[68ch] border-t border-border/40 leading-relaxed",
                        isCurrent
                          ? "pt-4 text-base text-foreground/85"
                          : "pt-3 text-sm text-muted-foreground",
                      )}
                    >
                      <Highlighted text={point} terms={exp.highlights} />
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section
      id="approach"
      className="border-y border-border/15 bg-card/40 py-24 md:py-36"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-[var(--container-px)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div>
          <h2 className="section-title">
            <span className="block">Approach.</span>
            <span className="section-title-sub">Failed checks become release decisions.</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            I turn complex commerce journeys into repeatable checks, clear
            defect evidence, and CI signals that developers and release teams
            can use.
          </p>
        </div>

        <ol className="border-t border-border/40">
          {triageSteps.map((step, index) => (
            <li
              key={step.label}
              className="grid gap-2 border-b border-border/35 py-6 md:grid-cols-[3rem_9rem_1fr] md:gap-6"
            >
              <span className="font-mono text-xs font-semibold text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-[900] leading-tight text-foreground">
                {step.label}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {step.value}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-[var(--container-px)]">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <h2 className="section-title max-w-3xl">
            <span className="block">Skills.</span>
            <span className="section-title-sub">Tools, grouped by the risk they cover.</span>
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
            Tools stay useful only when they make risk visible, repeatable, and
            easier to discuss.
          </p>
        </div>

        <div className="border-t border-border/40">
          {skillRows.map((row) => (
            <article
              key={row.title}
              className="grid gap-4 border-b border-border/35 py-8 lg:grid-cols-[18rem_1fr_auto] lg:items-baseline lg:gap-10"
            >
              <h3 className="font-display text-2xl font-[900] leading-tight text-foreground md:text-3xl">
                {row.title}
              </h3>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                {row.body}
              </p>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {row.tools.map((tool) => (
                  <Tag key={tool}>{tool}</Tag>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const contactEmail = "garcia.cpu@gmail.com";

function CopyEmailButton() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  // Bumped on every successful copy so repeat clicks restart the timer.
  const [copyCount, setCopyCount] = useState(0);

  // Only the success state times out; a failure stays until the next click.
  useEffect(() => {
    if (status !== "copied") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2500);
    return () => window.clearTimeout(timer);
  }, [status, copyCount]);

  const selectAddress = () => {
    const node = document.getElementById("contact-email");
    const selection = window.getSelection();
    if (!node || !selection) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const copy = async () => {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(contactEmail);
      setStatus("copied");
      setCopyCount((count) => count + 1);
    } catch {
      setStatus("failed");
      selectAddress();
    }
  };

  const Icon = status === "copied" ? Check : Copy;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 items-center gap-2 border border-muted-foreground/60 px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
      >
        <Icon className="size-4" aria-hidden="true" />
        Copy email
      </button>
      <p
        role="status"
        aria-live="polite"
        className={cn(
          "text-sm font-semibold",
          status === "failed" ? "text-destructive" : "text-primary",
        )}
      >
        {status === "copied" && "Copied to clipboard."}
        {status === "failed" &&
          "Couldn't copy automatically. The address above is selected, so copy it from there."}
      </p>
    </div>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-border/15 bg-card/40 py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-[var(--container-px)]">
        <div className="mb-16 max-w-5xl">
          <h2
            className="font-display font-[900] leading-[0.92] text-foreground"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
          >
            <span className="block">Contact.</span>
            <span className="section-title-sub">Let's build better release confidence.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Open for QA automation architecture, framework stabilization,
            technical quality strategy, and senior engineering collaboration.
          </p>
          <p className="mt-6 flex items-start gap-3 text-base font-semibold text-foreground md:text-lg">
            <MapPin className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
            Open to remote roles with US teams. Pacific Time, based in Tijuana, MX.
          </p>
        </div>

        <div className="border-t border-border/50 pt-8">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Email
          </p>
          <a
            id="contact-email"
            href={`mailto:${contactEmail}`}
            className="inline-block break-all font-display text-3xl font-[900] leading-tight text-foreground transition-colors duration-200 hover:text-primary sm:text-4xl lg:text-5xl"
          >
            {contactEmail}
          </a>
          <div className="mt-6">
            <CopyEmailButton />
          </div>
        </div>

        <ul className="mt-12 flex flex-col border-t border-border/50 sm:flex-row sm:flex-wrap sm:gap-x-10">
          {contacts
            .filter((contact) => contact.external)
            .map((contact) => (
              <li key={contact.href} className="border-b border-border/30 sm:border-b-0">
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-14 items-center gap-3 py-3 text-base text-foreground transition-colors duration-200 hover:text-primary"
                >
                  <contact.icon className="size-4 text-primary" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {contact.label}
                  </span>
                  <span className="font-semibold">{contact.value}</span>
                  <ArrowUpRight
                    className="size-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/10 bg-card py-8">
      <div className="mx-auto max-w-7xl px-[var(--container-px)] text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Cesar Octavio Garcia Sanchez
      </div>
    </footer>
  );
}

export default function App() {
  const appRef = useRef<HTMLDivElement | null>(null);
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrollTopVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.utils.toArray<HTMLElement>(".experience-card").forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.96 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              end: "top 28%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: appRef },
  );

  return (
    <div
      ref={appRef}
      className="min-h-screen bg-background font-sans text-foreground"
    >
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <HeroHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="w-full max-w-full overflow-x-clip focus:outline-none"
      >
        <HeroSection />
        <ExperienceStack />
        <Approach />
        <Skills />
        <Contact />
      </main>
      <Footer />

      <button
        type="button"
        data-scroll-top
        className={`fixed bottom-8 right-8 z-50 hidden border border-border/50 bg-background/90 p-3 text-foreground transition-[transform,opacity,border-color,background-color] duration-300 hover:border-primary/50 hover:bg-primary/[0.05] md:block ${isScrollTopVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0"}`}
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
