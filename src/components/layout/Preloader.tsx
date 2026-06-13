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
        const next = prev + Math.floor(Math.random() * 15) + 5;
        return next > 100 ? 100 : next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Handle completion side-effects outside of the pure state updater
  useEffect(() => {
    if (progress >= 100) {
      if (typeof window !== "undefined") {
        (window as any).isPreloaderActive = false;
        window.dispatchEvent(new Event("preloaderComplete"));
      }
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [progress]);

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
          {/* Blurred Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
              src="/assets/loading_background.png" 
              alt="Loading Background" 
              className="w-full h-full object-cover blur-[20px] scale-110 opacity-70" 
            />
            <div className="absolute inset-0 bg-dark-100/50" />
          </div>

          <motion.div
            initial={{ scale: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="relative z-10 flex flex-col items-center justify-center gap-4 text-center"
          >
            {/* Glowing Logo Image */}
            <motion.div
              animate={{
                opacity: [0.8, 1, 0.8],
                filter: [
                  "drop-shadow(0 0 0px rgba(255, 255, 255, 0))",
                  "drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))",
                  "drop-shadow(0 0 0px rgba(255, 255, 255, 0))"
                ]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center w-full"
            >
              <img src="/assets/logo.png" alt="Tonmoy's Photography" className="w-[95vw] md:w-[90vw] lg:w-[85vw] max-w-[1200px] md:max-w-[1600px] lg:max-w-[2000px] h-auto object-contain -translate-y-[20px] md:-translate-y-[40px]" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
