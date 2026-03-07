<script setup>
  import { ref, computed } from 'vue'
  import { useTickTickStore } from '../store/ticktick.js'
  import taskTemplate from '../data/tasks.json'

  const store = useTickTickStore()

  const showCalendar = ref(false)

  const today = new Date()

  const currentMonth = ref(today.getMonth())
  const currentYear = ref(today.getFullYear())

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  // 本月天数
  const daysInMonth = computed(() => {
    return new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  })

  // 本月第一天星期
  const firstDay = computed(() => {
    return new Date(currentYear.value, currentMonth.value, 1).getDay()
  })

  // 生成日历
  const calendarDays = computed(() => {
    const days = []

    for (let i = 0; i < firstDay.value; i++) {
      days.push(null)
    }

    for (let d = 1; d <= daysInMonth.value; d++) {
      days.push(d)
    }

    return days
  })

  // 判断是否有任务
  const hasTask = day => {
    const date = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return taskTemplate.some(t => t.date === date)
  }

  // 选择日期
  const selectDay = day => {
    const date = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    store.selectedDate = date
    showCalendar.value = false
  }

  // 上月
  const prevMonth = () => {
    if (currentMonth.value === 0) {
      currentMonth.value = 11
      currentYear.value--
    } else {
      currentMonth.value--
    }
  }

  // 下月
  const nextMonth = () => {
    if (currentMonth.value === 11) {
      currentMonth.value = 0
      currentYear.value++
    } else {
      currentMonth.value++
    }
  }
</script>

<template>
  <div class="ticktick-container">
    <div class="header">
      <button class="day-btn" @click="store.prevDay()">◀</button>

      <div class="title-row">
        <h2>🎯 专属学习清单</h2>

        <span class="date">{{ store.selectedDate }}</span>

        <div class="calendar-wrapper">
          <button class="calendar-btn" @click="showCalendar = !showCalendar">
            📅
          </button>

          <div v-if="showCalendar" class="calendar">
            <div class="calendar-header">
              <button @click="prevMonth">‹</button>

              <span>
                {{
                  new Date(currentYear, currentMonth).toLocaleString(
                    'default',
                    { month: 'long' }
                  )
                }}
                {{ currentYear }}
              </span>

              <button @click="nextMonth">›</button>
            </div>

            <div class="week">
              <span v-for="d in weekDays" :key="d">{{ d }}</span>
            </div>

            <div class="days">
              <div
                v-for="(day, index) in calendarDays"
                :key="index"
                class="day"
                @click="day && selectDay(day)"
              >
                <span v-if="day">{{ day }}</span>

                <span v-if="day && hasTask(day)" class="dot">●</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class="day-btn" @click="store.nextDay()">▶</button>
    </div>

    <!-- 任务 -->

    <div class="task-section" v-if="store.pendingTasks.length">
      <h4 class="section-title">进行中</h4>

      <ul class="task-list">
        <li v-for="task in store.pendingTasks" :key="task.id" class="task-item">
          <label class="checkbox-container">
            <input type="checkbox" v-model="task.done" />

            <span class="checkmark"></span>

            <span class="task-text">{{ task.text }}</span>
          </label>
        </li>
      </ul>
    </div>

    <div
      class="task-section completed-section"
      v-if="store.completedTasks.length"
    >
      <h4 class="section-title">已完成</h4>

      <ul class="task-list">
        <li
          v-for="task in store.completedTasks"
          :key="task.id"
          class="task-item completed"
        >
          <label class="checkbox-container">
            <input type="checkbox" v-model="task.done" disabled />

            <span class="checkmark"></span>

            <span class="task-text">{{ task.text }}</span>
          </label>
        </li>
      </ul>
    </div>

    <div
      v-if="store.pendingTasks.length === 0 && store.completedTasks.length"
      class="empty-state"
    >
      今天的任务都完成了 真棒🎉
    </div>
    <div v-if="store.tasks.length === 0" class="empty-state">
      目前没有任务 🎉
    </div>
  </div>
</template>

<style scoped>
  .ticktick-container {
    max-width: 37.5rem;
    margin: 0 auto;
    background: var(--vp-c-bg);
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.08);
    padding: 1.875rem;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  .date {
    color: var(--vp-c-brand);
    background: var(--vp-c-brand-soft);
    padding: 0.25rem 0.625rem;
    border-radius: 1rem;
    font-size: 0.85rem;
  }

  .day-btn {
    width: 2.25rem;
    height: 2.25rem;
    border: none;
    border-radius: 0.5rem;
    background: var(--vp-c-brand-soft);
    cursor: pointer;
  }

  .calendar-wrapper {
    position: relative;
  }

  .calendar {
    position: absolute;
    top: 1.75rem;
    left: 0;
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 0.375rem 1.25rem rgba(0, 0, 0, 0.15);
    padding: 0.75rem;
    width: 13.75rem;
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.625rem;
  }

  .week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-size: 0.75rem;
    color: #888;
    margin-bottom: 0.3125rem;
  }

  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.25rem;
  }

  .day {
    height: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    border-radius: 0.375rem;
    font-size: 0.8125rem;
  }

  .day:hover {
    background: #f3f4f6;
  }

  .dot {
    font-size: 0.5rem;
    color: #ff5a5f;
    line-height: 0;
  }

  .section-title {
    font-size: 0.8rem;
    color: var(--vp-c-text-3);
    margin-bottom: 0.625rem;
  }

  .task-list {
    list-style: none;
    padding: 0;
  }

  .task-item {
    padding: 0.75rem 1rem;
    background: var(--vp-c-bg-soft);
    margin-bottom: 0.5rem;
    border-radius: 0.625rem;
  }

  /* checkbox */

  .checkbox-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100%;
  }

  .checkbox-container input {
    position: absolute;
    opacity: 0;
  }

  /* 勾选框 */

  .checkmark {
    height: 1.25rem;
    width: 1.25rem;
    border: 0.125rem solid var(--vp-c-text-3);
    border-radius: 0.375rem;
    margin-right: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .checkbox-container:hover .checkmark {
    border-color: var(--vp-c-brand);
  }

  .checkbox-container input:checked ~ .checkmark {
    background: var(--vp-c-brand);
    border-color: var(--vp-c-brand);
  }

  .checkbox-container input:checked ~ .checkmark::after {
    content: '✔';
    color: white;
    font-size: 0.75rem;
  }

  /* text */

  .task-text {
    flex: 1;
    font-size: 1rem;
    color: var(--vp-c-text-1);
  }

  /* completed */

  .completed .task-text {
    text-decoration: line-through;
    color: var(--vp-c-text-3);
  }

  .completed {
    opacity: 0.7;
  }

  /* empty */

  .empty-state {
    text-align: center;
    color: var(--vp-c-text-3);
    padding: 2.5rem 0;
  }

  @media (max-width: 768px) {
    .ticktick-container {
      padding: 1.25rem;
      border-radius: 0.75rem;
    }

    .date {
      font-size: 0.75rem;
      display: none;
    }
  }
</style>
