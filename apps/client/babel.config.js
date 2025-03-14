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
            '@code-glue/server': '../../server/src',
          },
          extensions: ['.js', '.jsx', '.tsx', '.ios.js', '.android.js'],
        },
      ],
      // [
      //   '@tamagui/babel-plugin',
      //   {
      //     components: ['tamagui'],
      //     config: './tamagui.config.ts',
      //     logTimings: true,
      //   },
      // ],
      'react-native-reanimated/plugin',
    ],
  }
}
