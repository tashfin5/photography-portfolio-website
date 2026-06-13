import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { About } from "@/models/About";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    await connectDB();
    let about = await About.findOne();
    if (!about) {
      about = await About.create({}); // Creates default document
    }
    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch about page data" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();
    
    let about = await About.findOne();
    if (!about) {
      about = await About.create({});
    }

    const name = formData.get("name") as string;
    const nameSize = formData.get("nameSize") as string;
    const profileText = formData.get("profileText") as string;
    const aboutText = formData.get("aboutText") as string;
    const facebookUrl = formData.get("facebookUrl") as string;
    const instagramUrl = formData.get("instagramUrl") as string;
    const emailAddress = formData.get("emailAddress") as string;
    const file = formData.get("file") as File | null;

    const updates: any = {
      name: name || about.name,
      nameSize: nameSize || about.nameSize,
      profileText: profileText || about.profileText,
      aboutText: aboutText || about.aboutText,
      facebookUrl: facebookUrl !== null ? facebookUrl : about.facebookUrl,
      instagramUrl: instagramUrl !== null ? instagramUrl : about.instagramUrl,
      emailAddress: emailAddress !== null ? emailAddress : about.emailAddress,
      updatedAt: new Date()
    };

    if (file) {
      // Convert file to base64 for Cloudinary upload
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
        folder: "photography_portfolio/about",
      });

      // Delete old photo if it exists on Cloudinary
      if (about.photoPublicId) {
        try {
          await cloudinary.uploader.destroy(about.photoPublicId);
        } catch (e) {
          console.error("Failed to delete old about photo from cloudinary:", e);
        }
      }

      updates.photoUrl = uploadResponse.secure_url;
      updates.photoPublicId = uploadResponse.public_id;
    }

    const updatedAbout = await About.findOneAndUpdate({}, updates, { new: true });
    
    return NextResponse.json(updatedAbout);
  } catch (error) {
    console.error("Update about error:", error);
    return NextResponse.json({ error: "Failed to update about page data" }, { status: 500 });
  }
}
