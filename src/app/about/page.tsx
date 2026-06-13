import { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import connectDB from "@/lib/db";
import { About } from "@/models/About";
import Navigation from "@/components/layout/Navigation";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  title: "Bio | Tonmoy's Photography",
  description: "Learn more about Tonmoy and the vision behind the lens.",
};

async function getAboutData() {
  await connectDB();
  const about = await About.findOne().lean();
  if (!about) {
    return {
      name: "Tonmoy",
      nameSize: "text-6xl lg:text-7xl xl:text-8xl",
      profileText: "I am a visual storyteller specializing in cinematic photography. My work focuses on dramatic lighting, intimate moments, and capturing the raw emotion of my subjects.",
      aboutText: "I believe that every image should tell a story. With over a decade of experience, I bring a unique cinematic perspective to every shoot. My passion lies in capturing authentic moments and translating them into timeless visual art.",
      photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop"
    };
  }
  return JSON.parse(JSON.stringify(about));
}

export default async function AboutPage() {
  const data = await getAboutData();

  return (
    <>
      <Suspense fallback={<div className="h-24" />}>
        <Navigation />
      </Suspense>
      <main className="min-h-screen w-full pt-48 lg:pt-60 pb-12 px-6 md:px-8 flex items-center justify-center overflow-hidden">

        {/* 3-Column Split Container */}
        <div className="w-full max-w-[1800px] min-h-[800px] lg:min-h-0 lg:h-[85vh] flex flex-col lg:flex-row shadow-2xl rounded-2xl overflow-hidden bg-black/20 backdrop-blur-md ring-1 ring-white/10">

          {/* Left Column: Dark Panel */}
          <div className="lg:w-[35%] bg-[#0a0b0e] text-[#E89D42] p-12 lg:p-20 flex flex-col justify-center relative">
            <div className="space-y-6 pb-16 lg:pb-32">
              <p className="text-xs text-[#E89D42]/60 tracking-[0.3em] uppercase font-semibold">Profile</p>
              <h1 className={cn(bodoni.className, data.nameSize, "font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[#E89D42] to-[#E89D42]/70 leading-tight")}>
                {data.name}
              </h1>
              <p className="text-[#E89D42]/80 text-lg xl:text-xl leading-relaxed max-w-sm whitespace-pre-wrap">
                {data.profileText}
              </p>
            </div>

            <div className="absolute bottom-12 lg:bottom-20 left-12 lg:left-20 right-12 lg:right-20 flex gap-6 text-[#E89D42]/60 items-center">
              <a href={data.instagramUrl || "#"} target="_blank" rel="noopener noreferrer" className="text-xs font-bold tracking-[0.2em] hover:text-[#E89D42] transition-colors uppercase">Instagram</a>
              <a href={data.facebookUrl || "#"} target="_blank" rel="noopener noreferrer" className="text-xs font-bold tracking-[0.2em] hover:text-[#E89D42] transition-colors uppercase">Facebook</a>
              <a href={data.emailAddress ? `mailto:${data.emailAddress}` : "/contact"} className="hover:text-[#E89D42] transition-colors ml-auto">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Middle Column: Primary Portrait */}
          <div className="lg:w-[35%] h-[50vh] shrink-0 lg:h-full relative overflow-hidden bg-[#0a0b0e]">
            <img
              src={data.photoUrl}
              alt={`Portrait of ${data.name}`}
              className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000 opacity-90"
            />
          </div>

          {/* Right Column: Light Panels */}
          <div className="lg:w-[30%] bg-[#0a0b0e] text-white flex flex-col h-full justify-center p-12 lg:p-20">
            <div className="pb-16 lg:pb-32">
              <h2 className="text-3xl font-bold mb-6 tracking-tight text-white">About me</h2>
              <p className="text-white/80 text-base leading-relaxed whitespace-pre-wrap">
                {data.aboutText}
              </p>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
