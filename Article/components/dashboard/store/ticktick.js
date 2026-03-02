import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import taskTemplate from '../data/tasks.json'

export const useTickTickStore = defineStore('ticktick', () => {

  // 当前选择的日期（默认今天）
  const selectedDate = ref(new Date().toISOString().slice(0, 10))

  // 所有模板数据
  const allDays = ref(taskTemplate)

  // 当前 storage key
  const storageKey = computed(() => `tasks-${selectedDate.value}`)

  // 当前任务列表
  const tasks = ref([])

  // 加载任务
  function loadTasks() {
    const saved = localStorage.getItem(storageKey.value)

    if (saved) {
      tasks.value = JSON.parse(saved)
    } else {
      const template = allDays.value.find(d => d.date === selectedDate.value)
      tasks.value = template ? JSON.parse(JSON.stringify(template.tasks)) : []
    }
  }

  // 保存任务
  function save() {
    localStorage.setItem(storageKey.value, JSON.stringify(tasks.value))
  }

  // 监听日期变化自动加载
  watch(selectedDate, loadTasks, { immediate: true })

  const pendingTasks = computed(() =>
    tasks.value.filter(t => !t.done)
  )

  const completedTasks = computed(() =>
    tasks.value.filter(t => t.done)
  )

  return {
    selectedDate,
    tasks,
    pendingTasks,
    completedTasks,
    loadTasks,
    save
  }
})