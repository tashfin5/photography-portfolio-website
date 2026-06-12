import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Category } from '@/models/Category';
import { Photo } from '@/models/Photo';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    await connectToDatabase();
    
    // Check if exists
    const existing = await Category.findOne({ slug });
    if (existing) {
      return NextResponse.json({ error: 'Category already exists' }, { status: 400 });
    }

    const category = await Category.create({ name, slug });
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
