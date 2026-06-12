import mongoose from 'mongoose';
import path from 'path';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const PhotoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
const Photo = mongoose.models.Photo || mongoose.model("Photo", PhotoSchema);

const dummyCategories = [
  { name: 'Cinematic Portraits', slug: 'cinematic-portraits', order: 1 },
  { name: 'Fashion & Editorial', slug: 'fashion-editorial', order: 2 },
  { name: 'Commercial', slug: 'commercial', order: 3 },
  { name: 'Weddings', slug: 'weddings', order: 4 },
  { name: 'Street & Travel', slug: 'street-travel', order: 5 },
  { name: 'Architecture', slug: 'architecture', order: 6 },
  { name: 'Food & Beverage', slug: 'food-beverage', order: 7 }
];

const dummyPhotos = [
  // Cinematic Portraits
  { title: 'Shadows & Light', imageUrl: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=2070&auto=format&fit=crop', publicId: 'dummy1', categoryName: 'Cinematic Portraits' },
  { title: 'The Silent Watcher', imageUrl: 'https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?q=80&w=2070&auto=format&fit=crop', publicId: 'dummy2', categoryName: 'Cinematic Portraits' },
  { title: 'Midnight Stare', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy3', categoryName: 'Cinematic Portraits' },
  { title: 'Smokescreen', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy4', categoryName: 'Cinematic Portraits' },
  { title: 'Golden Hour Glow', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy5', categoryName: 'Cinematic Portraits' },
  { title: 'Neon Reflections', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy_cp6', categoryName: 'Cinematic Portraits' },
  { title: 'Deep Thoughts', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy_cp7', categoryName: 'Cinematic Portraits' },
  
  // Fashion & Editorial
  { title: 'High Fashion Street', imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy18', categoryName: 'Fashion & Editorial' },
  { title: 'Studio Red', imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy19', categoryName: 'Fashion & Editorial' },
  { title: 'Vogue Vibes', imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy20', categoryName: 'Fashion & Editorial' },
  { title: 'Minimalist Drip', imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy_fe4', categoryName: 'Fashion & Editorial' },
  { title: 'Silk & Wind', imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy_fe5', categoryName: 'Fashion & Editorial' },

  // Commercial
  { title: 'Minimalist Workspace', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', publicId: 'dummy11', categoryName: 'Commercial' },
  { title: 'Automotive Edge', imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2183&auto=format&fit=crop', publicId: 'dummy12', categoryName: 'Commercial' },
  { title: 'Tech Gadget Launch', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy13', categoryName: 'Commercial' },
  { title: 'Luxury Watch', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy14', categoryName: 'Commercial' },
  { title: 'Premium Audio', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy_c5', categoryName: 'Commercial' },

  // Weddings
  { title: 'The First Dance', imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy15', categoryName: 'Weddings' },
  { title: 'Bridal Portrait', imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy16', categoryName: 'Weddings' },
  { title: 'Rings & Details', imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy17', categoryName: 'Weddings' },
  { title: 'The Kiss', imageUrl: 'https://images.unsplash.com/photo-1532712938730-4eb36b7015fa?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy_w4', categoryName: 'Weddings' },
  { title: 'Aisle Walk', imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy_w5', categoryName: 'Weddings' },

  // Street & Travel
  { title: 'Neon Nights Tokyo', imageUrl: 'https://images.unsplash.com/photo-1542051812871-75f10255c4bc?q=80&w=2070&auto=format&fit=crop', publicId: 'dummy6', categoryName: 'Street & Travel' },
  { title: 'Kyoto Rain', imageUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070&auto=format&fit=crop', publicId: 'dummy7', categoryName: 'Street & Travel' },
  { title: 'New York Cab', imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy8', categoryName: 'Street & Travel' },
  { title: 'Venice Canals', imageUrl: 'https://images.unsplash.com/photo-1516483638261-f40af5bf2b4b?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy9', categoryName: 'Street & Travel' },
  { title: 'Desert Highway', imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy10', categoryName: 'Street & Travel' },
  { title: 'London Fog', imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy_s6', categoryName: 'Street & Travel' },

  // Architecture
  { title: 'Concrete Brutalism', imageUrl: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy21', categoryName: 'Architecture' },
  { title: 'Glass Facade', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy22', categoryName: 'Architecture' },
  { title: 'Spiral Staircase', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy23', categoryName: 'Architecture' },
  { title: 'Modern Lines', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy_a4', categoryName: 'Architecture' },

  // Food & Beverage
  { title: 'Gourmet Plating', imageUrl: 'https://images.unsplash.com/photo-1414235077428-338988692286?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy24', categoryName: 'Food & Beverage' },
  { title: 'Craft Cocktails', imageUrl: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy25', categoryName: 'Food & Beverage' },
  { title: 'Artisan Coffee', imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy26', categoryName: 'Food & Beverage' },
  { title: 'Sushi Art', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2000&auto=format&fit=crop', publicId: 'dummy_f4', categoryName: 'Food & Beverage' },
];

async function seed() {
  try {
    // @ts-ignore
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Category.deleteMany({});
    await Photo.deleteMany({});
    console.log('Cleared existing data');

    const createdCategories = await Category.insertMany(dummyCategories);
    console.log('Inserted categories with initial order');

    // Group photos by category to assign sequential order logic
    const categoryCounts: Record<string, number> = {};

    const photosWithCatIds = dummyPhotos.map(p => {
      const cat = createdCategories.find(c => c.name === p.categoryName);
      
      if (!categoryCounts[p.categoryName]) categoryCounts[p.categoryName] = 0;
      categoryCounts[p.categoryName]++;

      return {
        title: p.title,
        imageUrl: p.imageUrl,
        publicId: p.publicId,
        category: cat._id,
        order: categoryCounts[p.categoryName] // 1, 2, 3... per category
      }
    });

    await Photo.insertMany(photosWithCatIds);
    console.log(`Inserted ${photosWithCatIds.length} photos with specific ordering`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
