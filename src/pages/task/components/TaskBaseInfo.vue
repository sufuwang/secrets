<template>
  <wd-picker
    v-if="false"
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
    :rules="[{ required: !readOnly && !isToComplete, message: '请选择可见模式' }]"
  />
  <wd-input
    label="任务分类"
    prop="catalog"
    label-width="120px"
    v-model="model.catalog"
    :disabled="isToComplete"
    :readonly="readOnly"
    :placeholder="`请输入${data.catalogs.length ? '或选择' : ''}任务分类`"
    :rules="[
      {
        required: !readOnly && !isToComplete,
        message: `请输入${data.catalogs.length ? '或选择' : ''}任务分类`,
      },
    ]"
  >
    <template v-if="!readOnly && data.catalogs.length && !isToComplete" #suffix>
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
    :readonly="readOnly"
    :rules="[{ required: !readOnly && !isToComplete, message: '请填写任务标题' }]"
  />
  <wd-calendar
    label="预计完成时间"
    label-width="120px"
    :min-date="Date.now()"
    v-model="model.deadline"
    :disabled="isToComplete"
    :readonly="readOnly"
    :max-date="new Date(dayjs(`${dayjs().year()}-12-31`).date).getTime()"
    :displayFormat="(value: number) => dayjs(value).format('YYYY 年 M 月 D 日')"
    :rules="[{ required: !readOnly && !isToComplete, message: '请填写预计完成时间' }]"
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
    :readonly="readOnly"
    placeholder="请输入任务描述"
  />
  <wd-picker
    label-width="120px"
    :columns="[
      { value: 'important', label: '重点关注' },
      { value: 'common', label: '一般' },
    ]"
    label="任务优先级"
    :disabled="isToComplete"
    :readonly="readOnly"
    v-model="model.priority"
  />
</template>
<script setup lang="ts">
import { dayjs } from 'wot-design-uni'
import type { Data, Model } from '../edit.vue'

defineProps<{ isToComplete?: boolean; readOnly?: boolean }>()
const model = defineModel<Model>()
const data = defineModel<Data>('data')
</script>
