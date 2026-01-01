<?php
/**
 * Portfolio API - PHP Backend with MongoDB
 * Handles GET/POST requests for portfolio data
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Load MongoDB manager
require_once __DIR__ . '/mongodb.php';

try {
    $mongoManager = getMongoDBManager();

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // GET /api/portfolio - Retrieve portfolio data
        $data = $mongoManager->getPortfolioData();
        
        if ($data) {
            http_response_code(200);
            echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        } else {
            http_response_code(404);
            echo json_encode([
                'error' => 'Portfolio data not found',
                'message' => 'Please initialize portfolio in admin panel'
            ]);
        }
    } 
    elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // POST /api/portfolio - Save portfolio data
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON input']);
            exit();
        }

        $result = $mongoManager->setPortfolioData($input);
        http_response_code(200);
        echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    }
    else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Server error',
        'message' => $e->getMessage()
    ]);
    error_log('API Error: ' . $e->getMessage());
}
?>
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
