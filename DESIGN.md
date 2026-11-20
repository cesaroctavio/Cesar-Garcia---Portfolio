---
name: "Cesar Garcia Portfolio"
description: "An indigo, dark-first QA portfolio where real evidence does the talking."
colors:
  night-signal-indigo: "#A89BFF"
  night-signal-ink: "#14102E"
  night-signal-focus: "#BDB3FF"
  lab-night: "#0C0B12"
  lab-bench: "#16141F"
  lab-shelf: "#1E1B2B"
  instrument-white: "#EEEDF5"
  readout-grey: "#CFCCE0"
  margin-note: "#9693A8"
  hairline: "#26233A"
  hairline-strong: "#3A3652"
  pass-green: "#6EE7A8"
  fail-coral: "#FF8E8A"
  day-indigo: "#5440D6"
  day-paper: "#F5F4FA"
  day-card: "#FFFFFF"
  day-shelf: "#ECEAF4"
  day-ink: "#14121C"
  day-ink-2: "#3A3748"
  day-muted: "#5E5B6E"
  day-hairline: "#DDDAEA"
  day-hairline-strong: "#C3BFD6"
  day-pass: "#1E7A4A"
  day-fail: "#C2342B"
typography:
  display:
    fontFamily: "Satoshi, Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6.4vw + 0.5rem, 6.75rem)"
    fontWeight: 900
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Satoshi, Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 2.5vw + 1rem, 3.5rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Satoshi, Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 0.75vw + 0.875rem, 1.625rem)"
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  lead:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 0.35vw + 1rem, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  control: "999px"
  inner: "16px"
  card: "24px"
  feature: "32px"
spacing:
  3xs: "2px"
  2xs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "64px"
  3xl: "96px"
  4xl: "144px"
  gutter: "64px"
  gutter-tablet: "24px"
  gutter-phone: "16px"
components:
  button-primary:
    backgroundColor: "{colors.night-signal-indigo}"
    textColor: "{colors.night-signal-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.instrument-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  nav-bar:
    backgroundColor: "{colors.lab-bench}"
    textColor: "{colors.margin-note}"
    rounded: "{rounded.control}"
    height: "60px"
  nav-contact:
    backgroundColor: "{colors.instrument-white}"
    textColor: "{colors.lab-night}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    height: "44px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.readout-grey}"
    rounded: "{rounded.control}"
    padding: "4px 12px"
  card:
    backgroundColor: "{colors.lab-bench}"
    textColor: "{colors.instrument-white}"
    rounded: "{rounded.card}"
    padding: "24px"
---

# Design System: Cesar Garcia Portfolio

## Overview

**Creative North Star: "The Night Shift Lab"**

A QA lab after hours: the room is deep indigo-black, and the only things lit are the evidence on the bench. The visitor should feel they are looking over the shoulder of someone who traces failures carefully, not reading a brochure. Personality comes from scale and motion, a big two-tone headline that blurs into focus and sections that rise in as you reach them, while the surfaces themselves stay calm and flat.

The system is dark by default and offers a daylight variant behind a toggle; both themes share every rule here. Density is generous: large type, wide gutters, rounded containers that group related evidence. The site was redesigned in late 2026 with personality borrowed from brhpsd.com (floating pill nav, two-tone display headline, rounded cards, staged reveals), then pulled back toward evidence: anything decorative has to justify itself as proof.

