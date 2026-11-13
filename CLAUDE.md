# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Bilingual (ES/EN) personal developer portfolio. Two independent npm packages, no workspace tooling — run commands from inside `frontend/` or `backend/`:

- `frontend/` — Next.js 16 (**Pages Router**), React 19, TypeScript, TailwindCSS 3, Motion (`motion/react`), Lenis, zod 4, EmailJS.
- `backend/` — Express + Prisma (PostgreSQL). Currently **not used by the frontend** (see "Projects data" below).

There is no test suite in either package.

## Commands

Frontend (`cd frontend`):
- `npm run dev` — dev server on http://localhost:3000
- `npm run build` / `npm start`
- `npm run lint` — `eslint .` (flat config in `eslint.config.mjs`: `eslint-config-next` core-web-vitals + typescript). `next lint` no longer exists in Next 16.

Backend (`cd backend`, requires `DATABASE_URL` in `.env`):
- `npm run dev` — ts-node-dev on port 5000 (`PORT` env); auto-retries the next port up to 5 times if in use
- `npm run build` (tsc → `dist/`) / `npm start`
- `npm run prisma:migrate`, `npm run prisma:generate`, `npm run prisma:seed`, `npm run prisma:studio`

## Frontend architecture

**Single page.** `pages/index.tsx` stacks all section components (Navbar, Hero, Services, Projects, Skills, Experience, About, Education, Contact, Footer) and sets `<title>`/meta from `labels.meta`. `pages/_app.tsx` wraps everything in `ThemeProvider` → `LocaleProvider` → `SmoothScroll` (Lenis + `MotionConfig`), loads the fonts with `next/font` and renders the fixed `AnimatedBackground`.

**Navigation.** Scroll to a section with `useScrollToSection()` (`src/hooks/useScrollToSection.ts`), which goes through Lenis — don't call `window.scrollTo`/`scrollIntoView` directly. The menu items are the `NAV_SECTIONS` array in `components/Navbar.tsx`; each id must be a section `id` and a key in `content/{locale}/nav.ts`. `useActiveSection` drives the active-item pill.

**i18n is a custom system, not a library.**
- All user-facing text lives in `src/content/{es,en}/*.ts`, one file per section. Both locales must export the same shape — when adding/changing text, edit both `es` and `en`.
- `src/hooks/useContent.ts` statically imports every content module for both locales and returns the active one. A new content file must be wired in here.
- `src/context/LocaleContext.tsx` holds the locale (default `es`, persisted to `localStorage.locale`). `toggleLocale` runs a fade-out → swap → fade-in sequence exposing `fadePhase`, which `index.tsx` uses to fade the whole page.
- UI strings that aren't section content (form placeholders, zod validation messages, send errors, loading/error states, aria-labels) live in `src/content/{locale}/labels.ts`. Don't hardcode text in components.
- `LocaleContext` also keeps `<html lang>` in sync with the active locale.
- Shared content types (e.g. `EducationItem`, `Certification`) are in `src/content/types.ts`.

**Projects data.** `src/data/projectsData.ts` is the real source of projects (static array with image paths under `public/images/projects/<project>/`). `getProjects(locale)` is synchronous and fills each project's `description` from `src/content/{locale}/projects.ts` via a title → key map (`titleToKey`). Adding a project means: add the entry in `projectsData.ts`, add its description key in both `content/*/projects.ts`, and add the title mapping. The backend `/api/projects` endpoint mirrors the `Project` shape (`backend/prisma/schema.prisma`) but is not fetched yet.

**Skills & tech icons.** Skill lists live in `src/content/{locale}/skills.ts` (categories `frontend`, `tools`, `ai`, `backend`, `database`), each item with an `iconKey`. `components/Skills.tsx` renders them as a bento grid plus a logo marquee. `src/utils/getTechIcon.tsx` maps `iconKey` → react-icons component (or custom SVGs in `src/utils/customIcons.tsx`) and to a brand color. New technologies need entries in both `iconMap` and `brandColorMap`. Render icons with the `<TechIcon iconKey=… />` component (not by pulling a component out of a function during render — the React Compiler lint rule `react-hooks/static-components` rejects that).

