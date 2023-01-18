const defaultConfig = require('./jest.config')

module.exports = {
  ...defaultConfig,
  testMatch: ['**/tests/integration/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/integration/config/setup.js'],
  coverageDirectory: "<rootDir>/tests/integration/coverage",
}
