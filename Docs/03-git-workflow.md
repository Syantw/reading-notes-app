# Git 工作流规范

## 分支管理策略

### 主要分支

#### main 分支
- **用途**: 生产环境代码
- **保护**: 受保护分支，禁止直接推送
- **合并**: 仅通过 Pull Request 合并
- **稳定性**: 始终保持可部署状态

#### develop 分支
- **用途**: 开发环境集成分支
- **来源**: 从 main 分支创建
- **用途**: 功能分支的集成点
- **测试**: 持续集成测试通过后才能合并到 main

### 辅助分支

#### feature/* 分支
```bash
# 创建功能分支
git checkout develop
git pull origin develop
git checkout -b feature/reading-notes-crud

# 开发完成后
git push origin feature/reading-notes-crud
# 创建 Pull Request 到 develop 分支
```

#### hotfix/* 分支
```bash
# 紧急修复分支
git checkout main
git pull origin main
git checkout -b hotfix/fix-note-deletion-bug

# 修复完成后同时合并到 main 和 develop
```

#### release/* 分支
```bash
# 发布准备分支
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# 发布完成后合并到 main 并打标签
git tag v1.2.0
```

## 提交规范

### 提交信息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 提交类型 (type)

- **feat**: 新功能
- **fix**: 修复 bug
- **docs**: 文档更新
- **style**: 代码格式化（不影响功能）
- **refactor**: 重构代码
- **perf**: 性能优化
- **test**: 测试相关
- **chore**: 构建过程或辅助工具的变动

### 示例

```bash
# 新功能
git commit -m "feat(notes): add note creation functionality

- Implement note creation form
- Add form validation
- Update state management for new notes

Closes #123"

# 修复 bug
git commit -m "fix(sidebar): resolve folder navigation issue

The folder click handler was not properly bound to the event.
Fixed by updating the event listener implementation.

Fixes #456"

# 文档更新
git commit -m "docs(readme): update installation instructions"
``` 