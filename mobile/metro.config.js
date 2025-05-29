// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const rootDir = path.resolve(__dirname, "..");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Watch all files in the project root, not just within the mobile directory
config.watchFolders = [rootDir];

// Add resolver to properly handle imports from outside the mobile directory
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(rootDir, "node_modules"),
];

// Enable custom resolving of module paths
config.resolver.extraNodeModules = {
  "@types": path.resolve(rootDir, "types"),
};

module.exports = config;
