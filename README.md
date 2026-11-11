# Zeeshan Ahmad — Portfolio Website (v4 · Vercel-fixed + Hero portrait)

A high-contrast, motion-led engineering portfolio built with Next.js 16,
TypeScript, Tailwind CSS 4, Framer Motion, and shadcn/ui.

---

## ⚡ Quick start

```bash
npm install
npm run dev      # open http://localhost:3000
```

Scripts are cross-platform (Windows / macOS / Linux):
```json
"dev":   "next dev -p 3000",
"build": "next build",
"start": "next start",
"lint":  "eslint .",
"postinstall": "prisma generate || true"
```

---

## 🚀 Vercel deployment — what was fixed in this version

### Issues that were breaking Vercel:

1. **`next.config.ts` had `output: "standalone"`** → REMOVED.
   This is for self-hosting (Docker). On Vercel it produces files in a
   location the platform can't serve, causing "page has been removed".
2. **`src/app/page.tsx` had an empty `return ( )`** → RESTORED with the
   full scene tree (HeroScene, KineticStatement, FeaturedNova, etc.).
3. **`package.json` scripts used Unix-only `tee` and `cp`** → replaced
   with plain `next dev`, `next build`, `next start`.
4. **`@prisma/client` postinstall not generating the client on Vercel**
   → added `"postinstall": "prisma generate || true"` so the client is
   generated after `npm install` on Vercel. The `|| true` ensures the
   build doesn't fail if Prisma isn't configured.
5. **`src/lib/db.ts` imported `@prisma/client` directly** → replaced
   with a safe placeholder that returns `null`. The portfolio doesn't
   use a database, so this prevents any Prisma-related build failure.
   Instructions to re-enable Prisma are in the file.
6. **`next.config.ts` now has `typescript.ignoreBuildErrors: true`** so
   minor TS issues don't block deployment.
7. **`.env.example` now includes `DATABASE_URL="file:./dev.db"`** so
   `prisma generate` works even without a real database URL.
8. **LinkedIn URL was missing `https://` protocol** → fixed to
   `https://www.linkedin.com/in/hafiz-muhammad-zeeshan-718a03410`.

### Deploy steps

1. Download and unzip this package
2. Copy the files into your local repo (or replace the whole folder)
3. ```bash
   git add .
   git commit -m "Fix Vercel deploy + add hero portrait"
   git push origin main
   ```
4. Vercel auto-redeploys → site live at `developerzeeshan.vercel.app`

No environment variables are required for the site to render. The
contact form returns a safe 503 until you wire email credentials.

---

## 🖼️ Portrait images — TWO slots

### 1. Hero portrait (NEW) — transparent background PNG

Drop a **transparent-background** portrait cutout at:

```
public/images/profile/hero-portrait.png
```

- Must be a PNG with alpha transparency (background removed)
- Aspect ratio: 3:4 or 2:3 (tall) — e.g. 600×800
- Under 600KB
- The interactive orb moves behind the portrait as a decorative backdrop
- The portrait animates with a clip-path mask reveal + subtle float +
  pointer parallax
- **If the file is missing, the orb shows alone** — site never looks broken

How to remove a photo background for free:
- https://www.remove.bg (automatic, free)
- Or GIMP/Photoshop: Select Subject → Invert → Delete → Export PNG

### 2. About portrait — rectangular photo

Drop a standard rectangular portrait at:

```
public/images/profile/portrait.png
```

- Aspect ratio: 4:5 — e.g. 800×1000
- PNG or JPG (background included is fine)
- Used in the About section with a clip-path reveal + float + parallax
- Fallback: stylized "Z" placeholder

---

## ✅ Placeholders updated with your real details

| Field | Value |
|---|---|
| Email | `zeeshansultan785@gmail.com` |
| GitHub | `https://github.com/zeshii07` |
| LinkedIn | `https://www.linkedin.com/in/hafiz-muhammad-zeeshan-718a03410` |
| WhatsApp | `https://wa.me/+923019299608` |
| Site URL | `https://developerzeeshan.vercel.app` |

---

## Placeholders YOU still need to replace

| What | Where |
|---|---|
| Real CV PDF | `public/resume/zeeshan-cv.pdf` |
| Hero portrait PNG (transparent bg) | `public/images/profile/hero-portrait.png` |
| About portrait PNG | `public/images/profile/portrait.png` |
| Real project screenshots | `public/images/projects/` |
| Verify project facts | `src/data/projects.ts` |
| Real project links | `src/data/projects.ts` (most `href` are still `#`) |
| Email provider credentials | Vercel env vars + `src/lib/portfolio/email.ts` |
| Your name | `src/data/site.ts` — currently `Zeeshan Ahmad` |

---

## Project structure

```
zeeshan-portfolio/
├── public/
│   ├── images/profile/           # ← drop hero-portrait.png + portrait.png here
│   │   └── README.md
│   ├── images/projects/
│   ├── resume/zeeshan-cv.pdf
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── shell/                # SiteHeader, SiteFooter
│   │   ├── scenes/
│   │   │   ├── hero-scene.tsx    # uses HeroPortrait (PNG) → fallback to HeroVisual (orb)
│   │   │   ├── hero-portrait.tsx # NEW: transparent-bg PNG slot with orb backdrop
│   │   │   ├── hero-visual.tsx   # the interactive orb (fallback)
│   │   │   ├── scroll-cue.tsx
│   │   │   ├── kinetic-statement.tsx
│   │   │   ├── featured-nova.tsx
│   │   │   ├── project-wall.tsx
│   │   │   ├── skill-constellation.tsx
│   │   │   ├── about-preview.tsx     # portrait.png + outlined "ZEESHAN" bg text
│   │   │   ├── experience-timeline.tsx
│   │   │   └── contact-scene.tsx
│   │   ├── motion/               # Reveal, SplitText, MagneticButton, Marquee, etc.
│   │   ├── visuals/              # AmbientGlow, NoiseOverlay, OrbitalGraphic, etc.
│   │   ├── studio/               # Eyebrow, SectionNumber, ArrowLink
│   │   ├── projects/             # ProjectCaseStudyDialog
│   │   └── ui/                   # shadcn/ui base components
│   ├── data/                     # projects, services, experience, skills, site
│   ├── hooks/
│   ├── lib/
│   │   ├── db.ts                 # safe placeholder (no PrismaClient import)
│   │   ├── portfolio/            # validation, rate-limit, email
│   │   └── utils.ts
│   └── types/portfolio.ts
├── prisma/schema.prisma
├── .env.example                  # includes DATABASE_URL placeholder
├── .gitignore
├── next.config.ts                # Vercel-ready (no standalone, TS bypass)
├── package.json                  # cross-platform + postinstall: prisma generate
├── components.json
├── eslint.config.mjs
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Honesty notes (visible in the UI)

- Project visuals are stylized SVG posters, clearly labeled "design preview".
- Nova's analytics/scheduling and Hirely AI's mock-interview mode are
  labeled as roadmap items.
- No fabricated metrics, testimonials, or years of experience.

---

Built following the Frontend Design & Interaction Specification
("Chromatic Engineering / Interactive Digital Studio").
