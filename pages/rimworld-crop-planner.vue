<template>
  <div class="container fr1" :class="{ 'hightlight-tips': settings.hightlightTips }">
    <div class="left">
      <div class="filter" :title="descriptions.filter">
        <div v-for="(filter, index) of pawnFilterDiplay" @click="pawnFilterData[index] = !pawnFilterData[index]"
          :class="{ disabled: filter.disabled }" :key="index">
          {{ filter.name }}
        </div>
      </div>
    </div>
    <div class="middle fc">
      <div class="page-header fc">
        <div class="title">Rimworld Crop Planner / Calculator</div>
        <div class="gray-text"></div>
      </div>
      <div class="settings fr">
        <div class="buttons fc">
          <div>Filter</div>
          <button @click="showHideAllFilter">Toggle all</button>
          <button @click="resetFilter">Reset</button>
        </div>
        <div class="buttons fc">
          <div :title="descriptions.data">Data</div>
          <button @click="saveToStorage">Save</button>
          <button @click="loadFromStorage">Load</button>
          <button @click="reset" :title="descriptions.reset">Reset</button>
        </div>
        <div class="inputs fc">
          <div class="fr1">
            <label>Hightlight info</label>
            <AppCheckbox :checked="settings.hightlightTips"
              @click="settings.hightlightTips = !settings.hightlightTips" />
          </div>
        </div>
        <div class="inputs fc">
          <div class="fr" :title="descriptions.yield">
            <label>Yield multiplier</label>
            <input class="number-longer" type="number" v-model="settings.yieldMultiplier" />
          </div>
          <div class="fr">
            <label>Growing season</label>
            <input class="number-longer" type="number" v-model="settings.growingSeason" />
          </div>
          <div class="fr" :title="descriptions.stockpile">
            <label>Stockpile duration</label>
            <input class="number-longer" type="number" v-model="settings.offSeason" />
          </div>
        </div>
        <div class="drugs-soil fc">
          <div class="drug fr" v-for="drug in drugs" :key="drug.name">
            <img class="icon" :src="cropImages[drug.crop]" />
            <select v-model="settings.drugSoil[drug.name]">
              <option v-for="option of soilNames" :value="option" :key="option">
                {{ option }}
              </option>
            </select>
            <select v-model="settings.drugMode[drug.name]">
              <option :value="Mode.Season">{{ Mode.Season }}</option>
              <option :value="Mode.Greenhouse">{{ Mode.Greenhouse }}</option>
            </select>
          </div>
        </div>
      </div>
      <table class="records">
        <thead>
          <tr class="record">
            <td></td>
            <td :title="descriptions.index">#</td>
            <td>Qty</td>
            <td :title="descriptions.name">Name</td>
            <td :title="descriptions.pawn">Pawn</td>
            <td>Recipe</td>
            <td :title="descriptions.meat"><img class="icon" :src="images.meat" /></td>
            <td :title="descriptions.meatConsumption">/day</td>
            <td></td>
            <td>Crop</td>
            <td>Soil</td>
            <td :title="descriptions.modes">Mode</td>
            <td><img class="icon" :src="images.zone" /></td>
            <!-- <td><img class="icon" :src="images.harvest" /></td> -->
            <td><img class="icon" :src="images.shelf" /></td>
            <td v-for="d in drugs " :key="d.name">
              <img class="icon" :src="d.image" :title="descriptions[d.name]" />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr class="record" v-for="(r, index) in records" :key="index"
            :class="{ 'meat-disabled': !recExt[index].showMeat, 'veg-disabled': recExt[index].disableVeg }">
            <td><button class="delete" @click="removeItem(index)" :disabled="records.length === 1">X</button></td>
            <td><input class="index number-short" type="number" :value="index" @input="moveItem(index, $event)" /></td>
            <td><input class="number-long" type="number" v-model="r.amount" /></td>
            <td><input class="name" type="text" v-model="r.name" /></td>
            <td><select class="pawn" v-model="r.pawn">
                <option v-for="option of filteredPawns " :value="option" :key="option">
                  {{ option }}
                </option>
              </select></td>
            <td><select class="recipe" v-model="r.recipe">
                <option v-for="option of recipes" :value="option.name" :key="option.name">
                  {{ option.name }}
                </option>
              </select></td>
            <td>
              <AppCheckbox class="meat-check" :checked="r.useMeat" @click="r.useMeat = !r.useMeat"
                :disabled="recExt[index].disableMeat" />
            </td>
            <td>
              <div class="meat neg number-longer">{{ recExt[index].meat }}</div>
            </td>
            <td><img class="icon" :src="cropImages[r.crop]" :class="{ 'disabled': recExt[index].disableVeg }" /></td>
            <td><select class="crop" v-model="r.crop" :disabled="recExt[index].disableVeg">
                <option v-for="option of filteredCrops " :value="option.name" :key="option.name">
                  {{ option.name }}
                </option>
              </select></td>
            <td><select class="soil" v-model="r.soil" :disabled="recExt[index].disableVeg">
                <option v-for="option of soil" :value="option.name" :key="option.name">
                  {{ option.name }}
                </option>
              </select></td>
            <td><select class="mode" v-model="r.mode" :class="[r.mode]">
                <option v-for="option of Mode " :value="option" :key="option" :class="[option]">
                  {{ option }}
                </option>
              </select></td>
            <td>
              <div class="veg number-long">{{ recExt[index].plots[0] }}</div>
            </td>
            <!-- <td>
              <div class="veg">{{ recExt[index].plots[1] }}</div>
            </td> -->
            <td>
              <div class="shelf number-short">{{ recExt[index].shelves }}</div>
            </td>
            <template v-if="recExt[index].pawn.canTakeDrugs">
              <td v-for=" d  in  drugs " :key="d.name">
                <input class="number-long" type="number" v-model="r.drugs[d.name]" />
              </td>
            </template>
            <template v-else-if="recExt[index].production">
              <td colspan="3">
                <div class="prod fr1">
                  <img class="icon" :src="images[recExt[index].pawn.production?.name || '']" />
                  <div>{{ recExt[index].production }}</div>
                </div>
              </td>
            </template>
          </tr>
          <tr class="record">
            <td><button class="delete" @click="addItem">+</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="result fc1">
      <div class="card production fc1">
        <div class="row" :title="descriptions.meatConsumption">
          <img class="icon" :src="images.meat" />
          <div class="neg">{{ result.meat }}</div>
        </div>
        <div class="row" :title="descriptions.animalProduction">
          <img class="icon" :src="images.nut" />
          <div>{{ result.production.nut }}</div>
        </div>
        <div class="row">
          <img class="icon" :src="images.wool" />
          <div>{{ result.production.wool }}</div>
        </div>
        <div class="row">
          <img class="icon" :src="images.chemfuel" />
          <div>{{ result.production.chemfuel }}</div>
        </div>
        <div class="row">
          <img class="icon" :src="images.barrel" />
          <div>{{ result.Barrels }}</div>
        </div>
      </div>
      <template v-for="mode in Mode" :key="mode">
        <RimworldResult :mode="mode" :result="result[mode]" :drug-result="result.drugs[mode]" />
      </template>
      <div class="card fc1">
        <div class="header row">
          <div class="mode">Grazing</div>
          <div class="plot"><img class="icon" :src="images.zone" /></div>
          <div class="harvest" :title="descriptions.harvest"><img class="icon" :src="images.harvest" /></div>
        </div>
        <template v-for="(rc, crop) of result[Mode.Season]" :key="crop">
          <template v-for="(rs, soil) of rc" :key="soil">
            <div class="row" v-if="rs.grazingPlots?.[0]">
              <img class="icon" :src="cropImages[crop]" />
              <div class="soil">{{ soil }}</div>
              <div class="plot">{{ rs.grazingPlots[0] }}</div>
              <div class="harvest">{{ rs.grazingPlots[1] }}</div>
            </div>
          </template>
        </template>
      </div>
      <div class="fc" style="align-items: center;">
        <div>Last save</div>
        <div class="gray-text">{{ lastSaveTime }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  soil,
  drugs,
  crops,
  recordDefault,
  pawns,
  recipes,
  images,
  nutritionMult,
  filterDefault,
  barrelMult
} from '~/lib/rimworldData'
import type { RecordBase, Settings } from '~/types/rimworldTypes'
import { Mode } from '~/types/rimworldTypes'
import {
  pawnDict,
  farmingPlotsNeeded,
  recipeDict,
  cropDict,
  soilDict,
  grazingPlotsNeeded,
  filteredCrops,
  cropImages,
  settingsDefault,
  descriptions,
} from '~/lib/rimworldLib'

