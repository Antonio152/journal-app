module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns:[],
  resolver: '<rootDir>/jest.resolver.cjs',
}

const enviroment = require('./enviromentTesting.ts');

/* env variables */
process.env = Object.assign(process.env, {...enviroment})
