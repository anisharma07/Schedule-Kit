# Schedule-Kit (AttendancePlanner)

A comprehensive **React Native** mobile application for tracking and managing attendance with intelligent scheduling features. Built for both Android and iOS platforms, this app provides students and professionals with an intuitive way to monitor attendance patterns, manage timetables, and leverage AI-powered scheduling optimization.

## 🚀 Features

- 📊 **Smart Attendance Tracking**: Mark and track attendance across multiple classes or events with visual progress indicators
- 🎯 **Target-Based Monitoring**: Set attendance percentage targets and get real-time feedback on your progress
- 🤖 **AI-Powered Scheduling**: Generate optimized timetables instantly using Google's Gemini AI (under development)
- 📅 **Interactive Timetable Management**: Create, edit, and manage class schedules with drag-and-drop functionality
- 📈 **Visual Analytics**: Beautiful circular progress indicators with conic gradients showing attendance percentages
- 🔔 **Smart Notifications**: Get alerts when attendance falls below target thresholds
- ☁️ **Cloud Synchronization**: Sync data across devices using Firebase Firestore
- 🔒 **Secure Authentication**: Google Sign-In integration with Firebase Auth
- 📱 **Responsive Design**: Optimized for various screen sizes with smooth animations
- 📊 **CSV Import/Export**: Import student data and export attendance records
- 🎨 **Customizable UI**: Choose from multiple color themes for different subjects

## 🛠️ Tech Stack

### Frontend
- **React Native** (v0.78.0) - Cross-platform mobile framework
- **React** (v19.0.0) - UI library
- **TypeScript** - Type-safe development
- **React Navigation** (v7.x) - Navigation library with stack, tab, and drawer navigators
- **React Native SVG** - Custom graphics and charts
- **React Native Animatable** - Smooth animations and transitions
- **React Native Linear Gradient** - Beautiful gradient effects

### Backend/Services
- **Firebase Authentication** - User authentication with Google Sign-In
- **Firebase Firestore** - Cloud database for data synchronization
- **Google Gemini AI** - AI-powered scheduling optimization

### State Management & Storage
- **Zustand** - Lightweight state management
- **AsyncStorage** - Local data persistence
- **React Hook Form** - Form handling and validation

### Development Tools
- **Metro** - React Native bundler
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Babel** - JavaScript compilation
- **TypeScript Config** - Type checking configuration

### Mobile Platform Support
- **Android** - Full Android support with Gradle build system
- **iOS** - Complete iOS support with Xcode project configuration
- **React Native Gesture Handler** - Advanced gesture recognition
- **React Native Safe Area Context** - Safe area management

### Additional Libraries
- **PapaParse** - CSV parsing and processing
- **Axios** - HTTP client for API requests
- **React Native Vector Icons** - Icon library
- **React Native Toast Message** - User notifications

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Cards/          # Card components with progress tracking
│   ├── Calendar.tsx    # Date picker and calendar views
│   ├── Header.tsx      # Navigation header component
│   └── Sidebar.tsx     # Drawer navigation component
├── screens/            # Main application screens
│   ├── HomeScreen.tsx  # Dashboard with attendance overview
│   ├── AddCard.tsx     # Add new subject/class
│   ├── AiScreen.tsx    # AI scheduling interface
│   └── SettingsScreen.tsx # User preferences
├── store/              # State management
│   └── store.ts        # Zustand store configuration
├── utils/              # Utility functions
│   ├── functions.ts    # Helper functions
│   ├── csv-picker.ts   # CSV handling utilities
│   └── auth-services.ts # Authentication helpers
├── types/              # TypeScript type definitions
├── styles/             # Styling configurations
└── assets/             # Images, icons, and screenshots
```

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (Latest LTS recommended) - [Download](https://nodejs.org/)
- **React Native CLI** - `npm install -g @react-native-community/cli`
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)
- **Java Development Kit (JDK)** 11 or newer

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

3. **iOS Setup** (macOS only)
```bash
cd ios && pod install && cd ..
```

4. **Configure Firebase**
```bash
# Add your google-services.json to android/app/
# Add your GoogleService-Info.plist to ios/AttendancePlanner/
```

5. **Environment Variables**
```bash
# Create .env file in root directory
cp .env.example .env
# Add your API keys and configuration
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
# Open ios/AttendancePlanner.xcworkspace in Xcode
# Product → Archive → Distribute App
```

### Mobile Development

- **Hot Reloading**: Shake device or press `R` twice for Android, `Cmd+R` for iOS
- **Debug Menu**: Shake device or press `Cmd+D` (iOS) / `Ctrl+M` (Android)
- **Remote Debugging**: Enable in debug menu to debug with Chrome DevTools

## 📱 Platform Support

- ✅ **Android** 6.0+ (API Level 23+)
- ✅ **iOS** 11.0+
- ✅ **Tablet Support** (responsive design)
- ✅ **Dark/Light Mode** support
- ✅ **RTL Language** support

## 🧪 Testing

```bash
# Run unit tests
npm test
# or
yarn test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- App.test.tsx
```

### Test Coverage
- Unit tests for core components
- Integration tests for navigation
- Snapshot tests for UI consistency

## 🔄 Deployment

### Android
1. Generate signed APK using Android Studio or Gradle
2. Upload to Google Play Console
3. Follow Google Play Store guidelines

### iOS
1. Archive app in Xcode
2. Distribute through App Store Connect
3. Submit for App Store review

### APK Distribution
- Direct APK download available: [Release Page](https://github.com/anisharma07/React-native-attendance-app/releases/download/v1.0.4/app-release.apk)

## 📊 Performance & Optimization

- **Bundle Size**: Optimized with Metro bundler and ProGuard
- **Memory Management**: Efficient state management with Zustand
- **Lazy Loading**: Components loaded on-demand
- **Image Optimization**: Compressed assets and vector icons
- **Database Optimization**: Efficient Firestore queries with pagination
- **Offline Support**: Local storage with AsyncStorage for offline functionality

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- **Code Style**: Follow ESLint configuration and React Native best practices
- **TypeScript**: Maintain type safety - no `any` types without justification
- **Testing**: Add tests for new features and maintain existing test coverage
- **Documentation**: Update README and inline comments for significant changes
- **Performance**: Consider performance impact, especially for animations and large lists
- **Accessibility**: Ensure components are accessible with proper labels and hints

### Commit Convention
```bash
feat: add new feature
fix: bug fix
docs: documentation updates
style: code style changes
refactor: code refactoring
test: add or update tests
chore: maintenance tasks
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Native Community** for the excellent framework and libraries
- **Google Firebase** for authentication and cloud services
- **React Navigation Team** for the navigation solution
- **Zustand** for lightweight state management
- **Figma Community** for design inspiration - [Design Link](https://www.figma.com/design/k0Mi0n6jNWGK5l1Jss1jbb/Untitled?node-id=0-1&t=fnfzmdtX0QVB6srI-1)

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/anisharma07/Schedule-Kit/issues)
- **Discussions**: [GitHub Discussions](https://github.com/anisharma07/Schedule-Kit/discussions)
- **Email**: [Developer Contact](https://github.com/anisharma07)

### Screenshots

| Dashboard | AI Scheduling | Timetable |
|-----------|---------------|-----------|
| ![Dashboard](./src/assets/screenshots/ss1.jpeg) | ![AI Feature](./src/assets/screenshots/ss3.jpeg) | ![Timetable](./src/assets/screenshots/ss4.jpeg) |

---

**Built with ❤️ using React Native and TypeScript**