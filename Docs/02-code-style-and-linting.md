# 代码风格与静态检查

## 概述

我们使用 ESLint、Prettier 和 Stylelint 来确保代码质量和一致性。

## ESLint 配置

### 核心规则

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:vue/vue3-essential',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
  },
};
```

### 重要规则说明

#### 强制使用 const
```javascript
// ✅ 正确
const user = { name: 'John' };

// ❌ 错误
let user = { name: 'John' };
```

#### 禁止使用 any
```typescript
// ✅ 正确
interface User {
  name: string;
  age: number;
}

// ❌ 错误
function processUser(user: any): void {
  // ...
}
```

## Prettier 配置

```javascript
// .prettierrc.js
module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
};
```

## Stylelint 配置

```javascript
// .stylelintrc.js
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-order': [
      'position', 'top', 'right', 'bottom', 'left',
      'display', 'width', 'height', 'padding', 'margin',
      'border', 'background', 'color', 'font',
    ],
  },
};
```

## 包依赖

```bash
# ESLint
pnpm add -D eslint @vue/eslint-config-typescript @vue/eslint-config-prettier
pnpm add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
pnpm add -D eslint-plugin-vue

# Prettier
pnpm add -D prettier eslint-config-prettier

# Stylelint
pnpm add -D stylelint stylelint-config-standard stylelint-config-recommended-vue
pnpm add -D stylelint-order
```

## package.json 脚本

```json
{
  "scripts": {
    "lint": "eslint . --ext .vue,.js,.ts --fix",
    "lint:style": "stylelint \"**/*.{css,scss,vue}\" --fix",
    "format": "prettier --write src/"
  }
}
``` 