import { motion, type Variants } from "motion/react";
import { useMemo } from "react";

type Mode = "chars" | "words" | "lines";

interface SplitTextProps {
  text: string;
  mode?: Mode;
  className?: string;
  /** stagger between each unit (seconds) */
  stagger?: number;
  /** delay before the first unit reveals */
  delay?: number;
  /** duration of each unit's reveal */
  duration?: number;
  /** reveal variant style */
  variant?: "up" | "blur" | "flip";
  /** only animate once */
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export default function SplitText({
  text,
  mode = "chars",
  className = "",
  stagger = 0.03,
  delay = 0,
  duration = 0.65,
  variant = "up",
  once = true,
  as = "span",
}: SplitTextProps) {
  const units = useMemo(() => {
    if (mode === "words") return text.split(" ");
    if (mode === "lines") return text.split("\n");
    return text.split("");
  }, [text, mode]);

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const hiddenByVariant =
    variant === "blur"
      ? { opacity: 0, y: "1.1em", filter: "blur(14px)" }
      : variant === "flip"
        ? { opacity: 0, rotateX: -90, y: "0.4em" }
        : { opacity: 0, y: "1.1em" };

  const visibleByVariant =
    variant === "blur"
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : variant === "flip"
        ? { opacity: 1, rotateX: 0, y: 0 }
        : { opacity: 1, y: 0 };

  const unit: Variants = {
    hidden: hiddenByVariant,
    visible: {
      ...visibleByVariant,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const Tag = motion[as];

  return (
    <Tag
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
      className={className}
      style={{
        display: "inline-block",
        perspective: variant === "flip" ? 1000 : undefined,
      }}
      aria-label={text}
    >
      {units.map((u, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            whiteSpace: mode === "words" ? "pre" : undefined,
            overflow: "hidden",
            verticalAlign: "bottom",
          }}
        >
          <motion.span
            variants={unit}
            style={{
              display: "inline-block",
              transformOrigin: "bottom",
            }}
            aria-hidden
          >
            {u === " " ? "\u00A0" : u === "\n" ? null : u}
          </motion.span>
          {mode === "words" && i < units.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </Tag>
  );
}