<script setup lang="ts">
import Uploader from 'vue-media-upload'
import { ref } from 'vue'

interface Props {
  modelValue?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => []
})

// ✅ แปลง string[] → media object (vue-media-upload format)
const convertStringToMedia = (str: string[]): any[] => {
  return str.map((element: string) => {
    return { name: element }
  })
}

const emit = defineEmits(['update:modelValue'])

// ✅ แปลง media object → string[]
const convertMediaToString = (media: any[]): string[] => {
  const output: string[] = []
  media.forEach((element: any) => {
    // ถ้ามี response.url แปลว่าอัปโหลดสำเร็จ → ใช้ URL จริงแทน name
    if (element.response && element.response.url) {
      output.push(element.response.url)
    } else {
      output.push(element.name)
    }
  })
  return output
}

const media = ref(convertStringToMedia(props.modelValue))

// ✅ URL backend สำหรับอัปโหลด
const uploadUrl = ref(import.meta.env.VITE_UPLOAD_URL)

// ✅ handle ตอน upload เสร็จ
const onChanged = (files: any[]) => {
  emit('update:modelValue', convertMediaToString(files))
}
</script>

<template>
  <Uploader
    :server="uploadUrl"
    :media="media"
    name="image"        
    @change="onChanged"
  />
</template>
