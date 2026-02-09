// 管理页面的JavaScript功能

// 文章表单提交
document.getElementById('postForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    const tags = document.getElementById('tags').value.trim();

    if (!title || !content) {
        showNotification('标题和内容不能为空', 'error');
        return;
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = '发布中...';

    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, tags })
        });

        const data = await response.json();

        if (data.success) {
            showNotification('文章发布成功！');
            this.reset();
            // 重新加载页面以显示新文章
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            showNotification(data.error || '发布失败', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('发布失败，请重试', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '发布文章';
    }
});

// 删除文章
async function deletePost(postId) {
    if (!confirm('确定要删除这篇文章吗？此操作不可恢复。')) {
        return;
    }

    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            showNotification('文章删除成功！');
            // 从DOM中移除文章项
            const postItem = document.querySelector(`button[onclick="deletePost(${postId})"]`).closest('.post-item');
            if (postItem) {
                postItem.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    postItem.remove();
                    // 如果没有文章了，显示空状态
                    const postsList = document.querySelector('.posts-list');
                    if (postsList.children.length === 0) {
                        postsList.innerHTML = `
                            <div class="empty-state">
                                <p>还没有发布任何文章</p>
                            </div>
                        `;
                    }
                }, 300);
            }
        } else {
            showNotification(data.error || '删除失败', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('删除失败，请重试', 'error');
    }
}

// 添加淡出动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-20px);
        }
    }
`;
document.head.appendChild(style);

// 实时字数统计
const contentTextarea = document.getElementById('content');
if (contentTextarea) {
    const wordCount = document.createElement('div');
    wordCount.className = 'word-count';
    wordCount.style.cssText = `
        text-align: right;
        font-size: 0.85rem;
        color: #64748b;
        margin-top: 0.5rem;
    `;
    contentTextarea.parentNode.appendChild(wordCount);

    function updateWordCount() {
        const text = contentTextarea.value;
        const charCount = text.length;
        const wordCountValue = text.trim() ? text.trim().split(/\s+/).length : 0;
        wordCount.textContent = `${charCount} 字符 | ${wordCountValue} 词`;
    }

    contentTextarea.addEventListener('input', updateWordCount);
    updateWordCount();
}

// 自动保存草稿功能（使用localStorage）
const titleInput = document.getElementById('title');
const tagsInput = document.getElementById('tags');

function saveDraft() {
    const draft = {
        title: titleInput.value,
        content: contentTextarea.value,
        tags: tagsInput.value,
        timestamp: Date.now()
    };
    localStorage.setItem('blogDraft', JSON.stringify(draft));
}

function loadDraft() {
    const draft = localStorage.getItem('blogDraft');
    if (draft) {
        const parsedDraft = JSON.parse(draft);
        const minutesAgo = Math.floor((Date.now() - parsedDraft.timestamp) / 60000);

        if (minutesAgo < 30) { // 只加载30分钟内的草稿
            if (confirm('发现未保存的草稿，是否恢复？')) {
                titleInput.value = parsedDraft.title;
                contentTextarea.value = parsedDraft.content;
                tagsInput.value = parsedDraft.tags;
                updateWordCount();
            }
        }
        localStorage.removeItem('blogDraft');
    }
}

// 自动保存草稿
let draftTimeout;
[titleInput, contentTextarea, tagsInput].forEach(input => {
    input.addEventListener('input', () => {
        clearTimeout(draftTimeout);
        draftTimeout = setTimeout(saveDraft, 1000); // 1秒后自动保存
    });
});

// 页面加载时检查草稿
window.addEventListener('load', loadDraft);

// 表单提交成功后清除草稿
document.getElementById('postForm').addEventListener('submit', () => {
    localStorage.removeItem('blogDraft');
});
