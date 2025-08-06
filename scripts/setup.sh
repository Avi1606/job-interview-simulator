#!/bin/bash

# Job Interview Simulator Setup Script

echo "🚀 Setting up Job Interview Simulator..."

# Check for required tools
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi
echo "✅ Node.js $(node -v) is installed"

# Check Java
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17+ and try again."
    exit 1
fi

JAVA_VERSION=$(java -version 2>&1 | head -n 1 | awk -F '"' '{print $2}' | cut -d '.' -f 1)
if [ "$JAVA_VERSION" -lt 17 ]; then
    echo "❌ Java version 17+ is required. Current version: $JAVA_VERSION"
    exit 1
fi
echo "✅ Java $(java -version 2>&1 | head -n 1) is installed"

# Check Maven
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install Maven and try again."
    exit 1
fi
echo "✅ Maven $(mvn -version | head -n 1 | awk '{print $3}') is installed"

# Check MongoDB
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed locally. You can:"
    echo "   1. Install MongoDB locally"
    echo "   2. Use Docker Compose (recommended)"
    echo "   3. Use a cloud MongoDB service"
fi

# Setup Frontend
echo ""
echo "🎨 Setting up Frontend..."
cd frontend || exit 1

if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Frontend dependency installation failed"
        exit 1
    fi
else
    echo "✅ Frontend dependencies already installed"
fi

echo "🏗️  Building frontend..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi
echo "✅ Frontend built successfully"

# Setup Backend
echo ""
echo "⚙️  Setting up Backend..."
cd ../backend || exit 1

echo "📦 Installing backend dependencies and building..."
mvn clean install -DskipTests
if [ $? -ne 0 ]; then
    echo "❌ Backend build failed"
    exit 1
fi
echo "✅ Backend built successfully"

# Create uploads directory
mkdir -p ../uploads
echo "✅ Created uploads directory"

# Setup environment files
cd ..
echo ""
echo "🔧 Setting up environment files..."

# Create frontend .env if it doesn't exist
if [ ! -f "frontend/.env" ]; then
    cat > frontend/.env << EOF
VITE_API_URL=http://localhost:8080/api
EOF
    echo "✅ Created frontend/.env"
else
    echo "✅ frontend/.env already exists"
fi

# Create application-dev.yml if it doesn't exist
if [ ! -f "backend/src/main/resources/application-dev.yml" ]; then
    cat > backend/src/main/resources/application-dev.yml << EOF
spring:
  data:
    mongodb:
      host: localhost
      port: 27017
      database: interview_simulator_dev
  
  security:
    jwt:
      secret: mySecretKey123456789012345678901234567890
      expiration: 86400000

logging:
  level:
    com.interviewsimulator: DEBUG
EOF
    echo "✅ Created backend/src/main/resources/application-dev.yml"
else
    echo "✅ application-dev.yml already exists"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "🚀 To start the application:"
echo ""
echo "1. Start MongoDB (if using local installation):"
echo "   mongod"
echo ""
echo "2. Start the backend (in backend directory):"
echo "   cd backend && mvn spring-boot:run"
echo ""
echo "3. Start the frontend (in frontend directory):"
echo "   cd frontend && npm run dev"
echo ""
echo "4. Or use Docker Compose:"
echo "   docker-compose up -d"
echo ""
echo "📍 Application URLs:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:8080"
echo "   API Docs: http://localhost:8080/api"
echo ""
echo "Happy coding! 🎯"