<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <Layout disableShowTitle disableNavigateBack>
    <view class="w-full h-full flex justify-center items-center">
      <wd-loading custom-class="" />
    </view>
  </Layout>
</template>
<script lang="ts" setup>
import Layout from '@/components/Layout.vue'

onMounted(() => {
  uni.navigateTo({ url: '/pages/index/index' })
})
</script>
