import { Mode, type Crop, type Drug, type RecordBase, type Soil, type Pawn, type Recipe } from "~/types/rimworldTypes"

export const realGrowthMult = 1 / 0.5417 // 1 divided by sunny hours
export const nutritionMult = 20 // 1 / 0.05 vegetables nutrition
export const barrelMult = 6 / 25 // 25 beer every 6 days
export const defaultStackSize = 75

export const soil: Soil[] = [
  {
    name: 'Stony',
    fertility: -0.3,
  },
  {
    name: 'Regular',
    fertility: 0,
  },
  {
    name: 'Rich',
    fertility: 0.4,
  },
  {
    name: 'Hydroponics',
    fertility: 1.8,
  },
]

export const drugs: Drug[] = [
  {
    name: 'Beer',
    eff: 0.2,
    crop: 'Hop',
    input: 'hops',
    image: 'https://rimworldwiki.com/images/a/a2/Beer_b.png',
  },
  {
    name: 'Tea',
    eff: 0.25,
    crop: 'Psychoid',
    input: 'psychoid',
    image: 'https://rimworldwiki.com/images/9/9a/Tea_b.png',
  },
  {
    name: 'Joint',
    eff: 0.25,
    crop: 'Smokeleaf',
    input: 'smokeleaf',
    image: 'https://rimworldwiki.com/images/6/6f/Joint_b.png',
  },
] as Drug[]

export const crops: Crop[] = [
  {
    name: 'Corn',
    produce: 'nut',
    yield: 22,
    growDays: 11.3,
    sensitivity: 1.0,
    nutrition: 0.4,
    image: 'https://rimworldwiki.com/images/f/f8/Corn.png',
  },
  {
    name: 'Nutrifungus',
    produce: 'nut',
    yield: 11,
    growDays: 6.0,
    sensitivity: 0.15,
    hydroponics: true,
    nutrition: 0.25,
    image: 'https://rimworldwiki.com/images/e/ea/Raw_fungus.png',
  },
  {
    name: 'Potato',
    produce: 'nut',
    yield: 11,
    growDays: 5.8,
    sensitivity: 0.4,
    nutrition: 0.25,
    image: 'https://rimworldwiki.com/images/4/42/Potatoes.png',
  },
  {
    name: 'Rice',
    produce: 'nut',
    yield: 6,
    growDays: 3.0,
    sensitivity: 1,
    hydroponics: true,
    nutrition: 0.175,
    image: 'https://rimworldwiki.com/images/d/da/Rice.png',
  },
  {
    name: 'Strawberry',
    produce: 'nut',
    yield: 8,
    growDays: 4.6,
    sensitivity: 1,
    hydroponics: true,
    nutrition: 0.2,
    image: 'https://rimworldwiki.com/images/2/24/Berries.png',
  },
  {
    name: 'Toxipotato',
    produce: 'nut',
    yield: 7,
    growDays: 4.9,
    sensitivity: 0,
    hydroponics: true,
    nutrition: 0.25,
    image: 'https://rimworldwiki.com/images/6/67/Toxipotato.png',
  },
  {
    name: 'Haygrass',
    produce: 'nut',
    yield: 18,
    growDays: 7.0,
    sensitivity: 0.6,
    nutrition: 0.3,
    image: 'https://rimworldwiki.com/images/d/d1/Hay_c.png',
    stackSize: 200,
  },
  {
    name: 'Hop',
    produce: 'hops',
    yield: 8,
    growDays: 5.0,
    sensitivity: 0.7,
    hydroponics: true,
    nutrition: 0.2,
    image: 'https://rimworldwiki.com/images/5/59/Hops.png',
  },
  {
    name: 'Psychoid',
    produce: 'psychoid',
    yield: 8,
    growDays: 9,
    sensitivity: 0.4,
    hydroponics: true,
    nutrition: 0.2,
    image: 'https://rimworldwiki.com/images/0/09/Psychoid_leaves.png',
  },
  {
    name: 'Smokeleaf',
    produce: 'smokeleaf',
    yield: 9,
    growDays: 7.5,
    sensitivity: 1.0,
    hydroponics: true,
    nutrition: 0.2,
    image: 'https://rimworldwiki.com/images/0/07/Smokeleaf_leaves.png',
  },
  {
    name: 'Dandelion',
    growDays: 2.5,
    sensitivity: 0,
    nutrition: 0.25,
    image: 'https://rimworldwiki.com/images/4/43/Dandelion_a.png',
  }

] as Crop[]

export const recordDefault: RecordBase = {
  amount: 1,
  name: '',
  pawn: 'Human',
  recipe: 'Simple',
  crop: 'Rice',
  soil: 'Regular',
  useMeat: false,
  mode: Mode.Season,
  drugs: {},
}

