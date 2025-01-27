<template>
  <div class="checkbox" :class="{ disabled, checked }">
    &#10003;
  </div>
</template>

<script setup lang="ts">
const { checked, disabled } = defineProps({
  checked: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss">
@use '@css/color.scss';

.checkbox {
  display: inline-flex;
  align-items: center;
  padding: 0 3px;
  user-select: none;

  &.checked {
    color: color.$color-white;
  }

  &:not(.checked) {
    color: color.$color-black;
  }

  &.disabled {
    color: color.$color-black;
    border-color: color.$color-black;
    border-style: dashed;
    cursor: default;
  }

  .checkmark {
    vertical-align: middle;
  }
}
</style>