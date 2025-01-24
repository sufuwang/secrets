<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <Layout :title="title" barClass="bg-[#eeeeee]!">
    <wd-swiper
      v-if="files.length"
      autoplay
      enable-preview
      customClass="p-2 bg-[#eeeeee]"
      imageMode="aspectFit"
      :list="files"
      v-model:current="current"
      @click="onClickSwiper"
    />
    <wd-table height="full" :data="model" :stripe="false" :showHeader="false">
      <wd-table-col prop="key" label="Key" width="33.4%"></wd-table-col>
      <wd-table-col prop="value" label="Value" width="66.6%">
        <template #value="{ row }">
          {{ formatValue(row) }}
        </template>
      </wd-table-col>
    </wd-table>
  </Layout>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
import Layout from '@/components/Layout.vue'
import { useTaskStore } from '@/store'
import { FormReflect, VisibleOptions, PriorityOptions, getFormField } from './config'

interface Raw {
  key: keyof typeof FormReflect
  value: string
}

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
      value: row[1] || '-',
    }))
    .filter((row) => row.key)
  files.value = filesInfo.map((row) => row.url)
})

const formatValue = ({ key, value }: Raw) => {
  const t = getFormField(key)
  if (t === 'visible') {
    return VisibleOptions.find((item) => item.value === value).label
  }
  if (t === 'priority') {
    return PriorityOptions.find((item) => item.value === value).label
  }
  if (t === 'doneDate') {
    const { value: startDate } = model.value.find((row) => row.key === getFormField('deadline'))
    const diff = dayjs(value).diff(dayjs(startDate), 'hour', true)
    return `${value} / ${diff < 0 ? `提前` : `滞后`} ${Math.abs(diff).toFixed(1)} 小时完成`
  }
  return value
}
const onClickSwiper = ({ item }) => {
  uni.previewImage({
    current: item,
    urls: files.value,
  })
}
</script>
