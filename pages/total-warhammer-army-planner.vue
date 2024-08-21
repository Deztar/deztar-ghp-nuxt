<template>
  <div id="tww-army-planner" class="container fr0" :class="{ 'edit-hide': !editMode }">
    <div class="left fc" v-show="editMode">
      <div class="factions fr0">
        <div v-for="f of factions" class="factions-item" :title="f.name" @click="setFaction(f)">
          <img :src="f.img" class="faction-icon">
        </div>
      </div>
      <div class="characters fc">
        <div class="fr characters-search">
          <input v-model="lss" @contextmenu.prevent="lss = ''" />
          <button @click="lss = chaosSearh">c</button>
          <div>{{ lordsFiltered.length }}</div>
        </div>
        <div class="characters-display fr0">
          <warhammer-unit v-for="l of lordsFiltered" :item="l" :key="l.key" @click="setLord(l)"></warhammer-unit>
        </div>
      </div>
      <div class="characters fc">
        <div class="fr characters-search">
          <input v-model="hss" @contextmenu.prevent="hss = ''" />
          <button @click="hss = chaosSearh">c</button>
          <div>{{ heroesFiltered.length }}</div>
        </div>
        <div class="characters-display fr0">
          <warhammer-unit v-for="h of heroesFiltered" :item="h" :key="h.key" @click="addHero(h)"></warhammer-unit>
        </div>
      </div>
    </div>
    <div class="middle fc">
      <div class="controls fr1">
        <button @click="saveData">Save</button>
        <button @click="addArmy">Add</button>
        <button @click="sortArmies">Sort</button>
        <button @click="loadData">Restore</button>
        <input v-model="ars" @contextmenu.prevent="ars = ''">
        <button @click="ars = chaosSearh">c</button>
        <label>Edit mode:</label>
        <AppCheckbox :checked="editMode" @click="editMode = !editMode" />
        <label>Show cost:</label>
        <AppCheckbox :checked="showCost" @click="showCost = !showCost" />
      </div>
      <div class="armies fc1">
        <div v-for="(a, i) of armies" :key="a.lord.key" class="army fr0" :class="{ selected: si === i && editMode }"
          v-show="isShowArmy(a)">
          <div class="army-header fc">
            <input title="Position in array" class="index" type="number" :value="i"
              @input="moveArmy(i, +($event.target as HTMLInputElement)?.value)" v-show="editMode" />
            <img :src="a.faction.img" class="faction-icon" @click="select(i)" @contextmenu="select(i)" />
            <div class="fr" v-show="editMode">
              <button class="delete" @click="copyArmy(a)">c</button>
              <button class="delete" @click="removeArmy(i)">x</button>
            </div>
          </div>
          <warhammer-unit :item="a.lord" :key="a.lord.key" @variant-change="a.lord.variant = $event" @click="select(i)"
            @contextmenu="select(i)"></warhammer-unit>
          <warhammer-unit v-for="(h, j) of a.heroes" :item="h" :key="h.key" @variant-change="h.variant = $event"
            @contextmenu="removeHero(a, j)"></warhammer-unit>
          <warhammer-unit v-for="(u, k) of a.units" :item="u" :key="`${u.key}_${k}`" @click="copyUnit(a, u)"
            @contextmenu="removeUnit(a, k)"></warhammer-unit>
        </div>
      </div>
    </div>
    <div class="right fc" v-show="editMode">
      <div class="fr units-search">
        <input v-model="uss" @contextmenu.prevent="uss = ''" />
        <button @click="uss = chaosSearh">c</button>
        <div>{{ unitsFiltered.length }}</div>
      </div>
      <div class="units-display fr0">
        <warhammer-unit v-for="u of unitsFiltered" :item="u" :key="u.key" @click="addUnit(u)"></warhammer-unit>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  factions,
  characters,
  units,
  type Character,
  type Unit,
  type Faction,
  unitComparator
} from '~/lib/twwData'

type Army = {
  faction: Faction
  lord: Character & { variant?: number }
  heroes: (Character & { variant?: number })[]
  units: Unit[]
}

const chaosSearh = 'kho_ nur_ tze_ sla_ dae_ chs_'

const lss = ref('')
const hss = ref('')
const uss = ref('')
const ars = ref('')
const editMode = ref(true)
const si = ref(0)
const ci = ref<Army>()
const armies = ref<Army[]>([])
const showCost = ref(true)
provide('show-cost', showCost)

const isFull = (a: Army) => a.heroes.length + a.units.length >= 19
const isCiFull = computed(() => ci.value && isFull(ci.value))

const select = (index: number) => {
  si.value = index
  ci.value = armies.value[index]
}

const addArmy = () => {
  armies.value.push({
    faction: factions[6],
    lord: characters.find(x => x.key === 'wh3_dlc25_emp_master_engineer') || lordsFiltered.value[0],
    heroes: [],
    units: [],
  })
  select(armies.value.length - 1)
}
const removeArmy = (index: number) => {
  armies.value.splice(index, 1)
  if (index === armies.value.length) select(armies.value.length - 1)
}
const copyArmy = (a: Army) => {
  armies.value.push(JSON.parse(JSON.stringify(a)))
  select(armies.value.length - 1)
}
const sortArmies = () => {
  armies.value.sort((a, b) => (
    2 * a.faction.name.localeCompare(b.faction.name) + a.lord.key.localeCompare(b.lord.key)
  ))
}

let changeTimer: ReturnType<typeof setTimeout> | undefined = undefined
const moveArmy = (index: number, newIndex: number) => {
  clearTimeout(changeTimer)
  changeTimer = setTimeout(() => {
    const item = armies.value[index]
    removeArmy(index)
    armies.value.splice(newIndex, 0, item)
  }, 500)
}

