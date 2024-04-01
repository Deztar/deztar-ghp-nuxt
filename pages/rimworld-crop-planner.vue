<template>
  <div class="container">
    <div class="left">
      <div class="filter">
        <div v-for="(filter, index) of pawnFilterDiplay" @click="pawnFilterData[index] = !pawnFilterData[index]"
          :class="{ disabled: filter.disabled }" :key="index">
          {{ filter.name }}
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="header">
        <div class="title">Rimworld Crop Planner</div>
        <div class="gray-text">Hover over control elements for description</div>
      </div>
      <div class="settings">
        <div class="buttons">
          <button>Save</button>
          <button @click="loadFromStorage">Load</button>
          <button>Reset</button>
        </div>
        <div class="inputs">
          <div>
            <label>Yield multiplier</label>
            <input class="number-longer" type="number" v-model="settings.yieldMultiplier" />
          </div>
          <div>
            <label>Growing season</label>
            <input class="number-longer" type="number" v-model="settings.growingSeason" />
          </div>
          <div>
            <label>Stockpile duration</label>
            <input class="number-longer" type="number" v-model="settings.offSeason" />
          </div>
        </div>
        <div class="drugs-soil">
          <div class="drug" v-for="drug in drugs" :key="drug.name">
            <img class="icon" :src="cropImages[drug.crop]" />
            <select v-model="settings.drugSoil[drug.name]">
              <option v-for="option of soilNames" :value="option" :key="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="records">
        <div class="record" v-for="(r, index) in  records " :key="index"
          :class="{ 'meat-disabled': recordsExtended[index].meat, 'veg-disabled': recordsExtended[index].veg }">
          <button class="delete" @click="removeItem(index)">X</button>
          <input class="index number-short" type="number" :value="index" @input="moveItem(index, $event)" />
          <input class="number-short" type="number" v-model="r.amount" />
          <input class="name" type="text" v-model="r.name" />
          <select class="pawn" v-model="r.pawn">
            <option v-for=" option  of  filteredPawns " :value="option" :key="option">
              {{ option }}
            </option>
          </select>
          <select class="recipe" v-model="r.recipe">
            <option v-for=" option  of  recipes " :value="option.name" :key="option.name">
              {{ option.name }}
            </option>
          </select>
          <img class="icon" :src="images.meat" />
          <AppCheckbox class="meat" :checked="r.useMeat" @click="r.useMeat = !r.useMeat"
            :disabled="recordsExtended[index].meat" />
          <img class="icon" :src="cropImages[r.crop]" :class="{ 'disabled': recordsExtended[index].veg }" />
          <select class="crop" v-model="r.crop" :disabled="recordsExtended[index].veg">
            <option v-for=" option  of  crops " :value="option.name" :key="option.name">
              {{ option.name }}
            </option>
          </select>
          <select class="soil" v-model="r.soil" :disabled="recordsExtended[index].veg">
            <option v-for=" option  of  soil " :value="option.name" :key="option.name">
              {{ option.name }}
            </option>
          </select>
          <select class="mode" v-model="r.mode" :class="[r.mode]">
            <option v-for=" option  of  Mode " :value="option" :key="option" :class="[option]">
              {{ option }}
            </option>
          </select>
          <img class="icon veg" :src="images.zone" />
          <div class="veg">{{ recordsExtended[index].plots[0] }}</div>
          <img class="icon veg" :src="images.harvest" />
          <div class="veg">{{ recordsExtended[index].plots[1] }}</div>
          <template v-if="r.pawn === 'Human'">
            <template v-for=" d  in  drugs " :key="d.name">
              <img class="icon" :src="d.image" />
              <input class="number-long" type="number" v-model="r.drugs[d.name]" />
            </template>
          </template>
        </div>
        <div class="record">
          <button class="delete" @click="addItem">+</button>
        </div>
      </div>
    </div>
    <div>Result</div>
  </div>
</template>

