#!/bin/bash

# Script to help generate GitHub Actions secrets for automated APK builds
# This script will generate base64 encoded versions of your keystore and google-services.json files

echo "🔐 GitHub Actions Secrets Generator"
echo "=================================="
echo ""

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored text
print_color() {
    printf "${1}${2}${NC}\n"
}

print_color $BLUE "This script will help you generate the required secrets for GitHub Actions APK release workflow."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_color $RED "❌ Error: This script should be run from the project root directory."
    print_color $YELLOW "Please navigate to your React Native project root and run this script again."
    exit 1
fi

echo "📱 Required secrets for automated APK release:"
echo "1. RELEASE_KEYSTORE_BASE64 - Base64 encoded keystore file"
echo "2. RELEASE_STORE_PASSWORD - Keystore store password"
echo "3. RELEASE_KEY_ALIAS - Key alias name"
echo "4. RELEASE_KEY_PASSWORD - Key password"
echo "5. GOOGLE_SERVICES_BASE64 - Base64 encoded google-services.json file"
echo "6. GOOGLE_WEB_CLIENT_ID - Google Web Client ID for authentication"
echo "7. GOOGLE_GEMINI_API_KEY - Google Gemini API key for AI features"
echo ""

# Check for keystore file
KEYSTORE_FILE=""
if [ -f "android/app/my-release-key.jks" ]; then
    KEYSTORE_FILE="android/app/my-release-key.jks"
elif [ -f "android/app/release-key.jks" ]; then
    KEYSTORE_FILE="android/app/release-key.jks"
elif [ -f "android/app/debug.keystore" ]; then
    KEYSTORE_FILE="android/app/debug.keystore"
    print_color $YELLOW "⚠️  Found debug keystore. For production, you should create a release keystore."
fi

if [ -n "$KEYSTORE_FILE" ]; then
    print_color $GREEN "✅ Found keystore file: $KEYSTORE_FILE"
    echo ""
    print_color $BLUE "🔑 RELEASE_KEYSTORE_BASE64 (copy this to GitHub secrets):"
    echo "=============================================="
    base64 -i "$KEYSTORE_FILE" 2>/dev/null || base64 < "$KEYSTORE_FILE"
    echo ""
    echo "=============================================="
else
    print_color $RED "❌ No keystore file found in android/app/"
    print_color $YELLOW "💡 To create a release keystore, run:"
    echo "   keytool -genkeypair -v -storetype PKCS12 -keystore android/app/my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias"
    echo ""
fi

# Check for google-services.json
if [ -f "android/app/google-services.json" ]; then
    print_color $GREEN "✅ Found google-services.json file"
    echo ""
    print_color $BLUE "🔥 GOOGLE_SERVICES_BASE64 (copy this to GitHub secrets):"
    echo "=============================================="
    base64 -i "android/app/google-services.json" 2>/dev/null || base64 < "android/app/google-services.json"
    echo ""
    echo "=============================================="
else
    print_color $YELLOW "⚠️  google-services.json not found in android/app/"
    if [ -f "android/app/google-services-template.json" ]; then
        print_color $BLUE "💡 Found template file. Please:"
        echo "   1. Configure your Firebase project"
        echo "   2. Download the real google-services.json from Firebase Console"
        echo "   3. Replace the template file"
        echo "   4. Run this script again"
    else
        print_color $YELLOW "💡 Please download google-services.json from Firebase Console and place it in android/app/"
    fi
    echo ""
fi

# Check for .env file and extract environment variables
if [ -f ".env" ]; then
    print_color $GREEN "✅ Found .env file"
    echo ""
    
    # Extract environment variables
    GOOGLE_WEB_CLIENT_ID=$(grep "^GOOGLE_WEB_CLIENT_ID=" .env 2>/dev/null | cut -d'=' -f2)
    GOOGLE_GEMINI_API_KEY=$(grep "^GOOGLE_GEMINI_API_KEY=" .env 2>/dev/null | cut -d'=' -f2)
    
    if [ -n "$GOOGLE_WEB_CLIENT_ID" ]; then
        print_color $BLUE "🌐 GOOGLE_WEB_CLIENT_ID (copy this to GitHub secrets):"
        echo "=============================================="
        echo "$GOOGLE_WEB_CLIENT_ID"
        echo "=============================================="
        echo ""
    fi
    
    if [ -n "$GOOGLE_GEMINI_API_KEY" ]; then
        print_color $BLUE "🤖 GOOGLE_GEMINI_API_KEY (copy this to GitHub secrets):"
        echo "=============================================="
        echo "$GOOGLE_GEMINI_API_KEY"
        echo "=============================================="
        echo ""
    fi
    
    if [ -z "$GOOGLE_WEB_CLIENT_ID" ] && [ -z "$GOOGLE_GEMINI_API_KEY" ]; then
        print_color $YELLOW "⚠️  No Google environment variables found in .env file"
        echo "   Expected: GOOGLE_WEB_CLIENT_ID, GOOGLE_GEMINI_API_KEY"
    fi
else
    print_color $YELLOW "⚠️  .env file not found"
    print_color $BLUE "💡 If you have Google services integration, create a .env file with:"
    echo "   GOOGLE_WEB_CLIENT_ID=your_web_client_id"
    echo "   GOOGLE_GEMINI_API_KEY=your_gemini_api_key"
    echo ""
fi

echo ""
print_color $BLUE "📝 Instructions:"
echo "1. Copy the base64 values above"
echo "2. Go to your GitHub repository Settings > Secrets and variables > Actions"
echo "3. Click 'New repository secret'"
echo "4. Add each secret with the exact names shown above"
echo ""

print_color $GREEN "🚀 Once secrets are added, your GitHub Actions workflow will automatically:"
echo "   • Build release APKs when PRs with 'release' label are merged"
echo "   • Create GitHub releases with version management"
echo "   • Handle keystore, Firebase, and environment configuration securely"
echo ""

# Check if all required files/variables are present
HAS_KEYSTORE=""
HAS_GOOGLE_SERVICES=""
HAS_ENV_VARS=""

if [ -n "$KEYSTORE_FILE" ]; then
    HAS_KEYSTORE="✅"
else
    HAS_KEYSTORE="❌"
fi

if [ -f "android/app/google-services.json" ]; then
    HAS_GOOGLE_SERVICES="✅"
else
    HAS_GOOGLE_SERVICES="❌"
fi

if [ -f ".env" ] && [ -n "$(grep -E "^GOOGLE_(WEB_CLIENT_ID|GEMINI_API_KEY)=" .env 2>/dev/null)" ]; then
    HAS_ENV_VARS="✅"
else
    HAS_ENV_VARS="❌"
fi

echo "📋 Setup Checklist:"
echo "   $HAS_KEYSTORE Keystore file"
echo "   $HAS_GOOGLE_SERVICES Google Services configuration"
echo "   $HAS_ENV_VARS Environment variables (.env)"
echo ""

if [ -n "$KEYSTORE_FILE" ] && [ -f "android/app/google-services.json" ]; then
    print_color $GREEN "✅ Core files found! You're ready to set up automated releases."
    if [ "$HAS_ENV_VARS" = "❌" ]; then
        print_color $YELLOW "💡 Consider adding environment variables for Google services integration."
    fi
else
    print_color $YELLOW "⚠️  Some core files are missing. Please follow the instructions above."
fi
