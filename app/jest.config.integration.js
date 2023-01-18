const defaultConfig = require('./jest.config')

module.exports = {
  ...defaultConfig,
  testMatch: ['**/tests/integration/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.integration.js'],
  coverageDirectory: "<rootDir>/tests/integration/coverage",
}
