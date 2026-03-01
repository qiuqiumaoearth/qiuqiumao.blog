import { defineStore } from 'pinia'

export const useStudyStore = defineStore('study', {
  state: () => ({
    records: JSON.parse(localStorage.getItem('study-records') || '[]')
  }),

  getters: {
    totalDays: (state) => state.records.length,

    totalMinutes: (state) =>
      state.records.reduce((sum, r) => sum + r.minutes, 0),

    currentStreak: (state) => {
      if (!state.records.length) return 0

      const sorted = [...state.records]
        .map(r => r.date)
        .sort()
        .reverse()

      let streak = 1
      for (let i = 1; i < sorted.length; i++) {
        const prev = new Date(sorted[i - 1])
        const curr = new Date(sorted[i])
        const diff = (prev - curr) / (1000 * 60 * 60 * 24)

        if (diff === 1) {
          streak++
        } else break
      }
      return streak
    }
  },

  actions: {
    addRecord(minutes) {
      const today = new Date().toISOString().slice(0, 10)

      if (!this.records.find(r => r.date === today)) {
        this.records.push({
          date: today,
          minutes
        })
      }

      localStorage.setItem(
        'study-records',
        JSON.stringify(this.records)
      )
    }
  }
})