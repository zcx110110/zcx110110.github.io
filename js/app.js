// 模拟文件数据
const mockFiles = [
    { id: 1, name: '项目计划书.docx', size: '2.5 MB', type: 'docx', category: 'documents', date: '2024-01-15', preview: true },
    { id: 2, name: '产品演示.pptx', size: '15.8 MB', type: 'pptx', category: 'documents', date: '2024-01-14', preview: true },
    { id: 3, name: '财务报表.xlsx', size: '8.3 MB', type: 'xlsx', category: 'documents', date: '2024-01-13', preview: true },
    { id: 4, name: '公司logo.png', size: '1.2 MB', type: 'image', category: 'images', date: '2024-01-12', preview: true },
    { id: 5, name: '会议记录.pdf', size: '3.7 MB', type: 'pdf', category: 'documents', date: '2024-01-11', preview: true },
    { id: 6, name: '产品照片.jpg', size: '4.9 MB', type: 'image', category: 'images', date: '2024-01-10', preview: true },
    { id: 7, name: '营销视频.mp4', size: '125 MB', type: 'video', category: 'videos', date: '2024-01-09', preview: true },
    { id: 8, name: '背景音乐.mp3', size: '7.6 MB', type: 'audio', category: 'audios', date: '2024-01-08', preview: true },
    { id: 9, name: '设计稿.psd', size: '45 MB', type: 'psd', category: 'others', date: '2024-01-07', preview: false },
    { id: 10, name: '项目文档', size: '0 KB', type: 'folder', category: 'all', date: '2024-01-06', preview: false },
];

// 当前显示的文件列表
let currentFiles = [...mockFiles];

// DOM元素
const filesContainer = document.getElementById('files-container');
const menuItems = document.querySelectorAll('.menu li');
const viewButtons = document.querySelectorAll('.view-switcher button');
const searchInput = document.getElementById('search-input');
const uploadInput = document.getElementById('upload-input');
const previewModal = document.getElementById('preview-modal');
const previewTitle = document.getElementById('preview-title');
const previewContent = document.getElementById('preview-content');
const closePreview = document.getElementById('close-preview');
const newFolderBtn = document.getElementById('new-folder-btn');
const newFolderModal = document.getElementById('new-folder-modal');
const closeFolderModal = document.getElementById('close-folder-modal');
const createFolderBtn = document.getElementById('create-folder-btn');
const folderName = document.getElementById('folder-name');

// 初始化
function init() {
    renderFiles();
    setupEventListeners();
}

// 渲染文件列表
function renderFiles(files = currentFiles) {
    filesContainer.innerHTML = '';
    
    if (files.length === 0) {
        filesContainer.innerHTML = '<div class="empty-state">暂无文件</div>';
        return;
    }
    
    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.dataset.type = file.type;
        fileItem.dataset.id = file.id;
        
        // 文件图标
        let iconClass = getFileIconClass(file.type);
        
        fileItem.innerHTML = `
            <div class="file-icon">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="file-info">
                <div class="file-name">${file.name}</div>
                <div class="file-meta">
                    <span>${file.size}</span>
                    <span>${file.date}</span>
                </div>
            </div>
        `;
        
        // 添加点击事件
        fileItem.addEventListener('click', () => handleFileClick(file));
        
        filesContainer.appendChild(fileItem);
    });
}

// 获取文件图标类
function getFileIconClass(type) {
    switch(type) {
        case 'doc':
        case 'docx':
            return 'fa-file-word';
        case 'ppt':
        case 'pptx':
            return 'fa-file-powerpoint';
        case 'xls':
        case 'xlsx':
            return 'fa-file-excel';
        case 'pdf':
            return 'fa-file-pdf';
        case 'image':
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            return 'fa-file-image';
        case 'video':
        case 'mp4':
        case 'avi':
        case 'mov':
            return 'fa-file-video';
        case 'audio':
        case 'mp3':
        case 'wav':
            return 'fa-file-audio';
        case 'folder':
            return 'fa-folder';
        default:
            return 'fa-file';
    }
}

// 处理文件点击
function handleFileClick(file) {
    if (file.type === 'folder') {
        // 处理文件夹点击（在实际应用中可能会进入文件夹）
        alert(`进入文件夹: ${file.name}`);
    } else if (file.preview) {
        // 显示文件预览
        showFilePreview(file);
    } else {
        // 不可预览的文件提示下载
        alert(`文件 ${file.name} 不可预览，请下载查看`);
    }
}

