import { defineStore } from 'pinia'
import totalTestData from '../data/totalTestData.json'
import { ref, computed } from 'vue'


export const useTotalTestStore = defineStore('totalTest', () => {

  // 所有模板数据
  const totalTest = ref(totalTestData)

  // 未完成任务
  const pendingTasks = computed(() =>
    totalTest.value.tasks.filter(t => !t.done)
  )

  // 已完成任务
  const completedTasks = computed(() =>
    totalTest.value.tasks.filter(t => t.done)
  )

  //所有任务
  const allTasks = computed(() =>
    totalTest.value.tasks.length
  )

  return {
    totalTest,
    pendingTasks,
    completedTasks,
    allTasks
  }

})