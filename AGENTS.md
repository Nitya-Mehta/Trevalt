# Trevalt Project Memory

This file is the shared, portable project memory for Trevalt. Keep it accurate as the repository changes. It records facts supported by the checkout and marks unavailable information explicitly.

## 1. Project Identity

- **Name:** Trevalt Studio (`package.json` name: `trevalt`).
- **Purpose:** Public portfolio and marketing site for a three-person software engineering studio, with a Supabase-backed client portal and administrative workspace.
- **Primary users:** Prospective clients browsing studio services and case studies; existing clients viewing project status; studio administrators managing requests, clients, projects, tasks, payments, and resource materials.
- **Tech stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Supabase Auth/Postgres through `@supabase/ssr` and `@supabase/supabase-js`. UI also uses Framer Motion, GSAP, Lenis, and Vercel Analytics. See `package.json` for exact versions.
- **Project state:** Public portfolio is available in source. Login, password recovery/setup, admin, and client portal routes currently show a static “Coming soon” screen; the former Supabase implementation remains in source for later restoration. Production deployment state and live service configuration are **Unknown** from this checkout.

## 2. Project Architecture

- `app/` contains App Router routes, layouts, server actions, metadata, sitemap, and robots rules.
  - Public pages: `app/page.tsx`, `app/about/`, `app/contact/`, `app/projects/`, and `app/terms/`.
  - Project case studies: `app/projects/[slug]/page.tsx` is a data-driven detail route; named routes such as `app/projects/geowav/` and `app/projects/newageit/` also exist and may take precedence for those paths.
  - Authentication/setup: `app/login/`, `app/forgot-password/`, `app/setup/`, and `app/auth/signout/`.
  - Admin portal: `app/admin/` and `app/admin/projects/[id]/`.
  - Client portal: `app/dashboard/` and `app/dashboard/projects/[id]/`.
  - Mutations are in `app/actions/` and use Next.js server actions.
- `components/` holds shared presentation and client-interaction components, including `site-shell.tsx`, `homepage-client.tsx`, request/client/project forms and dashboards, timelines, and task UI.
- `lib/projects.ts` is the static portfolio project catalog and type definition. `lib/founders.ts` contains founder profile data.
- `utils/supabase/client.ts` creates the browser Supabase client; `utils/supabase/server.ts` creates the cookie-aware server client; `utils/supabase/admin.ts` creates a service-role client that bypasses RLS.
- `public/` contains fonts, founder and mascot imagery, project logos/screenshots, and `skeleton.mp4` used by the interface.
- Data flow: public contact submissions use `app/actions/contact.ts` and the Supabase service-role client to write requests after a rate-limit check. Authenticated users are checked against `profiles.role` in portal layouts and server actions. Admin pages/actions use the service-role client after role checks. Client project pages query with the user's session client and rely on database RLS to scope records.
- Tables referenced by application queries: `profiles`, `requests`, `login_attempts`, `client_projects`, `project_tasks`, `payments`, and `materials`. Relations/columns can be inferred from select/insert/update statements in `app/`, but the database schema and RLS policies are **Unknown** because no migrations/schema files are present in the inventoried repository.
- Styling tokens and global reset live in `app/globals.css`; Tailwind maps those CSS variables in `tailwind.config.ts`. Aliases `@/*` map to the repository root in `tsconfig.json`.

## 3. Setup and Development Commands

