# 🚀 快速开始 - 让您的博客上线

## 第一步：本地测试

### 1. 安装 Node.js
访问 [Node.js官网](https://nodejs.org/) 下载并安装最新LTS版本

### 2. 安装依赖并启动
```bash
npm install
npm start
```

### 3. 访问本地博客
打开浏览器访问：http://localhost:3000

---

## 第二步：上传到 GitHub（3分钟）

### 方法 A：使用自动部署脚本（推荐）

双击运行 `deploy.bat` 文件，按照提示操作即可。

### 方法 B：手动上传

```bash
# 1. 在 GitHub 创建新仓库
# 访问 https://github.com/new

# 2. 在项目目录执行以下命令
git init
git add .
git commit -m "初始提交：我的博客系统"
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

---

## 第三步：部署到云端（2分钟）

### 推荐：使用 Vercel（免费）

1. 访问 [Vercel](https://vercel.com) 并注册账号
2. 点击 "New Project"
3. 选择您的 GitHub 仓库
4. 点击 "Deploy"

**等待1-2分钟，您就会获得一个免费域名！**

例如：`https://my-beautiful-blog.vercel.app`

---

## 🎉 完成！

现在全世界都可以通过您的博客网址访问您的博客了！

### 您的博客功能：
- ✅ 美观的紫色渐变设计
- ✅ 支持 Markdown 格式
- ✅ 无需登录即可浏览
- ✅ 响应式设计（手机也能完美访问）
- ✅ 文章浏览量统计
- ✅ 标签系统

### 管理博客：
- 访问 `您的网址/admin` 即可发布和删除文章

---

## 📝 重要提示

### 免费版限制：
- 数据存储在临时文件中，服务重启后可能丢失
- 建议定期备份重要文章内容

### 如何备份数据：
1. 在管理页面复制文章内容
2. 在本地电脑保存 Markdown 源文件
3. 定期导出所有文章

---

## 🆘 遇到问题？

查看详细的部署指南：[DEPLOY.md](DEPLOY.md)

常见问题：
- **推送失败**：检查 Git 凭据配置
- **部署失败**：查看 Vercel 部署日志
- **无法访问**：等待几分钟让部署完全完成

---

## 💡 下一步

1. 发布您的第一篇文章
2. 分享博客链接给朋友
3. 自定义博客样式
4. 添加更多功能

祝您使用愉快！ 🎊
