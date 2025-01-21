<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <Layout :title="title">
    <wd-swiper
      v-if="files.length"
      :list="files"
      autoplay
      v-model:current="current"
      customClass="p-2"
    />
    <wd-table height="full" :data="model" :stripe="false" :showHeader="false">
      <wd-table-col prop="key" label="Key" width="33.4%"></wd-table-col>
      <wd-table-col prop="value" label="Value" width="66.6%"></wd-table-col>
    </wd-table>
  </Layout>
</template>
<script lang="ts" setup>
import Layout from '@/components/Layout.vue'
import { useTaskStore } from '@/store'
import { FormReflect } from './config'

const { getTask, getTaskFiles } = useTaskStore()

const current = ref(0)
const title = ref('')
const model = ref([])
const files = ref([])

onBeforeMount(async () => {
  const { options } = getCurrentPages<{ options: TaskQuery }>().at(-1)
  const [taskInfo, filesInfo] = await Promise.all([getTask(options), getTaskFiles(options.id)])
  title.value = taskInfo.title
  model.value = Object.entries({ ...taskInfo, taskDesc: taskInfo.taskDesc || '-' })
    .map((row) => ({
      key: FormReflect[row[0]],
      value: row[1] ?? '-',
    }))
    .filter((row) => row.key)
  files.value = filesInfo.map((row) => row.url)
})
</script>
