# 美观大气的个人博客系统

一个简洁美观、功能完善的个人博客系统，无需用户登录系统，支持Markdown格式，响应式设计。

## 功能特点

- 美观大气的渐变色设计
- 支持Markdown格式文章
- 无需用户登录即可浏览
- 响应式设计，完美支持移动端
- 文章浏览量统计
- 标签系统
- 自动保存草稿功能
- 实时字数统计
- 流畅的动画效果

## 安装步骤

### 1. 安装Node.js

首先需要安装Node.js环境。访问 [Node.js官网](https://nodejs.org/) 下载并安装最新LTS版本。

验证安装：
```bash
node -v
npm -v
```

### 2. 安装项目依赖

在项目目录下运行：
```bash
npm install
```

### 3. 启动博客服务器

```bash
npm start
```

或者：
```bash
node server.js
```

### 4. 访问博客

启动成功后，在浏览器中访问：

- 博客首页：http://localhost:3000
- 管理页面：http://localhost:3000/admin

## 使用说明

### 发布文章

1. 访问 http://localhost:3000/admin
2. 在左侧表单中填写文章标题、标签和内容
3. 支持Markdown格式编写文章
4. 点击"发布文章"按钮即可发布

### 查看文章

- 首页显示所有文章列表
- 点击文章标题或"阅读更多"查看文章详情
- 文章详情页会自动统计浏览量

### 删除文章

在管理页面的右侧文章列表中，点击"删除"按钮即可删除文章。

### Markdown语法示例

```markdown
# 一级标题
## 二级标题

这是普通文本，可以包含**粗体**和*斜体*。

- 列表项1
- 列表项2
- 列表项3

1. 有序列表1
2. 有序列表2

[链接文字](https://example.com)

![图片描述](image.jpg)

`代码片段`

\`\`\`javascript
// 代码块
function hello() {
    console.log("Hello, World!");
}
\`\`\`

> 引用文本
```

## 项目结构

```
blog2/
├── data/
│   └── posts.json          # 文章数据存储
├── public/
│   ├── css/
│   │   └── style.css       # 样式文件
│   └── js/
│       ├── main.js         # 主要JavaScript
│       └── admin.js        # 管理页面JavaScript
├── views/
│   ├── index.ejs           # 首页模板
│   ├── post.ejs            # 文章详情模板
│   ├── admin.ejs           # 管理页面模板
│   └── 404.ejs             # 404页面模板
├── server.js               # 服务器文件
├── package.json            # 项目配置
└── README.md               # 说明文档
```

## 技术栈

- **后端**: Node.js + Express
- **模板引擎**: EJS
- **Markdown解析**: Marked
- **HTML清理**: sanitize-html
- **前端**: 原生JavaScript + CSS3

## 自定义配置

### 修改端口

在 `server.js` 文件中修改 `PORT` 变量：

```javascript
const PORT = 3000; // 改为你想要的端口号
```

### 修改样式

所有样式都在 `public/css/style.css` 文件中，可以根据需要自定义颜色、字体等。

### 修改主题色

在 `style.css` 的 `:root` 中修改CSS变量：

```css
:root {
    --primary-color: #2563eb;      /* 主色调 */
    --secondary-color: #64748b;    /* 次要颜色 */
    --danger-color: #dc2626;       /* 危险操作颜色 */
    /* ... 其他颜色变量 */
}
```

## 数据存储

文章数据存储在 `data/posts.json` 文件中，使用JSON格式。每次启动服务器时会自动检查并创建该文件。

## 注意事项

1. 确保Node.js版本 >= 14.0
2. 数据文件 `posts.json` 会自动创建，请勿手动修改
3. 建议定期备份 `data/posts.json` 文件
4. 在生产环境中建议使用PM2等进程管理工具

## 常见问题

### Q: 如何让其他人访问我的博客？

A: 需要将博客部署到公网服务器上。可以使用以下方式：
- 购买云服务器（阿里云、腾讯云等）
- 使用Heroku、Vercel等云平台
- 使用内网穿透工具（仅用于测试）

### Q: 如何备份文章数据？

A: 定期复制 `data/posts.json` 文件到安全位置即可。

### Q: 支持图片上传吗？

A: 当前版本暂不支持图片上传，但可以使用Markdown的图片语法引用在线图片。

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎反馈。
