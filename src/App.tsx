import { useEffect, useState } from "react";
import { HeroSection } from "@/components/blocks/hero-section-1";
import { Mail, MessageCircle, ArrowUpRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

// Brand icons (Lucide doesn't include brand logos)
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const experiences = [
  {
    period: "DEC 2021 - PRESENT",
    company: "Thermo Fisher Scientific",
    role: "Engineer III, Software Quality Assurance",
    points: [
      "Contributed to the design and maintenance of a modular Playwright automation framework supporting 46+ automated specs and 53 reusable page objects across shopping, quotes, returns, login, and AEM content workflows.",
      "Standardized automated execution across 17 country storefronts and multiple QA/production environments for both B2B and B2C journeys using parameterized test runners, fixtures, and storage-state authentication.",
      "Implemented reusable B2B PunchOut/cXML and authentication setup flows to reduce duplication, improve suite stability, and simplify onboarding of new scenarios.",
      "Expanded coverage beyond functional testing by adding accessibility validation with Axe, rich evidence reporting with Allure, and CI observability through Prometheus metrics.",
      "Built AEM multi-locale and regional validation flows for EU, US, and CA content publishing checks, including fallback logic for localized content paths.",
      "Applied AI-assisted workflows with Codex, Playwright MCP, and playwright-cli to speed up test design, browser interaction debugging, and validation support.",
      "Investigated production defects, performed root cause analysis, and collaborated with distributed Agile teams to align quality gates with release priorities.",
      "Created and maintained test plans, test cases, execution matrices, and framework documentation for new automation workflows.",
    ],
  },
  {
    period: "JAN 2020 - NOV 2021",
    company: "BioSoft Integrators, Inc",
    role: "Software Quality Engineer",
    points: [
      "Developed and executed manual and automated test cases based on business and technical requirements for web applications and services.",
      "Validated REST and SOAP APIs using JSON and XML payloads, with clear defect documentation and reproducible evidence in Jira.",
      "Performed functional, regression, and usability testing in Agile delivery cycles and supported release readiness with structured test reporting.",
    ],
  },
  {
    period: "JAN 2019 - JAN 2020",
    company: "Bajalogics",
    role: "Web Developer / QA Tester",
    points: [
      "Developed web application features using ASP.NET and supported validation of new releases through manual and exploratory testing.",
      "Designed test scenarios, documented results, and helped verify system behavior against requirements.",
    ],
  },
];

const skills = [
  {
    label: "Test Automation",
    items: ["Playwright", "Selenium", "Cypress"],
  },
  {
    label: "AI-Assisted Testing",
    items: ["Codex", "Playwright MCP", "playwright-cli"],
    wide: true,
  },
  {
    label: "API Testing",
    items: ["Postman", "REST", "SOAP", "JSON", "XML"],
  },
  {
    label: "Programming",
    items: ["JavaScript", "Node.js", "Python"],
  },
  {
    label: "CI/CD & Dev Tools",
    items: ["GitHub Actions", "Jenkins", "Git", "Allure"],
  },
  {
    label: "Quality & Observability",
    items: ["Axe Accessibility", "Prometheus", "RCA", "Test Planning", "Regression", "Smoke", "UAT", "Performance"],
    wide: true,
  },
  {
    label: "Collaboration",
    items: ["Jira", "Confluence", "Agile", "Scrum", "Waterfall"],
    wide: true,
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

function About() {
  return (
    <section id="about" className="relative border-y border-border/10" style={{ paddingTop: 'var(--section-tight)', paddingBottom: 'var(--section-normal)' }}>
      <div className="max-w-7xl mx-auto px-[var(--container-px)]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-32 items-start">
          <div>
            <span className="text-primary font-mono text-[10px] uppercase block mb-6 lg:mb-12 tracking-[0.3em]">01 // CORE_SPECIFICATION</span>
            <h2
              className="font-display font-[900] text-foreground leading-[1.1] mb-8"
              style={{
                fontSize: 'clamp(2.25rem, 8vw, 4.5rem)',
                letterSpacing: 'var(--tracking-display)',
              }}
            >
              &ldquo;Quality is the result of <span className="text-primary italic">intelligent effort</span>.&rdquo;
            </h2>
          </div>
          
          <div className="lg:pt-24">
            <div className="space-y-8 lg:space-y-12">
              <div className="relative pl-6 lg:pl-8 border-l border-primary/30">
                <span className="absolute left-0 top-0 -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></span>
                <p className="text-muted-foreground text-balance" style={{ fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)' }}>
                  Senior QA Automation Engineer with a specialized focus on building industrial-grade test architectures for large-scale eCommerce ecosystems. I bridge the gap between development and reliability through technical precision and automated rigor.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-border/10">
                <div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block mb-3 lg:mb-4">// CURRENT_FOCUS</span>
                  <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                    Modular Playwright frameworks, CI/CD observability, and AI-assisted test design.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block mb-3 lg:mb-4">// OPERATING_DOMAIN</span>
                  <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                    B2B/B2C eCommerce, Global Storefronts, and High-Traffic Content Validation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" style={{ paddingTop: 'var(--section-normal)', paddingBottom: 'var(--section-normal)' }}>
      <div className="max-w-7xl mx-auto px-[var(--container-px)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 lg:gap-8 mb-16 lg:mb-24">
          <div>
            <span className="text-primary font-mono text-[10px] uppercase block mb-4 lg:mb-6 tracking-[0.3em]">02 // PROFESSIONAL_LOGS</span>
            <h2
              className="font-display font-[900] text-foreground leading-none"
              style={{
                fontSize: 'clamp(2.25rem, 8vw, 5.5rem)',
                letterSpacing: 'var(--tracking-display)',
              }}
            >
              EXPERIENCE
            </h2>
          </div>
          <div className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.2em] pb-1 lg:pb-2">
            TOTAL_RUNTIME: 5.4_YEARS
          </div>
        </div>

        <div className="space-y-20 lg:space-y-32">
          {experiences.map((exp, index) => (
            <div key={index} className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-24 relative">
              <div className="lg:sticky lg:top-32 h-fit">
                <div className="flex items-center gap-4 mb-3 lg:mb-4">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{exp.period}</span>
                </div>
                <h3 className="font-display font-[800] text-2xl lg:text-3xl mb-2 text-foreground">{exp.company}</h3>
                <p className="text-primary font-mono text-[10px] tracking-widest font-bold">{exp.role}</p>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-0 bottom-0 w-px bg-border/20 hidden lg:block"></div>
                <ul className="space-y-5 lg:space-y-6">
                  {exp.points.map((point, i) => (
                    <li key={i} className="text-muted-foreground leading-relaxed flex gap-3 lg:gap-4 group pb-5 lg:pb-6 border-b border-border/40 last:border-0" style={{ fontSize: 'var(--text-base)' }}>
                      <span className="text-primary/60 font-mono text-[10px] pt-1.5 group-hover:text-primary transition-colors shrink-0">[{String(i + 1).padStart(2, '0')}]</span>
                      <span className="flex-1">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="bg-foreground/[0.02] border-y border-border/10" style={{ paddingTop: 'var(--section-normal)', paddingBottom: 'var(--section-normal)' }}>
      <div className="max-w-7xl mx-auto px-[var(--container-px)]">
        <div className="mb-16 lg:mb-24">
          <span className="text-primary font-mono text-[10px] uppercase block mb-4 lg:mb-6 tracking-[0.3em]">03 // ASSET_MATRIX</span>
          <h2
            className="font-display font-[900] text-foreground leading-none"
            style={{
              fontSize: 'clamp(2.25rem, 8vw, 5.5rem)',
              letterSpacing: 'var(--tracking-display)',
            }}
          >
            TECH STACK
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-px bg-transparent lg:bg-border/10 lg:border lg:border-border/10">
          {skills.map((skill, i) => (
            <div key={i} className={cn("bg-background p-6 lg:p-8 group hover:bg-foreground/[0.02] transition-colors border lg:border-0 border-border/10", skill.wide && "lg:col-span-2")}>
              <div className="flex items-center justify-between mb-6 lg:mb-8">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{skill.label}</span>
                <span className="text-primary/20 font-mono text-[10px] group-hover:text-primary transition-colors">SPEC_0{i + 1}</span>
              </div>
              <div className="flex flex-wrap gap-2 lg:gap-3">
                {skill.items.map((item, j) => (
                  <span key={j} className="px-2.5 py-1 bg-foreground/[0.03] border border-border/50 text-[10px] lg:text-xs font-mono text-foreground/70 group-hover:border-primary/30 group-hover:text-foreground transition-all">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative border-t border-border/10" style={{ paddingTop: 'var(--section-normal)', paddingBottom: 'var(--section-generous)' }}>
      <div className="max-w-7xl mx-auto px-[var(--container-px)]">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 lg:gap-24 items-start">
          <div>
            <span className="text-primary font-mono text-[10px] uppercase block mb-8 lg:mb-12 tracking-[0.3em]">04 // CONTACT</span>
            <h2
              className="font-display font-[900] text-foreground leading-[0.9] mb-8 lg:mb-12"
              style={{
                fontSize: 'clamp(2.5rem, 10vw, 7rem)',
                letterSpacing: 'var(--tracking-display)',
              }}
            >
              START A<br />
              <span className="text-primary italic">CONVERSATION</span>
            </h2>
            <p className="text-muted-foreground max-w-md mb-8 lg:mb-12 text-pretty" style={{ fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)' }}>
              Ready to collaborate on industrial-grade automation solutions. Open for discussions on framework architecture, quality strategy, and technical&nbsp;leadership.
            </p>
            
            <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
              <MapPin className="size-3 text-primary" />
              TIJUANA, MX // 32.5149° N, 117.0382° W
            </div>
          </div>

          <div className="grid gap-3 lg:gap-4">
            {contacts.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noopener noreferrer" : undefined}
                className="group relative flex flex-col p-5 lg:p-6 border border-border/50 hover:border-primary/40 transition-all duration-300 bg-foreground/[0.02] hover:bg-primary/[0.04] outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary/60 active:scale-[0.99] active:bg-primary/[0.06]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded group-hover:bg-primary/20 transition-all duration-300">
                      <contact.icon className="size-4 text-primary" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{contact.label}</span>
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="text-foreground font-display font-bold text-lg lg:text-xl group-hover:text-primary transition-colors break-words">
                  {contact.value}
                </div>
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary/60 group-hover:w-full transition-all duration-500 ease-out"></div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 border-t border-border bg-card">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground" style={{ letterSpacing: 'var(--tracking-mono)' }}>
        <div>&copy; {new Date().getFullYear()} CESAR GARCIA SANCHEZ</div>
        <div>DESIGNED FOR PERFORMANCE // REV.{new Date().toISOString().split('T')[0].replace(/-/g, '.')}</div>
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
    <div className="bg-background min-h-screen text-foreground font-sans selection:bg-primary/30 selection:text-primary">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <HeroSection />
      <main id="main-content">
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
      
      <button
        className={`fixed bottom-8 right-8 p-3 rounded-none bg-background/80 border border-border/50 backdrop-blur-md hover:bg-primary/[0.05] hover:border-primary/50 hover:shadow-[4px_4px_0px_rgba(var(--primary-rgb),0.2)] transition-all duration-300 z-50 ${isScrollTopVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}
