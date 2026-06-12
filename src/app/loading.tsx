import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-dark-100/80 backdrop-blur-md flex flex-col items-center justify-center min-h-screen">
      {/* Brand logo glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ff5e3a15_0%,transparent_50%)] animate-pulse pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Cinematic spinner */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 border-t-2 border-brand-200 rounded-full animate-spin [animation-duration:1s]" />
          <div className="absolute inset-2 border-b-2 border-brand-400 rounded-full animate-spin [animation-duration:1.5s] [animation-direction:reverse]" />
          <Loader2 className="w-5 h-5 text-brand-200 animate-spin" />
        </div>
        
        {/* Subtle Loading Text */}
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-brand-200/50" />
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-brand-200 animate-pulse">
            Loading
          </span>
          <div className="h-px w-8 bg-brand-200/50" />
        </div>
      </div>
    </div>
  );
}
