import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTickTickStore = defineStore('ticktick', () => {
  // 以后每天在这里手动增删改查
  const tasks = ref([
    { id: 1, text: '完成 408 数据结构（二叉树）课后题', done: false },
    { id: 2, text: '复习 CET-6 高频词汇 50 个', done: false },
  ])

  // 自动帮你把上面的任务分发到“未完成”和“已完成”两个列表
  const pendingTasks = computed(() => tasks.value.filter(t => !t.done))
  const completedTasks = computed(() => tasks.value.filter(t => t.done))

  return { tasks, pendingTasks, completedTasks }
})