<template>
  <wd-fab
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
        :class="{ [className]: true }"
        @click="row.click"
      >
        <wd-icon :name="row.icon" :size="row.size ?? '18px'" />
      </view>
      <view
        v-if="showProfile"
        :class="{ [className]: true, 'rounded-br-[8px]': true }"
        @click="jumpProfile"
      >
        <wd-icon name="setting1" size="22px" custom-class="font-medium!" />
      </view>
    </template>
  </wd-fab>
</template>
<script setup lang="ts">
interface Props {
  showProfile?: boolean
  data: Array<{ disabled?: boolean; icon: string; size?: string; click: () => void }>
}

const className =
  'w-[34px] h-[34px] shadow-[2px_2px_4px_rgba(0,0,0,.4)] bg-white flex justify-center items-center p-[4px]'

const props = defineProps<Props>()
const emits = defineEmits(['click', 'onPageScroll'])

const id = ref()
const show = ref(true)
const data = computed(() => props.data.filter((row) => !row.disabled))

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
