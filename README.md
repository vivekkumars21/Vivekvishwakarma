# Vivek Vishwakarma — Developer Portfolio

> *"Engineering intelligent software with clean architectures."*

A premium, cinematic single-page developer portfolio built with React, TypeScript, and Tailwind CSS. Features a dark frosted glassmorphic UI with performance-optimized hover effects, a looping space background video, and an interactive ghost companion.

---

## 🌟 Design & Visual Highlights

- **Dark Frosted Glassmorphism:** Cards and panels use a dark-tinted frosted glass (`rgba(10, 10, 18, 0.55)` + `backdrop-filter: blur(28px)`) for excellent text readability over the video background.
- **Immersive Space Video Loop:** Full-viewport looping background video rendered behind all content at `opacity-95`, with a pure dark base (`--background: 240 10% 3.9%`).
- **Performance-Optimized Hover Effects:** Radial mouse-following shimmer glow on all cards using CSS custom properties (`--mouse-x`, `--mouse-y`) with cached bounding rects to eliminate layout thrashing.
- **Flicker-Free Navbar:** Solid dark background navbar (no `backdrop-filter`) that activates on scroll — zero GPU cost during scrolling.
- **Hidden Scrollbars:** Custom stylesheets hide scrollbar rails across all browsers for an app-like immersive experience.
- **Interactive Ghost Companion:** A floating ghost mascot in the bottom-left corner with click-to-spin interactions and rotating speech bubbles.
- **Ambient Cursor Glow:** A large, blurred radial glow that follows the mouse cursor across the page (desktop only).
- **Resume Download:** Integrated as a glass-styled CTA button in the Hero section.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | Component-driven UI with hooks for state and effects |
| **Vite 5** | Fast HMR dev server and optimized production bundler |
| **TypeScript 5** | Strict static typing for all components and utilities |
| **Tailwind CSS 3** | Utility-first responsive styling framework |
| **Lucide Icons** | Minimal stroke-based SVG icon set |

---

## 📂 Project Structure

```
portfioDesign/
├── index.html                  # HTML entry — loads Google Fonts (Inter, Space Grotesk, Instrument Serif)
├── vite.config.ts              # Vite config with path aliasing
├── tailwind.config.ts          # Custom Tailwind theme (colors, fonts, animations)
├── postcss.config.js           # PostCSS + Tailwind pipeline
├── tsconfig.json               # TypeScript compiler config
├── public/
│   ├── favicon.svg             # Site favicon
│   ├── ghost.svg               # Ghost companion SVG asset
│   └── Vivek_Vishwakarma_Resume.pdf
└── src/
    ├── main.tsx                # React app entrypoint
    ├── App.tsx                 # All sections: Hero, Projects, Experience, Skills, Education, Contact
    ├── index.css               # Design tokens, Liquid Glass styles, animations
    ├── vite-env.d.ts           # Vite type declarations
    ├── hooks/
    │   └── useActiveSection.ts # Intersection Observer hook for nav highlighting
    ├── lib/
    │   └── utils.ts            # Tailwind class merge utility (cn)
    └── components/
        └── ui/
            ├── button.tsx      # Design-system Button primitive
            └── ghost.tsx       # Ghost companion SVG component
```

---

## 🚀 Getting Started

### Prerequisites
[Node.js](https://nodejs.org) v18 or higher.

### Installation
```bash
git clone https://github.com/vivekkumars21/Vivekvishwakarma.git
cd Vivekvishwakarma
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 💅 Styling Architecture

### Liquid Glass (`src/index.css`)
Dark-tinted frosted glass panels optimized for readability:
```css
.liquid-glass {
  background: rgba(10, 10, 18, 0.55);
  backdrop-filter: blur(28px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
```

### Hover Performance
Cards use cached bounding rects and targeted CSS transitions to avoid layout thrashing and `backdrop-filter` recompositing:
- `handleCardMouseEnter` — caches `getBoundingClientRect()` once on hover entry
- `handleCardMouseMove` — reads from cache, updates `--mouse-x` / `--mouse-y` custom properties
- `.card-hover-transition` — transitions only `border-color` and `box-shadow` (never `all`)
- No `hover:scale` transforms on glass elements (scale + backdrop-filter = flicker)

### Typography
- **Headlines:** `Instrument Serif` — editorial serif for visual impact
- **Body:** `Space Grotesk` / `Inter` — clean, precise sans-serif

---

## 📑 Sections

| Section | Description |
| :--- | :--- |
| **Hero** | Headline, subtitle, location badge, and CTA buttons |
| **Projects** | 3 featured project cards (Deepfake Detection, PlexusNet EMS, healthcareAI) |
| **Experience** | Leadership role at ISTE with bullet highlights |
| **Skills** | 5-column grid: Programming, Web Dev, Data Science, Databases, Tools |
| **Education** | Degree info, certifications, and core competencies |
| **Contact** | Email card, GitHub and LinkedIn profile cards |

---

## 🤝 License
Personal developer portfolio for **Vivek Vishwakarma**. Layout and styles are free to customize. Unauthorized distribution of personal resume assets and details is prohibited.
