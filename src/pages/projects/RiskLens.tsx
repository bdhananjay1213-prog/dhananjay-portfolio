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
  { label: "Type", value: "Security / AI" },
  { label: "Stack", value: "Python · FastAPI · React · AI" },
];

const APPROACH = [
  {
    number: "01",
    title: "Frame the problem",
    body: "Most security tools overwhelm you with alerts after damage is done. RiskLens flips the model: surface threats before they become incidents — and explain them in plain language.",
  },
  {
    number: "02",
    title: "Build the intelligence layer",
    body: "A pipeline that ingests signals, scores them by likelihood and impact, and translates findings into a single prioritised feed. No more tab-hopping between scanners.",
  },
  {
    number: "03",
    title: "Design for clarity",
    body: "Security dashboards usually look like terminal windows. We designed one that reads like a briefing — clean hierarchy, colour-coded risk bands, quiet motion that highlights what matters.",
  },
  {
    number: "04",
    title: "Ship and iterate",
    body: "Deployed on a live environment with real data flows. The current build focuses on surfacing, scoring, and explaining threats — with room to grow into automated remediation.",
  },
];

const STACK = [
  { label: "Frontend", value: "React · TypeScript · Tailwind" },
  { label: "Backend", value: "Python · FastAPI" },
  { label: "Intelligence", value: "LLM-powered threat scoring" },
  { label: "Data", value: "MySQL · REST APIs" },
];

