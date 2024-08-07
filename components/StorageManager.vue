<template>
  <div class="storage-manager fc">
    <div v-for="k in storageKeys" class="row fr1">
      <div>{{ k }}</div>
      <button @click="clearStorage" :data-key="k">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Client Only
const { hideNuxt } = defineProps({ 'hideNuxt': Boolean })

const storageKeys = ref<string[]>([])

const updateStorageKeys = () => {
  const keys = Object.keys({ ...localStorage })
  if (hideNuxt) storageKeys.value = keys.filter(x => !x.startsWith('nuxt-'))
  else storageKeys.value = keys
}

const clearStorage = (e: MouseEvent) => {
  if (e.target) {
    const k = (e.target as HTMLElement).getAttribute('data-key')
    if (k && confirm(`You are about to delete "${k}" from storage. This action is irreversible. Continue?`)) {
      localStorage.removeItem(k)
      updateStorageKeys()
    }
  }
}

onMounted(() => { updateStorageKeys() })
</script>

<style lang="scss">
.storage-manager {
  .row {
    justify-content: space-between;
  }
}
</style>