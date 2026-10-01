import { motion } from "motion/react";
import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}

function ScrollReveal({
  children,
  className = "",
  delay = 0,
  distance = 50,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState<"down" | "up">("down");

  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setDirection("down");
      } else if (currentScrollY < lastScrollY.current) {
        setDirection("up");
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: "-5% 0px -5% 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const hiddenY = direction === "up" ? -distance : distance;

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: hiddenY,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : hiddenY,
      }}
      transition={{
        duration: 0.7,
        delay: isVisible ? delay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;