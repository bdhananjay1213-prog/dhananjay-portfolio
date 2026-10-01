import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";

import "./index.css";
import App from "./App.tsx";
import CustomCursor from "./components/CustomCursor.tsx";
import { TransitionProvider } from "./transition/TransitionProvider.tsx";
import { ThemeProvider } from "./theme/ThemeProvider";
import ThemeTransition from "./theme/ThemeTransition";

function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <LenisProvider>
          <TransitionProvider>
            <CustomCursor />
            <ThemeTransition />
            <App />
          </TransitionProvider>
        </LenisProvider>
      </ThemeProvider>
    </MotionConfig>
  </StrictMode>,
);