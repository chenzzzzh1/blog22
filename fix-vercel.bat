@echo off
chcp 65001 >nul
echo ========================================
echo Vercel 404 错误修复工具
echo ========================================
echo.

echo [问题说明]
echo 您的博客显示 CSS 和 JS 文件 404 错误
echo 这是因为 Vercel 的静态文件路由配置问题
echo.

echo [解决方案]
echo 我已经更新了 vercel.json 配置文件
echo 需要将修复推送到 GitHub 并重新部署
echo.

echo ========================================
echo 步骤 1/4: 检查 Git 配置
echo ========================================

git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Git
    pause
    exit /b 1
)

echo ✓ Git 已安装
echo.

echo ========================================
echo 步骤 2/4: 提交修复
echo ========================================

git add vercel.json
if %errorlevel% neq 0 (
    echo [错误] 添加文件失败
    pause
    exit /b 1
)

git commit -m "修复 Vercel 静态文件 404 错误" >nul 2>&1
if %errorlevel% neq 0 (
    echo [提示] 没有新的更改需要提交
) else (
    echo ✓ 已提交修复
)

echo.
echo ========================================
echo 步骤 3/4: 推送到 GitHub
echo ========================================

git push
if %errorlevel% neq 0 (
    echo.
    echo [错误] 推送失败！
    echo.
    echo 解决方法：
    echo 1. 检查网络连接
    echo 2. 使用 GitHub Personal Access Token
    echo    https://github.com/settings/tokens
    echo.
    pause
    exit /b 1
)

echo ✓ 推送成功
echo.

echo ========================================
echo 步骤 4/4: 在 Vercel 重新部署
echo ========================================
echo.
echo 请按照以下步骤操作：
echo.
echo 1. 访问: https://vercel.com/dashboard
echo.
echo 2. 找到您的博客项目
echo.
echo 3. 点击 "Deployments" 标签
echo.
echo 4. 找到最新的部署，点击 "..." 菜单
echo.
echo 5. 选择 "Redeploy"
echo.
echo 6. 等待 1-2 分钟让部署完成
echo.
echo 7. 访问博客并按 Ctrl+Shift+R 强制刷新
echo.
echo ========================================
echo 重要提示
echo ========================================
echo.
echo 修复后，请：
echo 1. 强制刷新浏览器（Ctrl + Shift + R）
echo 2. 清除浏览器缓存
echo 3. 或使用无痕模式打开
echo.
echo 如果问题仍然存在，请等待 5-10 分钟
echo 让 Vercel CDN 缓存更新
echo.
echo ========================================
echo 技术细节
echo ========================================
echo.
echo 修复内容：
echo - 更新了 vercel.json 配置
echo - 添加了 CSS 和 JS 文件的路由规则
echo - 配置了缓存策略
echo.
echo ========================================
pause