// 显示文件预览
function showFilePreview(file) {
    previewTitle.textContent = file.name;
    previewContent.innerHTML = '';
    
    // 添加加载状态
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'preview-loading';
    loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 加载中...';
    previewContent.appendChild(loadingIndicator);
    
    switch(file.type) {
        case 'image':
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            const img = document.createElement('img');
            // 在实际应用中，这里应该设置实际的图片URL
            img.src = `https://picsum.photos/800/600?random=${file.id}`;
            img.alt = file.name;
            
            // 添加错误处理
            img.onerror = function() {
                previewContent.innerHTML = '<p class="error-message">图片加载失败，请稍后重试</p>';
            };
            
            img.onload = function() {
                previewContent.innerHTML = '';
                previewContent.appendChild(img);
            };
            break;
            
        case 'pdf':
            const embed = document.createElement('embed');
            // 在实际应用中，这里应该设置实际的PDF URL
            embed.src = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';
            embed.type = 'application/pdf';
            embed.width = '100%';
            embed.height = '600px';
            
            // 添加错误处理
            embed.onerror = function() {
                previewContent.innerHTML = '<p class="error-message">PDF加载失败，请稍后重试</p>';
            };
            
            // 设置定时器，检查嵌入内容是否加载成功
            setTimeout(() => {
                previewContent.innerHTML = '';
                previewContent.appendChild(embed);
            }, 500);
            break;
            
        case 'video':
        case 'mp4':
        case 'avi':
        case 'mov':
            const video = document.createElement('video');
            video.controls = true;
            video.src = 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4';
            
            // 添加错误处理
            video.onerror = function() {
                previewContent.innerHTML = '<p class="error-message">视频加载失败，请稍后重试</p>';
            };
            
            video.onloadeddata = function() {
                previewContent.innerHTML = '';
                previewContent.appendChild(video);
            };
            break;
            
        case 'audio':
        case 'mp3':
        case 'wav':
            const audio = document.createElement('audio');
            audio.controls = true;
            audio.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
            
            // 添加错误处理
            audio.onerror = function() {
                previewContent.innerHTML = '<p class="error-message">音频加载失败，请稍后重试</p>';
            };
            
            audio.onloadeddata = function() {
                previewContent.innerHTML = '';
                previewContent.appendChild(audio);
            };
            break;
            
        case 'doc':
        case 'docx':
        case 'ppt':
        case 'pptx':
        case 'xls':
        case 'xlsx':
            // 使用Microsoft Office Online Viewer - 适合GitHub Pages使用
            const iframe = document.createElement('iframe');
            iframe.width = '100%';
            iframe.height = '600px';
            iframe.style.border = 'none';
            
            // 注意：这里使用的是示例URL，实际应用中需要替换为真实文件URL
            // 对于GitHub Pages，需要确保文件URL是公开可访问的
            const sampleUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + 
                             encodeURIComponent('https://file-examples.com/storage/fe948bd3ee638e570a3762a/2017/02/file-sample_100kB.docx');
            
            iframe.src = sampleUrl;
            
            // 添加加载超时处理
            setTimeout(() => {
                previewContent.innerHTML = '';
                previewContent.appendChild(iframe);
            }, 500);
            break;
            
        default:
            setTimeout(() => {
                previewContent.innerHTML = '<p>无法预览此文件类型</p>';
            }, 500);
    }
    
    previewModal.style.display = 'flex';
}

// 分类文件
function filterFilesByCategory(category) {
    menuItems.forEach(item => item.classList.remove('active'));
    const activeItem = document.querySelector(`[data-category="${category}"]`);
    activeItem.classList.add('active');
    
    if (category === 'all') {
        currentFiles = [...mockFiles];
    } else {
        currentFiles = mockFiles.filter(file => file.category === category);
    }
    
    renderFiles();
}

// 切换视图
function switchView(view) {
    viewButtons.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-view="${view}"]`);
    activeBtn.classList.add('active');
    
    filesContainer.classList.remove('grid-view', 'list-view');
    filesContainer.classList.add(`${view}-view`);
}

// 搜索文件
function searchFiles(query) {
    if (!query.trim()) {
        renderFiles();
        return;
    }
    
    const results = currentFiles.filter(file => 
        file.name.toLowerCase().includes(query.toLowerCase())
    );
    
    renderFiles(results);
}

// 处理文件上传
function handleFileUpload(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    
    // 在实际应用中，这里应该有文件上传逻辑
    alert(`已选择 ${files.length} 个文件，准备上传...`);
    
    // 模拟上传成功
    setTimeout(() => {
        alert('文件上传成功！');
        // 重置文件输入
        uploadInput.value = '';
    }, 1000);
}

// 创建新文件夹
function createNewFolder() {
    const name = folderName.value.trim();
    if (!name) {
        alert('请输入文件夹名称');
        return;
    }
    
    // 在实际应用中，这里应该有创建文件夹的逻辑
    alert(`文件夹 "${name}" 创建成功！`);
    
    // 重置并关闭模态框
    folderName.value = '';
    newFolderModal.style.display = 'none';
}

// 设置事件监听器
function setupEventListeners() {
    // 菜单项点击事件
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            filterFilesByCategory(category);
        });
    });
    
    // 视图切换事件
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            switchView(view);
        });
    });
    
    // 搜索事件
    searchInput.addEventListener('input', () => {
        searchFiles(searchInput.value);
    });
    
    // 文件上传事件
    uploadInput.addEventListener('change', handleFileUpload);
    
    // 预览模态框关闭事件
    closePreview.addEventListener('click', () => {
        previewModal.style.display = 'none';
    });
    
    // 点击模态框外部关闭
    previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) {
            previewModal.style.display = 'none';
        }
    });
    
    // 新建文件夹事件
    newFolderBtn.addEventListener('click', () => {
        newFolderModal.style.display = 'flex';
    });
    
    closeFolderModal.addEventListener('click', () => {
        newFolderModal.style.display = 'none';
    });
    
    createFolderBtn.addEventListener('click', createNewFolder);
    
    // 点击模态框外部关闭
    newFolderModal.addEventListener('click', (e) => {
        if (e.target === newFolderModal) {
            newFolderModal.style.display = 'none';
        }
    });
    
    // 按ESC键关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            previewModal.style.display = 'none';
            newFolderModal.style.display = 'none';
        }
    });
    
    // 按Enter键创建文件夹
    folderName.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            createNewFolder();
        }
    });
}

// 启动应用
init();