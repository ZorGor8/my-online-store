// eslint.config.js
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigAsPlugin } from "@eslint/compat";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{js,jsx}"], // Или "**/*.{js,jsx,ts,tsx}" если используешь TypeScript
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        // Добавь globals.node, если ты пишешь что-то для Node.js в этом же проекте
        // ...globals.node,
      }
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "no-unused-vars": "warn",
      "prettier/prettier": "error",
    },
  },
  pluginJs.configs.recommended,
  fixupConfigAsPlugin(pluginReactConfig),
  prettierConfig,
];