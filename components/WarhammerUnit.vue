<template>
  <div class="warhammer-unit">
    <div class="unit fr0" @click="handleClick" @contextmenu.prevent="$emit('contextmenu')">
      <img :src="iconUrl" class="card" :title="item.key" loading="lazy" />
      <img v-if="costUrl" :src="costUrl" class="cost" loading="lazy" />
      <img :src="categoryUrl" class="category" :title="item.ui_group_icon" loading="lazy" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  type Character,
  type Unit
} from '~/lib/twwData'

const emit = defineEmits(['click', 'contextmenu', 'variant-change'])
const { item } = defineProps<{ item: Unit | Character & { variant?: number } }>()

const variant = ref((item as any).variant || 0)
const showCost: Ref<boolean> = inject('show-cost') || ref(true)

const iconUrl = computed(() => {
  if (item.caste !== 'lord' && item.caste !== 'hero')
    return `/img/tww/units/icons/${item.ui_unit_icon}.png`
  else {
    const c = item as Character
    if (c.variants) {
      return `/img/tww/portraits/units/${c.variants[variant.value]}_0.png`
    } else return `/img/tww/portraits/units/${item.ui_unit_icon}_0.png`
  }
})

const categoryUrl = computed(() => `/img/tww/unit_category_icons/${item.ui_group_icon}.png`)

const costUrl = computed(() => {
  if (!showCost.value) return null
  const u = item as Unit
  if (!u.rarity) return null
  if (u.rarity === 'core') return `/img/tww/unit_cost/core.png`
  else return `/img/tww/unit_cost/${u.rarity}_${u.cost}.png`
})

const handleClick = (event: MouseEvent) => {
  if (!event.ctrlKey) {
    emit('click')
    return
  }
  event.preventDefault()
  const vs = (item as Character).variants
  if (vs) {
    const v = variant.value
    if (v === vs.length - 1) variant.value = 0
    else variant.value = v + 1
    emit('variant-change', variant.value,)
  }
}

</script>

<style lang="scss">
.warhammer-unit {
  @import '@css/borders.scss';
  .unit {
    @include border-basic;
    position: relative;
    justify-content: center;
    cursor: pointer;

    .card {
      width: 60px;
      height: 130px;
    }

    .cost {
      position: absolute;
      top: 0;
      width: 24px;
      filter: drop-shadow(0 0px 4px black);
    }

    .category {
      position: absolute;
      bottom: 2px;
      width: 27px;
      filter: drop-shadow(0 0px 4px black);
    }
  }
}
</style>