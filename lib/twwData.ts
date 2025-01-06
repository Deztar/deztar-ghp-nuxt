export type Faction = { name: string, img: string }
export type Character = {
  key: string,
  caste: string,
  ui_group_icon: string,
  ui_unit_icon: string,
  variants?: string[],
}
export type Unit = {
  key: string,
  caste: string,
  num_men: number,
  ui_group_icon: string,
  ui_unit_icon: string,
  mp_cost: number,
  rarity?: 'core' | 'special' | 'rare',
  cost?: number
}

import charactersJSON from '~/assets/json/characters.json'
import unitsJSON from '~/assets/json/units.json'

const castePriority: { [key: string]: number } = {
  melee_infantry: 1,
  missile_infantry: 2,
  monstrous_infantry: 3,
  melee_cavalry: 4,
  missile_cavalry: 5,
  monstrous_cavalry: 6,
  war_beast: 7,
  chariot: 8,
  generic: 9,
  monster: 10,
  warmachine: 11,
}

export const unitComparator = (a: Unit, b: Unit) => {
  if (a.caste !== b.caste) return castePriority[a.caste] - castePriority[b.caste]
  if (a.mp_cost !== b.mp_cost) return a.mp_cost - b.mp_cost
  if (a.num_men !== b.num_men) return b.num_men - a.num_men
  return a.key.localeCompare(b.key)
}

// https://totalwarhammerplanner.com/
/*
const ul = document.querySelector('#root>div>div:nth-child(3)>div>div:nth-child(2)>div>ul')
const r = []
ul.querySelectorAll('li').forEach(x => r.push({ name: x.querySelector('h2').innerText, img: x.querySelector('img').src }))
*/

export const factions = [
  {
    'name': 'Beastmen',
    'img': '/img/tww/factions/beastmen-fTAIUwCZ.webp'
  },
  {
    'name': 'Bretonnia',
    'img': '/img/tww/factions/bretonnia-DQ5fLhSv.webp'
  },
  {
    'name': 'Chaos Dwarfs',
    'img': '/img/tww/factions/chorfs-DO1z8W2-.webp'
  },
  {
    'name': 'Daemons of Chaos',
    'img': '/img/tww/factions/daemonsOfChaos-DU87NmBx.webp'
  },
  {
    'name': 'Dark Elves',
    'img': '/img/tww/factions/darkElves-P21UnRo7.webp'
  },
  {
    'name': 'Dwarfs',
    'img': '/img/tww/factions/dwarfs-CQC4yd-_.webp'
  },
  {
    'name': 'The Empire',
    'img': '/img/tww/factions/empire-BUfTlFuc.webp'
  },
  {
    'name': 'Grand Cathay',
    'img': '/img/tww/factions/grandCathay-C-Y1shtQ.webp'
  },
  {
    'name': 'Greenskins',
    'img': '/img/tww/factions/greenskins-MZ93TRfv.webp'
  },
  {
    'name': 'High Elves',
    'img': '/img/tww/factions/highElves-CysRgMT4.webp'
  },
  {
    'name': 'Khorne',
    'img': '/img/tww/factions/khorne-BsbcaY34.webp'
  },
  {
    'name': 'Kislev',
    'img': '/img/tww/factions/kislev-Di9JKdBr.webp'
  },
  {
    'name': 'Lizardmen',
    'img': '/img/tww/factions/lizardmen-Bbe6IaM5.webp'
  },
  {
    'name': 'Norsca',
    'img': '/img/tww/factions/norsca-Cs0NPzGo.webp'
  },
  {
    'name': 'Nurgle',
    'img': '/img/tww/factions/nurgle-BD67KScd.webp'
  },
  {
    'name': 'Ogre Kingdoms',
    'img': '/img/tww/factions/ogreKingdoms-B3qI50R-.webp'
  },
  {
    'name': 'Skaven',
    'img': '/img/tww/factions/skaven-C_kH4EyF.webp'
  },
  {
    'name': 'Slaanesh',
    'img': '/img/tww/factions/slaanesh-BB2N_u-B.webp'
  },
  {
    'name': 'Tomb Kings',
    'img': '/img/tww/factions/tombKings-By0f8Mrt.webp'
  },
  {
    'name': 'Tzeentch',
    'img': '/img/tww/factions/tzeentch-BejUkc3P.webp'
  },
  {
    'name': 'Vampire Coast',
    'img': '/img/tww/factions/vampireCoast-CT_SmRFf.webp'
  },
  {
    'name': 'Vampire Counts',
    'img': '/img/tww/factions/vampireCounts-6xZ-mVyy.webp'
  },
  {
    'name': 'Warriors of Chaos',
    'img': '/img/tww/factions/warriorsOfChaos-DQC743Ow.webp'
  },
  {
    'name': 'Wood Elves',
    'img': '/img/tww/factions/woodElves-DFQQ3fOx.webp'
  }
]

export const characters: Character[] = charactersJSON
export const units: Unit[] = (unitsJSON
  .filter(u =>
    //!u.key.includes('_ror') &&
    !u.key.includes('_chieftain_') &&
    !u.key.endsWith('_grudge_reward') &&
    !u.key.endsWith('_malakai') &&
    !u.key.endsWith('_blessed')
  ) as Unit[])
  .sort(unitComparator)

export default { factions, units }