# 📖 Vercel 部署超详细图文指南

## 目录
1. [准备工作](#准备工作)
2. [第一步：注册 Vercel 账号](#第一步注册-vercel-账号)
3. [第二步：上传代码到 GitHub](#第二步上传代码到-github)
4. [第三步：在 Vercel 部署](#第三步在-vercel-部署)
5. [第四步：验证部署](#第四步验证部署)
6. [常见问题解决](#常见问题解决)
7. [更新博客](#更新博客)

---

## 准备工作

在开始之前，您需要：
- ✅ 电脑上已安装 Node.js（https://nodejs.org）
- ✅ 有一个 GitHub 账号（https://github.com）
- ✅ 博客代码已经在您的电脑上

---

## 第一步：注册 Vercel 账号

### 1.1 访问 Vercel 官网

打开浏览器，访问：https://vercel.com

### 1.2 注册账号

1. 点击右上角的 **"Sign Up"** 按钮
2. 选择注册方式（推荐使用 GitHub）：
   - 点击 **"Continue with GitHub"**
   - 会跳转到 GitHub 授权页面
   - 点击 **"Authorize Vercel"** 授权

### 1.3 完成注册

1. 填写用户名（例如：sylphias）
2. 填写邮箱
3. 选择团队（个人用户选择 "Just me"）
4. 点击 **"Continue"**
5. 等待账号创建完成

---

## 第二步：上传代码到 GitHub

### 2.1 在 GitHub 创建新仓库

1. 访问：https://github.com/new
2. 填写仓库信息：
   - **Repository name（仓库名称）**：`blog2`（或其他您喜欢的名字）
   - **Description（描述）**：我的个人博客
   - **Public（公开）或 Private（私有）**：选择 **Public**（推荐）
3. 点击 **"Create repository"**

### 2.2 在本地电脑上传代码

#### 方法 A：使用自动脚本（最简单）

1. 在项目目录中找到 `deploy.bat` 文件
2. 双击运行该文件
3. 按照提示操作：
   - 等待 Git 初始化
   - 输入您的 GitHub 仓库链接
   - 等待上传完成

**GitHub 仓库链接格式：**
```
https://github.com/您的用户名/blog2.git
```

例如：`https://github.com/sylphias/blog2.git`

#### 方法 B：手动上传（推荐）

打开命令行（CMD 或 PowerShell），进入项目目录：

```bash
# 1. 进入项目目录
cd d:\IDE_Project\blog2

# 2. 初始化 Git 仓库
git init

# 3. 添加所有文件
git add .

# 4. 提交更改
git commit -m "初始提交：我的博客系统"

# 5. 关联远程仓库（替换为您的仓库地址）
git remote add origin https://github.com/您的用户名/blog2.git

# 6. 设置主分支为 main
git branch -M main

# 7. 推送到 GitHub
git push -u origin main
```

**如果提示需要登录：**
- 输入您的 GitHub 用户名
- 输入密码（注意：GitHub 不再支持密码登录，需要使用 Personal Access Token）

#### 如何获取 GitHub Personal Access Token：

1. 访问：https://github.com/settings/tokens
2. 点击 **"Generate new token"** → **"Generate new token (classic)"**
3. 填写 Note：`博客部署`
4. Expiration：选择 `No expiration`（永不过期）
5. 勾选 `repo` 权限
6. 点击 **"Generate token"**
7. 复制生成的 token（只显示一次，请妥善保存）
8. 在 Git 推送时，密码处粘贴这个 token

### 2.3 验证上传成功

1. 访问您的 GitHub 仓库页面
2. 应该能看到所有文件：
   - ✅ server.js
   - ✅ package.json
   - ✅ vercel.json
   - ✅ public/ 目录
   - ✅ views/ 目录
   - ✅ 其他文件

---

## 第三步：在 Vercel 部署

### 3.1 连接 GitHub 仓库

1. 登录 Vercel：https://vercel.com/dashboard
2. 点击右上角的 **"Add New..."**
3. 选择 **"Project"**

### 3.2 导入项目

1. Vercel 会显示您的 GitHub 仓库列表
2. 找到 `blog2` 仓库
3. 点击右侧的 **"Import"** 按钮

### 3.3 配置项目

在配置页面，填写以下信息：

```
Project Name: blog2
Framework Preset: Other
Root Directory: (留空)
Build Command: (留空)
Output Directory: (留空)
Install Command: npm install
```

### 3.4 设置环境变量（可选但推荐）

1. 向下滚动找到 **"Environment Variables"**
2. 点击 **"Add New"**
3. 添加以下变量：

| Key | Value | Environment |
|-----|-------|-------------|
| NODE_ENV | production | Production, Preview, Development |

4. 点击 **"Add"**

### 3.5 开始部署

1. 点击页面底部的 **"Deploy"** 按钮
2. 等待部署开始（约 1-2 分钟）

### 3.6 观察部署过程

部署页面会显示：
- 📦 Installing dependencies（安装依赖）
- 🔨 Building（构建）
- 🚀 Deploying（部署）

**颜色说明：**
- 🟢 绿色：成功
- 🟡 黄色：进行中
- 🔴 红色：失败

---

## 第四步：验证部署

### 4.1 获取博客网址

部署完成后，您会看到：
- ✅ **Congratulations!** 消息
- 🌐 **Your blog2 project is ready!**
- 🔗 **Domain**: `https://blog2-xxx.vercel.app`

**复制这个网址！**

### 4.2 访问博客

1. 点击提供的域名链接
2. **重要：按 `Ctrl + Shift + R` 强制刷新浏览器**
3. 现在应该能看到完整的博客界面了！

### 4.3 检查样式是否正常

您应该看到：
- ✅ 紫色渐变背景的头部
- ✅ "我的博客" 和 "分享生活与技术" 标题
- ✅ 导航栏（首页、管理）
- ✅ 带阴影的文章卡片
- ✅ 美观的按钮样式
- ✅ 悬停动画效果

### 4.4 测试管理页面

在网址后面加上 `/admin`：
```
https://blog2-xxx.vercel.app/admin
```

应该能看到管理界面和文章发布表单。

---

## 常见问题解决

### 问题 1：部署失败（红色）

**可能原因：**
- package.json 格式错误
- 依赖安装失败
- 代码有语法错误

**解决方法：**
1. 点击红色的部署记录
2. 查看 **"Build Logs"** 找到错误信息
3. 修复错误后：
   ```bash
   git add .
   git commit -m "修复错误"
   git push
   ```
4. Vercel 会自动重新部署

### 问题 2：部署成功但只有文字，没有样式

**可能原因：**
- 浏览器缓存问题
- CDN 缓存未更新

**解决方法：**
1. 按 `Ctrl + Shift + R` 强制刷新
2. 清除浏览器缓存：
   - 按 `Ctrl + Shift + Delete`
   - 选择 "缓存的图片和文件"
   - 点击 "清除数据"
3. 使用无痕模式打开：
   - Chrome: `Ctrl + Shift + N`
   - Firefox: `Ctrl + Shift + P`
4. 等待 5-10 分钟让 CDN 缓存更新

### 问题 3：推送代码时提示认证失败

**解决方法：**
1. 使用 GitHub Personal Access Token（见上文）
2. 或配置 Git 凭据：
   ```bash
   git config user.name "您的用户名"
   git config user.email "您的邮箱"
   ```

### 问题 4：找不到仓库

**解决方法：**
1. 检查仓库链接是否正确
2. 确认仓库是 Public（公开）
3. 在 Vercel 中重新连接 GitHub：
   - Settings → Git → Sync

---

## 更新博客

### 如何修改博客内容？

1. 在本地修改代码
2. 提交到 GitHub：
   ```bash
   git add .
   git commit -m "更新博客"
   git push
   ```
3. Vercel 会自动检测到更新并重新部署
4. 等待 1-2 分钟
5. 刷新浏览器查看更新

### 如何发布新文章？

1. 访问：`https://您的网址/admin`
2. 填写文章标题、标签和内容
3. 点击 "发布文章"

---

## 高级功能

### 自定义域名

1. 在 Vercel 项目中，点击 **"Settings"**
2. 点击 **"Domains"**
3. 输入您的域名
4. 按照提示配置 DNS 记录

### 查看实时日志

1. 在 Vercel 项目中，点击 **"Deployments"**
2. 点击最新的部署
3. 点击 **"Realtime Logs"**

### 设置自动部署

默认情况下，每次推送到 GitHub 都会自动部署。如果想关闭：

1. 在 Vercel 项目中，点击 **"Settings"**
2. 点击 **"Git"**
3. 关闭 **"Deploy Hooks"**

---

## 总结

### 部署流程回顾：

```
1. 注册 Vercel 账号
   ↓
2. 上传代码到 GitHub
   ↓
3. 在 Vercel 导入项目
   ↓
4. 点击 Deploy
   ↓
5. 等待部署完成
   ↓
6. 访问博客网址
```

### 关键要点：

- ✅ 使用 GitHub Personal Access Token 进行认证
- ✅ 强制刷新浏览器（Ctrl + Shift + R）
- ✅ 等待 CDN 缓存更新（5-10 分钟）
- ✅ 查看部署日志排查问题

---

## 需要帮助？

如果遇到问题：

1. 查看 Vercel 官方文档：https://vercel.com/docs
2. 查看 GitHub 仓库的 Issues
3. 检查浏览器控制台错误（F12）
4. 查看 Vercel 部署日志

---

## 下一步

部署成功后，您可以：

- 🎨 自定义博客样式
- 📝 发布更多文章
- 🔗 分享博客链接
- 🌐 配置自定义域名
- 📊 查看访问统计

祝您部署成功！🎉
