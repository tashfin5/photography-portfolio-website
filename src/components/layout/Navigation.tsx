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

  const handleCustomNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setPendingSlug(path);
    startTransition(() => {
      router.push(`/${path}`);
    });
  };

  const isAllActive = pathname === "/" && !currentCategory;
  const isContactActive = pathname === "/contact";

  return (
    <>
      <nav
        className={cn(
          "absolute top-0 left-0 w-full z-50 transition-all duration-500 bg-transparent",
          scrolled ? "py-4 md:py-6" : "py-6 md:py-8"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo area */}
          <div className="relative z-50 flex items-center h-8 md:h-12 w-[250px] md:w-[400px]">
            <Link href="/" className="absolute top-0 -left-[70px] md:-left-[200px] lg:-left-[280px] xl:-left-[350px] w-[350px] md:w-[650px] lg:w-[850px] xl:w-[1000px] h-full group cursor-pointer">
              <img src="/assets/logo.png" alt="Tonmoy's Photography" className="absolute top-[30%] lg:top-[20%] -translate-y-1/2 left-0 w-full h-auto object-contain max-w-none pointer-events-none" />
            </Link>
          </div>

          {/* Desktop Nav - Categories */}
          <nav className="hidden xl:flex items-center gap-x-3 2xl:gap-x-6 justify-end flex-1 whitespace-nowrap relative z-[60] pointer-events-none [&>*]:pointer-events-auto">
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

            <div className="relative group flex items-center h-full">
              <button
                className="text-sm font-medium transition-colors relative py-4 px-3 flex items-center justify-center whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-brand-200 to-brand-400 hover:opacity-80 hover-target"
              >
                About
                <svg className="w-3 h-3 ml-1 text-brand-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>

              {/* Dropdown Menu Wrapper (pt-4 creates the visual gap without breaking hover) */}
              <div className="absolute top-full right-0 pt-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right flex flex-col pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl py-2 flex flex-col">
                  <a
                    href="/about"
                    onClick={(e) => handleCustomNav(e, 'about')}
                    className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors text-left hover-target flex items-center justify-between"
                  >
                    Bio
                    {isPending && pendingSlug === 'about' && <Loader2 className="w-3 h-3 animate-spin text-brand-200" />}
                  </a>
                  <a
                    href="/contact"
                    onClick={(e) => handleCustomNav(e, 'contact')}
                    className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors text-left hover-target flex items-center justify-between"
                  >
                    Contact
                    {isPending && pendingSlug === 'contact' && <Loader2 className="w-3 h-3 animate-spin text-brand-200" />}
                  </a>
                </div>
              </div>
            </div>
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
      </nav>

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
                className="pt-8 border-t border-white/10 mt-8 space-y-4"
              >
                <p className="text-xs text-white/40 tracking-[0.3em] uppercase mb-4 font-semibold">About</p>
                <a
                  href="/about"
                  className="text-3xl sm:text-4xl font-medium text-white/60 hover:text-brand-200 transition-colors relative flex items-center w-fit"
                  onClick={(e) => handleCustomNav(e, 'about')}
                >
                  <span className={cn("transition-opacity duration-200", isPending && pendingSlug === 'about' ? "opacity-0" : "opacity-100")}>
                    Bio
                  </span>
                  {isPending && pendingSlug === 'about' && (
                    <div className="absolute inset-0 flex items-center justify-start">
                      <Loader2 className="w-6 h-6 animate-spin text-brand-200" />
                    </div>
                  )}
                </a>
                <a
                  href="/contact"
                  className="text-3xl sm:text-4xl font-medium text-white/60 hover:text-brand-200 transition-colors relative flex items-center w-fit"
                  onClick={(e) => handleCustomNav(e, 'contact')}
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
