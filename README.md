# Zeeshan Ahmad — Portfolio Website (v2 · Chromatic Engineering)

A high-contrast, motion-led engineering portfolio built with Next.js 16,
TypeScript, Tailwind CSS 4, Framer Motion, and shadcn/ui.

**Creative direction:** Chromatic Engineering / Interactive Digital Studio.
Bold typography, vivid color blocking, expressive motion, asymmetric
composition, and tactile interactions — without sacrificing readability,
accessibility, or professional credibility.

---

## 1. Tech stack

- **Framework:** Next.js 16 (App Router) + TypeScript 5
- **Styling:** Tailwind CSS 4 with CSS-variable design tokens
- **UI:** shadcn/ui (functional controls) + custom studio primitives
- **Motion:** Framer Motion (`Reveal`, `SplitText`, `MagneticButton`,
  `Marquee`, `ScrollProgress`, `ImageMaskReveal`)
- **Forms:** React Hook Form + Zod (shared client/server schema)
- **Icons:** Lucide React
- **Email:** Provider-agnostic helper (Resend / Postmark / SendGrid compatible)
- **Fonts:** Space Grotesk (display), Inter (body), JetBrains Mono (technical)

---

## 2. Quick start

```bash
bun install            # or: npm install
cp .env.example .env.local
bun run dev            # or: npm run dev
# open http://localhost:3000
```

> Without email env vars, the contact form validates and submits but the API
> returns 503 with a safe error message. Wire a provider before going live.

---

## 3. Color system

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#101016` | Deep background, footer, dark text |
| `--ink-soft` | `#1B1B26` | Dark panels, overlays |
| `--bone` | `#F6F1E8` | Main light canvas |
| `--paper` | `#FFFDF8` | Elevated light surface |
| `--violet` | `#8B4DFF` | Main signature accent |
| `--ultramarine` | `#344BFF` | Large visual blocks, interactive highlights |
| `--volt` | `#D8FF3E` | Acid-lime CTAs and callouts |
| `--tangerine` | `#FF603D` | Warm contrast, emphasis |
| `--aqua` | `#5BE6D1` | Small technical highlights |

**Section rhythm (home page):** ink hero → volt lime statement →
ultramarine Nova showcase → bone project wall → ink skills constellation →
tangerine about preview → bone experience → violet contact → ink footer.

---

## 4. Project structure

