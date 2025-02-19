// filepath: /home/anirudh-sharma/Desktop/Android Dev/React-native-attendance-app/babel.config.js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
      ['module:react-native-dotenv', {
          "moduleName": "@env",
          "path": ".env",
          "blacklist": null,
          "whitelist": null,
          "safe": false,
          "allowUndefined": true
      }]
  ]
};