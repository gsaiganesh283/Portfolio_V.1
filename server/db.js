import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, { portfolio: null });

async function init() {
  await db.read();
  if (!db.data || !db.data.portfolio) {
    const defaults = JSON.parse(fs.readFileSync(path.join(__dirname, 'default-data.json'), 'utf-8'));
    db.data = { portfolio: defaults };
    await db.write();
  }
}

export async function getPortfolio() {
  await init();
  return db.data.portfolio;
}

export async function setPortfolio(data) {
  await init();
  db.data.portfolio = data;
  await db.write();
  return db.data.portfolio;
}

export default db;
