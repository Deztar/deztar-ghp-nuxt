<template>
  <div class="storage-manager fc">
    <div v-for="k in storageKeys" class="row fr1">
      <div>{{ k }}</div>
      <button @click="showData(k)" class="ml-auto">Show</button>
      <button @click="clearStorage" :data-key="k">Delete</button>
    </div>
    <AppDialog v-model="showDialog">
      {{ data }}
    </AppDialog>
  </div>
</template>

<script setup lang="ts">
// Client Only
const { hideNuxt } = defineProps({ 'hideNuxt': Boolean })

const storageKeys = ref<string[]>([])
const showDialog = ref(false)
const data = ref('')
const showData = (k: string) => {
  const s = localStorage.getItem(k) || ''
  data.value = JSON.stringify(JSON.parse(s), null, 1)
  showDialog.value = true
}

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