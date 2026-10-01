import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  /** animate from a direction */
  from?: "bottom" | "top" | "left" | "right";
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  distance = 40,
  duration = 0.7,
  once = true,
  amount = 0.25,
  from = "bottom",
}: RevealProps) {
  const hiddenByFrom =
    from === "top"
      ? { opacity: 0, y: -distance }
      : from === "left"
        ? { opacity: 0, x: -distance }
        : from === "right"
          ? { opacity: 0, x: distance }
          : { opacity: 0, y: distance };

  const variants: Variants = {
    hidden: hiddenByFrom,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}