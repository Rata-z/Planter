// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config')
module.exports = (() => {
  const defaultConfig = getDefaultConfig(__dirname)
  defaultConfig.resolver.sourceExts.push('cjs')
  const { transformer, resolver } = defaultConfig

  defaultConfig.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer')
  }
  defaultConfig.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg']
  }
  return defaultConfig
})()
