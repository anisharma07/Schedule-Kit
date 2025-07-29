import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-dom';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mock React Native modules
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Platform: {
      OS: 'ios',
      select: jest.fn((obj) => obj.ios),
    },
    Dimensions: {
      get: jest.fn(() => ({ width: 375, height: 812 })),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
    ToastAndroid: {
      show: jest.fn(),
      SHORT: 'SHORT',
      LONG: 'LONG',
    },
    Alert: {
      alert: jest.fn(),
    },
  };
});

// Mock React Native SVG
jest.mock('react-native-svg', () => {
  const React = require('react');
  return {
    Svg: ({ children, ...props }) => React.createElement('View', props, children),
    Path: (props) => React.createElement('View', props),
  };
});

// Mock React Native Animatable
jest.mock('react-native-animatable', () => ({
  View: require('react-native').View,
}));

// Mock React Native Vector Icons
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

// Mock Firebase
jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: () => ({
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  }),
}));

jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: () => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(),
        get: jest.fn(),
      })),
      get: jest.fn(),
    })),
    batch: jest.fn(() => ({
      set: jest.fn(),
      commit: jest.fn(),
    })),
  }),
}));

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  NavigationContainer: ({ children }) => children,
}));

// Mock DateTimePicker
jest.mock('@react-native-community/datetimepicker', () => 'DateTimePicker');

// Mock Gesture Handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    GestureHandlerRootView: View,
    PanGestureHandler: View,
  };
});

// Mock Swipe Gestures
jest.mock('react-native-swipe-gestures', () => 'GestureRecognizer');

// Global test timeout
jest.setTimeout(10000);