- **Prerequisite:** Node.js/npm versions are not pinned in the repository; use a version compatible with the installed Next.js dependency. `package-lock.json` is the npm lockfile.
- Install: `npm install` (documented in `README.md`; not run during this inspection).
- Development: `npm run dev`.
- Production build/start: `npm run build`, then `npm run start`.
- Lint: `npm run lint` runs ESLint 9 with the Next 16 flat config in `eslint.config.mjs`. Existing portal code still produces warnings; the command exits successfully.
- Tests: no test files or test script were found in the repository file inventory. Playwright is a dev dependency and is mentioned in portfolio content for a separate showcased project; that does not establish an app-level test suite.
- Deployment process: **Unknown**. Vercel Analytics is installed and the code has Vercel URL fallbacks, but deployment configuration is not present in the checked-in files.
- Environment variable names referenced by source (names only):
  - `NEXT_PUBLIC_SUPABASE_URL` — required by all Supabase clients.
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — required by browser/server session clients.
  - `SUPABASE_SERVICE_ROLE_KEY` — required by admin/service-role operations; keep server-only and secret.
  - `IP_HASH_SECRET` — optional in source; used to HMAC contact IPs. The current code falls back to a hard-coded default if unset.
  - `NEXT_PUBLIC_SITE_URL` — optional reset-email redirect base, defaulting to localhost.
  - `NEXT_PUBLIC_BASE_URL` — optional metadata/robots/sitemap base, defaulting to `https://trevalt.vercel.app`.
- No `.env` file is tracked in the listed project files. Configure secrets through the local environment/deployment provider; never add credentials to source control.

## 4. Permanent User Instructions

### Explicit project-owner instruction

The owner requested a persistent, portable, AI-independent root `AGENTS.md` that functions as project memory and handoff. Future coding sessions should read it before meaningful changes, inspect the repository as the source of truth, update status/history/handoff after meaningful work, preserve useful history, avoid invented facts, and never store secrets or confidential data. The source request was provided as a pasted text attachment during the 2026-11-02 session; only that accessible request is represented here.

No other standing code-style, architecture, or product constraints from the owner are known in this checkout.

### Existing repository conventions (observed, not additional user requirements)

- TypeScript/TSX with strict type checking and `@/*` root imports.
- App Router routes and server components by default; interactive components opt into `'use client'`.
- Tailwind utility classes and CSS custom properties define most visual styling.
- Supabase access is centralized in `utils/supabase/` and mutations in `app/actions/`.

### AI recommendations

- Treat the schema, RLS policies, deployment configuration, and external service settings as unverified until their source of truth is available.
- Prefer extending existing route/component/data patterns and keep service-role usage on the server behind explicit authorization checks.

## 5. Coding Standards and Conventions

- Follow existing TypeScript and App Router patterns; `tsconfig.json` enables `strict` and `noEmit`.
- Use server components for data retrieval where already established; mark browser-interactive components with `'use client'`.
- Use `utils/supabase/server.ts` for authenticated server-side operations and `utils/supabase/client.ts` in browser components. `utils/supabase/admin.ts` bypasses RLS: never expose it to browser code, and authorize callers before using it in server actions/pages.
- Existing role authorization reads `profiles.role`; admin is `admin`, client is `client`. Portal layouts also route users who have the wrong role away from the portal.
- Use the CSS variables in `app/globals.css` through Tailwind's configured color/font tokens where practical.
- No formatter configuration, comprehensive test conventions, or database migration workflow was found. Follow nearby code and verify before introducing a new convention.
- Several server actions use `any` for action state or database rows. This is existing code, not a direction to expand untyped patterns.

## 6. Features and Implementation Status

### Present in source

- Public homepage, About, Contact, Terms, and portfolio listing/case studies.
- Static project catalog for NewAgeIT, GeoWav, ParkEase, Sparkline, and NoteStack in `lib/projects.ts`.
- Contact form server action with request insertion and a seven-day per-IP-hash/email rate limit (`app/actions/contact.ts`).
- Supabase email/password login, role-based portal redirect, client provisioning, first-login password setup, temporary-password continuation, and forgot-password request (`app/actions/auth.ts`).
- Admin request status, client roster/provisioning, project setup/workspace, metadata, task and payment actions, and materials vault.
- Client project dashboard and read-only project timeline/task views.
- The login, forgot-password, setup, `/admin/*`, and `/dashboard/*` page entrypoints are temporarily unwired and render `ComingSoon` (`components/coming-soon.tsx`). The original actions/components and data modules remain in the repo for later restoration. `components/auth-nav-links.tsx` now links to the placeholder portal page without creating a Supabase client.
- The `/projects` directory displays all five project logos and links to their case studies. `lib/projects.ts` contains screenshot paths for all five projects; keep these paths synchronized with `public/projects/`.
- Metadata, sitemap, robots rules, and Vercel Analytics integration.

