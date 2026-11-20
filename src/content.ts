export const cv = {
  href: "/Cesar_Garcia_CV_2026_Senior_QA.pdf",
  label: "Download CV (PDF)",
};

export const contactEmail = "garcia.cpu@gmail.com";

export const menuItems = [
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
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

export const experiences: Experience[] = [
  {
    period: "Dec 2021 to present",
    company: "Thermo Fisher Scientific",
    role: "Engineer III, Software Quality Assurance",
    proof:
      "Modular Playwright architecture across shopping, quotes, returns, login and AEM content workflows.",
    highlights: ["shared fixtures and parameterized runners", "ServiceNow incidents"],
    points: [
      "Contributed to the design and maintenance of a modular Playwright automation framework with 55 Playwright specs, 60 page object files, shared fixtures and parameterized runners.",
      "Standardized automated execution across 17 country storefronts and multiple QA and production environments for B2B and B2C journeys.",
      "Implemented reusable B2B PunchOut/cXML and authentication setup flows to reduce duplication and improve suite stability.",
      "Define test scope, strategy, plans and execution matrices for functional, smoke, regression, mobile, cross-platform, performance and load testing.",
      "Investigate customer-reported ServiceNow incidents: reproduce them in production, review browser and API evidence, validate the fix and document the root cause.",
      "Expanded coverage with Axe accessibility validation, Allure reporting and Prometheus CI observability.",
    ],
  },
  {
    period: "Jan 2020 to Nov 2021",
    company: "BioSoft Integrators, Inc",
    role: "Software Quality Engineer",
    proof:
      "Manual and automated validation for web applications, APIs and Agile release cycles.",
    points: [
      "Developed and executed manual and automated test cases from business and technical requirements.",
      "Validated REST and SOAP APIs using JSON and XML payloads, with reproducible evidence in Jira.",
      "Performed functional, regression and usability testing to support release readiness.",
    ],
  },
  {
    period: "Jan 2019 to Jan 2020",
    company: "Bajalogics",
    role: "Web Developer and QA Tester",
    proof:
      "Built ASP.NET features and validated them before release.",
    points: [
      "Developed web application features using ASP.NET and supported validation of new releases.",
      "Designed test scenarios, documented results and verified system behavior against requirements.",
    ],
  },
];

export const triageSteps = [
  {
    label: "Signal",
    value:
      "A release check fails in a commerce flow: quote, return, login, list or content.",
  },
  {
    label: "Evidence",
    value:
      "Trace, screenshot, network payload, auth state, Jira note and CI report, read together.",
  },
  {
    label: "Classification",
    value: "App behavior, automation design, data or auth setup, or release risk.",
  },
  {
    label: "Outcome",
    value: "The team gets a clear next action instead of a generic failed test.",
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
      "Reproduce it, read the browser and API evidence, validate the fix, then write the root cause down.",
    result: "The incident closes with evidence in Jira and Confluence, not a guess.",
    tools: ["ServiceNow", "DevTools", "Jira", "Confluence"],
  },
];

export const aiWorkflow = {
  title: "QA with an AI pair",
  body: "I use coding agents to drive a real browser while I debug. They reproduce the failure, read the trace and the network, and draft a fix. I review every change before it lands.",
  tools: [
    { name: "Codex", text: "Reads the failing spec and its trace, then proposes a change." },
    { name: "Playwright MCP", text: "Lets the agent click through the real app to reproduce the issue." },
    { name: "playwright-cli", text: "Runs and records flows from the terminal for quick checks." },
  ],
};

export const about = {
  paragraphs: [
    "Because I wrote production code first, I read a failing check the way a developer would: what changed, where, and why. A bug report from me comes with the trace, the cause and a next step, so it's ready to fix.",
    "Day to day I work with distributed Agile teams in the US and offshore, keeping suites stable enough that a red check always means something real.",
  ],
  facts: [
    { label: "Education", value: "B.Eng. Computer Engineering, Instituto Tecnológico de Tijuana" },
    { label: "Based in", value: "Tijuana, Baja California (Pacific Time)" },
    { label: "Works with", value: "Distributed Agile teams in the US and offshore" },
  ],
};

export const skillRows = [
  {
    title: "Automation architecture",
    body: "Shared page objects and setup flows instead of one-off scripts.",
    tools: "Playwright, Selenium, Cypress, JavaScript, Node.js, Python",
  },
  {
    title: "Failure triage",
    body: "Trace, network, data and auth context before a Jira ticket.",
    tools: "Trace viewer, Jira",
  },
  {
    title: "CI and reporting",
    body: "Suite behavior readable across repeated runs.",
    tools: "GitHub Actions, Jenkins, Git, Allure, Prometheus",
  },
  {
    title: "API validation",
    body: "UI evidence tied to the backend contract.",
    tools: "Postman, REST, SOAP, JSON, XML, cXML",
  },
  {
    title: "Accessibility",
    body: "Axe checks inside the regression suite.",
    tools: "Axe, WCAG",
  },
  {
    title: "Multi-market execution",
    body: "Regional storefront, account and content differences, checked before release.",
    tools: "QA and production environments, AEM",
  },
  {
    title: "AI-assisted QA",
    body: "Agent-driven browser debugging to shorten triage loops.",
    tools: "Codex, Playwright MCP, playwright-cli",
  },
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
