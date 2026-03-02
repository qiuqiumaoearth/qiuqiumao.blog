<script setup>
import { useStudyStore } from '../store/study.js'

const store = useStudyStore()
</script>

<template>
  <div class="card">
    <h2>🔥 连续打卡</h2>
    <p class="big">{{ store.currentStreak }} 天</p>
    <p>累计 {{ store.totalDays }} 天</p>
  </div>
</template>

<style scoped>
.card {
  /* 1. 基础外观 */
  padding: 24px;
  background: var(--vp-c-bg-soft); /* 用柔和一点的背景色，显得更像卡片 */
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05); /* 加点极简的高级感阴影 */

  /* 2. 核心魔法：Flex 弹性布局 */
  display: flex;
  flex-direction: column; /* 让里面的文字从上往下垂直排列 */
  justify-content: center; /* 纵向居中对齐 */
  align-items: center; /* 横向居中对齐 */
  gap: 12px; /* 元素之间的呼吸间距，非常优雅的属性 */

  /* 3. 撑起空间的秘密 */
  height: 50%; /* 如果外面有更大的父级盒子，它会努力长高去填满 */
  min-height: 180px; /* 给它一个保底高度，就算没内容也不会缩成一团 */
  box-sizing: border-box;
}

/* 清除默认的边距，让 Flex 完全接管排版 */
.card h2, .card p {
  margin: 0; 
}

h2 {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
}

.big {
  font-size: 3rem; /* 稍微放大一点，更有视觉冲击力 */
  font-weight: 900;
  color: var(--vp-c-brand); /* 用主题高亮色 */
  line-height: 1; /* 让大字体的上下不留多余空白 */
}
</style>