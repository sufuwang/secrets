<template>
  <view>
    <wd-divider>{{ userInfo.alias[props.name] }}</wd-divider>
    <wd-collapse v-model="value" accordion>
      <wd-collapse-item v-for="item in list" :key="item.title" :name="item.title">
        <template #title="{ expanded }">
          <div class="flex flex-row justify-between items-center">
            <div class="flex flex-row items-center">
              <span class="mr-[4px]">{{ item.title }}</span>
              <wd-tag
                v-if="item.list.filter((row) => row.doneDate.length === 0).length"
                type="primary"
                mark
              >
                {{ item.list.filter((row) => row.doneDate.length === 0).length }}
              </wd-tag>
            </div>
            <wd-icon v-if="expanded" name="arrow-up" size="20px"></wd-icon>
            <wd-icon v-else name="arrow-down" size="20px"></wd-icon>
          </div>
        </template>
        <List rowClass="ml-[4px] text-[16px]" type="ol" :list="item.list" />
      </wd-collapse-item>
    </wd-collapse>
  </view>
</template>

<script lang="ts" setup>
import List from '@/components/List/index.vue'
import { usePlanStore, useUserStore } from '@/store'

const props = defineProps<{ name: keyof Alias }>()
const { getCurPlan } = usePlanStore()
const { userInfo } = useUserStore()
const value = ref()
const list = computed(() => getCurPlan(props.name) as Task)
</script>
