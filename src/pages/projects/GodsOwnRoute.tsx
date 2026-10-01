import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Reveal from "../../components/motion/Reveal";
import { useTransition } from "../../transition/useTransition";

const META = [
  { label: "Role", value: "Design & Development" },
  { label: "Year", value: "2025" },
  { label: "Type", value: "Web Experience" },
  { label: "Stack", value: "React · TypeScript · Netlify" },
];

const APPROACH = [
  {
    number: "01",
    title: "Map the journey",
    body: "Researched how travelers actually plan a Kerala trip — the routes, the detours, the questions they ask. Structured the site around the journey, not the destination list.",
  },
  {
    number: "02",
    title: "Design a travel-first layout",
    body: "Kept the visual language cinematic but the navigation linear. Every screen answers one question: where do I go next?",
  },
  {
    number: "03",
    title: "Build for speed",
    body: "Static build, minimal JS, no heavy dependencies. Everything loads fast enough that the site feels like a native app on mobile.",
  },
  {
    number: "04",
    title: "Ship, then refine",
    body: "Deployed early. Iterated on real feedback. Added details that matter — hover states, transitions, the small stuff.",
  },
];

export default function GodsOwnRoute() {
  const heroRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { play } = useTransition();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.4,
  });

  const imageY = useTransform(progress, [0, 1], [0, -120]);
  const imageScale = useTransform(progress, [0, 1], [1, 1.15]);
  const titleY = useTransform(progress, [0, 1], [0, -80]);
  const titleOpacity = useTransform(progress, [0, 0.7], [1, 0]);

  return (
    <main className="min-h-screen bg-ink text-white">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center overflow-hidden px-6 sm:px-10 lg:px-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(16,185,129,0.12),transparent_35%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(9,9,11,0.9)_100%)]" />

        {/* Back to projects pill */}
        <button
          type="button"
          onClick={() => play(() => navigate("/projects"))}
          data-cursor="hover"
          className="absolute left-6 top-6 z-40 flex items-center gap-2 rounded-full border border-white/10 bg-ink/70 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-zinc-300 backdrop-blur-xl transition hover:border-white/30 hover:text-white sm:left-10 lg:left-16"
        >
          ← Projects
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0"
        >
          <img
            src="/godsownroute.png"
            alt="GodsOwnRoute"
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/30" />
        </motion.div>

        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-10 mx-auto w-full max-w-[1500px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-emerald-400/50" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">
                01 / Selected Work
              </span>
            </div>

            <h1 className="max-w-5xl text-[clamp(4rem,11vw,11rem)] font-semibold leading-[0.78] tracking-[-0.09em]">
              GodsOwnRoute
            </h1>

            <p className="mt-10 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
              A Kerala tourism experience built from idea to deployment.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {["React", "TypeScript", "Web", "Netlify"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-zinc-500 backdrop-blur-xl"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <motion.a
                href="https://godsownroute.netlify.app/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                data-cursor="hover"
                className="rounded-full bg-white px-6 py-3 text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-950"
              >
                Visit Live Site ↗
              </motion.a>

              <motion.a
                href="https://github.com/bdhananjay1213-prog/GodsOwnRoute"
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                data-cursor="hover"
                className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-300 backdrop-blur-xl transition-colors hover:bg-white/[0.08]"
              >
                GitHub
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-6 right-6 flex justify-between text-[8px] uppercase tracking-[0.3em] text-zinc-700 sm:left-10 sm:right-10 lg:left-16 lg:right-16">
          <span>GodsOwnRoute</span>
          <span>01 / 02</span>
        </div>
      </section>

      {/* =========================================================
          META
      ========================================================== */}
      <section className="relative border-t border-white/[0.06] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {META.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08} distance={25}>
                <div>
                  <div className="text-[9px] uppercase tracking-[0.35em] text-zinc-600">
                    {m.label}
                  </div>
                  <div className="mt-3 text-sm text-zinc-300">{m.value}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          OVERVIEW
      ========================================================== */}
      <section className="relative px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[0.35fr_0.65fr] lg:gap-20">
            <Reveal delay={0.05} distance={30}>
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-emerald-400/50" />
                  <span className="text-[9px] uppercase tracking-[0.35em] text-zinc-600">
                    Overview
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} distance={40}>
              <div>
                <p className="text-2xl font-medium leading-tight tracking-tight text-zinc-200 sm:text-3xl">
                  A cinematic guide to God's Own Country — planned,
                  designed, and shipped end-to-end.
                </p>
                <p className="mt-8 text-base leading-7 text-zinc-500">
                  GodsOwnRoute started as a way to answer one question:
                  what if planning a Kerala trip felt as beautiful as
                  the trip itself? The result is a tourism experience
                  that pairs practical trip planning with a slow,
                  cinematic visual language.
                </p>
                <p className="mt-4 text-base leading-7 text-zinc-500">
                  I handled everything — from the initial concept, to
                  wireframes, to the React implementation, to
                  deployment on Netlify.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          FULL-WIDTH IMAGE
      ========================================================== */}
      <section className="relative px-6 pb-24 sm:px-10 lg:px-16">
        <Reveal delay={0.1} distance={40}>
          <div className="mx-auto max-w-[1500px]">
            <div className="relative overflow-hidden rounded-card border border-white/[0.08] shadow-2xl shadow-black/50">
              <img
                src="/godsownroute.png"
                alt="GodsOwnRoute preview"
                className="w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* =========================================================
          APPROACH
      ========================================================== */}
      <section className="relative border-t border-white/[0.06] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <Reveal delay={0.05} distance={30}>
            <div className="mb-16">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-emerald-400/50" />
                <span className="text-[9px] uppercase tracking-[0.35em] text-zinc-600">
                  Approach
                </span>
              </div>
              <h2 className="mt-6 max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
                Four phases,
                <span className="block text-zinc-600">
                  one continuous idea.
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-card border border-white/[0.08] bg-white/[0.06] md:grid-cols-2">
            {APPROACH.map((item, i) => (
              <Reveal key={item.number} delay={i * 0.08} distance={30}>
                <div className="group relative h-full bg-ink p-8 sm:p-12">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-700">
                      {item.number}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-700 transition group-hover:bg-emerald-400 group-hover:shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
                  </div>
                  <h3 className="mt-12 text-2xl font-semibold text-zinc-200 sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-zinc-500">
                    {item.body}
                  </p>
                  <div className="mt-8 h-px w-0 bg-emerald-400/40 transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          RESULT / CTA
      ========================================================== */}
      <section className="relative border-t border-white/[0.06] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[0.5fr_0.5fr] lg:items-center lg:gap-20">
            <Reveal delay={0.05} distance={30}>
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-emerald-400/50" />
                  <span className="text-[9px] uppercase tracking-[0.35em] text-zinc-600">
                    Result
                  </span>
                </div>
                <h2 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
                  Shipped.
                  <span className="block text-zinc-600">Live.</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1} distance={40}>
              <div>
                <p className="text-base leading-7 text-zinc-500">
                  The site is live on Netlify and open-source on
                  GitHub. It's fast, works on any device, and — most
                  importantly — is actually used by travelers planning
                  their trips.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <motion.a
                    href="https://godsownroute.netlify.app/"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.04, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    data-cursor="hover"
                    className="rounded-full bg-white px-6 py-3 text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-950"
                  >
                    Visit Live Site ↗
                  </motion.a>

                  <motion.a
                    href="https://github.com/bdhananjay1213-prog/GodsOwnRoute"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    data-cursor="hover"
                    className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-300 backdrop-blur-xl transition-colors hover:bg-white/[0.08]"
                  >
                    View Repository ↗
                  </motion.a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER CTA
      ========================================================== */}
      <section className="relative border-t border-white/[0.06] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1500px] text-center">
          <Reveal delay={0.05} distance={30}>
            <div className="text-[9px] uppercase tracking-[0.4em] text-zinc-600">
              Next
            </div>
            <h3 className="mt-6 text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.85] tracking-[-0.07em]">
              More
              <span className="text-zinc-600"> in motion.</span>
            </h3>
            <button
              type="button"
              onClick={() => play(() => navigate("/projects"))}
              data-cursor="hover"
              className="mt-10 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-[10px] uppercase tracking-[0.3em] text-zinc-300 backdrop-blur-xl transition hover:border-white/40 hover:text-white"
            >
              ← Back to Archive
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}