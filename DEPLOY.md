# 博客部署指南 - 免费云平台部署

本指南将帮助您将博客部署到免费云平台，让全世界都能访问您的博客。

## 方案一：使用 Vercel 部署（推荐）

Vercel 是一个优秀的免费云平台，专为前端和Node.js应用设计。

### 步骤 1: 注册 Vercel 账号

1. 访问 [Vercel官网](https://vercel.com)
2. 点击 "Sign Up" 注册账号
3. 可以使用 GitHub、GitLab 或 Bitbucket 账号登录

### 步骤 2: 上传项目到 GitHub

#### 如果您已有 GitHub 账号：

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角的 "+"，选择 "New repository"
3. 仓库名称填写：`my-beautiful-blog`
4. 选择 "Public"（公开）或 "Private"（私有）
5. 点击 "Create repository"

#### 在本地上传项目：

在项目目录下打开命令行（PowerShell或CMD），执行以下命令：

```bash
# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "初始提交：我的博客系统"

# 关联远程仓库（替换YOUR_USERNAME为您的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/my-beautiful-blog.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

### 步骤 3: 在 Vercel 部署

1. 登录 [Vercel控制台](https://vercel.com/dashboard)
2. 点击 "Add New..." → "Project"
3. Vercel会自动同步您的GitHub仓库
4. 找到 `my-beautiful-blog` 项目，点击 "Import"
5. 配置项目：
   - Framework Preset: 选择 "Other"
   - Root Directory: 留空
   - Build Command: 留空
   - Output Directory: 留空
6. 点击 "Deploy"

### 步骤 4: 等待部署完成

部署通常需要1-2分钟，完成后您会获得一个免费的域名，例如：
```
https://my-beautiful-blog.vercel.app
```

### 步骤 5: 访问您的博客

点击提供的链接即可访问您的博客！全世界都可以通过这个地址访问。

---

## 方案二：使用 Render 部署

Render 是另一个优秀的免费云平台选项。

### 步骤 1: 注册 Render 账号

1. 访问 [Render官网](https://render.com)
2. 点击 "Sign Up" 注册账号
3. 使用 GitHub 账号登录

### 步骤 2: 创建 Web Service

1. 登录后点击 "New +"
2. 选择 "Web Service"
3. 连接您的GitHub仓库 `my-beautiful-blog`
4. 配置：
   - Name: `my-beautiful-blog`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Instance Type: `Free`（免费）
5. 点击 "Create Web Service"

### 步骤 3: 等待部署完成

部署完成后，您会获得一个免费的域名，例如：
```
https://my-beautiful-blog.onrender.com
```

---

## 重要提示

### 免费平台的限制

**Vercel:**
- ✅ 永久免费
- ✅ 自动HTTPS
- ✅ 全球CDN加速
- ✅ 自定义域名支持
- ⚠️ 免费版有函数执行时间限制（10秒）
- ⚠️ 数据存储在临时文件中，重启后可能丢失

**Render:**
- ✅ 永久免费
- ✅ 自动HTTPS
- ⚠️ 免费版15分钟后无访问会休眠（首次访问需要等待30秒唤醒）
- ⚠️ 数据存储在临时文件中，重启后可能丢失

### 数据持久化问题

由于免费平台使用临时存储，**服务重启后数据可能会丢失**。解决方案：

1. **定期备份文章**：在管理页面复制重要文章内容
2. **使用云数据库**：升级到付费计划并配置数据库
3. **本地保存文章**：在本地电脑保存文章的Markdown源文件

### 自定义域名（可选）

如果您有自己的域名，可以配置：

**Vercel:**
1. 在项目设置中点击 "Domains"
2. 添加您的域名
3. 按照提示配置DNS记录

**Render:**
1. 在Web Service设置中点击 "Custom Domains"
2. 添加您的域名
3. 配置DNS记录

---

## 快速测试命令

在部署前，您可以在本地测试：

```bash
# 安装依赖
npm install

# 启动服务器
npm start
```

然后访问 http://localhost:3000

---

## 常见问题

### Q: 部署后无法访问怎么办？

A:
1. 检查部署日志是否显示错误
2. 确认 `package.json` 中的 `start` 脚本正确
3. 等待几分钟让部署完全完成

### Q: 如何更新博客？

A:
1. 在本地修改代码
2. 提交到GitHub：
   ```bash
   git add .
   git commit -m "更新博客"
   git push
   ```
3. Vercel/Render会自动检测到更新并重新部署

### Q: 数据会丢失吗？

A:
- 免费版使用临时存储，服务重启后数据可能丢失
- 建议定期备份重要文章内容
- 如果需要持久化存储，建议升级到付费计划

### Q: 如何让博客更稳定？

A:
- 升级到Vercel Pro或Render付费计划
- 使用MongoDB Atlas等免费云数据库
- 配置自动备份策略

---

## 推荐方案

**如果您是初学者，推荐使用 Vercel：**
- 部署速度快
- 界面友好
- 文档完善
- 社区活跃

**如果您需要长时间运行的服务，推荐使用 Render：**
- 免费版不会频繁重启
- 更适合后端服务
- 支持长时间运行的任务

---

## 联系支持

如果遇到问题，可以：
- 查看 [Vercel文档](https://vercel.com/docs)
- 查看 [Render文档](https://render.com/docs)
- 在GitHub上提交Issue

---

## 下一步

部署完成后，您可以：
1. 访问您的博客并发布第一篇文章
2. 分享博客链接给朋友
3. 自定义博客样式和内容
4. 添加更多功能

祝您部署成功！🎉
