import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import md from 'vite-plugin-md' // 安装：npm i vite-plugin-md -D
import path from 'path'

export default defineConfig({
  plugins: [
    vue({
      // 现在需要让 Vue 插件同时处理 .vue 和 .md 文件
      include: [/\.vue$/, /\.md$/],
    }),
    // 用 vite-plugin-md 来解析 Markdown 文件
    md({
      // 可以在这里配置 Markdown 解析规则，比如开启代码高亮
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~article': path.resolve(__dirname, 'Article')
    }
  }
})