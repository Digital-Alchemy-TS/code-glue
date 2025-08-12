// Learn more https://docs.expo.io/guides/customizing-metro
/**
 * @type {import('expo/metro-config').MetroConfig}
 */
const path = require('path')

const { getDefaultConfig } = require('expo/metro-config')

// Find the project and workspace directories
const projectRoot = __dirname
// This can be replaced with `find-yarn-workspace-root`
const monorepoRoot = path.resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
})

config.watchFolders = [monorepoRoot]
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mts', 'mjs']
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
]

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'valtio' || moduleName.startsWith('valtio')) {
    //? Resolve to its CommonJS entry (fallback to main/index.js)
    return {
      type: 'sourceFile',
      //? require.resolve will pick up the CJS entry (index.js) since "exports" is bypassed
      filePath: require.resolve(moduleName),
    }
  }

  return context.resolveRequest(context, moduleName, platform)
}

module.exports = config
