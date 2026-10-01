import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";

interface SectionTransitionProps {
  from?: "purple" | "blue" | "cyan";
  number: string;
  label: string;
  title: string;
  subtitle: string;
}

function SectionTransition({
  from = "purple",
  number,
  label,
  title,
  subtitle,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.35,
  });

  const theme = {
    purple: {
      glow: "bg-purple-500",
      text: "text-purple-300",
      border: "border-purple-400/20",
      line: "via-purple-400/50",
    },
    blue: {
      glow: "bg-blue-500",
      text: "text-blue-300",
      border: "border-blue-400/20",
      line: "via-blue-400/50",
    },
    cyan: {
      glow: "bg-cyan-400",
      text: "text-cyan-300",
      border: "border-cyan-400/20",
      line: "via-cyan-400/50",
    },
  }[from];

  const glowScale = useTransform(
    progress,
    [0, 0.5, 1],
    [0.45, 1.6, 0.65],
  );

  const glowOpacity = useTransform(
    progress,
    [0, 0.3, 0.65, 1],
    [0, 0.45, 0.32, 0],
  );

  const ringScale = useTransform(
    progress,
    [0, 0.5, 1],
    [0.55, 1.35, 2.8],
  );

  const ringOpacity = useTransform(
    progress,
    [0, 0.25, 0.65, 1],
    [0, 0.8, 0.35, 0],
  );

  const lineScale = useTransform(
    progress,
    [0.05, 0.5, 0.9],
    [0, 1, 0],
  );

  const contentY = useTransform(
    progress,
    [0, 0.5, 1],
    [80, 0, -80],
  );

  const contentOpacity = useTransform(
    progress,
    [0.15, 0.38, 0.68, 0.88],
    [0, 1, 1, 0],
  );

  const numberX = useTransform(
    progress,
    [0, 0.5, 1],
    [-40, 0, 40],
  );

  return (
    <div
      ref={ref}
      className="relative h-[55vh] min-h-[360px] overflow-hidden bg-zinc-950"
    >
      {/* Ambient glow */}

      <motion.div
        style={{
          scale: glowScale,
          opacity: glowOpacity,
        }}
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[25vw] w-[25vw] min-h-[220px] min-w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full ${theme.glow} blur-[110px]`}
      />

      {/* Outer ring */}

      <motion.div
        style={{
          scale: ringScale,
          opacity: ringOpacity,
        }}
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[20vw] w-[20vw] min-h-[180px] min-w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full border ${theme.border}`}
      />

      {/* Inner ring */}

      <motion.div
        style={{
          scale: ringScale,
          opacity: ringOpacity,
        }}
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[8vw] w-[8vw] min-h-[80px] min-w-[80px] -translate-x-1/2 -translate-y-1/2 rounded-full border ${theme.border}`}
      />

      {/* Horizontal line */}

      <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px">
        <motion.div
          style={{
            scaleX: lineScale,
            transformOrigin: "center",
          }}
          className={`h-px w-full bg-gradient-to-r from-transparent ${theme.line} to-transparent`}
        />
      </div>

      {/* Vertical line */}

      <motion.div
        style={{
          scaleY: lineScale,
          transformOrigin: "center",
        }}
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent ${theme.line} to-transparent`}
      />

      {/* Rotating particles */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[24vw] w-[24vw] min-h-[220px] min-w-[220px] -translate-x-1/2 -translate-y-1/2"
      >
        <span
          className={`absolute left-0 top-1/2 h-1 w-1 rounded-full ${theme.glow}`}
        />
        <span
          className={`absolute right-0 top-1/2 h-1 w-1 rounded-full ${theme.glow}`}
        />
        <span
          className={`absolute left-1/2 top-0 h-1 w-1 rounded-full ${theme.glow}`}
        />
        <span
          className={`absolute bottom-0 left-1/2 h-1 w-1 rounded-full ${theme.glow}`}
        />
      </motion.div>

      {/* Main scene content */}

      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="flex flex-col items-center text-center">

          <motion.div
            style={{
              x: numberX,
            }}
            className={`mb-5 text-[9px] uppercase tracking-[0.5em] ${theme.text}`}
          >
            {number} / {label}
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[clamp(2.5rem,7vw,6rem)] font-semibold uppercase leading-none tracking-[-0.07em]"
            >
              {title}
            </motion.h2>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.9,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[clamp(2.5rem,7vw,6rem)] font-semibold uppercase leading-none tracking-[-0.07em] text-zinc-600"
            >
              {subtitle}
            </motion.h2>
          </div>

          <div className="mt-7 h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </motion.div>

      {/* Edge fades */}

      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-zinc-950 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-zinc-950 to-transparent" />

      {/* Grain */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:radial-gradient(rgba(255,255,255,0.8)_0.5px,transparent_0.5px)] [background-size:5px_5px]" />
    </div>
  );
}

export default SectionTransition;