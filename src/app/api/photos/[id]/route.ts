import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Photo } from '@/models/Photo';
import cloudinary from '@/lib/cloudinary';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    
    const photo = await Photo.findById(id);
    if (!photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    // Delete from Cloudinary
    if (photo.publicId) {
      await cloudinary.uploader.destroy(photo.publicId);
    }

    // Delete from DB
    await Photo.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Photo delete error:', error);
    return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectToDatabase();

    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.isFeatured !== undefined) updateData.isFeatured = body.isFeatured;
    
    const updatedPhoto = await Photo.findByIdAndUpdate(
      id, 
      { $set: updateData }, 
      { new: true }
    ).populate('category', 'name slug');
    
    if (!updatedPhoto) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    return NextResponse.json(updatedPhoto);
  } catch (error) {
    console.error('Photo update error:', error);
    return NextResponse.json({ error: 'Failed to update photo' }, { status: 500 });
  }
}
