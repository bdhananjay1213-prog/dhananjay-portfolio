import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeTransition() {
  const { transitionState, origin } = useTheme();

  const isCollapsing = transitionState === "collapsing";
  const isExpanding = transitionState === "expanding";
  const isActive = isCollapsing || isExpanding;

  const maxRadius =
    typeof window !== "undefined"
      ? Math.hypot(window.innerWidth, window.innerHeight) * 1.2
      : 2000;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key={transitionState}
          className="pointer-events-none fixed inset-0 z-[99999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* =================================================
              GOING DARK — HOLLOW PURPLE → BLACKHOLE
          ================================================= */}
          {isCollapsing && (
            <>
              {/* Purple orb condenses */}
              <motion.div
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{
                  width: [0, 40, 220, 320, 80],
                  height: [0, 40, 220, 320, 80],
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{
                  duration: 1.0,
                  times: [0, 0.15, 0.45, 0.7, 1],
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  left: origin.x,
                  top: origin.y,
                  transform: "translate(-50%, -50%)",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(216,180,254,1) 25%, rgba(168,85,247,0.9) 50%, rgba(88,28,135,0.4) 75%, transparent 100%)",
                  boxShadow:
                    "0 0 80px 20px rgba(168,85,247,0.9), 0 0 160px 60px rgba(139,92,246,0.5)",
                }}
                className="absolute rounded-full"
              />

              {/* White flash at detonation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 0, 0.9, 0] }}
                transition={{
                  duration: 1.0,
                  times: [0, 0.6, 0.7, 0.75, 1],
                  ease: "easeOut",
                }}
                className="absolute inset-0 bg-white"
              />

              {/* Purple detonation ring */}
              <motion.div
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{
                  width: [0, 400, 1200],
                  height: [0, 400, 1200],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.4,
                  delay: 0.6,
                  ease: "easeOut",
                }}
                style={{
                  left: origin.x,
                  top: origin.y,
                  transform: "translate(-50%, -50%)",
                  border: "2px solid rgba(216,180,254,0.9)",
                  boxShadow: "0 0 120px 40px rgba(168,85,247,0.7)",
                }}
                className="absolute rounded-full"
              />

              {/* Blackhole */}
              <motion.div
                initial={{
                  clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`,
                }}
                animate={{
                  clipPath: `circle(${maxRadius}px at ${origin.x}px ${origin.y}px)`,
                }}
                transition={{
                  duration: 1.0,
                  delay: 0.7,
                  ease: [0.83, 0, 0.17, 1],
                }}
                className="absolute inset-0 bg-black"
              />

              {/* Spiral accretion */}
              <motion.div
                initial={{
                  clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`,
                  opacity: 0,
                  rotate: 0,
                }}
                animate={{
                  clipPath: [
                    `circle(0px at ${origin.x}px ${origin.y}px)`,
                    `circle(200px at ${origin.x}px ${origin.y}px)`,
                    `circle(${maxRadius}px at ${origin.x}px ${origin.y}px)`,
                  ],
                  opacity: [0, 0.95, 0],
                  rotate: [0, 220, 460],
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.6,
                  ease: [0.83, 0, 0.17, 1],
                }}
                style={{
                  transformOrigin: `${origin.x}px ${origin.y}px`,
                  background: `conic-gradient(from 0deg at ${origin.x}px ${origin.y}px,
                    rgba(255,255,255,0) 0deg,
                    rgba(216,180,254,0.7) 40deg,
                    rgba(168,85,247,0.6) 80deg,
                    rgba(88,28,135,0.9) 140deg,
                    rgba(0,0,0,1) 180deg,
                    rgba(88,28,135,0.9) 220deg,
                    rgba(168,85,247,0.6) 280deg,
                    rgba(216,180,254,0.7) 320deg,
                    rgba(255,255,255,0) 360deg)`,
                }}
                className="absolute inset-0"
              />
            </>
          )}

          {/* =================================================
              GOING LIGHT — SUNRISE
          ================================================= */}
          {isExpanding && (
            <>
              <motion.div
                initial={{
                  clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`,
                }}
                animate={{
                  clipPath: `circle(${maxRadius}px at ${origin.x}px ${origin.y}px)`,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at center, #fffbf2 0%, #fdf6ec 40%, #f5efe4 100%)",
                }}
              />

              <motion.div
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{
                  width: [0, 300, 600],
                  height: [0, 300, 600],
                  opacity: [0, 0.9, 0],
                }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                style={{
                  left: origin.x,
                  top: origin.y,
                  transform: "translate(-50%, -50%)",
                  background:
                    "radial-gradient(circle, rgba(255,220,150,0.8) 0%, rgba(255,180,80,0.4) 30%, transparent 70%)",
                }}
                className="absolute rounded-full"
              />

              <motion.div
                initial={{
                  clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`,
                  opacity: 0,
                  rotate: 0,
                }}
                animate={{
                  clipPath: [
                    `circle(0px at ${origin.x}px ${origin.y}px)`,
                    `circle(200px at ${origin.x}px ${origin.y}px)`,
                    `circle(${maxRadius}px at ${origin.x}px ${origin.y}px)`,
                  ],
                  opacity: [0, 0.6, 0],
                  rotate: [0, 90, 180],
                }}
                transition={{
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformOrigin: `${origin.x}px ${origin.y}px`,
                  background: `conic-gradient(from 0deg at ${origin.x}px ${origin.y}px,
                    rgba(255,220,150,0) 0deg,
                    rgba(255,220,150,0.3) 30deg,
                    transparent 60deg,
                    rgba(255,220,150,0.3) 90deg,
                    transparent 120deg,
                    rgba(255,220,150,0.3) 150deg,
                    transparent 180deg,
                    rgba(255,220,150,0.3) 210deg,
                    transparent 240deg,
                    rgba(255,220,150,0.3) 270deg,
                    transparent 300deg,
                    rgba(255,220,150,0.3) 330deg,
                    rgba(255,220,150,0) 360deg)`,
                }}
                className="absolute inset-0"
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}