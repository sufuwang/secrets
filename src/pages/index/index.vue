<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationBarTitleText: 'Plan',
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view v-if="statusBarHeight > 0">
    <view
      class="text-bold text-[20px] flex justify-center"
      :style="{ marginTop: `${statusBarHeight + 6}px` }"
    >
      {{ curYear }} 年计划
    </view>
    <Plans name="wkx" />
    <Plans name="wk" />
  </view>
</template>

<script lang="ts" setup>
import Plans from '@/components/Plan/index.vue'
import { usePlanStore } from '@/store'

const { curYear } = usePlanStore()
const statusBarHeight = ref(0)

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight
})
onShareAppMessage((res) => {
  return {
    title: 'Secretsss',
    path: '/pages/index/index',
  }
})
</script>
