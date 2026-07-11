# Trevalt Studio

A high-performance, three-person engineering studio covering Android systems, full-stack web applications, and artificial intelligence/machine learning pipelines.

Trevalt is engineered to bypass typical learning curves, shipping robust, bespoke, production-ready software in weeks.

---

## 🛠️ Stack & Infrastructure

* **Web Architecture**: Next.js 14 (App Router) / React / Tailwind CSS
* **Animations & Physics**: GSAP / ScrollTrigger / Lenis (Smooth Scroll)
* **Design Systems**: Custom typography tokens (TAN Nimbus display, Space Grotesk, JetBrains Mono metadata scale, Fraunces serif)
* **Branding**: Winking mascot design assets and custom-processed transparent emojis

---

## 📂 Repository Structure

```text
├── app/                  # Next.js App Router (Layouts & Page Views)
│   ├── about/            # Founders overview grid with holographic feeds
│   ├── contact/          # System brief intake and mascot selfie layouts
│   ├── projects/         # Case studies list and detail layouts
│   └── globals.css       # Core typography variables and global reset rules
├── components/           # Reusable UI modules & layouts
│   ├── site-shell.tsx    # Global branding wrapper (Header / Navigation / Footer)
│   ├── homepage-client.tsx # Homepage GSAP animations, timelines, and cards
│   ├── loading-reveal.tsx # Dom-unmounted request loader (reusable submit buffer)
│   ├── hero-ascii-morph.tsx # Canvas-based interactive ASCII text particle layout
│   └── mockups.tsx       # Laptop and mobile hardware frame components
├── lib/                  # Static data models & constants
│   └── projects.ts       # Unified project database & metadata mapping
└── public/               # Asset distribution directory
    └── images/           # Cropped transparent mascot assets and icons
```

---

## ⚡ Local Development Setup

To run the Next.js development server locally, follow these steps:

1. **Clone & Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Environment**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

3. **Production Verification Build**:
   To compile and run an optimized production build:
   ```bash
   npm run build
   npm run start
   ```

4. **Linting Check**:
   To run static code analysis and linting validation:
   ```bash
   npm run lint
   ```

---

## 🚀 Architectural Notes

* **Density with Intention**: Layout containers avoid empty margins, grouping technical elements inside clean grid slots to maximize screen density.
* **Interactive Motion**: Scroll progress triggers GSAP animations for text reveal, device mockup scaling, and project slot items.
* **Mascot Stickers**: Playful, transparent mascot emojis appear across nav links, projects, case-studies, and sidebar widgets, scaling up on hover.
* **DOM-Unmounted Loading System**: Includes a pre-configured, reusable `<LoadingReveal />` component that plays a video loader before completely unmounting itself from the DOM to prevent FOUC (Flash of Unstyled Content).
