<template>
  <div id="rogue-trader-builder" class="container fc1 ac">
    <div class="fr1">
      <button @click="saveData">Save</button>
      <button @click="copyBuild">Copy</button>
      <button @click="clearSelection">Clear Selection</button>
      <div class="fr jc ac">
        <label>Danger Mode:</label>
        <AppCheckboxModel v-model="dangerMode" />
      </div>
      <button @click="exportData">Export Data</button>
      <div class="fr jc ac">
        <label>Import Data:</label>
        <input type="file" @change="importData" accept=".json" placeholder="Import Data" />
      </div>
    </div>
    <div class="fr1" style="flex-grow: 1">
      <div class="fc1" style="width: calc(50vw - 40px);">
        <AppDragAndDropCollection class="bs fr1 jc wide-flex" style="padding:1ch" unique-id="tabs" @drop="swapBuilds"
          v-model:drag-start-index="dragStartIndex" v-model:drag-over-index="dragOverIndex">
          <template v-for="item, index in data" :key="index">
            <div class="drag-drop-item fr ac"
              :class="{ active: index === dragOverIndex || index === dragStartIndex || index === dataIndex }"
              draggable="true" :drag-drop-id="index" @click="selectBuild(index)">
              {{ item.name }}
            </div>
          </template>
          <button @click="addBuild"><span class="sss">+</span></button>
        </AppDragAndDropCollection>
        <div v-if="build" class="fc1 ac" style="flex-grow: 1;">
          <div class="fr0">
            <AppInputWithButton v-model="build.name" class="bs" style="margin-right: -1px;" />
            <button @click="removeBuild(dataIndex)"><span class="sls">x</span></button>
          </div>
          <div class="fr1 jc wide-flex">
            <div class="fc">
              <label>Homeworld</label>
              <AppSelect v-model="build.homeworld" :options="tags.Homeworld" optional />
            </div>
            <div class="fc">
              <label>Origin</label>
              <AppSelect v-model="build.origin" :options="tags.Origin" optional />
            </div>
            <div class="fc">
              <label>T1 Archetype</label>
              <AppSelect v-model="build.t1Archetype" :options="tags.T1Archetype" optional />
            </div>
            <div class="fc">
              <label>T2 Archetype</label>
              <AppSelect v-model="build.t2Archetype" :options="tags.T2Archetype" optional />
            </div>
          </div>
          <div class="fr1 jc wide-flex">
            <template v-for="school of tags.Psyker">
              <AppCheckboxModel v-model="build.psykerSchools[school]" falseAsUndefined />
              <label>{{ school }}</label>
            </template>
          </div>
          <div class="fr0 jc wide-flex archetype-selector">
            <div v-for="a, i of [build.t1Archetype, build.t2Archetype, 'Exemplar']" class="bs fr0 jc ac"
              :class="{ active: selectedArchetype === a }" @click="selectArchetype(a)">
              {{ a || `T${i + 1}` }}
            </div>
          </div>
          <div v-if="archetype" class="fr1" style="flex-grow: 1">
            <table class="archetype">
              <tr v-for="rank, ri in displayData" class="archetype-group">
                <td class="very-dim">{{ ri + levelOffset + 1 }}</td>
                <td v-for="feature, fi in rank" class="archetype-feature"
                  :class="{ 'very-dim': feature.grey, disabled: feature.disabled, active: ri === rankIndex && fi === featureIndex, [feature.feature]: true }"
                  @click="selectFeature(ri, fi, $event)">
                  {{ feature.value }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="fc1 items">
        <div class=" fr0 tabs" style="flex-wrap: wrap;">
          <div v-for="tab of tabs" class="bs tab" :class="{ active: tab === selectedTab }" @click="selectTab(tab)">
            {{ tab }}
          </div>
        </div>
        <div class="fr1">
          <AppSearchObject v-if="items" :items="items" @item-found="selectItem($event.value.name)"
            :list-props="{ 'class': 'search-list' }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSelect from '~/components/AppSelect.vue'
import { tags, archetypes, Feature, talentFeatures, talents, type Rank, abilityFeatures, t1Features, t2Features, abilities, characteristics, skills } from '~/lib/rogueTraderData'

useHead({
  title: 'Rogue Trader Builder',
  meta: [{
    name: 'description', content: 'Rogue Trader Builder'
  }]
})

interface Build {
  name: string
  homeworld?: string
  origin?: string
  t1Archetype?: string
  t2Archetype?: string
  psykerSchools: Record<string, boolean>
  t1Selection: Array<string | undefined>[]
  t2Selection: Array<string | undefined>[]
  ExSelection: Array<string | undefined>[]
}
type DisplayData = {
  value: string
  disabled?: boolean
  grey?: boolean
  feature: string
}

const data = ref<Build[]>([])
const dataIndex = ref(0)
const selectedArchetype = ref<string>()
const rankIndex = ref<number>(0)
const featureIndex = ref<number>(0)
const selectedTab = ref<string>()
const dragStartIndex = ref<number>()
const dragOverIndex = ref<number>()
const dangerMode = ref(false)

const build = computed<Build>(() => data.value[dataIndex.value])
const archetype = computed<Rank[]>(() => selectedArchetype.value ? archetypes[selectedArchetype.value] : [])
const selection = computed(() => {
  if (selectedArchetype.value === build.value.t1Archetype) return build.value.t1Selection
  if (selectedArchetype.value === build.value.t2Archetype) return build.value.t2Selection
  return build.value.ExSelection
})
const levelOffset = computed(() => {
  if (selectedArchetype.value === build.value.t1Archetype) return 0
  if (selectedArchetype.value === build.value.t2Archetype) return 15
  return 35
})
const selectedFeature = computed<string | Feature>(() =>
  archetype.value && archetype.value[rankIndex.value] ?
    archetype.value[rankIndex.value][featureIndex.value]
    : '')
const getFeatureCssClass = (feature: Feature) => {
  if (feature === Feature.CommonTalent) return 'common'
  if (talentFeatures.includes(feature)) return 'talent'
  if (abilityFeatures.includes(feature)) return 'ability'
  return Feature[feature].toLowerCase()
}
const displayData = computed(() => {
  const result: DisplayData[][] = []
  archetype.value.forEach((rank, ri) => {
    const displayRank: DisplayData[] = []
    rank.forEach((feature, fi) => {
      const item: DisplayData = { value: '', feature: '' }
      if (typeof feature === 'string') {
        item.value = feature
        item.disabled = true
        item.feature = 'fixed'
      } else if (selection.value[ri] && selection.value[ri][fi]) {
        item.value = selection.value[ri][fi]
        item.feature = getFeatureCssClass(feature)
      } else {
        item.value = Feature[feature]
        item.grey = true
        item.feature = getFeatureCssClass(feature)
      }
      displayRank.push(item)
    })
    result.push(displayRank)
  })
  return result
})
const schools = computed(() =>
  build.value ?
    Object.entries(build.value.psykerSchools).filter(([_, value]) => value === true).map(([key]) => key)
    : [])
const tabs = computed(() => {
  if (!build.value || !selectedFeature.value) return []
  const feature = selectedFeature.value
  if (typeof feature === 'string') return []
  if (!talentFeatures.includes(feature) && !abilityFeatures.includes(feature)) return []
  const result: Array<string | undefined> = []
  if (feature === Feature.Ability || feature === Feature.Talent) result.push(selectedArchetype.value)
  else {
    if (t1Features.includes(feature)) result.push(build.value.t1Archetype)
    if (t2Features.includes(feature)) result.push(build.value.t2Archetype)
  }
  if (build.value.origin?.includes('Psyker')) result.push('Psyker')
  result.push(build.value.origin)
  if (talentFeatures.includes(feature)) result.push(build.value.homeworld)
  result.push(...schools.value)
  if (feature === Feature.CommonTalent) result.push('Common')
  return result.filter(x => typeof x === 'string')
})
const items = computed(() => {
  if (!selectedFeature.value || typeof selectedFeature.value === 'string') return []
  const feature = selectedFeature.value
  if (feature === Feature.ExemplarTalent) return talents['Exemplar'].map(x => ({ ...x, disabled: selectionFlat.value.includes(x.name) }))
  if (feature === Feature.Characteristic) return characteristics.map(x => ({ name: x }))
  if (feature === Feature.Skill) return skills.map(x => ({ name: x }))
  if (feature === Feature.Upgrade) return ['I', 'II', 'III', 'IV'].map(x => ({ name: x }))
  // Tabbed items next
  if (!selectedTab.value) return []
  if (talentFeatures.includes(feature))
    return talents[selectedTab.value].map(x => ({ ...x, disabled: selectionFlat.value.includes(x.name) }))
  if (abilityFeatures.includes(feature))
    return abilities[selectedTab.value].map(x => ({ ...x, disabled: selectionFlat.value.includes(x.name) }))
})
const selectionFlat = computed(() => selection.value ? selection.value.flatMap(x => x) : [])

const selectArchetype = (a: string | undefined) => {
  selectedArchetype.value = a
  selectFeature(0, 0)
  selectedTab.value = undefined
}
const selectFeature = (ri: number, fi: number, event: { ctrlKey: boolean } = { ctrlKey: false }) => {
  rankIndex.value = ri
  featureIndex.value = fi
  //if (selectedTab.value && !tabs.value.includes(selectedTab.value)) selectTab(0)
  if (event.ctrlKey) { selectItem(undefined) }
  selectTab(0)
}
const selectTab = (t: string | number) => {
  if (typeof t === 'string') selectedTab.value = t
  else selectedTab.value = tabs.value[t]
}
const selectItem = (d: string | undefined) => {
  if (!selection.value) return
  if (!selection.value[rankIndex.value]) selection.value[rankIndex.value] = []
  selection.value[rankIndex.value][featureIndex.value] = d
}
const clearSelection = () => {
  if (!dangerMode.value && !confirm('This will clear currently selected archetype')) return
  if (selectedArchetype.value === build.value.t1Archetype) build.value.t1Selection = []
  if (selectedArchetype.value === build.value.t2Archetype) build.value.t2Selection = []
  if (selectedArchetype.value === 'Exemplar') build.value.ExSelection = []
}

// Builds
const addBuild = () => {
  data.value.push({
    name: 'Build name',
    psykerSchools: {},
    t1Selection: [],
    t2Selection: [],
    ExSelection: []
  })
  selectBuild(data.value.length - 1)
}
const removeBuild = (index: number) => {
  if (dangerMode.value || confirm(`Delete build "${build.value.name}" ?`)) {
    data.value.splice(index, 1)
    if (dataIndex.value >= data.value.length) {
      dataIndex.value--
    }
  }
}
const copyBuild = () => {
  data.value.push(JSON.parse(JSON.stringify(data.value[dataIndex.value])))
}
const swapBuilds = (to: number, from: number) => {
  if (to < 0 || from < 0) return
  const item = data.value[from]
  data.value[from] = data.value[to]
  data.value[to] = item
  selectBuild(to)
}
const selectBuild = (index: number) => {
  dataIndex.value = index
  selectArchetype(build.value.t1Archetype || 'Exemplar')
}

const exportData = () => {
  const jsonString = JSON.stringify(data.value, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = 'builds.json'
  link.click()

  URL.revokeObjectURL(url)
  link.remove()
}
const importData = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) {
    console.warn('No file selected')
    return
  }

  const file = input.files[0]
  const reader = new FileReader()

  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target?.result as string)
      data.value.push(...json)
    } catch (error) {
      console.error('Error parsing JSON file', error)
    }
  };

  reader.readAsText(file)
}

