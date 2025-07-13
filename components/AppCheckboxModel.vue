<template>
  <AppCheckbox :class="{ disabled, checked: model }" @click="handleClick" />
</template>

<script setup lang="ts">
const {
  disabled = false,
  falseAsUndefined = false
} = defineProps<{
  disabled?: boolean
  falseAsUndefined?: boolean
}>()
const model = defineModel<boolean>()
const handleClick = () => {
  if (disabled) return
  if (falseAsUndefined) {
    if (model.value) model.value = undefined
    else model.value = true
  }
  else model.value = !model.value
}
</script>