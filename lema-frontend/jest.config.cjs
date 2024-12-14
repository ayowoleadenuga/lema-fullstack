module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.tsx"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/assets/icons/[^.]+\\.svg\\?react$":
      "<rootDir>/src/__mocks__/svgrMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
  transformIgnorePatterns: [
    "/node_modules/(?!(@tanstack|axios|react-toastify)/)",
  ],
  testEnvironmentOptions: {
    url: "http://localhost",
  },
};
