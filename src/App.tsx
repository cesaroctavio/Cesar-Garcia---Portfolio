import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy, Download } from "lucide-react";
import { HeroHeader, HeroSection } from "@/components/blocks/hero-section-1";
import {
  caseStudies,
  contactEmail,
  contacts,
  cv,
  projects,
  siteTests,
  stack,
} from "@/content";

// Fades sections in as they enter the viewport. Elements opt in with data-reveal; --d staggers siblings.
function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => (el.dataset.revealed = "true"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.revealed = "true";
          observer.unobserve(entry.target);
        });
      },
      // Fire just before a block enters, so a fast skim never lands on an empty section.
      { rootMargin: "0px 0px 15% 0px", threshold: 0 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const stagger = (d: number) => ({ "--d": d }) as React.CSSProperties;

function CaseStudies() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <div className="section__head" data-reveal>
          <p className="eyebrow">Case studies</p>
          <h2 id="work-title">Problems I've solved</h2>
          <p className="lead">
            Three real situations from commerce QA: what was wrong, what I did
            and what changed.
          </p>
        </div>
        <ol className="cases">
          {caseStudies.map((item, i) => (
            <li key={item.title} className="case" data-reveal style={stagger(i + 1)}>
              <h3 className="case__title">{item.title}</h3>
              <dl className="case__body">
                <div>
                  <dt>Problem</dt>
                  <dd>{item.problem}</dd>
                </div>
                <div>
                  <dt>What I did</dt>
                  <dd>{item.approach}</dd>
                </div>
                <div className="case__result">
                  <dt>Result</dt>
                  <dd>{item.result}</dd>
                </div>
              </dl>
              <ul className="chips case__tools" aria-label="Tools">
                {item.tools.map((tool) => (
                  <li key={tool} className="chip">
                    {tool}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        {projects.map((project, i) => (
          <a
            key={project.href}
            className="repo"
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            style={stagger(4 + i)}
          >
            <span className="repo__text">
              <span className="eyebrow">{project.eyebrow}</span>
              <span className="repo__name">{project.name}</span>
              <span className="repo__body">{project.body}</span>
            </span>
            <span className="repo__cta">
              {project.cta}
              <ArrowUpRight className="btn__arrow" aria-hidden="true" />
            </span>
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        ))}
        <p className="repo-note" data-reveal style={stagger(4 + projects.length)}>
          This site is tested too:{" "}
          <a className="text-link" href={siteTests.href} target="_blank" rel="noopener noreferrer">
            {siteTests.label}
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>{" "}
          checks accessibility in both themes, text at 200% and touch target sizes.
        </p>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <div className="section__head" data-reveal>
          <p className="eyebrow">Stack</p>
          <h2 id="skills-title">Tools I use</h2>
        </div>
        <dl className="skills-card stack" data-reveal style={stagger(1)}>
          {stack.map((row) => (
            <div key={row.area} className="stack__row">
              <dt className="stack__area">{row.area}</dt>
              <dd>
                <ul className="chips">
                  {row.tools.split(", ").map((tool) => (
                    <li key={tool} className="chip">
                      {tool}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

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
    <div className="contact__copy">
      <button type="button" onClick={copy} className="btn btn--quiet">
        <Icon width={16} height={16} aria-hidden="true" />
        Copy email
      </button>
      <p
        role="status"
        aria-live="polite"
        className="contact__status"
        data-state={status}
      >
        {status === "copied" && "Copied to clipboard."}
        {status === "failed" &&
          "Couldn’t copy automatically. The address above is selected, so copy it from there."}
      </p>
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-card" data-reveal>
          <div className="contact-card__head">
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">Open to remote US teams</h2>
            <p className="lead">
              Based in Tijuana on Pacific Time, working with distributed Agile
              teams in the US and offshore. B.Eng. in Computer Engineering.
            </p>
          </div>
          <div className="contact-card__actions">
            <a className="btn" href={`mailto:${contactEmail}`}>
              Email me
              <ArrowUpRight className="btn__arrow" aria-hidden="true" />
            </a>
            <a className="btn btn--quiet" href={cv.href} download>
              <Download aria-hidden="true" />
              {cv.label}
            </a>
            <CopyEmailButton />
          </div>
          <a id="contact-email" className="contact__email" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          <ul className="channels">
            {contacts.map((contact) => (
              <li key={contact.href}>
                <a href={contact.href} target="_blank" rel="noopener noreferrer">
                  <span>{contact.label}</span>
                  <span>{contact.value}</span>
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__sign">
          <p className="footer__name">Cesar Octavio Garcia Sanchez</p>
          <p className="footer__place">
            Tijuana, Baja California, {new Date().getFullYear()}
          </p>
        </div>
        <ul className="footer__links">
          <li>
            <a className="text-link" href={cv.href} download>
              {cv.label}
            </a>
          </li>
          <li>
            <a className="text-link" href="https://www.linkedin.com/in/cesar-ogs/" target="_blank" rel="noopener noreferrer">
              LinkedIn<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a className="text-link" href="https://github.com/cesaroctavio" target="_blank" rel="noopener noreferrer">
              GitHub<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default function App() {
  useScrollReveal();
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrollTopVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip">
        Skip to content
      </a>
      <HeroHeader />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <CaseStudies />
        <Skills />
        <Contact />
      </main>
      <Footer />

      {isScrollTopVisible && (
        <button
          type="button"
          data-scroll-top
          className="to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <ArrowUp aria-hidden="true" />
        </button>
      )}
    </>
  );
}
