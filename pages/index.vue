<template>
  <div id="home" class="fc1">
    <div>Storage used:</div>
    <ClientOnly>
      <StorageManager :hide-nuxt="true" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
//await navigateTo({path: '/rimworld-crop-planner'})
</script>

<style lang="scss">
#home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1ch;
}
</style>