### Partial or uncertain

- Password reset email points to `/reset-password`, but no `app/reset-password` page or route exists in this checkout. Whether another external flow handles it is **Unknown**.
- The client dashboard and project detail flow assume database RLS correctly limits each client to their own projects/tasks/payments; policies are not included here and need verification against the Supabase project.
- `README.md` describes the web architecture as Next.js 14, while `package.json` declares Next.js `^16.2.10`; update documentation when the dependency version is confirmed as intended.
- Deployment, configured Supabase schema, and production behavior have not been verified.

### Roadmap

- No approved roadmap or explicit planned features were found. Do not convert suggestions or uncertain gaps into approved requirements without owner input.

## 7. Architectural Decisions and Rationale

- **App Router:** Confirmed by the `app/` route tree and Next.js configuration. The rationale is not recorded.
- **Supabase for auth and persisted portal data:** Confirmed by dependencies and `utils/supabase/` usage. Historical rationale is unknown.
- **Static public case study data:** Confirmed by `lib/projects.ts` and its consumers. Rationale is unknown.
- **Service-role Supabase client:** Present for admin operations and public contact submission. `utils/supabase/admin.ts` explicitly warns that it bypasses RLS. Public contact action adds validation and rate limiting, but the rate-limit secret has a hard-coded fallback (see Known Issues).
- No additional architectural decision records or migrations were found. Do not invent rationale from implementation alone.

## 8. Current Development State

- Repository checkout inspected on 2026-11-02. Current branch is `main`, at `eeedb4c` (`Minor bug changes`), tracking `origin/main` according to Git metadata.
- Local `.env.local` has been created and is ignored by Git. The Supabase URL, anon key, and service-role key are still blank and must be copied from the intended Supabase project; a local IP hashing secret was generated. No actual secret values are recorded here.
- The last commit shown is dated 2026-07-16. Recent preceding commits cover project/business cards, project case studies, and SEO changes in July 2026.
- The working tree contains uncommitted dependency updates in `package.json` and `package-lock.json`: ESLint `^9.39.5`, `eslint-config-next` `^16.4.3`, and a `minimatch` `^11.0.1` override. These align the lint dependency with Next.js 16 and remediate the reported npm audit advisories. `npm audit` reported zero vulnerabilities after the updates.
- The 2026-11-02 visual overhaul established the dark editorial system in `DESIGN.md`, refreshed public pages, shared controls and states, and preserved the morphing wordmark and draggable project cards.
- A later owner request narrowed the visual direction: the homepage first screen now shows only Trevalt, and public layouts use less copy and ornament. The project-directory imagery remains in place.
- Login and private portal page entrypoints temporarily show a shared Coming soon screen by the owner's later request. Their prior route implementations are copied into `features/portal/`; auth actions and data components remain in place.
- The project directory was repaired on 2026-11-02: all five logo assets are visible, ParkEase and Sparkline have screenshot paths in `lib/projects.ts`, and all five case-study routes rendered in Chrome.
- TypeScript and the production webpack build pass. `npm run lint` exits successfully with warnings from retained code. Public pages and the temporary portal screen were reviewed in Chrome at desktop and 390px mobile widths. Authenticated behavior and contact submission remain unverified because local Supabase credentials are blank.

## 9. Active Tasks and Roadmap

| Task | Status | Notes |
| --- | --- | --- |
| Create initial repository memory and handoff | Completed | Root `AGENTS.md`, based on inspected source and available conversation. |
| Keep login and private portal screens as Coming soon | Completed | Former route pages/layouts are preserved in `features/portal/`; Supabase actions remain in place. |
| Complete visual overhaul | Completed for active routes | Dark design system, five case studies, public pages, shared states, temporary portal screen, and responsive QA. Restored portal screens will need fresh visual QA when activated. |
| Simplify the public site around Trevalt | Implemented | Brand-only homepage hero; pared-back Work, About, Contact, founder cards, case-study labels, and shell. |
| Restore project directory imagery and verify case-study links | Completed | All five project logos load on `/projects`, and all five case-study routes rendered in browser QA. |
| Verify Supabase schema and RLS policies | Pending / needs external schema | No schema or migration files found locally; especially important for client data isolation. |
| Verify password reset flow | Pending / needs verification | Source redirects to `/reset-password`; no matching route exists in the checkout. |
| Reconcile README's Next.js version | Pending / owner intent unknown | README says 14; `package.json` specifies 16. |