useHead({
  title: 'Rimworld Crop Planner / Calculator',
  meta: [{
    name: 'description', content: 'Rimworld Crop Planner / Calculator'
  }]
})

let changeTimer = undefined as number | undefined
const lastSaveTime = ref('Never')

const settings = ref<Settings>(settingsDefault)
const pawnFilterData = ref<(Boolean | null)[]>(filterDefault)
const pawnFilterDiplay = computed(() => pawns.map((x, i) => ({
  name: x.name,
  disabled: pawnFilterData.value?.[i] || false
})))
const records = ref<RecordBase[]>([cloneJSON(recordDefault)])

const recExt = computed(() => records.value.map(r => {
  const pawn = pawnDict[r.pawn]
  const recipe = recipeDict[r.recipe]
  const disableMeat = recipe?.input.nut ? false : true
  const crop = cropDict[r.crop]
  const soil = soilDict[r.soil]
  let plots: number[]
  if (r.recipe !== 'Grazing') {
    const vegMult = (recipe.input.veg || (disableMeat ? 0 : recipe.input.nut) || 0) / recipe.output.nut;
    const consumption = pawn.consumption * r.amount * vegMult * nutritionMult
    plots = farmingPlotsNeeded(consumption, crop, soil, r.mode, settings.value)

  } else {
    plots = grazingPlotsNeeded(pawn.consumption * r.amount, crop, soil, r.mode, settings.value)
  }
  let meat = 0
  if (recipe.input.meat || r.useMeat) {
    let meatMult = (recipe.input.meat || recipe.input.nut || 0) / recipe.output.nut
    if (r.mode === Mode.Stockpile) meatMult *= settings.value.offSeason / 60
    meat = roundToCent(r.amount * meatMult * pawn.consumption)
  }
  const production = pawn.production && !(r.mode === Mode.Stockpile) ? roundToCent(pawn.production.amount * r.amount) : undefined
  return {
    disableMeat,
    disableVeg: !recipe.input.veg && r.useMeat,
    showMeat: recipe.input.meat || r.useMeat,
    plots,
    pawn,
    meat: meat || undefined,
    production,
    shelves: Math.ceil(plots[2]) || undefined,
  }
}))

