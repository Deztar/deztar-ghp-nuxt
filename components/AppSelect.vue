<template>
  <select v-model="model">
    <option v-if="nullable" :value="null" />
    <option v-for="option in options" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
const {
  options,
  nullable = false
} = defineProps<{
  options: Array<Record<string, any> | string>
  nullable?: boolean
}>()
const model = defineModel<string | null>()
</script>