// Mount
const loadData = () => {
  const obj = JSON.parse(localStorage.getItem('rogue-trader-data') || '{}')
  data.value = obj.data || []
  selectedArchetype.value = obj.selectedArchetype || undefined
  selectedTab.value = obj.selectedTab || undefined
  rankIndex.value = obj.rankIndex || 0
  featureIndex.value = obj.featureIndex || 0
  dataIndex.value = obj.dataIndex || 0
}
const saveData = () => {
  localStorage.setItem('rogue-trader-data', JSON.stringify({
    data: data.value,
    selectedArchetype: selectedArchetype.value,
    selectedTab: selectedTab.value,
    rankIndex: rankIndex.value,
    featureIndex: featureIndex.value,
    dataIndex: dataIndex.value
  }))
}
onMounted(() => {
  loadData()
  window.addEventListener('beforeunload', saveData)
})
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', saveData)
  saveData()
})
</script>

<style lang="scss">
@use '@css/color.scss';
@use '@css/borders.scss';

#rogue-trader-builder {
  user-select: none;
  margin: 10px;

  .drag-drop-item {
    padding: 0 10px;
    cursor: grab;
    min-height: 25px;
  }

  .archetype-selector>div {
    height: 30px;
    padding: 0px 10px;
    cursor: pointer;
    min-width: 17ch;
  }

  .archetype {
    &-group {
      justify-content: space-between;
    }

    td {
      padding: 0 10px;
    }

    &-feature {
      min-width: 200px;

      &:not(.disabled) {
        cursor: pointer;

        &:hover {
          background-color: color.$color-border;
        }
      }


      &.ability {
        color: color.$color-orange;
      }

      &.common {
        color: color.$color-magenta;
      }

      &.characteristic {
        color: color.$color-red;
      }

      &.skill {
        color: color.$color-green;
      }

      &.talent {
        color: color.$color-blue;
      }
    }
  }

  .items {
    width: calc(50vw - 40px);
  }

  .tabs {
    .tab {
      padding: 3px 10px;
      cursor: pointer;
    }
  }

  .search-list {
    max-height: 75vh;
    overflow-y: scroll;
  }

  .active {
    background-color: color.$color-border;
  }

  .wide-flex {
    flex-wrap: wrap;
    row-gap: 10px;
    max-width: 1400px;
  }
}
</style>