import type { Metadata } from "next";
import { Syne } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import "./globals.css";

const syne = Syne({
  variable: "--font-inter", // Keep variable name same so we don't have to update tailwind config
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinematic Photography Portfolio",
  description: "Ultra-premium photography portfolio featuring cinematic imagery and dramatic styling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} dark antialiased`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground selection:bg-brand-200/30 selection:text-white">
        {/* Dynamic Global Background - Adjusted to have a slightly shinier orange glow */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#0a0a0a]">
          {/* Core bright highlight (gloss) */}
          <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-[#FF7E00]/25 rounded-[100%] blur-[120px] mix-blend-screen" />
          
          {/* Wide ambient falloff */}
          <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[150vw] h-[80vh] bg-[#D45020]/15 rounded-[100%] blur-[150px]" />

          {/* Bottom right accent */}
          <div className="absolute bottom-[-20%] right-[-10vw] w-[60vw] h-[60vh] bg-[#FF5E3A]/10 rounded-full blur-[120px] mix-blend-screen" />
        </div>
        <Preloader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
