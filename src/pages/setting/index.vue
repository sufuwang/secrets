<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <Layout title="设置" childClass="px-0! h-fit">
    <wd-form ref="form" :model="model">
      <wd-cell-group :border="true">
        <button
          class="w-fit h-fit bg-transparent pt-6"
          open-type="chooseAvatar"
          @chooseavatar="onChooseAvatar"
        >
          <wd-img :width="100" :height="100" round :src="model.avatar" />
        </button>
        <wd-input
          label="用户名"
          label-width="120px"
          prop="nickname"
          clearable
          v-model="model.nickname"
          placeholder="请填写昵称"
          type="nickname"
          :rules="[{ required: true, message: '请填写昵称' }]"
        />
        <wd-picker
          label="主页偏好"
          label-width="120px"
          v-model="model.homeUrl"
          :columns="[
            {
              value: '/pages/community/index',
              label: '社区动态',
            },
            {
              value: '/pages/task/index',
              label: '我的任务',
            },
          ]"
        />
        <view class="p-2">
          <wd-button
            :disabled="model.disabled"
            custom-style="border-radius: 6px;"
            type="primary"
            size="large"
            block
            @click="onSubmit"
          >
            提交
          </wd-button>
        </view>
      </wd-cell-group>
    </wd-form>
  </Layout>
</template>
<script setup lang="ts">
import Layout from '@/components/Layout.vue'
import { useUserStore } from '@/store'

const { userInfo, setProfile } = useUserStore()

const model = reactive({
  avatar:
    userInfo.avatar ??
    'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
  nickname: userInfo.nickname,
  disabled: true,
  homeUrl: '/pages/community/index',
})

onBeforeMount(() => {
  model.homeUrl = userInfo.homeUrl || model.homeUrl
})

watch(
  model,
  () => {
    model.disabled = model.avatar.length === 0 || model.nickname.length === 0
  },
  {
    deep: true,
    immediate: true,
  },
)

const onChooseAvatar = ({ detail }) => {
  model.avatar = detail.avatarUrl
}

const onSubmit = async () => {
  await setProfile({ nickname: model.nickname, avatar: model.avatar, homeUrl: model.homeUrl })
  const { options } = getCurrentPages().at(-1) as any
  uni.redirectTo({
    url: options?.to ?? model.homeUrl,
  })
}
</script>
