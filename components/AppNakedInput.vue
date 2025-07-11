<template>
  <input v-bind="{ ...attrs, ...props }" class="naked-input" v-model="model" />
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';

interface NakedInputProps extends /* @vue-ignore */ InputHTMLAttributes {

}
const props = defineProps<NakedInputProps>()
const attrs = useAttrs()
const model = defineModel<string>()
</script>

<style lang="scss">
@use '@css/color.scss';

.naked-input {
  border: none;
  outline: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  caret-color: color.$color-text;
  box-shadow: none;

  &:hover {
    background-color: transparent;
    box-shadow: none;
  }

  &:focus {
    box-shadow: none;
  }
}
</style>