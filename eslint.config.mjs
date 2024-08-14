//@ts-check
import eslintConfigPrettier from "eslint-config-prettier"
import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import unusedImports from "eslint-plugin-unused-imports"

export default tseslint.config({
  files: ["src/**/*.ts"],
  plugins: {
    "unused-imports": unusedImports,
  },
  ignores: ["src/db/**/*"],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
  ],
  rules: {
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
})
