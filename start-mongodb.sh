#!/bin/bash

# Portfolio MongoDB Quick Start Script
# This script helps set up MongoDB and start the backend server

echo "=========================================="
echo "  Portfolio MongoDB Setup & Start"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it first:"
    echo "   https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js found: $(node --version)"
echo ""

# Check if MongoDB is running
echo "Checking MongoDB connection..."
if nc -zv localhost 27017 2>/dev/null; then
    echo "✓ MongoDB is running on localhost:27017"
    MONGO_READY=true
elif command -v mongosh &> /dev/null; then
    echo "⚠ MongoDB might not be running. Attempting to start..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew services start mongodb-community 2>/dev/null
        sleep 2
        echo "✓ MongoDB started via Homebrew"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo systemctl start mongodb 2>/dev/null
        echo "✓ MongoDB started via systemctl"
    fi
    MONGO_READY=true
else
    echo "⚠ MongoDB is not installed or not running"
    echo ""
    echo "Choose an option:"
    echo "  1) Continue with Docker MongoDB"
    echo "  2) Install MongoDB locally (instructions)"
    echo "  3) Use MongoDB Atlas (cloud)"
    echo ""
    read -p "Enter your choice (1-3): " choice
    
    case $choice in
        1)
            echo ""
            echo "Starting MongoDB with Docker..."
            if command -v docker &> /dev/null; then
                docker run -d -p 27017:27017 --name portfolio-mongodb mongo:latest 2>/dev/null
                sleep 3
                echo "✓ MongoDB started in Docker"
                MONGO_READY=true
            else
                echo "❌ Docker is not installed. Please install Docker first:"
                echo "   https://www.docker.com/products/docker-desktop"
                exit 1
            fi
            ;;
        2)
            echo ""
            echo "Install MongoDB Community Edition:"
            echo "  - Windows: https://www.mongodb.com/try/download/community"
            echo "  - macOS:   brew install mongodb-community"
            echo "  - Linux:   sudo apt-get install mongodb"
            echo ""
            echo "After installing, run this script again."
            exit 0
            ;;
        3)
            echo ""
            echo "MongoDB Atlas (Cloud):"
            echo "  1. Sign up: https://www.mongodb.com/cloud/atlas"
            echo "  2. Create a free cluster"
            echo "  3. Get your connection string"
            echo "  4. Create server/.env and add your URI:"
            echo "     MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio_db"
            echo ""
            echo "After setup, run this script again."
            exit 0
            ;;
        *)
            echo "Invalid choice"
            exit 1
            ;;
    esac
fi

echo ""
echo "=========================================="
echo "  Starting Portfolio Backend Server"
echo "=========================================="
echo ""

# Navigate to server directory
cd "$(dirname "$0")/server"

# Check if .env exists
if [ ! -f .env ]; then
    echo "Creating .env from template..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✓ Created .env file"
    else
        echo "⚠ .env.example not found"
    fi
fi

# Install dependencies if needed
if [ ! -d node_modules ]; then
    echo ""
    echo "Installing Node.js dependencies..."
    npm install
    echo "✓ Dependencies installed"
fi

# Start the server
echo ""
echo "Starting server..."
echo ""
npm start
