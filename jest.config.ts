import type { Config } from "jest";

const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  // other Jest configurations
};

export default config;
