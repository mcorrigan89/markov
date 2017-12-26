let path = require('path');
const APP_ROOT = path.resolve('.');

module.exports = {
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  collectCoverage: true,
  collectCoverageFrom: [
    `**/core/*.ts`
  ],
  mapCoverage: true,
  coverageReporters: ['json', 'lcov', 'text'],
  coverageDirectory: `${APP_ROOT}/test_reports/`,
  globals: {
    'ts-jest': {
      tsConfigFile: `${APP_ROOT}/tsconfig.json`,
    },
  },
  rootDir: APP_ROOT,
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(ts?)$': `${APP_ROOT}/node_modules/ts-jest/preprocessor.js`,
  },
  testMatch: [`${APP_ROOT}/src/**/*.spec.(ts|js)`],
  testEnvironment: 'node',
};
