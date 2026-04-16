'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Particle = {
  left: number;
  top: number;
  duration: number;
  delay: number;
};

const Initializing = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const init = () => {
      // particles
      const generated = Array.from({ length: 20 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 4 + Math.random() * 6,
        delay: Math.random() * 2,
      }));
      setParticles(generated);

      // visit logic
      const hasVisited = localStorage.getItem("hasVisited");
      const isFirst = !hasVisited;

      const duration = isFirst ? 3000 : 800;

      setTimeout(() => {
        if (isFirst) {
          localStorage.setItem("hasVisited", "true");
        }
        setLoading(false);
      }, duration);
    };

    setTimeout(init, 0);
  }, []);

  if (loading) {
    return (
      <motion.div
        className="relative flex min-h-screen items-center justify-center overflow-hidden "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-cyan-400/40"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}
        </div>

        <div className="relative flex flex-col items-center space-y-8">
          <motion.div
            className="relative flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute h-28 w-28 rounded-full border-2 border-transparent border-t-cyan-400 border-r-purple-500 opacity-70 blur-[1px]" />
            <div className="absolute h-24 w-24 rounded-full border border-cyan-500/30" />
          </motion.div>

          <motion.div
            className="absolute flex items-center justify-center"
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <div className="h-20 w-20 rounded-full border-2 border-transparent border-b-purple-500 border-l-cyan-400 opacity-60 blur-[0.5px]" />
          </motion.div>

          <motion.div
            className="absolute h-14 w-14 rounded-full bg-linear-to-br from-cyan-400/20 to-purple-500/20"
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 10px rgba(0,255,255,0.3)",
                "0 0 30px rgba(0,255,255,0.6)",
                "0 0 10px rgba(0,255,255,0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <motion.p
            className="mt-32 text-xl font-mono tracking-[0.3em] text-cyan-300 uppercase"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Initializing system...
          </motion.p>

          <motion.div className="w-48 h-0.5 bg-gray-800/50 overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-linear-to-r from-cyan-400 to-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3 }}
            />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return <>{children}</>;
};

export default Initializing;