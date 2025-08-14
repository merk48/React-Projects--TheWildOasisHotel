# The Wild Oasis — Hotel Dashboard (React)

**The Wild Oasis** is a fully responsive, production-minded admin dashboard for a boutique hotel. Built as the final project for Jonas Schmedtmann’s _Ultimate React_ course, it demonstrates modern React patterns and tooling: React Query, React Hook Form, Styled Components, Supabase (backend + auth), advanced compound components, charts, dark mode, and accessible UI.

Live demo: [https://the-wild-oasis.vercel.app/login](https://the-wild-oasis.vercel.app/login)

---

## Table of contents

- [Overview](#overview)
- [Key features](#key-features)
- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
- [Environment variables (`.env.example`)](#environment-variables-envexample)
- [Scripts](#scripts)
- [Project structure (high level)](#project-structure-high-level)
- [Architecture & patterns](#architecture--patterns)
- [Deployment (Vercel)](#deployment-vercel)
- [Contributing](#contributing)
- [Roadmap / TODO](#roadmap--todo)
- [Troubleshooting](#troubleshooting)
- [License & credits](#license--credits)

---

## Overview

This project is the final assignment for the **Ultimate React** course by Jonas Schmedtmann. The Wild Oasis is an admin dashboard intended for hotel staff to manage bookings, cabins, and guests. It emphasizes real-world app structure, responsiveness, accessibility, and modern data patterns.

The repo purpose: a polished, maintainable reference implementation showcasing how to build a production-capable SPA with React and modern libraries.

---

## Key features

- Authentication with Supabase (email/password)
- Bookings, Cabins, Users: listing, paging, CRUD
- Responsive, mobile-first UI
- React Query for caching, background updates and prefetching
- React Hook Form + Yup for forms and validation
- Compound components (Modal, Menus, Table) for expressive APIs
- Styled Components with CSS variables and dark mode
- Charts (Recharts) for sales & analytics
- Global error boundaries and toast notifications

---

## Tech stack

- **Framework:** React 18 (Vite)
- **State / Data:** @tanstack/react-query
- **Backend & Auth:** Supabase (Postgres)
- **Forms:** react-hook-form, @hookform/resolvers, yup
- **Styling:** styled-components
- **Charts:** recharts
- **Routing:** react-router-dom
- **Utilities:** date-fns, react-hot-toast, react-icons

Packages (selected): `@supabase/supabase-js`, `@tanstack/react-query`, `react-hook-form`, `styled-components`, `recharts`, `date-fns`, `react-hot-toast`, `yup`.

---

## Quick start

Requirements: Node.js 18+ (recommended)

```bash
# clone
git clone https://github.com/<your-username>/the-wild-oasis.git
cd the-wild-oasis

# install deps
npm install
# or: yarn

# run dev server
npm run dev
# open http://localhost:5173
```

Build for production:

```bash
npm run build
npm run preview
```

---

## Environment variables (`.env.example`)

Create a `.env` file (Vite requires `VITE_` prefix for client env variables). Example:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_public_key
VITE_APP_NAME="The Wild Oasis"
```

> Make sure to set the same variables for your Vercel/hosting environment.

---

## Scripts

- `npm run dev` — start dev server (Vite)
- `npm run build` — build for production
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

---

## Project structure (high level)

```
src/
 ├─ features/             # domain features (bookings, cabins, auth, check-in/out)
 ├─ ui/                   # reusable primitives & compound components (Modal, Table, Menus)
 ├─ contexts/             # React contexts (Sidebar, DarkMode, Modal)
 ├─ hooks/                # shared hooks (useUrl, useOutsideClick, useBookings, etc.)
 ├─ services/             # API wrappers (supabase helpers)
 ├─ utils/                # helpers, configs, pagination helpers
 ├─ pages/                # route pages (Dashboard, Bookings, Cabins, Account)
 ├─ App.jsx
 └─ main.jsx
```

---

## Architecture & patterns

- **React Query** — central cache and server state; prefetching for smoother pagination. Query keys and invalidation patterns follow best practices.
- **Compound components** — Modal, Menus and Table components expose expressive APIs for composition and reuse.
- **Context + small hooks** — Sidebar, DarkMode, and Modal use context. Hook primitives (`useUrl`, `useBookingFilters`, `useOutsideClick`) encapsulate common behavior and keep components lean.
- **Styled Components + tokens** — CSS variables live in the global styles to support light/dark themes.
- **Accessibility** — focus management and keyboard behavior for modals and menus; semantic markup for forms and tables.

---

## Deployment (Vercel)

1. Push the repo to GitHub
2. Create a new Vercel project and import the repo
3. Add the environment variables in the Vercel dashboard
4. Deploy — Vite will be automatically detected

---

## Contributing

Contributions are welcome. Typical flow:

1. Fork
2. Create a feature branch
3. Commit & open a PR with a clear description

Please respect the existing code style and run the linter before opening a PR.

---

## Roadmap / TODO

- Tests (unit & E2E)
- Seed / migration scripts for Supabase
- Role-based access & permissions
- i18n / localization support

---

## Troubleshooting

- **Auth failing** — verify Supabase URL & anon key in `.env`
- **Blank page after deploy** — ensure env vars are configured in the hosting provider and build passes locally
- **Overlay/sidebar issues on resize** — the app uses `matchMedia` and a Sidebar context to keep UI state in sync

---

## Credits & course

Built as a final project for **The Ultimate React Course** by Jonas Schmedtmann. Course: [https://www.udemy.com/course/the-ultimate-react-course/?couponCode=MT130825G1](https://www.udemy.com/course/the-ultimate-react-course/?couponCode=MT130825G1)

Instructor GitHub: [https://github.com/jonasschmedtmann/ultimate-react-course](https://github.com/jonasschmedtmann/ultimate-react-course)

---

## License
