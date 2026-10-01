import { motion } from "motion/react";
import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** seconds for one full loop */
  duration?: number;
  reverse?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  duration = 30,
  reverse = false,
  className = "",
}: MarqueeProps) {
  return (
    <div
      className={`relative flex overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <motion.div
        className="flex shrink-0 gap-8 pr-8"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}