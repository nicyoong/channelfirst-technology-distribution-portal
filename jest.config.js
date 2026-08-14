module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ["ts-jest", {
      useESM: false,
      tsconfig: {
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        jsx: "react-jsx",
        target: "ES2017",
        module: "commonjs",
        moduleResolution: "node",
      },
    }],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^canvas$": "<rootDir>/mocks/canvas.js",
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
  modulePaths: ["<rootDir>/node_modules"],
};
