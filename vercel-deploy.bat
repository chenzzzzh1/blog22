@echo off
chcp 65001 >nul
echo ========================================
echo Vercel 部署自动化脚本
echo ========================================
echo.

REM 检查是否已安装git
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Git，请先安装 Git
    echo 下载地址: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [步骤 1/6] 检查 Git 配置...
git config --global user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo [提示] 需要配置 Git 用户信息
    set /p GIT_NAME="请输入您的 GitHub 用户名: "
    git config --global user.name "%GIT_NAME%"
    set /p GIT_EMAIL="请输入您的 GitHub 邮箱: "
    git config --global user.email "%GIT_EMAIL%"
    echo ✓ Git 配置完成
) else (
    echo ✓ Git 已配置
)

echo.
echo [步骤 2/6] 初始化 Git 仓库...
if not exist .git (
    git init
    echo ✓ Git 仓库已初始化
) else (
    echo ✓ Git 仓库已存在
)

echo.
echo [步骤 3/6] 添加所有文件...
git add .
if %errorlevel% neq 0 (
    echo [错误] 添加文件失败
    pause
    exit /b 1
)
echo ✓ 文件已添加

echo.
echo [步骤 4/6] 提交更改...
git commit -m "修复 Vercel 静态文件加载问题" >nul 2>&1
if %errorlevel% neq 0 (
    echo [警告] 没有新的更改需要提交
) else (
    echo ✓ 更改已提交
)

echo.
echo ========================================
echo 请提供您的 GitHub 仓库信息
echo ========================================
echo.
echo 如果还没有创建仓库，请先访问:
echo https://github.com/new
echo.
echo 仓库名称建议: blog2
echo.
set /p GITHUB_URL="GitHub 仓库链接: "

if "%GITHUB_URL%"=="" (
    echo [错误] 未输入仓库链接
    pause
    exit /b 1
)

echo.
echo [步骤 5/6] 关联远程仓库...
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    git remote add origin %GITHUB_URL%
    echo ✓ 远程仓库已关联
) else (
    git remote set-url origin %GITHUB_URL%
    echo ✓ 远程仓库已更新
)

echo.
echo [步骤 6/6] 推送到 GitHub...
echo.
echo ========================================
echo 正在推送代码...
echo ========================================
echo.
echo 如果提示需要认证，请使用 GitHub Personal Access Token
echo 获取地址: https://github.com/settings/tokens
echo.
git branch -M main
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo [错误] 推送失败！
    echo ========================================
    echo.
    echo 可能的原因：
    echo 1. 仓库链接不正确
    echo 2. 未配置认证信息
    echo 3. 网络连接问题
    echo.
    echo 解决方法：
    echo 1. 检查仓库链接是否正确
    echo 2. 使用 GitHub Personal Access Token
    echo    创建地址: https://github.com/settings/tokens
    echo 3. 推送时，密码处粘贴 token
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✓ 推送成功！
echo ========================================
echo.
echo 下一步操作：
echo.
echo 1. 访问 Vercel: https://vercel.com/dashboard
echo.
echo 2. 找到您的博客项目
echo.
echo 3. 点击 "Deployments" 标签
echo.
echo 4. 找到最新的部署，点击 "..." 菜单
echo.
echo 5. 选择 "Redeploy" 重新部署
echo.
echo 6. 等待 1-2 分钟让部署完成
echo.
echo 7. 访问您的博客并按 Ctrl+Shift+R 强制刷新
echo.
echo ========================================
echo 详细部署指南请查看: VERCEL_DEPLOY_GUIDE.md
echo ========================================
echo.
pause
