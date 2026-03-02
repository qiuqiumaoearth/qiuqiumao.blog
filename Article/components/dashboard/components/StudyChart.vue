<script setup>
import { onMounted, ref } from 'vue'
import { Chart } from 'chart.js/auto'
import { useStudyStore } from '../store/study'

const canvasRef = ref(null)
const store = useStudyStore()

onMounted(() => {
  new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels: store.records.map(r => r.date),
      datasets: [
        {
          label: '学习时长(分钟)',
          data: store.records.map(r => r.minutes)
        }
      ]
    }
  })
})
</script>

<template>
  <div class="card">
    <h2>📊 学习趋势</h2>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>