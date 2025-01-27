<template>
  <div id="hex-tile-sandbox" class="fc1">
    <div class="controls fr1">
      <button @click="saveData()">Save</button>
      <button @click="pasteData()">Paste</button>
      <button @click="copyToClipboard()">Copy</button>
      <button @click="hightlight()">Hightlight</button>
      <button @click="removeHighlight()">HL off</button>
      <label>Radius:</label>
      <input class="number-short" type="number" min="1" max="5" :value="radius"
        @input="radius = +($event.target as HTMLInputElement).value" />
      <label>Room dimension:</label>
      <input class="number-long" type="number" min="1" max="5" :value="dim"
        @input="dim = +($event.target as HTMLInputElement).value" />
      <label>Dimensions: {{ (dim - 1) * (radius * 2 - 1) + 1 }}</label>
      <label>- Total: {{ total }}</label>
    </div>
    <div class="display fr1">
      <div class="rooms fc">
        <template v-for="(room, n) in rooms" :key="n">
          <div v-if="room !== undefined" class="room fr" :id="`room-${n}`">
            <input class="name" type="text" :value="room"
              @input="rooms[n] = ($event.target as HTMLInputElement).value" />
            <button class="delete" @click="deleteRoom(n)">X</button>
          </div>
        </template>
        <button class="add" @click="addRoom()">+</button>
      </div>
      <div class="hex-field">
        <div class="hex-row" v-for="(arr, n) in matrix" :key="n">
          <div v-for="id in arr" :key="id" draggable="true" :id="`cell-${id}`"
            @dragstart="($event.dataTransfer as DataTransfer).setData('text/plain', `${id}`)"
            @dragover="$event.preventDefault()" @drop="handleDrop" @click="handleCellClick" class="hex-cell bs">
            {{ rooms[id] || '' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const radius = ref(4)
const dim = ref(13)
const rooms = ref<(string | undefined)[]>(['Tile1', 'Tile2', 'Tile3'])

const getHexNum = (x: number) => 3 * x * (x - 1) + 1
const handleDrop = (ev: DragEvent) => {
  const to = +((ev.target as HTMLHtmlElement)?.id?.substring(5) || -1)
  const from = +(ev.dataTransfer?.getData('text') || -1)
  if (to < 0 || from < 0) return
  const item = rooms.value[from]
  rooms.value[from] = rooms.value[to]
  rooms.value[to] = item
  cleanRooms()
  document.getElementById(`cell-${to}`)?.classList.remove('highlight')
  document.getElementById(`cell-${from}`)?.classList.remove('highlight')
}
const cleanRooms = () => {
  let i = rooms.value.length
  for (i; i >= 0; i--) {
    if (rooms.value[i] !== undefined) break
  }
  rooms.value.splice(i + 1)
}
const deleteRoom = (index: number) => {
  rooms.value[index] = undefined
  cleanRooms()
}
const addRoom = () => {
  let index = rooms.value.findIndex((x) => x === undefined)
  if (index === -1) index = rooms.value.length
  rooms.value[index] = ''
}

const matrix = computed<number[][]>(() => {
  const result: number[][] = []
  const n = radius.value
  const c = n - 1
  for (let i = 0, lim = 2 * n - 1; i < lim; i++) {
    result[i] = []
  }
  result[c][c] = 0
  for (let i = 1; i < n; i++) {
    const last = getHexNum(i)
    const current = getHexNum(i + 1)
    const rowsCount = 2 * i - 1
    for (let j = 0; j <= i; j++) {
      result[c - i][n - i - 1 + j] = last + j
      result[c + i][n - i - 1 + j] = current - i - 1 + j
    }
    for (let j = 0; j < rowsCount; j++) {
      result[c - i + 1 + j][c - i] = last + i + j * 2 + 1
      result[c - i + 1 + j][c + i] = last + i + j * 2 + 2
    }
  }
  for (let i = 0, lim = 2 * n - 1; i < lim; i++) {
    result[i] = result[i].filter((x) => !isNaN(x))
  }
  return result
})
const total = computed(() => getHexNum(radius.value))

const loadData = () => {
  const data = JSON.parse(localStorage.getItem('hex-data') || '{}')
  rooms.value = data.rooms.map((x: string) => (x === null ? undefined : x)) || []
  radius.value = data.radius
}
const saveData = () => {
  localStorage.setItem('hex-data', JSON.stringify({ rooms: rooms.value, radius: radius.value }))
}
const pasteData = () => {
  navigator.clipboard.readText().then((value) => {
    const data = JSON.parse(value || '{}')
    rooms.value = data.rooms.map((x: string) => (x === null ? undefined : x)) || []
  })
}
const copyToClipboard = () => {
  navigator.clipboard.writeText(JSON.stringify({ rooms: rooms.value }))
}
const hightlight = () => {
  document.querySelectorAll('.hex-cell').forEach(x => { x.classList.add('highlight') })
}
const removeHighlight = () => {
  document.querySelectorAll('.hex-cell').forEach(x => { x.classList.remove('highlight') })
}
const handleCellClick = (ev: MouseEvent) => {
  const t = (ev.target as HTMLHtmlElement)
  if (!t) return
  if (ev.ctrlKey) {
    t.classList.remove('highlight')
  } else {
    const id = +t.id.substring(5)
    document.querySelector<HTMLInputElement>(`#room-${id} input`)?.focus()
  }
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

#hex-tile-sandbox {
  align-items: center;
  margin: 10px;

  .controls {
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    label {
      white-space: nowrap;
    }
  }

  .display {
    flex-grow: 1;

    .hex-field {
      align-self: center
    }
  }

  .rooms {
    height: 90vh;
    overflow-y: scroll;
    padding-right: 5px;
  }

  .hex-field {
    grid-area: field;
    display: flex;
    flex-direction: column;

    .hex-row {
      display: flex;
      justify-content: center;

      .hex-cell {
        display: flex;
        width: 12ch;
        height: 9ch;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0 0.5ch;
        word-spacing: 12ch;
        cursor: grab;

        &.highlight {
          background-color: color.$color-border;
          border-color: color.$color-text;
        }
      }
    }
  }
}
</style>