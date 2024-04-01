import type { Crop, Soil, Settings, Recipe, Pawn } from "~/types/rimworldTypes"
import { Mode } from "~/types/rimworldTypes"
import { crops, pawns, realGrowthMult, recipes, soil } from "./rimworldData";
import { buildDictFromArray } from "./helpers";

export const pawnDict: Record<string, Pawn> = buildDictFromArray(pawns, 'name')
export const recipeDict: Record<string, Recipe> = buildDictFromArray(recipes, 'name')
export const cropDict: Record<string, Crop> = buildDictFromArray(crops, 'name')
export const soilDict: Record<string, Soil> = buildDictFromArray(soil, 'name')

export const farmingPlotsNeeded = (req: number, crop: Crop, soil: Soil, mode: string, settings: Settings) => {
  const season = mode === Mode.Greenhouse ? 60 : settings.growingSeason;
  const growDays = crop.growDays * realGrowthMult / (1 + soil.fertility * crop.sensetivity);
  const consumeDays = mode === Mode.Stockpile ? settings.offSeason : 60;
  const cropYield = (crop.yield || 1) * settings.yieldMultiplier;
  let plots = 0;
  const harvestCount = season / growDays;
  let harvestInt = Math.floor(harvestCount);
  if (harvestInt === 0) harvestInt = 1;
  if (season === 60) {
    plots = (consumeDays / 60) * growDays * req / cropYield;
  } else {
    plots = consumeDays * req / harvestInt / cropYield;
  }
  return [Math.ceil(plots), harvestInt];
}
export const grazingPlotsNeeded = (req: number, crop: Crop, soil: Soil, mode: string, settings: Settings) => {
  const season = mode === Mode.Greenhouse ? 60 : settings.growingSeason;
  const growDays = crop.growDays * realGrowthMult / (1 + soil.fertility * crop.sensetivity);
  const plots = growDays * req / crop.nutrition;
  const harvestCount = season / growDays;
  let harvestInt = Math.floor(harvestCount);
  if (harvestInt === 0) harvestInt = 1;
  return [Math.ceil(plots), harvestInt];
}