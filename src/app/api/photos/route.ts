import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Photo } from '@/models/Photo';
import { Category } from '@/models/Category'; // Ensure schema is registered for populate
import cloudinary from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    await connectToDatabase();
    
    let query = {};
    if (category) {
      query = { category };
    }

    const photos = await Photo.find(query)
      .populate('category', 'name slug')
      .sort({ order: 1, createdAt: -1 });

    return NextResponse.json(photos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;

    if (!file || !title || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Convert file to base64 string for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
      folder: 'portfolio',
    });

    await connectToDatabase();
    
    const photo = await Photo.create({
      title,
      category,
      imageUrl: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
    });

    return NextResponse.json(photo);
  } catch (error: any) {
    console.error('Photo upload error:', error);
    return NextResponse.json({ error: 'Failed to upload photo' }, { status: 500 });
  }
}
