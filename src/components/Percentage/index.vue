<template>
  <view class="m-2">
    <view v-if="data.whole >= 0">
      全年完成情况
      <wd-progress :percentage="data.whole" />
    </view>
    <view v-if="data.firstHalf >= 0 && data.firstHalf < 100">
      上半年完成情况
      <wd-progress :percentage="data.firstHalf" />
    </view>
    <view
      v-if="dayjs().isAfter(`${curYear}-06-30`) && data.secondHalf >= 0 && data.secondHalf < 100"
    >
      下半年完成情况
      <wd-progress :percentage="data.secondHalf" />
    </view>
  </view>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { usePlanStore } from '@/store'

export interface Props {
  data: {
    firstHalf: number
    secondHalf: number
    whole: number
  }
}

const { data } = defineProps<Props>()
const { curYear } = usePlanStore()
</script>
