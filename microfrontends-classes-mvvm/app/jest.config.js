module.exports = {
  rootDir: '.',
  preset: 'react-native',
  testRegex: '.(test|spec)\\.(jsx?|tsx?)$',
  transform: {
    '\\.(ts|tsx)?$': [
      'ts-jest',
      {
        allowJs: true,
        diagnostics: true,
        isolatedModules: true,
        tsconfig: 'tsconfig.jest.json',
      },
    ],
    '\\.(js|jsx|mjs)?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!@?react-native|@demoapp|@react-navigation)'],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      lines: 70,
      branches: 40,
      functions: 60,
      statements: 70,
    },
  },
  setupFilesAfterEnv: ['./jest.setup.ts', '@testing-library/jest-native/extend-expect'],
}
