# 🔧 博客故障排除指南

## 问题：打开博客只有文字，没有样式和动画

### 可能的原因和解决方案：

### 1. 未安装依赖

**症状：** 页面显示纯文本，没有任何样式

**解决方案：**
```bash
npm install
```

### 2. 服务器未正确启动

**症状：** 无法访问 localhost:3000

**解决方案：**
```bash
# 停止当前服务器（Ctrl+C）
# 重新启动
npm start
```

### 3. 浏览器缓存问题

**症状：** 样式没有更新

**解决方案：**
- 按 `Ctrl + Shift + R`（Windows）或 `Cmd + Shift + R`（Mac）强制刷新
- 或按 `F12` 打开开发者工具，右键刷新按钮，选择"清空缓存并硬性重新加载"

### 4. CSS文件未正确加载

**症状：** 按F12查看控制台，显示CSS加载失败

**解决方案：**
1. 检查 `public/css/style.css` 文件是否存在
2. 确认服务器正在运行
3. 查看浏览器控制台的错误信息（按F12）

### 5. 端口被占用

**症状：** 启动时显示端口已被使用

**解决方案：**
```bash
# Windows 查找占用端口的进程
netstat -ano | findstr :3000

# 结束进程（替换PID为实际进程ID）
taskkill /PID <PID> /F

# 或者修改server.js中的端口号
const PORT = 3001; // 改为其他端口
```

---

## 诊断步骤：

### 步骤 1：测试 CSS 是否正常

访问测试页面：`http://localhost:3000/test.html`

如果测试页面显示正常（有渐变背景和动画），说明CSS文件正常，问题出在博客页面。

### 步骤 2：检查服务器日志

启动服务器后，查看控制台输出：
```
博客服务器已启动！
访问地址: http://localhost:3000
管理页面: http://localhost:3000/admin
```

如果看到这些信息，说明服务器正常启动。

### 步骤 3：检查浏览器控制台

1. 按 `F12` 打开开发者工具
2. 切换到 "Console"（控制台）标签
3. 查看是否有红色错误信息

常见错误：
- `404 Not Found` - 文件未找到
- `Failed to load resource` - 资源加载失败
- `EJS template error` - 模板错误

### 步骤 4：检查网络请求

1. 按 `F12` 打开开发者工具
2. 切换到 "Network"（网络）标签
3. 刷新页面
4. 查看 `style.css` 和 `main.js` 的状态

如果显示红色（失败），说明文件未正确加载。

---

## 常见错误信息：

### Error: Cannot find module 'ejs'

**原因：** 未安装依赖

**解决：**
```bash
npm install
```

### Error: listen EADDRINUSE: address already in use :::3000

**原因：** 端口被占用

**解决：**
```bash
# 方法1：结束占用端口的进程
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# 方法2：修改端口号
# 编辑 server.js，将 PORT 改为其他值
```

### GET /css/style.css 404

**原因：** CSS文件路径错误或不存在

**解决：**
1. 确认 `public/css/style.css` 文件存在
2. 检查文件路径是否正确
3. 重启服务器

---

## 完整重置步骤：

如果以上方法都不行，尝试完全重置：

```bash
# 1. 停止服务器（Ctrl+C）

# 2. 删除 node_modules 和 package-lock.json
rmdir /s /q node_modules
del package-lock.json

# 3. 重新安装依赖
npm install

# 4. 清除浏览器缓存
# 按 Ctrl+Shift+Delete，清除缓存

# 5. 重启服务器
npm start

# 6. 访问测试页面
# http://localhost:3000/test.html
```

---

## 联系支持：

如果问题仍然存在，请提供以下信息：

1. 操作系统版本
2. Node.js 版本（运行 `node -v`）
3. npm 版本（运行 `npm -v`）
4. 浏览器类型和版本
5. 控制台错误信息截图
6. 控制台输出截图

---

## 预防措施：

1. **定期更新依赖：**
   ```bash
   npm update
   ```

2. **使用版本控制：**
   ```bash
   git init
   git add .
   git commit -m "初始提交"
   ```

3. **备份数据：**
   定期备份 `data/posts.json` 文件

4. **使用 PM2 管理进程（生产环境）：**
   ```bash
   npm install -g pm2
   pm2 start server.js
   pm2 save
   ```
