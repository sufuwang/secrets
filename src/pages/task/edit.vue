<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <template v-if="data.pageTitle">
    <Layout :title="data.pageTitle">
      <wd-notice-bar
        v-if="data.notices.length"
        type="info"
        direction="vertical"
        prefix="sound"
        :delay="3"
        :text="data.notices"
      />
      <wd-form ref="formRef" :model="model">
        <wd-cell-group border>
          <TaskBaseInfo v-model="model" v-model:data="data" :isToComplete="isToComplete" />
          <TaskCompleteInfo v-if="isToComplete" v-model="model" v-model:data="data" />
        </wd-cell-group>
      </wd-form>
      <view class="p-2 flex flex-row gap-2">
        <wd-button
          v-if="!isToComplete && data.taskId"
          block
          type="error"
          custom-class="rounded-2! flex-auto"
          :disabled="data.loading"
          @click="onDelete"
        >
          <wd-loading v-if="data.loading" :size="20" />
          <view v-else>删除</view>
        </wd-button>
        <wd-button
          block
          type="primary"
          custom-class="rounded-2! flex-auto"
          :disabled="data.loading"
          @click="onSubmit"
        >
          <wd-loading v-if="data.loading" :size="20" />
          <view v-else-if="isToComplete">完成任务</view>
          <view v-else>保存</view>
        </wd-button>
      </view>
    </Layout>
  </template>
</template>
<script setup lang="ts">
import { dayjs } from 'wot-design-uni'
import Layout from '@/components/Layout.vue'
import { useTaskStore, useUserStore } from '@/store'
import TaskBaseInfo from './components/TaskBaseInfo.vue'
import TaskCompleteInfo from './components/TaskCompleteInfo.vue'

const { editTask, getTask, getTaskCatalog, updateTask, deleteTask, getTaskFiles } = useTaskStore()
const { openid } = useUserStore()

const formRef = ref(null)
const data = reactive({
  filesLimit: 10,
  pageTitle: '',
  taskId: '',
  showCatalogTips: true,
  loading: false,
  notices: [],
  showCatalogList: false,
  catalogs: [],
  files: [],
  formData: {
    parentType: 'task',
    parentId: '',
  },
  openid: '',
})
const model = ref<{ [key: string]: any }>({
  catalog: '',
  title: '',
  taskDesc: '',
  deadline: Date.now(),
  visible: 'public',
  priority: 'common',
})

export type Data = Partial<typeof data>
export type Model = Partial<(typeof model)['value']>

const isToComplete = computed(() => data.pageTitle === '完成任务')

onBeforeMount(async () => {
  const { options } = getCurrentPages<{ options: TaskQuery }>().at(-1)
  getTaskDetail(options)
  getPageTitle(options)
})

const getPageTitle = ({ id, status }: TaskQuery) => {
  if (status === 'toComplete') {
    data.pageTitle = '完成任务'
  } else if (id) {
    data.pageTitle = '编辑任务'
  } else {
    data.pageTitle = '新增任务'
  }
}
const getTaskDetail = async ({ id }: TaskQuery) => {
  data.openid = await openid
  data.catalogs = (await getTaskCatalog()).data
  if (!id) {
    return
  }
  data.taskId = id
  data.formData.parentId = id
  data.files = await getTaskFiles(id)
  const task = await getTask({ id })
  model.value = {
    ...model.value,
    ...task,
    deadline: dayjs(task.deadline.split(' ').at(0)).unix() * 1000,
    doneFileIds: data.files.map((row) => row.id),
  }
  data.notices.push(
    `任务新建时间为 ${model.value.registerDate}`,
    `上次更新时间为 ${model.value.lastUpdateDate}`,
  )
}
const onDelete = async () => {
  const {
    data: { affected },
  } = await deleteTask<{ affected: number }>(data.taskId)
  if (affected === 1) {
    uni.navigateBack()
  }
}
const onSubmit = async () => {
  if (isToComplete.value) {
    if (model.value.doneFileIds.length === 0) {
      uni.showToast({
        icon: 'none',
        title: '快上传一些照片来证明一下你的努力吧',
      })
      return
    } else if (model.value.doneFileIds.length > data.filesLimit) {
      uni.showToast({
        icon: 'none',
        title: `最多支持上传 ${data.filesLimit} 张图片`,
      })
      return
    }
  }
  try {
    data.loading = true
    const { valid } = await formRef.value.validate()
    if (!valid) {
      return
    }
    await (data.taskId ? updateTask : editTask)({
      ...model.value,
      deadline: dayjs(model.value.deadline).format('YYYY-MM-DD 23:59:59'),
      done: isToComplete.value,
    })
    uni.showToast({
      icon: 'none',
      title: '任务已保存',
    })
    uni.navigateBack({
      fail() {
        uni.redirectTo({
          url: '/pages/task/index',
        })
      },
    })
  } finally {
    data.loading = false
  }
}
</script>
