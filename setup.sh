#!/bin/bash

# Lambda Container Service Template Setup
# Interactive setup script for configuring the microservice template

set -e

echo "🚀 Lambda Container Service Template Setup"
echo "=========================================="
echo ""

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed."
    echo "Please install Node.js and try again."
    exit 1
fi

# Check if configuration file exists
CONFIG_FILE=".lcsconf.json"
EXAMPLE_FILE=".lcsconf.example.json"

if [ "$1" != "" ]; then
    CONFIG_FILE="$1"
fi

if [ ! -f "$CONFIG_FILE" ]; then
    echo "📋 Configuration file '$CONFIG_FILE' not found."
    
    if [ -f "$EXAMPLE_FILE" ]; then
        echo "🔄 Would you like to copy the example configuration? (y/N)"
        read -r response
        if [[ "$response" =~ ^[Yy]$ ]]; then
            cp "$EXAMPLE_FILE" "$CONFIG_FILE"
            echo "✅ Configuration file created: $CONFIG_FILE"
            echo "📝 Please edit $CONFIG_FILE with your project details and run setup again."
            echo ""
            echo "💡 Example configuration:"
            echo "   nano $CONFIG_FILE"
            echo "   ./setup.sh"
            exit 0
        fi
    fi
    
    echo ""
    echo "Please create a configuration file using $EXAMPLE_FILE as a template:"
    echo "  cp $EXAMPLE_FILE $CONFIG_FILE"
    echo "  nano $CONFIG_FILE"
    echo "  ./setup.sh"
    exit 1
fi

echo "📁 Using configuration file: $CONFIG_FILE"
echo ""

# Run the Node.js setup script
node setup.js "$CONFIG_FILE"

# Check if setup was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Setup completed! Your microservice is ready for development."
    echo ""
    echo "🔗 Quick commands:"
    echo "   npm install    # Install dependencies"
    echo "   npm run start:dev    # Start development server"
    echo "   npm run build       # Build for production"
    echo ""
else
    echo ""
    echo "❌ Setup failed. Please check the error messages above."
    exit 1
fi