These verification entries record concrete documentation gaps, not approval to change application behavior. No other roadmap items are known.

## 10. Known Issues and Warnings

- **Confirmed source/config mismatch:** README claims Next.js 14; `package.json` specifies Next.js `^16.2.10`.
- **Confirmed missing local route:** `forgotPassword` sends reset email links to `/reset-password`, but the route is absent from the checked-in `app/` tree. Verify intended reset handling.
- **Security-sensitive behavior:** `utils/supabase/admin.ts` uses the service-role key and bypasses RLS. Review every use for server-only execution and authorization. Public contact submission is intentionally unauthenticated and relies on form validation/rate limiting.
- **Weak fallback secret:** `app/actions/contact.ts` falls back to the literal `default-trevalt-secret` when `IP_HASH_SECRET` is unset. A production deployment should configure a strong secret; do not copy actual secret values into this file.
- **External database assumptions:** Portal privacy depends on Supabase RLS and relational constraints not represented in this repo. Treat client data isolation as unverified until policies/schema are checked.
- **Lint baseline:** `npm run lint` now runs successfully under Next.js 16, with warnings in retained portal/server-action code (mostly explicit `any` and a React effect warning). These were not changed for a visual task.
- **Local build permissions:** Standard sandboxed Next builds hit Windows `EPERM` while creating generated route directories; a normal-permission webpack build completed successfully. The temporary build configuration was removed.
- **Dependency audit:** The pasted npm audit output reported vulnerable transitive lint dependencies. The lint packages were aligned with Next.js 16 and vulnerable `minimatch` versions were overridden to patched 11.x; the final registry-backed `npm audit` reported zero vulnerabilities. The audit result applies to the current lockfile and may change as advisories/dependencies change.
- The ignored `.env.local` still has blank Supabase credentials; active public contact submission requires a configured Supabase project.

## 11. AI Development History

### 2026-11-02 — Initial project memory setup

- **AI/Tool:** Codex, repository inspection tools.
- **User request:** Create or update root `AGENTS.md` as a portable project memory and next-AI handoff, based on facts accessible from the repository and current request.
- **Work performed:** Inspected project file inventory, README, package/configuration, Supabase clients, server actions, portal layouts/pages, data models, routes, environment variable references, and recent Git history. Added this memory file; no application source changes.
- **Files affected:** `AGENTS.md` (created).
- **Decisions:** Marked database schema, RLS, deployment, and test/build state as unknown where unavailable. Kept the uncommitted `package.json` and `package-lock.json` changes untouched.
- **Validation:** No build, lint, or tests run. Files and Git metadata were read; root memory content was created from those observations.
- **Outstanding issues:** See sections 6, 9, and 10.
- **Handoff:** Verify Supabase schema/RLS and password reset routing before changing related behavior; inspect the existing manifest and lockfile diffs before dependency work.

### 2026-11-02 — npm audit remediation

- **AI/Tool:** Codex, npm registry and local dependency inspection.
- **User request:** Fix the issues in the pasted Windows PowerShell/npm audit output.
- **Work performed:** Updated `eslint-config-next` to `^16.4.3` to match Next.js 16, set ESLint to `^9.39.5` to satisfy the config's supported peer range, and replaced the stale `glob` override with a patched `minimatch` `^11.0.1` override. Regenerated the npm lockfile.
- **Files affected:** `package.json`, `package-lock.json`, and this `AGENTS.md` status/history entry.
- **Validation:** `npm audit` completed with `found 0 vulnerabilities`; resolved ESLint packages use `minimatch@11.0.4` and `brace-expansion@5.0.12`. No build, lint, or application tests were run.
- **Outstanding issues:** `npm install` still emitted a deprecation notice for ESLint 9.39.5; this does not represent a reported vulnerability. Existing Next 16 lint-script compatibility remains unverified.
- **Handoff:** Preserve the dependency changes and rerun `npm audit` after future dependency updates. Consider aligning the `lint` script/config with Next 16 in a separate change.