export default function RiskLens() {
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
        {/* Amber/emerald atmosphere — different from GodsOwnRoute's green */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(251,146,60,0.12),transparent_35%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(52,211,153,0.08),transparent_40%)]" />
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

        {/* Background visual — abstract, no image needed */}
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0"
        >
          {/* Big concentric rings behind the title */}
          <div className="absolute right-[-15%] top-1/2 h-[70vw] w-[70vw] -translate-y-1/2">
            <div className="absolute inset-0 rounded-full border border-white/[0.05]" />
            <div className="absolute inset-[15%] rounded-full border border-white/[0.06]" />
            <div className="absolute inset-[30%] rounded-full border border-white/[0.07]" />
            <div className="absolute inset-[45%] rounded-full border border-white/[0.08]" />
            <div className="absolute inset-[60%] rounded-full bg-orange-500/[0.06] blur-[100px]" />
          </div>

          {/* Sweeping scan line */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute right-[-15%] top-1/2 h-[70vw] w-[70vw] -translate-y-1/2"
          >
            <div className="absolute left-1/2 top-0 h-[35vw] w-px origin-bottom bg-gradient-to-b from-transparent via-orange-400/25 to-transparent" />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
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
              <span className="h-px w-12 bg-orange-400/50" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">
                02 / Selected Work
              </span>
            </div>

            <h1 className="max-w-5xl text-[clamp(4rem,11vw,11rem)] font-semibold leading-[0.78] tracking-[-0.09em]">
              RiskLens
            </h1>

            <p className="mt-10 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
              Threat intelligence before the damage. A security dashboard
              that reads like a briefing, not a log file.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {["Python", "FastAPI", "React", "AI", "Security"].map((tag) => (
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
                href="#"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                data-cursor="hover"
                className="rounded-full bg-white px-6 py-3 text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-950"
              >
                Coming Soon
              </motion.a>

              <motion.a
                href="https://github.com/dhanjz1213-max/dhananjay-dev"
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
          <span>RiskLens</span>
          <span>02 / 02</span>
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
                  <span className="h-px w-8 bg-orange-400/50" />
                  <span className="text-[9px] uppercase tracking-[0.35em] text-zinc-600">
                    Overview
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} distance={40}>
              <div>
                <p className="text-2xl font-medium leading-tight tracking-tight text-zinc-200 sm:text-3xl">
                  Security tools tell you what happened. RiskLens tries
                  to tell you what's about to.
                </p>
                <p className="mt-8 text-base leading-7 text-zinc-500">
                  Most security dashboards are built for analysts —
                  walls of logs, cryptic identifiers, alerts that fire
                  after the damage. RiskLens was built around a
                  different question: what if the interface itself did
                  the prioritising?
                </p>
                <p className="mt-4 text-base leading-7 text-zinc-500">
                  The result is a live threat feed that scores signals
                  by likelihood and impact, surfaces the highest-risk
                  items first, and explains each one in plain language
                  — powered by an LLM layer that reads the noise for
                  you.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          ABSTRACT PREVIEW (no screenshot, just a stylised frame)
      ========================================================== */}
      <section className="relative px-6 pb-24 sm:px-10 lg:px-16">
        <Reveal delay={0.1} distance={40}>
          <div className="mx-auto max-w-[1500px]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-card border border-white/[0.08] bg-zinc-950 shadow-2xl shadow-black/50">
              {/* Grid */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Ambient glow */}
              <div className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.08] blur-[120px]" />
              <div className="absolute right-[10%] top-[20%] h-[30%] w-[30%] rounded-full bg-emerald-500/[0.06] blur-[100px]" />

              {/* Radar rings */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20 + i * 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3,
                  }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]"
                  style={{
                    width: `${30 + i * 15}%`,
                    height: `${30 + i * 15}%`,
                  }}
                />
              ))}

              {/* Center dot */}
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300 shadow-[0_0_40px_rgba(251,146,60,0.9)]" />

              {/* Fake threat list — right side */}
              <div className="absolute right-8 top-8 w-[38%] space-y-2">
                {[
                  { level: "high", label: "Unusual auth pattern", color: "text-orange-300 border-orange-400/30 bg-orange-500/[0.08]" },
                  { level: "med", label: "Stale credential", color: "text-amber-300 border-amber-400/25 bg-amber-500/[0.06]" },
                  { level: "low", label: "Rate spike detected", color: "text-emerald-300 border-emerald-400/25 bg-emerald-500/[0.06]" },
                  { level: "low", label: "New device access", color: "text-emerald-300 border-emerald-400/25 bg-emerald-500/[0.06]" },
                ].map((row, i) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-[10px] uppercase tracking-[0.2em] backdrop-blur-md ${row.color}`}
                  >
                    <span>{row.label}</span>
                    <span className="opacity-60">{row.level}</span>
                  </motion.div>
                ))}
              </div>

              {/* Fake metric — left side */}
              <div className="absolute bottom-8 left-8">
                <div className="text-[9px] uppercase tracking-[0.35em] text-zinc-600">
                  Risk score
                </div>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-[clamp(3rem,6vw,5rem)] font-semibold leading-none tracking-[-0.05em] text-white">
                    24
                  </span>
                  <span className="text-xs text-emerald-300">▼ low</span>
                </div>
              </div>

              {/* Corner ticks */}
              <span className="pointer-events-none absolute left-4 top-4 h-3 w-3 border-l border-t border-white/20" />
              <span className="pointer-events-none absolute right-4 top-4 h-3 w-3 border-r border-t border-white/20" />
              <span className="pointer-events-none absolute bottom-4 left-4 h-3 w-3 border-b border-l border-white/20" />
              <span className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 border-b border-r border-white/20" />
            </div>

            <p className="mt-5 text-center text-xs leading-6 text-zinc-600">
              Stylised preview — the full dashboard is in private beta.
            </p>
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
                <span className="h-px w-8 bg-orange-400/50" />
                <span className="text-[9px] uppercase tracking-[0.35em] text-zinc-600">
                  Approach
                </span>
              </div>
              <h2 className="mt-6 max-w-3xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
                Four phases,
                <span className="block text-zinc-600">
                  one clear intention.
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
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-700 transition group-hover:bg-orange-400 group-hover:shadow-[0_0_12px_rgba(251,146,60,0.7)]" />
                  </div>
                  <h3 className="mt-12 text-2xl font-semibold text-zinc-200 sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-zinc-500">
                    {item.body}
                  </p>
                  <div className="mt-8 h-px w-0 bg-orange-400/40 transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          STACK
      ========================================================== */}
      <section className="relative border-t border-white/[0.06] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <Reveal delay={0.05} distance={30}>
            <div className="mb-14">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-orange-400/50" />
                <span className="text-[9px] uppercase tracking-[0.35em] text-zinc-600">
                  Stack
                </span>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STACK.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} distance={25}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                  <div className="text-[9px] uppercase tracking-[0.35em] text-zinc-600">
                    {s.label}
                  </div>
                  <div className="mt-3 text-sm text-zinc-300">{s.value}</div>
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
                  <span className="h-px w-8 bg-orange-400/50" />
                  <span className="text-[9px] uppercase tracking-[0.35em] text-zinc-600">
                    Status
                  </span>
                </div>
                <h2 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
                  In development.
                  <span className="block text-zinc-600">Shipping soon.</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1} distance={40}>
              <div>
                <p className="text-base leading-7 text-zinc-500">
                  The core pipeline, scoring engine, and dashboard are
                  live on a private build. Public release is next — if
                  you'd like early access, get in touch.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <motion.a
                    href="mailto:hello@dhananjay.dev"
                    whileHover={{ scale: 1.04, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    data-cursor="hover"
                    className="rounded-full bg-white px-6 py-3 text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-950"
                  >
                    Request Access
                  </motion.a>

                  <motion.a
                    href="https://github.com/dhanjz1213-max/dhananjay-dev"
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
          FOOTER CTA — back to archive
      ========================================================== */}
      <section className="relative border-t border-white/[0.06] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1500px] text-center">
          <Reveal delay={0.05} distance={30}>
            <div className="text-[9px] uppercase tracking-[0.4em] text-zinc-600">
              Next
            </div>
            <h3 className="mt-6 text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.85] tracking-[-0.07em]">
              Back to the
              <span className="text-zinc-600"> archive.</span>
            </h3>
            <button
              type="button"
              onClick={() => play(() => navigate("/projects"))}
              data-cursor="hover"
              className="mt-10 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-[10px] uppercase tracking-[0.3em] text-zinc-300 backdrop-blur-xl transition hover:border-white/40 hover:text-white"
            >
              ← All Projects
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}