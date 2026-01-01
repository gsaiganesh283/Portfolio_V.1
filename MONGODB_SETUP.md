# MongoDB Setup Guide

## Quick Setup Options

### Option 1: Local MongoDB (Easiest for Development)

#### Windows
1. Download MongoDB Community Edition: https://www.mongodb.com/try/download/community
2. Run the installer
3. MongoDB will start automatically on `mongodb://localhost:27017`

#### macOS (using Homebrew)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

#### Docker (Recommended for any OS)
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

---

### Option 2: MongoDB Atlas (Cloud - Free Tier Available)

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account

2. **Create Cluster**
   - Click "Create a new database cluster"
   - Choose Free tier (M0)
   - Select your region
   - Click "Create"

3. **Get Connection String**
   - Go to "Databases"
   - Click "Connect" on your cluster
   - Select "Drivers" → "Node.js"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `myFirstDatabase` with `portfolio_db`

4. **Example Connection String**
   ```
   mongodb+srv://username:password@cluster0.mongodb.net/portfolio_db?retryWrites=true&w=majority
   ```

---

## Configure Your Portfolio

### Step 1: Create .env file

In the `server/` directory, create a `.env` file:

```bash
cd server
cp .env.example .env
```

### Step 2: Edit .env with your MongoDB URI

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017
DB_NAME=portfolio_db
PORT=5050
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/portfolio_db?retryWrites=true&w=majority
DB_NAME=portfolio_db
PORT=5050
```

### Step 3: Install Dependencies

```bash
cd server
npm install
```

### Step 4: Start the Server

```bash
npm start
```

You should see:
```
✓ Successfully connected to MongoDB
✓ Created collection: portfolio
✓ Initialized MongoDB with default data
✓ Portfolio API running on http://localhost:5050
```

---

## Frontend Configuration

The frontend automatically syncs with the backend at `http://localhost:5050` (or your server URL).

**Optional: Change API URL**

Edit `script.js` and `admin.js`:
```javascript
// Change this line from empty string to your API URL
const API_URL = 'http://localhost:5050';  // For local development
// or
const API_URL = 'https://your-api-domain.com';  // For production
```

---

## Verify Connection

### Check Health Status
```bash
curl http://localhost:5050/api/health
```

Expected response:
```json
{
  "ok": true,
  "database": "MongoDB",
  "status": "connected"
}
```

### Get Portfolio Data
```bash
curl http://localhost:5050/api/portfolio
```

---

## Common Issues

### "ECONNREFUSED" - MongoDB not running
- Make sure MongoDB service is running
- For Docker: `docker start mongodb`
- For local: Check MongoDB is installed and started

### Authentication failed (MongoDB Atlas)
- Verify connection string has correct username/password
- Check IP whitelist in MongoDB Atlas (allow all IPs or your IP)
- Database password might contain special characters - URL encode them

### Connection timeout
- Check firewall settings
- For MongoDB Atlas: Allow your IP in network access settings
- Verify MONGODB_URI is correct

---

## Next Steps

1. Start the backend server: `npm start` (in `server/` directory)
2. Open portfolio in browser: `http://localhost` or `http://localhost:3000`
3. Click "Admin" button to access admin panel
4. Edit portfolio content - changes auto-save to MongoDB!

---

## Backup & Migration

### Export MongoDB Data
```bash
mongodump --uri="mongodb://localhost:27017/portfolio_db" --out=./backup
```

### Import MongoDB Data
```bash
mongorestore --uri="mongodb://localhost:27017/portfolio_db" ./backup/portfolio_db
```

---

## Production Deployment

For production, use MongoDB Atlas:
1. Ensure your `.env` has the MongoDB Atlas connection string
2. Update your frontend API_URL to point to your production server
3. Enable proper security (firewalls, rate limiting, authentication)
4. Use environment variables for sensitive data

---

For more help, visit:
- MongoDB Docs: https://docs.mongodb.com/
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Express & MongoDB: https://expressjs.com/
