import React from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { cn } from "@/lib/utils";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 16,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "tween",
        ease: [0.16, 1, 0.3, 1],
        duration: 0.8,
      },
    },
  },
};

const menuItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Stack", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full max-w-full overflow-hidden pt-28"
    >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-noise" />
          <div className="absolute inset-0 bg-scanline opacity-35" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
              backgroundSize: "4.5rem 4.5rem",
            }}
          />
          <div className="absolute left-[-12rem] top-12 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-foreground/5 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 px-[var(--container-px)] pb-24 pt-16 md:pb-32 lg:grid-cols-[1.14fr_0.86fr] lg:gap-16">
          <div className="relative min-w-0">
            <AnimatedGroup variants={transitionVariants}>
              <p
                className="mb-5 max-w-4xl font-display text-[clamp(2.35rem,7.2vw,5.6rem)] font-[900] leading-[0.88] tracking-normal text-primary"
                aria-label="Cesar Octavio Garcia Sanchez"
              >
                Cesar Octavio Garcia Sanchez
              </p>

              <p className="mb-8 max-w-lg text-base font-semibold uppercase tracking-[0.18em] text-primary/80">
                Senior QA Automation Engineer
              </p>

              <h1
                className="w-full max-w-full break-words font-display font-[900] leading-[0.92] text-foreground [text-wrap:normal] md:max-w-6xl"
                style={{ fontSize: "clamp(2.85rem, 7vw, 6.6rem)" }}
              >
                <span className="block sm:inline">Commerce</span>{" "}
                <span className="block sm:inline">quality at</span>{" "}
                <span className="block sm:inline">scale</span>
              </h1>

              <p className="mt-8 max-w-full text-lg leading-relaxed text-muted-foreground md:max-w-xl md:text-xl">
                Building industrial-grade test systems for multi-country
                storefronts, B2B/B2C journeys, API validation, accessibility,
                and release observability.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-14 rounded-none bg-primary px-9 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-1 hover:bg-primary/90 hover:shadow-[6px_6px_0_rgba(255,255,255,0.14)]"
                >
                  <a href="#contact">Contact Me</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-none border-border/70 bg-background/40 px-9 text-sm font-bold text-foreground backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/[0.06] hover:text-primary"
                >
                  <a href="#experience">View Experience</a>
                </Button>
              </div>
            </AnimatedGroup>
          </div>

          <div className="relative min-h-[31rem] md:min-h-[36rem] lg:min-h-[42rem]">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="relative ml-auto h-[24rem] w-[82%] overflow-hidden border border-border/50 bg-foreground/[0.03] shadow-[0_40px_120px_rgba(0,0,0,0.36)] md:h-[30rem] lg:h-[36rem]"
            >
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85"
                alt=""
                className="h-full w-full object-cover object-center brightness-75 contrast-125 saturate-[0.88] transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent mix-blend-multiply" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 -mt-20 w-[92%] border border-border/50 bg-background/88 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl md:w-[76%] md:p-8 lg:absolute lg:bottom-8 lg:left-0 lg:mt-0"
            >
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Operating model
              </p>
              <h2 className="font-display text-3xl font-[900] leading-none text-foreground md:text-5xl">
                Traceable quality from local runs to CI evidence.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Designed around practical debugging, reusable helpers, and
                release signals that engineering teams can act on.
              </p>
            </motion.div>
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
      if (
        shouldRestoreFocusRef.current &&
        previousActiveElement &&
        previousActiveElement.isConnected
      ) {
        previousActiveElement.focus();
      }
    };
  }, [closeMenu, menuState]);

  return (
    <header>
      <nav className="fixed top-4 z-50 w-full px-4">
        <div
          className={cn(
            "relative z-[70] mx-auto max-w-5xl rounded-full border border-border/40 bg-background/25 px-5 backdrop-blur-md transition-all duration-500 md:px-6",
            isScrolled &&
              "border-primary/25 bg-background/92 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.75)] backdrop-blur-xl",
          )}
        >
          <div className="relative flex items-center justify-between gap-6 py-3">
            <a
              href="#hero"
              aria-label="Cesar Octavio Garcia Sanchez - Portfolio Home"
              className="z-[60] flex items-center space-x-2"
            >
              <Logo />
            </a>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm font-semibold tracking-wide">
                {menuItems.map((item) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className={cn(
                          "relative py-1 transition-colors duration-200",
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
                  className="rounded-full border-0 bg-foreground/10 text-foreground hover:bg-foreground/20"
                >
                  <a href="#contact">
                    <span>Hire Me</span>
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

        <AnimatePresence>
          {menuState && (
            <motion.div
              id={mobileMenuId}
              ref={mobileMenuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 z-[55] flex h-[100vh] w-full flex-col bg-background/96 p-8 pt-24 backdrop-blur-xl lg:hidden"
            >
              <div className="flex flex-col gap-8">
                {menuItems.map((item, index) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <motion.a
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      href={item.href}
                      onClick={() => closeMenu(false)}
                      className={cn(
                        "group flex items-center justify-between py-2 font-display text-4xl font-[900] tracking-normal",
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
                          "size-6 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100",
                          isActive && "translate-x-0 opacity-100",
                        )}
                      />
                    </motion.a>
                  );
                })}
              </div>

              <div className="mt-auto pb-12">
                <Button
                  asChild
                  size="lg"
                  className="h-16 w-full rounded-none text-lg font-bold"
                >
                  <a href="#contact" onClick={() => closeMenu(false)}>
                    Contact Me
                  </a>
                </Button>
                <div className="mt-8 flex justify-between text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60">
                  <span>Portfolio v2.0</span>
                  <span>Cesar Octavio Garcia Sanchez</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
        <span className="ml-1 text-sm font-[500] uppercase tracking-[0.14em] text-primary/85">
          OGS
        </span>
      </div>
    </div>
  );
};
