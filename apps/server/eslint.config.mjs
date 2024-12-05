import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import jsonc from "eslint-plugin-jsonc";
import noUnsanitized from "eslint-plugin-no-unsanitized";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sonarjs from "eslint-plugin-sonarjs";
import sortKeysFix from "eslint-plugin-sort-keys-fix";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  // - recommended options
  // - plugins
  // - extends
  sonarjs.configs.recommended,
  {
    plugins: {
      import: fixupPluginRules(importPlugin),
      jsonc,
      "no-unsanitized": noUnsanitized,
      "simple-import-sort": simpleImportSort,
      "sort-keys-fix": sortKeysFix,
      unicorn,
      prettier,
    },
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  ...compat
    .extends(
      "plugin:@cspell/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:jsonc/recommended-with-jsonc",
      "plugin:prettier/recommended",
      "plugin:unicorn/recommended",
    )
    .map(config => ({ ...config, files: ["src/**/*.mts"] })),

  // #MARK: defaults
  {
    files: ["src/**/*.mts"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "script",
      parserOptions: {
        project: ["tsconfig.json"],
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "logger" },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-magic-numbers": "warn",
      "@typescript-eslint/unbound-method": "off",
      "sonarjs/no-empty-function": "off",
      "import/no-extraneous-dependencies": ["error", { packageDir: "../../" }],
      "no-async-promise-executor": "off",
      "no-case-declarations": "off",
      "no-console": "error",
      "prettier/prettier": "error",
      "simple-import-sort/exports": "warn",
      "simple-import-sort/imports": "warn",
      "sonarjs/no-unused-expressions": "off",
      "unicorn/expiring-todo-comments": "off",
      "sonarjs/fixme-tag": "off",
      "sonarjs/new-cap": "off",
      "sonarjs/no-clear-text-protocols": "off",
      "sonarjs/no-commented-code": "off",
      "sonarjs/no-invalid-await": "off",
      "sonarjs/no-misused-promises": "off",
      "sonarjs/no-nested-functions": "off",
      "sonarjs/no-redeclare": "off",
      "sonarjs/no-skipped-test": "off",
      "sonarjs/prefer-immediate-return": "off",
      "sonarjs/prefer-nullish-coalescing": "off",
      "sonarjs/prefer-single-boolean-return": "off",
      "sonarjs/sonar-no-fallthrough": "off",
      "sonarjs/todo-tag": "off",
      "sort-keys-fix/sort-keys-fix": "warn",
      "unicorn/consistent-function-scoping": "off",
      "unicorn/import-style": "off",
      "unicorn/no-array-callback-reference": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/no-await-expression-member": "off",
      "unicorn/no-empty-file": "off",
      "unicorn/no-null": "off",
      "unicorn/no-object-as-default-parameter": "off",
      "unicorn/no-process-exit": "off",
      "unicorn/no-useless-undefined": "off",
      "unicorn/prefer-event-target": "off",
      "unicorn/prefer-module": "off",
      "unicorn/prefer-node-protocol": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/switch-case-braces": "off",
    },
  },
  // #MARK: modules
  {
    files: ["src/**/*.module.mts"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "script",
      parserOptions: {
        project: ["tsconfig.json"],
      },
    },
    rules: {
      "@typescript-eslint/no-magic-numbers": "off",
    },
  },
  // #MARK: tests
  {
    files: [
      "src/**/*.contract-test.mts",
      "src/**/*.test.mts"
    ],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "script",
      parserOptions: {
        project: ["tsconfig.json"],
      },
    },
    rules: {
      "@typescript-eslint/no-magic-numbers": "off",
      "@typescript-eslint/unbound-method": "off",
      "sonarjs/no-duplicate-string": "off",
      "sonarjs/no-unused-collection": "warn",
      "sonarjs/prefer-promise-shorthand": "off",
      "unicorn/consistent-function-scoping": "off",
    },
  },
];
