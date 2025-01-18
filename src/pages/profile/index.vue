<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <Layout title="个人资料" childClass="px-0! h-fit" disableNavigateBack>
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
          label-width="60px"
          prop="nickname"
          clearable
          v-model="model.nickname"
          placeholder="请填写昵称"
          :type="'nickname' as any"
          :rules="[{ required: true, message: '请填写昵称' }]"
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

const { setProfile } = useUserStore()

const model = reactive({
  avatar:
    'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
  nickname: '',
  disabled: true,
})

watch(
  model,
  () => {
    model.disabled = model.avatar.length === 0 || model.nickname.length === 0
  },
  { deep: true },
)

const onChooseAvatar = ({ detail }) => {
  model.avatar = detail.avatarUrl
}

const onSubmit = async () => {
  await setProfile({ nickname: model.nickname, avatar: model.avatar })
  const { options } = getCurrentPages().at(-1) as any
  uni.redirectTo({
    url: options?.to ?? '/pages/index/index',
  })
}
</script>
