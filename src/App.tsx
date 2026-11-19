import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy } from "lucide-react";
import { HeroHeader, HeroSection } from "@/components/blocks/hero-section-1";
import { contactEmail, contacts, cv, skillRows, triageSteps } from "@/content";

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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const stagger = (d: number) => ({ "--d": d }) as React.CSSProperties;

function Triage() {
  return (
    <section id="approach" className="section" aria-labelledby="approach-title">
      <div className="container triage">
        <div>
          <div className="section__head" data-reveal>
            <h2 id="approach-title">What happens when a check fails</h2>
            <p className="lead">
              Every failure is traced, classified and handed over with a next
              action.
            </p>
          </div>
          <ol className="steps">
            {triageSteps.map((step, i) => (
              <li key={step.label} data-reveal style={stagger(i + 1)}>
                <h3>{step.label}</h3>
                <p>{step.value}</p>
              </li>
            ))}
          </ol>
        </div>

        <figure
          data-reveal
          style={stagger(2)}
          className="code"
          data-slot="code"
          data-kind="product"
          data-alt="A real excerpt from a public Playwright repo: a setup project or a page object"
        >
          <figcaption>
            <span className="code__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            A simplified sketch of the PunchOut setup pattern, written for this
            page
          </figcaption>
          <pre>
            <code>
              <span className="c">{"// punchout.setup.ts"}</span>
              {"\n"}
              <span className="k">import</span>
              {" { test as setup, expect } "}
              <span className="k">from</span> <span className="s">{"'@playwright/test'"}</span>;{"\n"}
              <span className="k">import</span>
              {" { PunchOutSession } "}
              <span className="k">from</span> <span className="s">{"'./pages/punchout-session'"}</span>;{"\n"}
              <span className="k">import</span>
              {" AxeBuilder "}
              <span className="k">from</span> <span className="s">{"'@axe-core/playwright'"}</span>;{"\n\n"}
              {"setup("}
              <span className="s">{"'B2B PunchOut session'"}</span>
              {", "}
              <span className="k">async</span>
              {" ({ page, request }) => {\n"}
              {"  "}
              <span className="k">const</span>
              {" session = "}
              <span className="k">new</span>
              {" PunchOutSession(page, request);\n"}
              {"  "}
              <span className="k">await</span>
              {" session.start({ storefront: "}
              <span className="s">{"'us'"}</span>
              {", buyer: "}
              <span className="s">{"'example-buyer'"}</span>
              {" });\n\n"}
              {"  "}
              <span className="k">await</span>
              {" expect(page.getByRole("}
              <span className="s">{"'heading'"}</span>
              {", { name: "}
              <span className="s">{"'Cart'"}</span>
              {" })).toBeVisible();\n"}
              {"  "}
              <span className="k">const</span>
              {" a11y = "}
              <span className="k">await</span>
              {" "}
              <span className="k">new</span>
              {" AxeBuilder({ page }).analyze();\n"}
              {"  expect(a11y.violations).toEqual([]);\n\n"}
              {"  "}
              <span className="k">await</span>
              {" page.context().storageState({ path: "}
              <span className="s">{"'.auth/punchout-us.json'"}</span>
              {" });\n"}
              {"});"}
            </code>
          </pre>
        </figure>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section section--band" aria-labelledby="skills-title">
      <div className="container">
        <div className="section__head" data-reveal>
          <h2 id="skills-title">Tools, by the risk they cover</h2>
        </div>
        <div className="skills-card" data-reveal style={stagger(1)}>
        <table className="skills">
          <thead>
            <tr>
              <th scope="col">Risk</th>
              <th scope="col">How it is covered</th>
              <th scope="col">Tools</th>
            </tr>
          </thead>
          <tbody>
            {skillRows.map((row) => (
              <tr key={row.title}>
                <td className="skills__area">{row.title}</td>
                <td className="skills__body">{row.body}</td>
                <td className="skills__tools">
                  <ul className="chips">
                    {row.tools.split(", ").map((tool) => (
                      <li key={tool} className="chip">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
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
            <h2 id="contact-title">Open to remote US teams</h2>
            <p className="lead">
              Pacific Time, based in Tijuana. QA automation architecture,
              framework stabilization and quality strategy.
            </p>
          </div>
          <div className="contact-card__actions">
            <a className="btn" href={`mailto:${contactEmail}`}>
              Email me
              <ArrowUpRight className="btn__arrow" aria-hidden="true" />
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
              CV (PDF)
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
        <Triage />
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
