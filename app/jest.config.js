module.exports = {
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['<rootDir>/src/**/*.js',],
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    "^@/(.*)$": "<rootDir>/src/$1",
    "^#/(.*)$": "<rootDir>/tests/$1",
  },
}
