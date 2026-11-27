export const cv = {
  href: "/Cesar_Garcia_CV_2026_Senior_QA.pdf",
  label: "Download CV (PDF)",
};

export const contactEmail = "garcia.cpu@gmail.com";

export const menuItems = [
  { name: "Experience", href: "#experience" },
  { name: "Work", href: "#work" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

// Real figures, kept in sync with the CV. Update here and the stats band follows.
export const stats = [
  { value: 7, suffix: "+", label: "years in QA", note: "Dev, manual, then automation" },
  { value: 17, label: "countries", note: "Thermo Fisher storefronts" },
  { value: 55, label: "Playwright specs", note: "B2B and B2C journeys" },
  { value: 60, label: "page object files", note: "Shared across the suite" },
];

export type Experience = {
  period: string;
  company: string;
  role: string;
  proof: string;
  highlights?: string[];
  points: string[];
};

// Each fact appears once on the page: numbers live in `stats`, multi-market,
// flaky-test and incident work live in `caseStudies`. Keep bullets to what's left.
export const experiences: Experience[] = [
  {
    period: "Dec 2021 to present",
    company: "Thermo Fisher Scientific",
    role: "Engineer III, Software Quality Assurance",
    proof:
      "Modular Playwright architecture across shopping, quotes, returns, login and AEM content workflows.",
    highlights: ["PunchOut/cXML"],
    points: [
      "Define test scope, strategy and execution matrices for functional, smoke, regression, mobile, performance and load testing.",
      "Built reusable B2B PunchOut/cXML and authentication setup flows that the whole suite shares.",
      "Added Axe accessibility checks, Allure reporting and Prometheus CI observability to the pipeline.",
      "Coordinate defect triage and release validation with distributed Agile teams in the US and offshore.",
    ],
  },
  {
    period: "Jan 2020 to Nov 2021",
    company: "BioSoft Integrators, Inc",
    role: "Software Quality Engineer",
    proof: "Manual and automated validation for web applications and APIs.",
    points: [
      "Wrote and ran manual and automated tests from business and technical requirements.",
      "Validated REST and SOAP APIs (JSON, XML) and logged reproducible defects in Jira.",
    ],
  },
  {
    period: "Jan 2019 to Jan 2020",
    company: "Bajalogics",
    role: "Web Developer and QA Tester",
    proof: "Where I started: building ASP.NET features, then testing them.",
    points: [
      "Developed ASP.NET features and designed the test scenarios that verified them before release.",
    ],
  },
];

export type CaseStudy = {
  title: string;
  problem: string;
  approach: string;
  result: string;
  tools: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    title: "One suite for every storefront",
    problem:
      "Every country storefront has its own catalog, accounts and content. Testing each one by hand does not scale.",
    approach:
      "Parameterized runners and shared fixtures run the same Playwright specs across 17 countries, in QA and production, for B2B and B2C journeys.",
    result: "One suite to maintain instead of seventeen, and one release check every market shares.",
    tools: ["Playwright", "Fixtures", "GitHub Actions"],
  },
  {
    title: "Flaky tests, fixed at the source",
    problem:
      "Recurring failures were patched spec by spec, with extra waits and one-off workarounds.",
    approach:
      "Moved those fixes into shared helpers and page objects, and replaced brittle waits with deterministic UI and network-state checks.",
    result: "A fix lands once and every spec gets it, so a red build is more likely to mean a real problem.",
    tools: ["Page objects", "Network assertions"],
  },
  {
    title: "From customer ticket to root cause",
    problem: "A customer reports something broken in production through ServiceNow.",
    approach:
      "Reproduce it, read the trace, screenshots and network payloads together, and classify it: app bug, test design, data or auth setup.",
    result: "The team gets a clear next action, and the root cause is written down in Jira and Confluence.",
    tools: ["ServiceNow", "Trace viewer", "Jira"],
  },
];

// Pet Grooming System and Barber System have private repos, so their cards link live demos, not GitHub.
export const projects = [
  {
    eyebrow: "Public code",
    href: "https://github.com/cesaroctavio/playwright-qa-demo",
    name: "playwright-qa-demo",
    body: "A public Playwright and TypeScript suite you can read and run: page objects, login shared through a setup project, negative paths, order-total checks, Axe scans and CI that publishes the report.",
    cta: "View on GitHub",
  },
  {
    eyebrow: "Built and tested",
    href: "https://pet-grooming-system-sigma.vercel.app",
    name: "Pet Grooming System",
    body: "Online booking and a private admin for a one-person grooming salon, which I built end to end with Next.js, Postgres and Clerk. Playwright specs cover booking, slot limits, the groomer's daily flow and access control, and every finding from my own QA review was fixed.",
    cta: "Open live demo",
  },
  {
    eyebrow: "Built and tested",
    href: "https://barber-system-ashy.vercel.app",
    name: "Barber System",
    body: "Online booking and a private admin for a multi-barber shop with per-chair schedules, client profiles and payments, built end to end with Next.js, Postgres and Clerk. Vitest and Playwright specs cover overlap prevention, booking, checkout, security headers and access control.",
    cta: "Open live demo",
  },
];

export const siteTests = {
  href: "https://github.com/cesaroctavio/Cesar-Garcia---Portfolio/tree/main/tests",
  label: "its own Playwright suite",
};

export const stack = [
  { area: "Automation", tools: "Playwright, TypeScript, JavaScript, Selenium, Cypress, Python" },
  { area: "CI and reporting", tools: "GitHub Actions, Jenkins, Allure, Prometheus" },
  { area: "API", tools: "Postman, REST, SOAP, cXML" },
  { area: "Accessibility", tools: "Axe, WCAG" },
  { area: "AI-assisted QA", tools: "Codex, Playwright MCP, playwright-cli" },
  { area: "Tracking", tools: "Jira, Confluence, ServiceNow" },
];

export const contacts = [
  {
    href: "https://www.linkedin.com/in/cesar-ogs/",
    value: "in/cesar-ogs",
    label: "LinkedIn",
  },
  {
    href: "https://github.com/cesaroctavio",
    value: "cesaroctavio",
    label: "GitHub",
  },
];
