module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'], // Match test files in __tests__ folder
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: './src', // Set the root directory for tests
  clearMocks: true, // Automatically clear mock calls and instances between tests
  coverageDirectory: '../coverage', // Output coverage reports to a coverage folder
};
