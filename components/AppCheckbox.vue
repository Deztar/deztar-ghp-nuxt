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
@import '@css/color.scss';
@import '@css/borders.scss';

.checkbox {
  @include border-basic;
  display: inline-flex;
  align-items: center;
  padding: 0 3px;
  user-select: none;

  &.checked {
    color: $color-white;
  }

  &:not(.checked) {
    color: $color-black;
  }

  &.disabled {
    color: $color-black;
    border-color: $color-black;
    border-style: dashed;
    cursor: default;
  }

  .checkmark {
    vertical-align: middle;
  }
}
</style>