<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <Layout dynamicNavigateBack childClass="bg-[#eeeeee]">
    <view class="flex flex-col justify-between pt-2 px-2">
      <Card><TaskDesc type="create" /></Card>
      <Card><TaskDesc type="done" /></Card>
      <Card v-for="item in 10" :key="item">
        一般的，检举内容由承办的党的委员会或纪律检查委员会将处理意见或复议、复查结论同申诉人见面，听取其意见。复议、复查的结论和决定，应交给申诉人一份。
      </Card>
    </view>
    <FabButton
      showProfile
      :data="[{ disabled: showListIcon, icon: 'list', click: onCheckTaskList }]"
      @onPageScroll="onPageScroll"
    />
  </Layout>
</template>

<script lang="ts" setup>
import Layout from '@/components/Layout.vue'
import FabButton from '@/components/FabButton.vue'
import Card from './components/Card.vue'
import TaskDesc from './components/TaskDesc.vue'
import { useUserStore } from '@/store'

const { userInfo } = useUserStore()

onShareAppMessage((res) => {
  return {
    title: 'Secretsss',
    path: '/pages/community/index',
  }
})

const showListIcon = computed(() => {
  const { route } = getCurrentPages().at(-1)
  return userInfo.homeUrl !== `/${route}`
})

const onCheckTaskList = async () => {
  uni.navigateTo({
    url: '/pages/task/index',
  })
}
</script>
