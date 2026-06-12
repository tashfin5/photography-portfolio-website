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
        <div className="fixed -inset-[200px] z-[-1] pointer-events-none blur-[120px]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,120,0,0.15)_0%,rgba(10,10,10,1)_80%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,100,0,0.12)_0%,rgba(10,10,10,0)_60%)]"></div>
        </div>
        <Preloader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
