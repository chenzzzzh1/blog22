const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const os = require('os');
const marked = require('marked');
const sanitizeHtml = require('sanitize-html');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(__dirname)); // 允许访问根目录下的静态文件

// 数据存储文件 - 使用临时目录以支持云平台
const isCloud = process.env.NODE_ENV === 'production' || process.env.VERCEL || process.env.RENDER;
const DATA_DIR = isCloud ? path.join(os.tmpdir(), 'blog-data') : path.join(__dirname, 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 初始化文章数据
function initPosts() {
    if (!fs.existsSync(POSTS_FILE)) {
        const initialPosts = [
            {
                id: 1,
                title: '欢迎来到我的博客',
                content: '# 欢迎来到我的博客\n\n这是我的第一篇博客文章。这个博客系统简洁美观，支持Markdown格式。\n\n## 功能特点\n\n- 美观大方的设计\n- 支持Markdown格式\n- 无需登录即可浏览\n- 响应式设计，支持移动端\n\n## 关于我\n\n我是一名开发者，喜欢分享技术知识和生活感悟。希望你能在这里找到有用的内容！',
                excerpt: '这是我的第一篇博客文章。这个博客系统简洁美观，支持Markdown格式。',
                date: new Date().toISOString(),
                views: 0,
                tags: ['欢迎', '介绍']
            }
        ];
        fs.writeFileSync(POSTS_FILE, JSON.stringify(initialPosts, null, 2));
    }
}

// 读取所有文章
function getPosts() {
    try {
        const data = fs.readFileSync(POSTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// 保存所有文章
function savePosts(posts) {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
}

// 获取单篇文章
function getPostById(id) {
    const posts = getPosts();
    return posts.find(post => post.id === parseInt(id));
}

// 首页 - 显示所有文章列表
app.get('/', (req, res) => {
    const posts = getPosts().sort((a, b) => new Date(b.date) - new Date(a.date));
    res.render('index', { posts });
});

// 文章详情页
app.get('/post/:id', (req, res) => {
    const post = getPostById(req.params.id);
    if (!post) {
        return res.status(404).render('404', { error: '文章不存在' });
    }

    // 增加浏览量
    const posts = getPosts();
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (postIndex !== -1) {
        posts[postIndex].views = (posts[postIndex].views || 0) + 1;
        savePosts(posts);
    }

    // 将Markdown转换为HTML
    const htmlContent = marked.parse(post.content);
    res.render('post', { post, content: htmlContent });
});

// 管理页面 - 发布新文章
app.get('/admin', (req, res) => {
    const posts = getPosts().sort((a, b) => new Date(b.date) - new Date(a.date));
    res.render('admin', { posts });
});

// API - 创建新文章
app.post('/api/posts', (req, res) => {
    const { title, content, tags } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: '标题和内容不能为空' });
    }

    const posts = getPosts();
    const newPost = {
        id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
        title: sanitizeHtml(title),
        content: sanitizeHtml(content, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'h3', 'code', 'pre']),
            allowedAttributes: {}
        }),
        excerpt: content.replace(/[#*`]/g, '').substring(0, 200) + '...',
        date: new Date().toISOString(),
        views: 0,
        tags: tags ? tags.split(',').map(t => t.trim()).filter(t => t) : []
    };

    posts.unshift(newPost);
    savePosts(posts);

    res.json({ success: true, post: newPost });
});

// API - 删除文章
app.delete('/api/posts/:id', (req, res) => {
    const posts = getPosts();
    const filteredPosts = posts.filter(post => post.id !== parseInt(req.params.id));

    if (filteredPosts.length === posts.length) {
        return res.status(404).json({ error: '文章不存在' });
    }

    savePosts(filteredPosts);
    res.json({ success: true });
});

// 404页面
app.use((req, res) => {
    res.status(404).render('404', { error: '页面不存在' });
});

// 启动服务器
initPosts();

// 导出app供Vercel使用
if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    module.exports = app;
} else {
    app.listen(PORT, () => {
        console.log('='.repeat(50));
        console.log('博客服务器已启动！');
        console.log('='.repeat(50));
        console.log(`访问地址: http://localhost:${PORT}`);
        console.log(`管理页面: http://localhost:${PORT}/admin`);
        console.log('='.repeat(50));
    });
}
