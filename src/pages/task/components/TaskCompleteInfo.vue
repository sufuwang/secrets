<template>
  <wd-notice-bar v-if="!readOnly" type="info" :scrollable="false">
    <view class="mr-[4px] inline">🎉 🎉 🎉</view>
    恭喜完成一项任务，快记录你的任务成果吧
  </wd-notice-bar>
  <view class="flex flex-col p-3 pb-0! bg-white">
    <view v-if="readOnly" class="flex flex-row flex-wrap gap-2 pb-4">
      <wd-img
        v-for="row of data.files"
        :key="row.url"
        width="80"
        height="80"
        :src="row.url"
        enable-preview
      />
    </view>
    <wd-upload
      v-else
      multiple
      :limit="data.filesLimit"
      :header="{ openid: data.openid }"
      :successStatus="200"
      :file-list="data.files"
      :form-data="data.formData"
      name="files"
      image-mode="aspectFill"
      custom-evoke-class="mb-0!"
      :action="action"
      @change="onChangeUpload"
    />
    <wd-textarea
      v-if="readOnly ? model.doneDesc : true"
      v-model="model.doneDesc"
      no-border
      clearable
      auto-height
      show-word-limit
      :maxlength="120"
      :readonly="readOnly"
      :show-confirm-bar="false"
      placeholder="请填写任务完成描述"
      custom-class="m-0! p-0!"
      custom-textarea-class="m-0! p-0! leading-none! placeholder:leading-none!"
    />
  </view>
</template>
<script setup lang="ts">
import type { Data, Model } from '../edit.vue'

const action = `${__BASEURL__}/file/upload`

defineProps<{ readOnly?: boolean }>()
const model = defineModel<Model>()
const data = defineModel<Data>('data')

const onChangeUpload = ({ fileList }) => {
  model.value = {
    ...model.value,
    doneFileIds: fileList.map((row) =>
      row.response ? JSON.parse(row.response).data[0].value.id : row.id,
    ),
  }
}
</script>
