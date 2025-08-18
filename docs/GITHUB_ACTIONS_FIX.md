# GitHub Actions APK Build Fix

## Problem

The GitHub Actions workflow was failing with the error:

```
File google-services.json is missing.
The Google Services Plugin cannot function without it.
```

This happened because the workflow was building an Android APK that requires Firebase/Google Services configuration, but the `google-services.json` file wasn't being created during the build process.

## Solution Implemented

### 1. Updated GitHub Actions Workflow

- **File**: `.github/workflows/release-apk.yml`
- **Changes**:
  - Added step to create `google-services.json` from base64 encoded secret
  - Added step to create `.env` file with environment variables from secrets
  - Added error handling for missing secrets
  - Added cleanup step to remove sensitive files after build

### 2. Created Helper Script

- **File**: `scripts/generate-secrets.sh`
- **Purpose**: Automatically generates the required base64 encoded secrets for GitHub Actions
- **Features**:
  - Detects existing keystore and google-services.json files
  - Generates base64 encoded versions
  - Provides clear instructions for adding secrets to GitHub

### 3. Updated Documentation

- **File**: `README.md`
- **Added**: Complete section on GitHub Actions deployment setup
- **Includes**: Step-by-step instructions for adding secrets and using the helper script

## Required GitHub Secrets

The workflow now requires these secrets to be added to your GitHub repository:

### Keystore Secrets

- `RELEASE_KEYSTORE_BASE64`: Base64 encoded keystore file (.jks)
- `RELEASE_STORE_PASSWORD`: Keystore store password
- `RELEASE_KEY_ALIAS`: Key alias name
- `RELEASE_KEY_PASSWORD`: Key password

### Firebase Secret

- `GOOGLE_SERVICES_BASE64`: Base64 encoded google-services.json file

### Environment Secrets

- `GOOGLE_WEB_CLIENT_ID`: Google Web Client ID for authentication
- `GOOGLE_GEMINI_API_KEY`: Google Gemini API key for AI features

## How to Use

### Quick Setup (Recommended)

```bash
# Run from project root
./scripts/generate-secrets.sh
```

This script will:

1. Find your keystore and google-services.json files
2. Generate base64 encoded versions
3. Display them for easy copy/paste into GitHub secrets

### Manual Setup

1. Encode your files:

   ```bash
   base64 -i android/app/my-release-key.jks
   base64 -i android/app/google-services.json
   ```

2. Add secrets to GitHub:
   - Go to repository Settings > Secrets and variables > Actions
   - Add each secret with the exact names listed above

### Triggering Releases

The workflow automatically triggers when:

- A PR is merged to `main` with a `release` label, OR
- A PR title contains `[release]`

Version bumping is automatic based on PR title:

- `[major]` - Major version bump (1.0.0 → 2.0.0)
- `[minor]` - Minor version bump (1.0.0 → 1.1.0)
- Default - Patch version bump (1.0.0 → 1.0.1)

## Security Features

- All sensitive files (keystore, google-services.json, .env) are automatically cleaned up after build
- Secrets are stored securely in GitHub and only accessible during build
- Environment variables are masked in GitHub Actions logs
- Files are only created temporarily during the build process

## Testing

The helper script has been tested and successfully:

- ✅ Detects existing keystore file (`android/app/my-release-key.jks`)
- ✅ Detects existing google-services.json file
- ✅ Detects environment variables from .env file
- ✅ Generates proper base64 encoded versions
- ✅ Extracts Google Web Client ID and Gemini API key
- ✅ Provides clear instructions and setup checklist

The workflow is now ready for automated APK releases with full environment support!
