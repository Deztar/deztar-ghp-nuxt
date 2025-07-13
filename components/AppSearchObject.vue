<template>
  <div class="search">
    <input v-model="searchString" style="margin-bottom: 10px" />
    <div class="fr1">
      <div style="flex-shrink: 0;" v-bind="listProps">
        <template v-for="item of displayItems">
          <div class="search-item" :class="{ 'disabled': item.value.disabled, 'very-dim': item.value.disabled }"
            @click="emit('itemFound', item)" @mouseover="hoveredObject = item.value">
            {{ item.value.name }}
          </div>
        </template>
      </div>
      <div v-if="hoveredObject" style="padding-left: 20px">
        <h3>
          {{ hoveredObject.name }}
        </h3>
        <p>
          {{ hoveredObject.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Item = { name: string, description?: string, disabled?: boolean }

const {
  items,
  listProps = {}
} = defineProps<{
  items: Item[]
  listProps?: object
}>()
const emit = defineEmits<{
  itemFound: [item: { index: number; value: Item }]
}>()

const searchString = ref('')
const hoveredObject = ref<Item>()
const searchPredicate = (r: Item) => {
  if (r.name.toLowerCase().includes(searchString.value.toLowerCase())) return true
  if (r.description && r.description.toLowerCase().includes(searchString.value.toUpperCase())) return true
  return false
}
const displayItems = computed(() => {
  if (!items.length) return []
  const result = items.map((x, i) => ({ value: x, index: i }))
  return result.filter(x => searchPredicate(x.value))
})
watch(() => items, () => searchString.value = '')

const handleMouseover = (event: MouseEvent) => {
  if (!event.target) return
  const target = event.target as HTMLElement
  if (!target.classList.contains('search-item')) hoveredObject.value = undefined
}
onMounted(() => {
  document.addEventListener('mouseover', handleMouseover)
})
onBeforeUnmount(() => {
  document.removeEventListener('mouseover', handleMouseover)
})
</script>

<style lang="scss">
@use '@css/color.scss';

.search {
  &-item {
    padding: 2px 10px 2px 3px;

    &:not(.disabled) {
      cursor: pointer;

      &:hover {
        background-color: color.$color-border;
      }
    }
  }
}
</style>