# GitHub Pages 部署指南

本指南将帮助您将网盘应用部署到GitHub Pages上。

## 前提条件

- GitHub账号
- Git已安装在您的电脑上

## 步骤1：创建GitHub仓库

1. 登录您的GitHub账号
2. 点击右上角的 "+" 图标，选择 "New repository"
3. 输入仓库名称（例如：`web-file-storage`）
4. 选择仓库可见性（公开或私有）
5. 点击 "Create repository"

## 步骤2：将本地代码推送到GitHub

```bash
# 在本地项目目录中执行以下命令

# 初始化Git仓库（如果尚未初始化）
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 添加远程仓库（替换为您的GitHub仓库URL）
git remote add origin https://github.com/您的用户名/您的仓库名.git

# 推送代码到GitHub
git push -u origin master
```

## 步骤3：启用GitHub Pages

1. 进入您的GitHub仓库页面
2. 点击 "Settings" 选项卡
3. 在左侧导航栏中选择 "Pages"
4. 在 "Source" 部分，从下拉菜单中选择 `master` 或 `main` 分支
5. 选择根目录 (`/ (root)`) 作为发布源
6. 点击 "Save"
7. 稍等几分钟，GitHub Pages将构建并发布您的网站

## 步骤4：访问您的网站

部署成功后，您将在GitHub Pages设置页面看到一个URL（通常格式为 `https://您的用户名.github.io/您的仓库名/`）。点击此URL即可访问您的网盘应用。

## 自定义域名（可选）

如果您想使用自定义域名，可以在GitHub Pages设置页面的 "Custom domain" 部分添加您的域名，然后按照GitHub的指导在您的DNS提供商处设置相应的DNS记录。

## 注意事项

- GitHub Pages仅支持静态网站，无法运行服务器端代码
- 文件上传功能在纯GitHub Pages环境中无法正常工作，需要后端服务器支持
- 对于Office文档预览，需要确保使用的是公开可访问的文件URL
- 大型文件预览可能会受到GitHub Pages带宽限制

## 更新网站

当您对本地代码进行更改后，可以通过以下命令更新GitHub Pages上的网站：

```bash
git add .
git commit -m "更新说明"
git push origin master
```

GitHub Pages会自动重新构建并发布更新后的网站。