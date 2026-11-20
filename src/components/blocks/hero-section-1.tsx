import React from "react";
import { ArrowUpRight, Download, Menu, Moon, Plus, Sun, X } from "lucide-react";
import { contactEmail, cv, experiences, menuItems, stats } from "@/content";

// Dark is the default; light is opt-in and remembered. index.html applies it before paint.
function ThemeToggle() {
  const [isLight, setIsLight] = React.useState(
    () => document.documentElement.dataset.theme === "light",
  );

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    if (next) document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    // Read the page colour from the tokens so the browser bar never drifts from tokens.css.
    const paper = getComputedStyle(document.documentElement).getPropertyValue("--color-paper").trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", paper);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      /* storage blocked: theme still applies for this visit */
    }
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      {isLight ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
    </button>
  );
}

// Counts up to the real value once the number scrolls into view. Without motion it just shows the value.
function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = React.useState(value);

  React.useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduce || !("IntersectionObserver" in window)) return;
    setShown(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="num">
      <span aria-hidden="true">
        {shown}
        {suffix}
      </span>
      <span className="visually-hidden">
        {value}
        {suffix}
      </span>
    </span>
  );
}

function Stats() {
  return (
    <dl
      className="stats hero__fade"
      style={{ "--delay": "650ms" } as React.CSSProperties}
      aria-label="At a glance"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="stat">
          <dt className="stat__label">{stat.label}</dt>
          <dd className="stat__value">
            <CountUp value={stat.value} suffix={stat.suffix} />
          </dd>
          <dd className="stat__note">{stat.note}</dd>
        </div>
      ))}
    </dl>
  );
}

// Splits a phrase into words that blur in one after another; `start` continues the stagger across lines.
function Words({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <React.Fragment key={word + i}>
          {i > 0 && " "}
          <span className="word" style={{ "--i": start + i } as React.CSSProperties}>
            {word}
          </span>
        </React.Fragment>
      ))}
    </>
  );
}

