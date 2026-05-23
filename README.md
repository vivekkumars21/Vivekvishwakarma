# Velorah — Hero Section

> *"Where dreams rise through the silence."*

A cinematic, single-page hero section built with **React + Vite + TypeScript + Tailwind CSS + shadcn/ui**.

## Stack

| Tool | Version |
|------|---------|
| React | 18 |
| Vite | 5 |
| TypeScript | 5 |
| Tailwind CSS | 3 |
| shadcn/ui | latest |
| Radix UI | latest |

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
velorah/
├── index.html               # Entry HTML (loads Google Fonts)
├── vite.config.ts           # Vite configuration with path alias
├── tailwind.config.ts       # Tailwind with design tokens & animations
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx             # React root
    ├── App.tsx              # Full hero page (Navbar + Hero + BackgroundVideo)
    ├── index.css            # Global styles, design tokens, liquid-glass, keyframes
    ├── vite-env.d.ts
    ├── lib/
    │   └── utils.ts         # shadcn cn() helper
    └── components/
        └── ui/
            └── button.tsx   # shadcn/ui Button component
```

## Design Details

### Liquid Glass Effect
A CSS-only glassmorphic treatment using `backdrop-filter`, a luminosity blend,
and a `::before` pseudo-element that draws a gradient border via `mask-composite`
— applied to both navigation and hero CTA buttons.

### Typography
- **Display**: `Instrument Serif` — cinematic, editorial serif for headings
- **Body**: `Inter 400/500` — clean, readable sans-serif

### Color Tokens (HSL)
| Token | Value | Description |
|-------|-------|-------------|
| `--background` | `201 100% 13%` | Deep navy blue |
| `--foreground` | `0 0% 100%` | White |
| `--muted-foreground` | `240 4% 66%` | Muted gray (used for `<em>` accents) |
| `--border` | `0 0% 18%` | Subtle borders |

### Animations
Three staggered `fade-rise` keyframe classes (0s, 0.2s, 0.4s delay) orchestrate
the hero headline → subtext → CTA entrance.
# Vivekvishwakarma
