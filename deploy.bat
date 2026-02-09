@echo off
chcp 65001 >nul
echo ========================================
echo 博客快速部署脚本
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

echo [1/5] 初始化 Git 仓库...
git init
if %errorlevel% neq 0 (
    echo [错误] Git 初始化失败
    pause
    exit /b 1
)

echo [2/5] 添加所有文件...
git add .
if %errorlevel% neq 0 (
    echo [错误] 添加文件失败
    pause
    exit /b 1
)

echo [3/5] 提交更改...
git commit -m "初始提交：我的博客系统"
if %errorlevel% neq 0 (
    echo [错误] 提交失败
    pause
    exit /b 1
)

echo.
echo ========================================
echo 下一步操作
echo ========================================
echo.
echo 1. 在 GitHub 上创建新仓库: https://github.com/new
echo    仓库名称建议: my-beautiful-blog
echo.
echo 2. 创建完成后，复制仓库的 HTTPS 链接
echo    格式类似: https://github.com/用户名/仓库名.git
echo.
echo 3. 将GitHub仓库链接粘贴到下面:
echo.
set /p GITHUB_URL="GitHub仓库链接: "

if "%GITHUB_URL%"=="" (
    echo [错误] 未输入仓库链接
    pause
    exit /b 1
)

echo [4/5] 关联远程仓库...
git remote add origin %GITHUB_URL%
if %errorlevel% neq 0 (
    echo [警告] 远程仓库可能已存在，尝试更新...
    git remote set-url origin %GITHUB_URL%
)

echo [5/5] 推送到 GitHub...
git branch -M main
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo [错误] 推送失败！
    echo ========================================
    echo.
    echo 可能的原因：
    echo 1. GitHub仓库链接不正确
    echo 2. 未配置Git凭据（用户名和密码/token）
    echo 3. 网络连接问题
    echo.
    echo 解决方法：
    echo 1. 检查仓库链接是否正确
    echo 2. 配置Git凭据：
    echo    git config user.name "您的用户名"
    echo    git config user.email "您的邮箱"
    echo 3. 使用GitHub Personal Access Token进行认证
    echo    创建地址: https://github.com/settings/tokens
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✓ 推送成功！
echo ========================================
echo.
echo 下一步：
echo 1. 访问您的GitHub仓库查看代码
echo 2. 按照 DEPLOY.md 文件中的指南部署到 Vercel 或 Render
echo 3. 部署完成后，您将获得一个可访问的网址
echo.
pause
