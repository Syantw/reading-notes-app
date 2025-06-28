# Git 工作流程

## 分支策略

### 主分支
- `main` - 生产环境分支，只接受经过测试的稳定代码
- `develop` - 开发分支，集成所有功能分支

### 功能分支
- `feature/功能名称` - 新功能开发
- `fix/问题描述` - 问题修复
- `docs/文档更新` - 文档更新
- `refactor/重构描述` - 代码重构

## 提交规范

### 提交信息格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

### 类型说明
- `feat` - 新功能
- `fix` - 修复问题
- `docs` - 文档更新
- `style` - 代码格式调整
- `refactor` - 代码重构
- `test` - 测试相关
- `chore` - 构建过程或辅助工具的变动

### 示例
```bash
feat(notes): 添加笔记编辑功能

- 实现笔记标题和内容的编辑
- 添加保存和取消按钮
- 优化编辑界面用户体验

Closes #123
```

## 工作流程

### 1. 开始新功能
```bash
# 切换到开发分支
git checkout develop
git pull origin develop

# 创建功能分支
git checkout -b feature/note-editing

# 开始开发...
```

### 2. 开发过程中
```bash
# 添加文件
git add .

# 提交更改
git commit -m "feat(notes): 实现笔记编辑界面"

# 推送到远程
git push origin feature/note-editing
```

### 3. 完成功能
```bash
# 确保代码规范
pnpm lint
pnpm test

# 合并到开发分支
git checkout develop
git pull origin develop
git merge feature/note-editing

# 推送到远程
git push origin develop

# 删除功能分支
git branch -d feature/note-editing
git push origin --delete feature/note-editing
```

### 4. 发布版本
```bash
# 合并到主分支
git checkout main
git pull origin main
git merge develop

# 创建标签
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main --tags
```

## 代码审查

### Pull Request 规范
1. **标题格式**: `[类型] 简短描述`
2. **描述内容**:
   - 功能说明
   - 测试情况
   - 相关截图
   - 关联 Issue

### 审查清单
- [ ] 代码符合项目规范
- [ ] 所有测试通过
- [ ] 文档已更新
- [ ] 无安全漏洞
- [ ] 性能影响评估

## 版本管理

### 语义化版本
- `MAJOR.MINOR.PATCH`
- `1.0.0` - 主版本号，不兼容的 API 修改
- `1.1.0` - 次版本号，向下兼容的功能性新增
- `1.1.1` - 修订号，向下兼容的问题修正

### 发布流程
1. 更新版本号
2. 更新 CHANGELOG.md
3. 创建发布标签
4. 部署到生产环境

## 常见问题

### 合并冲突
```bash
# 解决冲突后
git add .
git commit -m "fix: 解决合并冲突"
```

### 回滚提交
```bash
# 回滚到指定提交
git reset --hard <commit-hash>

# 创建新提交来撤销更改
git revert <commit-hash>
```

### 临时保存工作
```bash
# 保存当前工作
git stash

# 恢复工作
git stash pop
``` 