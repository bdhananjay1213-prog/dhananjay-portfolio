import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

type CursorState = "default" | "hover" | "text" | "hidden";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState<string | null>(null);
  const [isDown, setIsDown] = useState(false);

  // Raw pointer position
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Ring lags behind the dot
  const ringX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.6 });

  // Ring scales per state
  const ringScale = useTransform(
    [ringX, ringY], // dummy to keep it re-rendering
    () => 1, // placeholder — we'll set scale via animate prop instead
  );
  void ringScale; // prevent unused warning

  // Enable only on fine-pointer devices
  useEffect(() => {
    if (typeof window === "undefined") return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (finePointer && !reducedMotion) {
      setEnabled(true);
      document.body.dataset.cursor = "on";
    } else {
      delete document.body.dataset.cursor;
    }

    return () => {
      delete document.body.dataset.cursor;
    };
  }, []);

  // Track mouse
  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find nearest [data-cursor] ancestor
      const attrEl = target.closest<HTMLElement>("[data-cursor]");
      if (attrEl) {
        const mode = attrEl.dataset.cursor as CursorState | undefined;
        const text = attrEl.dataset.cursorText ?? null;
        setState(mode ?? "hover");
        setLabel(text);
        return;
      }

      // Fallback: interactive elements
      const interactive = target.closest<HTMLElement>(
        "a, button, [role='button'], input, textarea, select",
      );
      if (interactive) {
        setState("hover");
        setLabel(null);
        return;
      }

      setState("default");
      setLabel(null);
    };

    const handleDown = () => setIsDown(true);
    const handleUp = () => setIsDown(false);
    const handleLeave = () => setState("hidden");
    const handleEnter = () => setState("default");

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = state === "hover" ? 60 : state === "text" ? 90 : 34;
  const dotSize = state === "hover" ? 0 : 6;

  return (
    <>
      {/* Ring (lagging) */}
      <motion.div
        aria-hidden
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: state === "hidden" ? 0 : 1,
            scale: isDown ? 0.85 : 1,
          }}
          transition={{
            duration: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-center justify-center rounded-full border border-white/70"
        >
          <AnimatePresence>
            {label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="text-[9px] font-medium uppercase tracking-[0.2em] text-white"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Dot (instant) */}
      <motion.div
        aria-hidden
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="pointer-events-none fixed left-0 top-0 z-[10000] mix-blend-difference"
      >
        <motion.div
          animate={{
            width: dotSize,
            height: dotSize,
            opacity: state === "hidden" ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full bg-white"
        />
      </motion.div>
    </>
  );
}