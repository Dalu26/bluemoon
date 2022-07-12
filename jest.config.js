module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'svg'],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', './__tests__/@react-native-async-storage/async-storage.js'],
    "transform": {
      "^.+\\.jsx?$": "babel-jest",
      "^.+\\.svg$": "./svgTransform.js",
      '^.+\\.(ts|js|html|svg)$': 'ts-jest',
    },
    "transformIgnorePatterns": [
      "node_modules/(?!(@react-native|react-native|react-native-vector-icons|react-native-animatable|react-native-linear-gradient|react-native-responsive-fontsize|react-native-iphone-x-helper|@react-native-async-storage/async-storage)/)",
    ],
    moduleNameMapper: {
      '\\.svg$': '<rootDir>/__tests__/svg.js',
    },
  };