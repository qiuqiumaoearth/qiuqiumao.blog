import { defineConfig } from 'vitepress'

// 1. 引入博客主题的最新配置生成器
import { getThemeConfig } from '@sugarat/theme/node'

// 2. 生成主题配置
const blogTheme = getThemeConfig({
  // 这里以后可以放博客专属的高级配置，目前我们先保持默认
})

export default defineConfig({
  // 3. 继承生成的配置（注意这里不用加括号了）
  extends: blogTheme,
  
  // 👇 已经将 base 彻底删除，默认使用顶级根目录 '/'
  lang: 'zh-CN',            // 网站全局语言设为纯中文
  title: "秋猫的博客",
  description: "记录生活与技术",

  themeConfig: {
    // 网站左上角的导航栏
    nav: [
      { text: '首页', link: '/pages/index.md' },
      { text: '学习主控台', link: '/pages/dashboard.md' },
      { text: '关于我', link: '/about' },

    ],
    // 右上角的社交链接
    socialLinks: [
      
      { icon: 'github', link: 'https://github.com/qiuqiumaoearth/qiuqiumaoearth.github.io' } 
    ],
    aside: 'left', 
    
    outline: {
      level: [2, 6],
      label: '文章目录'
    },
  }
})