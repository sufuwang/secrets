<template>
  <view class="relative">
    <wd-input
      v-bind="$attrs"
      clearable
      label-width="120px"
      clear-trigger="focus"
      :prop="props.prop"
      :label="props.label"
      :rules="props.rules"
      :placeholder="props.placeholder"
      v-model="value"
      @focus="showCatalogTips = true"
      @blur="showCatalogTips = false"
    />
    <view
      class="absolute z-[99] bg-white w-full top-[45px] max-h-80 overflow-y-auto p-[4px] my-[4px]"
      v-show="showCatalogTips"
    >
      <view
        v-for="item in list"
        :key="item"
        class="m-1 p-1 flex justify-start border-b-gray border-b-2"
        @click="onclick(item)"
      >
        AAA: {{ item }}
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import type { FormItemRule } from 'wot-design-uni/components/wd-form/types'

const props = defineProps<{
  prop: string
  label: string
  placeholder: string
  rules: Array<FormItemRule>
}>()

const data = new Array(20).fill(1).map((_, key) => key)

const showCatalogTips = ref(true)
const value = ref('')
const list = ref(data)

const attrs = useAttrs()

onMounted(() => {
  console.info('attrs: ', attrs)
})

watch(showCatalogTips, (v) => {
  if (v) {
    list.value = data
  }
})
watch(value, (v) => {
  list.value = data.filter((row) => row.toString().includes(v))
})

const onclick = (row) => {
  // value.value = row
}
</script>