export const pawns: Pawn[] = [
  {
    name: "Generator",
    consumption: 0.45,
  },
  {
    name: "Growth vat",
    consumption: 3,
  },
  {
    name: "Human",
    consumption: 1.8,
    canTakeDrugs: true,
  },
  {
    name: "Alpaca",
    consumption: 0.44,
    grazer: true,
    production: {
      name: "wool",
      amount: 4.5
    }
  },
  {
    name: "Alphabeaver",
    consumption: 4.8
  },
  {
    name: "Arctic fox",
    consumption: 0.16
  },
  {
    name: "Arctic wolf",
    consumption: 0.29
  },
  {
    name: "Bison",
    consumption: 0.86,
    grazer: true,
    production: {
      name: "wool",
      amount: 8
    }
  },
  {
    name: "Boomalope",
    consumption: 0.86,
    grazer: true,
    production: {
      name: "chemfuel",
      amount: 11
    }
  },
  {
    name: "Boomrat",
    consumption: 0.22,
    grazer: true
  },
  {
    name: "Capybara",
    consumption: 0.36,
    grazer: true
  },
  {
    name: "Caribou F",
    consumption: 0.44,
    grazer: true,
    production: {
      name: "nut",
      amount: 0.25
    }
  },
  {
    name: "Caribou M",
    consumption: 0.44,
    grazer: true
  },
  {
    name: "Cassowary",
    consumption: 0.45,
    grazer: true
  },
  {
    name: "Cat",
    consumption: 0.24
  },
  {
    name: "Chicken F",
    consumption: 0.22,
    grazer: true,
    production: {
      name: "nut",
      amount: 0.25
    }
  },
  {
    name: "Chicken M",
    consumption: 0.22,
    grazer: true
  },
  {
    name: "Chinchilla",
    consumption: 0.2,
    grazer: true
  },
  {
    name: "Cobra",
    consumption: 0.11
  },
  {
    name: "Cougar",
    consumption: 0.32
  },
  {
    name: "Cow F",
    consumption: 0.86,
    grazer: true,
    production: {
      name: "nut",
      amount: 0.7
    }
  },
  {
    name: "Cow M",
    consumption: 0.86,
    grazer: true
  },
  {
    name: "Deer",
    consumption: 0.32,
    grazer: true
  },
  {
    name: "Donkey",
    consumption: 0.52,
    grazer: true
  },
  {
    name: "Dromedary F",
    consumption: 0.86,
    grazer: true,
    production: {
      name: "nut",
      amount: 0.45
    }
  },
  {
    name: "Dromedary M",
    consumption: 0.86,
    grazer: true
  },
  {
    name: "Duck F",
    consumption: 0.28,
    grazer: true,
    production: {
      name: "nut",
      amount: 0.25
    }
  },
  {
    name: "Duck M",
    consumption: 0.28,
    grazer: true
  },
  {
    name: "Elephant",
    consumption: 2.57,
    grazer: true
  },
  {
    name: "Elk F",
    consumption: 0.86,
    grazer: true,
    production: {
      name: "nut",
      amount: 0.55
    }
  },
  {
    name: "Elk M",
    consumption: 0.86,
    grazer: true
  },
  {
    name: "Emu",
    consumption: 0.45,
    grazer: true
  },
  {
    name: "Fennec fox",
    consumption: 0.16
  },
  {
    name: "Gazelle",
    consumption: 0.24,
    grazer: true
  },
  {
    name: "Goat F",
    consumption: 0.36,
    grazer: true,
    production: {
      name: "nut",
      amount: 0.2
    }
  },
  {
    name: "Goat M",
    consumption: 0.36,
    grazer: true
  },
  {
    name: "Goose F",
    consumption: 0.45,
    grazer: true,
    production: {
      name: "nut",
      amount: 0.25
    }
  },
  {
    name: "Goose M",
    consumption: 0.45,
    grazer: true
  },
  {
    name: "Grizzly bear",
    consumption: 0.56
  },
  {
    name: "Guinea pig",
    consumption: 0.16,
    grazer: true
  },
  {
    name: "Hare",
    consumption: 0.18,
    grazer: true
  },
  {
    name: "Horse",
    consumption: 0.68,
    grazer: true
  },
  {
    name: "Husky",
    consumption: 0.8
  },
  {
    name: "Ibex",
    consumption: 0.32,
    grazer: true
  },
  {
    name: "Iguana",
    consumption: 0.32,
    grazer: true
  },
  {
    name: "Labrador",
    consumption: 0.64
  },
  {
    name: "Lynx",
    consumption: 0.19
  },
  {
    name: "Megascarab",
    consumption: 0.16
  },
  {
    name: "Megaspider",
    consumption: 0.56
  },
  {
    name: "Megasloth",
    consumption: 1.6,
    grazer: true,
    production: {
      name: "wool",
      amount: 10
    }
  },
  {
    name: "Monkey",
    consumption: 0.2,
    grazer: true
  },
  {
    name: "Muffalo",
    consumption: 0.86,
    grazer: true,
    production: {
      name: "wool",
      amount: 8
    }
  },
  {
    name: "Ostrich",
    consumption: 0.67,
    grazer: true
  },
  {
    name: "Panther",
    consumption: 0.32
  },
  {
    name: "Pig",
    consumption: 0.8,
    grazer: true
  },
  {
    name: "Polar bear",
    consumption: 0.56
  },
  {
    name: "Raccoon",
    consumption: 0.32,
    grazer: true
  },
  {
    name: "Rat",
    consumption: 0.16,
    grazer: true
  },
  {
    name: "Red fox",
    consumption: 0.16
  },
  {
    name: "Rhinoceros",
    consumption: 1.71,
    grazer: true
  },
  {
    name: "Sheep",
    consumption: 0.36,
    grazer: true,
    production: {
      name: "wool",
      amount: 4.5
    }
  },
  {
    name: "Snowhare",
    consumption: 0.18,
    grazer: true
  },
  {
    name: "Spelopede",
    consumption: 0.4
  },
  {
    name: "Squirrel",
    consumption: 0.16,
    grazer: true
  },
  {
    name: "Thrumbo",
    consumption: 2.8,
    grazer: true
  },
  {
    name: "Timber wolf",
    consumption: 0.29
  },
  {
    name: "Tortoise",
    consumption: 0.13,
    grazer: true
  },
  {
    name: "Toxalope",
    consumption: 0.86,
    grazer: true,
  },
  {
    name: "Turkey",
    consumption: 0.45,
    grazer: true
  },
  {
    name: "Warg",
    consumption: 0.4
  },
  {
    name: "Waste rat",
    consumption: 0.16,
    grazer: true,
  },
  {
    name: "Wild boar",
    consumption: 0.48,
    grazer: true
  },
  {
    name: "Yak F",
    consumption: 0.86,
    grazer: true,
    production: {
      name: "nut",
      amount: 0.55
    }
  },
  {
    name: "Yak M",
    consumption: 0.86,
    grazer: true
  },
  {
    name: "Yorkshire",
    consumption: 0.24
  }
] as Pawn[]

