<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <Layout disableNavigateBack>
    <view class="flex flex-col justify-between pt-2 px-2">
      <Card><TaskDesc type="create" /></Card>
      <Card><TaskDesc type="done" /></Card>
      <Card v-for="item in 10" :key="item">
        一般的，检举内容由承办的党的委员会或纪律检查委员会将处理意见或复议、复查结论同申诉人见面，听取其意见。复议、复查的结论和决定，应交给申诉人一份。
      </Card>
    </view>
    <FabButton icon="list" @onPageScroll="onPageScroll" @click="onClick" />
  </Layout>
</template>

<script lang="ts" setup>
import Layout from '@/components/Layout.vue'
import FabButton from '@/components/FabButton.vue'
import Card from './components/Card.vue'
import TaskDesc from './components/TaskDesc.vue'
import { useUserStore } from '@/store'

const { login, getProfile } = useUserStore()

onShareAppMessage((res) => {
  return {
    title: 'Secretsss',
    path: '/pages/index/index',
  }
})
onMounted(() => {
  login()
})

const onClick = async () => {
  const openid = await uni.getStorageSync('openid')
  if (openid) {
    const profile = await getProfile()
    if (profile && profile.nickname && profile.avatar) {
      uni.navigateTo({
        url: '/pages/task/index',
      })
    } else {
      uni.navigateTo({
        url: '/pages/profile/index?to=/pages/task/index',
      })
    }
  } else {
    login()
  }
}
</script>
