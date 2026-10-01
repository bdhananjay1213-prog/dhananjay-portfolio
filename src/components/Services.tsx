import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import {
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Reveal from "./motion/Reveal";
import Magnetic from "./motion/Magnetic";

// ============================================================
// ICONS
// ============================================================
function BrowserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 9h18" />
      <path d="M7 6.5h.01M10 6.5h.01M13 6.5h.01" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10">
      <path d="M9.5 4.5a3 3 0 0 0-5 2.2 3.2 3.2 0 0 0 .4 1.5A3.4 3.4 0 0 0 3 11.3a3.3 3.3 0 0 0 2 3.1 3 3 0 0 0 4.5 3.1V5.8a3 3 0 0 0 0-1.3Z" />
      <path d="M14.5 4.5a3 3 0 0 1 5 2.2 3.2 3.2 0 0 1-.4 1.5 3.4 3.4 0 0 1 1.9 3.1 3.3 3.3 0 0 1-2 3.1 3 3 0 0 1-4.5 3.1V5.8a3 3 0 0 1 0-1.3Z" />
      <path d="M9.5 9.5h2M12 7v10M14.5 9.5h-2M7 13h2M17 13h-2" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10">
      <rect x="4" y="4" width="16" height="6" rx="1.5" />
      <rect x="4" y="14" width="16" height="6" rx="1.5" />
      <path d="M8 7h.01M8 17h.01M12 7h5M12 17h5" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10">
      <path d="M14.5 4.5c2.4-1.5 4.7-1.5 5-1.5.1.3.1 2.6-1.4 5l-5.4 5.4-3.1-3.1 4.9-5.8Z" />
      <path d="m9.6 10.4-3.8.8-2.3 2.3-.8 4.6 4.6.8 2.3-2.3.8-3.8" />
      <circle cx="15.8" cy="7.2" r="1.2" />
    </svg>
  );
}

// ============================================================
// DATA
// ============================================================
type ServiceColor = "blue" | "purple" | "emerald" | "orange";

interface Service {
  number: string;
  title: string;
  short: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  color: ServiceColor;
  /** bento grid span (desktop) */
  span: string;
}

const services: Service[] = [
  {
    number: "01",
    title: "Web Development",
    short: "Interfaces that feel as good as they function.",
    description:
      "Modern web experiences built with clean interfaces, responsive layouts, smooth interactions, and a focus on performance.",
    tags: ["React", "TypeScript", "Tailwind"],
    icon: <BrowserIcon />,
    color: "blue",
    span: "lg:col-span-7 lg:row-span-2",
  },
  {
    number: "02",
    title: "AI Integration",
    short: "Turning AI capabilities into useful products.",
    description:
      "Practical AI features connected to real applications — from intelligent interfaces to API-powered workflows and automation.",
    tags: ["LLMs", "AI APIs", "Automation"],
    icon: <BrainIcon />,
    color: "purple",
    span: "lg:col-span-5 lg:row-span-2",
  },
  {
    number: "03",
    title: "Backend & APIs",
    short: "The systems working behind the interface.",
    description:
      "Application logic, APIs, databases, and backend systems designed to connect the experience with reliable functionality.",
    tags: ["Python", "FastAPI", "MySQL"],
    icon: <ServerIcon />,
    color: "emerald",
    span: "lg:col-span-5 lg:row-span-1",
  },
  {
    number: "04",
    title: "Deployment",
    short: "From localhost to something people can use.",
    description:
      "Taking projects from development to the web with version control, builds, hosting, and deployment workflows.",
    tags: ["GitHub", "Netlify", "Cloud"],
    icon: <RocketIcon />,
    color: "orange",
    span: "lg:col-span-7 lg:row-span-1",
  },
];

const ACCENT: Record<
  ServiceColor,
  {
    glow: string;
    border: string;
    borderHover: string;
    text: string;
    gradient: string;
    ring: string;
    bar: string;
  }
> = {
  blue: {
    glow: "rgba(96,165,250,0.5)",
    border: "border-blue-400/15",
    borderHover: "hover:border-blue-400/50",
    text: "text-blue-300",
    gradient: "from-blue-500/[0.16] via-blue-500/[0.03] to-transparent",
    ring: "hover:shadow-[0_0_100px_rgba(96,165,250,0.2)]",
    bar: "bg-blue-400",
  },
  purple: {
    glow: "rgba(192,132,252,0.55)",
    border: "border-purple-400/15",
    borderHover: "hover:border-purple-400/50",
    text: "text-purple-300",
    gradient: "from-purple-500/[0.16] via-purple-500/[0.03] to-transparent",
    ring: "hover:shadow-[0_0_100px_rgba(192,132,252,0.25)]",
    bar: "bg-purple-400",
  },
  emerald: {
    glow: "rgba(52,211,153,0.5)",
    border: "border-emerald-400/15",
    borderHover: "hover:border-emerald-400/50",
    text: "text-emerald-300",
    gradient: "from-emerald-500/[0.16] via-emerald-500/[0.03] to-transparent",
    ring: "hover:shadow-[0_0_100px_rgba(52,211,153,0.2)]",
    bar: "bg-emerald-400",
  },
  orange: {
    glow: "rgba(251,146,60,0.5)",
    border: "border-orange-400/15",
    borderHover: "hover:border-orange-400/50",
    text: "text-orange-300",
    gradient: "from-orange-500/[0.16] via-orange-500/[0.03] to-transparent",
    ring: "hover:shadow-[0_0_100px_rgba(251,146,60,0.2)]",
    bar: "bg-orange-400",
  },
};