### 2026-11-02 — Local environment file

- **AI/Tool:** Codex, repository inspection tools.
- **User request:** Explain the environment variables and make an environment file.
- **Work performed:** Created ignored `.env.local` with all environment variables referenced by the app, local URL defaults, blank Supabase credentials, and a generated IP hashing secret.
- **Files affected:** `.env.local` (ignored local config) and `AGENTS.md` (status/handoff only).
- **Validation:** Confirmed `.env.local` is ignored by Git. Checked that no Supabase credentials were available in the current process environment; no secrets were displayed or copied into this memory file.
- **Outstanding issues:** Supabase URL, anon key, and service-role key still need to be supplied from the user's Supabase project.
- **Handoff:** Fill the three blank Supabase values in `.env.local`; keep the service-role key server-side and do not commit `.env.local`.

### 2026-11-02 — Temporarily unwire login and private portal

- **AI/Tool:** Codex, repository editing tools.
- **User request:** “Un wire the /login and the private screens. just say coming soon in those pages for now, no need of env and all, we will later restore it”.
- **Work performed:** Added a shared `ComingSoon` screen; replaced login, forgot-password, setup, admin, and dashboard page entrypoints with it; simplified admin/dashboard layouts to pass through their placeholder pages; replaced session-aware public nav with a static Portal link. Supabase auth actions and the existing feature components/data code remain present for restoration.
- **Files affected:** `components/coming-soon.tsx`, `components/auth-nav-links.tsx`, `app/login/page.tsx`, `app/forgot-password/page.tsx`, `app/setup/page.tsx`, `app/admin/layout.tsx`, `app/admin/page.tsx`, `app/admin/clients/page.tsx`, `app/admin/materials/page.tsx`, `app/admin/projects/page.tsx`, `app/admin/projects/[id]/page.tsx`, `app/dashboard/layout.tsx`, `app/dashboard/page.tsx`, and `app/dashboard/projects/[id]/page.tsx`.
- **Decisions:** Kept auth actions and feature components in the repo so they can be restored later. Replaced route entrypoints directly so rendering private pages does not invoke Supabase.
- **Validation:** Source-level inspection only; no tests, lint, or build run.
- **Outstanding issues:** `/auth/signout` and server actions still require Supabase if called directly; they are no longer linked from the shared navigation or these pages. Other Supabase-dependent features, such as submitting the public contact form, still need environment configuration when used.
- **Handoff:** Portal pages are placeholders by request. Restore the original route modules/layouts when the user asks to bring authentication and private screens back.

### 2026-11-02 — Complete website visual overhaul

