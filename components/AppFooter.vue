<template>
  <div>
    <NuxtLink v-if="route.path !== '/'" to="/">Home</NuxtLink>
    <span v-else>Home</span>
    |
    <AppDropdown :items="modifiedItems">
      <template v-slot:activator="activatorProps">
        <span v-bind="activatorProps" class="link">Tools</span>
      </template>
    </AppDropdown>
    |
    by <NuxtLink :to="'https://github.com/Deztar'">Deztar</NuxtLink>
    <div v-if="devMode" style="height: 30px;"></div>
  </div>
</template>

<script setup lang="ts">
import { navItems } from '~/lib'

const route = useRoute()

const modifiedItems = computed(() => navItems.map(x => ({ ...x, href: x.href === route.path ? undefined : x.href })))
const devMode = import.meta.env.DEV
</script>

<style lang="scss"></style>