const setFaction = (f: Faction) => { if (ci.value) ci.value.faction = f }
const setLord = (l: Character) => { if (ci.value) ci.value.lord = l }
const addHero = (h: Character) => { if (ci.value && !isCiFull.value) ci.value.heroes.push(h) }
const addUnit = (u: Unit) => {
  if (ci.value && !isCiFull.value) {
    ci.value.units.push(u)
    ci.value.units.sort(unitComparator)
  }
}
const removeHero = (a: Army, index: number) => { a.heroes.splice(index, 1) }
const removeUnit = (a: Army, index: number) => { a.units.splice(index, 1) }
const copyUnit = (a: Army, u: Unit) => { if (!isFull(a)) { a.units.push(u); a.units.sort(unitComparator) } }

type DataType = {
  editMode?: boolean
  lss?: string
  hss?: string
  uss?: string
  showTabletopCap?: boolean
  armies?: {
    faction: string
    lord: {
      key: string,
      variant?: number
    }
    heroes: {
      key: string,
      variant?: number
    }[]
    units: string[]
  }[]
}

const saveData = () => {
  const data: DataType = {
    editMode: editMode.value,
    lss: lss.value,
    hss: hss.value,
    uss: uss.value,
    showTabletopCap: showCost.value,
    armies: armies.value.map(x => ({
      faction: x.faction.name,
      lord: { key: x.lord.key, variant: x.lord.variant },
      heroes: x.heroes.map(h => ({ key: h.key, variant: h.variant })),
      units: x.units.map(u => u.key),
    }))
  }
  localStorage.setItem(
    'tww-data',
    JSON.stringify(data)
  )
}

const loadData = () => {
  const data = JSON.parse(localStorage.getItem('tww-data') || '{}') as DataType
  editMode.value = data.editMode === undefined ? true : data.editMode
  lss.value = data.lss || ''
  hss.value = data.hss || ''
  uss.value = data.uss || ''
  showCost.value = data.showTabletopCap === undefined ? true : data.showTabletopCap
  if (data.armies) {
    const fd = factions[0]
    const cd = characters[0]
    const ud = units[0]
    armies.value = data.armies.map(x => ({
      faction: factions.find(f => f.name === x.faction) || fd,
      lord: { ...characters.find(c => c.key === x.lord.key) || cd, variant: x.lord.variant },
      heroes: x.heroes.map(h => ({
        ...characters.find(c => c.key === h.key) || cd,
        variant: h.variant
      })),
      units: x.units.map(k => units.find(u => u.key === k) || ud)
    }))
  }
}

const searchTermsOr = (x: Character | Unit, ss: string[]) => {
  for (const s of ss) {
    if (x.key.includes(s)) return true
  }
  return false
}

const isShowArmy = (a: Army) => a === ci.value || searchTermsOr(a.lord, ars.value.split(' '))

const lordsFiltered = computed(() =>
  characters.filter(x => x.caste === 'lord' && searchTermsOr(x, lss.value.split(' '))).slice(0, 60))
const heroesFiltered = computed(() =>
  characters.filter(x => x.caste === 'hero' && searchTermsOr(x, hss.value.split(' '))).slice(0, 35))
const unitsFiltered = computed(() =>
  units.filter(x => searchTermsOr(x, uss.value.split(' '))).slice(0, 220)
)

onMounted(() => {
  loadData()
  addEventListener('beforeunload', saveData)
  select(0)
})
onBeforeUnmount(() => {
  removeEventListener('beforeunload', saveData)
  saveData()
})
</script>

<style lang="scss">
@import '@css/color.scss';
@import '@css/borders.scss';

#tww-army-planner {
  img.faction-icon {
    height: 55px;
    width: 55px;
    filter: drop-shadow(.1rem .1rem .35rem rgba(0, 0, 0, .7))
  }

  &.container {
    margin: 4px;
    justify-content: center;
    column-gap: 2px;

    .left {
      max-width: 260px;

      .factions {
        flex-wrap: wrap;
        justify-content: center;
        height: 255px;
        overflow-y: scroll;

        &-item {
          padding: 5px 3px 0 2px;
          border-radius: 5px;
          cursor: pointer;

          &:hover {
            background-color: $color-border;
          }
        }
      }

      .characters {
        &-search {
          justify-content: center;
          align-items: center;

          input {
            width: 20ch;
          }
        }

        &-display {
          flex-wrap: wrap;
          justify-content: start;
          align-content: flex-start;
          height: 263px;
          overflow-y: scroll;
          // column-gap: 2px;
          // row-gap: 2px;
        }
      }
    }

    .middle {
      min-width: 1317px;

      .controls {
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

        label {
          white-space: nowrap;
        }
      }

      .armies {
        overflow-y: scroll;
        max-height: 89vh;
        padding: 2px;

        .army {
          min-width: 1305px;
          // column-gap: 2px;
          // @include border-basic;

          &.selected {
            box-shadow: 0 0 5px 1px $color-text;
          }

          &-header {
            width: 55px;
            margin: 0 5px;
            justify-content: center;
            align-items: center;

            .index {
              color: $color-text-gray;
              width: 3ch;
              text-align: center;
            }

            .faction-icon {
              cursor: pointer;
            }
          }
        }
      }
    }

    .right {
      width: 322px;

      .units-search {
        justify-content: center;
        align-items: center;
      }

      .units-display {
        flex-wrap: wrap;
        justify-content: start;
        align-content: flex-start;
        overflow-y: scroll;
        max-height: 90vh;
        // column-gap: 2px;
        // row-gap: 2px;
      }
    }
  }
}
</style>