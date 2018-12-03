module.exports = {
  automock: false,
  setupFiles: ['./jest/setup.js', 'jest-localstorage-mock'],
  testMatch: ['**/__tests__/**/*.spec.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '^kakapoBridge$': '<rootDir>/app/scripts/bridge/web/index.js',
  },
  collectCoverage: false,
  collectCoverageFrom: [
    'app/scripts/**/*.{js,jsx}',
    '!app/scripts/bridge/desktop/**',
    '!app/scripts/*.js',
  ],
};
