"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bodoni_Moda } from "next/font/google";

const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "700", "900"] });

if (typeof window !== "undefined" && typeof (window as any).isPreloaderActive === "undefined") {
  (window as any).isPreloaderActive = true;
}

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).isPreloaderActive = true;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (typeof window !== "undefined") {
            (window as any).isPreloaderActive = false;
            window.dispatchEvent(new Event("preloaderComplete"));
          }
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-dark-100 flex flex-col items-center justify-center overflow-hidden"
        >

          <motion.div
            initial={{ scale: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="relative z-10 flex flex-col items-center justify-center gap-4 text-center"
          >
            {/* Glowing Logo */}
            <motion.div
              animate={{ 
                opacity: [0.8, 1, 0.8],
                filter: [
                  "drop-shadow(0 0 0px rgba(255, 94, 58, 0))", 
                  "drop-shadow(0 0 40px rgba(255, 94, 58, 0.8))", 
                  "drop-shadow(0 0 0px rgba(255, 94, 58, 0))"
                ]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center gap-4"
            >
              <span className={`text-6xl md:text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-brand-200 to-brand-400 ${bodoni.className}`}>
                Tonmoy's
              </span>
              <span className="text-xs md:text-sm font-light tracking-[0.6em] text-white/70 uppercase pl-2">
                Photography
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
