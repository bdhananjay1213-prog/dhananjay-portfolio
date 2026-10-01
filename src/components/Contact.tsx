import { motion } from "motion/react";
import Reveal from "./motion/Reveal";
import Magnetic from "./motion/Magnetic";

function CornerBrackets() {
  return (
    <>
      <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-white/0 transition-all duration-300 group-hover:border-white/40" />
      <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-white/0 transition-all duration-300 group-hover:border-white/40" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/0 transition-all duration-300 group-hover:border-white/40" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/0 transition-all duration-300 group-hover:border-white/40" />
    </>
  );
}

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-zinc-800 bg-ink px-6 py-32 text-white"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:80px_80px]" />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <Reveal delay={0.05} distance={50}>
          <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/30 px-6 py-20 text-center sm:px-12 sm:py-28">
            <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2"
            >
              <motion.span
                animate={{
                  opacity: [1, 0.4, 1],
                  scale: [1, 0.8, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"
              />
              <span className="text-xs uppercase tracking-[0.2em] text-emerald-400/80">
                Available for freelance work
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative mx-auto max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl"
            >
              Have an idea?
              <span className="block bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
                Let's build it.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="relative mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-500 sm:text-xl"
            >
              Need a website, web application, backend API, or AI-powered
              solution? Tell me what you're working on and let's turn the
              idea into something real.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="relative mt-10"
            >
              <Magnetic strength={0.35}>
                <motion.a
                  href="mailto:b.dhananjay1213@gmail.com"
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  data-cursor="hover"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-zinc-950 shadow-2xl shadow-white/10"
                >
                  Start a conversation
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    ↗
                  </motion.span>
                </motion.a>
              </Magnetic>
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.2} distance={30} className="mt-8 grid gap-4 sm:grid-cols-2">
          <motion.a
            href="mailto:b.dhananjay1213@gmail.com"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            data-cursor="hover"
            className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6 transition-colors duration-300 hover:border-zinc-600 hover:bg-zinc-900/50"
          >
            <CornerBrackets />
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                  Email
                </span>
                <span className="text-zinc-600 transition-colors group-hover:text-white">
                  ↗
                </span>
              </div>
              <p className="mt-5 text-xl font-semibold text-zinc-200">
                Let's talk about your idea.
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                Have a project in mind? Send me a message.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-ink px-4 py-2.5 text-sm font-medium text-zinc-300 transition-all duration-300 group-hover:border-zinc-500 group-hover:bg-white group-hover:text-zinc-950">
                Send me an email
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  →
                </motion.span>
              </div>
            </div>
          </motion.a>

          <motion.a
            href="https://github.com/dhanjz1213-max/dhananjay-dev"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            data-cursor="hover"
            className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6 transition-colors duration-300 hover:border-zinc-600 hover:bg-zinc-900/50"
          >
            <CornerBrackets />
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                  GitHub
                </span>
                <span className="text-zinc-600 transition-colors group-hover:text-white">
                  ↗
                </span>
              </div>
              <p className="mt-5 text-xl font-semibold text-zinc-200">
                See what I'm building.
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                Explore my projects and development work.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-ink px-4 py-2.5 text-sm font-medium text-zinc-300 transition-all duration-300 group-hover:border-zinc-500 group-hover:bg-white group-hover:text-zinc-950">
                View GitHub
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.2,
                  }}
                >
                  →
                </motion.span>
              </div>
            </div>
          </motion.a>
        </Reveal>

        {/* Big signature footer */}
        <Reveal delay={0.15} distance={30} className="mt-24">
          <div className="border-t border-zinc-900 pt-12">
            <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-700">
                  Dhananjay · Independent Developer
                </p>
                <h3 className="mt-4 text-4xl font-semibold leading-[0.9] tracking-[-0.05em] text-zinc-300 sm:text-6xl">
                  Made with
                  <span className="text-zinc-600"> intent.</span>
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-zinc-700">
                <a
                  href="mailto:b.dhananjay1213@gmail.com"
                  data-cursor="hover"
                  className="transition hover:text-zinc-300"
                >
                  Email
                </a>
                <span className="h-3 w-px bg-zinc-800" />
                <a
                  href="https://github.com/dhanjz1213-max/dhananjay-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="transition hover:text-zinc-300"
                >
                  GitHub
                </a>
                <span className="h-3 w-px bg-zinc-800" />
                <a
                  href="#home"
                  data-cursor="hover"
                  className="transition hover:text-zinc-300"
                >
                  ↑ Top
                </a>
              </div>
            </div>

            <div className="mt-12 flex flex-col justify-between gap-3 text-xs text-zinc-600 sm:flex-row sm:items-center">
              <p>© {year} Dhananjay. All rights reserved.</p>
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Available for freelance work</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}