import type { Attributes, Brother, BrotherClass } from "~/types/brothersTypes"

export const tiers = [0, 9, 17, 25, 37, 42, 46, 50]

export const perks = [
  {
    'name': 'Fast Adaptation',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/e/e7/Perk_33.png'
  },
  {
    'name': 'Crippling Strikes',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/8/8d/Perk_57.png'
  },
  {
    'name': 'Colossus',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/a/a0/Perk_06.png'
  },
  {
    'name': 'Nine Lives',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/f/f8/Perk_07.png'
  },
  {
    'name': 'Bags and Belts',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/7/7d/Perk_20.png'
  },
  {
    'name': 'Pathfinder',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/d/da/Perk_23.png'
  },
  {
    'name': 'Adrenaline',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/a/a2/Perk_37.png'
  },
  {
    'name': 'Recover',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/0/01/Perk_54.png'
  },
  {
    'name': 'Student',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/e/ed/Perk_21.png'
  },
  {
    'name': 'Executioner',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/9/9d/Perk_16.png'
  },
  {
    'name': 'Bullseye',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/b/bb/Perk_17.png'
  },
  {
    'name': 'Dodge',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/6/62/Perk_01.png'
  },
  {
    'name': 'Fortified Mind',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/c/c9/Perk_08.png'
  },
  {
    'name': 'Resilient',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/4/44/Perk_04.png'
  },
  {
    'name': 'Steel Brow',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/9/95/Perk_09.png'
  },
  {
    'name': 'Quick Hands',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/c/c2/Perk_39.png'
  },
  {
    'name': 'Gifted',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/4/44/Perk_56.png'
  },
  {
    'name': 'Backstabber',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/f/f3/Perk_59.png'
  },
  {
    'name': 'Anticipation',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/1/1b/Perk_10.png'
  },
  {
    'name': 'Shield Expert',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/0/0a/Perk_05.png'
  },
  {
    'name': 'Brawny',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/7/79/Perk_40.png'
  },
  {
    'name': 'Relentless',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/9/92/Perk_26.png'
  },
  {
    'name': 'Rotation',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/c/c8/Perk_11.png'
  },
  {
    'name': 'Rally the Troops',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/a/a3/Perk_42.png'
  },
  {
    'name': 'Taunt',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/d/d7/Perk_38.png'
  },
  {
    'name': 'Mace Mastery',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/9/98/Perk_43.png'
  },
  {
    'name': 'Flail Mastery',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/c/c1/Perk_47.png'
  },
  {
    'name': 'Hammer Mastery',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/7/73/Perk_53.png'
  },
  {
    'name': 'Axe Mastery',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/f/f8/Perk_44.png'
  },
  {
    'name': 'Cleaver Mastery',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/1/1c/Perk_52.png'
  },
  {
    'name': 'Sword Mastery',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/a/a8/Perk_46.png'
  },
  {
    'name': 'Dagger Mastery',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/0/0b/Perk_51.png'
  },
  {
    'name': 'Polearm Mastery',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/d/d7/Perk_58.png'
  },
  {
    'name': 'Spear Mastery',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/0/00/Perk_45.png'
  },
  {
    'name': 'Crossbow and Firearms Mastery',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/6/6f/Perk_48.png'
  },
  {
    'name': 'Bow Mastery',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/9/9e/Perk_49.png'
  },
  {
    'name': 'Throwing Mastery',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/0/03/Perk_50.png'
  },
  {
    'name': 'Reach Advantage',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/b/bb/Perk_19.png'
  },
  {
    'name': 'Overwhelm',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/9/99/Perk_62.png'
  },
  {
    'name': 'Lone Wolf',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/9/9b/Perk_61.png'
  },
  {
    'name': 'Underdog',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/c/c3/Perk_60.png'
  },
  {
    'name': 'Footwork',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/9/98/Perk_25.png'
  },
  {
    'name': 'Berserk',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/9/9a/Perk_35.png'
  },
  {
    'name': 'Head Hunter',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/4/4b/Perk_15.png'
  },
  {
    'name': 'Nimble',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/2/27/Perk_29.png'
  },
  {
    'name': 'Battle Forged',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/5/50/Perk_03.png'
  },
  {
    'name': 'Fearsome',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/5/56/Perk_27.png'
  },
  {
    'name': 'Duelist',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/9/94/Perk_41.png'
  },
  {
    'name': 'Killing Frenzy',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/1/14/Perk_36.png'
  },
  {
    'name': 'Indomitable',
    'image': 'https://static.wikia.nocookie.net/battlebrothers/images/4/4f/Perk_30.png'
  }
]

export const attributeIcons: { [key: string]: string } = {
  hitpoints: 'https://static.wikia.nocookie.net/battlebrothers/images/9/94/Health.png',
  fatigue: 'https://static.wikia.nocookie.net/battlebrothers/images/b/b4/Fatigue.png',
  resolve: 'https://static.wikia.nocookie.net/battlebrothers/images/5/5c/Resolve.png',
  initiative: 'https://static.wikia.nocookie.net/battlebrothers/images/e/ea/Initiative.png',
  meleeAttack: 'https://static.wikia.nocookie.net/battlebrothers/images/c/c1/Melee_skill.png',
  rangedAttack: 'https://static.wikia.nocookie.net/battlebrothers/images/0/05/Ranged_skill.png',
  meleeDefense: 'https://static.wikia.nocookie.net/battlebrothers/images/b/b7/Melee_defense.png',
  rangedDefense: 'https://static.wikia.nocookie.net/battlebrothers/images/5/5c/Ranged_defense.png',
}

export const brotherDefault: Brother = {
  name: '',
  level: 1,
  attr: {},
  talents: {},
}

export const brotherClassDefault: BrotherClass = {
  name: '',
  link: '',
  attr: {},
  needed: 1,
}

export const attributeMins: Attributes = {
  hitpoints: 2,
  fatigue: 2,
  resolve: 2,
  initiative: 3,
  meleeAttack: 1,
  rangedAttack: 2,
  meleeDefense: 1,
  rangedDefense: 2,
}