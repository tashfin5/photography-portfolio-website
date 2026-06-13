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
        {/* Dynamic Global Background Image */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <img src="/assets/Background.png" alt="Background" className="w-full h-full object-cover" />
        </div>
        <Preloader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