- **AI/Tool:** Codex, repository editing tools, Next.js build, TypeScript, ESLint, Chrome browser review.
- **User request:** Apply the installed minimalist, premium visual design, and Impeccable skills to redesign the entire Trevalt interface while preserving its signature interactions. The owner subsequently requested that login and private portal routes stay unavailable online while their working code remains in the repository.
- **Work performed:** Created `DESIGN.md`; rebuilt the dark typography, color, spacing, control, and responsive system in `app/globals.css`; redesigned shared navigation/footer, homepage and throwable cards, projects directory, five case studies, About founder cards, Contact form, Terms, and loading/error/not-found states. Kept the morphing wordmark, drag physics, forms, links, and existing data actions. Saved the former private route implementations and role-aware navigation in `features/portal/`; styled the active Coming soon screen. Updated the Next 16 lint script/config.
- **Files affected:** `DESIGN.md`, `app/globals.css`, `app/layout.tsx`, public route pages in `app/`, `components/site-shell.tsx`, `components/homepage-client.tsx`, `components/founder-card.tsx`, `components/project-detail.tsx`, `components/requests-dashboard.tsx`, `components/coming-soon.tsx`, `app/error.tsx`, `app/loading.tsx`, `app/not-found.tsx`, `features/portal/`, `package.json`, `eslint.config.mjs`, and this memory file. The portal entrypoint replacements are recorded in the preceding history entry.
- **Decisions:** Warm metal `#c8ab82` is the single nonsemantic accent against charcoal and warm off-white. Public pages are editorial; the retained private components use a more restrained workspace treatment. Long case-study stories follow short hero taglines so mobile pages establish hierarchy before dense content.
- **Validation:** `npx tsc --noEmit` passed; `npm run build -- --webpack` completed with exit code 0 using normal filesystem permissions; `npm run lint` exited 0 with existing warnings. Chrome review covered desktop and 390px mobile public pages, the portal placeholder, contact form, projects directory, and a case study. The morphing wordmark and draggable project cards were observed in the UI; live portal actions and contact submission were not exercised because Supabase values are blank. The installed Impeccable engine could not initialize in this environment, so its audit, distill, typeset, and polish reference workflows were applied manually.
- **Outstanding issues:** Re-test archived admin/client UI against real data after reactivation. Some existing lint warnings remain. README's Next.js version and the missing reset-password route remain separate issues.
- **Handoff:** See `DESIGN.md` for design rules and `features/portal/README.md` for private-route restoration. Keep `.env.local` ignored and add Supabase credentials only when the portal or contact submission needs to run.

### 2026-11-02 — Restore project directory imagery

- **AI/Tool:** Codex, local Next.js app in Chrome, repository inspection tools.
- **User request:** Fix the project links and missing project images.
- **Work performed:** Restored logo images in the text-focused `/projects` directory, added ParkEase and Sparkline screenshot paths to `lib/projects.ts`, and adjusted the responsive row grid for its image column. Confirmed NewAgeIT, GeoWav, ParkEase, Sparkline, and NoteStack case-study routes render.
- **Files affected:** `app/projects/page.tsx`, `app/globals.css`, `lib/projects.ts`, and this `AGENTS.md` entry.
- **Decisions:** Kept the existing project destinations because the case-study routes loaded. Used local image assets; bypassed Next image optimization for the small logo thumbnails after the optimized thumbnails appeared blank in the running app.
- **Validation:** Browser QA on the running app: `/projects` rendered all five rows and each local logo had `complete=true` and nonzero natural width. Visited all five case-study paths and confirmed their content rendered. No automated tests or build run.
- **Outstanding issues:** None identified in the verified project routes or local image assets.
- **Handoff:** Keep image paths in `lib/projects.ts` synchronized with files under `public/projects/`.

### 2026-11-02 — Minimal Trevalt-first revision

- **AI/Tool:** Codex, repository editing tools, TypeScript, ESLint, production webpack build, Chrome desktop/mobile review.
- **User request:** Remove the homepage pitch, service inventory, and studio statement; make the site minimal and centered on Trevalt.
- **Work performed:** Replaced the homepage opening with a full-height morphing Trevalt wordmark and a legible mobile treatment. Simplified the shared header/footer, Work rows while retaining project imagery, About founder cards while retaining flip and profile links, Contact while retaining its fields/action, and case-study labels. Kept the portal routes paused.
- **Files affected:** `components/homepage-client.tsx`, `components/hero-ascii-morph.tsx`, `components/site-shell.tsx`, `components/founder-card.tsx`, `app/globals.css`, `app/projects/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`, five named case-study pages, `DESIGN.md`, and this file.
- **Validation:** TypeScript, lint, and the final production webpack build passed. Chrome desktop and 390px mobile review covered the homepage, Work, Contact, About, and a case study. The simplified founder cards rendered and flipped correctly; a draggable project card moved and its project link opened the case study. Contact submission was not exercised because local Supabase credentials are blank.
- **Handoff:** Follow the restrained brand-first direction in `DESIGN.md`, preserve the morphing wordmark and project drag physics, and keep the private portal archived until requested.

### 2026-11-02 — Dark brutalist refinement and original About cards

