# 我的网盘应用

一个现代化的Web网盘应用，支持文件分类、预览和管理功能。

## 功能特性

- 📁 **文件分类浏览** - 按文档、图片、视频、音频等类型分类查看
- 👁️ **多格式预览** - 支持Office文档、PDF、图片、视频、音频在线预览
- 📱 **响应式设计** - 适配不同屏幕尺寸，移动端友好
- 🔍 **实时搜索** - 快速查找文件
- 📤 **文件上传** - 支持多文件上传
- 📂 **文件夹管理** - 创建和管理文件夹
- 📊 **存储空间显示** - 直观展示存储使用情况

## 技术栈

- HTML5
- CSS3 (Flexbox & Grid)
- JavaScript
- Font Awesome (图标库)

## 安装和使用

1. 克隆或下载本仓库
2. 直接在浏览器中打开 `index.html` 或使用本地服务器
   ```bash
   cd pan
   python -m http.server 8080
   ```
3. 访问 http://localhost:8080

## GitHub Pages 部署

1. 将代码推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择主分支和根目录
4. 访问生成的GitHub Pages URL

## 文件结构

```
pan/
├── css/             # 样式文件
│   └── style.css
├── js/              # JavaScript文件
│   └── app.js
├── icons/           # 图标目录
├── index.html       # 主页面
└── README.md        # 项目说明
```

## 注意事项

- 本项目目前使用模拟数据，实际使用时需要集成后端API
- 文件上传功能需要后端支持
- Office文档预览使用Microsoft Office Online Viewer，需要网络连接

## License

MIT