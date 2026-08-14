module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterSetup: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ["ts-jest", {
      useESM: false,
      tsconfig: {
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
    }],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^canvas$": "<rootDir>/__mocks__/canvas.js",
  },
  testMatch: [
    "**/__tests__/**/*.test.(ts|tsx)",
    "**/*.test.ts",
    "**/*.test.tsx",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/__tests__/**",
    "!src/**/*.test.{ts,tsx}",
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(framer-motion|lucide-react|zod)/)",
  ],
  // Ignore the global canvas module
  modulePathIgnorePatterns: [
    "C:/Users/Streaming/node_modules",
  ],
};
