# 🚀 Automated APK Release Workflow Setup

Quick setup guide for adding automated APK releases to any React Native project.

## 📋 Prerequisites

- React Native project with `android/` folder
- GitHub repository
- Android keystore file

## 🛠️ Setup Steps

### 1. Create Workflow Directory

```bash
mkdir -p .github/workflows
```

### 2. Add Workflow File

Copy the `release-apk.yml` workflow file to `.github/workflows/release-apk.yml`

### 3. Setup Android Keystore

```bash
# Generate keystore (if you don't have one)
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### 4. Configure GitHub Secrets

Go to **Settings > Secrets and variables > Actions** and add:

| Secret Name                 | Description                  | Example                      |
| --------------------------- | ---------------------------- | ---------------------------- |
| `RELEASE_KEYSTORE_BASE64`   | Base64 encoded keystore file | `cat keystore.jks \| base64` |
| `RELEASE_KEYSTORE_PASSWORD` | Keystore password            | `yourpassword`               |
| `RELEASE_KEY_ALIAS`         | Key alias name               | `upload`                     |
| `RELEASE_KEY_PASSWORD`      | Key password                 | `yourpassword`               |

### 5. Update Android Config

Add to `android/app/build.gradle`:

```gradle
android {
    signingConfigs {
        release {
            storeFile file('release-key.keystore')
            storePassword System.getenv('RELEASE_KEYSTORE_PASSWORD')
            keyAlias System.getenv('RELEASE_KEY_ALIAS')
            keyPassword System.getenv('RELEASE_KEY_PASSWORD')
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}
```

### 6. Create Keystore Properties (Optional)

Create `android/keystore.properties`:

```properties
storeFile=release-key.keystore
storePassword=yourpassword
keyAlias=upload
keyPassword=yourpassword
```

## 🎯 How to Trigger Release

### Method 1: PR Labels

1. Create a PR
2. Add `release` label
3. Merge the PR

### Method 2: PR Title

1. Create PR with title containing `[release]`
2. Merge the PR

### Version Bumping

- `[major]` or `BREAKING CHANGE` → Major version bump
- `[minor]`, `feat`, or `feature` → Minor version bump
- Default → Patch version bump

## 📦 What the Workflow Does

1. ✅ Detects release triggers
2. 📈 Auto-bumps version numbers
3. 🔨 Builds signed APK
4. 🏷️ Creates Git tag
5. 🎉 Creates GitHub release
6. 📱 Uploads APK as release asset

## 🔧 Customization

### Change Target Branch

```yaml
on:
  pull_request:
    branches: [main, develop] # Add your branches
```

### Different Package Managers

The workflow auto-detects:

- 📦 npm (package-lock.json)
- 🧶 yarn (yarn.lock)
- ⚡ pnpm (pnpm-lock.yaml)

### Custom Build Commands

Modify the build step in workflow:

```yaml
- name: 🔨 Build Release APK
  run: |
    cd android
    ./gradlew assembleRelease --no-daemon
```

## 🚨 Troubleshooting

### Common Issues:

**1. Keystore Issues**

```bash
# Verify keystore
keytool -list -v -keystore your-keystore.jks
```

**2. Build Failures**

- Check Java version (use JDK 17)
- Verify Android SDK setup
- Check Gradle wrapper permissions

**3. Version Conflicts**

- Ensure versionCode increments properly
- Check package.json version format

**4. Permission Errors**

- Verify GitHub token permissions
- Check repository settings

## 📱 Example Usage

1. Make changes to your RN app
2. Create PR: `feat: Add new login screen [minor]`
3. Add `release` label
4. Merge PR
5. ✨ Automated APK release created!

---

**💡 Pro Tip:** Test the workflow on a feature branch first before using on main!