<script setup lang="ts">
import { soil, drugs, crops, recordDefault, pawns, recipes, images, nutritionMult, filterDefault } from '~/lib/rimworldData'
import { cloneJSON } from '~/lib/helpers'
import type { RecordBase, Settings } from '~/types/rimworldTypes'
import { Mode } from '~/types/rimworldTypes'
import { pawnDict, farmingPlotsNeeded, recipeDict, cropDict, soilDict, grazingPlotsNeeded } from '~/lib/rimworldLib'

let changeTimer = undefined as number | undefined

const settings = ref<Settings>({
  growingSeason: 60,
  offSeason: 20,
  yieldMultiplier: 1,
  drugSoil: {
    Beer: 'Regular',
    Tea: 'Regular',
    Joint: 'Regular',
  }
})
const pawnFilterData = ref<(Boolean | null)[]>(filterDefault)
const pawnFilterDiplay = computed(() => pawns.map((x, i) => ({
  name: x.name,
  disabled: pawnFilterData.value?.[i] || false
})))
const records = ref<RecordBase[]>([])

const recordsExtended = computed(() => records.value.map(r => {
  const pawn = pawnDict[r.pawn]
  const recipe = recipeDict[r.recipe]
  const meat = recipe?.input.nut ? false : true
  const crop = cropDict[r.crop]
  const soil = soilDict[r.soil]
  let plots: number[]
  if (r.recipe === 'Grazing') {
    plots = grazingPlotsNeeded(pawn.consumption * r.amount, crop, soil, r.mode, settings.value)
  } else {
    const vegMult = (recipe.input.veg || (meat ? 0 : recipe.input.nut) || 0) / recipe.output.nut;
    const consumption = pawn.consumption * r.amount * vegMult * nutritionMult
    plots = farmingPlotsNeeded(consumption, crop, soil, r.mode, settings.value)
  }
  return {
    meat,
    veg: r.useMeat || (!recipe?.input.veg && !! !recipe?.input.nut),
    plots,
  }
}))

const soilNames = soil.map(s => s.name)
const cropImages: { [key: string]: string } = crops.reduce((p, c) => ({ ...p, [c.name]: c.image }), {})
const filteredPawns = pawns.map(p => p.name)

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
  if (obj.settings) {
    console.log('Detected settings')
    settings.value = obj.settings
  }
  if (obj.filter) {
    console.log('Detected filter')
    pawnFilterData.value = obj.filter
  }
  if (obj.data) {
    console.log('Detected records')
    records.value = obj.data
  }
}

onMounted(() => {
  loadFromStorage()
})
onBeforeUnmount(() => {
})
</script>

<style lang="scss">
@import '@css/color.scss';
@import '@css/borders.scss';

.container {
  margin: 1ch;
  display: flex;
  justify-content: space-evenly;
  column-gap: 1ch;
  min-height: calc(100vh - 3ch);
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
  display: flex;
  flex-direction: column;
  row-gap: 3ch;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 0.5ch;

    .title {
      font-weight: bold;
      font-size: 20px;
      color: $color-blue;
    }
  }
}

.settings {
  display: flex;
  column-gap: 10ch;
  justify-content: center;

  .buttons {
    display: flex;
    flex-direction: column;
    row-gap: 0.5ch;
  }

  .inputs,
  .drugs-soil {
    display: flex;
    flex-direction: column;
    row-gap: 0.5ch;

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 1ch;
    }
  }
}

.records {
  display: flex;
  flex-direction: column;
  row-gap: 0.5ch;

  .record {
    display: flex;
    align-items: center;
    column-gap: 0.5ch;

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

    .meat {
      align-self: stretch;
      padding: 0 0.5ch;
    }

    .veg {
      width: 3ch;
    }

    .Greenhouse {
      color: $color-green;
    }

    .Stockpile {
      color: $color-orange;
    }
  }

  .meat-disabled {
    .icon.meat {
      filter: grayscale(100%);
    }
  }

  .veg-disabled {
    .icon.veg {
      filter: grayscale(100%);
    }

    div.veg {
      color: $color-border;
    }
  }
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
</style>