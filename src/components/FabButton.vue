<template>
  <wd-fab
    v-if="props.icon"
    :draggable="true"
    :gap="{
      bottom: 100,
    }"
    :zIndex="zIndex"
  >
    <template #trigger>
      <view
        class="w-[34px] h-[34px] shadow-[2px_2px_4px_rgba(0,0,0,.4)] bg-white rounded-br-[8px] flex justify-center items-center p-[4px]"
        @click="$emit('onClick')"
      >
        <wd-icon :name="props.icon" size="18px"></wd-icon>
      </view>
    </template>
  </wd-fab>
</template>
<script setup lang="ts">
const props = defineProps<{
  icon: string
}>()
const emits = defineEmits(['onClick', 'onPageScroll'])

const zIndex = ref(100)
const id = ref()

emits('onPageScroll', () => {
  clearTimeout(id.value)
  zIndex.value = -1
  id.value = setTimeout(() => {
    zIndex.value = 100
    clearTimeout(id.value)
  }, 200)
})
</script>
