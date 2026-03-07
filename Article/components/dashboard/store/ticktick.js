import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import taskTemplate from '../data/tasks.json'

export const useTickTickStore = defineStore('ticktick', () => {
  // 当前日期
  const selectedDate = ref(new Date().toISOString().slice(0, 10))

  // 当前任务
  const tasks = ref([])

  // 从 JSON 加载任务
  function loadTasks() {
    const day = taskTemplate.find(d => d.date === selectedDate.value)

    tasks.value = day ? structuredClone(day.tasks) : []
  }

  // 上一天
  function prevDay() {
    const d = new Date(selectedDate.value)
    d.setDate(d.getDate() - 1)
    selectedDate.value = d.toISOString().slice(0, 10)
  }

  // 下一天
  function nextDay() {
    const d = new Date(selectedDate.value)
    d.setDate(d.getDate() + 1)
    selectedDate.value = d.toISOString().slice(0, 10)
  }

  // 日期变化自动加载
  watch(selectedDate, loadTasks, { immediate: true })

  // 未完成任务
  const pendingTasks = computed(() => tasks.value.filter(t => !t.done))

  // 已完成任务
  const completedTasks = computed(() => tasks.value.filter(t => t.done))

  return {
    selectedDate,
    tasks,
    pendingTasks,
    completedTasks,
    prevDay,
    nextDay
  }
})