**Images.** Everything under `public/` is WebP, pre-resized to display size (project screenshots ≤1600px wide, avatar 512px, logos 256px). Components render images with `next/image` (`fill` + `sizes` for the carousel/covers, fixed `width`/`height` for logos). New images should be converted to WebP before committing (`sharp` is available via `next`).

**Theme.** `ThemeContext` toggles the `dark` class on `<html>` (Tailwind `darkMode: 'class'`). An inline script (`themeInitScript`, injected in `pages/_document.tsx`) applies the class before first paint from `localStorage.theme`; with nothing stored the site is dark unless the system explicitly prefers light (the design is dark-first). The context then syncs from the DOM on mount. The theme is only written to `localStorage` when the user toggles it.

**Design tokens.** Colors are CSS variables in `styles/globals.css` (`:root` = light, `.dark` = dark) mapped in `tailwind.config.js` as `bg`, `surface`, `surface-2`, `line`, `fg`, `muted`, `accent`, `accent-2`, `accent-fg`. Use these tokens instead of `gray-*` + `dark:` pairs. `accent-fg` is the accent tone that is legible as text; `.text-gradient`, `.btn-primary`, `.btn-secondary`, `.card`, `.chip`, `.eyebrow` and `.input` are the shared component classes. Fonts: `font-display` (Space Grotesk, headings), `font-sans` (Inter), `font-mono` (JetBrains Mono).

**Animation.** Reusable primitives live in `components/ui/`: `Reveal`/`RevealGroup`/`RevealItem` (scroll entrance), `SectionHeading` (eyebrow + word-by-word title; use it for every section), `SplitWords`, `Magnetic`, `TiltCard` (the `.card` with cursor glow + tilt) and `Marquee`. Hero entrance animations are plain CSS (`animate-fade-up`, `animate-word-rise`) so the headline paints before hydration. Everything must respect `prefers-reduced-motion`: Motion handles it via `MotionConfig reducedMotion="user"`, Lenis is not mounted, and CSS animations are disabled in the media query at the end of `globals.css`.

**Hero logo.** `components/HeroLogo.tsx` is the hero visual: the JL logo (same paths as `public/logo.svg`) drawn stroke by stroke, filled with the brand gradient, with stacked SVG layers for depth, cursor tilt and two orbit rings. It is SVG + CSS 3D transforms only — there is no WebGL/three.js in the project (a 3D blob was tried and rejected). Its colors are fixed brand constants (not theme tokens) so it looks the same in light and dark. Below `lg` it sits in the flow above the hero text at full opacity — don't fade it or position it behind the text.

**Responsive & spacing.** Vertical rhythm comes from `.section-padding` and `SectionHeading` margins; adjust those instead of adding per-section padding. The hero is full-height only from `lg` up. Media boxes use aspect ratios (`aspect-[19/10]` for project screenshots), not fixed heights. Long project descriptions are collapsed behind a "read more" toggle. Check changes at ~360/390 px (phone), ~820 px (tablet) and ≥1280 px in both themes.

**Media queries.** Use `src/hooks/useMediaQuery.ts` (`useSyncExternalStore`) instead of `matchMedia` + `setState` in an effect.

**Contact form.** `components/ContactForm.tsx` validates with zod and sends via EmailJS directly from the browser, using `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` (in `frontend/.env.local`, gitignored). Template params sent: `name`, `email`, `subject`, `message`. Visitors see generic error messages; technical details go only to `console.error`.

## Conventions

- Code comments and commit messages are typically in Spanish.
- Path alias `@/*` → `frontend/*` is configured, but existing code uses relative imports.
