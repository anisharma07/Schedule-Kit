# Schedule Kit - Attendance & Time Table Manager

A modern **React Native** application designed for efficient attendance tracking and schedule management. Schedule Kit empowers students and educators to manage their academic schedules, track attendance patterns, and optimize their time with intelligent AI-powered features.

## 🚀 Features

- 📊 **Smart Attendance Tracking**: Intuitive interface for marking and tracking attendance across multiple subjects/classes
- 🎯 **Target-Based Analytics**: Set attendance percentage targets and monitor progress with visual indicators
- 📅 **Dynamic Timetable Management**: Create, edit, and manage class schedules with flexible time slots
- 🤖 **AI-Powered Scheduling**: Intelligent schedule optimization and automatic timetable generation (under development)
- 📈 **Visual Progress Tracking**: Beautiful conic gradient progress indicators and attendance analytics
- 🔄 **Multi-Register Support**: Organize different semesters, courses, or subjects in separate registers
- ☁️ **Cloud Synchronization**: Firebase integration for data backup and cross-device sync
- 📱 **Cross-Platform**: Native performance on both Android and iOS devices
- 🎨 **Customizable Interface**: Color-coded subjects and personalized themes
- 📤 **Data Export**: CSV export functionality for attendance records
- 🔔 **Smart Reminders**: Alerts for low attendance and upcoming classes

## 🛠️ Tech Stack

### Frontend
- **React Native 0.78.0** - Cross-platform mobile development
- **TypeScript** - Type-safe development
- **React Navigation 7.x** - Navigation management (Stack, Drawer, Tab, Material Top Tabs)
- **React Native SVG** - Custom graphics and progress indicators
- **React Native Animatable** - Smooth animations and transitions
- **React Hook Form** - Form state management
- **Zustand** - Lightweight state management

### Backend/Services
- **Firebase Authentication** - User authentication with Google Sign-In
- **Cloud Firestore** - Real-time database for data synchronization
- **Google Generative AI** - AI-powered scheduling features

### Development Tools
- **Metro Bundler** - React Native build system
- **Babel** - JavaScript transpilation
- **ESLint** - Code linting and quality
- **Jest** - Testing framework
- **React Test Renderer** - Component testing

### Mobile/Desktop
- **Android Studio** - Android development and emulation
- **Xcode** - iOS development (macOS)
- **Gradle** - Android build automation
- **CocoaPods** - iOS dependency management

### Utilities
- **React Native Async Storage** - Local data persistence
- **PapaParse** - CSV parsing and processing
- **React Native Document Picker** - File selection
- **React Native Vector Icons** - Icon library
- **React Native Linear Gradient** - UI enhancements

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Cards/          # Attendance card components
│   ├── Calendar/       # Calendar and date picker components
│   └── UI/             # Common UI elements
├── screens/            # Main application screens
│   ├── HomeScreen.tsx  # Dashboard with attendance cards
│   ├── AddCard.tsx     # Subject/class creation
│   ├── EditCard.tsx    # Edit existing subjects
│   └── TimeTableScreen.tsx # Schedule management
├── store/              # Global state management
├── types/              # TypeScript type definitions
├── utils/              # Helper functions and services
├── assets/             # Images, icons, and static resources
└── styles/             # Shared styling definitions
```

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (v16 or later) - [Download](https://nodejs.org/)
- **React Native CLI** - `npm install -g react-native-cli`
- **Android Studio** - For Android development
- **Xcode** - For iOS development (macOS only)
- **Java Development Kit (JDK)** - Version 11 or later

### Installation Steps

1. **Clone the Repository**
```bash
git clone https://github.com/anisharma07/Schedule-Kit.git
cd Schedule-Kit
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Install iOS Dependencies** (macOS only)
```bash
cd ios && pod install && cd ..
```

4. **Configure Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Add Android/iOS apps to your project
   - Download `google-services.json` (Android) and place in `android/app/`
   - Download `GoogleService-Info.plist` (iOS) and add to iOS project

5. **Set Up Environment Variables**
```bash
# Create .env file in root directory
echo "GOOGLE_AI_API_KEY=your_google_ai_api_key" > .env
```

## 🎯 Usage

### Development

**Start Metro Bundler**
```bash
npm start
# or
yarn start
```

**Run on Android**
```bash
npm run android
# or
yarn android
```

**Run on iOS** (macOS only)
```bash
npm run ios
# or
yarn ios
```

### Production

**Build Android APK**
```bash
cd android
./gradlew assembleRelease
```

**Build iOS Archive** (macOS only)
```bash
# Open ios/AttendancePlanner.xcworkspace in Xcode
# Product > Archive
```

### Mobile Development

- **Debug Mode**: Shake device or press `Ctrl+M` (Android) / `Cmd+D` (iOS) for development menu
- **Live Reload**: Enable in development menu for automatic refresh on code changes
- **Remote Debugging**: Use Chrome DevTools for debugging JavaScript

## 📱 Platform Support

- ✅ **Android** - API Level 21+ (Android 5.0+)
- ✅ **iOS** - iOS 12.0+
- 🔄 **Web** - Planned for future release
- 🔄 **Desktop** - Under consideration

## 🧪 Testing

**Run Unit Tests**
```bash
npm test
# or
yarn test
```

**Run Tests in Watch Mode**
```bash
npm test -- --watch
# or
yarn test --watch
```

**Test Coverage**
```bash
npm test -- --coverage
# or
yarn test --coverage
```

## 🔄 Deployment

### Android Play Store
1. Generate signed APK using Android Studio or Gradle
2. Upload to Google Play Console
3. Follow Play Store guidelines for app review

### iOS App Store
1. Archive project in Xcode
2. Upload to App Store Connect
3. Submit for review through App Store Connect

### Distribution
- **Direct APK**: Available on [GitHub Releases](https://github.com/anisharma07/Schedule-Kit/releases)
- **Beta Testing**: Use Firebase App Distribution for beta releases

## 📊 Performance & Optimization

- **Bundle Size**: Optimized with Metro bundler and tree-shaking
- **Memory Management**: Efficient state management with Zustand
- **Animations**: Hardware-accelerated animations using React Native Animatable
- **Data Persistence**: Hybrid approach with local storage and cloud sync
- **Image Optimization**: Compressed assets with appropriate resolutions

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices and maintain type safety
- Use ESLint configuration for consistent code style
- Write unit tests for new components and utilities
- Update documentation for significant changes
- Test on both Android and iOS platforms before submitting PR

### Code Style
- Use functional components with hooks
- Implement proper error handling
- Follow React Native performance best practices
- Maintain consistent naming conventions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Firebase** - For robust backend services
- **Google AI** - For intelligent scheduling capabilities
- **React Native Community** - For excellent third-party packages
- **Contributors** - All developers who have contributed to this project

## 📞 Support & Contact

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/anisharma07/Schedule-Kit/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/anisharma07/Schedule-Kit/discussions)
- 📧 **Email**: [anish.sharma.dev@example.com](mailto:anish.sharma.dev@example.com)
- 🎨 **Design**: [Figma Design File](https://www.figma.com/design/k0Mi0n6jNWGK5l1Jss1jbb/Untitled?node-id=0-1&t=fnfzmdtX0QVB6srI-1)

---

**Download the latest release**: [APK Link](https://github.com/anisharma07/React-native-attendance-app/releases/download/v1.0.4/app-release.apk)

*Built with ❤️ using React Native*