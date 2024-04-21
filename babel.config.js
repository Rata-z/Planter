module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['react-native-reanimated/plugin'],
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            assets: './assets',
            src: './src',
            styles: './src/styles',
            Plant: './src/components/Plant',
            components: './src/components',
            store: './src/store',
            auth: './src/auth',
            screens: './src/navigation/screens',
            fonts: './assets/fonts'
          }
        }
      ]
    ]
  }
}
