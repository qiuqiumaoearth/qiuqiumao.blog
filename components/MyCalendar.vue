<script setup>
import { ref, computed } from 'vue'

const today = new Date()
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())
const selectedDate = ref(today.toDateString())

// Array to hold month names
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

// Calculate days to display
const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
})

const firstDayOfMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay()
})

// Navigation functions
const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const selectDate = (day) => {
  selectedDate.value = new Date(currentYear.value, currentMonth.value, day).toDateString()
}

// Our mock database for tasks
const tasks = ref({
  [new Date(2026, 1, 25).toDateString()]: ['Review 408 Data Structures (Trees)', 'Memorize 50 CET-6 high-frequency words'], 
  [new Date(2026, 1, 26).toDateString()]: ['Open a can of wet food for Dandan 🐈', 'Fix Vue layout bugs']
})
</script>

<template>
  <div class="calendar-container">
    <div class="header">
      <button @click="prevMonth">← Prev</button>
      <h3>{{ monthNames[currentMonth] }} {{ currentYear }}</h3>
      <button @click="nextMonth">Next →</button>
    </div>
    
    <div class="grid">
      <div class="day-name" v-for="d in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="d">{{ d }}</div>
      <div v-for="empty in firstDayOfMonth" :key="'empty'+empty" class="empty"></div>
      
      <div v-for="day in daysInMonth" :key="day" 
           class="day" 
           @click="selectDate(day)" 
           :class="{ active: selectedDate === new Date(currentYear, currentMonth, day).toDateString() }">
        {{ day }}
      </div>
    </div>

    <div class="tasks-panel">
      <h4>📝 Tasks for {{ selectedDate }}</h4>
      <ul v-if="tasks[selectedDate]">
        <li v-for="task in tasks[selectedDate]" :key="task">
          <input type="checkbox"> {{ task }}
        </li>
      </ul>
      <p v-else class="no-tasks">No tasks scheduled. Take a break!</p>
    </div>
  </div>
</template>

<style scoped>
.calendar-container {
  max-width: 500px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.header button { background: var(--vp-c-brand); color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; }
.header button:hover { background: var(--vp-c-brand-dark); }
.grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; text-align: center; }
.day-name { font-weight: bold; font-size: 0.9em; color: var(--vp-c-text-2); }
.day { padding: 10px 0; cursor: pointer; border-radius: 6px; background: var(--vp-c-bg-mute); transition: all 0.2s; }
.day:hover { background: var(--vp-c-brand-soft); color: var(--vp-c-brand); }
.day.active { background: var(--vp-c-brand); color: white; font-weight: bold; }
.tasks-panel { margin-top: 20px; padding-top: 15px; border-top: 1px solid var(--vp-c-divider); }
.tasks-panel ul { list-style: none; padding: 0; }
.tasks-panel li { margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
.no-tasks { color: var(--vp-c-text-3); font-style: italic; }
</style>