const defaultConfig = require('./jest.config')

module.exports = {
  ...defaultConfig,
  testMatch: [
    '**/tests/**/*.test.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.integration.js'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
  ],
}
