<template>
  <AppCheckbox :class="{ disabled, checked: model }" @click="handleClick" />
</template>

<script setup lang="ts">
const { disabled } = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})
const model = defineModel<boolean>()
const handleClick = () => { if (!disabled) model.value = !model.value }
</script>