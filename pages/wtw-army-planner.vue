<template>
  <div id="wtw-army-planner" class="fc1" style="margin:1ch">
    <div class="fr jc ac">
      <button @click="saveData">Save</button>
      <button @click="addNewArmy">Add</button>
      <button @click="sortArmies">Sort</button>
      <button @click="loadData">Restore</button>
      <label>Edit Mode:</label>
      <AppCheckbox :checked="editMode" @click="editMode = !editMode" />
      <label>Autocomplete:</label>
      <AppCheckbox :checked="autocompleteMode" @click="autocompleteMode = !autocompleteMode" />
    </div>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th v-show="editMode">Controls</th>
            <th>Culture</th>
            <th>Lord</th>
            <th v-for="n of 19" :key="n">{{ n + 1 }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(a, index) of armies" :key="index" :class="{ selected: editMode && selectedIndex === index }"
            @click="selectRow($event, index)">
            <td v-show="editMode" class="controls">
              <input title="Position in array" class="number-short dim" type="number" :value="index"
                @input="moveArmy(index, +($event.target as HTMLInputElement)?.value)" />
              <button class="delete" @click="copyArmy(index)">c</button>
              <button class="delete" @click="removeArmy(index)">x</button>
            </td>
            <td>{{ a.culture }}</td>
            <td>{{ a.lord }}</td>
            <template v-for="u of a.units" :key="u.type">
              <td v-if="u.quantity > 0" class="field" :colspan="u.quantity">
                <span v-if="u.quantity > 1" class="quantity">
                  {{ u.quantity }} x<br />
                </span>
                <span class="unit">
                  {{ u.name }}
                </span>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
      <div v-if="armies.length > 0 && armies[selectedIndex]" v-show="editMode" class="editor fc bs">
        <div class="row">
          <label>Culture</label>
          <input title="Culture" class="name header" type="text" :value="armies[selectedIndex].culture"
            @input="armies[selectedIndex].culture = ($event.target as HTMLInputElement)?.value" />
        </div>
        <div class="border" />
        <div class="row">
          <label>Lord</label>
          <input title="Lord" class="name header" type="text" :value="armies[selectedIndex].lord"
            @input="armies[selectedIndex].lord = ($event.target as HTMLInputElement)?.value" />
        </div>
        <template v-for="u, index of armies[selectedIndex].units" :key="u.type">
          <div class="border" v-if="separators.includes(u.type)" />
          <div class="row">
            <label>{{ getTypeName(u.type) }}</label>
            <input title="Number of units" class="number-short quantity" type="number" :value="u.quantity"
              @input="u.quantity = +($event.target as HTMLInputElement)?.value" @contextmenu.prevent="u.quantity = 0" />
            <input title="Unit name" class="name" type="text" :value="u.name"
              @input="u.name = ($event.target as HTMLInputElement)?.value" :list="getListName(index)" />
          </div>
        </template>
        <template v-for="list, index in unitLists">
          <datalist :id="`unit-list-${index}`">
            <option v-for="item in list" :value="item" />
          </datalist>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Warhammer Army Planner',
  meta: [{
    name: 'description', content: 'Warhammer Army Planner'
  }]
})

const unitTypes = [
  'Training 1',
  'Scouting 1',
  'Healing 1',
  'Mobility 1',
  'Scavenge 1',
  'Infantry 1',
  'Infantry 2',
  'Infantry 3',
  'Infantry 4',
  'Infantry 5',
  'Cavalry 1',
  'Cavalry 2',
  'Chariot 1',
  'Beasts 1',
  'Monster 1',
  'Monster 2',
  'Monster 3',
  'Monster 4',
  'War Machine 1',
  'Artillery 1',
  'Artillery 2'
]
type Unit = {
  quantity: number
  type: string
  name: string
}
type Army = {
  culture: string
  lord: string
  units: Unit[]
}
const getUnitArray = (units: Unit[] = []): Unit[] => {
  const result: Unit[] = unitTypes.map((x) => ({
    type: x,
    quantity: 0,
    name: '',
  }))
  for (let u of units) {
    const item = result.find((x) => x.type === u.type)
    if (item) {
      item.quantity = u.quantity
      item.name = u.name
    }
  }
  return result
}

