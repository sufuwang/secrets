<template>
  <wd-fab
    v-if="data.length"
    :draggable="true"
    :gap="{
      bottom: 100,
    }"
    :customStyle="`display:${show ? 'block' : 'none'};`"
  >
    <template #trigger>
      <view
        v-for="(row, index) in data"
        :key="index"
        :class="{
          [className]: true,
          'rounded-br-[8px]': !showProfile && index === data.length - 1,
        }"
        @click="row.click"
      >
        <wd-icon :name="row.icon" size="18px"></wd-icon>
      </view>
      <view
        v-if="showProfile"
        :class="{ [className]: true, 'rounded-br-[8px]': data.length }"
        @click="jumpProfile"
      >
        <wd-icon name="user" size="18px"></wd-icon>
      </view>
    </template>
  </wd-fab>
</template>
<script setup lang="ts">
interface Props {
  showProfile?: boolean
  data: Array<{ icon: string; click: () => void }>
}

const className =
  'w-[34px] h-[34px] shadow-[2px_2px_4px_rgba(0,0,0,.4)] bg-white flex justify-center items-center p-[4px]'

const props = defineProps<Props>()
const emits = defineEmits(['click', 'onPageScroll'])

const id = ref()
const show = ref(true)

emits('onPageScroll', () => {
  clearTimeout(id.value)
  show.value = false
  id.value = setTimeout(() => {
    show.value = true
    clearTimeout(id.value)
  }, 200)
})

const jumpProfile = () => {
  uni.navigateTo({
    url: '/pages/setting/index',
  })
}
</script>
