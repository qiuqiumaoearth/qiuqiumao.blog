<script setup>
  import TickTick from './components/TickTick.vue'
  import TotalTest from './components/totalTest.vue'
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <a href="/" class="back-btn">← 返回博客</a>
      <h1>学习主控台</h1>
    </header>

    <main class="dashboard-main">
      <div class="total-test">
        <TotalTest />
      </div>

      <div class="ticktick">
        <TickTick />
      </div>
    </main>
  </div>
</template>

<style scoped>
  /* 页面整体 */
  .dashboard {
    min-height: 100vh;
    background: var(--vp-c-bg-alt);
  }

  /* 顶部栏 */
  .dashboard-header {
    height: 3.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.25rem;
    background: var(--vp-c-bg);
    border-bottom: 0.0625rem solid var(--vp-c-divider);
  }

  .dashboard-header h1 {
    font-size: 1.25rem;
    margin: 0;
  }

  .back-btn {
    text-decoration: none;
    color: var(--vp-c-brand);
    font-size: 0.9rem;
  }

  /* 主区域 */
  .dashboard-main {
    display: flex;
    gap: 1.875rem;
    padding: 2.5rem;
    flex-wrap: wrap;
  }

  /* 两个模块 */
  .ticktick,
  .total-test {
    flex: 1;
    min-width: 20rem;
  }

  /* ===== 平板适配 ===== */
  @media (max-width: 1024px) {
    .dashboard-main {
      padding: 2rem;
      gap: 1.5rem;
    }

    .ticktick,
    .total-test {
      flex: 100%;
    }
  }

  /* ===== 手机适配 ===== */
  @media (max-width: 768px) {
    .dashboard-header {
      padding: 0 1rem;
    }

    .dashboard-header h1 {
      font-size: 1.1rem;
    }

    .dashboard-main {
      padding: 1.5rem 1rem;
      gap: 1.25rem;
    }

    .back-btn {
      font-size: 0.8rem;
    }
  }

  /* ===== 小手机 ===== */
  @media (max-width: 480px) {
    .dashboard-main {
      padding: 1rem 0.75rem;
    }

    .dashboard-header h1 {
      font-size: 1rem;
    }
  }
</style>
