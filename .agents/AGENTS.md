# Workspace Design Rules

These rules represent the aesthetic and architectural direction for the Trevalt website. Apply them to every page, component, and edit.

## 1. Density with Intention (Core Tension)
* Do not default to empty, spacious minimalism. Every section must feel full, packed, and intentionally engineered.
* Place type large enough to dominate, keeping content close together to establish a tight grid.
* Retain breathing room only where earned (e.g., around primary CTAs, before major section breaks), not distributed evenly out of habit.

## 2. Typography as Graphic Material
* Headlines should be large enough to function as graphic elements, not just readable text. Err on the side of too big.
* Display font: Use characterful display typography like **Space Grotesk** (`font-display`) and **Fraunces** (`font-founder`).
* Monospace font: Use **JetBrains Mono** (`font-mono`) for all technical/systemic labels, tags, index numbers, and metadata.
* Tight letter-spacing: Use negative tracking (`tracking-display` / `-0.03em`) on large display text to look confident and bespoke.
* Aggressive scale variation: Pair oversized display headlines immediately with tiny monospace labels to build high-contrast hierarchy.

## 3. High-Contrast Dark Theme & Saturated Accent
* Color Base: Dark, high-contrast base (`--paper: #080706`, `--card: #131211`) to group dense layout elements.
* Saturated Accent: Use exactly one saturated accent color (`--accent: #ff5500`) sparingly (roughly ≤10% of any surface). Reserve it strictly for key interactive anchors: primary CTAs, active/focus states, and crucial highlight cues.
* No decorative gradients: A gradient is only acceptable if it performs structural work (like subtle vignettes or depth guides).
* Flat surfaces: Use thin border lines (`border border-border`) for depth and structure. Avoid soft ambient drop shadows; shadow effects should only appear on hover/active states as indicators of clickability.

## 4. Asymmetric & Full-Bleed Layouts
* Sections must be full-bleed, spanning the full viewport width. Limit bounds only for readable text measures, never the section containers.
* Use asymmetric grids, varying horizontal offsets, and edge-running typography to avoid a templated grid look.
* Avoid nesting containers in cards. Demarcate sections with whitespace and thin rule lines instead. Wrap in cards only when grouping cohesive modular units (e.g., interactive mockups).
* Every section must carry real visual weight (e.g., interactive canvas, oversized number texture, big text, or mockup). Never leave a heading and a short paragraph floating in large empty spaces.

## 5. Precise & Interactive Motion
* Prioritize user-input-driven motion (scroll-scrubbed reveals, cursor proximity, and hover distortion) over passive autoplay animations.
* Easing should feel snappy, physical, and precise (high inertia/smooth deceleration, no bouncy spring overshoots).
* **Graceful degradation is mandatory**: Every motion element must disable or degrade cleanly under `prefers-reduced-motion` (using `useReducedMotion` or CSS media queries) without breaking UI layout or function.
* Prioritize smoothness over quantity. Avoid rendering animations that cause frame drops or layout jank.
