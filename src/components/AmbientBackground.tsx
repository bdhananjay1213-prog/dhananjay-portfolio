import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

function AmbientBackground() {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const smoothX = useSpring(mouseX, {
    stiffness: 35,
    damping: 25,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 35,
    damping: 25,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-zinc-950"
    >
      {/* Base grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Mouse-following atmosphere */}
      <motion.div
        style={{
          left: `${smoothX}%`,
          top: `${smoothY}%`,
        }}
        className="absolute h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.07] blur-[100px]"
      />

      {/* Large drifting orb */}
      <motion.div
        animate={{
          x: [0, 100, -40, 0],
          y: [0, -70, 50, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-48 top-[10%] h-[600px] w-[600px] rounded-full bg-blue-500/[0.055] blur-[120px]"
      />

      {/* Second drifting orb */}
      <motion.div
        animate={{
          x: [0, -80, 50, 0],
          y: [0, 60, -50, 0],
          scale: [1, 0.9, 1.12, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-48 top-[42%] h-[650px] w-[650px] rounded-full bg-cyan-500/[0.04] blur-[130px]"
      />

      {/* Lower purple atmosphere */}
      <motion.div
        animate={{
          x: [0, 70, -30, 0],
          y: [0, -50, 40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-56 left-[25%] h-[600px] w-[600px] rounded-full bg-purple-500/[0.045] blur-[120px]"
      />

      {/* Fine radial atmosphere */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.035), transparent 35%), radial-gradient(circle at 20% 80%, rgba(139,92,246,0.025), transparent 30%), radial-gradient(circle at 85% 55%, rgba(34,211,238,0.02), transparent 30%)",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[
          ["12%", "22%", "2px", "0s", "8s"],
          ["24%", "68%", "1px", "2s", "10s"],
          ["42%", "34%", "2px", "1s", "9s"],
          ["58%", "76%", "1px", "4s", "11s"],
          ["71%", "20%", "2px", "3s", "8s"],
          ["84%", "62%", "1px", "5s", "12s"],
          ["91%", "35%", "2px", "1.5s", "10s"],
          ["34%", "88%", "1px", "3.5s", "9s"],
        ].map(([left, top, size, delay, duration], index) => (
          <motion.span
            key={index}
            animate={{
              opacity: [0.15, 0.55, 0.15],
              y: [0, -18, 0],
            }}
            transition={{
              duration: Number.parseFloat(duration),
              delay: Number.parseFloat(delay),
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-white"
            style={{
              left,
              top,
              width: size,
              height: size,
            }}
          />
        ))}
      </div>

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(9,9,11,0.35)_100%)]" />
    </div>
  );
}

export default AmbientBackground;