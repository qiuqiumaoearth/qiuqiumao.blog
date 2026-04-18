# Notion 图片同步问题分析与解决方案

## 问题描述

当前使用 `notion-to-md` 库同步 Notion 文章到博客时，文章内容可以正常同步，但图片无法显示。

## 原因分析

### 1. Notion 图片链接的特性

Notion 中的图片有两种类型：

- **外部图片**：用户上传到外部图床或直接引用的外部 URL
- **内部图片**：直接上传到 Notion 的图片，存储在 Notion 的 AWS S3 服务器上

Notion 内部图片的 URL 特点：
```
https://prod-files-secure.s3.us-west-2.amazonaws.com/...?X-Amz-Algorithm=...&X-Amz-Expires=3600
```

### 2. 核心问题

**Notion 图片 URL 带有临时访问令牌，会在一段时间后过期（通常 1 小时）**

- `notion-to-md` 转换时获取的是带令牌的临时 URL
- 这些 URL 被写入 Markdown 文件后，在博客中显示时已经过期
- 导致图片 403 Forbidden 或无法加载

### 3. 当前脚本的问题

```javascript
// 当前代码只是简单转换，没有处理图片
const mdblocks = await n2m.pageToMarkdown(pageId)
const mdString = n2m.toMarkdownString(mdblocks)
```

这种方式会：
- 直接使用 Notion 的临时图片 URL
- 不下载图片到本地
- 不处理图片的持久化存储

## 解决方案

### 方案 1：下载图片到本地（推荐）

**优点**：
- 图片永久可用，不依赖 Notion
- 加载速度快（本地资源）
- 完全控制图片资源

**缺点**：
- 需要额外的存储空间
- 需要处理图片下载逻辑

**实现步骤**：

1. 解析 Markdown 中的图片 URL
2. 下载 Notion 图片到本地 `public/images/` 目录
3. 替换 Markdown 中的图片链接为本地路径
4. 提交图片文件到 Git 仓库

**代码示例**：
```javascript
const https = require('https')
const http = require('http')
const crypto = require('crypto')

// 下载图片
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const file = fs.createWriteStream(filepath)
    
    protocol.get(url, (response) => {
      response.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve()
      })
    }).on('error', (err) => {
      fs.unlink(filepath, () => {})
      reject(err)
    })
  })
}

// 处理图片
async function processImages(markdown, articleTitle) {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
  let match
  let processedMarkdown = markdown
  
  while ((match = imageRegex.exec(markdown)) !== null) {
    const [fullMatch, alt, imageUrl] = match
    
    // 只处理 Notion 图片
    if (imageUrl.includes('notion') || imageUrl.includes('amazonaws')) {
      // 生成唯一文件名
      const hash = crypto.createHash('md5').update(imageUrl).digest('hex').substring(0, 8)
      const ext = imageUrl.split('.').pop().split('?')[0] || 'png'
      const filename = `${articleTitle}-${hash}.${ext}`
      const imagePath = path.join(__dirname, '../public/images', filename)
      
      // 确保目录存在
      if (!fs.existsSync(path.dirname(imagePath))) {
        fs.mkdirSync(path.dirname(imagePath), { recursive: true })
      }
      
      // 下载图片
      await downloadImage(imageUrl, imagePath)
      
      // 替换为本地路径
      const localUrl = `/images/${filename}`
      processedMarkdown = processedMarkdown.replace(fullMatch, `![${alt}](${localUrl})`)
    }
  }
  
  return processedMarkdown
}
```

### 方案 2：使用图床服务

**优点**：
- 不占用仓库空间
- 图片有 CDN 加速
- 适合大量图片的场景

**缺点**：
- 依赖第三方服务
- 可能有费用
- 需要额外的 API 配置

**推荐图床**：
- 阿里云 OSS
- 腾讯云 COS
- 七牛云
- GitHub 仓库（作为图床）

### 方案 3：使用 Notion 公开分享链接

**优点**：
- 实现简单
- 不需要下载

**缺点**：
- 需要将 Notion 页面设为公开
- 仍然依赖 Notion 服务
- 可能有访问限制

## 推荐实现方案

**采用方案 1（下载到本地）+ 优化**：

1. 在 `scripts/sync-notion.js` 中添加图片下载逻辑
2. 图片保存到 `public/images/notion/` 目录
3. 在 GitHub Actions workflow 中添加图片文件的提交
4. 使用图片哈希命名避免重复下载

## 需要修改的文件

1. **scripts/sync-notion.js**
   - 添加图片下载函数
   - 添加图片 URL 替换逻辑
   - 在 `syncPage` 函数中调用图片处理

2. **.github/workflows/sync-notion.yml**
   - 修改 git add 命令，包含图片目录：
   ```yaml
   git add Article/note/*.md public/images/notion/*
   ```

3. **创建图片存储目录**
   ```bash
   mkdir -p public/images/notion
   ```

## 注意事项

1. **图片文件大小**：注意 Git 仓库大小，避免提交过大的图片
2. **图片格式**：建议压缩图片或转换为 WebP 格式
3. **错误处理**：图片下载失败时应有降级方案（保留原 URL 或使用占位图）
4. **并发控制**：大量图片下载时注意控制并发数，避免请求过多
5. **缓存机制**：已下载的图片不要重复下载（通过文件名哈希判断）

## 下一步行动

1. 确认使用哪种方案（推荐方案 1）
2. 修改 `sync-notion.js` 脚本添加图片处理逻辑
3. 测试图片下载和替换功能
4. 更新 GitHub Actions workflow
5. 验证博客图片显示正常
