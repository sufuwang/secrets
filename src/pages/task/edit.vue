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
            :disabled="isToComplete"
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
            :rules="[{ required: !isToComplete, message: '请选择可见模式' }]"
          />
          <wd-input
            label="任务分类"
            prop="catalog"
            label-width="120px"
            v-model="model.catalog"
            :disabled="isToComplete"
            :placeholder="`请输入${data.catalogs.length ? '或选择' : ''}任务分类`"
            :rules="[
              {
                required: !isToComplete,
                message: `请输入${data.catalogs.length ? '或选择' : ''}任务分类`,
              },
            ]"
          >
            <template v-if="data.catalogs.length && !isToComplete" #suffix>
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
            :disabled="isToComplete"
            :rules="[{ required: !isToComplete, message: '请填写任务标题' }]"
          />
          <wd-calendar
            label="预计完成时间"
            label-width="120px"
            :min-date="Date.now()"
            v-model="model.deadline"
            :disabled="isToComplete"
            :max-date="new Date(dayjs(`${dayjs().year()}-12-31`).date).getTime()"
            :displayFormat="(value: number) => dayjs(value).format('YYYY 年 M 月 D 日')"
            :rules="[{ required: !isToComplete, message: '请填写预计完成时间' }]"
          />
          <wd-input
            v-if="isToComplete ? model.taskDesc : true"
            clearable
            label="任务描述"
            prop="taskDesc"
            label-width="120px"
            clear-trigger="focus"
            v-model="model.taskDesc"
            :disabled="isToComplete"
            placeholder="请输入任务描述"
          />
          <template v-if="isToComplete">
            <wd-picker
              label-width="120px"
              :columns="[
                { value: 'important', label: '重点关注' },
                { value: 'common', label: '一般' },
              ]"
              label="任务优先级"
              :disabled="isToComplete"
              v-model="model.priority"
            />
            <wd-notice-bar v-if="isToComplete" type="info" :scrollable="false">
              <view class="mr-[4px] inline">🎉 🎉 🎉</view>
              恭喜完成一项任务，快记录你的任务成果吧
            </wd-notice-bar>
            <view class="flex flex-col p-3 pb-0!">
              <wd-upload
                multiple
                :limit="data.filesLimit"
                :header="{ openid: data.openid }"
                :successStatus="200"
                :file-list="data.files"
                :form-data="data.formData"
                name="files"
                image-mode="aspectFill"
                custom-evoke-class="mb-0!"
                action="https://localhost:3000/file/upload"
                @change="onChangeUpload"
              />
              <wd-textarea
                v-model="model.doneDesc"
                no-border
                clearable
                auto-height
                :maxlength="120"
                show-word-limit
                :show-confirm-bar="false"
                placeholder="请填写任务完成描述"
                custom-class="m-0! p-0!"
                custom-textarea-class="m-0! p-0! leading-none! placeholder:leading-none!"
              />
            </view>
          </template>
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

interface Options {
  id?: string
  status?: 'toComplete'
}

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

const isToComplete = computed(() => data.pageTitle === '完成任务')

onBeforeMount(async () => {
  const { options } = getCurrentPages<{ options: Options }>().at(-1)
  getTaskDetail(options)
  getPageTitle(options)
})

const onChangeUpload = ({ fileList }) => {
  console.info('fileList: ', fileList)
  model.value = {
    ...model.value,
    doneFileIds: fileList
      .filter((row) => row.response)
      .map((row) => JSON.parse(row.response).data[0].id),
  }
}
const getPageTitle = ({ id, status }: Options) => {
  if (status === 'toComplete') {
    data.pageTitle = '完成任务'
  } else if (id) {
    data.pageTitle = '编辑任务'
  } else {
    data.pageTitle = '新增任务'
  }
}
const getTaskDetail = async ({ id }: Options) => {
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
  if (isToComplete.value && model.value.doneFileIds.length > data.filesLimit) {
    uni.showToast({
      icon: 'none',
      title: `最多支持上传 ${data.filesLimit} 张图片`,
    })
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
