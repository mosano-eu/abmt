const { defaults } = require("jest-config");

module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  projects: ["<rootDir>/packages/**/jest.config.js"],
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: ["\\\\node_modules\\\\"],
  modulePathIgnorePatterns: ["fixtures"],
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
