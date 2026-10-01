import {
  createContext,
  useCallback,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

type Phase = "idle" | "diving" | "covering" | "arriving";

interface TransitionContextValue {
  play: (callback: () => void) => void;
  phase: Phase;
}

export const TransitionContext = createContext<TransitionContextValue | null>(
  null,
);

const DIVE_DURATION = 0.62;
const COVER_HOLD = 0.35;
const ARRIVE_DURATION = 0.7;

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const busyRef = useRef(false);

  // Master progress 0 → 1 → 0 that drives the whole sequence
  // 0 = fully closed (idle), 1 = fully open (idle)
  const openProgress = useMotionValue(1);
  const smoothOpen = useSpring(openProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.8,
  });

  // Separate "tunnel scale" — only animates during dive
  const tunnelScale = useMotionValue(0.15);
  const smoothTunnelScale = useSpring(tunnelScale, {
    stiffness: 120,
    damping: 22,
    mass: 0.6,
  });

  // Cover opacity — holds black between phases
  const coverOpacity = useMotionValue(0);
  const smoothCover = useSpring(coverOpacity, {
    stiffness: 220,
    damping: 26,
  });

  // Derived clip-path for tunnel — expanding from center
  const tunnelClip = useTransform(smoothOpen, (v) => {
    const radius = v * 150;
    return `circle(${radius}% at 50% 50%)`;
  });

  const play = useCallback(
    (callback: () => void) => {
      if (busyRef.current) return;
      busyRef.current = true;

      // ---- PHASE 1: DIVE ----
      setPhase("diving");
      openProgress.set(0);
      tunnelScale.set(1);

      setTimeout(() => {
        tunnelScale.set(20);
      }, 100);

      // ---- PHASE 2: COVER ----
      setTimeout(() => {
        setPhase("covering");
        coverOpacity.set(1);
      }, DIVE_DURATION * 1000);

      // ---- PHASE 3: NAVIGATE under the cover ----
      setTimeout(() => {
        callback();
        setPhase("arriving");
        tunnelScale.set(0.15);
        openProgress.set(1);
      }, DIVE_DURATION * 1000 + COVER_HOLD * 1000);

      // ---- PHASE 4: FADE COVER OUT ----
      setTimeout(() => {
        coverOpacity.set(0);
      }, DIVE_DURATION * 1000 + COVER_HOLD * 1000 + 180);

      // ---- PHASE 5: DONE ----
      setTimeout(
        () => {
          setPhase("idle");
          busyRef.current = false;
        },
        DIVE_DURATION * 1000 +
          COVER_HOLD * 1000 +
          180 +
          ARRIVE_DURATION * 1000,
      );
    },
    [openProgress, tunnelScale, coverOpacity],
  );

  // =========================================================
  // TUNNEL IS ONLY MOUNTED DURING DIVE/COVER PHASES
  // =========================================================
  const tunnelVisible = phase !== "idle";

  return (
    <TransitionContext.Provider value={{ play, phase }}>
      {children}

      {/* =========================================================
          TUNNEL — only mounted during transition
      ========================================================= */}
      <AnimatePresence>
        {tunnelVisible && (
          <motion.div
            key="tunnel"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              clipPath: tunnelClip,
              WebkitClipPath: tunnelClip,
            }}
            className="pointer-events-none fixed inset-0 z-[9990]"
          >
            <div className="absolute inset-0 bg-ink" />

            <motion.div
              style={{ scale: smoothTunnelScale }}
              className="absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2"
            >
              <div className="absolute inset-[8%] rounded-full border border-white/[0.06]" />
              <div className="absolute inset-[20%] rounded-full border border-white/[0.05]" />
              <div className="absolute inset-[32%] rounded-full border border-white/[0.04]" />
              <div className="absolute inset-[44%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.18),transparent_65%)]" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.14),transparent_60%)]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          COVER — only mounted when visible
      ========================================================= */}
      <motion.div
        aria-hidden
        style={{ opacity: smoothCover }}
        className="pointer-events-none fixed inset-0 z-[9995] bg-ink"
      />
    </TransitionContext.Provider>
  );
}