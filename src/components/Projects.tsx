import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { useTransition } from "../transition/useTransition";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function Projects() {
  const navigate = useNavigate();
  const { play } = useTransition();
  const navigatingRef = useRef(false);

  const handleExplore = () => {
    if (navigatingRef.current) return;
    navigatingRef.current = true;

    play(() => {
      navigate("/projects");
      // allow future clicks after animation completes
      setTimeout(() => {
        navigatingRef.current = false;
      }, 1500);
    });
  };

  return (
    <section
      id="projects"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-6 text-white"
    >
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.14, 0.22, 0.14],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[42vw] w-[42vw] min-h-[400px] min-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.08] blur-[130px]"
      />

      <motion.div
        animate={{
          x: [0, 80, -50, 0],
          y: [0, -40, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-purple-500/[0.035] blur-[130px]"
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(9,9,11,0.9)_100%)]" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
        <ScrollReveal delay={0.1} distance={40}>
          <div className="mb-8 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-blue-400/50" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-600">
              Selected Work
            </span>
            <span className="h-px w-8 bg-blue-400/50" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2} distance={60}>
          <h2 className="max-w-5xl text-[clamp(4rem,11vw,10rem)] font-semibold leading-[0.8] tracking-[-0.09em]">
            <span className="block">THINGS</span>
            <span className="block text-zinc-600">I'VE BUILT.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.35} distance={40}>
          <p className="mt-10 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base">
            Interfaces, experiments, products, and ideas brought from
            concept to something you can actually experience.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.5} distance={30}>
          <motion.button
            type="button"
            onClick={handleExplore}
            whileHover="hover"
            whileTap={{ scale: 0.96 }}
            data-cursor="hover"
            className="group relative mt-12 overflow-hidden rounded-full border border-white/10 bg-white/[0.035] px-8 py-4 backdrop-blur-xl"
          >
            <motion.span
              variants={{ hover: { opacity: 1 } }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none absolute inset-0 rounded-full bg-white/[0.025]"
            />
            <span className="relative flex items-center gap-4">
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-300">
                Explore Projects
              </span>
              <motion.span
                variants={{ hover: { x: 5 } }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300"
              >
                <ArrowIcon />
              </motion.span>
            </span>
          </motion.button>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.25, 0.65, 0.25],
            y: [0, 7, 0],
          }}
          transition={{
            opacity: { duration: 2.5, repeat: Infinity },
            y: { duration: 2.5, repeat: Infinity },
          }}
          className="mt-20 flex flex-col items-center gap-3"
        >
          <span className="text-[8px] uppercase tracking-[0.35em] text-zinc-700">
            Explore
          </span>
          <span className="h-10 w-px bg-gradient-to-b from-zinc-600 to-transparent" />
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-6 text-[9px] uppercase tracking-[0.25em] text-zinc-800 sm:left-10 lg:left-16">
        03 / Selected Work
      </div>
      <div className="absolute bottom-8 right-6 hidden text-right text-[9px] uppercase tracking-[0.25em] text-zinc-800 sm:right-10 sm:block lg:right-16">
        Interactive Archive
      </div>
    </section>
  );
}

export default Projects;