- **AI/Tool:** Codex, repository editing tools, TypeScript, ESLint, production webpack build, Chrome desktop/mobile review.
- **User request:** Make the site modern and brutalist with substantial empty space. The owner clarified that the space must remain dark and explicitly asked to restore the original About business cards and their colors.
- **Work performed:** Kept the Trevalt-only opening; increased breathing room and strengthened straight rules and square framing across the homepage, Work, Contact, case studies, and shared shell. Applied a near-black canvas with off-white type and restrained orange interaction color. Restored the three original About business card designs from the repository, including their navy, cream, red, and black artwork and profile links. Adjusted the card interaction so click and keyboard activation reliably flip them without the old hover/click conflict, and corrected a visible spelling error on Nitya's card.
- **Files affected:** `app/globals.css`, `components/hero-ascii-morph.tsx`, `components/founder-card.tsx`, five named case-study pages, `DESIGN.md`, and this memory file.
- **Decisions:** “White space” means generous empty space, not a light background. Original business card artwork is an intentional colorful exception to the otherwise restrained dark system.
- **Validation:** TypeScript, quiet lint, and the final production webpack build passed. Chrome review covered desktop homepage and About, plus 390px mobile homepage, About, Work, Contact, and GeoWav case study. The rebuilt About page flipped by click and Space key; profile links were visible. Contact submission was not exercised because Supabase values are blank.
- **Handoff:** Follow the current dark direction in `DESIGN.md`. Keep the business cards’ original artwork and colors. The portal remains paused behind Coming soon screens.

### 2026-11-02 — Compact services strip, drag boundary, founder portraits

- **AI/Tool:** Codex, TypeScript, ESLint, Next.js production build.
- **User request:** Tune hover colors, keep the site full width and compact, mark the homepage draggable card bounds, add a concise services and contact section below Trevalt, and show founder faces with hover flipping.
- **Work performed:** Added the compact Web/Android/AI strip and Contact link under the wordmark; drew an inset boundary around the draggable-card area; compacted major section spacing; made nav and card hover states use the orange accent; restored local founder portraits as overlays on the original business card fronts and enabled hover flipping.
- **Files affected:** `components/homepage-client.tsx`, `components/founder-card.tsx`, `app/about/page.tsx`, `app/globals.css`, `DESIGN.md`, and this file.
- **Validation:** TypeScript, quiet lint, and production webpack build passed. Browser review for this final iteration remains pending.
- **Handoff:** Keep the full-width dark layout, the draggable boundary on desktop and stacked card layout on small screens, and the original business-card color artwork.

### 2026-11-02 — Full-width homepage and separated portraits

- **AI/Tool:** Codex, repository editing tools, TypeScript, ESLint.
- **User request:** Remove excessive side gaps from the homepage and fix founder photos that covered the About business cards.
- **Work performed:** Removed the homepage's 1440px content cap from the services, Work, and draggable sections, retaining only a small responsive edge inset. Moved the three founder portraits into their own profile rows above the original business cards.
- **Files affected:** `components/homepage-client.tsx`, `components/founder-card.tsx`, `app/about/page.tsx`, `app/globals.css`, `DESIGN.md`, and this file.
- **Validation:** TypeScript, quiet lint, and production webpack build passed. Browser review after these latest changes remains pending.
- **Handoff:** The image and title regions are separate; keep faces outside the custom card artwork.

### 2026-11-02 — Restore brand mark and expand portfolio media

- **AI/Tool:** Codex, repository inspection, TypeScript, ESLint, production webpack build, Chrome review.
- **User request:** Restore the Trevalt logo, keep numbered services left and Contact right, fill GeoWav's oversized dark preview with more existing images, and make Projects full width.
- **Work performed:** Restored the mascot logo beside the Trevalt wordmark in the shared header. Added a three-screen GeoWav image composition using existing screenshots. Removed the max-width cap from the Projects index and increased its preview column width.
- **Files affected:** `components/site-shell.tsx`, `components/homepage-client.tsx`, `app/projects/page.tsx`, `app/globals.css`, `DESIGN.md`, and this file.
- **Validation:** TypeScript, quiet lint, and production webpack build passed. Chrome review confirmed the restored logo and homepage content, three GeoWav images, and full-width Projects layout.
- **Handoff:** Keep the brand mark in the shared header, the services row aligned across the page, and the Project index full width.

