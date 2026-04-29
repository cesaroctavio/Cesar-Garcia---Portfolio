# Graph Report - .  (2026-04-28)

## Corpus Check
- Corpus is ~5,836 words - fits in a single context window. You may not need a graph.

## Summary
- 77 nodes · 74 edges · 9 communities detected
- Extraction: 68% EXTRACTED · 32% INFERRED · 0% AMBIGUOUS · INFERRED: 24 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_App Content Sections|App Content Sections]]
- [[_COMMUNITY_Evidence Portfolio Strategy|Evidence Portfolio Strategy]]
- [[_COMMUNITY_Accessible Navigation|Accessible Navigation]]
- [[_COMMUNITY_Design Token Pipeline|Design Token Pipeline]]
- [[_COMMUNITY_Motion Components|Motion Components]]
- [[_COMMUNITY_Hero Menu Behavior|Hero Menu Behavior]]
- [[_COMMUNITY_React Vite Bootstrap|React Vite Bootstrap]]
- [[_COMMUNITY_Typography Loading|Typography Loading]]
- [[_COMMUNITY_Target Audience|Target Audience]]

## God Nodes (most connected - your core abstractions)
1. `Portfolio App Shell` - 12 edges
2. `Evidence Control Room` - 5 edges
3. `Hero Header` - 5 edges
4. `Accessible Floating Navigation System` - 4 edges
5. `Proof Modules` - 4 edges
6. `QA Evidence Content Model` - 4 edges
7. `Hero Section` - 4 edges
8. `Motion Discipline` - 3 edges
9. `Interactive Resume Purpose` - 3 edges
10. `Portfolio SEO Metadata` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Favicon Signal Mark` --semantically_similar_to--> `Header Logo Signal Mark`  [INFERRED] [semantically similar]
  public/favicon.svg → src/components/blocks/hero-section-1.tsx
- `High-Craft Kinetic Brand Personality` --semantically_similar_to--> `Evidence Control Room`  [INFERRED] [semantically similar]
  PRODUCT.md → DESIGN.md
- `QA Evidence Content Model` --implements--> `Proof Modules`  [INFERRED]
  src/App.tsx → DESIGN.md
- `Portfolio App Shell` --implements--> `Interactive Resume Purpose`  [INFERRED]
  src/App.tsx → PRODUCT.md
- `Hero Section` --implements--> `Evidence Control Room`  [INFERRED]
  src/components/blocks/hero-section-1.tsx → DESIGN.md

## Hyperedges (group relationships)
- **Portfolio Evidence Narrative** — product_interactive_resume_purpose, design_evidence_control_room, app_qa_evidence_content_model, hero_section_hero_proof_panel [INFERRED 0.84]
- **Accessible Mobile Navigation Flow** — product_accessibility_inclusion, design_navigation_system, hero_section_mobile_navigation_a11y, hero_section_active_section_observer [INFERRED 0.86]
- **Tailwind Design Token Pipeline** — design_oklch_color_system, tailwind_oklch_token_theme, button_button_variants, postcss_css_postprocessing_pipeline [INFERRED 0.82]

## Communities

### Community 0 - "App Content Sections"
Cohesion: 0.13
Nodes (16): About Section, Capability Marquee, Contact Section, Contact Link Data, Experience Stack, Experience Evidence Data, Portfolio Footer, Portfolio App Shell (+8 more)

### Community 1 - "Evidence Portfolio Strategy"
Cohesion: 0.24
Nodes (10): Cesar Garcia Portfolio Design System, Evidence Control Room, Proof Modules, Hero Proof Panel, Hero Section, Portfolio SEO Metadata, Open Graph and Twitter Metadata, High-Craft Kinetic Brand Personality (+2 more)

### Community 2 - "Accessible Navigation"
Cohesion: 0.32
Nodes (8): Accessible Floating Navigation System, Favicon Signal Mark, Active Section Observer, Hero Header, Header Logo Signal Mark, Hero Navigation Menu Items, Mobile Navigation Accessibility Flow, Accessibility and Inclusion Requirements

### Community 3 - "Design Token Pipeline"
Cohesion: 0.29
Nodes (7): As Child Slot Composition, Button Component, Button Variant System, Dark OKLCH Color System, Run Signal Cyan, PostCSS Tailwind and Autoprefixer Pipeline, Tailwind OKLCH Token Theme

### Community 4 - "Motion Components"
Cohesion: 0.33
Nodes (7): Animated Group Component, Staggered Enter Animation Pattern, Motion Discipline, Animation Segment Component, Text Effect Component, Text Segmentation Strategy, Class Name Merge Helper

### Community 6 - "Hero Menu Behavior"
Cohesion: 0.5
Nodes (2): getFocusableElements(), handleKeyDown()

### Community 7 - "React Vite Bootstrap"
Cohesion: 0.5
Nodes (4): React Root Mount Point, React Bootstrap, Vite React Configuration, Source Directory Alias

### Community 8 - "Typography Loading"
Cohesion: 0.67
Nodes (3): Cabinet Grotesk and Figtree Typography System, External Font Loading Strategy, Tailwind Typography Theme

### Community 17 - "Target Audience"
Cohesion: 1.0
Nodes (1): Portfolio Target Users

## Knowledge Gaps
- **19 isolated node(s):** `Cesar Garcia Portfolio Design System`, `Rejected Portfolio Anti-Patterns`, `Portfolio Target Users`, `Open Graph and Twitter Metadata`, `External Font Loading Strategy` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Hero Menu Behavior`** (5 nodes): `getFocusableElements()`, `handleKeyDown()`, `handleScroll()`, `toggleMenu()`, `hero-section-1.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Target Audience`** (1 nodes): `Portfolio Target Users`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Portfolio App Shell` connect `App Content Sections` to `Evidence Portfolio Strategy`, `Accessible Navigation`, `React Vite Bootstrap`?**
  _High betweenness centrality (0.301) - this node is a cross-community bridge._
- **Why does `Hero Header` connect `Accessible Navigation` to `App Content Sections`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Why does `Evidence Control Room` connect `Evidence Portfolio Strategy` to `Motion Components`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Evidence Control Room` (e.g. with `High-Craft Kinetic Brand Personality` and `Hero Section`) actually correct?**
  _`Evidence Control Room` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `Accessible Floating Navigation System` (e.g. with `Accessibility and Inclusion Requirements` and `Mobile Navigation Accessibility Flow`) actually correct?**
  _`Accessible Floating Navigation System` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `Proof Modules` (e.g. with `Interactive Resume Purpose` and `QA Evidence Content Model`) actually correct?**
  _`Proof Modules` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Cesar Garcia Portfolio Design System`, `Rejected Portfolio Anti-Patterns`, `Portfolio Target Users` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._