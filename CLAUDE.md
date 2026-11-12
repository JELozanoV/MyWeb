# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Bilingual (ES/EN) personal developer portfolio. Two independent npm packages, no workspace tooling — run commands from inside `frontend/` or `backend/`:

- `frontend/` — Next.js 16 (**Pages Router**), React 19, TypeScript, TailwindCSS 3, framer-motion, zod 4, EmailJS.
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

**Single page.** `pages/index.tsx` stacks all section components (Navbar, Hero, Projects, Skills, Experience, About, Education, Contact, Footer). Navigation is smooth-scroll to section ids. `pages/_app.tsx` wraps everything in `ThemeProvider` → `LocaleProvider` and renders the fixed `AnimatedBackground`.

**i18n is a custom system, not a library.**
- All user-facing text lives in `src/content/{es,en}/*.ts`, one file per section. Both locales must export the same shape — when adding/changing text, edit both `es` and `en`.
- `src/hooks/useContent.ts` statically imports every content module for both locales and returns the active one. A new content file must be wired in here.
- `src/context/LocaleContext.tsx` holds the locale (default `es`, persisted to `localStorage.locale`). `toggleLocale` runs a fade-out → swap → fade-in sequence exposing `fadePhase`, which `index.tsx` uses to fade the whole page.
- UI strings that aren't section content (form placeholders, zod validation messages, send errors, loading/error states, aria-labels) live in `src/content/{locale}/labels.ts`. Don't hardcode text in components.
- `LocaleContext` also keeps `<html lang>` in sync with the active locale.
- Shared content types (e.g. `EducationItem`, `Certification`) are in `src/content/types.ts`.

**Projects data.** `src/data/projectsData.ts` is the real source of projects (static array with image paths under `public/images/projects/<project>/`). `getProjects(locale)` simulates an async API call and fills each project's `description` from `src/content/{locale}/projects.ts` via a title → key map (`titleToKey`). Adding a project means: add the entry in `projectsData.ts`, add its description key in both `content/*/projects.ts`, and add the title mapping. The backend `/api/projects` endpoint mirrors the `Project` shape (`backend/prisma/schema.prisma`) but is not fetched yet.

**Skills & tech icons.** Skill lists live in `src/content/{locale}/skills.ts`, each item with an `iconKey`. `src/utils/getTechIcon.tsx` maps `iconKey` → react-icons component (or custom SVGs in `src/utils/customIcons.tsx`) and to a brand color. New technologies need entries in both `iconMap` and `brandColorMap`. Render icons with the `<TechIcon iconKey=… />` component (not by pulling a component out of a function during render — the React Compiler lint rule `react-hooks/static-components` rejects that).

**Images.** Everything under `public/` is WebP, pre-resized to display size (project screenshots ≤1600px wide, avatar 512px, logos 256px). Components render images with `next/image` (`fill` + `sizes` for the carousel/covers, fixed `width`/`height` for logos). New images should be converted to WebP before committing (`sharp` is available via `next`).

**Theme.** `ThemeContext` toggles the `dark` class on `<html>` (Tailwind `darkMode: 'class'`). An inline script (`themeInitScript`, injected in `pages/_document.tsx`) applies the class before first paint from `localStorage.theme` or `prefers-color-scheme`; the context then syncs from the DOM on mount. The theme is only written to `localStorage` when the user toggles it. Custom palette is in `tailwind.config.js` (`primary-*`, `accent`, `brown`).

**Media queries.** Use `src/hooks/useMediaQuery.ts` (`useSyncExternalStore`) instead of `matchMedia` + `setState` in an effect.

**Contact form.** `components/ContactForm.tsx` validates with zod and sends via EmailJS directly from the browser, using `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` (in `frontend/.env.local`, gitignored). Template params sent: `name`, `email`, `subject`, `message`. Visitors see generic error messages; technical details go only to `console.error`.

## Conventions

- Code comments and commit messages are typically in Spanish.
- Path alias `@/*` → `frontend/*` is configured, but existing code uses relative imports.
