"use strict";
const { resolve } = require("path");
const { readdirSync, lstatSync } = require("fs");

const PACKAGE_DIR = "packages";

const packageDir = readdirSync(resolve(__dirname, PACKAGE_DIR))
  .filter(
    (entry) =>
      entry[0] !== "." &&
      lstatSync(resolve(__dirname, PACKAGE_DIR, entry)).isDirectory()
  )
  .map((entry) => resolve(__dirname, PACKAGE_DIR, entry));

packageDir.unshift(__dirname);

module.exports = {
  ignorePatterns: ["dist"],
  extends: ["airbnb", "prettier"],
  plugins: ["react", "jsx-a11y", "import", "prettier", "jest"],
  env: {
    browser: true,
    "jest/globals": true,
    node: true,
  },
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      {
        packageDir,
      },
    ],
  },
};
