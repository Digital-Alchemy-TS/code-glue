/* eslint-disable no-undef */
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['../..'],
          alias: {
            // define aliases to shorten the import paths
            '@code-glue/server': './apps/server/src',
            paradigm: '../../packages/paradigm',
          },
          extensions: ['.js', '.jsx', '.tsx', '.ios.js', '.android.js', '.mts'],
        },
      ],
      [
        '@tamagui/babel-plugin',
        {
          components: ['paradigm', 'tamagui'],
          config: '../../packages/paradigm/config/tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
