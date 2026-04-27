import { useCallback, useEffect, useState } from "react";
import { HeroSection } from "@/components/blocks/hero-section-1";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Mail, MessageCircle, ArrowUpRight, MapPin } from "lucide-react";

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
    command: "EXE_EMAIL",
    value: "garcia.cpu@gmail.com",
    label: "Email",
    icon: Mail,
  },
  {
    href: "https://wa.me/526642648910",
    command: "EXE_WHATSAPP",
    value: "+52 664 264 8910",
    label: "WhatsApp",
    icon: MessageCircle,
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/cesar-ogs/",
    command: "EXE_LINKEDIN",
    value: "in/cesar-ogs",
    label: "LinkedIn",
    icon: LinkedinIcon,
    external: true,
  },
  {
    href: "https://github.com/cesaroctavio",
    command: "EXE_GITHUB",
    value: "cesaroctavio",
    label: "GitHub",
    icon: GithubIcon,
    external: true,
  },
];

function About() {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <span className="text-primary font-mono text-sm uppercase tracking-wider mb-6 block">01 // Profile</span>
        <div className="grid md:grid-cols-[1fr_2fr] gap-6 sm:gap-12 items-start">
          <div className="text-zinc-500 font-mono text-sm pt-2">ENGINEERING PHILOSOPHY</div>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-6 sm:mb-8 text-white leading-tight">
              "Quality is the result of <span className="text-primary">intelligent effort</span>."
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl">
              QA Automation Engineer with 5+ years of experience building and maintaining automated test solutions for eCommerce platforms. Strong hands-on background in Playwright, Selenium, JavaScript/Node.js, API testing, and CI/CD integration across B2B, B2C, and content validation workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24 relative">
      {/* Background glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-30"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <span className="text-primary font-mono text-sm uppercase tracking-wider mb-8 sm:mb-12 block">02 // Experience Log</span>
        
        <div className="space-y-8 sm:space-y-12">
          {experiences.map((exp, i) => (
            <div key={i} className="group relative grid md:grid-cols-[1fr_3fr] gap-4 sm:gap-8 md:gap-12 items-start">
              {/* Timeline dot and line (desktop) */}
              <div className="hidden md:block absolute left-[24.5%] top-2 bottom-0 w-px bg-white/10 group-last:bg-transparent">
                <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-white/20 border-2 border-[#09090b] transition-colors group-hover:bg-primary z-10"></div>
              </div>
              
              <div className="text-zinc-500 font-mono text-xs sm:text-sm pt-1">{exp.period}</div>
              
              <SpotlightCard className="p-5 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{exp.company}</h3>
                <h4 className="text-primary font-medium text-sm sm:text-base mb-4 sm:mb-6">{exp.role}</h4>
                <ul className="space-y-2 sm:space-y-3">
                  {exp.points.map((point, j) => (
                    <li key={j} className="text-zinc-400 text-sm sm:text-base flex items-start gap-2 sm:gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-600 flex-shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <span className="text-primary font-mono text-sm uppercase tracking-wider mb-8 sm:mb-12 block">03 // Tech Stack</span>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skills.map((skill, i) => (
            <SpotlightCard key={i} className={`p-5 sm:p-8 ${skill.wide ? 'sm:col-span-2' : ''}`}>
              <div className="text-primary font-mono text-xs uppercase tracking-wider mb-4 sm:mb-6">
                {skill.label}
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {skill.items.map((item, j) => (
                  <span key={j} className="text-sm sm:text-base font-medium text-zinc-300 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5">
                    {item}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SpotlightCard className="p-6 sm:p-8 md:p-12 overflow-hidden">
          {/* Dual ambient glows */}
          <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-40 translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute left-0 bottom-0 w-[200px] h-[200px] bg-primary/10 blur-[80px] rounded-full pointer-events-none opacity-30 -translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10 grid md:grid-cols-[2fr_3fr] gap-8 md:gap-12 items-start">
            {/* Left — Header */}
            <div>
              <span className="text-primary font-mono text-sm uppercase tracking-wider mb-4 block">04 // Handshake Protocol</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                INITIATE<br/>CONNECTION
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6 max-w-xs hidden sm:block">
                Ready to collaborate on your next project. Reach out through any channel below.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-mono text-zinc-400">
                <MapPin className="w-3 h-3 text-primary" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                TIJUANA, MX
              </div>
            </div>
            
            {/* Right — Contact links */}
            <div className="space-y-3">
              {contacts.map((contact, i) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={i}
                    href={contact.href}
                    target={contact.external ? "_blank" : undefined}
                    rel={contact.external ? "noreferrer" : undefined}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/40 hover:bg-primary/[0.06] transition-all duration-200 group cursor-pointer"
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    
                    {/* Text */}
                    <div className="flex-1 min-w-0 font-mono">
                      <div className="text-[10px] sm:text-xs text-zinc-600 uppercase tracking-wider">{contact.label}</div>
                      <div className="text-sm sm:text-base text-zinc-300 group-hover:text-white transition-colors truncate">{contact.value}</div>
                    </div>
                    
                    {/* Arrow */}
                    <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-zinc-600 group-hover:text-primary transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 mt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-600">
        <div>&copy; {new Date().getFullYear()} CESAR GARCIA SANCHEZ</div>
        <div>DESIGNED FOR PERFORMANCE // 2026.04.26</div>
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
    <div className="bg-[#09090b] min-h-screen text-zinc-100 font-sans selection:bg-primary/30 selection:text-primary">
      <HeroSection />
      <main id="main-content">
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
      
      <button
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur hover:bg-white/10 hover:border-primary/50 transition-all duration-300 z-50 ${isScrollTopVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}
