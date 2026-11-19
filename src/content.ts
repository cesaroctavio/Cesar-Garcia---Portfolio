export const cv = {
  href: "/Cesar_Garcia_CV_2026_Senior_QA.pdf",
  label: "Download CV (PDF)",
};

export const contactEmail = "garcia.cpu@gmail.com";

export const menuItems = [
  { name: "Experience", href: "#experience" },
  { name: "Triage", href: "#approach" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
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
    highlights: [
      "46+ automated specs",
      "53 reusable page objects",
      "17 country storefronts",
    ],
    points: [
      "Contributed to the design and maintenance of a modular Playwright automation framework supporting 46+ automated specs and 53 reusable page objects.",
      "Standardized automated execution across 17 country storefronts and multiple QA and production environments for B2B and B2C journeys.",
      "Implemented reusable B2B PunchOut/cXML and authentication setup flows to reduce duplication and improve suite stability.",
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

export const skillRows = [
  {
    title: "Automation architecture",
    body: "Shared page objects and setup flows instead of one-off scripts.",
    tools: "Playwright, Selenium, Cypress, Node.js",
  },
  {
    title: "Failure triage",
    body: "Trace, network, data and auth context before a Jira ticket.",
    tools: "Trace viewer, Jira",
  },
  {
    title: "CI and reporting",
    body: "Suite behavior readable across repeated runs.",
    tools: "GitHub Actions, Jenkins, Allure, Prometheus",
  },
  {
    title: "API validation",
    body: "UI evidence tied to the backend contract.",
    tools: "REST, SOAP, cXML",
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
    href: "https://wa.me/526642648910",
    value: "+52 664 264 8910",
    label: "WhatsApp",
  },
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
