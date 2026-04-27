import React from "react";
import { ArrowRight, Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
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

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <div className="overflow-hidden relative min-h-[90vh] flex flex-col justify-center">
        {/* Background Technical Grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-noise pointer-events-none"></div>
          <div className="absolute inset-0 bg-scanline pointer-events-none opacity-40"></div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)`, backgroundSize: '4rem 4rem' }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
        </div>

        <section id="hero" className="relative z-10 w-full">
          <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
            <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-24 items-end">
              {/* Left Column — Dramatic Display */}
              <div className="relative">
                <AnimatedGroup variants={transitionVariants}>
                  {/* Status Protocol — Replaces generic pill */}
                  <div className="flex items-center gap-4 mb-12 sm:mb-16">
                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded text-[10px] font-mono text-primary uppercase tracking-[0.2em]">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                      Protocol_Init: Active
                    </div>
                    <div className="h-px flex-1 bg-border/30 max-w-[100px] hidden sm:block"></div>
                    <span className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.2em] hidden sm:block">0x7F // QA_CORE</span>
                  </div>

                  <h1
                    className="text-balance font-display font-[900] text-foreground leading-[0.9] tracking-[-0.05em]"
                    style={{
                      fontSize: 'clamp(2.5rem, 15vw, 10rem)',
                    }}
                  >
                    QUALITY<br />
                    ENGINEERING<br />
                    <span className="text-primary italic font-[800] tracking-tight" style={{ fontSize: '0.85em' }}>AT SCALE</span>
                  </h1>
                </AnimatedGroup>
              </div>

              {/* Right Column — Interaction & Details */}
              <div className="max-w-md lg:pb-6">
                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.4,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-px bg-primary"></div>
                    <span className="text-muted-foreground font-mono text-xs uppercase tracking-widest">SR. QA AUTOMATION</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-12 text-balance" style={{ fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)' }}>
                    Building industrial-grade automated test solutions for complex eCommerce platforms. Specializing in Playwright architectures that scale across multi-country storefronts.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-none h-14 px-10 text-sm font-mono tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_var(--foreground)]"
                    >
                      <a href="#contact">
                        INIT_CONTACT();
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-none h-14 px-10 text-sm font-mono tracking-widest border-border/50 hover:border-primary/50 hover:bg-primary/[0.03] bg-transparent transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(var(--primary-rgb),0.2)]"
                    >
                      <a href="#experience">
                        VIEW_LOGS
                      </a>
                    </Button>
                  </div>
                </AnimatedGroup>
              </div>
            </div>
          </div>

          {/* Scrolling Ticker — Break the Grid decoration */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden border-y border-border/10 bg-background/50 backdrop-blur-sm py-4 hidden md:block">
            <div className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
              <div className="flex whitespace-nowrap animate-marquee items-center gap-16 text-[10px] font-mono text-muted-foreground/30 tracking-[0.3em] uppercase">
                <span>System_Status: Optimal</span>
                <span>•</span>
                <span>46_Automated_Specs: PASSED</span>
                <span>•</span>
                <span>Coverage: 98.2%</span>
                <span>•</span>
                <span>Environment: Production_Ready</span>
                <span>•</span>
                <span>Playwright_v1.44.0</span>
                <span>•</span>
                <span>Build: #842_SUCCESS</span>
                <span>•</span>
                <span>Latency: 12ms</span>
                <span>•</span>
                <span>Uptime: 99.99%</span>
                <span>•</span>
                {/* Loop */}
                <span>System_Status: Optimal</span>
                <span>•</span>
                <span>46_Automated_Specs: PASSED</span>
                <span>•</span>
                <span>Coverage: 98.2%</span>
                <span>•</span>
                <span>Environment: Production_Ready</span>
                <span>•</span>
                <span>Playwright_v1.44.0</span>
                <span>•</span>
                <span>Build: #842_SUCCESS</span>
                <span>•</span>
                <span>Latency: 12ms</span>
                <span>•</span>
                <span>Uptime: 99.99%</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const menuItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Stack", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("hero");

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Scroll-spy observer
    const options = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    const sections = ["hero", "about", "experience", "skills", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header>
      <nav
        className="fixed z-50 w-full px-4 top-4"
      >
        <div
          className={cn(
            "mx-auto max-w-5xl px-6 transition-all duration-500 rounded-full border border-border/40 backdrop-blur-md bg-background/20",
            isScrolled && "border-primary/20 bg-background/90 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl py-0.5",
          )}
        >
          <div className="relative flex items-center justify-between gap-6 py-3">
            <a href="/" aria-label="Cesar Garcia Sánchez - Portfolio Home" className="flex items-center space-x-2 z-[60]">
              <Logo />
            </a>

            {/* Desktop Navigation */}
            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm font-semibold tracking-wide">
                {menuItems.map((item, index) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <li key={index}>
                      <a
                        href={item.href}
                        className={cn(
                          "transition-colors duration-200 relative py-1",
                          isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span>{item.name}</span>
                        {isActive && (
                          <div className="absolute -bottom-1 left-0 right-0 h-px bg-primary/40 rounded-full" />
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
                  className="rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground border-0"
                >
                  <a href="#contact">
                    <span>Hire Me</span>
                  </a>
                </Button>
              </div>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-[60] flex cursor-pointer p-2 lg:hidden text-muted-foreground hover:text-foreground transition-colors"
              >
                {menuState ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {menuState && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 w-full h-[100vh] bg-background/95 backdrop-blur-xl z-[55] lg:hidden flex flex-col p-8 pt-24"
            >
              <div className="flex flex-col gap-8">
                {menuItems.map((item, index) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <motion.a
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      href={item.href}
                      onClick={() => setMenuState(false)}
                      className={cn(
                        "text-4xl font-display font-[900] tracking-tight flex items-center justify-between group py-2",
                        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground transition-colors"
                      )}
                    >
                      <span className="group-hover:translate-x-2 transition-transform duration-300">{item.name}</span>
                      <ArrowUpRight className={cn("size-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300", isActive && "opacity-100 translate-x-0")} />
                    </motion.a>
                  );
                })}
              </div>

              <div className="mt-auto pb-12">
                <Button
                  asChild
                  size="lg"
                  className="w-full h-16 text-lg font-mono tracking-widest rounded-none"
                >
                  <a href="#contact" onClick={() => setMenuState(false)}>
                    INIT_CONNECTION();
                  </a>
                </Button>
                <div className="mt-8 flex justify-between text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest">
                  <span>Protocol_v2.0</span>
                  <span>Cesar Garcia Sánchez</span>
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
        "text-xl font-display font-[900] text-foreground flex items-center gap-2",
        className,
      )}
      style={{ letterSpacing: '-0.02em' }}
    >
      <div className="relative size-5 flex items-center justify-center">
        <div className="absolute inset-0 border-[1.5px] border-primary/40 rounded-sm"></div>
        <div className="size-1 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-primary/60"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-0.5 h-1.5 bg-primary/60"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-0.5 w-1.5 bg-primary/60"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-0.5 w-1.5 bg-primary/60"></div>
      </div>
      <div className="flex items-baseline">
        <span className="tracking-tighter">CESAR</span>
        <span className="text-primary/80 font-[400] text-sm ml-1 tracking-widest uppercase">OGS</span>
      </div>
    </div>
  );
};
