<template>
  <div id="home" class="fc1">
    <div>Tools:</div>
    <div class="fc ac">
      <template v-if="isDebug">
        <template v-for="r of testingRoutes">
          <NuxtLink :to="r.path">{{ r.name }}</NuxtLink>
        </template>
        <br />
      </template>
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
const isDebug = process.env.NODE_ENV === 'development'

const testingRoutes = useNuxtApp().$router.options.routes.filter(x => x.path.startsWith('/testing-ground'))
</script>

<style lang="scss">
#home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1ch;
}
</style>
