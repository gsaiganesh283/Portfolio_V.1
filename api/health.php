<?php
require_once 'config.php';

http_response_code(200);
echo json_encode([
    'status' => 'ok',
    'message' => 'API is running',
    'timestamp' => date('Y-m-d H:i:s')
]);
