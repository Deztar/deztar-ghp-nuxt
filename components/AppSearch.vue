<template>
  <div>
    <input v-model="searchString" />
    <template v-if="!component">
      <template v-for="item of displayItems">
        <div @click="emit('indexFound', item.index)">{{ item.value }}</div>
      </template>
    </template>
    <template v-else>
      <template v-for="item of displayItems">
        <component :is="component" :item="item.value" @click="emit('indexFound', item.index)" />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

// const defaultComponent = defineComponent({
//   props: ['item'],
//   setup(props) {
//     return () => h('div', props.item)
//   }
// })

const {
  items,
  searchProps = [],
  component,
} = defineProps<{
  items: string[] | any[]
  searchProps?: string[]
  component?: Component
}>()
const emit = defineEmits<{
  indexFound: [index: number]
}>()

const searchString = ref('')
const searchPredicate = (r: Record<string, string>) => {
  for (const key of Object.keys(r)) {
    if (typeof r[key] !== 'string') continue
    if (searchProps.length === 0 || searchProps.includes(key))
      if (r[key].toLowerCase().includes(searchString.value.toLowerCase())) return true
  }
  return false
}
const displayItems = computed(() => {
  if (!items.length) return []
  const result = items.map((x, i) => ({ value: x, index: i }))
  if (typeof items[0] === 'string') return result.filter(x => x.value.toLowerCase().includes(searchString.value.toLowerCase()))
  return result.filter(x => searchPredicate(x.value))
})
</script>

<style lang="scss"></style>