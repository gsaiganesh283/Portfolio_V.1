# Portfolio PHP API

A PHP-based REST API for the portfolio website with MySQL/SQLite database support.

## Features

- ✅ PHP 7.4+ compatible
- ✅ MySQL primary, SQLite fallback
- ✅ RESTful API endpoints
- ✅ CORS enabled
- ✅ JSON storage for flexibility

## Setup

### Option 1: Using MySQL

1. Create the database:
```bash
mysql -u root -p < api/database.sql
```

2. Update `api/config.php` with your MySQL credentials:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');
define('DB_NAME', 'portfolio_db');
```

### Option 2: Using SQLite (Automatic)

If MySQL is not available, the API will automatically use SQLite.
No configuration needed - it creates `api/portfolio.db` automatically.

## Running Locally

### With PHP Built-in Server

```bash
cd /workspaces/Portfolio_V.1
php -S localhost:8080
```

Then access:
- Portfolio: http://localhost:8080
- API Health: http://localhost:8080/api/health.php
- API Portfolio: http://localhost:8080/api/portfolio.php

### With Apache/Nginx

Place the entire project in your web root (e.g., `/var/www/html/`).

## API Endpoints

### Health Check
```
GET /api/health.php
```

Response:
```json
{
  "status": "ok",
  "message": "API is running",
  "timestamp": "2025-12-17 10:30:00"
}
```

### Get Portfolio Data
```
GET /api/portfolio.php
```

Response: Full portfolio JSON object

### Update Portfolio Data
```
POST /api/portfolio.php
Content-Type: application/json

{
  "hero": {...},
  "about": {...},
  ...
}
```

Response:
```json
{
  "success": true,
  "message": "Portfolio updated successfully",
  "data": {...}
}
```

## Database Structure

**Table: portfolio_data**

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| data_key | VARCHAR(50) | Unique key (e.g., 'portfolio') |
| data_value | LONGTEXT | JSON string of portfolio data |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## Frontend Integration

The portfolio pages automatically connect to the PHP API:
- `index.html` - Loads data from API
- `admin.html` - Saves data to API

No configuration needed when running on the same domain.

## Deployment

### Shared Hosting (cPanel, etc.)
1. Upload all files to public_html
2. Import `api/database.sql` via phpMyAdmin
3. Update `api/config.php` with your database credentials
4. Done!

### VPS/Cloud Server
1. Install Apache/Nginx + PHP + MySQL
2. Clone repository to web root
3. Run database.sql
4. Configure virtual host
5. Restart web server

## Troubleshooting

**Database connection failed**
- Check MySQL credentials in `api/config.php`
- Ensure MySQL service is running
- API will fallback to SQLite automatically

**CORS errors**
- Check `Access-Control-Allow-Origin` header in `api/config.php`
- Update to match your domain in production

**API not responding**
- Verify PHP version (7.4+ required)
- Check error logs: `tail -f /var/log/apache2/error.log`
- Enable display_errors in config.php for debugging

## Security Notes

For production:
1. Change admin credentials in `admin.js`
2. Implement proper authentication (JWT, sessions)
3. Use prepared statements (already implemented)
4. Enable HTTPS
5. Restrict CORS to your domain
6. Set secure database passwords
