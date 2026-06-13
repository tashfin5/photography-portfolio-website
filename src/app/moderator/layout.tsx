import Link from "next/link";
import { LogOut } from "lucide-react";

export default function ModeratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-100 text-white font-sans flex flex-col">
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 max-w-[1600px] h-16 flex items-center justify-between">
          <div className="flex gap-8">
            <Link href="/moderator" className="text-sm font-bold tracking-widest uppercase hover:text-brand-200 transition-colors">
              Gallery
            </Link>
            <Link href="/moderator/about" className="text-sm font-bold tracking-widest uppercase hover:text-brand-200 transition-colors">
              About Page
            </Link>
          </div>
          <Link href="/api/auth/logout" prefetch={false} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
            <LogOut className="w-4 h-4" /> Logout
          </Link>
        </div>
      </nav>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
