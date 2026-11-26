import React from "react";
import {
  ArrowUpRight,
  Briefcase,
  ChevronRight,
  Download,
  FolderKanban,
  Mail,
  Moon,
  Plus,
  Sun,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { contactEmail, cv, experiences, menuItems, stats } from "@/content";
import { CheckpointDemo } from "@/components/demo/CheckpointDemo";

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
            <span className="num">
              {stat.value}
              {stat.suffix}
            </span>
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
            Remote for US teams · Pacific Time
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
              I'm Cesar Garcia. I began as a developer, testing my own work,
              and the testing part won. Today I build the Playwright suites
              behind Thermo Fisher's storefront releases.
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

        <div className="hero__demo">
          <CheckpointDemo />
        </div>

        <Stats />

        <div id="experience" className="experience">
          <div className="section__head section__head--compact" data-reveal>
            <p className="eyebrow">Experience</p>
            <h2>Where I've worked</h2>
            <p className="lead">Open a role for the details.</p>
          </div>
          <div className="roles" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
          <ol className="roles__list">
            {experiences.map((exp, i) => (
              <li key={exp.company} className="role">
                {/* The current role starts open so a quick scan still sees its bullets. */}
                <details className="role__details" open={i === 0}>
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

// One icon per section in the mobile menu.
const menuIcons: Record<string, LucideIcon> = {
  "#experience": Briefcase,
  "#work": FolderKanban,
  "#skills": Wrench,
  "#contact": Mail,
};

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
    const sectionIds = ["hero", "experience", "work", "skills", "contact"];
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

    // Lock scroll on <html>, not <body>: an overflow-hidden body becomes its own scroll container,
    // which unsticks the nav and jumps the page.
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    guardedElements.forEach(({ element }) => {
      element.setAttribute("inert", "");
      element.setAttribute("aria-hidden", "true");
    });
    root.style.overflow = "hidden";

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
      root.style.overflow = previousOverflow;
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

    // preventScroll: the toggle sits inside scroll-padding-top, so a plain focus() scrolls the page.
    menuButtonRef.current?.focus({ preventScroll: true });

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

        restoreTarget?.focus({ preventScroll: true });
      }
    };
  }, [closeMenu, menuState]);

  return (
    <header className="site-nav" data-scrolled={isScrolled ? "true" : undefined}>
      <div className="container">
      <nav className="site-nav__bar" aria-label="Primary">
        <a href="#hero" className="wordmark" aria-label="Cesar Garcia, back to top">
          <span className="wordmark__text">Cesar Garcia</span>
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
            <span className="burger" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </nav>
      </div>

      {/* Always mounted so closing can animate; inert and hidden from assistive tech while closed. */}
      <div
        className="menu-backdrop keep-motion"
        data-state={menuState ? "open" : "closed"}
        onClick={() => closeMenu(true)}
        aria-hidden="true"
      />
      <div
        id={mobileMenuId}
        ref={mobileMenuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!menuState}
        inert={!menuState}
        data-state={menuState ? "open" : "closed"}
        className="menu-sheet keep-motion"
      >
        <ul className="menu-sheet__links">
          {menuItems.map((item, i) => {
            const isActive = activeSection === item.href.replace("#", "");
            const Icon = menuIcons[item.href] ?? ChevronRight;
            return (
              <li key={item.href} className="menu-sheet__item" style={{ "--i": i } as React.CSSProperties}>
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  onClick={() => closeMenu(false)}
                  className="menu-sheet__link"
                >
                  <span className="menu-sheet__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  {item.name}
                  {isActive && <span className="menu-sheet__dot" aria-hidden="true" />}
                  <ChevronRight className="menu-sheet__chevron" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
        <div
          className="menu-sheet__actions menu-sheet__item"
          style={{ "--i": menuItems.length } as React.CSSProperties}
        >
          <a className="btn" href={cv.href} download onClick={() => closeMenu(false)}>
            <Download aria-hidden="true" />
            {cv.label}
          </a>
          <a className="btn btn--quiet" href={`mailto:${contactEmail}`} onClick={() => closeMenu(false)}>
            Email me
            <ArrowUpRight className="btn__arrow" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
};
