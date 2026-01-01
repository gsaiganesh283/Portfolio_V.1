import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

import express from 'express';
import cors from 'cors';
import { initializeMongoDB, connectToMongoDB, disconnectFromMongoDB, getPortfolioData, setPortfolioData } from './mongodb.js';

// Initialize MongoDB with environment variables
initializeMongoDB(process.env.MONGODB_URI, process.env.DB_NAME);

console.log('📋 Environment loaded:');
console.log('  MONGODB_URI:', process.env.MONGODB_URI ? '✓ Set' : '✗ Not set');
console.log('  DB_NAME:', process.env.DB_NAME || 'portfolio_db');
console.log('  PORT:', process.env.PORT || 5050);

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors({ origin: '*'}));
app.use(express.json({ limit: '2mb' }));

// Health check endpoint
app.get('/api/health', async (_req, res) => {
  try {
    const data = await getPortfolioData();
    res.json({ 
      ok: true, 
      database: 'MongoDB',
      status: 'connected'
    });
  } catch (error) {
    res.status(500).json({ 
      ok: false, 
      error: 'Database connection failed',
      message: error.message 
    });
  }
});

// GET portfolio data
app.get('/api/portfolio', async (_req, res) => {
  try {
    const data = await getPortfolioData();
    if (!data) {
      return res.status(404).json({ error: 'Portfolio data not found' });
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      ok: false, 
      error: 'Failed to load portfolio',
      message: error.message 
    });
  }
});

// POST/PUT portfolio data
app.post('/api/portfolio', async (req, res) => {
  try {
    const result = await setPortfolioData(req.body);
    const updatedData = await getPortfolioData();
    res.json({ 
      ok: true, 
      message: result.message,
      data: updatedData 
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ 
      ok: false, 
      error: 'Failed to save portfolio',
      message: error.message 
    });
  }
});

// Initialize database and start server
async function startServer() {
  try {
    await connectToMongoDB();
    
    app.listen(PORT, () => {
      console.log(`\n✓ Portfolio API running on http://localhost:${PORT}`);
      console.log(`✓ API endpoints:`);
      console.log(`  - GET  /api/health      (Check health status)`);
      console.log(`  - GET  /api/portfolio   (Get portfolio data)`);
      console.log(`  - POST /api/portfolio   (Save portfolio data)\n`);
    });
  } catch (error) {
    console.error('\n✗ Failed to start server:', error.message);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('\nShutting down gracefully...');
  await disconnectFromMongoDB();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await disconnectFromMongoDB();
  process.exit(0);
});

startServer();
