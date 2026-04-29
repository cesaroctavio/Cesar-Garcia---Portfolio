import { useEffect, useRef, useState } from "react";
import { HeroHeader, HeroSection } from "@/components/blocks/hero-section-1";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  CircleDot,
  GitBranch,
  Mail,
  MapPin,
  MessageCircle,
  Radar,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
    text: "Turns repeated commerce paths into maintainable checks with shared objects, setup flows, and market-aware execution.",
    items: ["Playwright", "Selenium", "Cypress", "Node.js"],
    className: "lg:col-span-2 lg:row-span-3",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "AI-Assisted QA",
    text: "Uses agentic browser debugging to shorten triage loops, inspect real UI states, and turn failures into clearer next actions.",
    items: ["Codex", "Playwright MCP", "playwright-cli"],
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    title: "Delivery Systems",
    text: "Makes release health easier to read through CI evidence, reporting, metrics, and defect analysis.",
    items: ["GitHub Actions", "Jenkins", "Allure", "Prometheus"],
    className: "lg:col-span-1 lg:row-span-2",
  },
  {
    title: "Validation Depth",
    text: "Checks user journeys, services, accessibility, content publishing, and regression risk across regions.",
    items: ["REST", "SOAP", "Axe", "Jira"],
    className: "lg:col-span-1 lg:row-span-2",
  },
];

const releaseFlow = [
  {
    label: "Signal",
    title: "A commerce check fails",
    body: "A quote, return, list, login, or content path produces a reproducible failure signal.",
    value: "Trace captured",
  },
  {
    label: "Evidence",
    title: "Artifacts get connected",
    body: "Screenshots, network payloads, auth state, Allure reports, and Jira notes are reviewed together.",
    value: "Cause isolated",
  },
  {
    label: "Decision",
    title: "The team gets direction",
    body: "The failure is classified as app behavior, automation design, data, auth, or release risk.",
    value: "Action clear",
  },
];

const capabilityChapters = [
  {
    title: "Playwright architecture",
    eyebrow: "Reusable journeys",
    body: "Shared page objects and setup flows turn complex commerce paths into maintainable checks instead of one-off scripts.",
    tags: ["46+ specs", "53 objects", "B2B/B2C"],
    icon: GitBranch,
    variant: "trace",
  },
  {
    title: "Failure triage",
    eyebrow: "Cause classification",
    body: "Failures are treated as signals with trace, screenshot, network, data, and auth context before they become Jira evidence.",
    tags: ["Trace", "Network", "Auth state"],
    icon: Radar,
    variant: "status",
  },
  {
    title: "CI observability",
    eyebrow: "Release signals",
    body: "Allure reports, GitHub Actions, and Prometheus-style metrics make suite behavior readable across repeated runs.",
    tags: ["Allure", "Actions", "Prometheus"],
    icon: CircleDot,
    variant: "ci",
  },
  {
    title: "API validation",
    eyebrow: "Payload confidence",
    body: "REST, SOAP, JSON, XML, and cXML validation connect UI evidence to backend contracts and integration behavior.",
    tags: ["REST", "SOAP", "cXML"],
    icon: Bot,
    variant: "api",
  },
  {
    title: "Accessibility checks",
    eyebrow: "Inclusive quality",
    body: "Axe validation keeps visible quality connected to WCAG risk and regression coverage in the same QA story.",
    tags: ["Axe", "WCAG", "Regression"],
    icon: ShieldCheck,
    variant: "accessibility",
  },
  {
    title: "Multi-market execution",
    eyebrow: "Global storefronts",
    body: "Country-aware execution keeps regional storefront, account, and content differences visible before release.",
    tags: ["17 countries", "QA/Prod", "AEM"],
    icon: CheckCircle2,
    variant: "markets",
  },
];

const evidenceRecords = [
  {
    label: "Framework scope",
    body: "Reusable checks cover shopping, quotes, returns, login, and content workflows without one-off scripts.",
    tags: ["Playwright", "46+ specs", "53 objects", "AEM"],
  },
  {
    label: "Execution surface",
    body: "Runs are standardized across country storefronts and environments so release risk can be compared across flows.",
    tags: ["17 storefronts", "QA/Prod", "B2B/B2C", "PunchOut"],
  },
  {
    label: "Decision signals",
    body: "Accessibility checks, report evidence, traces, and CI metrics help classify what failed and who should act next.",
    tags: ["Axe", "Allure", "API payload", "Prometheus"],
  },
];

