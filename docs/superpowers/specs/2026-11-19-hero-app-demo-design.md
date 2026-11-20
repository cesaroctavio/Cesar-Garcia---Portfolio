# Hero app demo: "Checkpoint"

Date: 2026-11-19 · Status: draft, waiting on Cesar's approval

## Intent

Cesar wants the top of the portfolio to feel like a polished product site, specifically the animated hero demo on todowl.com: a window that assembles itself, tabs that change on their own, and a fake cursor that clicks, types, and drags. The goal is a first impression of craft for recruiters and hiring managers. Cesar chose an **invented app** over replaying his real workflow, knowing that it reverses the "no mock dashboards" rule in PRODUCT.md.

The demo should still say something true about him. It plays a QA loop he actually runs (a check fails, gets traced, triaged with AI, and becomes a ticket), so a non-technical visitor understands what he does without reading.

## Goals

- An auto-playing, five-scene demo of a made-up QA app called **Checkpoint**, placed directly under the hero buttons.
- It looks and moves at ToDowl's level: staged entrance, a cursor with press ripples, typing, toasts, and cards moving.
- Cesar's real figures appear wherever a number describes his work (55 specs, 17 storefronts).
- It works in dark and light themes, on phones, and with reduced motion.

## Non-goals

- A clickable app. Only the tabs and the pause control are interactive.
- New dependencies. No GSAP, Lottie, or video.
- Changing the rest of the page. Stats, Experience, and the other sections stay as they are.

## Anti-goals (failure even if it works)

- Invented numbers that read as claims about Cesar (pass rates, "1,200 tests", percentages). Filler such as ticket IDs and durations is fine because it is obviously demo data.
- Janky motion, layout shift while it plays, or a page that scrolls sideways on phones.
- Motion that can't be stopped. Auto-moving content longer than 5 s needs a pause control (WCAG 2.2.2).
- Burning CPU when off screen or in a background tab.
- Window "traffic light" dots. ToDowl doesn't use them and they read as clip-art.

## Approaches considered

| Approach | Trade-off |
|---|---|
| **A. Time-driven React scenes with CSS transitions (picked)** | Each scene renders from one clock value `t`. Pause, reduced motion (jump to the end state), and restarts come for free. No dependencies. It needs a small clock hook and careful throttling. |
| B. Pure CSS keyframes per scene (how ToDowl does it) | Lightest at runtime, but pausing, typing, and "show the end state" get fiddly across around 40 keyframe sets. Typing text needs JS anyway. |
| C. GSAP timelines | Nicest choreography API, but adds about 70 KB, and GSAP was removed from this repo in cd90458. |
| D. Video or Lottie | Easiest to make, but blurry text, heavier, can't follow the light/dark theme, and not accessible. |

Cesar handed the "how" to Claude, and A is Claude's call.

## Design

### Placement and frame

