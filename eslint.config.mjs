export default [
  {
    languageOptions: {
      ecmaVersion: 2021, // or a later version if needed
      sourceType: "module",
      globals: {
        browser: true, // if running in browser
        es2021: true
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      "semi": "error",
      "prefer-const": "error"
      // You might want to add React specific rules here later,
      // e.g., from eslint-plugin-react
    }
  }
];
