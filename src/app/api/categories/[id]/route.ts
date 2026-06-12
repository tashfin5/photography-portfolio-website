import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Category } from '@/models/Category';
import { Photo } from '@/models/Photo';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    
    // Check if photos exist in this category
    const photosCount = await Photo.countDocuments({ category: id });
    if (photosCount > 0) {
      return NextResponse.json({ error: 'Cannot delete category containing photos' }, { status: 400 });
    }

    await Category.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectToDatabase();
    
    // Automatically generate slug if name is updated
    if (body.name) {
      body.slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, body, { new: true });
    
    if (!updatedCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Category update error:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}