- In `HeroSection` (`src/components/blocks/hero-section-1.tsx`), between `.hero__head` and `<Stats />`.
- The tab bar sits on top and is centered: `Runs · Trace · AI assistant · Ticket · Board`, styled like the site's nav pill. A pause/play icon button sits at the end of the bar.
- Below the bar is the window: a rounded panel (`--radius-card`), with `--card-sheen` on `--color-paper-2`, a hairline `--color-rule` border, and a soft accent glow under it. The left sidebar shows the app mark "Checkpoint" and nav items Runs, Trace, AI assistant, Tickets, and Board. The active item follows the scene. Below the nav are Projects: "Storefronts · 17", "B2B", and "B2C", each with a coloured dot.
- A small caption sits under the window in `--color-muted`: "Checkpoint is a made-up app. The 55 specs and 17 storefronts are real." (Claude's call, since it keeps the invented part honest.)
- Entrance on first view: the window fades and rises, then the sidebar, the header, and the first scene follow in sequence (around 900 ms total), like ToDowl's boot.

### Scenes (each about 7 s; one loop is about 35 s)

1. **Runs**: header "Storefront release 24.11". About eight spec rows (login, quick-order, punchout-setup, cart, checkout, search, account, quote-request) flip from a spinner to a green check about every 350 ms, each with a duration. `quote-request.spec.ts · DE` turns red. A counter climbs to "54 / 55 passed". The cursor glides to the red row and clicks it (ripple).
2. **Trace**: on the left, a step list (`goto`, `fill`, `click "Request quote"`, then `expect(toast).toBeVisible()` with ✕). On the right, a wireframe storefront thumbnail with a red error banner. Below it, a network list where `POST /api/pricing 500` highlights and pulses. The cursor hovers it, then clicks "Ask AI".
3. **AI assistant**: echoes the screenshot Cesar shared. App mark plus "Good afternoon, Cesar". The cursor clicks the prompt box and types "Why did quote-request fail in DE?", then clicks send (ripple). The answer streams in three short lines: the pricing API returned 500 for DE only, other markets passed, likely a config issue rather than a flaky test. Chips appear: "Open trace", "Draft Jira ticket". The cursor clicks "Draft Jira ticket".
4. **Ticket**: fields fill in one after another: title, environment "DE storefront · staging", three repro steps, and evidence attachments `trace.zip` and `screenshot.png`. The cursor clicks **Create**, and a toast "QA-1432 created" slides in.
5. **Board**: columns To test, In progress, Blocked, and Passed. The QA-1432 card drops into Blocked with a red dot. The cursor drags "Checkout · MX" from In progress to Passed, and a tick animates. The header shows "17 storefronts". Then it loops to Runs.

All copy is in English, like the rest of the site.

### Behaviour

- **Clock:** a `useSceneClock(duration, playing)` hook advances `t` with requestAnimationFrame, throttled to about 30 updates/s. Scenes derive every state from `t` (row status, typed characters, cursor target). CSS transitions smooth the gaps. When `t` reaches the scene's duration, the next tab starts.
- **Cursor:** each scene declares keyframes `{ at, x, y, press? }` in percentages of the window. The cursor element is moved with `transform` and a transition. A press triggers a ripple keyframe.
- **Tabs:** a real `role="tablist"` with arrow-key navigation. Clicking a tab jumps to that scene at `t = 0` and keeps autoplay on.
- **Pausing:** autoplay pauses on hover, on focus inside the demo, when the demo is less than 30% on screen (IntersectionObserver), and when the browser tab is hidden. It resumes when those clear. The pause button holds it paused until pressed again.
- **Reduced motion:** no autoplay and no cursor. Each tab shows its scene's end state, and the tabs still switch on click.
- **Phones and tablets:** the window is laid out at a fixed design width and scaled to fit its container (`transform: scale`, computed from a ResizeObserver), with the height reserved so nothing shifts. The design width is 1040 px at 60rem and up. Below 40rem the sidebar is hidden and the design width is 600 px, so text stays legible. The tab bar scrolls sideways inside itself if it doesn't fit; the page never does.
- **Theme:** every colour comes from tokens, so light mode works without extra rules. Status colours use `--color-success` and `--color-error`.
- **Accessibility:** the whole demo is a `<figure>` with a visually hidden description of the loop. The animated contents are `aria-hidden`. The tabs and the pause button are the only focusable parts. Contrast meets AA in both themes.

### Files

- `src/components/demo/CheckpointDemo.tsx`: tabs, frame, clock, and pause logic.
- `src/components/demo/scenes.tsx`: the five scenes and their timelines.
- `src/components/demo/demo.css`: imported by the component, tokens only.
- `src/components/blocks/hero-section-1.tsx`: renders `<CheckpointDemo />`.
- `PRODUCT.md`: replace the "fake product chrome" anti-reference with "invented numbers presented as Cesar's results".
- `DESIGN.md`: a short section describing the demo and its rules.
- `tests/deep.spec.ts`: new checks (see below).

### Tests

- The demo renders with five tabs, and clicking a tab selects it.
- Autoplay advances the selected tab. With the pause button pressed it does not.
- With reduced motion, the demo doesn't advance and the first scene shows its end state.
- The existing no-horizontal-scroll and axe checks still pass on every device project.

## Left to the builder

Exact copy inside each scene, icon choices (lucide-react, already installed), easing and per-step timings within each scene, and the visual details of rows, cards, and the storefront wireframe, all within the tokens.
