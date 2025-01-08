import { defineStore } from 'pinia'
import { http } from '@/utils/http'

export const useTaskStore = defineStore(
  'plan',
  () => {
    const store = reactive({ task: [] })
    const curYear = Math.max(new Date().getFullYear(), 2025)

    const getCurPlan = (key) => {
      const data = store.task[curYear]
      return key ? data[key] : data
    }

    const handleTask = (task: TaskRes[]): Array<Plan> => {
      return [...new Set(task.map((row) => row.catalog))].map((catalog) => ({
        catalog,
        list: task.filter((row) => row.catalog === catalog),
      }))
    }
    const editTask = async (body) => {
      http.post('/task', { openid: uni.getStorageSync('openid'), ...body })
    }
    const getTask = async (): Promise<Plan[]> => {
      const { data } = await http.get<Array<TaskRes>>('/task', {
        openid: uni.getStorageSync('openid'),
      })
      store.task = handleTask(data)
      return store.task
    }

    return {
      store,
      curYear,
      getCurPlan,
      editTask,
      getTask,
    }
  },
  {
    persist: true,
  },
)
