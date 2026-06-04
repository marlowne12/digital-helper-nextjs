import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  {
    ignores: [
      "antigravity-kit/**",
      "digital-helper-nextjs/**",
      ".serena/**",
      ".next/**",
      "node_modules/**"
    ]
  },
  ...nextVitals,
  ...nextTs,
]);

export default eslintConfig;
