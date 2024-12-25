<template>
  <div>
    <view
      v-for="(row, key) in props.list"
      :key="key"
      :class="`${props.rowClass} flex flex-row gap-2`"
      :style="{
        color: (
          dayjs().isBefore(dayjs(`${curYear}-07-01`))
            ? dayjs(row.deadline).isBefore(dayjs('2025-07-01')) && row.doneDate.length === 0
            : row.doneDate.length === 0
        )
          ? 'red'
          : 'black',
        textDecoration: row.doneDate.length > 0 ? 'line-through' : 'none',
      }"
    >
      <div
        class="text-right inline-block mr-[4px]"
        :style="{
          width: `${10 * props.list.length.toString().length}px`,
        }"
      >
        {{ props.type === 'ol' ? `${key + 1}. ` : '·' }}
      </div>
      <div>{{ row.text }}</div>
    </view>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { usePlanStore } from '@/store'

interface Props {
  rowClass?: string
  type: 'ul' | 'ol'
  list: Plan
}

const props = defineProps<Props>()
const { curYear } = usePlanStore()
</script>
<style lang="sass" scoped></style>
