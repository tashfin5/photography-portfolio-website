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
        <div className="fixed inset-0 z-[-1] pointer-events-none opacity-25">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#5a2200_0%,#000000_100%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#3a1000_0%,transparent_50%)]"></div>
        </div>
        <div className="bg-noise" />
        <Preloader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
