import BlogTheme from '@sugarat/theme'
import { createPinia } from 'pinia'
import { inBrowser, withBase } from 'vitepress'
import type { Theme } from 'vitepress'

const PASS_KEY = 'vp-privacy-unlocked'
const PASSWORD = 'getyouoffer' // 改成你的密码
const PRIVACY_PREFIX = '/privacy/' // 按你的实际路由改

function normalizePath(path: string) {
  return path.endsWith('/') ? path : `${path}/`
}

function isPrivacyPath(path: string) {
  const current = normalizePath(path)
  const target = normalizePath(PRIVACY_PREFIX)
  return current === target || current.startsWith(target)
}

function checkPrivacyAccess(path: string) {
  if (!inBrowser) return true
  if (!isPrivacyPath(path)) return true

  const unlocked = sessionStorage.getItem(PASS_KEY)
  if (unlocked === '1') return true

  const input = window.prompt('请输入访问密码')
  if (input === PASSWORD) {
    sessionStorage.setItem(PASS_KEY, '1')
    return true
  }

  alert('密码错误')
  window.location.href = withBase('/')
  return false
}

export default {
  extends: BlogTheme,

  enhanceApp(ctx) {
    const { app, router } = ctx

    const pinia = createPinia()
    app.use(pinia)

    if (inBrowser) {
      checkPrivacyAccess(router.route.path)

      router.onBeforeRouteChange = to => {
        return checkPrivacyAccess(to)
      }
    }
  }
} satisfies Theme
