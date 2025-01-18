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
          <template v-for="(row, key) in sortList(item.list)" :key="key">
            <wd-cell :border="true" clickable @click="onEditTask(row)">
              <template #icon>
                <wd-checkbox
                  custom-label-class="h-full leading-none"
                  :disabled="row.done"
                  :modelValue="row.done"
                  shape="square"
                  @change.stop="onCompleteTask(row)"
                />
              </template>
              <template #title>
                <view
                  :class="row.priority === 'important' ? 'color-red font-bold' : ''"
                  class="flex flex-row items-center gap-2"
                >
                  {{ row.title }}
                </view>
              </template>
              <wd-tag :type="deadlineType(row)" mark :plain="row.priority !== 'important'">
                <span class="whitespace-nowrap">{{ formatDeadline(row) }}</span>
              </wd-tag>
            </wd-cell>
          </template>
        </view>
      </wd-index-bar>
    </template>
    <wd-status-tip v-else image="content" tip="暂无内容" />
    <FabButton icon="edit-outline" @onPageScroll="onPageScroll" @click="onCreateTask" />
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

const sortList = (list) => {
  const l = list.sort((a, b) => dayjs(b.deadline).unix() - dayjs(a.deadline).unix())
  const d = []
  const i = []
  l.forEach((row) => {
    if (row.priority === 'important') {
      i.unshift(row)
    } else if (row.done) {
      d.push(row)
    } else {
      d.unshift(row)
    }
  })
  return [...i, ...d]
}
const deadlineType = (row) => {
  if (row.done) {
    return 'default'
  }
  const { deadline, done } = row
  const { mMonth: deadlineMonth, mDay: deadlineDay } = dayjs(deadline)
  const { mMonth: curMonth, mDay: curDay } = dayjs(new Date())
  if (deadlineMonth === curMonth) {
    const day = deadlineDay - curDay
    return day >= 0 ? (day > 5 ? 'warning' : 'danger') : done ? 'default' : 'danger'
  } else if (deadlineMonth > curMonth) {
    return 'primary'
  } else if (deadlineMonth < curMonth) {
    return 'default'
  }
}
const formatDeadline = (row) => {
  const { deadline, done } = row
  if (done) {
    return '已完成'
  }
  const day = Math.floor((dayjs(deadline).unix() - dayjs(new Date()).unix()) / (24 * 3600))
  if (day >= 0 && day <= 5) {
    return ['今天截止', '明天截止', '后天截止'][day] ?? `还有 ${day} 天`
  } else if (day < 0) {
    return '未完成'
  }
  return deadline
    .split(' ')
    .at(0)
    .split('-')
    .slice(1)
    .map((row) => parseInt(row))
    .join('-')
}
const onCreateTask = () => {
  uni.navigateTo({
    url: '/pages/task/edit',
  })
}
const onEditTask = (row) => {
  uni.navigateTo({
    url: `/pages/task/edit?id=${row.id}`,
  })
}
const onCompleteTask = (row) => {
  uni.navigateTo({
    url: `/pages/task/edit?id=${row.id}&status=toComplete`,
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
