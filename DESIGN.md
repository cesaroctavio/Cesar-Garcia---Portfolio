---
name: "Cesar Garcia Portfolio"
description: "A dark kinetic QA portfolio built around traceable proof and release confidence."
colors:
  background: "oklch(12% 0.012 240)"
  foreground: "oklch(96% 0.01 215)"
  card: "oklch(16% 0.014 240)"
  card-foreground: "oklch(96% 0.01 215)"
  popover: "oklch(16% 0.014 240)"
  popover-foreground: "oklch(96% 0.01 215)"
  primary: "oklch(78% 0.135 188)"
  primary-foreground: "oklch(10% 0.014 225)"
  secondary: "oklch(70% 0.17 28)"
  secondary-foreground: "oklch(11% 0.015 28)"
  accent: "oklch(81% 0.13 152)"
  accent-foreground: "oklch(10% 0.014 225)"
  muted: "oklch(25% 0.018 235)"
  muted-foreground: "oklch(73% 0.028 215)"
  border: "oklch(30% 0.025 230)"
  input: "oklch(30% 0.025 230)"
  ring: "oklch(78% 0.135 188)"
  destructive: "oklch(62% 0.19 24)"
  destructive-foreground: "oklch(96% 0.01 215)"
typography:
  display:
    fontFamily: "Satoshi, Figtree, system-ui, sans-serif"
    fontSize: "clamp(2.7rem, 8vw, 5.15rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "0"
  headline:
    fontFamily: "Satoshi, Figtree, system-ui, sans-serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0"
  title:
    fontFamily: "Satoshi, Figtree, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0"
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.65
    letterSpacing: "0.005em"
  label:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0"
  code:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0"
rounded:
  none: "0"
  sm: "calc(0.75rem - 4px)"
  md: "calc(0.75rem - 2px)"
  lg: "0.75rem"
  full: "9999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.5rem"
  2xl: "2rem"
  3xl: "3rem"
  4xl: "4rem"
  5xl: "6rem"
  6xl: "8rem"
  container-x: "clamp(1.25rem, 5vw, 2.5rem)"
  section-tight: "clamp(4rem, 8vw, 8rem)"
  section-normal: "clamp(6rem, 12vw, 12rem)"
  section-generous: "clamp(8rem, 16vw, 16rem)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.none}"
    padding: "0 2.25rem"
    height: "3rem"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.none}"
    padding: "0 2.25rem"
    height: "3rem"
  nav-bar:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.none}"
    height: "72px"
  proof-panel:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.none}"
    padding: "1rem"
---

# Design System: Cesar Garcia Portfolio

## 1. Overview

**Creative North Star: "The Evidence Control Room"**

This system is a dark, kinetic portfolio for recruiters, hiring managers, and developers reviewing QA automation work under focused desktop or mobile browsing conditions. The scene is a technical evaluator scanning proof late in the hiring loop: ambient light is low, attention is limited, and the interface has to feel precise before it feels decorative.

The visual language is cinematic but disciplined. Large Satoshi headlines create expert confidence, Figtree body copy keeps evidence readable, and cyan OKLCH accents behave like instrumentation signals. Motion is responsive, not ornamental: transform and opacity only, reduced-motion honored, no layout animation.

The system explicitly rejects generic portfolio templates, light mode defaults, overly complex navigation, "AI slop", cliche SaaS designs, hero-metric templates, and identical card grids.

**Key Characteristics:**
- Dark-mode-first control-room atmosphere.
- Proof-forward content with traceable QA evidence.
- Sharp rectangular surfaces, thin borders, and sparse cyan signal.
- Large editorial type balanced by compact operational labels.
- Motion that clarifies state without carrying the story.

## 2. Colors

The palette is a restrained dark neutral system with one dominant cyan signal and two reserved support hues.

### Primary
- **Run Signal Cyan**: The primary action and active-state color. Use it for the logo signal, primary CTAs, menu state, proof status dots, focused rings, and small evidence labels.

### Secondary
- **Incident Ember**: A warm alert/support color. Use only when a secondary or destructive contrast is needed. It should never compete with Run Signal Cyan on the same local surface.

### Tertiary
- **Validation Green**: A reserved success/support accent. Use for validation-oriented moments where cyan would overstate importance.

### Neutral
- **Control Room Black**: The page background. It is tinted toward blue, never pure black.
- **Instrument White**: The main text color. It is tinted cool, never pure white.
- **Panel Graphite**: Card and footer surfaces. Use it for contained evidence modules, not for every section.
- **Quiet Steel**: The muted text family and low-emphasis fills.
- **Scope Line**: The border, input, and divider color. Keep it thin and technical.

### Named Rules

**The Signal Scarcity Rule.** Run Signal Cyan must remain rare enough to feel like state, proof, or action. Do not wash entire sections in cyan.

**The No Light Fallback Rule.** This portfolio is dark-mode-first by strategy. Do not introduce light sections, cream neutrals, or daytime SaaS panels.

## 3. Typography

**Display Font:** Satoshi, with Figtree and system sans fallbacks  
**Body Font:** Figtree, with system sans fallback  
**Code Font:** JetBrains Mono, only for code. Never for labels, dates, nav or tags.

**Character:** The pairing is compact, confident, and technical without becoming terminal cosplay. Display type is heavy and cinematic; body type stays clean enough for resume-level evidence.

