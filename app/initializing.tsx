'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLoading } from "./lib/loading-context";

type Particle = {
  left: number;
  top: number;
  duration: number;
  delay: number;
};

const MIN_VISIBLE_MS = 500; // avoid a jarring flash on fast loads

const Initializing = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useLoading();
  const [showOverlay, setShowOverlay] = useState(true);
  const [shownAt, setShownAt] = useState<number | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 4 + Math.random() * 6,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  useEffect(() => {
    if (isLoading) {
      setShowOverlay(true);
      setShownAt(Date.now());
      return;
    }
    const elapsed = shownAt ? Date.now() - shownAt : MIN_VISIBLE_MS;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
    const t = setTimeout(() => setShowOverlay(false), remaining);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      {/*
        IMPORTANT: children stay mounted the whole time, never conditionally
        removed from the tree. Toggling the overlay must not unmount/remount
        the page — that would interrupt in-flight fetches mid-request and
        cause them to restart in a loop when the components remount.
        The overlay is a purely visual layer on top; content underneath is
        just hidden from view (and from screen readers) while it's up.
      */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-blue-950 to-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute inset-0 pointer-events-none">
              {particles.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-cyan-400/40"
                  style={{ left: `${p.left}%`, top: `${p.top}%` }}
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
                Loading data...
              </motion.p>

              <motion.div className="w-48 h-0.5 bg-gray-800/50 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-linear-to-r from-cyan-400 to-purple-500"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div aria-hidden={showOverlay} style={{ visibility: showOverlay ? "hidden" : "visible" }}>
        {children}
      </div>
    </>
  );
};

export default Initializing;
