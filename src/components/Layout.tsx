import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import AmbientBackground from "./AmbientBackground";
import Grain from "./Grain";
import Navbar from "./Navbar";
import { useTransition } from "../transition/useTransition";

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { play } = useTransition();
  const isHome = pathname === "/";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-white">
      <AmbientBackground />
      <Grain />
      <Navbar />

      <div className="relative z-10">
        <Outlet />
      </div>

      {/* Back-to-home pill — only shows on non-home routes */}
      <AnimatePresence>
        {!isHome && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            onClick={() => play(() => navigate("/"))}
            data-cursor="hover"
            className="fixed bottom-8 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/15 bg-ink/80 px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-white backdrop-blur-xl transition hover:border-white/40 hover:bg-white/5"
          >
            ← Home
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}