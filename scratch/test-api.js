const mongoose = require('mongoose');

async function test() {
  await mongoose.connect('mongodb+srv://clientproject34_db_user:tashfin@tonmoyphotography.3kcqfvc.mongodb.net/?appName=tonmoyphotography');
  
  const PhotoSchema = new mongoose.Schema({
    order: Number,
  }, { strict: false });
  const Photo = mongoose.models.Photo || mongoose.model('Photo', PhotoSchema);

  const photos = await Photo.find({}).limit(2);
  if (photos.length < 2) return console.log('Not enough photos');

  console.log('Before:', photos.map(p => ({ id: p._id.toString(), order: p.order })));

  const bulkOps = [
    {
      updateOne: {
        filter: { _id: photos[0]._id.toString() },
        update: { order: 999 }
      }
    }
  ];

  const result = await Photo.bulkWrite(bulkOps);
  console.log('BulkWrite result:', result);

  const after = await Photo.findById(photos[0]._id);
  console.log('After order:', after.order);

  process.exit(0);
}

test().catch(console.error);
