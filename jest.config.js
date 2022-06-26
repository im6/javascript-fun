'use strict';

const config = {
  verbose: true,
  modulePathIgnorePatterns: ['packages/javascript-fun'], // babel-based jest configuration
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: -10,
    },
  },
};

module.exports = config;
