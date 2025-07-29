# Schedule-Kit

A comprehensive **React Native** attendance and timetable management application designed to help students and professionals track attendance, manage schedules, and optimize their time efficiently. The app features AI-powered scheduling, cloud synchronization, and an intuitive interface for seamless attendance management across both Android and iOS platforms.

## 🚀 Features

- 📊 **Smart Attendance Tracking**: Mark attendance for different subjects/classes with visual progress indicators
- 🎯 **Target-Based Monitoring**: Set attendance percentage targets and track progress with conic gradient visualizations
- 🤖 **AI-Powered Scheduling**: Generate optimized timetables instantly using Google's Gemini AI (under development)
- 📅 **Timetable Management**: Create, edit, and manage class schedules with time slots and room assignments
- 📊 **CSV Data Import/Export**: Import student data and export attendance records in CSV format
- ☁️ **Firebase Cloud Sync**: Real-time data synchronization across multiple devices
- 🔐 **Google Authentication**: Secure login with Google Sign-In integration
- 📱 **Cross-Platform**: Native performance on both Android and iOS
- 🎨 **Customizable UI**: Color-coded cards with customizable tag colors
- 📈 **Analytics & Insights**: Track attendance trends and patterns over time
- 🔔 **Smart Reminders**: Get alerts for low attendance and upcoming classes

## 🛠️ Tech Stack

### Frontend
- **React Native 0.78.0** - Cross-platform mobile framework
- **TypeScript** - Type-safe development
- **React Navigation 7.x** - Navigation with stack, tab, and drawer navigators
- **React Native SVG** - Custom gradient visualizations and icons
- **React Native Animatable** - Smooth animations and transitions
- **React Hook Form** - Form management and validation

### Backend/Services
- **Firebase Firestore** - Real-time NoSQL database
- **Firebase Authentication** - User authentication and management
- **Google Gemini AI** - AI-powered schedule generation
- **Google Sign-In** - OAuth authentication

### Development Tools
- **Metro** - React Native bundler
- **Jest** - Testing framework
- **ESLint** - Code linting and formatting
- **Babel** - JavaScript compilation
- **Zustand** - Lightweight state management

### Mobile/Desktop
- **Android SDK** - Android development
- **Xcode** - iOS development
- **React Native CLI** - Development tooling
- **Gradle** - Android build system

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Cards/          # Card components with gradient visualizations
│   ├── Calendar.tsx    # Calendar component for date selection
│   ├── Header.tsx      # Navigation header
│   └── Sidebar.tsx     # Navigation drawer
├── screens/            # Main application screens
│   ├── HomeScreen.tsx  # Dashboard with attendance cards
│   ├── AddCard.tsx     # Add new subject/class
│   ├── EditCard.tsx    # Edit existing cards
│   └── AiScreen.tsx    # AI scheduling interface
├── store/              # State management
├── utils/              # Helper functions and services
├── types/              # TypeScript type definitions
├── assets/             # Images, icons, and screenshots
└── Tabs/              # Bottom tab navigation
```

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (Latest LTS recommended) - [Download](https://nodejs.org/)
- **React Native CLI** - `npm install -g react-native-cli`
- **Android Studio** - For Android development
- **Xcode** - For iOS development (macOS only)
- **JDK 11** - Java Development Kit

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

3. **Install iOS Pods** (iOS only)
```bash
cd ios && pod install && cd ..
```

4. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Download `google-services.json` for Android and place in `android/app/`
   - Download `GoogleService-Info.plist` for iOS and add to Xcode project

5. **Setup Environment Variables**
```bash
# Create .env file in root directory
GEMINI_API_KEY=your_gemini_api_key_here
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

**Run on iOS**
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

**Build iOS Archive**
```bash
# Open ios/AttendancePlanner.xcodeproj in Xcode
# Product -> Archive
```

### Mobile Development

**Android Development Setup**
1. Install Android Studio
2. Configure Android SDK (API level 31+)
3. Setup Android Virtual Device (AVD)
4. Enable USB debugging on physical device

**iOS Development Setup**
1. Install Xcode from Mac App Store
2. Install iOS Simulator
3. Configure development team and certificates
4. Enable developer mode on physical device

## 📱 Platform Support

- ✅ **Android** - API level 21+ (Android 5.0+)
- ✅ **iOS** - iOS 11.0+
- 📱 **React Native** - Cross-platform compatibility
- ☁️ **Cloud Sync** - Firebase real-time synchronization

## 🧪 Testing

**Run Tests**
```bash
npm test
# or
yarn test
```

**Run Tests in Watch Mode**
```bash
npm test -- --watch
```

**Test Coverage**
```bash
npm test -- --coverage
```

## 🔄 Deployment

### Android Deployment
1. Generate signed APK using Android Studio
2. Upload to Google Play Console
3. Configure app signing and release management

### iOS Deployment
1. Archive app in Xcode
2. Upload to App Store Connect
3. Submit for App Store review

### Firebase Configuration
- Enable Firestore database
- Configure authentication providers
- Set up security rules for data protection

## 📊 Performance & Optimization

- **State Management**: Zustand for lightweight, efficient state management
- **Image Optimization**: Optimized asset loading and caching
- **Navigation**: Lazy loading of screens for improved performance
- **Memory Management**: Proper cleanup of listeners and subscriptions
- **Bundle Size**: Optimized imports and tree shaking

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint configuration for code formatting
- Add tests for new features
- Update documentation for API changes
- Follow React Native performance guidelines
- Ensure cross-platform compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Native Community** - For the amazing framework and ecosystem
- **Firebase Team** - For providing excellent backend services
- **Google Gemini AI** - For AI-powered scheduling capabilities
- **Contributors** - Thanks to all contributors who help improve this project

## 📞 Support & Contact

- 🐛 **Report Issues**: [GitHub Issues](https://github.com/anisharma07/Schedule-Kit/issues)
- 📧 **Email**: [Contact Developer](mailto:anisharma07@gmail.com)
- 📱 **Download APK**: [Latest Release](https://github.com/anisharma07/React-native-attendance-app/releases/download/v1.0.4/app-release.apk)
- 🎨 **Design**: [Figma Design](https://www.figma.com/design/k0Mi0n6jNWGK5l1Jss1jbb/Untitled?node-id=0-1&t=fnfzmdtX0QVB6srI-1)

---

**Built with ❤️ using React Native and TypeScript**