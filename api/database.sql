-- Portfolio Database Schema for MySQL
-- Run this script to create the database and tables

CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

-- Main portfolio data table (JSON storage approach)
CREATE TABLE IF NOT EXISTS portfolio_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_key VARCHAR(50) UNIQUE NOT NULL,
    data_value LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_data_key (data_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default portfolio data
INSERT INTO portfolio_data (data_key, data_value) VALUES (
    'portfolio',
    '{
        "hero": {
            "navName": "Your Name",
            "title": "Welcome to My Portfolio",
            "subtitle": "Full Stack Developer",
            "description": "Building innovative solutions for tomorrow''s challenges"
        },
        "about": {
            "image": "https://via.placeholder.com/400",
            "name": "Your Name",
            "role": "Professional Title",
            "description": "Passionate about creating performant, accessible, and beautiful web products.",
            "stats": {
                "experience": "5+",
                "projects": "50+",
                "clients": "30+"
            }
        },
        "skills": [
            {"id": 1, "name": "JavaScript", "icon": "fa-js", "description": "ES6+, Node.js", "level": 90},
            {"id": 2, "name": "HTML/CSS", "icon": "fa-html5", "description": "Semantic HTML", "level": 92},
            {"id": 3, "name": "React", "icon": "fa-react", "description": "Hooks, state", "level": 85}
        ],
        "projects": [
            {
                "id": 1,
                "title": "Portfolio Website",
                "description": "Modern portfolio",
                "image": "https://picsum.photos/seed/portfolio/600/400",
                "tags": ["HTML", "CSS", "JS"],
                "category": "web",
                "github": "#",
                "demo": "#"
            }
        ],
        "experience": [
            {
                "id": 1,
                "title": "Software Engineer",
                "company": "Tech Company",
                "date": "2023 - Present",
                "description": "Building features"
            }
        ],
        "testimonials": [
            {
                "id": 1,
                "name": "Jane Doe",
                "role": "Product Manager",
                "avatar": "https://i.pravatar.cc/80?img=12",
                "content": "Great work!",
                "rating": 5
            }
        ],
        "certifications": [
            {
                "id": 1,
                "title": "Web Development",
                "issuer": "CertAuth",
                "date": "2023",
                "icon": "fa-award"
            }
        ],
        "contact": {
            "email": "you@example.com",
            "phone": "+1 555 123 4567",
            "location": "Your City",
            "social": {
                "linkedin": "#",
                "github": "#",
                "twitter": "#",
                "instagram": "#"
            }
        },
        "resumeUrl": "#"
    }'
) ON DUPLICATE KEY UPDATE data_value = data_value;
