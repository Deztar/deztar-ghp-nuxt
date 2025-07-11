<template>
  <teleport to="body">
    <div v-show="isVisible" ref="bgDiv" class="modal-background" @mousedown="mouseDownHandler"
      @mouseup="mouseUpHandler">
      <div v-bind="attrs" class="modal-container fc1 bs">
        <div class="modal-header fr1">
          <button class="ml-auto" @click="isVisible = false">
            <span class="sls">x</span>
          </button>
        </div>
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
const attrs = useAttrs()
const isVisible = defineModel<boolean>()
const bgDiv = useTemplateRef('bgDiv')
const mouseDownTarget = ref<EventTarget | null>(null)
const mouseDownHandler = (event: MouseEvent) => {
  mouseDownTarget.value = event.target
}
const mouseUpHandler = (event: MouseEvent) => {
  if (mouseDownTarget.value === bgDiv.value && event.target === bgDiv.value) isVisible.value = false
}
</script>

<style lang="scss">
@use '@css/color.scss';

.modal {
  &-background {
    z-index: 100;
    position: absolute;
    top: 0;
    width: 100%;
    height: calc(100vh - 8px);
    background-color: rgba(color.$color-background, .5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-container {
    background-color: color.$color-background;
    margin: 20px;
    padding: 10px;
    box-shadow: 0px 0px 8px 0px color.$color-border;
    max-height: calc(75vh);
  }

  &-content {
    overflow: auto;
    padding: 1px 0;
  }
}
</style>