function Highlighted({ text, terms }: { text: string; terms?: string[] }) {
  if (!terms?.length) return <>{text}</>;
  const escaped = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`));
  return (
    <>
      {parts.map((part, i) =>
        terms.includes(part) ? <strong key={i}>{part}</strong> : part,
      )}
    </>
  );
}

export function HeroSection() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero__backdrop" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__head">
          <p className="eyebrow eyebrow--pill hero__fade">
            <span className="eyebrow__dot" aria-hidden="true" />
            Open to remote US teams
          </p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">
              <Words text="Senior QA" start={0} />
            </span>{" "}
            <span className="hero__line hero__accent">
              <Words text="automation engineer" start={2} />
            </span>
          </h1>
          <div className="hero__row">
            <p
              className="lead hero__lede hero__fade"
              style={{ "--delay": "450ms" } as React.CSSProperties}
            >
              I'm Cesar Garcia. I build the Playwright suites behind Thermo
              Fisher's storefront releases, from Tijuana.
            </p>
            <div
              className="hero__actions hero__fade"
              style={{ "--delay": "550ms" } as React.CSSProperties}
            >
              <a className="btn" href={cv.href} download>
                <Download aria-hidden="true" />
                {cv.label}
              </a>
              <a className="btn btn--quiet" href={`mailto:${contactEmail}`}>
                Email me
                <ArrowUpRight className="btn__arrow" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <Stats />

        <div id="experience" className="experience">
          <div className="section__head section__head--compact" data-reveal>
            <p className="eyebrow">Experience</p>
            <h2>Where I've worked</h2>
            <p className="lead">Open a role to see what I did there.</p>
          </div>
          <div className="roles" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
          <ol className="roles__list">
            {experiences.map((exp) => (
              <li key={exp.company} className="role">
                <details className="role__details">
                  <summary className="role__summary">
                    <span className="role__period num">{exp.period}</span>
                    <span className="role__name">
                      <h3 className="role__company">{exp.company}</h3>
                      <span className="role__title">{exp.role}</span>
                    </span>
                    <span className="role__proof">{exp.proof}</span>
                    <Plus className="role__icon" aria-hidden="true" />
                  </summary>
                  <ul className="role__points">
                    {exp.points.map((point) => (
                      <li key={point}>
                        <Highlighted text={point} terms={exp.highlights} />
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("hero");
  const menuButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = React.useRef<HTMLDivElement | null>(null);
  const shouldRestoreFocusRef = React.useRef(false);
  const mobileMenuId = "mobile-navigation";

  const closeMenu = React.useCallback((restoreFocus = true) => {
    shouldRestoreFocusRef.current = restoreFocus;
    setMenuState(false);
  }, []);

  const toggleMenu = () => {
    shouldRestoreFocusRef.current = true;
    setMenuState((isOpen) => !isOpen);
  };

  React.useEffect(() => {
    // The active section is the last one whose top has passed a reading line at 40% of the
    // viewport. A fixed band near the top misread sections separated by tall padding.
    // Every section is tracked (not only nav items), so Triage clears the "Work" highlight.
    const sectionIds = ["hero", "experience", "work", "approach", "skills", "about", "contact"];
    let frame = 0;

    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 50);
      const line = window.innerHeight * 0.4;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = "hero";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActiveSection(atBottom ? sectionIds[sectionIds.length - 1] : current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  React.useEffect(() => {
    if (!menuState) return;

    const guardedElements = [
      document.getElementById("main-content"),
      document.querySelector("footer"),
      document.querySelector("[data-scroll-top]"),
    ]
      .filter((element): element is HTMLElement => element instanceof HTMLElement)
      .map((element) => ({
        element,
        hadInert: element.hasAttribute("inert"),
        previousAriaHidden: element.getAttribute("aria-hidden"),
      }));

    const previousOverflow = document.body.style.overflow;
    guardedElements.forEach(({ element }) => {
      element.setAttribute("inert", "");
      element.setAttribute("aria-hidden", "true");
    });
    document.body.style.overflow = "hidden";

    return () => {
      guardedElements.forEach(({ element, hadInert, previousAriaHidden }) => {
        if (hadInert) {
          element.setAttribute("inert", "");
        } else {
          element.removeAttribute("inert");
        }

        if (previousAriaHidden === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", previousAriaHidden);
        }
      });
      document.body.style.overflow = previousOverflow;
    };
  }, [menuState]);

  React.useEffect(() => {
    if (!menuState) return;

    const previousActiveElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const getFocusableElements = () =>
      [menuButtonRef.current, ...Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      )].filter((element): element is HTMLElement => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          style.display !== "none" &&
          style.visibility !== "hidden"
        );
      });

    menuButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (!focusableElements.length) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (shouldRestoreFocusRef.current) {
        const restoreTarget =
          previousActiveElement &&
          previousActiveElement !== document.body &&
          previousActiveElement !== document.documentElement &&
          previousActiveElement.isConnected
            ? previousActiveElement
            : menuButtonRef.current;

        restoreTarget?.focus();
      }
    };
  }, [closeMenu, menuState]);

  return (
    <header className="site-nav" data-scrolled={isScrolled ? "true" : undefined}>
      <div className="container">
      <nav className="site-nav__bar" aria-label="Primary">
        <a href="#hero" className="wordmark" aria-label="Cesar Garcia, back to top">
          Cesar Garcia
        </a>

        <ul className="site-nav__links">
          {menuItems.filter((item) => item.href !== "#contact").map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className="site-nav__link"
                >
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="site-nav__end">
          <ThemeToggle />
          <a
            className="site-nav__action"
            href="#contact"
            aria-current={activeSection === "contact" ? "location" : undefined}
          >
            Contact
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={toggleMenu}
            aria-controls={mobileMenuId}
            aria-expanded={menuState}
            aria-label={menuState ? "Close menu" : "Open menu"}
            className="site-nav__toggle"
          >
            {menuState ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>
      </div>

      {menuState && (
        <div
          id={mobileMenuId}
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="menu-sheet"
        >
          <ul className="menu-sheet__links">
            {menuItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => closeMenu(false)}
                    className="menu-sheet__link"
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="menu-sheet__actions">
            <a className="btn" href={cv.href} download onClick={() => closeMenu(false)}>
              <Download aria-hidden="true" />
              {cv.label}
            </a>
            <a
              className="btn btn--quiet"
              href={`mailto:${contactEmail}`}
              onClick={() => closeMenu(false)}
            >
              Email me
              <ArrowUpRight className="btn__arrow" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
