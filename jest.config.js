export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@sync-automations/(.*)$": "<rootDir>/packages/$1",
  },
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["apps/api/app/**/*.ts", "packages/utils/**/*.ts"],
};
