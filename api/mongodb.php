<?php
/**
 * MongoDB Connection Module for PHP
 * Handles all MongoDB operations for the portfolio
 */

// Load environment variables
if (file_exists(__DIR__ . '/.env')) {
    $env = parse_ini_file(__DIR__ . '/.env');
    foreach ($env as $key => $value) {
        putenv("$key=$value");
    }
}

// Get MongoDB URI from environment
$mongodbUri = getenv('MONGODB_URI') ?: 'mongodb://localhost:27017';
$dbName = getenv('DB_NAME') ?: 'portfolio_db';
$collectionName = 'portfolio';

// Import MongoDB PHP library
require_once dirname(__DIR__) . '/vendor/autoload.php';

use MongoDB\Client;
use MongoDB\Exception\Exception as MongoException;

class MongoDBManager {
    private $client;
    private $database;
    private $collection;
    private $mongodbUri;
    private $dbName;
    private $collectionName;

    public function __construct($uri, $dbName, $collectionName) {
        $this->mongodbUri = $uri;
        $this->dbName = $dbName;
        $this->collectionName = $collectionName;
        $this->connect();
    }

    /**
     * Connect to MongoDB
     */
    private function connect() {
        try {
            // Create MongoDB client
            $this->client = new Client($this->mongodbUri, [
                'serverSelectionTimeoutMS' => 5000,
                'connectTimeoutMS' => 10000,
            ]);

            // Select database and collection
            $this->database = $this->client->{$this->dbName};
            $this->collection = $this->database->{$this->collectionName};

            // Verify connection by pinging the server
            $this->database->command(['ping' => 1]);
            
            error_log('✓ Successfully connected to MongoDB');
            return true;
        } catch (MongoException $e) {
            error_log('✗ MongoDB connection error: ' . $e->getMessage());
            throw new Exception('Failed to connect to MongoDB: ' . $e->getMessage());
        }
    }

    /**
     * Get portfolio data
     */
    public function getPortfolioData() {
        try {
            $document = $this->collection->findOne(['_id' => 'portfolio']);
            
            if ($document) {
                // Convert to array and remove MongoDB internal fields
                $data = $document->bsonSerialize();
                unset($data['_id']);
                unset($data['createdAt']);
                unset($data['updatedAt']);
                return (array) $data;
            }
            
            return null;
        } catch (MongoException $e) {
            error_log('Error retrieving portfolio data: ' . $e->getMessage());
            throw new Exception('Failed to retrieve portfolio data: ' . $e->getMessage());
        }
    }

    /**
     * Save/update portfolio data
     */
    public function setPortfolioData($data) {
        try {
            $updateData = [
                '$set' => array_merge($data, ['updatedAt' => new \MongoDB\BSON\UTCDateTime()])
            ];

            $result = $this->collection->updateOne(
                ['_id' => 'portfolio'],
                $updateData,
                ['upsert' => true]
            );

            return [
                'success' => true,
                'modifiedCount' => $result->getModifiedCount(),
                'upsertedId' => $result->getUpsertedId(),
                'message' => $result->getUpsertedId() ? 'Portfolio created' : 'Portfolio updated'
            ];
        } catch (MongoException $e) {
            error_log('Error saving portfolio data: ' . $e->getMessage());
            throw new Exception('Failed to save portfolio data: ' . $e->getMessage());
        }
    }

    /**
     * Check health/connection status
     */
    public function healthCheck() {
        try {
            $this->database->command(['ping' => 1]);
            return [
                'ok' => true,
                'database' => 'MongoDB',
                'status' => 'connected'
            ];
        } catch (MongoException $e) {
            return [
                'ok' => false,
                'database' => 'MongoDB',
                'status' => 'disconnected',
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Close connection
     */
    public function disconnect() {
        if ($this->client) {
            $this->client->close();
        }
    }
}

// Create singleton instance
$mongodbManager = null;

function getMongoDBManager() {
    global $mongodbManager;
    if (!$mongodbManager) {
        $mongodbUri = getenv('MONGODB_URI') ?: 'mongodb://localhost:27017';
        $dbName = getenv('DB_NAME') ?: 'portfolio_db';
        $mongodbManager = new MongoDBManager($mongodbUri, $dbName, 'portfolio');
    }
    return $mongodbManager;
}

// Register shutdown function to close connection
register_shutdown_function(function() {
    global $mongodbManager;
    if ($mongodbManager) {
        $mongodbManager->disconnect();
    }
});
?>
