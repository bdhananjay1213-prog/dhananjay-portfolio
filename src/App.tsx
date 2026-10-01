import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { motion } from "motion/react";

import About from "./components/About";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Layout from "./components/Layout";
import Projects from "./components/Projects";
import SectionTransition from "./components/SectionTransition";
import Services from "./components/Services";
import GodsOwnRoute from "./pages/projects/GodsOwnRoute";
import RiskLens from "./pages/projects/RiskLens";
import ProjectsHub from "./pages/ProjectHub";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Lenis is active — use its API via window
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
}

function Home() {
  return (
    <>
      <Hero />

      <SectionTransition
        from="purple"
        number="02"
        label="What I Build"
        title="From Idea"
        subtitle="To Product."
      />

      <Services />

      <SectionTransition
        from="blue"
        number="03"
        label="Selected Work"
        title="Ideas"
        subtitle="In Motion."
      />

      <Projects />

      <SectionTransition
        from="cyan"
        number="04"
        label="The Person Behind It"
        title="More Than"
        subtitle="The Code."
      />

      <About />

      <SectionTransition
        from="purple"
        number="05"
        label="Start Something"
        title="Let's Build"
        subtitle="Together."
      />

      <Contact />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <motion.div
        key={window.location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsHub />} />
            <Route
              path="/projects/godsownroute"
              element={<GodsOwnRoute />}
            />
            <Route
              path="/projects/risklens"
              element={<RiskLens />}
            />
          </Route>
        </Routes>
      </motion.div>
    </BrowserRouter>
  );
}

export default App;