<template>
  <div :id="uniqueId" ref="wrapper" class="drag-and-drop">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { Component, RendererNode } from 'vue';

const {
  uniqueId,
} = defineProps<{
  uniqueId: string
}>()
const emit = defineEmits<{
  drop: [to: number, from: number]
}>()

const idAttr = 'drag-drop-id'
const itemClass = 'drag-drop-item'
const wrapper = useTemplateRef('wrapper')
const dragStartIndex = defineModel('dragStartIndex', { required: false })
const dragOverIndex = defineModel('dragOverIndex', { required: false })

const getElementIndex = (target: EventTarget | null) => {
  if (!target) return '-1'
  const elem = (target as HTMLElement).closest(`.${itemClass}`)
  if (!elem) return '-1'
  return elem.getAttribute(idAttr) || '-1'
}

const handleDragStart = (event: DragEvent) => {
  if (!event.dataTransfer) return
  const index = getElementIndex(event.target)
  event.dataTransfer.setData('text/plain', index)
  dragStartIndex.value = +index
}
const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  const index = getElementIndex(event.target)
  dragOverIndex.value = +index
}
const handleDrop = (event: DragEvent) => {
  if (!event.target) return
  const to = +getElementIndex(event.target)
  const from = +(event.dataTransfer?.getData('text') || -1)
  emit('drop', to, from)
  updateHandlers()
}
const handleDragEnd = () => {
  dragStartIndex.value = undefined
  dragOverIndex.value = undefined
}

const updateHandlers = () => {
  if (!wrapper.value) return
  const children = [...wrapper.value.children as HTMLCollectionOf<HTMLElement>].filter(x => x.classList.contains(itemClass))
  for (let i = 0, l = children.length; i < l; i++) {
    children[i].addEventListener('dragstart', handleDragStart)
    children[i].addEventListener('dragover', handleDragOver)
    children[i].addEventListener('drop', handleDrop)
    //children[i].setAttribute(idAttr, i.toString())
  }
}
let observer: MutationObserver | null
const mutationCallback = (mutationList: MutationRecord[], observer: MutationObserver) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      updateHandlers()
    }
  }
}


onMounted(() => {
  if (wrapper.value) {
    observer = new MutationObserver(mutationCallback)
    observer.observe(wrapper.value, { childList: true })
    updateHandlers()
  }
  document.addEventListener('dragend', handleDragEnd)
})
onBeforeUnmount(() => {
  if (wrapper.value) {
    const children = [...wrapper.value.children as HTMLCollectionOf<HTMLElement>]
    for (const child of children) {
      child.removeEventListener('dragstart', handleDragStart)
      child.removeEventListener('dragover', handleDragOver)
      child.removeEventListener('drop', handleDrop)
    }
  }
  document.removeEventListener('dragend', handleDragEnd)
  observer && observer.disconnect()
})
</script>

<style lang="scss"></style>