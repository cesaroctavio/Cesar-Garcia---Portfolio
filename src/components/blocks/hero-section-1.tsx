import React from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const cvDownloadHref = "/Cesar_Garcia_CV_2026_Senior_QA_Updated.docx";

const menuItems = [
  { name: "Home", href: "#hero" },
  { name: "Proof", href: "#proof" },
  { name: "Capabilities", href: "#capabilities" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

function HeroTelemetryVisual() {
  const statusRows = [
    ["shopping-flow", "trace", "stable"],
    ["quote-v2", "network", "review"],
    ["returns", "guard", "ready"],
    ["aem-content", "region", "synced"],
  ];

  return (
    <div className="relative h-full p-5 md:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,oklch(var(--primary)/0.18),transparent_26%),radial-gradient(circle_at_82%_62%,oklch(var(--accent)/0.12),transparent_30%)]" />
      <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-4">
        <div className="flex items-center justify-between border border-border/35 bg-background/75 px-4 py-3">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Release control
            </p>
            <p className="mt-1 font-display text-xl font-[900] leading-none text-foreground">
              QA telemetry live
            </p>
          </div>
          <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[var(--shadow-signal-glow)]" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden border border-border/35 bg-background/70 p-4">
            <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              <span>Trace map</span>
              <span>17 markets</span>
            </div>
            <div className="relative h-[13rem]">
              {["Auth", "Cart", "Quote", "Return", "AEM"].map(
                (node, index) => (
                  <div
                    key={node}
                    className="absolute border border-border/45 bg-card/90 px-2.5 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-foreground"
                    style={{
                      left: `${(index % 2) * 43 + 4}%`,
                      top: `${index * 18 + 2}%`,
                    }}
                  >
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                    {node}
                  </div>
                ),
              )}
              <span className="absolute left-[19%] top-[18%] h-px w-[52%] rotate-[24deg] bg-primary/35" />
              <span className="absolute left-[22%] top-[48%] h-px w-[56%] -rotate-[18deg] bg-primary/25" />
              <span className="absolute left-[18%] top-[75%] h-px w-[58%] rotate-[13deg] bg-primary/25" />
            </div>
          </div>

          <div className="grid gap-3">
            {statusRows.map(([name, signal, state]) => (
              <div
                key={name}
                className="grid grid-cols-[1fr_auto] gap-4 border border-border/35 bg-background/70 px-4 py-3 font-mono text-[11px]"
              >
                <div>
                  <p className="font-semibold uppercase tracking-[0.08em] text-foreground">
                    {name}
                  </p>
                  <p className="mt-1 text-muted-foreground">{signal}</p>
                </div>
                <p className="text-primary">{state}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border/35 bg-background/75 p-4">
          <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            <span>Suite signal</span>
            <span>classification</span>
          </div>
          <div className="flex h-14 items-end gap-2">
            {[32, 66, 48, 82, 58, 92, 44, 76, 62, 88].map((height, index) => (
              <span
                key={index}
                className="flex-1 bg-primary/30"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100svh-1rem)] w-full max-w-full overflow-hidden pt-20 md:pt-28 lg:pt-[5.5rem]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.026]"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(var(--border) / 0.7) 1px, transparent 1px), linear-gradient(to bottom, oklch(var(--border) / 0.7) 1px, transparent 1px)",
            backgroundSize: "5rem 5rem",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/78 to-background" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-[var(--container-px)] pb-8 pt-8 md:gap-14 md:pb-14 md:pt-14 lg:grid-cols-[1.14fr_0.86fr] lg:gap-14 lg:pb-8 lg:pt-8">
        <div className="hero-copy relative min-w-0">
          <div>
            <h1
              className="mb-5 max-w-5xl break-words font-display font-[900] leading-[0.92] tracking-normal text-foreground md:mb-6"
              style={{ fontSize: "clamp(2.7rem, 8vw, 5.15rem)" }}
            >
              Cesar Octavio Garcia Sanchez
            </h1>

            <p className="mb-4 max-w-lg font-mono text-sm font-semibold uppercase tracking-[0.12em] text-primary/80 md:text-base">
              Senior QA Automation Engineer
            </p>

            <p className="max-w-4xl font-display text-[clamp(1.45rem,4.6vw,2.65rem)] font-[900] leading-[1.02] text-primary/90 lg:text-[clamp(1.8rem,3vw,2.55rem)]">
              Commerce quality at scale.
            </p>

            <p className="mt-5 max-w-full text-base leading-relaxed text-muted-foreground md:mt-6 md:max-w-2xl md:text-xl lg:mt-5">
              I turn failed flows into clear cause, practical evidence, and a
              release decision teams can act on.
            </p>

            <div className="mt-5 grid gap-1 md:mt-9 md:flex md:flex-wrap md:gap-4 lg:mt-7">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-none bg-primary px-9 text-sm font-bold text-primary-foreground transition-[transform,background-color,box-shadow] hover:-translate-y-1 hover:bg-primary/90 hover:shadow-[var(--shadow-button-signal)] md:h-14"
              >
                <a href={cvDownloadHref} download>
                  Download CV
                </a>
              </Button>
              <div className="grid grid-cols-2 gap-2 md:flex md:gap-4">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-none border-border/70 bg-background/80 px-4 text-sm font-bold text-foreground transition-[transform,background-color,border-color,color] hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/[0.06] hover:text-primary md:h-14 md:px-9"
                >
                  <a href="#proof">View QA proof</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-none border-border/70 bg-background/80 px-4 text-sm font-bold text-foreground transition-[transform,background-color,border-color,color] hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/[0.06] hover:text-primary md:h-14 md:px-9"
                >
                  <a href="#contact">Contact</a>
                </Button>
              </div>
            </div>

            <div className="mt-5 border border-border/45 bg-card/70 p-4 md:hidden">
              <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                Evidence model
              </p>
              <p className="font-display text-2xl font-[900] leading-[1.02] text-foreground">
                Clear cause, traceable proof, practical release signals.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                <span className="border border-border/50 px-2 py-1">Cause clarity</span>
                <span className="border border-border/50 px-2 py-1">Trace-ready</span>
                <span className="border border-border/50 px-2 py-1">Release risk</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden min-h-[28rem] md:block md:min-h-[32rem] lg:min-h-[32rem]">
          <div
            className="hero-visual relative ml-auto h-[21rem] w-[78%] overflow-hidden border border-border/45 bg-card/50 shadow-[var(--shadow-hero-visual)] md:h-[27rem] lg:h-[28rem]"
          >
            <HeroTelemetryVisual />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent mix-blend-multiply" />
          </div>

          <div
            className="hero-panel relative z-10 -mt-16 w-[92%] border border-border/45 bg-card/90 p-6 shadow-[var(--shadow-hero-panel)] md:w-[78%] md:p-7 lg:absolute lg:bottom-5 lg:left-0 lg:mt-0"
          >
            <p className="mb-4 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Evidence model
            </p>
            <h2 className="font-display text-2xl font-[900] leading-[1.02] text-foreground md:text-4xl">
              Clear cause, traceable proof, practical release signals.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Designed so recruiters can scan outcomes and engineers can follow
              the debugging trail.
            </p>
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
              <div className="hidden lg:block">
                <Button
                  asChild
                  size="sm"
                  className="min-h-11 rounded-full border-0 bg-foreground/10 px-5 text-foreground hover:bg-foreground/20"
                >
                  <a href={cvDownloadHref} download>
                    <span>Download CV</span>
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
                    href={cvDownloadHref}
                    download
                    onClick={() => closeMenu(false)}
                  >
                    Download CV
                  </a>
                </Button>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-none border-border/60 bg-background/80 text-sm font-bold text-foreground"
                  >
                    <a href="#proof" onClick={() => closeMenu(false)}>
                      View QA proof
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-none border-border/60 bg-background/80 text-sm font-bold text-foreground"
                  >
                    <a href="#contact" onClick={() => closeMenu(false)}>
                      Contact
                    </a>
                  </Button>
                </div>
                <div className="mt-8 flex justify-between font-mono text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground/80">
                  <span>Trace-ready QA</span>
                  <span>Release confidence</span>
                </div>
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
