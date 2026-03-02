<script setup>
import MyCalendar from './components/MyCalendar.vue'
import TickTick from './components/TickTick.vue'
import StudyChart from './components/StudyChart.vue'
import StreakCard from './components/StreakCard.vue'

</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <a href="/" class="back-btn">← 返回博客</a>
      <h1>学习主控台</h1>
    </header>

    <main class="dashboard-main">
      <div class="streak-card">
        <StreakCard />
      </div>
      <div class="calendar">
        <MyCalendar />
      </div>
      <div class="ticktick">
        <TickTick />
      </div>
      <div class="chart">
        <StudyChart />
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

.calendar { 
  width: 50%;
  flex: 1;
}
.ticktick { 
  width: 50%;
  flex: 1;
}
.chart { 
  width: 50%;
  flex: 1;
}
.streak-card {
  width: 50%;
  flex: 1;
}



@media (max-width: 768px) {
  .dashboard-main {
    flex-direction: column;
  }
}
</style>