export const recipes: Recipe[] = [
  {
    name: 'Grazing',
    input: {
      veg: 1.0
    },
    output: {
      nut: 1.0
    },
  },
  {
    name: 'Raw',
    input: {
      nut: 1.0
    },
    output: {
      nut: 1.0
    },
  },
  {
    name: 'Kibble',
    input: {
      veg: 1.0,
      meat: 1.0,
    },
    output: {
      nut: 2.5
    },
  },
  {
    name: 'Paste',
    input: {
      nut: 0.3
    },
    output: {
      nut: 0.9
    },
  },
  {
    name: 'Simple',
    input: {
      nut: 0.5
    },
    output: {
      nut: 0.9
    },
  },
  {
    name: 'Fine',
    input: {
      veg: 0.25,
      meat: 0.25,
    },
    output: {
      nut: 0.9
    },
  },
  {
    name: 'Fine C',
    input: {
      meat: 0.75,
    },
    output: {
      nut: 0.9
    },
  },
  {
    name: 'Fine V',
    input: {
      veg: 0.75,
    },
    output: {
      nut: 0.9
    },
  },
  {
    name: 'Lavish',
    input: {
      veg: 0.5,
      meat: 0.5,
    },
    output: {
      nut: 0.9
    },
  },
  {
    name: 'Lavish C',
    input: {
      meat: 2.5,
    },
    output: {
      nut: 0.9
    },
  },
  {
    name: 'Lavish V',
    input: {
      veg: 2.5,
    },
    output: {
      nut: 0.9
    },
  },
  {
    name: 'Pemmican',
    input: {
      veg: 0.25,
      meat: 0.25,
    },
    output: {
      nut: 0.8
    },
  },
  {
    name: 'Survival',
    input: {
      veg: 0.3,
      meat: 0.3,
    },
    output: {
      nut: 0.9
    },
  },
  {
    name: 'Baby food',
    input: {
      veg: 0.25,
    },
    output: {
      nut: 0.5
    }
  }
]

export const images: { [key: string]: string } = {
  chemfuel: 'https://rimworldwiki.com/images/7/72/Chemfuel.png',
  wool: 'https://rimworldwiki.com/images/3/34/Wool.png',
  nut: 'https://rimworldwiki.com/images/9/92/Milk.png',
  meat: 'https://rimworldwiki.com/images/a/af/Meat_big_b.png',
  barrel: 'https://rimworldwiki.com/images/d/d5/FermentingBarrel.png',
  harvest: 'https://rimworldwiki.com/images/3/38/HarvestPlants.png',
  zone: 'https://rimworldwiki.com/images/5/58/ZoneCreate_Growing.png',
  shelf: 'https://rimworldwiki.com/images/d/dd/ShelfSmall_south.png',
}

export const filterDefault = [
  false, false, false, true, true, true, true, true, false, true, true, true, true, true, true, false, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, true, true, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true
]
