#!/bin/bash

echo "🚀 Setting up Accounting Project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

# Create environment files if they don't exist
echo "🔧 Setting up environment files..."

# Server environment file
if [ ! -f "server/config.env" ]; then
    echo "Creating server config.env..."
    cat > server/config.env << EOF
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/acc_project
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=24h
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EOF
fi

# Client environment file
if [ ! -f "client/.env" ]; then
    echo "Creating client .env..."
    cat > client/.env << EOF
VITE_API_URL=http://localhost:5000/api
EOF
fi

echo "✅ Environment files created"

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p server/uploads/licenses
mkdir -p server/uploads/agreements
mkdir -p server/uploads/invoices
mkdir -p server/uploads/documents

echo "✅ Uploads directory created"

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Make sure MongoDB is running on localhost:27017"
echo "2. Start the development servers: npm run dev"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "Happy coding! 🚀" 