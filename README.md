# Portfolio Full Stack

A bilingual (ES/EN) full-stack developer portfolio project built with Next.js (frontend) and Express.js with Prisma (backend). Features a minimal, responsive design with custom color palette, tech badges with icons, and comprehensive sections.

## Features
- **Bilingual Support**: Switch between Spanish and English with localStorage persistence.
- **Responsive Design**: Mobile-first approach with TailwindCSS.
- **Custom Color Palette**: Primary (#5D7CA6), Primary-900 (#023059), Primary-200 (#73A2BF), Accent (#F2CAA7), Brown (#59362E).
- **Tech Badges**: Icons from react-icons with fallback to initials, hover effects, and disabled states.
- **Sections**: Hero, About, Skills, Projects, Experience (Timeline), Education & Certifications, Contact (with form), Footer.
- **Backend API**: RESTful endpoints for projects with Prisma ORM and PostgreSQL.
- **Accessibility**: WCAG compliant with semantic HTML, aria-labels, and keyboard navigation.
- **SEO**: Basic meta tags and Open Graph support.
- **Dark Mode**: Automatic based on prefers-color-scheme.

## Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript, TailwindCSS, react-icons, zod
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL
- **Internationalization**: Custom context and hooks for content management

## Prerequisites
- Node.js (v18+)
- PostgreSQL database
- npm or yarn

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repo-url>
   cd portfolio
   ```

2. **Setup Backend**:
   ```
   cd backend
   npm install
   # Update .env with your PostgreSQL credentials
   npx prisma migrate dev
   npx prisma generate
   npm run prisma:seed  # Optional: seed initial data
   npm run dev
   ```

3. **Setup Frontend** (in a new terminal):
   ```
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints
- `GET /api/projects` - Fetch all projects
- `GET /api/projects/:id` - Fetch project by ID

## Project Structure
```
portfolio/
├── frontend/
│   ├── components/          # Reusable components
│   ├── pages/               # Next.js pages and API routes
│   ├── src/
│   │   ├── content/         # i18n content files (es/en)
│   │   ├── context/         # Locale context
│   │   ├── hooks/           # Custom hooks
│   │   └── utils/           # Utility functions
│   └── styles/              # Global styles
└── backend/
    ├── src/
    │   ├── controllers/     # Route handlers
    │   ├── models/          # Data models
    │   ├── routes/          # API routes
    │   └── app.ts/server.ts # Express setup
    └── prisma/              # Database schema and seed
```

## Development
- Use VS Code for development.
- TypeScript configured for both frontend and backend.
- Run `npm run lint` in frontend for code quality checks.
- Content is managed in `/frontend/src/content/{locale}` files.

## Deployment
- Build frontend: `npm run build` in frontend directory.
- Build backend: `npm run build` in backend directory.
- Deploy frontend to Vercel/Netlify, backend to Heroku/Railway.