# Zeeshan Ahmad — Portfolio Website

A high-contrast, motion-led engineering portfolio built with Next.js 16,
TypeScript, Tailwind CSS 4, and Framer Motion.

**Vercel-ready.** Production build verified. 70 files. 18 dependencies.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

---

## Deploy to Vercel

Read **[DEPLOY.md](./DEPLOY.md)** for the complete step-by-step guide.
The short version:

1. Push this code to a fresh GitHub repo
2. Go to vercel.com → Import the repo
3. Leave all build settings at default
4. Click Deploy

---

## Portrait images

Drop your PNGs in `public/images/profile/`:

| File | Used in | Notes |
|---|---|---|
| `hero-portrait.png` | Hero section | Transparent background cutout, 3:4 ratio |
| `portrait.png` | About section | Rectangular photo, 4:5 ratio |

If the files are missing, animated placeholders are shown automatically.

---

## Your details (already filled in)

| Field | Value |
|---|---|
| Email | `zeeshansultan785@gmail.com` |
| GitHub | `https://github.com/zeshii07` |
| LinkedIn | `https://www.linkedin.com/in/hafiz-muhammad-zeeshan-718a03410` |
| WhatsApp | `https://wa.me/+923019299608` |
| Site URL | `https://developerzeeshan.vercel.app` |

To change any of these, edit `src/data/site.ts`.

---

## Placeholders you still need to replace

| What | Where |
|---|---|
| Real CV PDF | `public/resume/zeeshan-cv.pdf` |
| Hero portrait PNG | `public/images/profile/hero-portrait.png` |
| About portrait PNG | `public/images/profile/portrait.png` |
| Real project screenshots | `public/images/projects/` |
| Verify project facts | `src/data/projects.ts` |
| Real project links | `src/data/projects.ts` |
| Email credentials | Vercel env vars (optional) |

---

## Tech stack

- Next.js 16 (App Router)
- TypeScript 5
- Tailwind CSS 4
- Framer Motion
- React Hook Form + Zod
- Lucide icons
- Space Grotesk + Inter + JetBrains Mono

---

## Project structure

```
├── public/
│   ├── images/profile/       # portrait PNGs go here
│   ├── resume/               # CV PDF goes here
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── api/contact/      # POST endpoint
│   │   ├── globals.css       # design tokens
│   │   ├── layout.tsx        # fonts + metadata
│   │   └── page.tsx          # single-page assembly
│   ├── components/
│   │   ├── scenes/           # 10 home page scenes
│   │   ├── shell/            # header + footer
│   │   ├── motion/           # 6 animation primitives
│   │   ├── visuals/          # 5 visual components
│   │   ├── studio/           # 3 UI primitives
│   │   ├── projects/         # case study dialog
│   │   └── ui/               # 7 shadcn components (only what's used)
│   ├── data/                 # typed content
│   ├── hooks/                # use-active-section, use-toast
│   ├── lib/portfolio/        # validation, rate-limit, email
│   └── types/
├── next.config.ts            # Vercel-ready
├── package.json              # 18 deps only
├── DEPLOY.md                 # step-by-step Vercel guide
└── README.md
```
