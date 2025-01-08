<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <template v-if="pageTitle">
    <Layout :title="pageTitle" childClass="" :showNavigateBack="true">
      <wd-form ref="formRef" :model="model">
        <wd-cell-group border>
          <wd-select-picker
            type="radio"
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
            clearable
            prop="title"
            label="任务标题"
            label-width="120px"
            clear-trigger="focus"
            v-model="model.title"
            placeholder="请输入任务标题"
            :rules="[{ required: true, message: '请填写任务标题' }]"
          />
          <wd-input
            clearable
            label="任务分类"
            prop="catalog"
            label-width="120px"
            clear-trigger="focus"
            v-model="model.catalog"
            placeholder="请输入任务分类"
            :rules="[{ required: true, message: '请填写一级目录' }]"
          />
          <!-- <InputWithTips
            label="任务分类"
            prop="catalog"
            placeholder="请输入任务分类"
            :rules="[{ required: true, message: '请填写一级目录' }]"
          /> -->
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
        </wd-cell-group>
      </wd-form>
      <view class="p-2">
        <wd-button
          block
          type="primary"
          custom-class="rounded-2!"
          :disabled="model.loading"
          @click="onSubmit"
        >
          <wd-loading v-if="model.loading" :size="20" />
          <view v-else>提交</view>
        </wd-button>
      </view>
    </Layout>
  </template>
</template>
<script setup lang="ts">
import { dayjs } from 'wot-design-uni'
import Layout from '@/components/Layout.vue'
import InputWithTips from '@/components/InputWithTips.vue'
import { useTaskStore } from '@/store'

const { editTask } = useTaskStore()

const formRef = ref(null)
const pageTitle = ref('')
const model = reactive({
  catalog: '',
  title: '',
  taskDesc: '',
  deadline: Date.now(),
  visible: 'public',
  showCatalogTips: true,
  loading: false,
})

onBeforeMount(() => {
  const { options } = getCurrentPages().at(-1) as any
  pageTitle.value = options.taskId ? '编辑任务' : '新增任务'
})
onMounted(() => {
  console.info('formRef: ', formRef.value)
})

const onSubmit = async () => {
  try {
    model.loading = true
    await formRef.value.validate()
    console.info('model: ', model)
    await editTask({
      // visible: 'public',
      // catalog: 'catalog',
      // title: 'title',
      // taskDesc: 'taskDesc',
      // deadline: 'deadline',
      // registerDate: 'registerDate',
      // lastUpdateDate: 'lastUpdateDate',
      // done: false,
      // doneDate: 'doneDate',
      // doneDesc: 'doneDesc',
      // doneAttachMent: 'doneAttachMent',
      ...model,
      deadline: dayjs(model.deadline).format('YYYY-MM-DD 23:59:59'),
    })
    uni.showToast({
      icon: 'none',
      title: '任务已保存',
    })
    uni.redirectTo({
      url: '/pages/task/index',
    })
  } finally {
    model.loading = false
  }
}
</script>
