# Frontend Portfolio App

## Overview
This is the frontend of a bilingual full-stack developer portfolio built with Next.js. It features a modern, responsive design optimized for showcasing technical skills and projects to recruiters and hiring managers.

## Technologies Used
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom utilities
- **Icons**: React Icons (Feather icons)
- **State Management**: React Context (Locale, Theme)
- **Internationalization**: Custom hook-based content management
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion for guided tour
- **Build Tool**: Next.js built-in

## Color Palette
- **Primary**: #5D7CA6 (main blue)
- **Primary-900**: #023059 (dark blue)
- **Primary-200**: #73A2BF (light blue)
- **Accent**: #F2CAA7 (warm beige)
- **Brown**: #59362E (dark brown for text)
- **Background**: Gradient from primary-900 to primary-800
- **Text**: White on dark sections, dark on light sections

## Global Animated Background
- Fixed animated background spanning the entire viewport
- Gradient with floating blob animations
- Respects `prefers-reduced-motion` for accessibility
- Positioned behind all content with `z-index: 0`

## Navigation Structure

### Desktop Navigation
Fixed navbar at top with:
- Logo (left) - scrolls to hero
- Navigation links (center): Projects, Skills, Experience, About, Education, Contact
- Controls (right): Language toggle (ES/EN), Theme toggle (Sun/Moon), Hamburger menu (mobile only)

### Mobile Navigation
- Hamburger button (right side) toggles overlay menu
- Full-screen overlay with vertical navigation links
- Same order as desktop: Projects, Skills, Experience, About, Education, Contact

## Page Sections (Top to Bottom)

### 1. Navbar
- Fixed positioning with backdrop blur on scroll
- Responsive: horizontal menu on desktop, hamburger on mobile
- Smooth scroll to sections with offset for fixed navbar
- Navigation order: Projects, Skills, Experience, About, Education, Contact

### 2. Hero Section
- Full viewport height (100vh) with gradient background
- Animated blobs for visual interest
- Avatar and introduction text
- Call-to-action buttons
- **Mobile optimization**: Card-based text layout with reduced blur for better readability

### 3. Projects Section
- **Primary section** with increased padding for visual weight
- Grid layout of project cards
- Each card shows title, description, tech stack, and images
- Links to live demos and GitHub repos
- Data fetched from backend API

### 4. Skills Section
- **Compact design** with reduced spacing for scannability
- Tech badges with icons
- Categorized skills (Frontend, Backend, Tools, etc.)
- Hover effects and animations

### 5. Experience Section
- **Compact timeline** with reduced vertical spacing
- Work experience with dates, companies, roles
- Key achievements and technologies used

### 6. About Section
- **Lighter visual weight** with smaller text and reduced spacing
- Personal introduction
- Background and motivation
- Soft skills and approach

### 7. Education Section
- **Lighter visual weight** with smaller text and reduced spacing
- Academic background
- Certifications and courses
- Timeline format

### 8. Contact Section
- Contact form with validation
- Social links: Email, LinkedIn, GitHub
- **Consistent design**: All links use white icon backgrounds with dark icons
- Reusable ContactLinkCard component
- Clear final CTA without duplicate buttons

### 9. Footer
- Simple text footer
- Copyright and credits
- No duplicate social links (removed to avoid repetition)

## Key Components

### Core Components
- `Navbar.tsx`: Navigation with mobile menu
- `Hero.tsx`: Landing section with mobile optimizations
- `Contact.tsx`: Contact form and social links
- `Footer.tsx`: Simple footer

### Section Components
- `ProjectsSection.tsx`: Projects grid
- `Skills.tsx`: Skills display
- `Experience.tsx`: Timeline
- `About.tsx`: Personal info
- `Education.tsx`: Education timeline

### Reusable Components
- `ContactLinkCard.tsx`: Consistent social link cards
- `TechBadge.tsx`: Skill/technology badges
- `ContactForm.tsx`: Form with validation

### Utility Components
- `GuidedMouse.tsx`: Interactive onboarding tour

## Context and State
- `LocaleContext.tsx`: Language switching (ES/EN)
- `ThemeContext.tsx`: Dark/light mode (currently auto-based on system)

## Content Management
- Content stored in `/src/content/{locale}/` files
- Organized by sections: hero.ts, about.ts, skills.ts, etc.
- Custom `useContent` hook for accessing localized content

## Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Mobile optimizations:
  - Hamburger menu
  - Stacked layouts
  - Touch-friendly buttons (44px minimum)
  - Hero section with card-based text for readability

## Accessibility
- WCAG AA compliant
- Semantic HTML
- Aria labels
- Keyboard navigation
- Focus management
- Reduced motion support

## Performance
- Next.js optimization
- Image optimization
- Code splitting
- Lazy loading where appropriate

## Development
- Hot reload with `npm run dev`
- TypeScript for type safety
- ESLint for code quality
- TailwindCSS for styling

## File Structure
```
frontend/
├── components/          # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ContactLinkCard.tsx
│   └── ...
├── pages/               # Next.js pages
│   ├── _app.tsx
│   ├── index.tsx
│   └── _error.tsx
├── src/
│   ├── content/         # i18n content
│   ├── context/         # React contexts
│   ├── hooks/           # Custom hooks
│   └── utils/           # Utilities
├── styles/
│   └── globals.css      # Global styles
└── public/              # Static assets