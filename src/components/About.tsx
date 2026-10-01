import {motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import ScrollReveal from "./ScrollReveal";  //used for scroll effect
import { useEffect } from "react";  //used for effect

const journey = [
  {
    number: "01",
    title: "Learn",
    description:
      "Understanding the fundamentals and constantly exploring new technologies.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "Turning ideas into real applications instead of leaving them as concepts.",
  },
  {
    number: "03",
    title: "Experiment",
    description:
      "Exploring AI, APIs, new tools, and different ways to solve problems.",
  },
  {
    number: "04",
    title: "Ship",
    description:
      "Taking projects from code on a machine to something people can actually use.",
  },
];

const technologies = [
  "React",
  "TypeScript",
  "Python",
  "FastAPI",
  "AI",
  "APIs",
  "Tailwind",
  "Git",
];

function About() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x =
        (event.clientX / window.innerWidth - 0.5) * 12;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 12;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-zinc-950 px-6 py-32 text-white"
    >
      {/* Atmospheric glow */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-64 top-1/4 h-[600px] w-[600px] rounded-full bg-purple-500/[0.045] blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-64 bottom-1/4 h-[550px] w-[550px] rounded-full bg-blue-500/[0.04] blur-[120px]"
      />

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section heading */}
        <ScrollReveal
          delay={0.1}
          distance={45}
          className="mb-20"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-purple-400/50" />

            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-600">
              About
            </span>
          </div>

          <h2 className="max-w-4xl text-4xl font-bold leading-[1] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
            The person
            <span className="block bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
              behind the code.
            </span>
          </h2>
        </ScrollReveal>

        {/* Main profile */}
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {/* Portrait */}
          <ScrollReveal
            delay={0.15}
            distance={70}
          >
            <div className="relative mx-auto w-full max-w-[520px]">
              {/* Outer glow */}
              <motion.div
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-8 rounded-[2rem] bg-purple-500/15 blur-[70px]"
              />

              {/* Decorative frame */}
              <motion.div
                style={{
                  x: smoothX,
                  y: smoothY,
                }}
                className="relative"
              >
                <div className="absolute -inset-3 rounded-[2.2rem] border border-white/[0.04]" />

                <div className="absolute -inset-6 rounded-[2.5rem] border border-purple-400/[0.05]" />

                {/* Image */}
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.92,
                    filter: "blur(12px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  viewport={{
                    once: false,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 shadow-2xl shadow-black/50"
                >
                  <img
                    src="/profile.jpg"
                    alt="Dhananjay"
                    className="h-full w-full object-cover object-center grayscale transition duration-700 hover:scale-[1.025] hover:grayscale-0"
                  />

                  {/* Cinematic overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-white/[0.03]" />

                  {/* Image shine */}
                  <motion.div
                    animate={{
                      x: ["-120%", "120%"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatDelay: 4,
                      ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute inset-y-0 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent blur-xl"
                  />
                </motion.div>

                {/* Floating identity badge */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -20,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                  }}
                  viewport={{
                    once: false,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.45,
                  }}
                  className="absolute -bottom-5 -left-5 rounded-2xl border border-zinc-800 bg-zinc-950/90 px-5 py-4 shadow-2xl backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />

                    <div>
                      <div className="text-sm font-medium text-white">
                        Dhananjay
                      </div>

                      <div className="mt-0.5 text-[10px] text-zinc-600">
                        Full-Stack Developer · AI Builder
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Corner label */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: false,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.65,
                  }}
                  className="absolute -right-4 top-8 rounded-xl border border-zinc-800 bg-zinc-950/85 px-3 py-2 backdrop-blur-xl"
                >
                  <div className="text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                    Currently
                  </div>

                  <div className="mt-1 text-xs text-zinc-300">
                    Building & Learning
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Bio */}
          <div>
            <ScrollReveal
              delay={0.2}
              distance={45}
            >
              <div className="max-w-2xl">
                <p className="text-xl leading-8 text-zinc-300 sm:text-2xl">
                  I’m a developer who enjoys turning ideas into
                  useful digital products.
                </p>

                <p className="mt-6 text-base leading-7 text-zinc-500">
                  I work across frontend, backend, APIs, and AI —
                  exploring how different technologies can come
                  together to create products that are actually
                  useful.
                </p>

                <p className="mt-4 text-base leading-7 text-zinc-500">
                  I learn by building, experiment constantly, and
                  try to take every project one step further than
                  where it started.
                </p>
              </div>
            </ScrollReveal>

            {/* Technologies */}
            <ScrollReveal
              delay={0.3}
              distance={35}
              className="mt-10"
            >
              <div className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-700">
                Toolkit
              </div>

              <div className="flex max-w-xl flex-wrap gap-2">
                {technologies.map((technology, index) => (
                  <motion.span
                    key={technology}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: false,
                      amount: 0.4,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + index * 0.05,
                    }}
                    whileHover={{
                      y: -3,
                    }}
                    className="rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-500 backdrop-blur-xl transition-colors hover:border-zinc-600 hover:text-white"
                  >
                    {technology}
                  </motion.span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Journey */}
        <div className="mt-32">
          <ScrollReveal
            delay={0.1}
            distance={45}
          >
            <div className="mb-12">
              <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-700">
                The journey
              </div>

              <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Building. Learning. Shipping.
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-900 md:grid-cols-2 lg:grid-cols-4">
            {journey.map((item, index) => (
              <ScrollReveal
                key={item.number}
                delay={index * 0.1}
                distance={40}
              >
                <motion.div
                  whileHover={{
                    y: -5,
                    backgroundColor: "rgba(24,24,27,0.85)",
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="group relative h-full bg-zinc-950/80 p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-700">
                      {item.number}
                    </span>

                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-700 transition group-hover:bg-purple-400 group-hover:shadow-[0_0_12px_rgba(192,132,252,0.7)]" />
                  </div>

                  <h4 className="mt-12 text-xl font-semibold text-zinc-200">
                    {item.title}
                  </h4>

                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    {item.description}
                  </p>

                  <div className="mt-8 h-px w-0 bg-purple-400/40 transition-all duration-500 group-hover:w-full" />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <ScrollReveal
          delay={0.15}
          distance={50}
          className="mt-28"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-zinc-900 bg-zinc-900/30 px-7 py-12 text-center backdrop-blur-xl sm:px-12 sm:py-16">
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.04] blur-3xl" />

            <div className="relative">
              <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">
                Philosophy
              </div>

              <p className="mx-auto mt-5 max-w-3xl text-2xl font-medium leading-tight tracking-tight text-zinc-300 sm:text-3xl lg:text-4xl">
                I don't just want to learn technology.
                <span className="block bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                  I want to build with it.
                </span>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default About;