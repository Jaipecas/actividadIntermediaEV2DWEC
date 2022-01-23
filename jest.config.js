const config = {
  verbose: true,
  collectCoverage: false,
  testRegex: "./tests/.*js$",
  testPathIgnorePatterns: ['./tests/fixtures'],

  moduleFileExtensions: ["js"],
  moduleDirectories: ["node_modules"],

  testEnvironment: 'node',
  transform: {
    "^.+\\.m?jsx?$": "babel-jest"
  },
};

export default config;
