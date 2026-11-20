# Mobile menu: drop-down panel with motion

Date: 2026-11-19 · Size: small change · Status: waiting on Cesar's approval

## Intent
Below 60rem (phones and tablets), the burger menu should feel as polished as todowl.com's: a panel that drops from the header instead of a full-screen sheet, with motion that feels good under a thumb. Today the icon swaps instantly, the sheet only fades in over 220 ms, and closing has no animation at all because React unmounts it.

## Goals
- The burger's three lines morph into an ✕ (about 300 ms) and back.
- On open, a rounded panel unfolds from just under the nav pill (about 350 ms, ease-out). Links stagger in 40 ms apart, rising a few pixels. On close, it folds back faster (about 200 ms), without the stagger.
- Each link has a lucide icon (Experience: Briefcase, Work: FolderKanban, Skills: Wrench, About: User, Contact: Mail), a hairline separator, a chevron, and an indigo dot on the current section. Links press down slightly on tap.
- The bottom row holds Download CV (PDF) and Email me, side by side.
- Behind the panel the page dims and blurs. Tapping that backdrop closes the menu.

## Non-goals
Changing the desktop nav. Adding accordions or sub-menus. New dependencies.

## Anti-goals
Opening or closing that feels slow. Layout shift in the nav bar. Losing the focus trap, Escape, scroll lock or focus return. Hidden links that can still be reached by Tab or a screen reader while the menu is closed.

## Approaches
- **Always mounted, toggled by `data-state` (picked):** CSS transitions handle open and close. When closed, the panel is `inert`, `aria-hidden` and `visibility: hidden` after its transition. No timers in React.
- Mount/unmount with a "closing" state and a timeout: works, but the timeout has to stay in sync with the CSS duration. More fragile.
- GSAP: removed from the repo on purpose in cd90458.

## Decided
- Same breakpoint as today (60rem). Same content, apart from the icons.
- Reduced motion gets a plain fade: no unfold, stagger or morph.
- Motion is tuned with the impeccable skill's animate guidance. Easing and durations come from the existing tokens (`--ease-out`, `--dur-*`).
- The existing Playwright mobile-menu tests must keep passing. A test is added: tapping the backdrop closes the menu, and closed links are not focusable.

## Left to the builder
Exact easing curves within the tokens, panel radius and shadow (from the tokens), and the icon-morph geometry.
