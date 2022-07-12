module.exports = {
  presets: ['module:metro-react-native-babel-preset', '@babel/preset-env'],
  plugins: [
    [
        'react-native-reanimated/plugin',
        {
          globals: ['__decode'],
        },
    ],
  ],
};
