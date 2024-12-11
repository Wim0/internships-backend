module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test', '<rootDir>/src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageReporters: [
    'json-summary',
    'lcov',
    'clover',
    ['text', { skipFull: true }],
  ],
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/main.ts',
    '!src/app.module.ts',
    '!src/app.types.ts',
    '!src/**/domain/entities/*.ts',
    '!src/**/infrastructure/context/db/*.ts',
    '!src/**/infrastructure/repositories/_index.ts',
    '!src/**/infrastructure/auth/guards/*.ts',
    '!src/**/infrastructure/auth/*.ts',
    '!src/app.controller.ts',
    '!src/**/domain/valueObjects/*.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      // statements: -10
    },
  },
};
