<template>
  <div class="dropdown" ref="divRef">
    <slot name="activator" @click="toggleVisibility" class="dropdown-activator">
      <button @click="toggleVisibility">{{ buttonText }}</button>
    </slot>
    <ul v-show="isVisible" class="dropdown-list bs" ref="listRef" @click="isVisible = false">
      <li v-for="item of items">
        <NuxtLink v-if="item.href" :to="item.href">{{ item.text }}</NuxtLink>
        <span v-else-if="item.onClick" class="link" @click="item.onClick">{{ item.text }}</span>
        <span v-else class="dim">{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Item {
  text: string
  href?: string
  onClick?: (payload: MouseEvent) => void
}

interface Props {
  buttonText?: string
  items: Item[]
}

const {
  buttonText = 'Menu',
  items = [],
} = defineProps<Props>()

const divRef = ref<HTMLDivElement>()
const listRef = ref<HTMLUListElement>()

const isVisible = defineModel<boolean>({ default: false })
const toggleVisibility = () => {
  if (isVisible.value === false && divRef.value && listRef.value) {
    listRef.value.classList.remove('y-top', 'x-left', 'x-center')
    const rect = divRef.value.getBoundingClientRect()
    if (rect.top > window.innerHeight * 0.5) listRef.value.classList.add('y-top')
    if (rect.right > window.innerWidth * 0.75) listRef.value.classList.add('x-left')
    else if (rect.left > window.innerWidth * 0.25) listRef.value.classList.add('x-center')
  }
  isVisible.value = !isVisible.value
}

const route = useRoute()
watch(() => route.path, () => { isVisible.value = false })

defineExpose({ toggleVisibility })
</script>

<style lang="scss">
@use '@css/color.scss';

.dropdown {
  position: relative;
  display: inline-block;

  &-activator {
    user-select: none;
  }

  &-list {
    position: absolute;
    background-color: color.$color-background;
    list-style: none;
    padding: 5px;
    margin: 5px 0;
    width: max-content;
    display: flex;
    flex-direction: column;
    row-gap: 5px;

    &.x-left {
      right: 0;
    }

    &.x-center {
      left: 50%;
      transform: translateX(-50%);
      align-items: center;
    }

    &.y-top {
      bottom: 100%;
    }
  }
}
</style>