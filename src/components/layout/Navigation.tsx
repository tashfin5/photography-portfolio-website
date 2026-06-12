"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Bodoni_Moda } from "next/font/google";
import Magnetic from "@/components/animations/Magnetic";

const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "700", "900"] });

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentCategory = searchParams.get("category");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAllActive = pathname === "/" && !currentCategory;
  const isContactActive = pathname === "/contact";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center justify-center",
          scrolled ? "py-4 bg-dark-100/60 backdrop-blur-2xl border-b border-brand-200/20 shadow-2xl shadow-black/50" : "py-8 bg-transparent border-b border-transparent"
        )}
      >
        <div className="w-full max-w-[1600px] px-6 md:px-12 flex items-center justify-between gap-12">

          {/* Logo */}
          <Magnetic strength={0.2}>
            <Link href="/" className="hover-target group flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 flex-shrink-0">
              <span className={cn(bodoni.className, "text-4xl md:text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-brand-200 to-brand-400")}>
                Tonmoy's
              </span>
              <span className="text-[0.65rem] md:text-sm font-light tracking-[0.4em] text-white/70 uppercase">
                Photography
              </span>
            </Link>
          </Magnetic>

          {/* Desktop Nav - Categories */}
          <nav className="hidden xl:flex items-center gap-x-6 gap-y-2 flex-wrap justify-end flex-1">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors relative py-1",
                isAllActive ? "text-brand-200" : "text-white/70 hover:text-white hover-target"
              )}
            >
              All
              {isAllActive && <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-200" />}
            </Link>

            {categories.map((cat) => {
              const isActive = pathname === "/" && currentCategory === cat.slug;
              return (
                <Link
                  key={cat._id}
                  href={`/?category=${cat.slug}`}
                  className={cn(
                    "text-sm font-medium transition-colors relative py-1",
                    isActive ? "text-brand-200" : "text-white/70 hover:text-white hover-target"
                  )}
                >
                  {cat.name}
                  {isActive && <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-200" />}
                </Link>
              );
            })}

            <div className="w-px h-4 bg-white/20 mx-2" />

            <Link
              href="/contact"
              className={cn(
                "text-sm font-medium transition-colors relative py-1",
                isContactActive ? "text-brand-200" : "text-white/70 hover:text-white hover-target"
              )}
            >
              Contact
              {isContactActive && <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-200" />}
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="xl:hidden relative z-50 p-2 hover-target text-white flex-shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current origin-left transition-transform"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-current transition-opacity"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current origin-left transition-transform"
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-dark-100/98 backdrop-blur-3xl flex flex-col px-8 pt-32 pb-12 overflow-y-auto"
          >
            <div className="w-full max-w-sm mx-auto space-y-8 my-auto">

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, ease: "easeOut" }}
                  >
                    <p className="text-xs text-white/40 tracking-[0.3em] uppercase mb-4 font-semibold">Portfolio</p>
                    <Link
                      href="/"
                      className={cn(
                        "text-3xl sm:text-4xl font-medium transition-colors block mb-6",
                        !currentCategory ? "text-brand-200" : "text-white/60 hover:text-white"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      All Works
                    </Link>
                  </motion.div>

                  <div className="space-y-4 pl-4 border-l border-white/10">
                    {categories.map((cat, i) => (
                      <motion.div
                        key={cat._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 + 0.3, ease: "easeOut" }}
                      >
                        <Link
                          href={`/?category=${cat.slug}`}
                          className={cn(
                            "text-xl sm:text-2xl font-medium transition-colors block relative",
                            currentCategory === cat.slug ? "text-brand-200" : "text-white/60 hover:text-white"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {currentCategory === cat.slug && (
                            <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-full bg-brand-200" />
                          )}
                          {cat.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: categories.length * 0.05 + 0.4, ease: "easeOut" }}
                  className="pt-8 border-t border-white/10 mt-8"
                >
                  <p className="text-xs text-white/40 tracking-[0.3em] uppercase mb-4 font-semibold">Get in Touch</p>
                  <Link
                    href="/contact"
                    className="text-3xl sm:text-4xl font-medium text-white/60 hover:text-brand-200 transition-colors block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
