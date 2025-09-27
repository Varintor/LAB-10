<script setup lang="ts">
import type { Organizer } from '@/types'

// ทำให้ใช้ v-model ได้
const modelValue = defineModel<number>()

// props
interface BaseSelectProps {
  label: string
  options: Organizer[]
}

const props = withDefaults(defineProps<BaseSelectProps>(), {
  label: 'Select'
})
</script>

<template>
  <div>
    <label v-if="props.label">{{ props.label }}</label>
    <select
      class="mb-6"
      v-bind="$attrs"
      v-model="modelValue"
    >
      <option disabled value="0">-- Please select --</option>
      <option
        v-for="option in props.options"
        :key="option.id"
        :value="option.id"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>
