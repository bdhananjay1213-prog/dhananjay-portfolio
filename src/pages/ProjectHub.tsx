import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTransition } from "../transition/useTransition";

const projects = [
  {
    number: "01",
    title: "GodsOwnRoute",
    category: "Travel / Web Experience",
    description:
      "A Kerala tourism experience built from idea to deployment.",
    image: "/godsownroute.png",
    links: {
      live: "https://godsownroute.netlify.app/",
      github: "https://github.com/bdhananjay1213-prog/GodsOwnRoute",
    },
  },
  {
  number: "02",
  title: "RiskLens",
  category: "Security / AI",
  description: "Threat intelligence before the damage.",
  image: null,
  links: {
    live: "/projects/risklens",
    github: "https://github.com/bdhananjay1213-prog/RiskLens",
  },
},
];

type Project = (typeof projects)[number];

function ProjectScene({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.4,
  });

  const imageScale = useTransform(progress, [0, 0.5, 1], [1.16, 1, 1.12]);
  const imageY = useTransform(progress, [0, 1], ["-4%", "4%"]);
  const contentY = useTransform(progress, [0, 0.5, 1], [70, 0, -70]);
  const contentOpacity = useTransform(
    progress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
  );
  const numberX = useTransform(
    progress,
    [0, 1],
    [index === 0 ? -80 : 80, 0],
  );

  const hasLinks = project.links !== null;

  // ============================================================
  // CARD MOTION — Z + drift + opacity + blur
  // ============================================================
  const cardZ = useMotionValue(0);
  const cardDriftX = useMotionValue(0);
  const cardDriftY = useMotionValue(0);
  const cardOpacity = useMotionValue(1);
  const cardBlur = useMotionValue(0);

  const smoothCardZ = useSpring(cardZ, {
    stiffness: 110,
    damping: 26,
    mass: 0.7,
  });
  const smoothCardDriftX = useSpring(cardDriftX, {
    stiffness: 110,
    damping: 26,
    mass: 0.7,
  });
  const smoothCardDriftY = useSpring(cardDriftY, {
    stiffness: 110,
    damping: 26,
    mass: 0.7,
  });
  const smoothCardOpacity = useSpring(cardOpacity, {
    stiffness: 100,
    damping: 24,
  });
  const smoothCardBlur = useSpring(cardBlur, {
    stiffness: 100,
    damping: 22,
  });

  const cardBlurFilter = useTransform(smoothCardBlur, (v) => `blur(${v}px)`);

  // ============================================================
  // INTERIOR MOTION
  // ============================================================
  const interiorZ = useMotionValue(-400);
  const interiorDriftX = useMotionValue(0);
  const interiorDriftY = useMotionValue(0);
  const interiorOpacity = useMotionValue(0);
  const interiorBlur = useMotionValue(12);

  const smoothInteriorZ = useSpring(interiorZ, {
    stiffness: 90,
    damping: 24,
    mass: 0.9,
  });
  const smoothInteriorDriftX = useSpring(interiorDriftX, {
    stiffness: 90,
    damping: 24,
    mass: 0.9,
  });
  const smoothInteriorDriftY = useSpring(interiorDriftY, {
    stiffness: 90,
    damping: 24,
    mass: 0.9,
  });
  const smoothInteriorOpacity = useSpring(interiorOpacity, {
    stiffness: 100,
    damping: 24,
  });
  const smoothInteriorBlur = useSpring(interiorBlur, {
    stiffness: 100,
    damping: 22,
  });

  const interiorBlurFilter = useTransform(
    smoothInteriorBlur,
    (v) => `blur(${v}px)`,
  );

  // ============================================================
  // VIGNETTE
  // ============================================================
  const vignette = useMotionValue(0);
  const smoothVignette = useSpring(vignette, {
    stiffness: 90,
    damping: 24,
  });

  // Scroll lock while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // OPEN
  const handleOpen = () => {
    if (open || !hasLinks) return;

    try {
      audioRef.current?.play();
    } catch {}

    cardZ.set(-350);
    cardDriftX.set(-40);
    cardDriftY.set(30);
    cardOpacity.set(0);
    cardBlur.set(10);

    interiorZ.set(80);
    interiorDriftX.set(40);
    interiorDriftY.set(-30);
    interiorOpacity.set(1);
    interiorBlur.set(0);

    setTimeout(() => {
      interiorZ.set(0);
      interiorDriftX.set(0);
      interiorDriftY.set(0);
    }, 260);

    setTimeout(() => vignette.set(0.6), 120);
    setTimeout(() => vignette.set(0), 480);

    setOpen(true);
  };

  // CLOSE
  const handleClose = () => {
    if (!open) return;

    try {
      audioRef.current?.play();
    } catch {}

    interiorZ.set(-400);
    interiorDriftX.set(40);
    interiorDriftY.set(-30);
    interiorOpacity.set(0);
    interiorBlur.set(12);

    cardZ.set(0);
    cardDriftX.set(0);
    cardDriftY.set(0);
    cardOpacity.set(1);
    cardBlur.set(0);

    setTimeout(() => vignette.set(0.5), 120);
    setTimeout(() => vignette.set(0), 480);

    setOpen(false);
  };

  return (
    <section
      ref={sceneRef}
      className="relative h-[160vh] px-6 sm:px-10 lg:px-16"
    >
      <audio ref={audioRef} src="/whoosh.mp3" preload="auto" />

      <div className="sticky top-0 flex h-screen items-center">
        <div
          className="relative mx-auto h-[76vh] w-full max-w-[1500px]"
          style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
        >
          {/* INTERIOR */}
          <motion.div
            style={{
              z: smoothInteriorZ,
              x: smoothInteriorDriftX,
              y: smoothInteriorDriftY,
              opacity: smoothInteriorOpacity,
              filter: interiorBlurFilter,
              transformStyle: "preserve-3d",
              willChange: "transform, opacity, filter",
              pointerEvents: open ? "auto" : "none",
            }}
            className="absolute inset-0 flex overflow-hidden rounded-card border border-white/10 bg-zinc-950 shadow-2xl shadow-black/60"
          >
            {/* LEFT — GitHub */}
            <a
              href={project.links?.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="group relative flex flex-1 flex-col justify-between overflow-hidden border-r border-white/10 p-8 sm:p-12"
            >
              <div className="pointer-events-none absolute -left-20 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-white/[0.03] blur-[120px] transition-all duration-700 group-hover:bg-white/[0.07]" />

              <div className="relative z-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-zinc-600">
                <span className="h-px w-10 bg-white/20" />
                <span>Source Code</span>
              </div>

              <div className="relative z-10">
                <div className="text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.85] tracking-[-0.06em] text-white">
                  GITHUB
                </div>
                <div className="mt-5 max-w-xs text-sm leading-7 text-zinc-500">
                  Read the source. Fork it. Break it. Rebuild it.
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-zinc-500 transition-colors group-hover:text-white">
                <span>Open repository</span>
                <span className="text-2xl transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                  ↗
                </span>
              </div>
            </a>

            {/* RIGHT — Live */}
            <a
              href={project.links?.live}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="group relative flex flex-1 flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-700 via-purple-800 to-zinc-950 p-8 sm:p-12"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.10),transparent_50%)] opacity-70 transition-opacity group-hover:opacity-100" />

              <div className="relative z-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white/50">
                <span className="h-px w-10 bg-white/30" />
                <span>Live Experience</span>
              </div>

              <div className="relative z-10">
                <div className="text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.85] tracking-[-0.06em] text-white">
                  LIVE SITE
                </div>
                <div className="mt-5 max-w-xs text-sm leading-7 text-white/70">
                  The deployed build. Fast, real, and in production.
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/70 transition-colors group-hover:text-white">
                <span>Visit now</span>
                <span className="text-2xl transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                  ↗
                </span>
              </div>
            </a>

            {/* Close */}
            <button
              type="button"
              onClick={handleClose}
              data-cursor="hover"
              className={`absolute left-1/2 top-6 z-20 flex h-12 -translate-x-1/2 items-center gap-3 rounded-full border border-white/20 bg-black/40 px-6 text-[10px] uppercase tracking-[0.3em] text-white backdrop-blur-xl transition-all hover:border-white/60 hover:bg-white/10 sm:top-8 ${
                open ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              <span>← Back</span>
              <span className="text-xs text-white/60">ESC</span>
            </button>
          </motion.div>

          {/* CARD */}
          <motion.div
            style={{
              z: smoothCardZ,
              x: smoothCardDriftX,
              y: smoothCardDriftY,
              opacity: smoothCardOpacity,
              filter: cardBlurFilter,
              transformStyle: "preserve-3d",
              willChange: "transform, opacity, filter",
              pointerEvents: open ? "none" : "auto",
            }}
            className="relative h-full w-full"
          >
            <div className="relative h-full w-full overflow-visible rounded-card">
              <div className="absolute inset-0 overflow-hidden rounded-card border border-white/[0.08] bg-zinc-900/40 shadow-2xl shadow-black/40">
                {project.image ? (
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    style={{ scale: imageScale, y: imageY }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <motion.div
                    style={{ scale: imageScale }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(168,85,247,0.22),transparent_32%),radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.10),transparent_35%),#09090b]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative h-[38vw] w-[38vw] min-h-[280px] min-w-[280px] max-h-[520px] max-w-[520px]">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute inset-0 rounded-full border border-purple-400/10"
                        />
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{
                            duration: 13,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute inset-[15%] rounded-full border border-blue-400/10"
                        />
                        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-zinc-950/80 shadow-[0_0_80px_rgba(168,85,247,0.15)] backdrop-blur-xl" />
                        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50" />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/30 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-zinc-950/20" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(9,9,11,0.55)_100%)]" />
              </div>

              <motion.div
                style={{ x: numberX, opacity: contentOpacity }}
                className="pointer-events-none absolute right-8 top-8 z-10 text-[clamp(5rem,12vw,11rem)] font-semibold leading-none tracking-[-0.1em] text-white/[0.035] sm:right-12 lg:right-16"
              >
                {project.number}
              </motion.div>

              <motion.div
                style={{ y: contentY, opacity: contentOpacity }}
                className="pointer-events-none absolute bottom-10 left-8 z-20 sm:bottom-14 sm:left-12 lg:bottom-16 lg:left-16"
              >
                <div className="mb-5 flex items-center gap-4">
                  <span className="h-px w-10 bg-white/30" />
                  <span className="text-[9px] uppercase tracking-[0.35em] text-zinc-400">
                    {project.category}
                  </span>
                </div>

                <h2 className="text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-[0.78] tracking-[-0.08em]">
                  {project.title}
                </h2>

                <p className="mt-8 max-w-md text-sm leading-7 text-zinc-400 sm:text-base">
                  {project.description}
                </p>

                {hasLinks && (
                  <motion.button
                    type="button"
                    onClick={handleOpen}
                    whileTap={{ scale: 0.96 }}
                    data-cursor="hover"
                    className="pointer-events-auto relative z-30 mt-9 flex items-center gap-5 rounded-full border border-white/10 bg-zinc-950/70 px-7 py-4 text-[9px] uppercase tracking-[0.3em] text-zinc-300 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
                  >
                    <span>View Project</span>
                    <span className="text-base text-zinc-500">→</span>
                  </motion.button>
                )}
              </motion.div>

              <div className="pointer-events-none absolute bottom-8 right-8 z-20 text-[9px] uppercase tracking-[0.25em] text-white/30 sm:bottom-12 sm:right-12">
                {project.number} / 02
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* VIGNETTE */}
      <motion.div
        style={{ opacity: smoothVignette, pointerEvents: "none" }}
        className="pointer-events-none fixed inset-0 z-[90] bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(0,0,0,0.85)_100%)]"
      />
    </section>
  );
}

export default function ProjectsHub() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const navigate = useNavigate();
  const { play } = useTransition();

  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 22, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 22, mass: 0.5 });

  const ambientX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const ambientY = useTransform(smoothY, [-1, 1], [-15, 15]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    mouseX.set((event.clientX / window.innerWidth) * 2 - 1);
    mouseY.set((event.clientY / window.innerHeight) * 2 - 1);
  };

  return (
    <main
      onPointerMove={handlePointerMove}
      className="relative overflow-hidden bg-ink text-white"
    >
      {/* Back to Home pill */}
      <button
        type="button"
        onClick={() => play(() => navigate("/"))}
        data-cursor="hover"
        className="fixed left-6 top-6 z-40 flex items-center gap-2 rounded-full border border-white/10 bg-ink/70 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-zinc-300 backdrop-blur-xl transition hover:border-white/30 hover:text-white sm:left-10"
      >
        ← Home
      </button>

      <motion.div
        style={{ x: ambientX, y: ambientY }}
        className="pointer-events-none fixed inset-0 z-0"
      >
        <div className="absolute left-1/2 top-1/2 h-[55vw] w-[55vw] min-h-[500px] min-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.06] blur-[150px]" />
        <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/[0.045] blur-[140px]" />
      </motion.div>

      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      <section className="relative z-10 flex h-screen items-center px-6 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-[1500px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-blue-400/50" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-600">
                Selected Work
              </span>
            </div>

            <h1 className="font-semibold leading-[0.75] tracking-[-0.09em]">
              <span className="block text-[clamp(5rem,15vw,14rem)]">
                PROJECTS
              </span>
              <span className="mt-6 block pl-[8vw] text-[clamp(2rem,5vw,5rem)] text-zinc-700">
                IN MOTION.
              </span>
            </h1>

            <div className="mt-16 flex items-center gap-4 text-[8px] uppercase tracking-[0.35em] text-zinc-700">
              <span>Scroll</span>
              <span className="h-8 w-px bg-zinc-800" />
              <span>Enter the work</span>
            </div>
          </motion.div>
        </div>
      </section>

      {projects.map((project, index) => (
        <ProjectScene
          key={project.number}
          project={project}
          index={index}
        />
      ))}

      <section className="relative z-10 flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <div className="mb-6 text-[9px] uppercase tracking-[0.4em] text-zinc-700">
            End of Archive
          </div>
          <h2 className="text-[clamp(3rem,8vw,8rem)] font-semibold leading-none tracking-[-0.08em] text-zinc-800">
            MORE TO COME.
          </h2>
        </div>
      </section>
    </main>
  );
}