# Schedule Kit - Attendance & Timetable Manager

A comprehensive **React Native** attendance tracking and timetable management application. Schedule Kit empowers users to efficiently monitor attendance, manage class schedules, and optimize their academic planning with AI-powered features. Built with modern React Native architecture, it delivers a seamless experience across both Android and iOS platforms.

## 🚀 Features

### 📊 Core Functionality
- **Smart Attendance Tracking**: Mark attendance with visual progress indicators and percentage calculations
- **Dynamic Timetable Management**: Create, edit, and manage class schedules with time slot optimization
- **AI-Powered Scheduling**: Generate optimized timetables instantly using Google's Gemini AI
- **Multi-Register Support**: Organize different courses, subjects, or events in separate registers
- **Visual Progress Tracking**: Beautiful conic gradient progress indicators for attendance percentages

### 📱 User Experience
- **Intuitive Card-Based Interface**: Clean, modern card design for easy attendance management
- **Interactive Calendar**: Month view calendar with attendance marking and date selection
- **Customizable Color Tags**: Personalize cards with 11 different color options
- **Swipe Gestures**: Smooth navigation with gesture-based interactions
- **Real-time Animations**: Fluid animations using React Native Animatable

### 🔧 Advanced Features
- **CSV Data Import/Export**: Import student lists and export attendance reports
- **Cloud Synchronization**: Firebase integration for cross-device data sync
- **Google Authentication**: Secure login with Google Sign-In
- **Target-Based Tracking**: Set attendance targets and get visual feedback
- **Undo Functionality**: Revert attendance changes with built-in undo system
- **Offline Support**: Local data storage with AsyncStorage

## 🛠️ Tech Stack

### Frontend
- **React Native 0.78.0** - Cross-platform mobile development
- **TypeScript** - Type-safe development
- **React Navigation 7.x** - Navigation with stack, drawer, and tab navigators
- **React Native SVG** - Custom gradient visualizations and icons
- **React Native Animatable** - Smooth animations and transitions
- **React Hook Form** - Efficient form handling

### Backend/Services
- **Firebase Suite**:
  - Firebase Auth - User authentication
  - Firestore - Real-time database
- **Google Gemini AI** - AI-powered scheduling
- **Google Sign-In** - OAuth authentication

### State Management & Storage
- **Zustand** - Lightweight state management
- **AsyncStorage** - Local data persistence
- **React Native MMKV** - High-performance key-value storage

### Development Tools
- **Metro** - React Native bundler
- **Jest** - Testing framework
- **ESLint** - Code linting
- **TypeScript Config** - Type checking
- **Babel** - JavaScript compilation

### Mobile/Desktop
- **Android SDK** - Android development
- **iOS SDK** - iOS development
- **React Native CLI** - Command-line tools
- **Gradle** - Android build system
- **CocoaPods** - iOS dependency management

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Cards/           # Card components with gradient visuals
│   ├── Calendar.tsx     # Calendar functionality
│   ├── Header.tsx       # Navigation header
│   └── Sidebar.tsx      # Navigation drawer
├── screens/             # Application screens
│   ├── HomeScreen.tsx   # Main dashboard
│   ├── AddCard.tsx      # Create new attendance cards
│   ├── EditCard.tsx     # Edit existing cards
│   └── AiScreen.tsx     # AI scheduling interface
├── store/               # State management
│   └── store.ts         # Zustand store configuration
├── utils/               # Utility functions
│   ├── auth-services.ts # Authentication helpers
│   ├── csv-picker.ts    # CSV import/export
│   └── functions.ts     # General utilities
├── types/               # TypeScript type definitions
├── styles/              # Shared styling
└── assets/              # Images, icons, and screenshots
```

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (v16.0.0 or later)
- **React Native CLI** or **Expo CLI**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)
- **Java Development Kit (JDK)** 11 or later

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/anisharma07/Schedule-Kit.git
cd Schedule-Kit

# Install dependencies
npm install
# or
yarn install

# Install iOS dependencies (macOS only)
cd ios && pod install && cd ..

# Set up Firebase configuration
# 1. Create a Firebase project at https://console.firebase.google.com
# 2. Add Android/iOS apps to your Firebase project
# 3. Download google-services.json (Android) and GoogleService-Info.plist (iOS)
# 4. Place files in respective platform directories

# Create environment file
cp .env.example .env
# Add your API keys and configuration
```

## 🎯 Usage

### Development

```bash
# Start Metro bundler
npm start
# or
yarn start

# Run on Android (ensure emulator is running or device is connected)
npm run android
# or
yarn android

# Run on iOS (macOS only)
npm run ios
# or
yarn ios

# Run tests
npm test
# or
yarn test
```

### Production

```bash
# Build for Android
cd android
./gradlew assembleRelease

# Build for iOS
# Use Xcode to archive and export the app
```

### Mobile Development

**Android Setup:**
1. Install Android Studio
2. Set up Android SDK and AVD Manager
3. Create virtual device or connect physical device
4. Enable USB debugging on physical device

**iOS Setup:**
1. Install Xcode (macOS required)
2. Set up iOS Simulator
3. Configure Apple Developer account for device testing

## 📱 Platform Support

- ✅ **Android** (API level 21+)
- ✅ **iOS** (iOS 12.0+)
- 📱 **Responsive Design** for various screen sizes
- 🌙 **Dark Mode** optimized interface

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- App.test.tsx
```

The project includes:
- Component testing with React Test Renderer
- Jest configuration for React Native
- TypeScript support in tests

## 🔄 Deployment

### Android
```bash
# Generate signed APK
cd android
./gradlew assembleRelease

# The APK will be generated in:
# android/app/build/outputs/apk/release/app-release.apk
```

### iOS
1. Open project in Xcode
2. Select "Product" → "Archive"
3. Use Organizer to distribute to App Store or TestFlight

### CI/CD Integration
The project is configured for:
- GitHub Actions workflows
- Automated testing on push/PR
- Release APK generation

## 📊 Performance & Optimization

- **Lazy Loading**: Components loaded on-demand
- **Optimized Animations**: 60fps animations with React Native Animatable
- **Memory Management**: Efficient state management with Zustand
- **Bundle Optimization**: Tree shaking and dead code elimination
- **Image Optimization**: Compressed assets for faster loading

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- **Code Style**: Follow the existing ESLint configuration
- **TypeScript**: Maintain type safety across all components
- **Component Structure**: Use functional components with hooks
- **State Management**: Use Zustand for global state, local state for component-specific data
- **Testing**: Write tests for new components and utilities
- **Documentation**: Update README for significant changes

### Commit Convention
```
feat: add new attendance tracking feature
fix: resolve calendar date selection issue
docs: update installation instructions
style: improve card component styling
test: add calendar component tests
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Firebase** for backend services and authentication
- **Google AI** for Gemini integration
- **React Native Community** for excellent libraries and tools
- **Design Inspiration**: Figma design available at [project link](https://www.figma.com/design/k0Mi0n6jNWGK5l1Jss1jbb/Untitled)

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/anisharma07/Schedule-Kit/issues)
- **Discussions**: [GitHub Discussions](https://github.com/anisharma07/Schedule-Kit/discussions)
- **Download**: [Latest APK Release](https://github.com/anisharma07/React-native-attendance-app/releases/download/v1.0.4/app-release.apk)

---

**Built with ❤️ using React Native and TypeScript**