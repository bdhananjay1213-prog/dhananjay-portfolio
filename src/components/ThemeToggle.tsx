import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, setThemeWithTransition } = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const origin = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    const next = theme === "dark" ? "light" : "dark";
    setThemeWithTransition(next, origin);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      data-cursor="hover"
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 backdrop-blur-xl transition hover:border-white/30 hover:text-white"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="h-4 w-4"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </motion.span>
        ) : (
          <motion.span
            key="torch"
            initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="h-4 w-4"
            >
              <path d="M9 11h6v9a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-9z" />
              <path d="M12 2c-1.5 2-2 3.5-2 5a2 2 0 1 0 4 0c0-1.5-.5-3-2-5z" />
              <path d="M9 15h6" />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}