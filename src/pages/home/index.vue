<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <Layout disableShowTitle disableNavigateBack>
    <view class="flex justify-center items-center pt-24">
      <wd-loading custom-class="" />
    </view>
  </Layout>
</template>
<script lang="ts" setup>
import Layout from '@/components/Layout.vue'
import { useUserStore } from '@/store'

const { login, userInfo } = useUserStore()

onMounted(async () => {
  await login()
  if (userInfo.homeUrl) {
    uni.redirectTo({ url: userInfo.homeUrl })
  } else {
    uni.redirectTo({ url: '/pages/community/index' })
  }
})
</script>
