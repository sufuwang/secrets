<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <Layout :show-navigate-back="true" title="我的任务">
    <template v-if="store.task.length">
      <wd-index-bar sticky>
        <view v-for="item in store.task" :key="item.catalog">
          <wd-index-anchor :index="item.catalog" />
          <template v-for="(row, key) in item.list" :key="key">
            <wd-cell :border="true" clickable :title="row.title" @click="onClickEditTask(row)">
              <wd-tag :type="deadlineType(row.deadline)" mark>
                <span class="whitespace-nowrap">{{ formatDeadline(row.deadline) }}</span>
              </wd-tag>
            </wd-cell>
          </template>
        </view>
      </wd-index-bar>
    </template>
    <wd-status-tip v-else image="content" tip="暂无内容" />
    <FabButton icon="edit-outline" @onPageScroll="onPageScroll" @click="onClickCreateTask" />
  </Layout>
</template>
<script setup lang="ts">
import Layout from '@/components/Layout.vue'
import FabButton from '@/components/FabButton.vue'
import { useTaskStore } from '@/store'
import { onPageShow } from '@dcloudio/uni-app'
import { dayjs } from 'wot-design-uni'

const { store, getTask } = useTaskStore()

onPageShow(() => {
  getTask()
})

const deadlineType = (deadline) => {
  const { mMonth: deadlineMonth, mDay: deadlineDay } = dayjs(deadline)
  const curMonth = new Date().getMonth()
  const curDay = new Date().getDate()
  if (deadlineMonth === curMonth) {
    return curDay > deadlineDay ? 'danger' : 'warning'
  } else if (deadlineMonth > curMonth) {
    return 'primary'
  } else if (deadlineMonth < curMonth) {
    return 'danger'
  }
}
const formatDeadline = (deadline) => {
  return deadline
    .split(' ')
    .at(0)
    .split('-')
    .slice(1)
    .map((row) => parseInt(row))
    .join('-')
}
const onClickCreateTask = () => {
  uni.navigateTo({
    url: '/pages/task/edit',
  })
}
const onClickEditTask = (row) => {
  uni.navigateTo({
    url: `/pages/task/edit?id=${row.id}`,
  })
}
</script>
<style lang="scss" scoped>
:deep(.wd-index-bar__sidebar) {
  display: none;
}
:deep(.wd-cell__right) {
  flex: 0 !important;
}
.wraper {
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom) - 72px);
}
</style>
