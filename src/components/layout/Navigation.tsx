"use client";

import { useState, useEffect, useTransition, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Bodoni_Moda } from "next/font/google";
import Magnetic from "@/components/animations/Magnetic";
import { Loader2 } from "lucide-react";

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
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);
  const currentCategory = searchParams.get("category");

  const wasPendingRef = useRef(isPending);

  useEffect(() => {
    // If we were just pending a route change and now we're not, the route change has finished!
    // So we can close the mobile menu.
    if (wasPendingRef.current && !isPending) {
      setMobileMenuOpen(false);
      setPendingSlug(null); // Clear the loading state so it's clean if reopened
    }
    wasPendingRef.current = isPending;
  }, [isPending]);

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

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, slug: string | null, isContact = false) => {
    e.preventDefault();
    setPendingSlug(isContact ? 'contact' : (slug || 'all'));
    startTransition(() => {
      if (isContact) router.push('/contact');
      else if (!slug) router.push('/');
      else router.push(`/?category=${slug}`);
    });
  };

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
            <a
              href="/"
              onClick={(e) => handleNav(e, null)}
              className={cn(
                "text-sm font-medium transition-colors relative py-1 flex items-center justify-center whitespace-nowrap",
                isAllActive ? "text-brand-200" : "text-white/70 hover:text-white hover-target"
              )}
            >
              <span className={cn("transition-opacity duration-200", isPending && pendingSlug === 'all' ? "opacity-0" : "opacity-100")}>
                All
              </span>
              {isPending && pendingSlug === 'all' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-200" />
                </div>
              )}
              {isAllActive && <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-200" />}
            </a>

            {categories.map((cat) => {
              const isActive = pathname === "/" && currentCategory === cat.slug;
              return (
                <a
                  key={cat._id}
                  href={`/?category=${cat.slug}`}
                  onClick={(e) => handleNav(e, cat.slug)}
                  className={cn(
                    "text-sm font-medium transition-colors relative py-1 flex items-center justify-center whitespace-nowrap",
                    isActive ? "text-brand-200" : "text-white/70 hover:text-white hover-target"
                  )}
                >
                  <span className={cn("transition-opacity duration-200", isPending && pendingSlug === cat.slug ? "opacity-0" : "opacity-100")}>
                    {cat.name}
                  </span>
                  {isPending && pendingSlug === cat.slug && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 animate-spin text-brand-200" />
                    </div>
                  )}
                  {isActive && <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-200" />}
                </a>
              );
            })}

            <div className="w-px h-4 bg-white/20 mx-2" />

            <a
              href="/contact"
              onClick={(e) => handleNav(e, null, true)}
              className={cn(
                "text-sm font-medium transition-colors relative py-1 flex items-center justify-center whitespace-nowrap",
                isContactActive ? "text-brand-200" : "text-white/70 hover:text-white hover-target"
              )}
            >
              <span className={cn("transition-opacity duration-200", isPending && pendingSlug === 'contact' ? "opacity-0" : "opacity-100")}>
                Contact
              </span>
              {isPending && pendingSlug === 'contact' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-200" />
                </div>
              )}
              {isContactActive && <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-200" />}
            </a>
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
                    <a
                      href="/"
                      className={cn(
                        "text-3xl sm:text-4xl font-medium transition-colors mb-6 relative flex items-center w-fit",
                        !currentCategory ? "text-brand-200" : "text-white/60 hover:text-white"
                      )}
                      onClick={(e) => handleNav(e, null)}
                    >
                      <span className={cn("transition-opacity duration-200", isPending && pendingSlug === 'all' ? "opacity-0" : "opacity-100")}>
                        All Works
                      </span>
                      {isPending && pendingSlug === 'all' && (
                        <div className="absolute inset-0 flex items-center justify-start">
                          <Loader2 className="w-6 h-6 animate-spin text-brand-200" />
                        </div>
                      )}
                    </a>
                  </motion.div>

                  <div className="space-y-4 pl-4 border-l border-white/10">
                    {categories.map((cat, i) => (
                      <motion.div
                        key={cat._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 + 0.3, ease: "easeOut" }}
                      >
                        <a
                          href={`/?category=${cat.slug}`}
                          className={cn(
                            "text-xl sm:text-2xl font-medium transition-colors relative flex items-center w-fit",
                            currentCategory === cat.slug ? "text-brand-200" : "text-white/60 hover:text-white"
                          )}
                          onClick={(e) => handleNav(e, cat.slug)}
                        >
                          {currentCategory === cat.slug && (
                            <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-full bg-brand-200" />
                          )}
                          <span className={cn("transition-opacity duration-200", isPending && pendingSlug === cat.slug ? "opacity-0" : "opacity-100")}>
                            {cat.name}
                          </span>
                          {isPending && pendingSlug === cat.slug && (
                            <div className="absolute inset-0 flex items-center justify-start">
                              <Loader2 className="w-5 h-5 animate-spin text-brand-200" />
                            </div>
                          )}
                        </a>
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
                  <a
                    href="/contact"
                    className="text-3xl sm:text-4xl font-medium text-white/60 hover:text-brand-200 transition-colors relative flex items-center w-fit"
                    onClick={(e) => handleNav(e, null, true)}
                  >
                    <span className={cn("transition-opacity duration-200", isPending && pendingSlug === 'contact' ? "opacity-0" : "opacity-100")}>
                      Contact
                    </span>
                    {isPending && pendingSlug === 'contact' && (
                      <div className="absolute inset-0 flex items-center justify-start">
                        <Loader2 className="w-6 h-6 animate-spin text-brand-200" />
                      </div>
                    )}
                  </a>
                </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
