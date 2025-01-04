<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <Layout :show-navigate-back="true" title="我的任务">
    <wd-index-bar sticky>
      <view v-for="item in data" :key="item.index">
        <wd-index-anchor :index="item.title" />
        <template v-for="(row, key) in item.list" :key="key">
          <wd-cell :border="true" clickable :title="row.text">
            <wd-tag type="primary" mark>
              <span class="whitespace-nowrap">
                {{ row.deadline.replace(`${curYear}-`, '') }}
              </span>
            </wd-tag>
          </wd-cell>
        </template>
      </view>
    </wd-index-bar>
    <!-- <FabButton icon="edit-outline" @onPageScroll="onPageScroll" @onClick="onClick" /> -->
  </Layout>
</template>
<script setup lang="ts">
import Layout from '@/components/Layout.vue'
import FabButton from '@/components/FabButton.vue'
import { usePlanStore } from '@/store'

const { getCurPlan, curYear } = usePlanStore()
const data = ref([])

onBeforeMount(async () => {
  const openid = await uni.getStorageSync('openid')
  data.value = getCurPlan(openid.startsWith('onqMQ48n1309m') ? 'wk' : 'wkx') as Task
})

const onClick = () => {}
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