### Hierarchy
- **Display** (900, `clamp(2.7rem, 8vw, 5.15rem)`, `0.92`): Hero statements and page-defining claims.
- **Headline** (900, `clamp(3rem, 8vw, 6rem)`, `1`): Major section titles and proof-led section openers.
- **Title** (900, `2.25rem`, `1`): Experience cards, skill cards, contact cards, and proof slide titles.
- **Body** (500, `1rem`, `1.65`): Evidence paragraphs, role descriptions, and explanatory copy. Keep readable text to roughly 65 to 75 characters per line.
- **Label** (Figtree, 400, `0.875rem`, no tracking, sentence case): navigation, dates, table heads, captions.
- **Code** (JetBrains Mono, 400, `0.875rem`): code samples only.

**The No Costume Rule.** No uppercase, no letter-spacing and no monospace on labels. A label is the body face, one step smaller, in sentence case.

**The One Head Rule.** A section head is one line of plain words that says what the reader will see (*What happens when a check fails*). No "Word." headline with a grey slogan under it.

### Named Rules

**The Proof Before Poetry Rule.** Headlines may be expressive, but every section must quickly resolve into evidence: tools, systems, scope, or action.

**The No Negative Tracking Rule.** Letter spacing stays at zero for display copy. Tightness comes from scale and weight, not squeezed glyphs.

## 4. Elevation

Depth is tonal and structural only: hairlines (`--color-rule`), one tinted band (`--color-paper-2`) for the skills table, and a bordered panel for the code sample. No shadows and no glows.

### Named Rules

**The Flat At Rest Rule.** Most surfaces are flat at rest. Lift appears through sticky context, hover state, or proof hierarchy.

**The No Glass Rule.** Do not use decorative blur or backdrop-filter surfaces. Clarity beats haze.

## 5. Components

### Buttons
- **Shape:** Industrial rectangle, no radius (`0`).
- **Primary:** Run Signal Cyan background, dark primary-foreground text, bold 14px label, 48px mobile height, 56px desktop height.
- **Hover / Focus:** Translate up by 4px, tint the background, keep focus rings cyan and visible.
- **Secondary / Outline:** Transparent dark surface with Scope Line border. It may turn cyan on hover but must not become a second primary.

### Chips
- **Style:** Thin Scope Line border, dark surface, compact 11px to 12px bold text.
- **State:** Chips label proof categories and tools. They are not decorative tags, and they should not form identical card-grid filler.

### Cards / Containers
- **Corner Style:** Square by default (`0`) with rare pill treatment only for the header shell or circular proof controls.
- **Background:** Use Control Room Black, Panel Graphite, or a low-opacity foreground tint.
- **Shadow Strategy:** Follow the Flat At Rest Rule. Borders carry most boundaries.
- **Border:** 1px Scope Line, usually at 40 to 60 percent alpha.
- **Internal Padding:** 24px mobile, 32px to 40px desktop for evidence-heavy surfaces.

### Inputs / Fields
- **Style:** Use the same dark surface, 1px Scope Line border, and square geometry as cards.
- **Focus:** Cyan ring with clear offset against the dark background.
- **Error / Disabled:** Use Incident Ember for error states and opacity reduction for disabled states. Do not blur disabled content.

### Navigation
- **Style:** Edge-aligned sticky bar: the wordmark "Cesar Garcia" in Satoshi at left; section links and an outlined "Email me" at right. A hairline appears under it once the page scrolls. No pill, no logo mark.
- **States:** Links are muted, ink on hover, cyan and underlined when their section is in view. Under 60rem the links move into a full-screen dialog with inert background, trapped focus, Escape close and restored focus.

### The Roles Index

The signature pattern. The first screen is the list of roles: period, company, title and one line of proof per row, each row a disclosure that opens to its evidence. Evidence before decoration: no slogans, dashboards or status dots above it.

### Code Sample

One code figure in a `data-slot`, captioned honestly. Replace the current sketch with a real excerpt from a public repo when one exists.

## 6. Do's and Don'ts

### Do:
- **Do** keep the site dark-mode-first, using Control Room Black as the base and Instrument White for readable evidence.
- **Do** use Run Signal Cyan for real state: the one primary action, active navigation, focus and step numerals.
- **Do** lead with proof language: Playwright architecture, accessibility, CI evidence, traces, reusable helpers, global storefront coverage.
- **Do** preserve reduced-motion behavior and restrict animation to opacity and transform. One hero settle; no scroll-scrubbed motion.
- **Do** keep navigation simple and directly tied to page sections.
- **Do** use thin full borders or tonal panels instead of decorative side stripes.

### Don't:
- **Don't** use generic portfolio templates.
- **Don't** use light mode defaults.
- **Don't** build overly complex navigation.
- **Don't** ship "AI slop" or cliche SaaS designs.
- **Don't** use hero-metric templates.
- **Don't** create identical card grids.
- **Don't** add gradient text, decorative glassmorphism, blur-heavy panels, or backdrop-filter effects.
- **Don't** use pure `#000` or `#fff`; every neutral must stay tinted.
- **Don't** use tracked uppercase or monospace labels, eyebrows, middle-dot meta strings or status dots.
- **Don't** write slogans ("Proof over polish", "release confidence"). Say the fact: the storefronts, the tools, the result.
