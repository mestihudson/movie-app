const defaultConfig = require('./jest.config')

module.exports = {
  ...defaultConfig,
  testMatch: ['**/tests/unit/**/*.test.js'],
  coverageDirectory: "<rootDir>/tests/unit/coverage",
}