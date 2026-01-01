# Portfolio MongoDB Integration Guide

## Overview

Your portfolio now supports **MongoDB** for data persistence! This replaces the previous localStorage-only approach and provides:

- ✅ Persistent data storage
- ✅ Multi-device synchronization
- ✅ Scalable backend
- ✅ Professional database solution

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Browser)                        │
│  (index.php, admin.php, script.js, admin.js)                │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/JSON
                       │ API calls to /api/portfolio
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Node.js Backend (server/index.js)               │
│  Express.js server running on port 5050                     │
└──────────────────────┬──────────────────────────────────────┘
                       │ MongoDB driver
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   MongoDB Database                           │
│  Local or Cloud (MongoDB Atlas)                             │
│  Collection: portfolio_db.portfolio                         │
└─────────────────────────────────────────────────────────────┘
```

---

## Quick Start

### 1. Install MongoDB

**Option A: Local Installation**
- [Download MongoDB Community](https://www.mongodb.com/try/download/community)
- Or use Docker: `docker run -d -p 27017:27017 mongo`

**Option B: MongoDB Atlas (Cloud)**
- [Sign up for free](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get connection string

### 2. Configure Backend

```bash
cd server
cp .env.example .env
```

Edit `.env`:
```env
MONGODB_URI=mongodb://localhost:27017
DB_NAME=portfolio_db
PORT=5050
```

### 3. Install Dependencies & Start

```bash
cd server
npm install
npm start
```

You should see:
```
✓ Successfully connected to MongoDB
✓ Portfolio API running on http://localhost:5050
```

### 4. Use the Portfolio

- Frontend automatically connects to backend
- Admin panel saves data to MongoDB
- Changes persist across sessions and devices

---

## Configuration

### Backend Configuration (server/.env)

| Variable | Default | Description |
|----------|---------|-------------|
| `MONGODB_URI` | `mongodb://localhost:27017` | MongoDB connection string |
| `DB_NAME` | `portfolio_db` | Database name |
| `PORT` | `5050` | Server port |

### Frontend Configuration

The frontend automatically connects to `http://localhost:5050`.

To change the API URL, edit `script.js` and `admin.js`:
```javascript
const API_URL = 'http://localhost:5050';  // Change this
```

---

## MongoDB Connection Strings

### Local MongoDB
```
mongodb://localhost:27017
```

### MongoDB Atlas (Cloud)
```
mongodb+srv://username:password@cluster0.mongodb.net/portfolio_db?retryWrites=true&w=majority
```

Steps for MongoDB Atlas:
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster (M0 free tier)
3. Get connection string from "Connect" button
4. Replace `<password>` with your password
5. Add connection string to `.env`

---

## API Endpoints

### Health Check
```bash
GET /api/health
```
Response:
```json
{
  "ok": true,
  "database": "MongoDB",
  "status": "connected"
}
```

### Get Portfolio Data
```bash
GET /api/portfolio
```
Response:
```json
{
  "hero": {...},
  "about": {...},
  "skills": [...],
  "projects": [...],
  "experience": [...],
  "contact": {...},
  "testimonials": [...],
  "certifications": [...]
}
```

### Save Portfolio Data
```bash
POST /api/portfolio
Content-Type: application/json

{
  "hero": {...},
  "about": {...},
  ...
}
```

---

## Data Structure in MongoDB

The data is stored in a single document:

```javascript
{
  "_id": "portfolio",
  "hero": {
    "navName": "Your Name",
    "title": "Welcome to My Portfolio",
    "subtitle": "Passionate Professional",
    "description": "..."
  },
  "about": {
    "image": "...",
    "name": "Your Name",
    "role": "Professional Title",
    "description": "...",
    "stats": {
      "experience": "5+",
      "projects": "50+",
      "clients": "30+"
    }
  },
  "skills": [...],
  "projects": [...],
  "experience": [...],
  "contact": {...},
  "testimonials": [...],
  "certifications": [...],
  "resumeUrl": "...",
  "createdAt": ISODate("2024-01-01T00:00:00.000Z"),
  "updatedAt": ISODate("2024-01-01T12:00:00.000Z")
}
```

---

## File Structure

```
server/
├── index.js              # Express server with MongoDB routes
├── mongodb.js            # MongoDB connection & operations
├── db.js                 # Legacy JSON DB (kept for fallback)
├── default-data.json     # Default portfolio data
├── package.json          # Dependencies (now includes 'mongodb')
├── .env.example          # Environment variables template
└── .env                  # Your actual config (create from .env.example)
```

---

## Troubleshooting

### "ECONNREFUSED" - Can't connect to MongoDB
```bash
# Check if MongoDB is running
# Local: Start MongoDB service
# Docker: docker start mongodb
# Atlas: Verify connection string and IP whitelist
```

### Changes not saving
```bash
# Check backend is running
# Verify API_URL in script.js/admin.js
# Check browser console for errors (F12)
```

### Auth failed (MongoDB Atlas)
```
- Verify username and password in connection string
- Check database name matches
- Allow your IP in MongoDB Atlas network settings
- Special characters in password must be URL encoded
```

### Port 5050 already in use
```bash
# Use different port in .env
PORT=5051

# Or kill process using the port
# Linux/Mac: lsof -i :5050
# Windows: netstat -ano | findstr :5050
```

---

## Backup & Restore

### Backup with mongodump
```bash
mongodump --uri="mongodb://localhost:27017/portfolio_db" --out=./backup
```

### Restore with mongorestore
```bash
mongorestore --uri="mongodb://localhost:27017/portfolio_db" ./backup/portfolio_db
```

### Export to JSON
```javascript
// In MongoDB compass or mongosh
db.portfolio.findOne({_id: "portfolio"})
// Copy and save as JSON file
```

---

## Production Deployment

### Prerequisites
- Node.js 14+ installed
- MongoDB Atlas account (or self-hosted MongoDB)
- Server (Heroku, AWS, DigitalOcean, etc.)

### Steps
1. Set up MongoDB Atlas with proper security
2. Update `.env` with production MongoDB URI
3. Update frontend `API_URL` to production server
4. Deploy Node.js backend
5. Deploy frontend files to web server

### Environment Variables (Production)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio_db
NODE_ENV=production
PORT=5050
```

---

## Migration from Previous Setup

If you had data in localStorage:

1. **Export from localStorage**
   ```javascript
   // In browser console
   const data = JSON.parse(localStorage.getItem('portfolioData'));
   console.log(JSON.stringify(data, null, 2));
   ```

2. **Import to MongoDB**
   ```bash
   # Through MongoDB Compass or mongosh
   db.portfolio.insertOne({
     _id: "portfolio",
     ...yourExportedData,
     createdAt: new Date(),
     updatedAt: new Date()
   })
   ```

3. **Verify**
   - Open admin panel and check data loaded correctly

---

## Support

For issues:
1. Check `MONGODB_SETUP.md` for detailed setup guide
2. Review logs in terminal where `npm start` is running
3. Test API: `curl http://localhost:5050/api/health`
4. Check MongoDB status and connection string

---

## Next Steps

✅ MongoDB is now configured!

Next:
1. Start the Node.js server: `npm start` (in `server/` folder)
2. Open portfolio in browser
3. Click "Admin" to access admin panel
4. Edit your portfolio content
5. Changes automatically save to MongoDB!

Enjoy your persistent portfolio! 🚀
