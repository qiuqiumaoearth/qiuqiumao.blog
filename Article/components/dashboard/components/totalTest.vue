<script setup>
  import { useTotalTestStore } from '../store/totalTestStore.js'

  const store = useTotalTestStore()

  // 计算百分比
  const getPercent = task => {
    if (!task.total) return 0
    return Math.round((task.now / task.total) * 100)
  }
</script>

<template>
  <div class="ticktick-container">
    <div class="header">
      <h2>🚩总任务清单</h2>
      <span class="date">总任务数：{{ store.allTasks }}</span>
    </div>

    <div class="task-section" v-if="store.pendingTasks.length > 0">
      <h4 class="section-title">进行中</h4>
      <ul class="task-list">
        <li
          v-for="task in store.pendingTasks"
          :key="task.id"
          class="task-item"
          :class="{ completed: task.done }"
        >
          <label class="checkbox-container">
            <input type="checkbox" v-model="task.done" />
            <span class="checkmark"></span>

            <div class="task-content">
              <!-- 第一行 -->
              <div class="task-row">
                <span class="task-text">
                  {{ task.text }}
                </span>

                <!-- 进度条 -->
                <div class="progress-wrapper">
                  <div
                    class="progress-bar"
                    :style="{
                      width: getPercent(task) + '%'
                    }"
                  ></div>
                </div>

                <span class="progress-percent">{{ getPercent(task) }}%</span>
              </div>

              <!-- 详情 -->
              <div class="task-detail">
                {{ task.detail }}
              </div>
            </div>
          </label>
        </li>
      </ul>
    </div>

    <!-- 已完成 -->
    <div class="task-section" v-if="store.completedTasks.length > 0">
      <h4 class="section-title completed-title">已完成</h4>

      <ul class="task-list">
        <li
          v-for="task in store.completedTasks"
          :key="task.id"
          class="task-item completed"
        >
          <label class="checkbox-container">
            <input type="checkbox" v-model="task.done" />
            <span class="checkmark"></span>

            <div class="task-content">
              <div class="task-row">
                <span class="task-text">
                  {{ task.text }}
                </span>

                <div class="progress-wrapper">
                  <div
                    class="progress-bar"
                    :style="{
                      width: getPercent(task) + '%'
                    }"
                  ></div>
                </div>

                <span class="progress-percent">{{ getPercent(task) }}%</span>
              </div>

              <div class="task-detail">
                {{ task.detail }}
              </div>
            </div>
          </label>
        </li>
      </ul>
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
    font-family:
      -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--vp-c-text-1);
    border: none;
  }

  .date {
    color: var(--vp-c-brand);
    font-weight: bold;
    background: var(--vp-c-brand-soft);
    padding: 0.25rem 0.75rem;
    border-radius: 1.25rem;
    font-size: 0.9rem;
  }

  .section-title {
    font-size: 0.85rem;
    color: var(--vp-c-text-3);
    text-transform: uppercase;
    letter-spacing: 0.0625rem;
    margin-bottom: 0.75rem;
  }

  .task-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .task-item {
    display: flex;
    align-items: center;
    padding: 0.875rem 1rem;
    background: var(--vp-c-bg-soft);
    margin-bottom: 0.5rem;
    border-radius: 0.625rem;
    transition: all 0.2s;
    border: 0.0625rem solid transparent;
  }

  .task-item:hover {
    border-color: var(--vp-c-divider);
    transform: translateY(-0.0625rem);
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.04);
  }

  .checkbox-container {
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    width: 100%;
  }

  .checkbox-container input {
    position: absolute;
    opacity: 0;
  }

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

  .task-content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  /* 第一行 */
  .task-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  /* 任务文字 */
  .task-text {
    flex: 1;
    font-size: 1rem;
    color: var(--vp-c-text-1);
  }

  /* 进度条容器 */
  .progress-wrapper {
    width: 3rem;
    height: 0.4rem;
    background: var(--vp-c-bg-mute);
    border-radius: 1.25rem;
    overflow: hidden;
  }

  /* 进度条 */
  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--vp-c-brand), #7aa2ff);
    border-radius: 1.25rem;
    transition: width 0.4s ease;
  }

  /* 百分比 */
  .progress-percent {
    font-size: 0.75rem;
    color: var(--vp-c-text-3);
    width: 2.5rem;
    text-align: right;
  }

  /* 任务详情 */
  .task-detail {
    margin-top: 0.375rem;
    font-size: 0.8rem;
    color: #b9b9c7;
  }

  /* 完成状态 */
  .completed .task-text {
    text-decoration: line-through;
    color: var(--vp-c-text-3);
  }

  .completed {
    opacity: 0.7;
  }

  /* 空状态 */
  .empty-state {
    text-align: center;
    color: var(--vp-c-text-3);
    padding: 2.5rem 0;
  }
</style>
