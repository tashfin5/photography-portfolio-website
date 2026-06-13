import mongoose, { Document, Model } from "mongoose";

export interface IAbout extends Document {
  name: string;
  nameSize: string;
  profileText: string;
  aboutText: string;
  photoUrl: string;
  photoPublicId: string;
  facebookUrl: string;
  instagramUrl: string;
  emailAddress: string;
  updatedAt: Date;
}

const AboutSchema = new mongoose.Schema({
  name: { type: String, default: "Tonmoy" },
  nameSize: { type: String, default: "text-6xl lg:text-7xl xl:text-8xl" },
  profileText: { type: String, default: "I am a visual storyteller specializing in cinematic photography. My work focuses on dramatic lighting, intimate moments, and capturing the raw emotion of my subjects." },
  aboutText: { type: String, default: "I believe that every image should tell a story. With over a decade of experience, I bring a unique cinematic perspective to every shoot. My passion lies in capturing authentic moments and translating them into timeless visual art." },
  photoUrl: { type: String, default: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop" },
  photoPublicId: { type: String, default: "" },
  facebookUrl: { type: String, default: "" },
  instagramUrl: { type: String, default: "" },
  emailAddress: { type: String, default: "" },
  updatedAt: { type: Date, default: Date.now },
});

export const About: Model<IAbout> = mongoose.models.About || mongoose.model<IAbout>("About", AboutSchema);
