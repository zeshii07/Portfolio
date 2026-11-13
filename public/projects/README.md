# Project Screenshots

Drop real annotated screenshots here. Each filename must match the
`src` path declared in `src/data/projects.ts`.

## Required files (case study placeholders reference these)

### Nova
- `nova/dashboard.png` — Operator dashboard inbox
- `nova/tenant-config.png` — Tenant configuration panel
- `nova/lead-detail.png` — Lead detail drawer

### Hirely AI
- `hirely/practice.png` — Practice flow
- `hirely/feedback.png` — Structured answer feedback
- `hirely/resume.png` — Resume review module

### Inventory Management System
- `inventory/dashboard.png` — Stock dashboard
- `inventory/movement.png` — Stock movement form
- `inventory/reports.png` — Movement summary report

### ZAIS Technologies (client)
- `zaishtech/home.png` — Homepage
- `zaishtech/services.png` — Services page
- `zaishtech/mobile.png` — Mobile view

### Lucky Crystal (client)
- `lucky-crystal/catalog.png` — Product catalog
- `lucky-crystal/detail.png` — Product detail page
- `lucky-crystal/mobile.png` — Mobile catalog view

### BYT Clean (client)
- `bytclean/home.png` — Homepage
- `bytclean/service.png` — Service detail page
- `bytclean/mobile.png` — Mobile view

## Format guidelines
- 16:10 aspect ratio (the case study frame uses `aspect-[16/10]`)
- 1600×1000 px minimum
- PNG or JPG (PNG preferred for UI screenshots)
- Compress with `tinypng.com` or `sharp` before committing

## After dropping a file in

Update the matching entry in `src/data/projects.ts`:

```ts
screenshots: [
  { src: "/projects/nova/dashboard.png", caption: "...", placeholder: false },
  // ↑ flip placeholder from true → false
]
```

The case study dialog auto-swaps from the SVG placeholder frame to
the real image when `placeholder: false` (or when the file loads
successfully — the `<img>` onError handler falls back gracefully).