// ============================================================
// BENTO TILE — one service
// ============================================================
function BentoTile({
  service,
  index,
  reduced,
}: {
  service: Service;
  index: number;
  reduced: boolean;
}) {
  const a = ACCENT[service.color];
  const tileRef = useRef<HTMLDivElement>(null);

  // Gentle scroll parallax per tile — each one drifts at its own rate.
  // Small numbers keep it subtle; larger numbers would feel seasick.
  const { scrollYProgress } = useScroll({
    target: tileRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.5,
  });

  const driftY = useTransform(
    smooth,
    [0, 1],
    reduced ? [0, 0] : [20, -20],
  );

  const contentY = useTransform(
    smooth,
    [0, 1],
    reduced ? [0, 0] : [10, -10],
  );

  return (
    <Reveal
      delay={0.05 + index * 0.08}
      distance={50}
      className={service.span}
    >
      <motion.div
        ref={tileRef}
        style={{ y: driftY }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        data-cursor="hover"
        className={`group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[2rem] border bg-white/[0.02] p-8 transition-all duration-500 sm:min-h-[360px] sm:p-10 ${a.border} ${a.borderHover} ${a.ring}`}
      >
        {/* Gradient wash */}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${a.gradient} opacity-70 transition-opacity duration-700 group-hover:opacity-100`}
        />

        {/* Fine grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Ambient orb — idle pulse */}
        <motion.div
          animate={
            reduced
              ? {}
              : {
                  scale: [1, 1.25, 1],
                  opacity: [0.25, 0.5, 0.25],
                }
          }
          transition={
            reduced
              ? {}
              : {
                  duration: 6 + index * 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full blur-[90px]"
          style={{ background: a.glow }}
        />

        {/* Content wrapper — parallax on scroll */}
        <motion.div
          style={{ y: contentY }}
          className="relative flex h-full flex-col"
        >
          {/* Top row: number + corner ticks */}
          <div className="flex items-start justify-between">
            <span
              className={`font-mono text-[10px] tracking-[0.35em] ${a.text}`}
            >
              {service.number}
            </span>
            <div className="flex gap-1 opacity-40 transition-opacity duration-500 group-hover:opacity-100">
              <span className="h-2 w-2 border-r border-t border-white/40" />
              <span className="h-2 w-2 border-l border-t border-white/40" />
            </div>
          </div>

          {/* Icon — idles with subtle rotation */}
          <motion.div
            animate={
              reduced
                ? {}
                : {
                    rotate: [0, -3, 0, 3, 0],
                    y: [0, -3, 0],
                  }
            }
            transition={
              reduced
                ? {}
                : {
                    duration: 9 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            className="mt-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl transition-transform duration-500 group-hover:scale-105"
            style={{ boxShadow: `0 0 60px ${a.glow}` }}
          >
            <span className={a.text}>{service.icon}</span>
          </motion.div>

          {/* Bottom block */}
          <div className="mt-auto pt-10">
            <h3 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white">
              {service.title}
            </h3>

            <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-300">
              {service.short}
            </p>

            <p className="mt-3 max-w-lg text-xs leading-6 text-zinc-500">
              {service.description}
            </p>

            {/* Tags — brighten on hover */}
            <div className="mt-6 flex flex-wrap gap-2 opacity-70 transition-opacity duration-500 group-hover:opacity-100">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] backdrop-blur-md ${a.text}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Underline grows in on scroll, then glows on hover */}
            <div className="mt-6 h-px w-full bg-white/[0.06] overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: 0.35 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`h-full origin-left ${a.bar}`}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Reveal>
  );
}

// ============================================================
// SERVICES SECTION
// ============================================================
export default function Services() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      id="services"
      className="relative bg-ink px-6 pb-24 text-white sm:px-10 lg:px-16"
    >
      {/* Ambient grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:80px_80px]" />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        {/* Header */}
        <Reveal delay={0.05} distance={30}>
          <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.4em] text-purple-300">
                  02 / What I Build
                </span>
                <span className="h-px w-16 bg-purple-400/30" />
              </div>

              <h2 className="max-w-4xl text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.85] tracking-[-0.075em]">
                Turning ideas
                <span className="block text-zinc-600">
                  into products.
                </span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-fog lg:pb-2">
              Four disciplines, one outcome. Everything I do, on the
              table.
            </p>
          </div>
        </Reveal>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12 lg:auto-rows-[minmax(280px,auto)]">
          {services.map((service, i) => (
            <BentoTile
              key={service.number}
              service={service}
              index={i}
              reduced={reduced}
            />
          ))}
        </div>

        {/* Footer strip */}
        <Reveal delay={0.15} distance={30} className="mt-14">
          <div className="flex flex-col justify-between gap-6 border-t border-white/[0.06] pt-7 sm:flex-row sm:items-center">
            <p className="max-w-2xl text-sm leading-6 text-zinc-500">
              Four disciplines, one outcome — digital products that
              are designed, built, and shipped with intent.
            </p>

            <Magnetic strength={0.3}>
              <a
                href="#contact"
                data-cursor="hover"
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[10px] uppercase tracking-[0.25em] text-zinc-300 backdrop-blur-xl transition hover:border-white/30 hover:text-white"
              >
                Start a project
                <span>→</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}