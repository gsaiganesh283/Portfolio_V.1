<?php
require_once 'config.php';
require_once 'Database.php';

$db = new Database();

// GET request - retrieve portfolio data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $data = $db->getPortfolioData();
        echo json_encode($data);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to retrieve data: ' . $e->getMessage()]);
    }
    exit();
}

// POST request - save portfolio data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON data']);
            exit();
        }
        
        $result = $db->savePortfolioData($data);
        
        if ($result['success']) {
            echo json_encode([
                'success' => true,
                'message' => 'Portfolio updated successfully',
                'data' => $db->getPortfolioData()
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => $result['error']]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save data: ' . $e->getMessage()]);
    }
    exit();
}

// Method not allowed
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
