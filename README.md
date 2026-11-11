# Zeeshan Ahmad — Portfolio Website (v3 · Vercel-ready)

A high-contrast, motion-led engineering portfolio built with Next.js 16,
TypeScript, Tailwind CSS 4, Framer Motion, and shadcn/ui.

**Creative direction:** Chromatic Engineering / Interactive Digital Studio.

---

## ⚡ Quick start (Windows / macOS / Linux)

```bash
npm install
npm run dev      # open http://localhost:3000
```

The `package.json` scripts are now cross-platform:
```json
"dev":   "next dev -p 3000",
"build": "next build",
"start": "next start",
"lint":  "eslint ."
```

---

## 🚀 Deploying to Vercel — IMPORTANT

**The two things that broke Vercel before are now fixed:**

### 1. `next.config.ts` — `output: "standalone"` REMOVED

```ts
// BEFORE (broken on Vercel):
const nextConfig = {
  output: "standalone",   // ← this caused "page has been removed"
  ...
};

// AFTER (Vercel-ready):
const nextConfig = {
  // standard build output — Vercel handles the rest
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
};
```

`output: "standalone"` is only for self-hosting (Docker, bare metal).
On Vercel it produces files in a location Vercel can't serve, which is
why every page returned "page has been removed" (Vercel's 404).

### 2. `src/app/page.tsx` — RESTORED

The `return ( ... )` statement had been emptied (no JSX inside the
parentheses). The page returned `undefined` so Vercel rendered nothing.
The full scene tree is now restored:

```jsx
return (
  <div className="relative flex min-h-screen flex-col bg-ink">
    <ScrollProgress edge="top" color="var(--volt)" />
    <SiteHeader />
    <main className="relative flex-1">
      <HeroScene />
      <KineticStatement />
      <FeaturedNova onOpenProject={setActiveProjectSlug} />
      <ProjectWall onOpenProject={setActiveProjectSlug} />
      <SkillConstellation />
      <AboutPreview />
      <ExperienceTimeline />
      <ContactScene />
    </main>
    <SiteFooter />
    <ProjectCaseStudyDialog slug={activeProjectSlug} onOpenChange={setActiveProjectSlug} />
  </div>
);
```

### Deploy steps

1. Push this updated code to your GitHub repo (`git push origin main`)
2. Go to https://vercel.com → your project → "Deployments" → "Redeploy"
3. Vercel auto-detects Next.js from `package.json` and runs `next build`
4. No env vars are required for the site to render — the contact form
   just returns a safe 503 until you wire email credentials

### Optional: email credentials (for the contact form to actually send)

In Vercel → Project Settings → Environment Variables, add:

```
EMAIL_API_KEY=...
EMAIL_PROVIDER=resend           # or postmark, sendgrid
CONTACT_TO_EMAIL=zeeshansultan785@gmail.com
CONTACT_FROM_EMAIL=portfolio@yourverifieddomain.com
NEXT_PUBLIC_SITE_URL=https://developerzeeshan.vercel.app
```

Then implement the provider's API call in `src/lib/portfolio/email.ts`
(Resend-style example is sketched in the comments).

---

## 🖼️ Your portrait — where to put the PNG

The About section now shows a large portrait at the top with the
heading text below it. Both are animated (clip-path mask reveal +
subtle float on the portrait, mask reveal + parallax on the
background outlined "ZEESHAN" text).

**Drop your portrait PNG here:**

```
public/images/profile/portrait.png
```

Recommended:
- Aspect ratio: 4:5 (portrait orientation) — e.g. 800×1000 or 1200×1500
- PNG or JPG
- Under 500KB
- Well-lit, professional, natural photograph

The component uses Next.js `<Image>` with `priority` so it loads early.
**If the file is missing, a stylized "Z" placeholder is shown automatically**
— so the site never looks broken while you decide on the photo.

If you want a different filename or path, edit
`src/components/scenes/about-preview.tsx` and change the `src` in the
`<Image>` tag.

---

## ✅ Placeholders that were updated in this version

| Field | Old placeholder | Updated to |
|---|---|---|
| Email (social + contact) | `hello@zeeshan.dev` | `zeeshansultan785@gmail.com` |
| GitHub URL | `https://github.com/` | `https://github.com/zeshii07` |
| LinkedIn URL | `https://www.linkedin.com/` | `https://www.linkedin.com/in/hafiz-muhammad-zeeshan-718a03410` |
| WhatsApp | `https://wa.me/` | `https://wa.me/+923019299608` |
| Site URL (metadata) | `https://zeeshan.dev` | `https://developerzeeshan.vercel.app` |
| Twitter handle | `@zeeshanahmad` | (removed — you don't have one) |

**Note**: your LinkedIn URL was previously missing the `https://`
protocol (`www.linkedin.com/...` instead of `https://www.linkedin.com/...`).
Without the protocol the browser treated it as a relative path and the
link was broken. This is now fixed.

---

## Placeholders YOU still need to replace

These can't be filled in without your input:

| What | Where | Notes |
|---|---|---|
| Your real CV PDF | `public/resume/zeeshan-cv.pdf` | Replace the placeholder PDF |
| Your portrait PNG | `public/images/profile/portrait.png` | 4:5 aspect ratio recommended |
| Real project screenshots | `public/images/projects/` | Then swap `NovaPoster` / `ProjectPoster` SVGs for `<Image>` |
| Verify project facts | `src/data/projects.ts` | Confirm each project's descriptions match what you actually built |
| Real project links | `src/data/projects.ts` | Most `href` values are still `#` — replace with real URLs |
| Email provider credentials | `.env.local` or Vercel env vars | For the contact form to actually send |
| Your name | `src/data/site.ts` | Currently `Zeeshan Ahmad` — your LinkedIn says `Hafiz Muhammad Zeeshan`. Update if needed |

---

## Project structure

```
zeeshan-portfolio/
├── public/
│   ├── favicon.svg
│   ├── images/
│   │   ├── profile/              # ← drop portrait.png here
│   │   │   └── README.md
│   │   └── projects/             # ← drop real screenshots here
│   ├── resume/zeeshan-cv.pdf     # ← replace with your real CV
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx              # ← restored (was emptied)
│   ├── components/
│   │   ├── shell/                # SiteHeader, SiteFooter
│   │   ├── scenes/               # hero, kinetic-statement, featured-nova,
│   │   │                         # project-wall, skill-constellation,
│   │   │                         # about-preview, experience-timeline,
│   │   │                         # contact-scene
│   │   ├── motion/               # Reveal, SplitText, MagneticButton,
│   │   │                         # Marquee, ScrollProgress, ImageMaskReveal
│   │   ├── visuals/              # AmbientGlow, NoiseOverlay, OrbitalGraphic,
│   │   │                         # GridLines, NovaPoster
│   │   ├── studio/               # Eyebrow, SectionNumber, ArrowLink
│   │   ├── projects/             # ProjectCaseStudyDialog
│   │   ├── ui-portfolio/         # ProjectPoster, TechBadge, StatusBadge
│   │   └── ui/                   # shadcn/ui base components
│   ├── data/                     # projects, services, experience, skills, site
│   ├── hooks/                    # use-active-section, use-mobile, use-toast
│   ├── lib/portfolio/            # validation, rate-limit, email
│   └── types/portfolio.ts
├── next.config.ts                # ← Vercel-ready (standalone removed)
├── package.json                  # ← cross-platform scripts
├── .env.example
├── .gitignore                    # ← allows .env.example to be committed
└── README.md
```

---

## Honesty notes (also visible in the UI)

- Project visuals are stylized SVG posters and dashboard compositions,
  clearly labeled "design preview" where applicable.
- Nova's analytics/scheduling and Hirely AI's mock-interview mode are
  marked as roadmap items in the case studies.
- Client website specifics are summarized without naming clients.
- No fabricated metrics, testimonials, or years of experience.

---

Built following the Frontend Design & Interaction Specification
("Chromatic Engineering / Interactive Digital Studio").
