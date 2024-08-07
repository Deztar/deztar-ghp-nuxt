import type { Crop, Soil, Settings, Recipe, Pawn } from "~/types/rimworldTypes"
import { Mode, ProduceType } from "~/types/rimworldTypes"
import { crops, defaultStackSize, pawns, realGrowthMult, recipes, soil } from "./rimworldData";
import { buildDictFromArray, roundToCent } from "./helpers";

export const pawnDict: Record<string, Pawn> = buildDictFromArray(pawns, 'name')
export const recipeDict: Record<string, Recipe> = buildDictFromArray(recipes, 'name')
export const cropDict: Record<string, Crop> = buildDictFromArray(crops, 'name')
export const soilDict: Record<string, Soil> = buildDictFromArray(soil, 'name')

export const filteredCrops: Crop[] = crops.filter(x => x.produce === ProduceType.Nutrition || x.name === 'Dandelion')

export const cropImages: { [key: string]: string } = crops.reduce((p, c) => ({ ...p, [c.name]: c.image }), {})

export const settingsDefault: Settings = {
  hightlightTips: false,
  growingSeason: 60,
  offSeason: 20,
  yieldMultiplier: 1,
  drugSoil: {
    Beer: 'Regular',
    Tea: 'Regular',
    Joint: 'Regular',
  },
  drugMode: {
    Beer: 'Season',
    Tea: 'Season',
    Joint: 'Season',
  }
}

export const farmingPlotsNeeded = (req: number, crop: Crop, soil: Soil, mode: string, settings: Settings) => {
  const season = mode === Mode.Greenhouse ? 60 : settings.growingSeason
  const growDays = crop.growDays * realGrowthMult / (1 + soil.fertility * crop.sensetivity)
  const consumeDays = mode === Mode.Stockpile ? settings.offSeason : 60
  const cropYield = (crop.yield || 1) * settings.yieldMultiplier
  let plots = 0
  const harvestCount = season / growDays
  let harvestInt = Math.floor(harvestCount)
  if (harvestInt === 0) harvestInt = 1
  if (season === 60) {
    plots = (consumeDays / 60) * growDays * req / cropYield
  } else {
    plots = consumeDays * req / harvestInt / cropYield
  }
  const shelves = roundToCent(plots * cropYield / (crop.stackSize || defaultStackSize) / 3)
  return [Math.ceil(plots), harvestInt, shelves]
}
export const grazingPlotsNeeded = (req: number, crop: Crop, soil: Soil, mode: string, settings: Settings) => {
  const season = mode === Mode.Greenhouse ? 60 : settings.growingSeason
  const growDays = crop.growDays * realGrowthMult / (1 + soil.fertility * crop.sensetivity)
  const plots = growDays * req / crop.nutrition
  const harvestCount = season / growDays
  let harvestInt = Math.floor(harvestCount)
  if (harvestInt === 0) harvestInt = 1
  return [Math.ceil(plots), harvestInt]
}

export const descriptions: Record<string, string> = {
  filter: 'Pawns crossed off here will not be displayed in pawn selector.\nClick a pawn to toggle.',
  data: 'Data is saved automatically on exit.\nData is located at F12 - Application - Local Storage - *this domain* - rimworld-data.',
  reset: 'Reset all data, without saving (for emergencies).\nUse Load to revert, Save to confirm.',
  yield: `Harvest yield difficulty setting.\n
Peaceful, Community builder\t1.2
Adventure story, Strive to survive\t1
Blood and dust\t0.95
Losing is fun\t0.8\n
NOTE: Skills, ideoligions, manipulation etc not included.
`,
  stockpile: 'Duration of your stockpile in days per year.',
  meat: 'If the recipe can take any nutrition (e.g. Simple Meal),\ncheck this box to use meat / animal products instead of vegetables.',
  meatConsumption: 'Meat / animal product nutrition consumed per day.',
  modes: `Season:\n\tGrow crops during season to feed pawns whole year.
\tNOTE: Grazing only counts towards total with this setting.\n
Greenhouse:\n\tGrow crops whole year. If grow season is 60 days, is identical to season mode.\n
Stockpile:\n\tGrow crops during season to feed pawns for a certain number of days per year.
\tNOTE: Animal produce with this setting will not be counted.`,
  name: 'Just a display name.',
  pawn: `Human:\n\tUses base 100% hunger rate, genes/bionics not included.
Growth vat:\n\tUses child growth rate (3 nutrition per day),\n\tembryo growth not included (6 nut per day).`,
  index: 'Change this index to move an entry,\nnegative numbers count from the end.',
  harvest: 'Number of harvests per year,\ntry slightly increasing growing season to fit in more.',
  shelf: 'Number of shelves needed to store one harvest.',
  animalProduction: 'Animal product nutrition produced per day.',
  Tea: 'Drugs consumed per day.\n\nNOTE: For growing purposes, go-juice counts as 2 psychite tea.\nTo satisfy go-juice dependecny add 0.4.',
}
