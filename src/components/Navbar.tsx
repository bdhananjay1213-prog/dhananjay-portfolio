import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import Magnetic from "./motion/Magnetic";
import ThemeToggle from "./ThemeToggle";

const links = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const { scrollY } = useScroll();

  useEffect(() => {
    let lastY = window.scrollY;
    return scrollY.on("change", (y) => {
      setScrolled(y > 40);
      const delta = y - lastY;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 200);
        lastY = y;
      }
    });
  }, [scrollY]);

  useEffect(() => {
    if (!isHome) return;

    const ids = ["home", "services", "projects", "about", "contact"];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-45% 0px -50% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  const closeMenu = () => setIsOpen(false);
  const linkHref = (href: string) => (isHome ? href : `/${href}`);

  return (
    <motion.nav
      initial={false}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-500 ${
        scrolled
          ? "border-b border-white/[0.06] bg-ink/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Magnetic strength={0.35}>
          <Link
            to="/"
            onClick={closeMenu}
            data-cursor="hover"
            className="text-lg font-bold tracking-tight text-white"
          >
            Dhananjay<span className="text-ghost">.</span>
          </Link>
        </Magnetic>

        <div className="hidden items-center gap-1 text-sm md:flex">
          {links.map((link) => {
            const isActive =
              isHome && activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={linkHref(link.href)}
                data-cursor="hover"
                className="group relative rounded-full px-4 py-2 text-fog transition-colors hover:text-white"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                    className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.05]"
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((o) => !o)}
            data-cursor="hover"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition hover:border-white/30 hover:text-white md:hidden"
          >
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : -3 }}
              className="absolute h-px w-4 bg-current"
            />
            <motion.span
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 3 }}
              className="absolute h-px w-4 bg-current"
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.83, 0, 0.17, 1] }}
            className="overflow-hidden border-t border-white/[0.06] bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col px-6 py-4">
              {links.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={linkHref(link.href)}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/[0.04] py-4 text-sm text-fog transition hover:text-white last:border-b-0"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}