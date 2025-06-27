# 环境配置与工具链

## Node.js 版本管理

### 强制使用 nvm

我们强制使用 `nvm` (Node Version Manager) 来管理 Node.js 版本，确保团队成员使用相同的 Node.js 版本。

**推荐版本**: `v18.x` 或更高版本

### 安装和配置

```bash
# 安装 nvm (如果尚未安装)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载 shell 配置
source ~/.bashrc  # 或 source ~/.zshrc

# 安装推荐的 Node.js 版本
nvm install 18
nvm use 18
nvm alias default 18

# 验证版本
node --version  # 应该显示 v18.x.x
npm --version
```

### 项目版本锁定

在项目根目录创建 `.nvmrc` 文件：

```bash
# .nvmrc
18
```

团队成员可以通过以下命令自动切换到项目指定的 Node.js 版本：

```bash
nvm use
```

## 包管理器

### 强制使用 pnpm

我们强制使用 `pnpm` 作为包管理器，原因如下：

- **性能优势**: 比 npm 快 2-3 倍，比 yarn 快 1.5-2 倍
- **磁盘空间**: 通过硬链接和符号链接节省大量磁盘空间
- **避免幻影依赖**: 严格的依赖管理，避免隐式依赖问题
- **Monorepo 支持**: 优秀的 monorepo 支持能力

### 安装 pnpm

```bash
# 使用 npm 安装 pnpm
npm install -g pnpm

# 或使用官方安装脚本
curl -fsSL https://get.pnpm.io/install.sh | sh -

# 验证安装
pnpm --version
```

### 常用命令对照

| npm | pnpm | 说明 |
|-----|------|------|
| `npm install` | `pnpm install` | 安装依赖 |
| `npm install package` | `pnpm add package` | 安装包 |
| `npm install -D package` | `pnpm add -D package` | 安装开发依赖 |
| `npm run script` | `pnpm script` | 运行脚本 |
| `npm uninstall package` | `pnpm remove package` | 卸载包 |

### 项目配置

在项目根目录创建 `.npmrc` 文件：

```ini
# .npmrc
auto-install-peers=true
strict-peer-dependencies=false
shamefully-hoist=false
```

## IDE 与插件

### 推荐 IDE: VS Code

我们推荐使用 **Visual Studio Code** 作为主要开发工具。

### 必装插件

#### 核心插件
- **Volar** - Vue 3 官方推荐的 TypeScript 支持
- **TypeScript Vue Plugin (Volar)** - Vue 文件的 TypeScript 支持
- **ESLint** - JavaScript/TypeScript 代码检查
- **Prettier - Code formatter** - 代码格式化
- **Stylelint** - CSS/SCSS 代码检查

#### 增强插件
- **Auto Rename Tag** - 自动重命名配对的 HTML/XML 标签
- **Bracket Pair Colorizer** - 括号配对高亮
- **GitLens** - Git 增强功能
- **Path Intellisense** - 路径自动补全
- **Tailwind CSS IntelliSense** - Tailwind CSS 智能提示
- **Vue VSCode Snippets** - Vue 代码片段

#### 主题和图标
- **Material Icon Theme** - 文件图标主题
- **One Dark Pro** - 代码主题（推荐）

### VS Code 设置

在项目根目录创建 `.vscode/settings.json`：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "vue.codeActions.enabled": false,
  "files.associations": {
    "*.vue": "vue"
  },
  "emmet.includeLanguages": {
    "vue-html": "html",
    "vue": "html"
  }
}
```

### 工作区推荐扩展

在项目根目录创建 `.vscode/extensions.json`：

```json
{
  "recommendations": [
    "Vue.volar",
    "Vue.vscode-typescript-vue-plugin",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "stylelint.vscode-stylelint",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

## 开发环境检查清单

在开始开发前，请确保：

- [ ] Node.js 版本符合要求 (v18.x+)
- [ ] 已安装并配置 pnpm
- [ ] 已安装 VS Code 和所有必装插件
- [ ] 项目依赖已正确安装 (`pnpm install`)
- [ ] 代码检查工具正常工作 (ESLint, Prettier, Stylelint)

## 常见问题

### pnpm 安装失败

如果遇到 pnpm 安装问题，可以尝试：

```bash
# 清除缓存
pnpm store prune

# 删除 node_modules 重新安装
rm -rf node_modules
pnpm install
```

### VS Code 插件冲突

如果 Volar 与其他 Vue 插件冲突：

1. 禁用 Vetur 插件
2. 确保只启用 Volar 相关插件
3. 重启 VS Code

### Node.js 版本不匹配

如果项目要求的 Node.js 版本与当前版本不匹配：

```bash
# 查看项目要求的版本
cat .nvmrc

# 切换到项目版本
nvm use

# 如果版本不存在，先安装
nvm install $(cat .nvmrc)
``` 