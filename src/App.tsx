import { useCallback, useEffect, useState } from "react";
import { HeroSection } from "@/components/blocks/hero-section-1";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const experiences = [
  {
    period: "2021 - PRESENT",
    company: "Thermo Fisher Scientific",
    role: "Engineer III, Software Quality Assurance",
    points: [
      "Designed and maintained automated test suites using Playwright and Selenium.",
      "Integrated automated testing into CI/CD pipelines (GitHub Actions).",
      "Applied AI-assisted testing approaches using Codex and Playwright MCP.",
      "Investigated production issues and performed root cause analysis (RCA).",
    ],
  },
  {
    period: "2020 - 2021",
    company: "BioSoft Integrators, Inc",
    role: "Software Quality Engineer",
    points: [
      "Wrote and executed automated test cases based on user stories.",
      "Performed API testing (REST, SOAP, JSON, XML) for web services.",
      "Conducted functional, regression, and usability testing.",
    ],
  },
  {
    period: "2019 - 2020",
    company: "Bajalogics",
    role: "Web Developer / QA Tester",
    points: [
      "Developed web application features using ASP.NET.",
      "Designed and executed test scenarios for application validation.",
    ],
  },
];

const skills = [
  {
    label: "Automation",
    items: ["Playwright", "Selenium", "Cypress"],
  },
  {
    label: "AI Implementation",
    items: ["Playwright MCP", "playwright-cli", "Codex Integration"],
    wide: true,
  },
  {
    label: "API / Test",
    items: ["Postman", "JMeter", "PostgreSQL"],
  },
  {
    label: "Programming",
    items: ["JavaScript", "Node.js", "Python"],
  },
  {
    label: "VCS / CI",
    items: ["GitHub Actions", "Jenkins", "Git"],
  },
  {
    label: "Methodologies",
    items: ["Agile / SCRUM", "RCA Execution", "eCommerce Systems"],
    wide: true,
  },
];

const contacts = [
  {
    href: "mailto:garcia.cpu@gmail.com",
    command: "EXE_EMAIL",
    value: "garcia.cpu@gmail.com",
  },
  {
    href: "https://wa.me/526642648910",
    command: "EXE_WHATSAPP",
    value: "+52 664 264 8910",
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/cesar-ogs/",
    command: "EXE_LINKEDIN",
    value: "in/cesar-ogs",
    external: true,
  },
  {
    href: "https://github.com/cesaroctavio",
    command: "EXE_GITHUB",
    value: "cesaroctavio",
    external: true,
  },
];

function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-primary font-mono text-sm uppercase tracking-wider mb-6 block">01 // Profile</span>
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          <div className="text-zinc-500 font-mono text-sm pt-2">ENGINEERING PHILOSOPHY</div>
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-white leading-tight">
              "Quality is the result of <span className="text-primary">intelligent effort</span>."
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
              With over 5 years in the field, I bridge the gap between rapid development and stable delivery. I do not
              just find bugs; I build the systems that prevent them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      {/* Background glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-30"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <span className="text-primary font-mono text-sm uppercase tracking-wider mb-12 block">02 // Experience Log</span>
        
        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <div key={i} className="group relative grid md:grid-cols-[1fr_3fr] gap-8 md:gap-12 items-start">
              {/* Timeline dot and line (desktop) */}
              <div className="hidden md:block absolute left-[24.5%] top-2 bottom-0 w-px bg-white/10 group-last:bg-transparent">
                <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-white/20 border-2 border-[#09090b] transition-colors group-hover:bg-primary z-10"></div>
              </div>
              
              <div className="text-zinc-500 font-mono text-sm pt-1">{exp.period}</div>
              
              <SpotlightCard className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{exp.company}</h3>
                <h4 className="text-primary font-medium mb-6">{exp.role}</h4>
                <ul className="space-y-3">
                  {exp.points.map((point, j) => (
                    <li key={j} className="text-zinc-400 flex items-start gap-3">
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
    <section id="skills" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <span className="text-primary font-mono text-sm uppercase tracking-wider mb-12 block">03 // Tech Stack</span>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <SpotlightCard key={i} className={`p-8 ${skill.wide ? 'md:col-span-2' : ''}`}>
              <div className="text-primary font-mono text-xs uppercase tracking-wider mb-6">
                {skill.label}
              </div>
              <div className="flex flex-wrap gap-3">
                {skill.items.map((item, j) => (
                  <span key={j} className="text-lg font-medium text-zinc-300">
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
    <section id="contact" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <SpotlightCard className="p-8 md:p-12 overflow-hidden">
          <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-primary/20 blur-[80px] rounded-full pointer-events-none opacity-50 translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-mono text-sm uppercase tracking-wider mb-4 block">04 // Handshake Protocol</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                INITIATE<br/>CONNECTION
              </h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                LOC: TIJUANA, MX
              </div>
            </div>
            
            <div className="space-y-3 font-mono text-sm">
              {contacts.map((contact, i) => (
                <a
                  key={i}
                  href={contact.href}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noreferrer" : undefined}
                  className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-600">&gt;</span>
                    <span className="text-primary">{contact.command}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-400 group-hover:text-white transition-colors">{contact.value}</span>
                    <svg className="w-4 h-4 text-zinc-600 group-hover:text-primary transition-colors transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </a>
              ))}
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
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-600">
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
