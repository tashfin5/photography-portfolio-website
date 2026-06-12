import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Photo } from '@/models/Photo';

export async function PUT(request: Request) {
  try {
    const items = await request.json(); // Expected format: [{ _id: "...", order: 0 }, { _id: "...", order: 1 }, ...]
    
    if (!Array.isArray(items)) {
      return NextResponse.json({ error: 'Expected an array of items' }, { status: 400 });
    }

    await connectToDatabase();

    // Use bulkWrite for high-performance batch updating
    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { order: item.order }
      }
    }));

    await Photo.bulkWrite(bulkOps);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Photo bulk reorder error:', error);
    return NextResponse.json({ error: 'Failed to reorder photos' }, { status: 500 });
  }
}
