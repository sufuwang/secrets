<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <Layout>
    <view class="flex flex-col justify-between pt-4">
      <Card><TaskDesc type="create" /></Card>
      <Card><TaskDesc type="done" /></Card>
      <Card v-for="item in 10" :key="item">
        一般的，检举内容由承办的党的委员会或纪律检查委员会将处理意见或复议、复查结论同申诉人见面，听取其意见。复议、复查的结论和决定，应交给申诉人一份。
      </Card>
    </view>
    <MenuButton :zIndex="zIndex" />
  </Layout>
</template>

<script lang="ts" setup>
import Layout from '@/components/Layout.vue'
import Card from './components/Card.vue'
import TaskDesc from './components/TaskDesc.vue'
import MenuButton from './components/MenuButton.vue'
import { useUserStore } from '@/store'

const { login } = useUserStore()

const zIndex = ref(100)
const id = ref()

onPageScroll(() => {
  clearTimeout(id.value)
  zIndex.value = -1
  id.value = setTimeout(() => {
    zIndex.value = 100
    clearTimeout(id.value)
  }, 200)
})
onShareAppMessage((res) => {
  return {
    title: 'Secretsss',
    path: '/pages/index/index',
  }
})

onMounted(() => {
  login()
})
</script>