const result = computed(() => {
  const result: { [k: string]: any } = { meat: 0, production: { nut: 0, wool: 0, chemfuel: 0 } }
  // Init
  for (const m in Mode) result[m] = {}
  for (const r of records.value) {
    if (!result[r.mode][r.crop]) result[r.mode][r.crop] = {}
    if (!result[r.mode][r.crop][r.soil]) result[r.mode][r.crop][r.soil] = { farmingPlots: [0, 0, 0], grazingPlots: [0, 0] }
  }
  for (const drug of drugs) result[drug.name] = 0
  // Calc
  for (const [i, r] of records.value.entries()) {
    const re = recExt.value[i]
    // Crop
    if (!re.disableVeg) {
      if (r.recipe !== 'Grazing') {
        const plots = result[r.mode][r.crop][r.soil].farmingPlots
        plots[0] += re.plots[0]
        plots[1] = re.plots[1]
        plots[2] += re.plots[2]
      } else {
        const plots = result[r.mode][r.crop][r.soil].grazingPlots
        plots[0] += re.plots[0]
        plots[1] = re.plots[1]
      }
    }
    // Meat
    if (re.showMeat) result.meat += re.meat || 0
    // Drugs
    if (re.pawn.canTakeDrugs)
      for (const drug of drugs) result[drug.name] += r.amount * (r.drugs[drug.name] || 0)
    if (re.production && re.pawn.production) result.production[re.pawn.production?.name] += re.production
  }
  // Drug Crops
  result.drugs = { [Mode.Greenhouse]: {}, [Mode.Season]: {} }
  for (const drug of drugs) {
    if (!result[drug.name]) continue
    const crop = crops.find(x => x.name === drug.crop)
    const s = soil.find(x => x.name === settings.value.drugSoil[drug.name])
    for (const mode in Mode) {
      if (mode !== settings.value.drugMode[drug.name]) continue
      if (crop && s) {
        result.drugs[mode][crop.name] = {}
        result.drugs[mode][crop.name][s.name] = {
          plots: farmingPlotsNeeded(
            result[drug.name] / drug.eff,
            crop,
            s,
            mode,
            settings.value
          )
        }
      }
    }
  }
  if (result['Beer']) result['Barrels'] = Math.ceil(result['Beer'] * barrelMult)
  return result
})

const soilNames = soil.map(s => s.name)
const filteredPawns = computed(() => pawns.filter((v, i) => !pawnFilterData.value[i]).map(x => x.name))

