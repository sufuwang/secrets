<route lang="json5">
{
  style: {
    navigationBarTitleText: 'About',
  },
}
</route>
<template>
  <view>
    <wd-divider>{{ alias.wkx }}</wd-divider>
    <Percentage :data="getPercentage(getCurPlan('wkx') as Task)" />
    <view class="m-2">已经呼吸 {{ getUsedTime('2008-03-26') }}</view>
    <wd-divider>{{ alias.wk }}</wd-divider>
    <Percentage :data="getPercentage(getCurPlan('wk') as Task)" />
    <view class="m-2">已经呼吸 {{ getUsedTime('1995-08-18') }}</view>
    <view class="m-2">已经工作 {{ getUsedTime('2021-07-01') }}</view>
  </view>
</template>
<script lang="ts" setup>
import { usePlanStore, useUserStore } from '@/store'
import Percentage, { Props as PercentageProps } from '@/components/Percentage/index.vue'
import dayjs from 'dayjs'

const { getCurPlan } = usePlanStore()
const {
  userInfo: { alias },
} = useUserStore()

const isBefore = (date: string) => {
  return dayjs(date).isBefore(dayjs('2025-07-01'))
}
const getPercentage = (task: Task): PercentageProps['data'] => {
  const rows = task.map((row) => row.list).flat(Infinity) as Plan
  return {
    firstHalf: Math.floor(
      (rows.filter((row) => isBefore(row.deadline) && row.doneDate.length > 0).length /
        rows.length) *
        100,
    ),
    secondHalf: Math.floor(
      (rows.filter((row) => !isBefore(row.deadline) && row.doneDate.length > 0).length /
        rows.length) *
        100,
    ),
    whole: Math.floor((rows.filter((row) => row.doneDate.length > 0).length / rows.length) * 100),
  }
}
const getUsedTime = (date: string) => {
  const diff = dayjs().diff(dayjs(date), 'day')
  return `${Math.floor(diff / 365)} 年 ${diff % 365} 天`
}

onShareAppMessage((res) => {
  return {
    title: 'Secretsss',
    path: '/pages/about/index',
  }
})
</script>
<style lang="scss" scoped></style>
