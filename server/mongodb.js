import { MongoClient, ServerApiVersion } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mongoClient = null;
let database = null;

let MONGODB_URI = null;
let DB_NAME = null;
const COLLECTION_NAME = 'portfolio';

/**
 * Initialize MongoDB configuration
 */
export function initializeMongoDB(uri, dbName) {
  MONGODB_URI = uri || process.env.MONGODB_URI || 'mongodb://localhost:27017';
  DB_NAME = dbName || process.env.DB_NAME || 'portfolio_db';
}

/**
 * Connect to MongoDB
 */
export async function connectToMongoDB() {
  try {
    if (!MONGODB_URI) {
      MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    }
    if (!DB_NAME) {
      DB_NAME = process.env.DB_NAME || 'portfolio_db';
    }

    if (mongoClient && mongoClient.topology && mongoClient.topology.isConnected()) {
      console.log('✓ Already connected to MongoDB');
      return database;
    }

    mongoClient = new MongoClient(MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      // Development: Disable SSL verification for MongoDB Atlas
      // (Use proper certificates in production)
      tlsInsecure: true
    });

    await mongoClient.connect();
    database = mongoClient.db(DB_NAME);

    // Verify connection
    await database.admin().ping();
    console.log('✓ Successfully connected to MongoDB');

    // Ensure collection exists
    const collections = await database.listCollections().toArray();
    const collectionExists = collections.some(col => col.name === COLLECTION_NAME);
    
    if (!collectionExists) {
      await database.createCollection(COLLECTION_NAME);
      console.log(`✓ Created collection: ${COLLECTION_NAME}`);
      
      // Initialize with default data
      const defaultDataPath = path.join(__dirname, 'default-data.json');
      if (fs.existsSync(defaultDataPath)) {
        const defaultData = JSON.parse(fs.readFileSync(defaultDataPath, 'utf-8'));
        await database.collection(COLLECTION_NAME).insertOne({
          _id: 'portfolio',
          ...defaultData,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        console.log('✓ Initialized MongoDB with default data');
      }
    }

    return database;
  } catch (error) {
    console.error('✗ MongoDB connection error:', error.message);
    console.error('Full error:', error);
    
    // Fallback: Try to provide helpful error message
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n⚠️  MongoDB is not running locally.');
      console.log('To use MongoDB, either:');
      console.log('1. Install MongoDB locally: https://www.mongodb.com/try/download/community');
      console.log('2. Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas');
      console.log('3. Use Docker: docker run -d -p 27017:27017 mongo');
      console.log('\nSet MONGODB_URI environment variable with your connection string.\n');
    }
    
    throw error;
  }
}

/**
 * Disconnect from MongoDB
 */
export async function disconnectFromMongoDB() {
  if (mongoClient) {
    await mongoClient.close();
    mongoClient = null;
    database = null;
    console.log('✓ Disconnected from MongoDB');
  }
}

/**
 * Get portfolio data from MongoDB
 */
export async function getPortfolioData() {
  try {
    const db = database || await connectToMongoDB();
    const collection = db.collection(COLLECTION_NAME);
    
    const data = await collection.findOne({ _id: 'portfolio' });
    
    if (!data) {
      // If no data exists, return null or default structure
      return null;
    }
    
    // Remove MongoDB internal fields from response
    const { _id, createdAt, updatedAt, ...portfolioData } = data;
    return portfolioData;
  } catch (error) {
    console.error('Error retrieving portfolio data:', error.message);
    throw error;
  }
}

/**
 * Save/update portfolio data in MongoDB
 */
export async function setPortfolioData(data) {
  try {
    const db = database || await connectToMongoDB();
    const collection = db.collection(COLLECTION_NAME);
    
    const result = await collection.updateOne(
      { _id: 'portfolio' },
      {
        $set: {
          ...data,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    return {
      success: true,
      modifiedCount: result.modifiedCount,
      upsertedId: result.upsertedId,
      message: result.upsertedId ? 'Portfolio created' : 'Portfolio updated'
    };
  } catch (error) {
    console.error('Error saving portfolio data:', error.message);
    throw error;
  }
}

/**
 * Get MongoDB client instance
 */
export function getMongoClient() {
  return mongoClient;
}

/**
 * Get MongoDB database instance
 */
export function getDatabase() {
  return database;
}

export default {
  connectToMongoDB,
  disconnectFromMongoDB,
  getPortfolioData,
  setPortfolioData,
  getMongoClient,
  getDatabase
};
