<div align="center">

# Dhananjay · Portfolio

**A cinematic developer portfolio — built with React, TypeScript, and obsessive attention to motion.**

[Live Site](https://dhananjay-portfolio.netlify.app) · [GitHub](https://github.com/bdhananjay1213-prog) · [Contact](mailto:hello@dhananjay.dev)

</div>

---

## ✨ What's inside

A full-stack developer portfolio designed as a **continuous cinematic experience** — not a static page with animations sprinkled on top.

Every interaction is choreographed:
- **Scroll-driven sections** that reveal like film scenes
- **Camera-dive transitions** between routes
- **Custom cursor** with magnetic hover states
- **Split-text cascading titles** on every heading
- **Dark ⇄ light theme** with blackhole / sunrise transitions and matched sound design
- **Bento services grid** with parallax drift and staged reveals
- **Full case studies** with parallax imagery and editorial layout

---

## 🎬 Highlights

| Feature | What it does |
|---|---|
| **Global transition system** | Every route change plays a camera-dive through a 3D tunnel |
| **Theme toggle** | Moon ⇄ torch switch with a Hollow-Purple-style blackhole / sunrise wipe |
| **Custom cursor** | Dot + lagging ring, grows on interactive elements, changes per section |
| **Smooth scroll** | Lenis-powered momentum scrolling, disabled on touch devices |
| **Split text** | Letter-by-letter reveals on hero + section titles |
| **Magnetic buttons** | Interactive elements drift toward the cursor within a radius |
| **Reduced motion** | Everything degrades gracefully when `prefers-reduced-motion` is set |
| **Case studies** | Real stories for shipped and in-progress projects |

---

## 🛠 Stack

**Core**
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

**Styling**
- [Tailwind CSS v4](https://tailwindcss.com/) — with `@theme` design tokens
- Custom CSS vars for theme switching

**Motion**
- [Motion (Framer Motion)](https://motion.dev/) — springs, scroll-scrub, AnimatePresence
- [Lenis](https://lenis.studiofreight.com/) — smooth scroll

**Routing**
- [React Router 7](https://reactrouter.com/)

**Deployment**
- [Netlify](https://netlify.com/)

---

## 📁 Project structure
src/
├── components/
│ ├── motion/ # Reusable motion primitives
│ │ ├── Magnetic.tsx # Cursor-attracted wrapper
│ │ ├── Marquee.tsx # Infinite horizontal scroll
│ │ ├── Reveal.tsx # Scroll-triggered reveal
│ │ └── SplitText.tsx # Letter/word/line cascading reveals
│ ├── AmbientBackground.tsx
│ ├── CustomCursor.tsx
│ ├── Grain.tsx
│ ├── Layout.tsx
│ ├── Navbar.tsx
│ ├── ThemeToggle.tsx
│ ├── Hero.tsx
│ ├── Services.tsx
│ ├── Projects.tsx
│ ├── About.tsx
│ ├── Contact.tsx
│ └── SectionTransition.tsx
├── hooks/
│ └── useTheme.ts
├── pages/
│ ├── Home.tsx
│ ├── ProjectHub.tsx
│ └── projects/
│ ├── GodsOwnRoute.tsx
│ └── RiskLens.tsx
├── theme/
│ ├── ThemeProvider.tsx
│ └── ThemeTransition.tsx
├── transition/
│ ├── TransitionProvider.tsx
│ └── useTransition.ts
├── App.tsx
├── index.css
└── main.tsx


---

## 🚀 Run locally

```bash
# Clone
git clone https://github.com/bdhananjay1213-prog/dhananjay-portfolio.git
cd dhananjay-portfolio

# Install
npm install

# Dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
