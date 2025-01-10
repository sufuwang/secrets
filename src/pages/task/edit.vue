<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <template v-if="data.pageTitle">
    <Layout :title="data.pageTitle" childClass="" :showNavigateBack="true">
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
          <wd-picker
            label="可见模式"
            label-width="120px"
            v-model="model.visible"
            :columns="[
              {
                value: 'public',
                label: '公开',
              },
              // {
              //   value: 'fans',
              //   label: '粉丝可见',
              // },
              {
                value: 'onlyMe',
                label: '仅自己可见',
              },
            ]"
            :rules="[{ required: true, message: '请选择可见模式' }]"
          />
          <wd-input
            label="任务分类"
            prop="catalog"
            label-width="120px"
            v-model="model.catalog"
            placeholder="请输入或选择任务分类"
            :rules="[{ required: true, message: '请填写或选择任务分类' }]"
          >
            <template #suffix>
              <view class="relative">
                <wd-picker :columns="data.catalogs" v-model="model.catalog" use-default-slot>
                  <wd-icon name="arrow-right" size="16px" color="rgba(0, 0, 0, 0.26)" />
                </wd-picker>
              </view>
            </template>
          </wd-input>
          <wd-input
            clearable
            prop="title"
            label="任务标题"
            label-width="120px"
            clear-trigger="focus"
            v-model="model.title"
            placeholder="请输入任务标题"
            :rules="[{ required: true, message: '请填写任务标题' }]"
          />
          <wd-calendar
            label="预计完成时间"
            label-width="120px"
            :min-date="Date.now()"
            v-model="model.deadline"
            :max-date="new Date(dayjs(`${dayjs().year()}-12-31`).date).getTime()"
            :displayFormat="(value: number) => dayjs(value).format('YYYY 年 M 月 D 日')"
            :rules="[{ required: true, message: '请填写预计完成时间' }]"
          />
          <wd-input
            clearable
            label="任务描述"
            prop="taskDesc"
            label-width="120px"
            clear-trigger="focus"
            v-model="model.taskDesc"
            placeholder="请输入任务描述"
          />
          <wd-picker
            label-width="120px"
            :columns="[
              { value: 'important', label: '重点关注' },
              { value: 'common', label: '一般' },
            ]"
            label="任务优先级"
            v-model="model.priority"
          />
        </wd-cell-group>
      </wd-form>
      <view class="p-2 flex flex-row gap-2">
        <wd-button
          v-if="data.taskId"
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
          <view v-else>保存</view>
        </wd-button>
      </view>
    </Layout>
  </template>
</template>
<script setup lang="ts">
import { dayjs } from 'wot-design-uni'
import Layout from '@/components/Layout.vue'
import { useTaskStore } from '@/store'

const { editTask, getTask, getTaskCatalog, updateTask, deleteTask } = useTaskStore()

const formRef = ref(null)
const data = reactive({
  pageTitle: '',
  taskId: '',
  showCatalogTips: true,
  loading: false,
  notices: [],
  showCatalogList: false,
  catalogs: [],
})

const model = ref<{ [key: string]: any }>({
  catalog: '',
  title: '',
  taskDesc: '',
  deadline: Date.now(),
  visible: 'public',
  priority: 'common',
})

onBeforeMount(async () => {
  const { options } = getCurrentPages().at(-1) as any
  data.taskId = options.id
  data.pageTitle = options.id ? '编辑任务' : '新增任务'
  getTaskDetail()
  data.catalogs = (await getTaskCatalog()).data
})

const getTaskDetail = async () => {
  if (!data.taskId) {
    return
  }
  const task = await getTask({ id: data.taskId })
  model.value = {
    ...model.value,
    ...task,
    deadline: dayjs(task.deadline.split(' ').at(0)).unix() * 1000,
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
  try {
    data.loading = true
    const { valid } = await formRef.value.validate()
    if (!valid) {
      return
    }
    await (data.taskId ? updateTask : editTask)({
      ...model.value,
      deadline: dayjs(model.value.deadline).format('YYYY-MM-DD 23:59:59'),
    })
    uni.showToast({
      icon: 'none',
      title: '任务已保存',
    })
    uni.navigateBack()
  } finally {
    data.loading = false
  }
}
</script>