let changeTimer: number | undefined = undefined
const editMode = ref(false)
const autocompleteMode = ref(false)
const armies = ref<Army[]>([])
const selectedIndex = ref(0)
const separators = ['Infantry 1', 'Cavalry 1', 'Monster 1', 'War Machine 1']
const unitGroupMap: number[] = []
for (let i = 0, l = unitTypes.length, group = 0; i < l; i++) {
  if (separators.includes(unitTypes[i])) group++
  unitGroupMap[i] = group
}

const loadData = () => {
  const data = JSON.parse(localStorage.getItem('wtw-data') || '{}')
  armies.value = data.armies || []
  armies.value.forEach((x) => {
    x.units = getUnitArray(x.units)
  })
  editMode.value = data.editMode || false
  autocompleteMode.value = data.autocompleteMode || false
}
const saveData = () => {
  const data: Army[] = []
  armies.value.forEach(a => {
    data.push({
      ...a,
      units: a.units.filter(x => x.quantity > 0 || x.name.length > 0)
    })
  })
  localStorage.setItem(
    'wtw-data',
    JSON.stringify({
      armies: data,
      editMode: editMode.value,
      autocompleteMode: autocompleteMode.value,
    })
  )
}

const selectRow = (event: MouseEvent, index: number) => {
  if (event.target && (event.target as HTMLElement).tagName === 'BUTTON') return
  selectedIndex.value = index
}
const addNewArmy = () => {
  armies.value.push({
    culture: '',
    lord: '',
    units: getUnitArray(),
  })
  selectedIndex.value = armies.value.length - 1
}
const removeArmy = (index: number) => {
  armies.value.splice(index, 1)
  selectedIndex.value = index - 1
}
const moveArmy = (index: number, newIndex: number) => {
  clearTimeout(changeTimer)
  changeTimer = window.setTimeout(() => {
    const item = armies.value[index]
    removeArmy(index)
    armies.value.splice(newIndex, 0, item)
  }, 500)
}
const copyArmy = (index: number) => {
  const a = JSON.parse(JSON.stringify(armies.value[index]))
  armies.value.push(a)
}
const sortArmies = () => {
  armies.value.sort((a, b) => (
    2 * a.culture.localeCompare(b.culture) + a.lord.localeCompare(b.lord)
  ))
}

const getTypeName = (t: string) => (isNaN(+t.slice(-1)) ? t : t.slice(0, -2))

const unitLists = computed(() => {
  const result: string[][] = []
  for (let i = 0, l = separators.length + 1; i < l; i++) result[i] = []
  if (autocompleteMode.value === true) {
    armies.value.forEach(a => {
      a.units.forEach((u, i) => {
        if (u.name) result[unitGroupMap[i]].push(u.name)
      })
    })
  }
  return result
})
const getListName = (index: number) => `unit-list-${unitGroupMap[index]}`

onMounted(() => {
  loadData()
  addEventListener('beforeunload', saveData)
})
onBeforeUnmount(() => {
  removeEventListener('beforeunload', saveData)
  saveData()
})
</script>

<style lang="scss">
@use '@css/color.scss';
@use '@css/borders.scss';


#wtw-army-planner {
  .delete {
    width: 25px;
  }

  .container {
    font-size: 14px;
    display: flex;
    align-items: flex-start;
    column-gap: 1ch;
    box-sizing: border-box;
    // min-width: calc(100vw - 1ch);
    padding: 0 1ch;
  }

  table.table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;

    tr {
      height: 23px;

      &.selected {
        box-shadow: inset 0 0 0.5ch color.$color-text;
      }
    }

    th {
      @include borders.border-basic;
      color: color.$color-black-50;
      width: 6ch;
    }

    td {
      @include borders.border-basic;
      padding: 5px 1ch;

      &.controls {
        white-space: nowrap;

        &>*:not(:first-child) {
          margin-left: 0.5ch;
        }
      }

      .quantity {
        color: color.$color-black-50;
      }

      .quantity+.unit {
        white-space: nowrap;
      }
    }
  }

  .editor {
    padding: 8px;
    flex-shrink: 0;

    .row {
      display: flex;
      align-items: center;
      column-gap: 0.5ch;

      label {
        margin-right: 0.5ch;
      }
    }

    .name {
      width: 21ch;

      &.header {
        margin-left: auto;
      }
    }

    .quantity {
      margin-left: auto;
    }
  }

  .border {
    background-color: color.$color-border;
    height: 1px;
    margin: 0.5ch 0;
  }
}
</style>