**Key Characteristics:**
- Indigo-black night surfaces, one indigo signal colour, cool lavender-grey neutrals.
- Satoshi Black for display, Figtree for reading, JetBrains Mono only for real code.
- Rounded containers (24px cards, pill controls) with 1px hairlines, flat at rest.
- One authored entrance (the headline's word blur-in), quiet scroll reveals after it (opacity and a short rise, never blur).
- Real numbers and real artefacts over ornament.

## Colors

One saturated signal in a field of tinted neutrals; nothing is pure black or white.

### Primary
- **Night Signal Indigo** (`night-signal-indigo`): the one accent in dark mode. The primary button, the accent line of the hero headline, the stat figures, the active nav pill, step numerals, focus rings (via `night-signal-focus`). Text placed on it uses `night-signal-ink`.
- **Day Indigo** (`day-indigo`): the same role in light mode, darkened so it holds AA as text on `day-paper`; text placed on it is white.

### Neutral
- **Lab Night** (`lab-night`): page background in dark mode. Light mode: `day-paper`.
- **Lab Bench** (`lab-bench`): cards, the nav bar, the contact card, banded sections. Light mode: `day-card`.
- **Lab Shelf** (`lab-shelf`): hover fill for rows and nav links. Light mode: `day-shelf`.
- **Instrument White** (`instrument-white`): headings and primary text. Light mode: `day-ink`.
- **Readout Grey** (`readout-grey`): body copy and leads. Light mode: `day-ink-2`.
- **Margin Note** (`margin-note`): periods, captions, labels, nav links at rest. Light mode: `day-muted`.
- **Hairline / Hairline Strong** (`hairline`, `hairline-strong`): dividers and card borders; the strong one for quiet buttons and emphasized rules. Light mode: `day-hairline`, `day-hairline-strong`.

### Status
- **Pass Green** (`pass-green`) and **Fail Coral** (`fail-coral`): only for real state, such as availability or the copy-email error. Light mode: `day-pass`, `day-fail`.

### Named Rules
**The One Signal Rule.** Indigo marks action, state, or the single most important figure. If more than one thing in a viewport competes in indigo for a reason other than state, one of them loses its indigo.

**The Tinted Neutral Rule.** Every neutral carries the indigo hue. No `#000`, no `#fff` text on dark, no default greys.

## Typography

**Display Font:** Satoshi (with Figtree, system sans)
**Body Font:** Figtree (with system sans)
**Code Font:** JetBrains Mono

**Character:** Satoshi Black is loud and compact, so it carries the personality; Figtree is plain and friendly, so evidence reads easily under it.

### Hierarchy
- **Display** (900, clamp 2.75rem to 6.25rem, line-height 1, -0.03em): the hero title only, centred on two lines, the second in an indigo-to-blue gradient.
- **Headline** (900, clamp 2rem to 3.5rem, 1.05): section heads. One line of plain words that says what the reader will see.
- **Title** (900, clamp 1.25rem to 1.625rem, 1.2): company names, case-study titles, skill areas.
- **Lead** (400, clamp 1.125rem to 1.375rem, 1.45): the sentence under a head, max 52ch.
- **Body** (400, 1rem, 1.55): everything else, max 65ch.
- **Label** (600, 0.875rem): buttons, chips, stat labels.
- **Code** (400, 0.875rem, 1.7): code samples only.

### Named Rules
**The Plain Head Rule.** Headings are plain statements of content ("What happens when a check fails", "Problems I've solved"). No slogans. A short uppercase eyebrow in indigo ("Case studies", "Stack") may sit above a section head to name the section; the hero's eyebrow is a pill.

**The Mono Means Code Rule.** JetBrains Mono appears only inside real code or command output, never as a costume for labels or tool names.

## Layout

A single centred column up to 1440px with 64px gutters (24px under 60rem, 16px under 40rem). Sections sit 144px apart on desktop, tighter on smaller screens. Inside sections, a 12-column feel is expressed as two-column splits (5:7 or 7:5) that collapse to one column under 60rem; the stats run four across, two across on tablets and phones; case studies run three across, stacking on tablets and phones.

Page order: centred hero, the Checkpoint demo, real numbers, experience index, case studies, AI-assisted QA, the triage process with code, skills by risk, about, contact.

**The Evidence First Rule.** Within two scrolls a visitor must reach a real fact about the work (a number, a role, a result). Anything placed above that has to earn the space.

## Elevation & Depth

Mostly flat. Depth comes from tonal layering (night, bench, shelf), 1px hairlines, a faint top sheen on cards (`--card-sheen`) and soft indigo glows (`--glow`, `--glow-2`): behind the hero over a faded 56px grid, under the demo window, and inside the AI and contact panels. Shadows: the scrolled nav bar, the primary button, and the demo window and its toasts (`--shadow-demo`). Backdrop blur is used where something floats over content: the nav bar, the stats card and the demo tab bar.

**The Calm Surface Rule.** Glows are ambient and fixed; they never pulse or follow the pointer. Case-study cards are the one static container that lifts (3px) on hover.

## Shapes

Controls are pills (999px): buttons, chips, nav links, the nav bar itself. Containers use generous rounding: cards 24px, inner rows and AI tool tiles 16px, feature panels (the contact card) 32px, which falls back to 24px on phones. Borders are always a full 1px hairline; never a single coloured side.

## Components

### Buttons
Precise and calm.
- **Shape:** pill (999px), 48px tall, 24px side padding, label type, icon at 18px with an 8px gap.
- **Primary:** Night Signal Indigo fill with Night Signal Ink text. One per view where possible: Download CV (PDF).
- **Quiet:** transparent with a Hairline Strong border and Instrument White text: Email me, Copy email.
- **Hover / Focus:** fill shifts slightly toward ink; trailing arrows slide 3px. Focus is a 2px Night Signal Focus outline offset 3px.
- **Naming:** each action has one name everywhere. "Download CV (PDF)" downloads the PDF, "Email me" opens mail, "Contact" goes to the contact section.

### Chips
- **Style:** transparent pill with a Hairline Strong border, Readout Grey label at 0.875rem. Used for tools in skills and case studies.
- **State:** static; they brighten only when their row is hovered.

### Cards / Containers
- **Corner Style:** 24px.
- **Background:** Lab Bench on Lab Night (inverted to white on Day Paper in light mode).
- **Shadow Strategy:** none (see Elevation).
- **Border:** 1px Hairline.
- **Internal Padding:** 24px, 40px for feature panels.

### Navigation
A floating pill bar 12px below the top of the viewport: wordmark with a small indigo square on the left, text links in Margin Note, a theme toggle, and a solid Instrument White "Contact" pill that turns indigo when the contact section is active. Active links get a 18% indigo tint. Under 60rem the links collapse into a full-screen sheet with large Satoshi links and Download CV / Email me at the bottom; the bar stays above the sheet so the close button is always reachable.

### Hero
Centred: an eyebrow pill with a green dot ("Open to remote US teams"), the two-line display title, the lead, then Download CV (PDF) and Email me. Behind it sit the indigo glow and the faded grid.

### Checkpoint demo
An animated, made-up QA app under the hero buttons (`src/components/demo/`). A tab bar (Runs, Trace, AI assistant, Ticket, Board, plus pause) sits over a window with a sidebar and one scene at a time. A fake cursor glides, clicks with a ripple, types and drags. The scenes tell one loop: a spec fails on the DE storefront, its trace shows a pricing 500, the AI assistant names the cause, a ticket is filed, and the board updates.
- **Honesty:** the app is invented and says so in a caption under the window. Any number that describes Cesar's work is real (55 specs, 17 storefronts); IDs and durations are obvious filler.
- **Motion:** each scene renders from one clock value, so pausing and reduced motion are exact. It autoplays about every 7 seconds, pauses on mouse hover over the window, off screen (under 30% visible), in a hidden browser tab, and with the pause button. With reduced motion there is no autoplay and no cursor, and each tab shows its end state.
- **Size:** laid out at 1100 by 620 and scaled to fit; under 40rem it drops the sidebar and uses 600 by 680. On phones inactive tabs show only their icon.

### Stats Band
Four real figures from the CV (years in QA, countries, Playwright specs, page object files) in Satoshi Black with an indigo gradient, centred in one translucent card. Numbers count up once on first view and render instantly with reduced motion.

### Experience Index
A list of roles inside one card: period, company and title, a one-line proof, and a plus toggle. Opening a role reveals bullet evidence with the real numbers in bold.

### Case Study
Problem, What I did, Result, then the tools as chips. The result line is the only bold line in the card.

## Do's and Don'ts

### Do:
- **Do** keep dark as the default theme and make light a remembered opt-in that applies before first paint.
- **Do** use Night Signal Indigo for the primary action, the hero's second line, stat figures, eyebrows, active nav and tabs, and step numerals only.
- **Do** show each number once, where it carries the most weight.
- **Do** prefer a real artefact (a trace, a report, a spec, a photo) to a decorative stand-in.
- **Do** respect reduced motion: reveals, the word blur-in and the count-up all render final state immediately.
- **Do** cover every interactive flow with a Playwright spec (`npm run test:e2e`).

### Don't:
- **Don't** add hover lift to anything that isn't clickable, except case-study cards.
- **Don't** present invented numbers as Cesar's results. The Checkpoint demo may invent the app, never his figures.
- **Don't** add window traffic-light dots.
- **Don't** write slogans in headings or meta descriptions.
- **Don't** use monospace, tracked uppercase or middle-dot strings as decoration.
- **Don't** use pure `#000` or `#fff` for text or backgrounds.
- **Don't** add a marquee or logo wall.