```
zeeshan-portfolio/
├── public/
│   ├── favicon.svg
│   ├── images/projects/        # drop real project screenshots here
│   ├── resume/zeeshan-cv.pdf   # REPLACE with your real CV
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts     # POST — Zod, honeypot, rate limit
│   │   ├── globals.css              # chromatic palette + typography
│   │   ├── layout.tsx               # fonts, metadata, OpenGraph
│   │   └── page.tsx                 # single-page scene assembly
│   ├── components/
│   │   ├── shell/                   # SiteHeader, SiteFooter
│   │   ├── scenes/                  # home page scenes
│   │   │   ├── hero-scene.tsx       # oversized kinetic headline + rotating word
│   │   │   ├── hero-visual.tsx      # interactive layered orb (SVG + parallax)
│   │   │   ├── scroll-cue.tsx
│   │   │   ├── kinetic-statement.tsx # volt lime full-bleed + marquee
│   │   │   ├── featured-nova.tsx    # ultramarine flagship showcase
│   │   │   ├── project-wall.tsx     # asymmetric editorial (each project unique)
│   │   │   ├── skill-constellation.tsx # orbital interactive map
│   │   │   ├── about-preview.tsx    # tangerine editorial
│   │   │   ├── experience-timeline.tsx # moving progress beam
│   │   │   └── contact-scene.tsx    # violet + lime CTA + form
│   │   ├── motion/                  # Reveal, SplitText, MagneticButton,
│   │   │                           # Marquee, ScrollProgress, ImageMaskReveal
│   │   ├── visuals/                 # AmbientGlow, NoiseOverlay,
│   │   │                           # OrbitalGraphic, GridLines, NovaPoster
│   │   ├── studio/                  # Eyebrow, SectionNumber, ArrowLink
│   │   ├── projects/                # ProjectCaseStudyDialog (sticky metadata rail)
│   │   ├── ui-portfolio/            # ProjectPoster, TechBadge, StatusBadge
│   │   └── ui/                      # shadcn/ui base components
│   ├── data/
│   │   ├── projects.ts              # 5 projects with full case-study data
│   │   ├── services.ts              # 4 services (kept for future services page)
│   │   ├── experience.ts            # work, education, certifications
│   │   ├── skills.ts                # orbital groups, marquee phrases, rotating words
│   │   └── site.ts                  # nav, social, contact info, person fields
│   ├── hooks/
│   │   ├── use-active-section.ts    # for header nav indicator
│   │   ├── use-mobile.ts
│   │   └── use-toast.ts
│   ├── lib/portfolio/
│   │   ├── validation.ts            # shared Zod schema (client + server)
│   │   ├── rate-limit.ts            # 5 req/min/IP in-memory
│   │   └── email.ts                 # provider-agnostic helper
│   └── types/portfolio.ts
├── prisma/schema.prisma             # placeholder for future DB
├── .env.example
├── components.json                  # shadcn config
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 5. Home page scenes (the storyboard)

1. **HeroScene** — Ink with violet/ultramarine ambient glow. Oversized
   `clamp(3.1rem, 9vw, 9rem)` headline with vertical mask reveal, one
   volt-lime highlighted word, and a rotating word (software → AI →
   automation → digital products). Interactive layered orb on the right
   with pointer parallax. Scroll cue at the bottom.
2. **KineticStatement** — Full-bleed volt lime. Oversized uppercase
   typography with one outlined word. Bottom marquee
   `BUILD / AUTOMATE / EXPLORE / SHIP / SECURE / ITERATE`.
3. **FeaturedNova** — Ultramarine/violet scene with a custom Nova dashboard
   poster (clearly labeled "design preview"), parallax background shapes,
   sliding interface panels, and a "Multi-business automation." title
   that shifts on scroll.
4. **ProjectWall** — Bone canvas with asymmetric editorial layout. Each of
   the 5 projects gets a distinct composition (image-left, image-right,
   wide-landscape with tangerine strip, text-led with floating poster).
   Filter tabs: All / Full-stack / AI & Automation / Mobile / Business
   Software / Cybersecurity / Networking.
5. **SkillConstellation** — Ink scene with an interactive orbital map.
   Five groups (Frontend, Backend, AI, Security, Tools) positioned around
   a circle; selecting a node updates a detail panel. Mobile: segmented
   selector.
6. **AboutPreview** — Tangerine editorial with a portrait stand-in,
   oversized headline, floating annotation labels (BASED IN PAKISTAN,
   SOFTWARE / AI), and a CTA.
7. **ExperienceTimeline** — Bone with a vertical progress beam that grows
   with scroll and a moving volt-lime dot. Each entry has its own
   typographic block; alternating sides on desktop, single column on mobile.
8. **ContactScene** — Full-bleed violet with a giant heading, oversized
   email link, editorial social list (text links, not icon-only), lime
   CTA, and a bone form panel with all form states.
9. **SiteFooter** — Ink, compact, with editorial nav and social links.

---

## 6. Motion system

**Levels:**
- **A — Micro:** button hover/press, link underline, filter select,
  input focus (120–280ms).
- **B — Section reveals:** text mask, image clip-path, staggered line
  entrances, timeline markers (450–900ms).
- **C — Signature:** hero orb, parallax shapes, scroll-linked transforms,
  marquee.

**Accessibility:**
- `prefers-reduced-motion` respected throughout (animations disabled,
  content still fully visible).
- Marquee pauses on hover.
- No scroll-jacking — native scroll preserved.
- Every animated interaction has a useful static state.
- Keyboard accessible: filters, radios, dialog, form, mobile menu all
  work without a mouse.

---

## 7. Project case study dialog

Clicking any project opens a wide modal with:
- Sticky metadata rail (type, status, dates, category, role, stack)
- Numbered chapters 01 → 10 (Overview → Problem → Solution → Features →
  Architecture → Stack → Challenges → Screenshots → Outcome → Links)
- Next project CTA
- Restyled in the bone palette with ink accents

---

## 8. Backend (Phase 1)

`POST /api/contact`:
- Zod validation shared with the client
- Honeypot field (`company` must be empty)
- In-memory rate limiting (5 req/min/IP)
- Safe error responses — no stack traces or secrets leaked
- Transactional email helper with provider-agnostic shape and dev fallback

---

## 9. Before going live — checklist

- [ ] Replace `public/resume/zeeshan-cv.pdf` with your real CV
- [ ] Drop real project screenshots into `public/images/projects/` and
      replace `NovaPoster` + `ProjectPoster` SVGs with `<Image>` components
- [ ] Replace the portrait stand-in in `about-preview.tsx` with a real photo
- [ ] Update `src/data/site.ts` with real GitHub/LinkedIn/email URLs
- [ ] Verify each project's facts in `src/data/projects.ts`
- [ ] Fill `.env.local` from `.env.example`
- [ ] Wire your email provider's API call in `src/lib/portfolio/email.ts`
- [ ] Update `SITE_URL` in `src/app/layout.tsx` with your real domain
- [ ] Add the site to Google Search Console after deploying

---

## 10. Scripts

```bash
bun run dev        # dev server on :3000
bun run lint       # ESLint
bun run build      # production build
bun run start      # start production server
```

---

## 11. Honesty notes (also visible in the UI)

- Project visuals are stylized SVG posters and dashboard compositions,
  clearly labeled "design preview" where applicable. Replace with real
  screenshots once you have permission.
- Nova's analytics/scheduling and Hirely AI's mock-interview mode are
  marked as roadmap items in the case studies.
- Client website specifics are summarized without naming clients.
- No fabricated metrics, testimonials, or years of experience.

---

Built following the Frontend Design & Interaction Specification
("Chromatic Engineering / Interactive Digital Studio").
