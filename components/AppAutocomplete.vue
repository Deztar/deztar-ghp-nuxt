<template>
  <input v-bind="attrs" :list="id" class="autocomplete" />
  <datalist :id="id">
    <option v-for="item in items" :value="item" />
  </datalist>
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'

interface AutocompleteProps extends /* @vue-ignore */ InputHTMLAttributes {
  items?: string[]
}

const { items = [] } = defineProps<AutocompleteProps>()
const attrs = useAttrs()
const id = `${Date.now().toString(36)}${Math.random().toString(36).substr(2)}`
</script>

<style lang="scss"></style>