import React from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const cv = {
  href: "/Cesar_Garcia_CV_2026_Senior_QA.pdf",
  label: "Download CV (PDF)",
};

const menuItems = [
  { name: "Home", href: "#hero" },
  { name: "Experience", href: "#experience" },
  { name: "Approach", href: "#approach" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const credentials = [
  {
    label: "Now",
    value: "Engineer III, Software QA at Thermo Fisher Scientific, since 2021",
  },
  {
    label: "Scope",
    value: "17 country storefronts across B2B and B2C commerce",
  },
  {
    label: "Framework",
    value: "46+ Playwright specs built on 53 reusable page objects",
  },
  { label: "Track", value: "QA and web delivery since 2019" },
];

const ctaBase =
  "h-12 rounded-none px-6 text-sm font-bold transition-[transform,background-color,border-color,color] hover:-translate-y-0.5 md:h-14 md:px-9";
const ctaOutline = cn(
  ctaBase,
  "border-border/70 bg-background/80 text-foreground hover:border-primary/60 hover:bg-primary/[0.06] hover:text-primary",
);

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full max-w-full overflow-hidden pb-16 pt-28 md:pb-24 md:pt-40"
    >
      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-[var(--container-px)] lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
        <div className="hero-copy min-w-0">
          <h1
            className="mb-6 max-w-5xl break-words font-display font-[900] leading-[0.92] text-foreground"
            style={{ fontSize: "clamp(2.7rem, 8vw, 5.15rem)" }}
          >
            Cesar Octavio Garcia Sanchez
          </h1>

          <p className="mb-4 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-primary md:text-base">
            Senior QA Automation Engineer
          </p>

          <p className="max-w-4xl font-display text-[clamp(1.45rem,4vw,2.4rem)] font-[900] leading-[1.05] text-foreground">
            Commerce quality at scale.
          </p>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
            I turn failed flows into clear cause, practical evidence, and a
            release decision teams can act on.
          </p>

          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button
              asChild
              size="lg"
              className={cn(
                ctaBase,
                "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-foreground",
              )}
            >
              <a href={cv.href} download>
                {cv.label}
              </a>
            </Button>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-4">
              <Button asChild size="lg" variant="outline" className={ctaOutline}>
                <a href="#experience">View experience</a>
              </Button>
              <Button asChild size="lg" variant="outline" className={ctaOutline}>
                <a href="#contact">Contact</a>
              </Button>
            </div>
          </div>
        </div>

        <dl className="hero-panel border-t border-border/50 text-sm">
          {credentials.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-border/35 py-3.5"
            >
              <dt className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {item.label}
              </dt>
              <dd className="font-medium leading-snug text-foreground">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      },
    );

    menuItems.forEach((item) => {
      const el = document.getElementById(item.href.replace("#", ""));
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
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
    <header>
      <nav className="fixed top-4 z-50 w-full px-4">
        <div
          className={cn(
            "relative z-[70] mx-auto max-w-5xl rounded-full border border-border/40 bg-background/85 px-5 transition-[background-color,border-color,box-shadow] duration-300 md:px-6",
            isScrolled &&
              "border-primary/25 bg-background/95 shadow-[var(--shadow-nav-scrolled)]",
          )}
        >
          <div className="relative flex items-center justify-between gap-6 py-3">
            <a
              href="#hero"
              aria-label="Cesar Octavio Garcia Sanchez - Portfolio Home"
              className="z-[60] flex min-h-11 items-center space-x-2"
            >
              <Logo />
            </a>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 font-mono text-xs font-semibold uppercase tracking-[0.08em]">
                {menuItems.map((item) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          "relative inline-flex min-h-11 min-w-11 items-center justify-center py-1 transition-colors duration-200",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <span>{item.name}</span>
                        {isActive && (
                          <div className="absolute -bottom-1 left-0 right-0 h-px rounded-full bg-primary/50" />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex items-center gap-4">
              {/* Hidden while the hero's own CV button is on screen */}
              <div
                className={cn(
                  "hidden transition-[opacity,visibility] duration-300 lg:block",
                  activeSection === "hero" && "invisible opacity-0",
                )}
              >
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="min-h-11 rounded-full border-primary/40 bg-transparent px-5 font-semibold text-primary hover:border-primary hover:bg-primary/[0.08] hover:text-primary"
                >
                  <a href={cv.href} download>
                    <span>{cv.label}</span>
                  </a>
                </Button>
              </div>

              <button
                ref={menuButtonRef}
                type="button"
                onClick={toggleMenu}
                aria-controls={mobileMenuId}
                aria-expanded={menuState}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-[60] flex h-11 w-11 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground lg:hidden"
              >
                {menuState ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>

        {menuState && (
            <div
              id={mobileMenuId}
              ref={mobileMenuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="mobile-menu-panel fixed inset-0 z-[55] flex h-[100dvh] w-full flex-col bg-background p-8 pt-24 lg:hidden"
            >
              <div className="flex flex-col gap-8">
                {menuItems.map((item, index) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => closeMenu(false)}
                      style={{ "--menu-index": index } as React.CSSProperties}
                      className={cn(
                        "mobile-menu-link group flex items-center justify-between py-2 font-display text-4xl font-[900] tracking-normal",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground transition-colors hover:text-foreground",
                      )}
                    >
                      <span className="transition-transform duration-300 group-hover:translate-x-2">
                        {item.name}
                      </span>
                      <ArrowUpRight
                        className={cn(
                          "size-6 -translate-x-4 opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-100",
                          isActive && "translate-x-0 opacity-100",
                        )}
                      />
                    </a>
                  );
                })}
              </div>

              <div className="mt-auto pb-12">
                <Button
                  asChild
                  size="lg"
                  className="h-16 w-full rounded-none text-lg font-bold"
                >
                  <a
                    href={cv.href}
                    download
                    onClick={() => closeMenu(false)}
                  >
                    {cv.label}
                  </a>
                </Button>
              </div>
            </div>
        )}
      </nav>
    </header>
  );
};

const Logo = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 font-display text-xl font-[900] text-foreground",
        className,
      )}
    >
      <div className="relative flex size-5 items-center justify-center">
        <div className="absolute inset-0 rounded-sm border-[1.5px] border-primary/50" />
        <div className="size-1 rounded-full bg-primary" />
        <div className="absolute left-1/2 top-0 h-1.5 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-primary/70" />
        <div className="absolute bottom-0 left-1/2 h-1.5 w-0.5 -translate-x-1/2 translate-y-1/2 bg-primary/70" />
        <div className="absolute left-0 top-1/2 h-0.5 w-1.5 -translate-x-1/2 -translate-y-1/2 bg-primary/70" />
        <div className="absolute right-0 top-1/2 h-0.5 w-1.5 -translate-y-1/2 translate-x-1/2 bg-primary/70" />
      </div>
      <div className="flex items-baseline">
        <span>CESAR</span>
        <span className="ml-1 font-mono text-sm font-[500] uppercase tracking-[0.1em] text-primary/85">
          OGS
        </span>
      </div>
    </div>
  );
};
