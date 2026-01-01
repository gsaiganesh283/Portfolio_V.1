# Deploying Portfolio to ProfreeHost + Backend Hosting

Your portfolio setup has two parts:

1. **Frontend** (PHP files) - Can be hosted on ProfreeHost ✅
2. **Backend** (Node.js) - Needs a different host ⚠️

---

## 📋 Architecture

```
ProfreeHost
├── index.php (Your portfolio)
├── admin.php (Admin panel)
├── styles.css
├── script.js
├── admin.js
└── api/ (Just for reference/offline mode)
    └── portfolio.php (PHP version - optional)

Backend Service (Railway/Heroku/Render)
├── Node.js Express Server
├── MongoDB Atlas Connection
└── API Routes (/api/portfolio)
```

---

## ✅ Step 1: Prepare Frontend for ProfreeHost

### Upload Only These Files:

```
Portfolio Root/
├── index.php
├── admin.php
├── styles.css
├── script.js
├── admin.js
├── advanced.js
├── assets/ (if any images)
└── (no server/ folder needed)
```

**Do NOT upload:**
- `server/` folder (Node.js files)
- `vendor/` folder
- `.env` file
- `composer.json`

---

## 🚀 Step 2: Deploy Backend to Railway (FREE)

### Why Railway?
- ✅ Free tier: 500 hours/month
- ✅ Native Node.js support
- ✅ Auto-deploys from GitHub
- ✅ Easy environment variables

### Deploy Steps:

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Connect Your Repository**
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Choose your Portfolio_V.1 repository
   - Connect your GitHub account

3. **Configure Node.js Project**
   - Railway should auto-detect `/server` folder
   - If not, set `Root Directory` to `server/`

4. **Add Environment Variables**
   - In Railway dashboard, go to "Variables"
   - Add these variables:
   ```
   MONGODB_URI=mongodb+srv://saiganeshraju05_db_user:YhuwEGx0c2K2KYkt@cluster0.mfaqczj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   DB_NAME=portfolio_db
   PORT=5050
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy the Railway URL (e.g., `https://portfolio-api-prod.up.railway.app`)

---

## 🔗 Step 3: Update Frontend API URLs

After getting your Railway backend URL, update your frontend files:

### In `script.js` (Line 5):
```javascript
// Change this:
const API_URL = (window.__API_URL__ || 'http://localhost:5050');

// To this:
const API_URL = (window.__API_URL__ || 'https://your-railway-url.up.railway.app');
```

### In `admin.js` (Line 4):
```javascript
// Change this:
const API_URL = (window.__API_URL__ || 'http://localhost:5050');

// To this:
const API_URL = (window.__API_URL__ || 'https://your-railway-url.up.railway.app');
```

---

## 📤 Step 4: Upload to ProfreeHost

### Option A: FTP Upload (Easiest)

1. **Get FTP Credentials** from ProfreeHost control panel
   - FTP Host: `ftp.profreehost.com`
   - Username: Your username
   - Password: Your password

2. **Connect with FTP Client** (FileZilla)
   - Download FileZilla: https://filezilla-project.org/
   - Connect with credentials above
   - Navigate to `public_html/` folder

3. **Upload Files**
   - Drag these files to `public_html/`:
     ```
     index.php
     admin.php
     styles.css
     script.js
     admin.js
     advanced.js
     (any image assets)
     ```

4. **Skip These Folders**
   - ❌ Don't upload `server/`
   - ❌ Don't upload `vendor/`
   - ❌ Don't upload `.env`

### Option B: Git Deploy (If Supported)

1. Push only frontend files to a separate branch
2. Follow ProfreeHost's Git deployment instructions

---

## 🧪 Step 5: Test Your Deployment

### Test Frontend
```
http://your-profreehost-domain.com
```
- Portfolio should load ✓
- Typing animation should work ✓
- Admin button visible ✓

### Test Admin Panel
```
http://your-profreehost-domain.com/admin.php
```
- Login page appears ✓
- Username: `admin`
- Password: `admin123`
- Can edit content ✓

### Verify Backend Connection
Check browser console (F12):
- No CORS errors ✓
- Admin data loads ✓
- Changes save to MongoDB ✓

---

## 🐛 Troubleshooting

### "API Not Found" Error
**Problem:** Frontend can't reach backend  
**Fix:** Ensure API_URL in script.js and admin.js points to your Railway URL

### "CORS Error"
**Problem:** Frontend and backend on different domains  
**Fix:** Already handled - Node.js backend has CORS enabled for all origins

### "MongoDB Connection Failed"
**Problem:** Backend can't connect to MongoDB  
**Fix:** Check MONGODB_URI in Railway Variables - verify connection string is correct

### "Admin Data Not Loading"
**Problem:** Can login but no data appears  
**Fix:** Data exists in MongoDB - try refreshing browser cache (Ctrl+Shift+R)

---

## 📊 Monitoring

### View Backend Logs
- Go to Railway dashboard
- Select your project
- Click "Logs" tab
- See real-time server output

### View Error Logs
```bash
# If you have SSH access to Railway:
railway logs --service portfolio-api
```

---

## 🔄 Updating Your Portfolio

### Update Frontend (ProfreeHost)
1. Edit files locally
2. Upload via FTP to `public_html/`
3. Changes live immediately (no restart needed)

### Update Backend (Railway)
1. Push changes to GitHub
2. Railway auto-deploys within seconds
3. No manual restart needed

### Update Content (Admin Panel)
1. Open http://your-domain/admin.php
2. Login with admin/admin123
3. Edit and save
4. Changes sync to MongoDB automatically ✓

---

## 💡 Pro Tips

1. **Custom Domain**
   - ProfreeHost: Add custom domain in control panel
   - Railway: Add custom domain in project settings

2. **SSL/HTTPS**
   - ProfreeHost: Usually automatic
   - Railway: Automatic HTTPS

3. **Backups**
   - Your MongoDB data is in MongoDB Atlas (cloud backup)
   - Regular backups recommended

4. **Analytics**
   - Can add Google Analytics to `index.php` `<head>` section
   - Backend logs available in Railway dashboard

---

## 🎯 Summary

| Component | Host | Status |
|-----------|------|--------|
| Frontend (PHP) | ProfreeHost | ✅ Can Deploy |
| Backend (Node.js) | Railway | ✅ Can Deploy |
| Database (MongoDB) | MongoDB Atlas | ✅ Already Set Up |
| Admin Panel | ProfreeHost | ✅ Works |
| API Calls | Railway | ✅ Connected |

**Total Cost:** Free (ProfreeHost + Railway + MongoDB Atlas free tier)

---

## 📞 Support

### If Having Issues:

1. Check Railway logs (see Monitoring section)
2. Check browser console errors (F12)
3. Verify all URLs are updated
4. Test API directly:
   ```
   https://your-railway-url.up.railway.app/api/health
   ```

---

## Next Steps

1. Create Railway account
2. Deploy backend
3. Get Railway URL
4. Update API_URL in script.js and admin.js
5. Upload frontend to ProfreeHost
6. Test everything works!

Your portfolio is now ready for production! 🚀
