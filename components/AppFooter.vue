<template>
  <div>
    <template v-for="r of routes" :key="r.name">
      <template v-if="route.path !== r.path">
        <NuxtLink :to="r.path">{{ r.title }}</NuxtLink>
      </template>
      <template v-else>
        <span>{{ r.title }}</span>
      </template>
      |
    </template>
    by <NuxtLink :to="'https://github.com/Deztar'">Deztar</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const routes = [
  { title: 'Home', path: '/' },
  { title: 'Rimworld Crop Planner', path: '/rimworld-crop-planner' },
  { title: 'Total Warhammer Army Planner', path: '/total-warhammer-army-planner' },
]

</script>

<style lang="scss"></style>