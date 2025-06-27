module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks"],
  rules: {
    // 核心 JavaScript 规则
    "no-unused-vars": "error",
    "prefer-const": "error",
    "no-var": "error",
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    
    // React 特定规则
    "react/prop-types": "off", // 由于使用 JS 而非 TS，暂时关闭
    "react/react-in-jsx-scope": "off", // React 17+ 不需要手动导入 React
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    
    // 代码质量规则
    "no-console": "warn",
    "no-debugger": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}; 