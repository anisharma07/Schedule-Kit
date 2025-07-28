import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mock react-native modules
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    NativeModules: {
      ...RN.NativeModules,
      RNGestureHandlerModule: {
        State: {},
        attachGestureHandler: jest.fn(),
        createGestureHandler: jest.fn(),
        dropGestureHandler: jest.fn(),
        updateGestureHandler: jest.fn(),
      },
    },
    Platform: {
      ...RN.Platform,
      OS: 'ios',
      select: (objs: any) => objs.ios,
    },
  };
});

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

// Mock react-native-svg
jest.mock('react-native-svg', () => {
  const React = require('react');
  return {
    Svg: (props: any) => React.createElement('Svg', props),
    Path: (props: any) => React.createElement('Path', props),
    Circle: (props: any) => React.createElement('Circle', props),
    G: (props: any) => React.createElement('G', props),
  };
});

// Mock Animated
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock react-navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
    useFocusEffect: jest.fn(),
  };
});

// Mock Firebase
jest.mock('@react-native-firebase/app', () => () => ({
  onReady: jest.fn(() => Promise.resolve()),
}));

jest.mock('@react-native-firebase/auth', () => () => ({
  currentUser: null,
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve()),
  signOut: jest.fn(() => Promise.resolve()),
  onAuthStateChanged: jest.fn(),
}));

jest.mock('@react-native-firebase/firestore', () => () => ({
  collection: jest.fn(() => ({
    doc: jest.fn(() => ({
      set: jest.fn(() => Promise.resolve()),
      get: jest.fn(() => Promise.resolve()),
      onSnapshot: jest.fn(),
    })),
    add: jest.fn(() => Promise.resolve()),
    get: jest.fn(() => Promise.resolve()),
  })),
}));

// Mock react-native-toast-message
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

// Mock react-native-animatable
jest.mock('react-native-animatable', () => {
  const React = require('react');
  const { View } = require('react-native');
  
  return {
    View: (props: any) => React.createElement(View, props),
    Text: (props: any) => React.createElement('Text', props),
  };
});

// Mock DateTimePicker
jest.mock('@react-native-community/datetimepicker', () => 'DateTimePicker');

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    GestureHandlerRootView: View,
    PanGestureHandler: View,
    TouchableOpacity: View,
    State: {},
  };
});

// Mock Dimensions
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn().mockReturnValue({
    width: 375,
    height: 812,
    scale: 2,
    fontScale: 1,
  }),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

// Silence console warnings in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

// Global test timeout
jest.setTimeout(10000);