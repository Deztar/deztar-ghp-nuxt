<template>
  <div id="home" class="fc1">
    <div>Tools:</div>
    <div class="fc ac">
      <template v-for="i of navItems">
        <NuxtLink v-if="i.href" :to="i.href">{{ i.text }}</NuxtLink>
      </template>
    </div>
    <div>Storage used:</div>
    <ClientOnly>
      <StorageManager :hide-nuxt="true" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { navItems } from '~/lib'
</script>

<style lang="scss">
#home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1ch;
}
</style>
