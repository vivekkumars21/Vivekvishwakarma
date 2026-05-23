# Vivek Vishwakarma — Cinematic Portfolio Website

> *"Engineering intelligent software with clean architectures."*

A state-of-the-art, premium developer portfolio website designed for **Vivek Vishwakarma**. Features an ultra-premium, cinematic single-page iOS-style frosted glassmorphic UI with zero blue/cyan undertones, overlaying a starry, stellar canola field background video loop.

---

## 🌟 Visual & Design Highlights

*   **iOS Frosted Glassmorphic Aesthetic:** Completely tailored clean-white frosted panels using fine vector-thin borders, `backdrop-filter: blur(24px) saturate(160%)`, and delicate translucent color hues (`rgba(255, 255, 255, 0.065)`).
*   **Immersive Space Loop:** Rendered in HSL pure dark tones (`--background: 240 10% 3.9%`) underneath an edge-to-edge celestial background video running at `opacity-95` to eliminate washed-out colors.
*   **Full-Bleed Viewport & Hidden Scrollbars:** Custom global stylesheets systematically hide default desktop scrollbar rails for a game-engine like, premium web-app immersion while maintaining fluid native scrolling capability.
*   **Dynamic Scroll Indicators:** 
    *   **Frosted Glass Navbar:** Glides seamlessly over contents and gains beautiful frosted blur background textures dynamically when scrolling starts.
    *   **Fading Bouncing Chevron:** A central interactive bouncing arrow hints to the user to scroll and elegantly fades out to `opacity-0` once scrolling begins past `30px`.
*   **Double CV Integration:** The official CV is integrated dynamically both as a premium glass download button in the Hero section CTA and via the static public folder for fast client-side delivery.

---

## 🛠️ Technology Stack

| Technology | Purpose & Usage |
| :--- | :--- |
| **React 18** | Declarative state management and component-driven architecture |
| **Vite 5** | Lightning-fast HMR dev server and optimized production bundler |
| **TypeScript 5** | Strict static typing for robust and reliable component interfaces |
| **Tailwind CSS 3** | High-utility modern styling framework for responsive layout structure |
| **Lucide Icons** | Premium stroke-based minimal vector SVG icons |

---

## 📂 Project Structure

```
d:/codes/portfioDesign/
├── index.html                  # Core HTML (Loads custom Google Fonts: Inter & Instrument Serif)
├── vite.config.ts              # Configured Vite runner with path aliasing
├── tailwind.config.ts          # Custom Tailwind configuration including keyframes
├── postcss.config.js           # PostCSS compiler setups
├── tsconfig.json               # TypeScript configuration parameters
├── VIVEK VISHWAKARMA CV.pdf    # Official professional resume (Source document)
├── public/
│   ├── favicon.svg             # Premium aesthetic celestial coordinate star logo
│   └── VIVEK VISHWAKARMA CV.pdf # Publicly accessible static asset for visitor downloads
└── src/
    ├── main.tsx                # App entrypoint
    ├── App.tsx                 # Core Single-Page application containing all sections
    ├── index.css               # Main styling sheet housing design tokens and Liquid Glass styles
    ├── vite-env.d.ts           # Vite Environment declarations
    ├── lib/
    │   └── utils.ts            # Dynamic Tailwind classes combiner utility (cn)
    └── components/
        └── ui/
            └── button.tsx      # Standardized design-system Button primitive
```

---

## 🚀 Getting Started

Follow these steps to run the portfolio locally on your machine.

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) (v18 or higher recommended) installed.

### 2. Installation
Clone the repository and install all dependencies:
```bash
# Install package dependencies
npm install
```

### 3. Development Server
Launch the local developer server:
```bash
# Run server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
To build the application for deployment:
```bash
# Build optimized bundle
npm run build

# Preview build locally
npm run preview
```

---

## 💅 Styling Systems

### 1. Liquid Glass Utilities (`src/index.css`)
Provides the ultra-luxurious translucent glass layers:
```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.065);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
```

### 2. Fine-grained Scroll Detection
Since standard stylesheets define fixed bounds, scrolling can capture inside wrappers. `App.tsx` handles this gracefully using **Capture-Phase Event Listeners** registered globally (`true` parameter) to dynamically track `e.target.scrollTop` as fallback targets.

```typescript
window.addEventListener('scroll', handleScroll, true);
```

### 3. Typography Pairings
*   **Headlines & Accents:** `Instrument Serif` (Google Fonts) — Editorial, high-fashion serif styling.
*   **Body & Interfaces:** `Inter` (Google Fonts) — Precision-engineered sans-serif.

---

## 🤝 Contribution & License
Created specifically as the personal developer portfolio for **Vivek Vishwakarma**. Unauthorized distribution of personal resume assets and details is prohibited. All layout styles are free to be customized under normal development pipelines.
