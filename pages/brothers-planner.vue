<template>
  <div id="brothers-planner" class="fc1" style="margin:1ch">
    <div class="fr jc ac">
      <button @click="saveData">Save</button>
      <label>Attributes on level up: </label>
      <input class="number-short" type="number" v-model="attrPerLvl">
    </div>
    <div class="fr jc">
      <div class="fc">
        <div class="brother-class fr ac" v-for="(item, index) in classesExt" :key="index">
          <button @click="removeClass(index)">x</button>
          <input title="Position in array" class="number-short dim" type="number" :value="index"
            @input="moveClass(index, +($event.target as HTMLInputElement).value)" />
          <input class="name" type="text" :value="item.data.name"
            @input="changeClassName(item.data, ($event.target as HTMLInputElement).value)" />
          <div class="nowrap" style="margin-left:5px;">
            <span :class="[classesExt[index].recruited >= item.data.needed ? 'good' : 'neg']">
              {{ classesExt[index].recruited }}
            </span>
            /
          </div>
          <input class="number-short" type="number" v-model="item.data.needed" />
          <template v-for="key of attributeKeys" :key="key">
            <img :src="attributeIcons[key]" class="icon" />
            <input class="number-long" type="number" v-model="item.data.attr[key]" />
          </template>
          <input class="dim" type="text" v-model="item.data.link" />
          <button class="paste" @click="pasteClassLink(item.data)">Paste</button>
          <a :href="item.data.link || 'https://tumult.cc/bb-calc.html'" target="_blank">
            <button>Open</button>
          </a>
          <template v-for="i in classesExt[index].perks" :key="i">
            <img :src="perks[i].image" class="perk-icon" />
          </template>
        </div>
        <div class="fr ac">
          <button @click.prevent="addClass">+</button>
        </div>
      </div>
    </div>
    <div class="fr jc" style="gap: 10px; flex-wrap: wrap;">
      <div v-for="(item, index) in dataExt" :key="index" class="brother bs fc">
        <div class="fr ac">
          <input title="Position in array" class="number-short dim" type="number" :value="index"
            @input="moveBrother(index, +($event.target as HTMLInputElement).value)" />
          <input title="Brother name" class="name" type="text" v-model="item.data.name" />
          <button class="delete" @click="removeBrother(index)">x</button>
        </div>
        <div v-for="key of attributeKeys" :key="key" class="fr ac">
          <img :src="attributeIcons[key]" class="icon" />
          <input class="number-long" type="number" v-model="item.data.attr[key]" />
          <div class="talent" @click="cycleTalent(item.data, key)">
            <span :class="{ active: item.data.talents[key] && item.data.talents[key] >= 1 }">&#9733;</span>
            <span :class="{ active: item.data.talents[key] && item.data.talents[key] >= 2 }">&#9733;</span>
            <span :class="{ active: item.data.talents[key] && item.data.talents[key] >= 3 }">&#9733;</span>
          </div>
          <template v-if="dataExt[index].classObject">
            <span class="target dim"> {{ dataExt[index].classObject.attr[key] }}</span>
            <template v-if="dataExt[index].lvlupsNeeded[key]">
              [
              <span class="lvlups" :class="{ neg: dataExt[index].lvlupsNeeded[key] > 11 - item.data.level }">
                {{ dataExt[index].lvlupsNeeded[key] }}
              </span>
              ]
            </template>
          </template>
        </div>
        <div class="fr ac">
          <img src="https://static.wikia.nocookie.net/battlebrothers/images/3/3d/Level.png" class="icon" />
          <input class="number-short" type="number" v-model="item.data.level" />
          <div class="total dim">
            <span class="total-lvlups" :class="[item.totalLvlups > (11 - item.data.level) * attrPerLvl ? 'neg' : 'good']">
              {{ item.totalLvlups }}
            </span>
            <span class="neg" v-if="item.overflow"> + {{ item.overflow }}</span>
            / {{ (11 - item.data.level) * attrPerLvl }}
          </div>
        </div>
        <div class="fr ac">
          <select class="brother-class" v-model="item.data.className">
            <template v-for="(option) of classes" :key="`${index}-${option.name}`">
              <option v-if="option.name" :value="option.name">
                {{ option.name }}
              </option>
            </template>
          </select>
          <button class="unclass" @click="item.data.className = undefined">
            x
          </button>
        </div>
        <div class="perks fr0 jc">
          <template v-for="i in item.activePerks" :key="i">
            <img :src="perks[i].image" class="perk-icon" />
          </template>
        </div>
      </div>
      <div class="fr ac jc bs" style="width: 219px; height: 416px; box-sizing: border-box;">
        <button @click.prevent="addBrother">+</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  tiers,
  perks,
  attributeIcons,
  brotherClassDefault,
  brotherDefault,
  attributeMins,
} from '~/lib/brothersData'
import type {
  Attributes,
  Brother,
  BrotherExtended,
  BrotherClass,
  BrotherClassExtended,
} from '~/types/brothersTypes'

