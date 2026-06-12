"use client";

import { Suspense, useState, useEffect } from "react";
import Navigation from "@/components/layout/Navigation";
import { motion, Variants } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Magnetic from "@/components/animations/Magnetic";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

// Variants for staggered text animation
const textContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 }
  }
};

const charVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 100, damping: 10 } }
};

export default function ContactPage() {
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ((window as any).isPreloaderActive === false) {
        setCanAnimate(true);
      } else {
        const handlePreloader = () => setCanAnimate(true);
        window.addEventListener("preloaderComplete", handlePreloader);
        return () => window.removeEventListener("preloaderComplete", handlePreloader);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-200/30">
      <Suspense fallback={<div className="h-24" />}>
        <Navigation />
      </Suspense>
      
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-48 lg:pt-56 pb-20 flex flex-col justify-center">
        <div className="flex flex-col gap-16 lg:gap-24">
          
          {/* Top: Typography spanning full width */}
          <motion.div 
            variants={textContainerVariants}
            initial="hidden"
            animate={canAnimate ? "show" : "hidden"}
            style={{ perspective: 1000 }}
            className="w-full text-center flex flex-col items-center px-4"
          >
            <h1 className="text-5xl sm:text-6xl md:text-[8rem] lg:text-[10vw] 2xl:text-[160px] font-black uppercase tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-br from-[#E89D42]/90 to-[#E89D42]/20 mb-8 flex flex-col items-center justify-center overflow-y-hidden py-4">
              <div className="flex overflow-y-hidden">
                {"LET'S".split("").map((char, index) => (
                  <motion.span
                    key={`l-${index}`}
                    variants={charVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <div className="flex overflow-y-hidden mt-2">
                {"CREATE.".split("").map((char, index) => (
                  <motion.span
                    key={`c-${index}`}
                    variants={charVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-lg md:text-xl text-white/50 max-w-2xl font-light leading-relaxed mx-auto text-center"
            >
              Available for cinematic portraits, commercial campaigns, and editorial work worldwide. Drop a message to start the conversation.
            </motion.p>
          </motion.div>

          {/* Bottom: Contact Details Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="glass p-10 md:p-16 rounded-3xl border border-white/5 relative overflow-hidden group max-w-4xl mx-auto w-full text-left"
          >
            {/* Ambient Glow */}
            <div className="absolute -inset-24 bg-gradient-to-r from-brand-200/20 to-brand-400/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            <div className="relative z-10 space-y-12">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@example.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-6 group/link">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover/link:bg-brand-200/20 group-hover/link:border-brand-200/50 transition-colors">
                  <Mail className="w-5 h-5 text-brand-200" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Email</p>
                  <p className="text-2xl md:text-3xl font-light text-white group-hover/link:text-brand-200 transition-colors">hello@example.com</p>
                </div>
              </a>

              <a href="https://wa.me/8801833375833" target="_blank" rel="noopener noreferrer" className="flex items-start gap-6 group/link">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover/link:bg-brand-200/20 group-hover/link:border-brand-200/50 transition-colors">
                  <Phone className="w-5 h-5 text-brand-200" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-2">WhatsApp</p>
                  <p className="text-2xl md:text-3xl font-light text-white group-hover/link:text-brand-200 transition-colors">01833-375833</p>
                </div>
              </a>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-brand-200" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Location</p>
                  <p className="text-xl md:text-2xl font-light text-white">Tanti Bazar, Dhaka, Bangladesh</p>
                </div>
              </div>

              <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <p className="text-sm font-light tracking-widest text-white/50 uppercase">Follow</p>
                <div className="flex items-center gap-8">
                  <Magnetic>
                    <a href="https://www.facebook.com/tonmoypaul01" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:text-brand-200 transition-colors group/social">
                      <span className="font-medium tracking-wide">Facebook</span>
                      <FacebookIcon className="w-6 h-6 group-hover/social:scale-110 transition-transform" />
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a href="https://www.instagram.com/tonmoyphoto.graphy/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:text-brand-200 transition-colors group/social">
                      <span className="font-medium tracking-wide">Instagram</span>
                      <InstagramIcon className="w-6 h-6 group-hover/social:scale-110 transition-transform" />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
