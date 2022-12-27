module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/src/database/migrations/**/*.js',
    '!**/src/database/seeds/**/*.js',
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    }
  }
}
