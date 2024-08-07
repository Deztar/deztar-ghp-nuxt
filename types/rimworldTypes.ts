export enum ProduceType {
  Nutrition = 'nut',
  Wool = 'wool',
  Chemfuel = 'chemfuel',
  Hops = 'hops',
  Psychoid = 'psychoid',
  Smokeleaf = 'smokeleaf',
}

export enum Mode {
  Season = 'Season',
  Greenhouse = 'Greenhouse',
  Stockpile = 'Stockpile',
}

export enum EdgeCase {
  Generator = 'Generator',
  Grazing = 'Grazing',
  Raw = 'Raw',
  Kibble = 'Kibble',
  Haygrass = 'Haygrass',
  Nutrifungus = 'Nutrifungus',
  Dandelion = 'Dandelion',
  Hydroponics = 'Hydroponics',
  Stony = 'Stony',
}

export interface Pawn {
  name: string;
  consumption: number;
  canTakeDrugs?: boolean;
  grazer?: boolean;
  production?: {
    name: ProduceType;
    amount: number;
  }
}

export interface Recipe {
  name: string;
  input: {
    nut?: number;
    veg?: number;
    meat?: number;
  }
  output: {
    nut: number;
  }
  disabled?: boolean;
}

export interface Crop {
  name: string;
  produce?: ProduceType;
  yield?: number;
  growDays: number;
  sensetivity: number;
  hydroponics?: boolean;
  nutrition: number;
  image: string;
  disabled?: boolean;
  stackSize?: number;
}

export interface Soil {
  name: string;
  fertility: number;
  disabled?: boolean;
}

export interface Drug {
  name: string;
  eff: number;
  crop: string;
  input: ProduceType;
  image: string;
}

export interface RecordBase {
  amount: number;
  name: string;
  pawn: string;
  recipe: string;
  crop: string;
  soil: string;
  mode: Mode;
  useMeat: boolean;
  drugs: {
    [key: string]: number;
  }
}

export interface RecordExtended {
  amount: number;
  name: string;
  pawn: Pawn,
  recipe: Recipe,
  crop: Crop,
  soil: string,
  mode: Mode,
  useMeat: boolean;
  drugs: {
    [key: string]: number;
  }
  options: {
    [key: string]: { [key: string]: boolean }
  }
}

export interface Settings {
  hightlightTips: boolean;
  growingSeason: number;
  offSeason: number;
  yieldMultiplier: number;
  drugSoil: {
    [key: string]: string;
  }
  drugMode: {
    [key: string]: string;
  }
}