const qaDossierRows = [
  {
    label: "Signal",
    value: "A release check fails in a commerce flow.",
  },
  {
    label: "Evidence",
    value:
      "Trace, screenshot, network payload, Jira note, and CI report are reviewed together.",
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

const qaDossierTags = ["Trace", "API payload", "Allure", "Jira", "CI"];

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

function ProofComparison() {
  return (
    <section
      id="proof"
      className="relative overflow-hidden border-y border-border/15 bg-card/25 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(circle_at_center,oklch(var(--foreground))_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-[var(--container-px)] lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20">
        <div>
          <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            Release evidence
          </p>
          <h2
            className="max-w-4xl font-display font-[900] leading-[0.95] text-foreground"
            style={{ fontSize: "clamp(2.45rem, 4.6vw, 4.6rem)" }}
          >
            Failed checks become release decisions.
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            The BetterStack-inspired shift is simple: every QA result should
            read like telemetry, with signal, evidence, and action visible in
            one pass.
          </p>
        </div>

        <div className="overflow-hidden border border-border/45 bg-background/70 shadow-[var(--shadow-hero-panel)]">
          <div className="grid border-b border-border/35 bg-foreground/[0.03] sm:grid-cols-3">
            {releaseFlow.map((item) => (
              <div
                key={item.label}
                className="border-b border-border/25 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
              >
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-2 font-display text-2xl font-[900] leading-none text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-0 lg:grid-cols-[1fr_0.9fr]">
            <div className="p-6 md:p-8">
              <div className="mb-8 space-y-4">
                {releaseFlow.map((item, index) => (
                  <article
                    key={item.title}
                    className="group border border-border/35 bg-card/45 p-5 transition-colors duration-500 hover:border-primary/45 hover:bg-card/70"
                  >
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
                        {String(index + 1).padStart(2, "0")} {item.label}
                      </p>
                      <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
                    </div>
                    <h3 className="font-display text-2xl font-[900] leading-[1.02] text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {["Screenshot", "Trace", "Network", "Allure", "Jira"].map(
                  (item) => (
                    <span
                      key={item}
                      className="border border-border/55 bg-background/70 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase leading-none tracking-[0.06em] text-foreground/75"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="border-t border-border/35 bg-card/55 p-6 lg:border-l lg:border-t-0 md:p-8">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                  QA telemetry
                </p>
                <span className="h-2 w-2 rounded-full bg-primary shadow-[var(--shadow-signal-glow)]" />
              </div>
              <div className="space-y-3 font-mono text-xs">
                {[
                  ["checkout.spec", "classified", "app behavior"],
                  ["quote-v2.spec", "evidence", "network payload"],
                  ["returns.spec", "guarded", "data unavailable"],
                  ["aem-content.spec", "signal", "regional content"],
                ].map(([name, state, detail]) => (
                  <div
                    key={name}
                    className="grid grid-cols-[1fr_auto] gap-4 border border-border/30 bg-background/70 p-3"
                  >
                    <div>
                      <p className="font-semibold text-foreground">{name}</p>
                      <p className="mt-1 text-muted-foreground">{detail}</p>
                    </div>
                    <p className="text-primary">{state}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-28 overflow-hidden border border-border/30 bg-background/70 p-4">
                <div className="flex h-full items-end gap-2">
                  {[34, 58, 44, 78, 62, 86, 54, 71, 48, 92, 66, 80].map(
                    (height, index) => (
                      <span
                        key={index}
                        className="flex-1 bg-primary/25"
                        style={{ height: `${height}%` }}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilityChapters() {
  return (
    <section
      id="capabilities"
      data-proof-chapters
      className="relative overflow-hidden py-32 md:py-48"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-border/30" />
      <div className="mx-auto grid max-w-7xl gap-16 px-[var(--container-px)] lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div data-proof-pin className="chapter-pin lg:h-fit">
          <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            Capability chapters
          </p>
          <h2
            className="max-w-3xl font-display font-[900] leading-[0.95] text-foreground"
            style={{ fontSize: "clamp(2.65rem, 6vw, 5.5rem)" }}
          >
            QA work framed as operational telemetry.
          </h2>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground">
            Each chapter maps to a practical release concern: architecture,
            triage, CI, APIs, accessibility, and regional execution.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {capabilityChapters.map((chapter) => (
            <article
              key={chapter.title}
              data-scale-card
              className="group min-h-[31rem] overflow-hidden border border-border/40 bg-card/50 transition-colors duration-500 hover:border-primary/45 hover:bg-card/70"
            >
              <div className="chapter-visual h-56 overflow-hidden border-b border-border/35 bg-background/75">
                <ChapterVisual variant={chapter.variant} />
              </div>
              <div className="flex min-h-[17rem] flex-col justify-between p-6 md:p-7">
                <div>
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center border border-border/50 bg-background/80 text-primary transition-colors duration-500 group-hover:border-primary/45 group-hover:bg-primary group-hover:text-primary-foreground">
                      <chapter.icon className="size-4" />
                    </div>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                      {chapter.eyebrow}
                    </p>
                  </div>
                  <h3 className="font-display text-3xl font-[900] leading-[1.02] text-foreground">
                    {chapter.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {chapter.body}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {chapter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-border/55 bg-background/70 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase leading-none tracking-[0.06em] text-foreground/75"
                    >
                      {tag}
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

function ChapterVisual({ variant }: { variant: string }) {
  if (variant === "trace") {
    return (
      <div className="relative h-full p-6">
        <div className="absolute inset-0 opacity-[0.045] [background-image:radial-gradient(circle_at_center,oklch(var(--foreground))_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="relative h-full">
          {["Cart", "Quote", "Auth", "Return", "List"].map((node, index) => (
            <div
              key={node}
              className="absolute border border-border/45 bg-card/90 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-foreground shadow-[var(--shadow-evidence-card)]"
              style={{
                left: `${(index % 3) * 31 + 4}%`,
                top: `${Math.floor(index / 3) * 43 + (index % 2) * 14 + 8}%`,
              }}
            >
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              {node}
            </div>
          ))}
          <div className="absolute left-[14%] top-[28%] h-px w-[62%] rotate-[14deg] bg-primary/35" />
          <div className="absolute left-[28%] top-[54%] h-px w-[47%] -rotate-[18deg] bg-primary/25" />
        </div>
      </div>
    );
  }

  if (variant === "api") {
    return (
      <div className="h-full p-6 font-mono text-xs">
        <div className="h-full border border-border/35 bg-background/80 p-4">
          {[
            "{",
            '  "market": "US",',
            '  "flow": "quote-v2",',
            '  "payload": "validated",',
            '  "decision": "release-ready"',
            "}",
          ].map((line) => (
            <p key={line} className="leading-7 text-muted-foreground">
              <span className="text-primary">&gt;</span> {line}
            </p>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "ci") {
    return (
      <div className="flex h-full items-end gap-3 p-6">
        {[44, 72, 58, 88, 63, 80, 52, 92].map((height, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col justify-end border border-border/30 bg-background/70"
          >
            <span
              className="block bg-primary/35 transition-colors duration-500 group-hover:bg-primary/55"
              style={{ height: `${height}%` }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "accessibility") {
    return (
      <div className="grid h-full gap-3 p-6">
        {[
          "Contrast AA",
          "Keyboard path",
          "Focus visible",
          "Reduced motion",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between border border-border/35 bg-background/75 px-4 py-3"
          >
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-foreground">
              {item}
            </span>
            <CheckCircle2 className="size-4 text-primary" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "markets") {
    return (
      <div className="grid h-full grid-cols-5 gap-2 p-6">
        {Array.from({ length: 25 }).map((_, index) => (
          <span
            key={index}
            className={cn(
              "border border-border/30 bg-background/70",
              [2, 4, 8, 11, 14, 17, 20, 23].includes(index) &&
                "border-primary/45 bg-primary/20",
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="h-full p-6">
      <div className="grid h-full gap-3">
        {["auth state", "test data", "network", "ui state"].map((item) => (
          <div
            key={item}
            className="grid grid-cols-[1fr_auto] items-center gap-4 border border-border/35 bg-background/75 px-4 py-3 font-mono text-xs"
          >
            <span className="font-semibold uppercase tracking-[0.08em] text-foreground">
              {item}
            </span>
            <span className="text-primary">isolated</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  const statement =
    "I turn complex commerce journeys into repeatable checks, clear defect evidence, and CI signals that developers and release teams can use.";

  return (
    <section
      id="about"
      className="relative overflow-hidden border-y border-border/10 py-32 md:py-48"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-border/40" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-[var(--container-px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <div>
          <h2
            className="max-w-5xl font-display font-[900] leading-[0.94] text-foreground"
            style={{ fontSize: "clamp(2.8rem, 5.2vw, 4.85rem)" }}
          >
            I build release systems teams can trust.
          </h2>
          <div
            aria-hidden="true"
            className="mt-8 grid max-w-xl grid-cols-[auto_1fr] items-center gap-4 md:mt-10"
          >
            <div className="flex h-10 items-center gap-1 border border-border/45 bg-card/55 px-3">
              {[38, 64, 48, 82, 56, 74].map((height, index) => (
                <span
                  key={index}
                  className="w-1.5 bg-primary/45"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="flex min-w-0 items-center gap-4">
              <span className="h-px flex-1 bg-border/50" />
              <span className="hidden whitespace-nowrap font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:block">
                Signal to release
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end gap-10 lg:pt-36">
          <p className="max-w-2xl text-xl font-medium leading-[1.55] text-muted-foreground md:text-2xl md:leading-[1.45]">
            {statement}
          </p>

          <div className="border-y border-border/40">
            <div className="grid sm:grid-cols-2">
              <div className="border-b border-border/35 p-6 sm:border-b-0 sm:border-r">
                <h3 className="mb-4 font-display text-2xl font-[800] text-foreground">
                  Current Focus
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Turning unstable flows into repeatable checks, clear defects,
                  and CI signals.
                </p>
              </div>
              <div className="p-6">
                <h3 className="mb-4 font-display text-2xl font-[800] text-foreground">
                  Operating Domain
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Commerce storefronts, B2B/B2C accounts, content publishing,
                  APIs, and accessibility.
                </p>
              </div>
            </div>
            <div className="border-t border-border/35 p-6">
              <h3 className="mb-4 font-display text-2xl font-[800] text-foreground">
                Working Pattern
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Most useful when a failure needs a clear cause: app behavior,
                automation design, data, auth setup, or release risk.
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
            className="max-w-4xl font-display font-[900] leading-[0.96] text-foreground"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5.4rem)" }}
          >
            Operating strengths behind clearer release decisions.
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
            Tools stay useful only when they make risk visible, repeatable, and
            easier to discuss.
          </p>
        </div>

        <div className="grid grid-flow-dense gap-4 lg:grid-cols-4 lg:grid-rows-3 lg:auto-rows-[12rem]">
          {skillCards.map((card) => (
            <article
              key={card.title}
              className={cn(
                "group relative overflow-hidden border border-border/40 bg-card/35 p-6 transition-colors duration-500 hover:border-primary/45 hover:bg-card/55 lg:p-8",
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
                  <h3 className="mb-5 font-display text-4xl font-[900] leading-[1.02] text-foreground md:text-5xl">
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
                      className="border border-border/60 bg-background/80 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase leading-none tracking-[0.06em] text-foreground/80"
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
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap font-mono text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground/80">
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
  return (
    <section
      id="experience"
      className="relative overflow-hidden py-32 md:py-48"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-border/30" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-[var(--container-px)] lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <h2
            className="font-display font-[900] leading-[0.96] text-foreground"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5.4rem)" }}
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
              className="experience-card group border border-border/45 bg-card/80 p-6 shadow-[var(--shadow-evidence-card)] md:p-10 lg:sticky"
              style={{ top: `${112 + index * 26}px` }}
            >
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                    {exp.period}
                  </p>
                  <h3 className="font-display text-4xl font-[900] leading-[1.02] text-foreground">
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

function EvidenceDossier() {
  return (
    <section
      id="dossier"
      className="scroll-mt-28 border-y border-border/15 bg-card/45 py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-[var(--container-px)] lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Release evidence
            </p>
          </div>
          <h2 className="font-display text-4xl font-[900] leading-[0.98] text-foreground md:text-6xl">
            Evidence recruiters can scan, engineers can use.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            The dossier shows how a failure becomes a decision. The ledger then
            ties scope, execution, and release signals back to practical team
            action.
          </p>
        </div>

        <div className="border-y border-border/40">
          <article className="py-8 md:py-10">
            <div className="grid gap-5 md:grid-cols-[4.5rem_1fr] md:gap-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                QA
              </p>
              <div>
                <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Dossier
                </p>
                <h3 className="font-display text-3xl font-[900] leading-[1.02] text-foreground md:text-4xl">
                  Failure triage pattern
                </h3>
                <div className="mt-7 border-y border-border/35">
                  {qaDossierRows.map((row) => (
                    <div
                      key={row.label}
                      className="grid gap-2 border-t border-border/30 py-4 first:border-t-0 md:grid-cols-[8.5rem_1fr] md:gap-6"
                    >
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-primary/85">
                        {row.label}
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                        {row.value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {qaDossierTags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-border/55 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase leading-none tracking-[0.06em] text-foreground/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {evidenceRecords.map((record, index) => (
            <article
              key={record.label}
              className="grid gap-5 border-t border-border/35 py-8 first:border-t-0 md:grid-cols-[4.5rem_1fr] md:gap-8 md:py-10"
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="font-display text-3xl font-[900] leading-[1.02] text-foreground md:text-4xl">
                  {record.label}
                </h3>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {record.body}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {record.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-border/55 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase leading-none tracking-[0.06em] text-foreground/75"
                    >
                      {tag}
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

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-48">
      <div className="absolute inset-x-0 top-0 h-px bg-border/30" />
      <div className="relative mx-auto max-w-7xl px-[var(--container-px)]">
        <div className="mb-16 max-w-5xl">
          <h2
            className="font-display font-[900] leading-[0.92] text-foreground"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            Let's build better release confidence.
          </h2>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Open for QA automation architecture, framework stabilization,
            technical quality strategy, and senior engineering collaboration.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {contact.label}
              </p>
              <p className="break-words font-display text-xl font-[800] leading-snug text-foreground transition-colors group-hover:text-primary 2xl:text-2xl">
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
        <div>
          &copy; {new Date().getFullYear()} Cesar Octavio Garcia Sanchez
        </div>
        <div>Designed for performance and release confidence</div>
      </div>
    </footer>
  );
}

export default function App() {
  const appRef = useRef<HTMLDivElement | null>(null);
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollTopVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 768px)");
    const handleViewportChange = () => {
      setIsDesktopViewport(desktopMedia.matches);
    };

    handleViewportChange();
    desktopMedia.addEventListener("change", handleViewportChange);

    return () => {
      desktopMedia.removeEventListener("change", handleViewportChange);
    };
  }, []);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        const pinTarget = document.querySelector("[data-proof-pin]");
        const chapterSection = document.querySelector("[data-proof-chapters]");

        if (pinTarget && chapterSection) {
          ScrollTrigger.create({
            trigger: chapterSection,
            start: "top 120px",
            end: "bottom bottom",
            pin: pinTarget,
            pinSpacing: false,
          });
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-scale-card]").forEach((card) => {
        const visual = card.querySelector(".chapter-visual");

        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 25%",
              scrub: true,
            },
          })
          .fromTo(
            visual ?? card,
            { scale: 0.84, opacity: 0.32, filter: "brightness(0.72)" },
            {
              scale: 1,
              opacity: 1,
              filter: "brightness(1)",
              duration: 0.55,
              ease: "none",
            },
          )
          .to(visual ?? card, {
            opacity: 0.72,
            filter: "brightness(0.84)",
            duration: 0.45,
            ease: "none",
          });
      });

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

      return () => media.revert();
    },
    { scope: appRef },
  );

  const isScrollTopButtonVisible = isDesktopViewport && isScrollTopVisible;

  return (
    <div
      ref={appRef}
      className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/30 selection:text-primary"
    >
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
        <ProofComparison />
        <EvidenceDossier />
        <CapabilityChapters />
        <About />
        <SkillsBento />
        <CapabilityMarquee />
        <ExperienceStack />
        <Contact />
      </main>
      <Footer />

      <button
        type="button"
        data-scroll-top
        className={`fixed bottom-8 right-8 z-50 hidden border border-border/50 bg-background/90 p-3 text-foreground transition-[transform,opacity,border-color,background-color] duration-300 hover:border-primary/50 hover:bg-primary/[0.05] md:block ${isScrollTopButtonVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0"}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        aria-hidden={isScrollTopButtonVisible ? undefined : "true"}
        tabIndex={isScrollTopButtonVisible ? 0 : -1}
      >
        <ArrowRight className="size-5 -rotate-90" />
      </button>
    </div>
  );
}
