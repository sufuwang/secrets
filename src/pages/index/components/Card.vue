<template>
  <view class="bg-white rounded-[10px] px-[12px] pb-[12px] m-auto mb-2">
    <view class="flex flex-row justify-between py-2 items-end text-[16px]">
      <view class="flex flex-row items-center">
        <image
          class="w-[16px] h-[16px] rounded-[16px] mr-[4px]"
          src="https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg"
          mode="scaleToFill"
        />
        <view>NickName</view>
      </view>
      <view
        class="flex flex-row items-center"
        :style="{ color: thumbUp.done ? 'red' : ' gray' }"
        @click="onClickThumbUp"
      >
        <wd-icon name="thumb-up" size="16px"></wd-icon>
        <view>{{ thumbUp.count }}</view>
      </view>
    </view>
    <slot />
  </view>
</template>
<script setup lang="ts">
const thumbUp = reactive({
  count: 1234,
  done: false,
})

const onClickThumbUp = () => {
  if (thumbUp.done) {
    thumbUp.count -= 1
    thumbUp.done = false
  } else {
    thumbUp.count += 1
    thumbUp.done = true
  }
  uni.vibrateShort()
}
</script>
