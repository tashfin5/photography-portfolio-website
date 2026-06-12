import { Suspense } from "react";
import Navigation from "@/components/layout/Navigation";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Gallery from "@/components/sections/Gallery";
import FeaturedHorizontal from "@/components/sections/FeaturedHorizontal";
import connectToDatabase from "@/lib/db";
import { Photo } from "@/models/Photo";
import { Category } from "@/models/Category"; 

// Fetch data on the server
async function getPhotos() {
  try {
    await connectToDatabase();
    const photos = await Photo.find({})
      .populate('category', 'name slug')
      .sort({ order: 1, createdAt: -1 })
      .lean();
    
    return JSON.parse(JSON.stringify(photos));
  } catch (error) {
    console.error("Failed to fetch photos", error);
    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const photos = await getPhotos();
  const resolvedSearchParams = await searchParams;
  const currentCategory = resolvedSearchParams.category;

  return (
    <SmoothScroll>
      
      <Suspense fallback={<div className="h-24" />}>
        <Navigation />
      </Suspense>
      
      {!currentCategory && photos.some((p: any) => p.isFeatured) && (
        <FeaturedHorizontal photos={photos} />
      )}
      
      <main className="w-full min-h-screen pt-24 lg:pt-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse w-10 h-10 bg-brand-200 rounded-full" /></div>}>
          <Gallery photos={photos} />
        </Suspense>
      </main>
    </SmoothScroll>
  );
}
