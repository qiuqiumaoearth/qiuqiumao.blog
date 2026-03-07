<script setup>
import { useTotalTestStore } from '../store/totalTestStore.js'
import { ref } from 'vue'

const store = useTotalTestStore()
const activeTask = ref(null)
</script>

<template>
  <div class="ticktick-container">
    <div class="header">
      <h2>🚩总任务清单</h2>
      <span class="date">总的任务数：{{ store.allTasks }}</span>
    </div>

    <div class="task-section" v-if="store.pendingTasks.length > 0">
      <h4 class="section-title">进行中</h4>

      <ul class="task-list">
        <li
          v-for="task in store.pendingTasks"
          :key="task.id"
          class="task-item"
        >
          <label class="checkbox-container">
            <input type="checkbox" v-model="task.done" />
            <span class="checkmark"></span>

            <div class="task-content">
              <span class="task-text" >{{ task.text }}</span>

              <!-- 详情 -->
              <div
                class="task-detail"
              >
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
/* 滴答清单的极简风格 CSS */
.ticktick-container {
  max-width: 600px;
  margin: 0 auto;
  background: var(--vp-c-bg);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  padding: 30px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.header h2 { margin: 0; font-size: 1.5rem; color: var(--vp-c-text-1); border: none; }
.date { color: var(--vp-c-brand); font-weight: bold; background: var(--vp-c-brand-soft); padding: 4px 12px; border-radius: 20px; font-size: 0.9rem; }

/* 输入框样式 */
.input-box { margin-bottom: 30px; }
.input-wrapper { display: flex; align-items: center; background: var(--vp-c-bg-soft); border-radius: 12px; padding: 12px 16px; border: 1px solid transparent; transition: all 0.3s; }
.input-wrapper:focus-within { border-color: var(--vp-c-brand); background: var(--vp-c-bg); box-shadow: 0 0 0 2px var(--vp-c-brand-soft); }
.plus-icon { color: var(--vp-c-text-3); font-size: 1.2rem; margin-right: 12px; font-weight: bold; }
.input-wrapper input { flex: 1; border: none; background: transparent; outline: none; font-size: 1rem; color: var(--vp-c-text-1); }

/* 列表区域 */
.section-title { font-size: 0.85rem; color: var(--vp-c-text-3); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; margin-top: 0; }
.task-list { list-style: none; padding: 0; margin: 0; }
.task-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: var(--vp-c-bg-soft); margin-bottom: 8px; border-radius: 10px; transition: all 0.2s; border: 1px solid transparent; }
.task-item:hover { border-color: var(--vp-c-divider); transform: translateY(-1px); box-shadow: 0 2px 8px rgba(0,0,0,0.04); }

/* 自定义打勾框 */
.checkbox-container { display: flex; align-items: center; cursor: pointer; user-select: none; flex: 1; }
.checkbox-container input { position: absolute; opacity: 0; cursor: pointer; height: 0; width: 0; }
.checkmark { height: 20px; width: 20px; background-color: transparent; border: 2px solid var(--vp-c-text-3); border-radius: 6px; margin-right: 12px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
.checkbox-container:hover input ~ .checkmark { border-color: var(--vp-c-brand); }
.checkbox-container input:checked ~ .checkmark { background-color: var(--vp-c-brand); border-color: var(--vp-c-brand); }
.checkbox-container input:checked ~ .checkmark:after { content: "✔"; color: white; font-size: 12px; }

/* 文本和按钮 */
.task-content {
  display: flex;
  flex-direction: column;
}

.task-text { font-size: 1rem; color: var(--vp-c-text-1); transition: all 0.2s; }
.completed .task-text { text-decoration: line-through; color: var(--vp-c-text-3); }
.task-detail {
  margin-top: 6px;
  font-size: 0.8rem;
  line-height: 1;
  color: #b9b9c7;
}
.completed .task-item { opacity: 0.7; }
.delete-btn { background: none; border: none; cursor: pointer; opacity: 0; transition: opacity 0.2s; font-size: 1.1rem; }
.task-item:hover .delete-btn { opacity: 1; }

/* 动画过渡 */
.list-enter-active, .list-leave-active { transition: all 0.3s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(20px); }
.empty-state { text-align: center; color: var(--vp-c-text-3); padding: 40px 0; }
</style>