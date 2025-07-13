<template>
  <select v-model="model">
    <option v-if="optional" :value="undefined" />
    <option v-if="nullable" :value="null" />
    <option v-for="option in options" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
const {
  options,
  nullable = false,
  optional = false
} = defineProps<{
  options: Array<Record<string, any> | string>
  nullable?: boolean
  optional?: boolean
}>()
const model = defineModel<string | null>()
</script>