import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getPortfolio, setPortfolio } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors({ origin: '*'}));
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/portfolio', async (_req, res) => {
  try {
    const data = await getPortfolio();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: 'Failed to load portfolio' });
  }
});

app.post('/api/portfolio', async (req, res) => {
  try {
    const saved = await setPortfolio(req.body);
    res.json({ ok: true, data: saved });
  } catch (e) {
    console.error(e);
    res.status(400).json({ ok: false, error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio API running on http://localhost:${PORT}`);
});
