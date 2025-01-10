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
    function getTask(): Promise<Plan[]>
    function getTask(query: { id: string }): Promise<TaskRes>
    async function getTask({ id } = { id: '' }) {
      const { data } = await http.get<Array<TaskRes>>('/task', {
        openid: uni.getStorageSync('openid'),
        id,
      })
      if (id) {
        return data[0]
      }
      store.task = handleTask(data)
      return store.task
    }
    const editTask = async (body) => {
      return http.post('/task', { openid: uni.getStorageSync('openid'), ...body })
    }
    const updateTask = async (body) => {
      return http.put('/task', { openid: uni.getStorageSync('openid'), ...body })
    }
    const deleteTask = async <T>(id: string) => {
      return http.delete<T>('/task', {}, { openid: uni.getStorageSync('openid'), id })
    }

    return {
      store,
      curYear,
      getCurPlan,
      editTask,
      getTask,
      updateTask,
      deleteTask,
    }
  },
  {
    persist: true,
  },
)
