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
    function getTask(query: { id?: string }): Promise<TaskRes>
    async function getTask({ id } = { id: '' }) {
      const { data } = await http.get<Array<TaskRes>>('/task', id && { id })
      if (id) {
        return data[0]
      }
      store.task = handleTask(data)
      return store.task
    }
    const getTaskCatalog = () => {
      return http.get<Array<string>>('/task/catalog')
    }
    const editTask = async (body) => {
      return http.post('/task', body)
    }
    const updateTask = async (body) => {
      return http.put('/task', body)
    }
    const deleteTask = async <T>(id: string) => {
      return http.delete<T>('/task', {}, { id })
    }
    const getTaskFiles = async (id: string) => {
      const { data } = await http.get<Array<any>>(
        '/file',
        { parentType: 'task', parentId: id },
        { disableWithPathPrefix: true },
      )
      return data.map((row) => ({ ...row, url: __BASEURL__ + row.url }))
    }

    return {
      store,
      curYear,
      getCurPlan,
      editTask,
      getTask,
      getTaskCatalog,
      updateTask,
      deleteTask,
      getTaskFiles,
    }
  },
  {
    persist: true,
  },
)
