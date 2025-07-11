<template>
  <div class="input-with-button fr0" ref="wrapper" :class="{ active }">
    <AppNakedInput v-model="model" style="flex-grow: 1;" :readonly="!active" @keyup.enter="disable" />
    <button class="edit-button" @click="enable">
      <span>&#9998;</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  enabled: []
  disabled: []
}>()

const model = defineModel<string>()
const active = ref(false)
const wrapper = useTemplateRef('wrapper')

const enable = () => {
  active.value = true
  emit('enabled')
  document.addEventListener('click', handleNonEditClick)
  const input = wrapper.value?.querySelector('input')
  if (input) {
    input.focus()
    input.setSelectionRange(
      input.value.length,
      input.value.length
    )
  }
}
const disable = () => {
  active.value = false
  emit('disabled')
  document.removeEventListener('click', handleNonEditClick)
}

const handleNonEditClick = (event: Event) => {
  if (!event.target) return
  const target = event.target as HTMLElement
  if (target.closest('.input-with-button') === wrapper.value) return
  disable()
}

onMounted(() => {
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleNonEditClick)
})
</script>

<style lang="scss">
@use '@css/color.scss';

.input-with-button {
  &.active {
    background-color: color.$color-border;
  }

  .edit-button {
    border: none;

    &:focus {
      box-shadow: none;
    }

    span {
      display: inline-block;
      transform: scale(-1, 1) translateY(-5%)
    }
  }
}
</style>