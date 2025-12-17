<?php
require_once 'config.php';

class Database {
    private $conn;
    
    public function __construct() {
        try {
            $this->conn = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );
        } catch(PDOException $e) {
            // Try SQLite fallback if MySQL not available
            try {
                $dbPath = __DIR__ . '/portfolio.db';
                $this->conn = new PDO("sqlite:" . $dbPath);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->initializeSQLite();
            } catch(PDOException $e2) {
                die(json_encode(['error' => 'Database connection failed: ' . $e2->getMessage()]));
            }
        }
    }
    
    private function initializeSQLite() {
        // Create tables if using SQLite
        $this->conn->exec("CREATE TABLE IF NOT EXISTS portfolio_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data_key TEXT UNIQUE NOT NULL,
            data_value TEXT NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
    }
    
    public function getConnection() {
        return $this->conn;
    }
    
    public function getPortfolioData() {
        try {
            $stmt = $this->conn->prepare("SELECT data_value FROM portfolio_data WHERE data_key = 'portfolio' LIMIT 1");
            $stmt->execute();
            $result = $stmt->fetch();
            
            if ($result) {
                return json_decode($result['data_value'], true);
            }
            
            // Return default data if not found
            return $this->getDefaultData();
        } catch(PDOException $e) {
            error_log($e->getMessage());
            return $this->getDefaultData();
        }
    }
    
    public function savePortfolioData($data) {
        try {
            $jsonData = json_encode($data);
            
            // Check if record exists
            $stmt = $this->conn->prepare("SELECT id FROM portfolio_data WHERE data_key = 'portfolio'");
            $stmt->execute();
            $exists = $stmt->fetch();
            
            if ($exists) {
                // Update existing
                $stmt = $this->conn->prepare("UPDATE portfolio_data SET data_value = ?, updated_at = CURRENT_TIMESTAMP WHERE data_key = 'portfolio'");
                $stmt->execute([$jsonData]);
            } else {
                // Insert new
                $stmt = $this->conn->prepare("INSERT INTO portfolio_data (data_key, data_value) VALUES ('portfolio', ?)");
                $stmt->execute([$jsonData]);
            }
            
            return ['success' => true, 'message' => 'Data saved successfully'];
        } catch(PDOException $e) {
            error_log($e->getMessage());
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    private function getDefaultData() {
        return [
            "hero" => [
                "navName" => "Your Name",
                "title" => "Welcome to My Portfolio",
                "subtitle" => "Full Stack Developer",
                "description" => "Building innovative solutions for tomorrow's challenges"
            ],
            "about" => [
                "image" => "https://via.placeholder.com/400",
                "name" => "Your Name",
                "role" => "Professional Title",
                "description" => "Passionate about creating performant, accessible, and beautiful web products.",
                "stats" => [
                    "experience" => "5+",
                    "projects" => "50+",
                    "clients" => "30+"
                ]
            ],
            "skills" => [
                [
                    "id" => 1,
                    "name" => "JavaScript",
                    "icon" => "fa-js",
                    "description" => "ES6+, Node.js, frameworks",
                    "level" => 90
                ],
                [
                    "id" => 2,
                    "name" => "HTML/CSS",
                    "icon" => "fa-html5",
                    "description" => "Semantic HTML, modern CSS",
                    "level" => 92
                ],
                [
                    "id" => 3,
                    "name" => "React",
                    "icon" => "fa-react",
                    "description" => "Hooks, state management",
                    "level" => 85
                ]
            ],
            "projects" => [
                [
                    "id" => 1,
                    "title" => "Portfolio Website",
                    "description" => "Modern, animated personal portfolio",
                    "image" => "https://picsum.photos/seed/portfolio/600/400",
                    "tags" => ["HTML", "CSS", "JavaScript"],
                    "category" => "web",
                    "github" => "#",
                    "demo" => "#"
                ]
            ],
            "experience" => [
                [
                    "id" => 1,
                    "title" => "Software Engineer",
                    "company" => "Tech Company",
                    "date" => "2023 - Present",
                    "description" => "Building features and improving performance"
                ]
            ],
            "testimonials" => [
                [
                    "id" => 1,
                    "name" => "Jane Doe",
                    "role" => "Product Manager",
                    "avatar" => "https://i.pravatar.cc/80?img=12",
                    "content" => "Delivers high quality work on time.",
                    "rating" => 5
                ]
            ],
            "certifications" => [
                [
                    "id" => 1,
                    "title" => "Web Development Certificate",
                    "issuer" => "Certification Authority",
                    "date" => "2023",
                    "icon" => "fa-award"
                ]
            ],
            "contact" => [
                "email" => "you@example.com",
                "phone" => "+1 555 123 4567",
                "location" => "Your City",
                "social" => [
                    "linkedin" => "#",
                    "github" => "#",
                    "twitter" => "#",
                    "instagram" => "#"
                ]
            ],
            "resumeUrl" => "#"
        ];
    }
}
