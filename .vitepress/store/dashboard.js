import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useDashboardStore = defineStore('dashboard', () => {
  // 1. 待办事项数据
  const todos = useLocalStorage('my-todos', [
    { id: 1, text: '完成个人博客的基础搭建与自动化部署', done: true },
    { id: 2, text: '熟记并背诵 CET-6 高频词汇 50 个', done: false },
    { id: 3, text: '408 计算机基础：复习数据结构（二叉树章节）', done: false },
    { id: 4, text: '下午摸鱼时间，记得给蛋蛋开个主食罐头 🐈', done: false }
  ])

  // 2. 进度条数据
  const progressList = useLocalStorage('my-progress', [
    { id: 1, name: '408 考研专业课总进度', value: 15 },
    { id: 2, name: '日语学习进度', value: 5 },
    { id: 3, name: 'VitePress 博客改造计划', value: 85 }
  ])

  // 3. 随笔数据
  const notes = useLocalStorage('my-notes', '在这里记录今天的灵感和碎碎念...')

  // 添加新任务的方法
  const addTodo = (text) => {
    if (text.trim()) {
      todos.value.push({ id: Date.now(), text, done: false })
    }
  }

  // 删除任务的方法
  const removeTodo = (id) => {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  return { todos, progressList, notes, addTodo, removeTodo }
})