import BlogTheme from '@sugarat/theme'
import { createPinia } from 'pinia' // 引入 Pinia
import type { App } from 'vue'

export default {
  ...BlogTheme,
  enhanceApp({ app }: { app: App }) {
    // 初始化 Pinia
    const pinia = createPinia()
    app.use(pinia)
  }
}