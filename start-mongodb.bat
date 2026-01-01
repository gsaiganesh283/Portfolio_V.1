@echo off
REM Portfolio MongoDB Quick Start Script (Windows)

echo.
echo ==========================================
echo   Portfolio MongoDB Setup ^& Start
echo ==========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo X Node.js is not installed. Please install it first:
    echo   https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo + Node.js found: %NODE_VERSION%
echo.

REM Check if MongoDB is running
echo Checking MongoDB connection...
netstat -an | find "27017" >nul 2>nul
if %errorlevel% equ 0 (
    echo + MongoDB is running on localhost:27017
    goto setup_backend
) else (
    echo W MongoDB is not running
    echo.
    echo Choose an option:
    echo   1) Start MongoDB service
    echo   2) Start MongoDB with Docker
    echo   3) Use MongoDB Atlas (cloud)
    echo   4) Skip (continue anyway)
    echo.
    set /p choice="Enter your choice (1-4): "
    
    if "!choice!"=="1" (
        echo.
        echo Attempting to start MongoDB service...
        net start MongoDB >nul 2>nul
        if %errorlevel% equ 0 (
            echo + MongoDB service started
            timeout /t 3
            goto setup_backend
        ) else (
            echo X MongoDB service not found
            echo Please install MongoDB first:
            echo   https://www.mongodb.com/try/download/community
            pause
            exit /b 1
        )
    ) else if "!choice!"=="2" (
        echo.
        where docker >nul 2>nul
        if %errorlevel% neq 0 (
            echo X Docker is not installed
            echo Install Docker: https://www.docker.com/products/docker-desktop
            pause
            exit /b 1
        )
        echo Starting MongoDB with Docker...
        docker run -d -p 27017:27017 --name portfolio-mongodb mongo:latest
        echo + MongoDB started in Docker
        timeout /t 3
        goto setup_backend
    ) else if "!choice!"=="3" (
        echo.
        echo MongoDB Atlas (Cloud):
        echo   1. Sign up: https://www.mongodb.com/cloud/atlas
        echo   2. Create a free cluster
        echo   3. Get your connection string
        echo   4. Create server\.env and add:
        echo      MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio_db
        echo.
        pause
        exit /b 0
    ) else if "!choice!"=="4" (
        echo Continuing anyway...
    ) else (
        echo Invalid choice
        pause
        exit /b 1
    )
)

:setup_backend
echo.
echo ==========================================
echo   Starting Portfolio Backend Server
echo ==========================================
echo.

REM Navigate to server directory
cd /d "%~dp0server"

REM Check if .env exists
if not exist .env (
    echo Creating .env from template...
    if exist .env.example (
        copy .env.example .env >nul
        echo + Created .env file
    ) else (
        echo W .env.example not found
    )
)

REM Install dependencies if needed
if not exist node_modules (
    echo.
    echo Installing Node.js dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo X Failed to install dependencies
        pause
        exit /b 1
    )
    echo + Dependencies installed
)

REM Start the server
echo.
echo Starting server...
echo.
call npm start
pause
