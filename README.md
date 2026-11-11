# Zeeshan Ahmad — Portfolio Website

A professional portfolio built with Next.js 16, TypeScript, Tailwind CSS 4, and shadcn/ui.
Positioning: **Full-Stack Developer · AI Automation Builder · Cybersecurity Enthusiast**.

This package contains the full source code, structured by feature area.
Follow the steps below to run it locally and ship it to production.

---

## 1. Tech stack

- **Framework:** Next.js 16 (App Router) + TypeScript 5
- **Styling:** Tailwind CSS 4 with design tokens in CSS variables
- **UI components:** shadcn/ui (New York) + custom portfolio primitives
- **Forms:** React Hook Form + Zod (shared client/server schema)
- **Animation:** Framer Motion (purposeful, reduced-motion aware)
- **Icons:** Lucide React
- **Email:** Provider-agnostic helper (Resend / Postmark / SendGrid compatible)
- **Fonts:** Space Grotesk (display), Inter (body), JetBrains Mono (code)

---

## 2. Quick start

```bash
# 1. Install dependencies (Bun recommended, npm/yarn also work)
bun install        # or: npm install

# 2. Copy env vars and fill in your real values
cp .env.example .env.local
#    Then edit .env.local with your transactional email credentials

# 3. Run the dev server
bun run dev        # or: npm run dev

# 4. Open http://localhost:3000
```

> If you don't yet have email credentials, the contact form will still
> validate and submit — it will simply return a 503 with a safe error
> message. Wire a provider before going live.

---

## 3. Project structure

```
zeeshan-portfolio/
├── public/
│   ├── favicon.svg
│   ├── images/projects/        # drop real project screenshots here
│   ├── resume/zeeshan-cv.pdf   # REPLACE with your real CV before launch
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/route.ts    # POST /api/contact — validated, rate-limited
│   │   │   └── route.ts            # health check
│   │   ├── globals.css             # dark palette + design tokens
│   │   ├── layout.tsx              # fonts, metadata, OpenGraph
│   │   └── page.tsx                # single-page portfolio assembly
│   ├── components/
│   │   ├── layout/                 # header, footer
│   │   ├── home/                   # hero, about, featured projects, services,
│   │   │                           # services preview, skills, process,
│   │   │                           # experience timeline, final CTA, credibility
│   │   ├── projects/               # project card, gallery, case study dialog
│   │   ├── contact/                # contact section + form
│   │   ├── ui-portfolio/           # container, section, button, badge, card,
│   │   │                           # section heading, project poster, social links
│   │   └── ui/                     # shadcn/ui base components
│   ├── data/                       # typed content (CMS-free)
│   │   ├── projects.ts             # 5 projects with full case-study data
│   │   ├── services.ts             # 4 services with scope & deliverables
│   │   ├── experience.ts           # work, education, certifications
│   │   ├── skills.ts               # capability groups + process + credibility
│   │   └── site.ts                 # nav, social, contact info, person fields
│   ├── hooks/                      # use-mobile, use-toast
│   ├── lib/
│   │   ├── portfolio/
│   │   │   ├── validation.ts       # shared Zod schema (client + server)
│   │   │   ├── rate-limit.ts       # in-memory rate limiter (5 req/min/IP)
│   │   │   └── email.ts            # provider-agnostic send helper
│   │   ├── db.ts                   # Prisma client (only if you add DB later)
│   │   └── utils.ts                # cn() helper
│   └── types/
│       └── portfolio.ts            # shared types
├── prisma/
│   └── schema.prisma               # placeholder (not required for v1)
├── .env.example                    # env var template
├── .gitignore
├── components.json                 # shadcn/ui config
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 4. What's included

### Pages / sections (all on `/`, anchor-based navigation)

- **Home** — hero with terminal visual, availability badge, CTAs
- **About** — intro, focus areas, education, current learning, personal touch
- **Projects** — filterable grid (All / Full-stack / AI & Automation / Business Software / Cybersecurity)
  - 5 seeded projects: Nova, Hirely AI, Inventory System, Client Websites, Security Lab
  - Full case-study dialog with 10-section template per project
- **Services** — 4 detailed service cards with scope, deliverables, and audience
- **Skills** — grouped by capability (Frontend / Backend / Databases / AI / Security)
- **Process** — 4-step working strip
- **Experience** — timeline grouped by kind (Work / Freelance / Internship / Education / Certifications / Training)
- **Contact** — React Hook Form + Zod, honeypot, loading/success/error states, privacy notice

### Design system

- Dark-first palette: `#0B1020` bg, `#6C63FF` accent, `#22D3C5` teal, semantic status colors
- Custom scrollbar, grid background, accent glow utilities
- Mobile-first responsive at 360 / 390 / 768 / 1024 / wide desktop
- Reduced-motion support, focus rings, semantic HTML landmarks, aria labels

### Backend (Phase 1)

- `POST /api/contact` — Zod validation, honeypot, rate limiting, safe error responses
- No secrets in client bundle; operational errors logged without personal content

---

## 5. Before going live — checklist

Replace these placeholders with your real assets:

- [ ] `public/resume/zeeshan-cv.pdf` — replace with your real CV
- [ ] `public/images/projects/` — drop real project screenshots, then swap the
      `ProjectPoster` SVG in `src/components/ui-portfolio/project-poster.tsx`
      for Next.js `<Image>` components inside `project-card.tsx` and the
      case-study dialog
- [ ] `src/data/site.ts` — set your real GitHub, LinkedIn, and email URLs
- [ ] `src/data/projects.ts` — verify each project's facts match what you
      actually shipped; replace any `#` placeholder links with real ones
- [ ] `.env.local` — fill in `EMAIL_API_KEY`, `EMAIL_PROVIDER`,
      `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
- [ ] `src/lib/portfolio/email.ts` — wire your chosen provider's API call
      (Resend-style example is sketched in the comments)
- [ ] Add your site to Google Search Console after deploying
- [ ] Update `src/app/layout.tsx` `SITE_URL` constant with your real domain

---

## 6. Scripts

```bash
bun run dev        # start dev server on :3000
bun run lint       # ESLint check
bun run build      # production build
bun run start      # start production server after build
```

---

## 7. Deployment

This is a standard Next.js 16 App Router project — deploy to any
Next.js-compatible host (Vercel, Netlify, self-hosted Node, Docker).

Production env vars to set on your host:

```
EMAIL_API_KEY=...
EMAIL_PROVIDER=resend        # or postmark, sendgrid
CONTACT_TO_EMAIL=hello@yourdomain.dev
CONTACT_FROM_EMAIL=portfolio@yourdomain.dev
NEXT_PUBLIC_SITE_URL=https://yourdomain.dev
```

If you later need a database (e.g. to store enquiries or manage projects
via an admin), use Prisma — `src/lib/db.ts` and `prisma/schema.prisma`
are already scaffolded.

---

## 8. Honesty notes (also visible in the UI)

- Project screenshots are stylized SVG posters, not real product screenshots.
  Replace with real screenshots once you have permission to display them.
- Nova's analytics / scheduling and Hirely AI's mock-interview mode are
  labeled as roadmap items in the UI.
- Client website specifics are summarized without naming clients.
- No fabricated metrics, testimonials, or years of experience.

---

Built following the Personal Portfolio Blueprint.
