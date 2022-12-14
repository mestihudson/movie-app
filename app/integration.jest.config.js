const defaultConfig = require('./jest.config')

module.exports = {
  ...defaultConfig,
  testMatch: [
    '**/tests/integration/**/*.test.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.integration.js'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
  ],
}