### 2026-11-02 — Replace Contact form with email directory

- **AI/Tool:** Codex, repository editing tools, TypeScript, ESLint.
- **User request:** Replace the Contact page form with the studio email and all three founder emails.
- **Work performed:** Replaced the form with four direct email links and removed the page's client-side form state and currency lookup. Updated Contact metadata to describe the email directory.
- **Files affected:** `app/contact/page.tsx`, `app/contact/layout.tsx`, `app/globals.css`, and this memory file.
- **Validation:** TypeScript and quiet lint passed. Contact submissions are no longer part of the page; each address uses a `mailto:` link.
- **Handoff:** Current Contact destinations are `trevalt.tech@gmail.com`, `nityachintan@gmail.com`, `aaravhalvadiya@gmail.com`, and `devanshuverma72@gmail.com`.

### Prior history

Git history is available and should be used for file-level changes. Recent visible commits are listed in section 8. Prior AI conversations and their implementation rationales are unavailable; no earlier AI history is fabricated here.

## 12. Next AI Handoff

1. **Current purpose:** Trevalt's redesigned Next.js studio portfolio. Login and private portal routes intentionally show Coming soon; their original implementations are preserved in `features/portal/`.
2. **Last significant work:** Dark brutalist public-site refinement and restoration of the original About business cards on 2026-11-02, with project-directory imagery retained.
3. **Unfinished:** Restore auth/private pages only when requested; then review them visually with real data. Supabase schema/RLS and deployment configuration are unverified; `.env.local` needs Supabase credentials for contact submission or restored portal use; README's Next.js version may be stale.
4. **Logical next step:** If asked to restore the portal, start with `features/portal/README.md`, the archived route modules, and the existing actions/components; verify Supabase schema/RLS and reset-password routing. For public visual work, follow `DESIGN.md`.
5. **Inspect first:** `package.json`, `README.md`, the relevant `app/` route and server action, then `utils/supabase/` and any external schema source.
6. **Constraints:** Follow the owner’s persistent-memory instruction above; preserve existing architecture unless the task requires a change; keep service-role code server-only and authorized; do not store credentials.
7. **Blockers/risks:** Supabase policies/schema and deployment settings are not in this checkout. `.env.local` has blank Supabase credential values. Contact form submission and direct signout/server-action calls still need configured Supabase credentials. Existing portal code has lint warnings; TypeScript, webpack build, and lint exit successfully.
8. **Avoid changing:** Do not overwrite the dependency updates in `package.json` or `package-lock.json` without first reviewing them. Do not assume the database schema, RLS policies, reset flow, or production status.

## Rules for AI Agents

1. Read `AGENTS.md` before making meaningful project changes.
2. Inspect the relevant source code and configuration instead of blindly trusting this memory file.
3. Follow applicable project instructions and existing conventions unless they conflict with higher-priority instructions or an explicit new user request.
4. Preserve the project's existing architecture unless a change is required or approved.
5. Do not silently disregard standing user instructions.
6. Record significant new user requirements and architectural decisions.
7. Update current development status after meaningful changes.
8. Record relevant completed work and outstanding issues.
9. Document files affected by significant modifications.
10. Record validation accurately, including failures and checks not run.
11. Keep the next-AI handoff section updated.
12. Never delete meaningful historical information without preserving it appropriately.
13. Never store passwords, tokens, private keys, confidential data, or unnecessary personal information.
14. Never manufacture development history or claim access to unavailable conversations.
15. When instructions conflict or are ambiguous, follow applicable instruction priority and ask the project owner when necessary.
16. Avoid unnecessary duplication, outdated information, and excessive file growth.
17. Treat the repository and its configured external sources as the source of truth for implemented behavior.
18. Make every meaningful update useful to an AI that has never seen this project before.
