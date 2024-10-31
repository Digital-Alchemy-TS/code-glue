export default {
  extensionsToTreatAsEsm: ['.ts'],
  collectCoverage: true,
  coverageReporters: ['text', 'cobertura'],
  coveragePathIgnorePatterns: ['src/testing/'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['**/?(*.)+(test).ts'],
  setupFiles: ['<rootDir>/jest-setup.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
        useESM: true
      }
    ]
  }
};