const removeItem = (index: number) => { records.value.splice(index, 1) }
const addItem = () => { records.value.push(cloneJSON(recordDefault)) }
const moveItem = (index: number, event: Event) => {
  clearTimeout(changeTimer)
  changeTimer = window.setTimeout(() => {
    const newIndex = +((event.target as HTMLInputElement)?.value || 0)
    const item = records.value[index]
    removeItem(index)
    if (newIndex >= 0) {
      records.value.splice(newIndex, 0, item)
    } else {
      const len = records.value.length
      records.value.splice(len + newIndex + 1, 0, item)
    }
  }, 500)
}

const loadFromStorage = () => {
  const obj = JSON.parse(localStorage.getItem('rimworld-data') || '{}')
  if (obj.settings) settings.value = obj.settings
  if (obj.filter) pawnFilterData.value = obj.filter
  if (obj.data) records.value = obj.data
  if (obj.lastSaveTime) lastSaveTime.value = obj.lastSaveTime
}
const saveToStorage = () => {
  lastSaveTime.value = new Date().toLocaleString()
  localStorage.setItem('rimworld-data', JSON.stringify({
    settings: settings.value,
    filter: pawnFilterData.value,
    data: records.value,
    lastSaveTime: lastSaveTime.value,
  }))
}
const showHideAllFilter = () => {
  if (pawnFilterData.value.length === 0) {
    pawnFilterData.value = Array(pawns.length).fill(true);
  } else {
    pawnFilterData.value = [];
  }
}
const resetFilter = () => {
  pawnFilterData.value = [...filterDefault]
}
const reset = () => {
  settings.value = cloneJSON(settingsDefault)
  resetFilter()
  records.value = [cloneJSON(recordDefault)]
}

onMounted(() => {
  loadFromStorage()
  addEventListener('beforeunload', saveToStorage)
})
onBeforeUnmount(() => {
  removeEventListener('beforeunload', saveToStorage)
  saveToStorage()
})
</script>

<style lang="scss">
@import '@css/color.scss';
@import '@css/borders.scss';

.container {
  margin: 1ch;
  justify-content: space-evenly;
  // min-height: calc(100vh - 3ch);
}

.filter {
  @include border-basic;
  flex-shrink: 0;
  height: 0;
  min-height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
  padding: 0.5ch 1ch;
  user-select: none;

  &>div {
    cursor: pointer;
  }

  .disabled {
    text-decoration: line-through;
    color: $color-border;
  }
}

.middle {
  row-gap: 3ch;

  .page-header {
    align-items: center;

    .title {
      font-weight: bold;
      font-size: 20px;
      color: $color-blue;
    }
  }
}

.settings {
  column-gap: 10ch;
  justify-content: space-between;

  .buttons div {
    font-weight: bold;
    text-align: center;
  }

  .inputs div,
  .drugs-soil div {
    justify-content: space-between;
    align-items: center;
  }
}

.records {
  border-spacing: 3px;

  thead .record {
    text-align: center;
  }

  .record {
    .delete {
      width: 25px;
    }

    .name {
      width: 11ch;
    }

    .index {
      color: $color-border;
    }

    .pawn {
      width: 15ch;
    }

    .icon.disabled {
      filter: grayscale(100%);
    }

    .meat-check {
      height: 25px;
      padding: 0 0.5ch;
    }

    .meat,
    .veg,
    .shelf {
      text-align: center;
    }

    .prod {
      justify-content: center;
      align-items: center;
    }
  }

  .veg-disabled div.veg,
  .meat-disabled div.meat {
    color: $color-background;
  }
}

.result {
  min-width: 29.5ch;

  .card {
    @include border-basic;
    padding: 1ch;

    .header {
      text-align: center;

      .mode {
        flex-grow: 1
      }
    }

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &>*:not(:last-child) {
        margin-right: 0.5ch;
      }
    }

    .soil {
      flex-grow: 1;
      color: $color-text-gray;
      width: 11ch;
    }

    .plot {
      width: 4ch;
      text-align: center;
    }

    .harvest,
    .shelf {
      color: $color-text-gray;
      width: 3ch;
      text-align: center;
    }

    .separator {
      margin-top: auto;
      margin-bottom: 0;
      border-bottom: 1px dashed $color-border;
    }
  }

  .production {
    align-self: center;
    min-width: 8ch;
  }
}

.Greenhouse {
  color: $color-green;
}

.Stockpile {
  color: $color-orange;
}

.icon {
  height: 25px;
  vertical-align: bottom;
}

.gray-text {
  color: $color-text-gray;
}

.number-short {
  width: 3ch;
  text-align: center;
}

.number-long {
  width: 4ch;
  text-align: center;
}

.number-longer {
  width: 5ch;
  text-align: center;
}

.hightlight-tips *[title] {
  box-shadow: 0 0 5px 2px $color-orange;
}
</style>