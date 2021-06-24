'use strict';

const config = {
  verbose: true,
  setupFiles: ['<rootDir>/testing/setEnvVars.js'],
  modulePathIgnorePatterns: ['packages/javascript-fun'], // babel-based jest configuration
};

module.exports = config;
