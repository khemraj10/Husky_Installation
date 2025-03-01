// ignores: ["node_modules/", "dist/", ".next", "next-env.d.ts", "yarn.lock", "package-lock.json", "public", "abis"],
// import js from "@eslint/js";
// import next from "eslint-plugin-next";
import prettier from "eslint-plugin-prettier";
// const prettier = require("eslint-plugin-prettier");
// const parser = require("@typescript-eslint/parser");
import parser from "@typescript-eslint/parser";
// "lint": "eslint . --ext .ts",

module.exports = {
  ignorePatterns: [
    ".next/**",
    "node_modules/**",
    "dist/**",
    "next-env.d.ts",
    "yarn.lock",
    "package-lock.json",
    "public",
    "abis",
  ],
  overrides: [
    {
      files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      extends: ["next", "plugin:prettier/recommended", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
      plugins: { prettier: prettier, "@typescript-eslint": parser },
      rules: {
        "prettier/prettier": ["error"],
        "no-console": "warn",
        "@typescript-eslint/no-explicit-any": "off",
        semi: ["warn", "always"],
      },
    },
  ],
};
