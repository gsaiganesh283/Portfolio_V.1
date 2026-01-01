import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { MongoClient, ServerApiVersion } from 'mongodb';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'portfolio_db';

async function initializeDatabase() {
  const client = new MongoClient(MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    tlsInsecure: true
  });

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection('portfolio');

    // Load default data
    const defaultDataPath = path.join(__dirname, 'default-data.json');
    const defaultData = JSON.parse(fs.readFileSync(defaultDataPath, 'utf-8'));

    // Insert or update
    const result = await collection.updateOne(
      { _id: 'portfolio' },
      {
        $set: {
          ...defaultData,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    if (result.upsertedId) {
      console.log('✓ Database initialized with default data');
      console.log('✓ Document inserted with _id: portfolio');
    } else {
      console.log('✓ Database updated with default data');
      console.log('✓ Modified count:', result.modifiedCount);
    }

    console.log('\n📊 Data inserted:');
    console.log('  - Hero section');
    console.log('  - About section');
    console.log('  - 3 Skills');
    console.log('  - 1 Project');
    console.log('  - 1 Experience entry');
    console.log('  - 1 Testimonial');
    console.log('  - 1 Certification');
    console.log('  - Contact info');

  } catch (error) {
    console.error('✗ Error initializing database:', error.message);
  } finally {
    await client.close();
  }
}

initializeDatabase();
