import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import SplitText from "./motion/SplitText";


const techStack = ["React", "TypeScript", "Python", "AI", "APIs"];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.4,
  });

  const titleY = useTransform(progress, [0, 1], [0, -220]);
  const titleScale = useTransform(progress, [0, 0.75], [1, 0.72]);
  const titleOpacity = useTransform(progress, [0, 0.62], [1, 0]);

  const subtitleY = useTransform(progress, [0, 0.7], [0, -90]);
  const subtitleOpacity = useTransform(progress, [0, 0.45], [1, 0]);

  const visualY = useTransform(progress, [0, 1], [0, -180]);
  const visualScale = useTransform(progress, [0, 0.8], [1, 1.18]);
  const visualRotate = useTransform(progress, [0, 1], [0, 6]);
  const visualOpacity = useTransform(progress, [0, 0.7], [1, 0]);

  const gridOpacity = useTransform(progress, [0, 0.65], [0.22, 0]);
  const gridScale = useTransform(progress, [0, 1], [1, 1.15]);

  const orbScale = useTransform(progress, [0, 0.8], [1, 2.2]);
  const orbOpacity = useTransform(progress, [0, 0.7], [0.3, 0]);

  const lineScale = useTransform(progress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative h-[190vh] overflow-hidden bg-ink text-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ATMOSPHERE */}

        <motion.div
          style={{ scale: gridScale, opacity: gridOpacity }}
          className="pointer-events-none absolute inset-[-10%] bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(circle_at_center,black,transparent_68%)]"
        />

        <motion.div
          style={{ scale: orbScale, opacity: orbOpacity }}
          className="pointer-events-none absolute left-1/2 top-[45%] h-[35vw] w-[35vw] min-h-[320px] min-w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[130px]"
        />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.8)_100%)]" />

        {/* MAIN COMPOSITION */}

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1700px] items-center px-6 sm:px-10 lg:px-16">
          <motion.div
            style={{
              y: titleY,
              scale: titleScale,
              opacity: titleOpacity,
            }}
            className="relative z-20 w-full"
          >
            {/* Label */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                letterSpacing: "0.08em",
              }}
              animate={{
                opacity: 1,
                y: 0,
                letterSpacing: "0.32em",
              }}
              transition={{
                duration: 1.2,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-8 text-[9px] font-medium uppercase text-fog sm:text-[10px]"
            >
              B. Dhananjay / Independent Developer
            </motion.div>

            {/* TITLE — SplitText powered */}

            <h1 className="select-none font-semibold leading-[0.78] tracking-[-0.09em]">
              <span className="block text-[clamp(4rem,14vw,13rem)]">
                <SplitText
                  text="DHANANJAY"
                  variant="blur"
                  stagger={0.035}
                  delay={0.25}
                  duration={0.85}
                />
              </span>

              <span className="ml-[9vw] mt-3 block text-[clamp(2.8rem,8vw,8rem)] text-fog sm:mt-5">
                <SplitText
                  text="BUILDS."
                  variant="blur"
                  stagger={0.035}
                  delay={0.7}
                  duration={0.75}
                />
              </span>
            </h1>

            {/* Decorative line */}

            <motion.div
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.2,
                delay: 1.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute -bottom-7 left-0 h-px w-[65%] bg-gradient-to-r from-white/30 via-white/10 to-transparent"
            />

            {/* SUB CONTENT */}

            <motion.div
              style={{
                y: subtitleY,
                opacity: subtitleOpacity,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-14 flex max-w-3xl flex-col gap-7 pl-[9vw] sm:flex-row sm:items-end sm:gap-12"
            >
              <p className="max-w-xl text-sm leading-6 text-fog sm:text-base sm:leading-7">
                I build modern web applications, APIs and AI-powered
                experiences — turning ideas into products that are
                designed to ship.
              </p>

              <div className="flex max-w-xs flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 1.3 + index * 0.08,
                      duration: 0.45,
                    }}
                    className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-fog backdrop-blur-md"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* FLOATING VISUAL */}

          <motion.div
            style={{
              y: visualY,
              scale: visualScale,
              rotate: visualRotate,
              opacity: visualOpacity,
            }}
            initial={{
              opacity: 0,
              scale: 0.75,
              rotate: -8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              duration: 1.5,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="pointer-events-none absolute right-[4%] top-[54%] hidden w-[28vw] max-w-[440px] lg:block"
          >
            <div className="relative overflow-hidden rounded-card border border-white/10 bg-zinc-900/50 p-2 shadow-2xl shadow-black/70 backdrop-blur-xl">
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <img
                  src="/hero-visual.png"
                  alt="Developer workspace"
                  className="block w-full object-cover grayscale-[20%] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-white/[0.04]" />
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-5 -left-8 rounded-full border border-white/10 bg-ink/90 px-4 py-2.5 text-[9px] uppercase tracking-[0.18em] text-fog shadow-xl backdrop-blur-xl"
            >
              Ideas → Code → Product
            </motion.div>
          </motion.div>

          {/* SCROLL INDICATOR */}

          <motion.a
            href="#services"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.8 }}
            data-cursor="hover"
            className="absolute bottom-8 left-6 flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] text-zinc-600 transition-colors hover:text-zinc-300 sm:left-10 lg:left-16"
          >
            <span>Scroll to explore</span>
            <motion.span
              animate={{
                y: [0, 8, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-9 w-px bg-gradient-to-b from-zinc-400 to-transparent"
            />
          </motion.a>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.8 }}
            className="absolute bottom-8 right-6 hidden text-right text-[9px] uppercase tracking-[0.25em] text-zinc-700 sm:right-10 sm:block lg:right-16"
          >
            01 / Introduction
          </motion.div>

          <motion.div
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="pointer-events-none absolute right-6 top-1/2 hidden h-32 w-px bg-gradient-to-b from-purple-400/60 via-white/20 to-transparent lg:right-16 lg:block"
          />
        </div>
      </div>
    </section>
  );
}