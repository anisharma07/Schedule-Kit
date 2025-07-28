module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '<rootDir>/.github/claude/tests/setup/test-setup.ts',
    '@testing-library/jest-native/extend-expect',
  ],
  testMatch: [
    '**/.github/claude/tests/**/*.test.(ts|tsx|js)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-vector-icons|react-native-svg|@react-navigation|react-native-animatable|@react-native-firebase|react-native-toast-message|@react-native-community|react-native-gesture-handler)/)',
  ],
  moduleNameMapping: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/node_modules/**',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/android/',
    '/ios/',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', '<rootDir>/src'],
};