useHead({
  title: 'Battle Brothers Planner',
  meta: [{
    name: 'description', content: 'Battle Brothers Planner'
  }]
})

// Var
const attributeKeys = Object.keys(attributeIcons) as Array<keyof Attributes>
let changeTimer: number | undefined = undefined

// Func
const getPerksFromLink = (link: string | undefined) => {
  const perks = []
  const blocks = link?.split('?')[1]?.split('&')
  if (blocks) {
    for (const block of blocks) {
      const [tier, index] = block.split('-')
      perks.push(tiers[+tier - 1] + (+index - 1))
    }
  }
  return perks
}

// Ref
const classes = ref<BrotherClass[]>([])
const data = ref<Brother[]>([])
const attrPerLvl = ref(3)

// Computed
const classesExt = computed<BrotherClassExtended[]>(() => classes.value.map(x => {
  const ext: BrotherClassExtended = { data: x, recruited: 0, perks: [] }
  ext.recruited = data.value.filter(y => y.className === x.name).length
  ext.perks = getPerksFromLink(x.link)
  return ext
}))

const dataExt = computed<BrotherExtended[]>(() => data.value.map(x => {
  const ext: BrotherExtended = { data: x, activePerks: [], lvlupsNeeded: {}, totalLvlups: 0, overflow: 0 }

  if (x.className) {
    const brotherClass = classes.value.find(y => y.name === x.className)
    if (brotherClass) {
      ext.classObject = brotherClass
      ext.activePerks = getPerksFromLink(brotherClass.link)
      let total = 0
      let overflow = 0
      let key: keyof Attributes
      for (key in attributeMins) {
        if (!brotherClass.attr[key]) continue
        const broAttr = x.attr[key] || 0
        const classAttr = brotherClass.attr[key] || 0
        if (broAttr >= classAttr) continue
        const lvlupsNeeded = Math.ceil(
          (classAttr - broAttr) / ((attributeMins[key] || 0) + 1 + 0.5 * (x.talents[key] || 0))
        )
        ext.lvlupsNeeded[key] = lvlupsNeeded
        const lvlupsAvailable = 11 - x.level
        if (lvlupsNeeded > lvlupsAvailable) {
          total += lvlupsAvailable
          overflow += lvlupsNeeded - lvlupsAvailable
        } else {
          total += lvlupsNeeded
        }
      }
      ext.totalLvlups = total
      ext.overflow = overflow
    }
  }
  return ext
}))

// Method
const addClass = () => { classes.value.push(cloneJSON(brotherClassDefault)) }
const removeClass = (index: number) => { classes.value.splice(index, 1) }
const moveClass = (index: number, newIndex: number) => {
  clearTimeout(changeTimer)
  changeTimer = window.setTimeout(() => {
    const item = classes.value[index]
    removeClass(index)
    classes.value.splice(newIndex, 0, item)
  }, 500)
}
const changeClassName = (item: BrotherClass, name: string) => {
  for (const b of data.value) {
    if (b.className === item.name) b.className = name
  }
  item.name = name
}
const pasteClassLink = (item: BrotherClass) => {
  navigator.clipboard.readText().then((value) => {
    item.link = value
  })
}

const addBrother = () => { data.value.push(cloneJSON(brotherDefault)) }
const removeBrother = (index: number) => { data.value.splice(index, 1) }
const moveBrother = (index: number, newIndex: number) => {
  clearTimeout(changeTimer)
  changeTimer = window.setTimeout(() => {
    const item = data.value[index]
    removeBrother(index)
    data.value.splice(newIndex, 0, item)
  }, 500)
}
const cycleTalent = (item: Brother, key: keyof Attributes) => {
  item.talents[key] = ((item.talents[key] || 0) + 1) % 4
}

// Mount
const loadData = () => {
  const obj = JSON.parse(localStorage.getItem('brothers-data') || '{}')
  data.value = obj.data || []
  classes.value = obj.classes || []
  attrPerLvl.value = obj.attrPerLvl || 3
}
const saveData = () => {
  localStorage.setItem('brothers-data', JSON.stringify({
    data: data.value,
    classes: classes.value,
    attrPerLvl: attrPerLvl.value,
  }))
}

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

#brothers-planner {
  .name {
    width: 14ch;
  }

  .icon {
    height: 24px;
    vertical-align: bottom;
  }

  .perk-icon {
    width: 25px;
  }

  .good {
    color: color.$color-green
  }

  .brother-class {
    margin-right: auto;
  }

  .brother {
    padding: 10px;

    .talent {
      color: color.$color-border;
      cursor: pointer;
      user-select: none;

      span {
        display: inline-block;
      }

      .active {
        color: color.$color-yellow;
      }
    }

    .target {
      margin-left: auto;
    }

    .total {
      width: 100%;
      text-align: center;

      &-lvlups {
        display: inline-block;
        text-align: right;
        width: 2ch;
      }
    }

    &-class {
      width: 100%;
    }

    .perks {
      flex-wrap: wrap;
      width: 0;
      min-width: 100%;

      .perk-icon {
        width: 32px;
      }
    }
  }
}
</style>