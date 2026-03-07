<script setup>
import TickTick from './components/TickTick.vue'
import TotalTest from './components/TotalTest.vue'


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
.dashboard {
  min-height: 100vh;
  background: var(--vp-c-bg-alt);
}

.dashboard-header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: var(--vp-c-bg);
}

.dashboard-main {
  display: flex;
  gap: 30px;
  padding: 40px;
  display: flex;
  flex-wrap: wrap;
}


.ticktick { 
  width: 50%;
  flex: 1;
}
.total-test {
  width: 50%;
  flex: 1;
}



@media (max-width: 768px) {
  .dashboard-main {
    flex-direction: column;
  }
}
</style>