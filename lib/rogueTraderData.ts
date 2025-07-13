const extractFromTsv = () => {
  //@ts-ignore
  const text = document.querySelector('pre').innerText
  const result = {}
  for (const line of text.split('\n')) {
    const [set, name, description] = line.split('\t')
    //@ts-ignore
    if (!result[set]) result[set] = []
    //@ts-ignore
    result[set].push({ name, description })
  }
}

export enum Feature {
  Ability = 1,
  Characteristic,
  CommonTalent,
  ExemplarTalent,
  Skill,
  T1Ability,
  T1Talent,
  T1T2Ability,
  T1T2Talent,
  T2Ability,
  T2Talent,
  Talent,
  Upgrade,
}

export const tags = {
  Homeworld: [
    "Death World",
    "Forge World",
    "Fortress World",
    "Hive World",
    "Imperial World",
    "Voidborn",
  ],
  Origin: [
    "Arbitrator",
    "Astra Militarum Commander",
    "Commissar",
    "Crime Lord",
    "Ministorum Priest",
    "Navigator",
    "Navy Officer",
    "Noble",
    "Pasqal",
    "Sanctioned Psyker",
    "Unsanctioned Psyker",
  ],
  T1Archetype: [
    "Warrior",
    "Officer",
    "Operative",
    "Soldier",
    "Bladedancer",
  ],
  T2Archetype: [
    "Assassin",
    "Vanguard",
    "Bounty Hunter",
    "Master Tactician",
    "Grand Strategist",
    "Arch-Militant",
    "Executioner",
    "Overseer",
  ],
  Fixed: [
    "Common",
    "Exemplar",
  ],
  Conditional: [
    "Psyker",
  ],
  Psyker: [
    "Biomancy",
    "Divination",
    "Pyromancy",
    "Sanctic Powers",
    "Telepathy",
  ]
}

export const talentFeatures = [
  Feature.CommonTalent,
  Feature.Talent,
  Feature.T1Talent,
  Feature.T2Talent,
  Feature.T1T2Talent
]

export const abilityFeatures = [
  Feature.Ability,
  Feature.T1Ability,
  Feature.T2Ability,
  Feature.T1T2Ability
]

export const t1Features = [
  Feature.T1Talent,
  Feature.T1T2Talent,
  Feature.T1Ability,
  Feature.T1T2Ability
]

export const t2Features = [
  Feature.T2Talent,
  Feature.T1T2Talent,
  Feature.T2Ability,
  Feature.T1T2Ability
]

export type Rank = Array<Feature | string>
export type Archetype = Record<string, Rank[]>

export const archetypes: Archetype = {
  Warrior: [
    ['Charge'],
    [Feature.Skill],
    ['Endure'],
    ['Daring Breach', Feature.Talent],
    [Feature.Talent, Feature.Characteristic],
    [Feature.Ability, Feature.Skill],
    [Feature.Characteristic, Feature.CommonTalent],
    [Feature.Skill, Feature.Talent],
    [Feature.Upgrade],
    [Feature.Talent, Feature.Characteristic],
    [Feature.Ability, Feature.CommonTalent],
    [Feature.Characteristic, Feature.Skill],
    [Feature.Talent, Feature.Skill],
    [Feature.Characteristic, Feature.CommonTalent],
    [Feature.Upgrade]
  ],
  Officer: [
    ['Voice of Command'],
    [Feature.Skill],
    ['Bring it Down!'],
    ['Finest Hour', Feature.Talent],
    [Feature.Characteristic, Feature.CommonTalent],
    [Feature.Talent, Feature.Characteristic],
    [Feature.Ability, Feature.CommonTalent],
    [Feature.Talent, Feature.Skill],
    [Feature.Upgrade],
    [Feature.Skill, Feature.Characteristic],
    [Feature.Talent, Feature.Characteristic],
    [Feature.Ability, Feature.CommonTalent],
    [Feature.Talent, Feature.Skill],
    [Feature.Characteristic, Feature.CommonTalent],
    [Feature.Upgrade]
  ],
  Operative: [
    ['Analyse Enemies'],
    [Feature.Skill],
    ['Expose Weakness'],
    ['Dismantling Attack', Feature.Talent],
    [Feature.Characteristic, Feature.CommonTalent],
    [Feature.Talent, Feature.Characteristic],
    [Feature.Ability, Feature.Skill],
    [Feature.Talent, Feature.CommonTalent],
    [Feature.Upgrade, Feature.Skill],
    [Feature.Skill, Feature.Characteristic],
    [Feature.Talent, Feature.Skill],
    [Feature.Ability, Feature.CommonTalent],
    [Feature.Talent, Feature.Characteristic],
    [Feature.Characteristic, Feature.CommonTalent],
    [Feature.Upgrade]
  ],
  Soldier: [
    ['Run and Gun'],
    [Feature.Skill],
    ['Revel in Slaughter'],
    ['Firearm Mastery', Feature.Talent],
    [Feature.Characteristic, Feature.Talent],
    [Feature.Characteristic, Feature.Ability],
    [Feature.Characteristic, Feature.CommonTalent],
    [Feature.Talent, Feature.Skill],
    [Feature.Upgrade],
    [Feature.Talent, Feature.Characteristic],
    [Feature.Ability, Feature.Skill],
    [Feature.Characteristic, Feature.CommonTalent],
    [Feature.Talent, Feature.CommonTalent],
    [Feature.CommonTalent, Feature.Skill],
    [Feature.Upgrade]
  ],
  Bladedancer: [
    ['Blade Dance'],
    [Feature.Skill],
    ['Death from Above'],
    ['Death Waltz', Feature.Talent],
    [Feature.CommonTalent, Feature.Characteristic],
    [Feature.Ability, Feature.Skill],
    [Feature.Characteristic, Feature.Talent],
    [Feature.Skill, Feature.CommonTalent],
    [Feature.Upgrade],
    [Feature.Talent, Feature.Characteristic],
    [Feature.Ability, Feature.Talent],
    [Feature.Characteristic, Feature.Skill],
    [Feature.CommonTalent, Feature.Skill],
    [Feature.Characteristic, Feature.Talent],
    [Feature.Upgrade]
  ],
  Assassin: [
    ['Seek the Opening'], // Rank 1
    [Feature.Ability], // Rank 2
    [Feature.Talent], // Rank 3
    ['Dispatch'], // Rank 4
    ['AP Increase', Feature.Characteristic], // Rank 5
    [Feature.Talent, Feature.Characteristic], // Rank 6
    [Feature.Skill, Feature.Ability], // Rank 7
    [Feature.Talent], // Rank 8
    [Feature.Characteristic, Feature.CommonTalent], // Rank 9
    [Feature.Talent], // Rank 10
    [Feature.Characteristic, Feature.Skill], // Rank 11
    [Feature.Upgrade], // Rank 12
    [Feature.CommonTalent, Feature.Talent], // Rank 13
    [Feature.Characteristic, Feature.Skill], // Rank 14
    [Feature.Ability], // Rank 15
    [Feature.CommonTalent, Feature.Talent], // Rank 16
    [Feature.Skill], // Rank 17
    [Feature.Talent, Feature.Characteristic], // Rank 18
    [Feature.CommonTalent], // Rank 19
    [Feature.Upgrade], // Rank 20
  ],
  Vanguard: [
    ['Unyielding Beacon'], // Rank 1
    [Feature.Ability, Feature.CommonTalent], // Rank 2
    [Feature.Talent], // Rank 3
    ['Unyielding Guard'], // Rank 4
    ['AP Increase', Feature.Characteristic], // Rank 5
    [Feature.Characteristic, Feature.Talent], // Rank 6
    [Feature.Ability, Feature.Skill], // Rank 7
    [Feature.Talent, Feature.CommonTalent], // Rank 8
    [Feature.Characteristic, Feature.CommonTalent], // Rank 9
    [Feature.Talent], // Rank 10
    [Feature.Skill, Feature.Characteristic], // Rank 11
    [Feature.Upgrade], // Rank 12
    [Feature.Talent], // Rank 13
    [Feature.Skill, Feature.Characteristic], // Rank 14
    [Feature.Ability], // Rank 15
    [Feature.Talent], // Rank 16
    [Feature.Characteristic, Feature.Skill], // Rank 17
    [Feature.Talent], // Rank 18
    [Feature.CommonTalent], // Rank 19
    [Feature.Upgrade], // Rank 20
  ],
  "Bounty Hunter": [
    ['Hunt Down the Prey'], // Rank 1
    [Feature.Ability], // Rank 2
    [Feature.Talent], // Rank 3
    ['Wild Hunt'], // Rank 4
    ['AP Increase', Feature.CommonTalent, Feature.Characteristic], // Rank 5
    [Feature.Talent, Feature.Characteristic], // Rank 6
    [Feature.Ability], // Rank 7
    [Feature.Talent, Feature.Skill], // Rank 8
    [Feature.CommonTalent, Feature.Characteristic], // Rank 9
    [Feature.Talent], // Rank 10
    [Feature.Skill, Feature.Characteristic], // Rank 11
    [Feature.Upgrade], // Rank 12
    [Feature.Talent], // Rank 13
    [Feature.Skill, Feature.Characteristic], // Rank 14
    [Feature.Ability, Feature.CommonTalent], // Rank 15
    [Feature.Talent], // Rank 16
    [Feature.Characteristic, Feature.Skill], // Rank 17
    [Feature.Talent], // Rank 18
    [Feature.CommonTalent], // Rank 19
    [Feature.Upgrade], // Rank 20
  ],
  "Master Tactician": [
    ['Tactical Advantage', 'Press the Advantage'], // Rank 1
    [Feature.Ability], // Rank 2
    [Feature.Talent], // Rank 3
    ['Orchestrated Firestorm'], // Rank 4
    ['AP Increase', Feature.Characteristic], // Rank 5
    [Feature.Characteristic, Feature.Talent], // Rank 6
    [Feature.Ability], // Rank 7
    [Feature.Talent, Feature.Skill], // Rank 8
    [Feature.Characteristic, Feature.CommonTalent], // Rank 9
    [Feature.Talent], // Rank 10
    [Feature.Skill, Feature.Characteristic], // Rank 11
    [Feature.Upgrade], // Rank 12
    [Feature.Talent], // Rank 13
    [Feature.Skill, Feature.Characteristic], // Rank 14
    [Feature.CommonTalent, Feature.Ability], // Rank 15
    [Feature.Talent], // Rank 16
    [Feature.Characteristic, Feature.Skill], // Rank 17
    [Feature.Talent], // Rank 18
    [Feature.Characteristic, Feature.CommonTalent], // Rank 19
    [Feature.Upgrade], // Rank 20
  ],
  "Grand Strategist": [
    ['Combat Tactics'], // Rank 1
    [Feature.Ability], // Rank 2
    [Feature.Talent], // Rank 3
    ['Take and Hold'], // Rank 4
    ['AP Increase', Feature.Characteristic], // Rank 5
    [Feature.Talent, Feature.Characteristic], // Rank 6
    [Feature.Ability], // Rank 7
    [Feature.Skill, Feature.Talent], // Rank 8
    [Feature.Characteristic, Feature.CommonTalent], // Rank 9
    [Feature.Talent], // Rank 10
    [Feature.Characteristic, Feature.Skill], // Rank 11
    [Feature.Upgrade], // Rank 12
    [Feature.Talent, Feature.Characteristic], // Rank 13
    [Feature.Characteristic, Feature.Skill], // Rank 14
    [Feature.Ability], // Rank 15
    [Feature.Talent, Feature.CommonTalent], // Rank 16
    [Feature.Skill, Feature.Characteristic], // Rank 17
    [Feature.Characteristic, Feature.Talent], // Rank 18
    [Feature.CommonTalent], // Rank 19
    [Feature.Upgrade], // Rank 20
  ],
  "Arch-Militant": [
    ['Versatility'], // Rank 1
    [Feature.Ability], // Rank 2
    [Feature.Talent], // Rank 3
    ['Steady Superiority'], // Rank 4
    ['AP Increase', Feature.Characteristic], // Rank 5
    [Feature.Talent, Feature.Characteristic], // Rank 6
    [Feature.Ability, Feature.CommonTalent], // Rank 7
    [Feature.Skill, Feature.Talent], // Rank 8
    [Feature.Characteristic, Feature.CommonTalent], // Rank 9
    [Feature.Talent], // Rank 10
    [Feature.Skill, Feature.Characteristic], // Rank 11
    [Feature.Upgrade], // Rank 12
    [Feature.Skill, Feature.Talent], // Rank 13
    [Feature.Characteristic, Feature.CommonTalent], // Rank 14
    [Feature.Ability], // Rank 15
    [Feature.Talent], // Rank 16
    [Feature.Characteristic, Feature.Skill], // Rank 17
    [Feature.Talent, Feature.Characteristic], // Rank 18
    [Feature.Characteristic, Feature.CommonTalent], // Rank 19
    [Feature.Upgrade], // Rank 20
  ],
  Executioner: [
    ['Forced Repentance', 'Scourging Strikes', 'Where it Hurts'], // Rank 1
    [Feature.Ability], // Rank 2
    [Feature.Talent], // Rank 3
    ['Carnival of Misery'], // Rank 4
    ['AP Increase', Feature.Characteristic], // Rank 5
    [Feature.Characteristic, Feature.Talent], // Rank 6
    [Feature.Ability], // Rank 7
    [Feature.Talent, Feature.Skill], // Rank 8
    [Feature.Characteristic, Feature.CommonTalent], // Rank 9
    [Feature.Talent], // Rank 10
    [Feature.Characteristic, Feature.Skill], // Rank 11
    [Feature.Upgrade], // Rank 12
    [Feature.Talent], // Rank 13
    [Feature.Characteristic, Feature.Skill], // Rank 14
    [Feature.Ability, Feature.CommonTalent], // Rank 15
    [Feature.Talent], // Rank 16
    [Feature.Characteristic, Feature.Skill], // Rank 17
    [Feature.Talent], // Rank 18
    [Feature.Characteristic, Feature.CommonTalent], // Rank 19
    [Feature.Upgrade], // Rank 20
  ],
  Overseer: [
    ['Familiar Proficiency'], // Rank 1
    [Feature.Ability], // Rank 2
    [Feature.Talent], // Rank 3
    ['Overcharge'], // Rank 4
    ['AP Increase', Feature.Characteristic], // Rank 5
    [Feature.Talent, Feature.Characteristic], // Rank 6
    [Feature.Ability, Feature.Skill], // Rank 7
    [Feature.Talent], // Rank 8
    [Feature.Characteristic, Feature.CommonTalent], // Rank 9
    [Feature.Talent], // Rank 10
    [Feature.Characteristic, Feature.Skill], // Rank 11
    [Feature.Upgrade], // Rank 12
    [Feature.Talent, Feature.CommonTalent], // Rank 13
    [Feature.Characteristic, Feature.Skill], // Rank 14
    [Feature.Ability], // Rank 15
    [Feature.Talent, Feature.CommonTalent], // Rank 16
    [Feature.Characteristic, Feature.Skill], // Rank 17
    [Feature.Talent], // Rank 18
    [Feature.CommonTalent], // Rank 19
    [Feature.Upgrade], // Rank 20
  ],
  Exemplar: [
    [Feature.ExemplarTalent, Feature.T1Talent],
    [Feature.Skill, Feature.T2Talent],
    [Feature.Characteristic, Feature.CommonTalent],
    [Feature.T1Ability, Feature.Skill],
    [Feature.ExemplarTalent, Feature.T2Talent],
    [Feature.Characteristic, Feature.T1Talent],
    [Feature.T2Ability, Feature.Characteristic],
    [Feature.T2Talent, Feature.CommonTalent],
    [Feature.Skill, Feature.ExemplarTalent],
    ['AP Increase'],
    [Feature.T1Talent, Feature.Skill],
    [Feature.T1Talent, Feature.Skill],
    [Feature.T2Talent, Feature.Characteristic],
    [Feature.Characteristic, Feature.Skill],
    [Feature.ExemplarTalent, Feature.T1Talent],
    [Feature.T2Talent, Feature.Skill],
    [Feature.T1T2Talent, Feature.CommonTalent],
    [Feature.T1T2Ability, Feature.Characteristic],
    [Feature.ExemplarTalent, Feature.T1T2Talent],
    ['AP Increase']
  ]
}

export const characteristics: string[] = [
  "Weapon Skill",
  "Ballistic Skill",
  "Strength",
  "Toughness",
  "Agility",
  "Intelligence",
  "Perception",
  "WIllpower",
  "Fellowship",
]

export const skills: string[] = [
  "Athletics",
  "Awareness",
  "Carouse",
  "Coercion",
  "Commerce",
  "Demolition",
  "Logic",
  "Lore (Imperium)",
  "Lore (Warp)",
  "Lore (Xenos)",
  "Medicae",
  "Tech-Use",
  "Persuasion",
]

export const abilities: Record<string, { name: string, description: string }[]> = {
  "Arbitrator": [
    {
      "name": "Assault Onslaught",
      "description": "The Arbitrator dashes through allies and enemies in a straight line for up to 5 cells without provoking attacks of opportunity. Each enemy they dash through must pass an Agility resistance test or fall prone until the start of that enemy's next turn! This ability can only be used with a shield equipped!"
    },
    {
      "name": "Death Sentence",
      "description": "The Arbitrator inflicts +X stacks of the death sentence effect on an enemy. Each stack increases the enemy's chance to be critically hit by+1% and reduces their Perception and Willpower by-2. Whenever a target under this effect suffers damage from an attack, it suffers +1 stack of death sentence. The effect lasts until the start of the Arbitrator's next turn."
    },
    {
      "name": "Double Slug",
      "description": "This shotgun attack allows the Arbitrator to make two single shots against the target."
    },
    {
      "name": "Grisly Adjudication",
      "description": "ADD DESCRIPTION PLS"
    },
    {
      "name": "In the Name of the Lex Imperialis",
      "description": "For 1 round. the Arbitrator and their allies gain immunity to the prone, stunned, immobilised, and cannot attack effects, as well as to all types of forced movement. Enemies must pass a Willpower resistance test with a penalty or become immobilised until the Arbitrator's next turn."
    },
    {
      "name": "On the Ground!",
      "description": "Enemies hit by the Arbitrator must pass a Toughness resistance test or fall prone for 1 round."
    },
    {
      "name": "Second Shot",
      "description": "This shotgun attack allows the Arbitrator to make two single shots against the target."
    },
    {
      "name": "Shield of the Lex",
      "description": "The Arbitrator chooses an enemy within a 6-cell radius. This cell must be on the same side as the Arbitrator's shield. The damage from that enemy's next successful attack against the Arbitrator will be reduced by --50% and redirected toward the enemy closest to the Arbitrator shielded side.! This ability can only be used with a shield equipped."
    },
    {
      "name": "That's an Order!",
      "description": "The Arbitrator chooses a cell within a 6-cell radius. All enemies within a 3-cell radius around the Arbitrator must make a Willpower resistance test with a penalty.On a failed test, if possible, they immediately move to the designated cell."
    }
  ],
  "Arch-Militant": [
    {
      "name": "Cautions Approach",
      "description": "Whenever the Arch-Militant uses an attack that is of a different type from their previous attack, the Arch-Militant gains a stack of versatility. The types of attacks can be single shot, single melee attack, area melee attack, area shot, or burst. The Arch-Militant gains +3 WS and BS for every stack of versatility. If the Arch-Militant has 4 or more stacks of versatility, the Arch-Militant deals an additional +(10 + WS bonus)% or +(10 + BS bonus)% damage, whichever is highest."
    },
    {
      "name": "Confident Approach",
      "description": "The Arch-Militant gains the confident approach effect until the end of combat, or until this ability is used again, or until using Cautious Approach. Instead of the usual bonuses from versatility, the Arch-Militant gains +3% dodge reduction and parry reduction and ignores 3% of enemy cover for every stack. All the Arch-Militant's attacks score critical hits, but the Arch-Militant's critical damage for those attacks is modified by half. If the Arch-Militant already has 4 or more stacks of versatility, the Arch-Militant's attacks always deal maximum damage, as long as the Arch-Militant keeps the confident approach effect active."
    },
    {
      "name": "Devastating Attack",
      "description": "The Arch-Militant's next attack, if it hit, will cause all the targets to make a Toughness resistance test with a -(2 x Arch-Militant's BS bonus or WS bonus, whichever is higher) penalty. If failed, the targets will suffer a negative effect based on the attack's damage type: - Impact damage knocks the target prone for 1 round. - Piercing and bending damage inflict , bleeding and slowed on the target until the end of combat. - Energy and all other damage inflict blinded on the target until the end of combat. Power swords and power axes count as both energy and bending, while power hammers count as both energy and impact. Attacks that combine several types of damage will benefit from each additional effect."
    },
    {
      "name": "Kick",
      "description": "The Arch-Militant makes a melee attack with a kick, dealing (TGH bonus + STR bonus) damage instead of weapon damage. This attack does not count toward the attack limit per turn and counts as a single melee attack for the purposes of versatility. This attack cannot be parried and will push the target 2 cells away."
    },
    {
      "name": "Reckless Rush",
      "description": "The Arch-Militant immediately gains +(3 + Arch-Militant's AGI bonus) MP. If the Arch-Militant has stacks of versatility, they gain +3 more stacks until the end of turn."
    },
    {
      "name": "Versatility",
      "description": "Whenever the Arch-Militant uses an attack that is of a different type from their previous attack, the Arch-Militant gains a stack of versatility. The types of attacks can be single shot, single melee attack, area melee attack, area shot, or burst shot. The Arch-Militant gains +5 WS and BS for every stack of versatility. If the Arch-Militant has 4 or more stacks of versatility, the Arch-Militant deals an additional +(WS bonus / 2) or +(BS bonus / 2) damage, whichever is highest."
    },
    {
      "name": "Wildfire",
      "description": "The Arch-Militant's next attack will cost 0 AP, will not count toward the attack limit this turn.  The cost of this ability is reduced by -1 for every 4 stacks of versatility (min 1)."
    }
  ],
  "Assassin": [
    {
      "name": "Death Whisper",
      "description": "The Assassin makes an attack that does not count toward the limit of attacks per turn and does not block the Assassin's Movement, but deals only 25% of base damage. If successful, the target of that attack suffers from hemorrhage: At the beginning of each of the target's turn they will suffer (lethality / 10) rending damage that ignores armour and deflection. Lethality: a specific Assassin parameter that is equal to d on or dodge reduction, whichever is higher."
    },
    {
      "name": "Dense Macabre",
      "description": "The Assassin dashes in a straight line for up to (1 + AGI bonus/2) cells, suffering—Assassin's WS bonus less damage from attacks of opportunity and gaining +(2 x Assassin's AGI bonus)% dodge against the enemies they dash through until the next Assassin's turn. If the Assassin hasn't dashed through any enemies, at the end of their turn they gain +(2 x (greater of Assassin's PER and INT bonus))% cover efficiency to their cover until the Assassin moves. Doesn't stack with itself. After the first use, the Assassin can use this ability again for free."
    },
    {
      "name": "Elusive Shadow",
      "description": "For 1 round the Assassin becomes the lowest priority target for enemy attacks and gains Elusive: - the Assassin can move through enemies - the Assassin gains +AGI bonus% dodge and +PER bonus% dodge reduction - the Assassin's attacks deal +10% additional damage - all half cover provides the Assassin 50% cover efficiency. Elusive fades when the Assassin attacks."
    },
    {
      "name": "Feinting Attack",
      "description": "The Assassin's next single-target attack will have a -50% armour penetration penalty, with a minimum of 0% armour penetration, and +10 lethality. - If it's a melee attack, its target rotates 180 degrees. The enemy's dodge and parry against the Assassin's attack is equal to 0% until the start of this enemy's turn. - If it's a ranged attack, its target is forced to move to the closest cell in a 3-cell range with no adjacent cover facing toward the Assassin. This Movement provokes attacks of opportunity."
    },
    {
      "name": "Killing Edge",
      "description": "The Assassin attacks and grants +40% dodge to the target for this attack. If this attack hits, it deals an additional +(lethality / 5) (rounded down) damage increased by twice the percentage of that target's missing wounds. Lethality: a specific Assassin parameter that is equal to dodge or dodge reduction, whichever is higher."
    },
    {
      "name": "Poised to Strike",
      "description": "The Assassin makes an enemy suffer -(2 x Assassin's AGI bonus)% armour and -((greater of Assassin's PER and INT bonus) - 1) deflection until the end of the Assassin's turn. - If there is only 1 enemy adjacent to them, the Assassin also gains +(2 x Assassin's AGI bonus)% dodge until the Assassin's next turn. - If there are no enemies adjacent to the Assassin, they gain +(2 x (greater of PER and INT bonus))% dodge reduction until their next turn."
    },
    {
      "name": "Seek the Opening",
      "description": "The Assassin sees a single opening for each enemy on one of the enemy's sides. Opening: whenever the Assassin hits an opening (excluding overpenetration), they deal an additional +10% of target's max wounds damage. After an attack, the opening is moved to the opposite side of the enemy. Openings of each enemy that were not hit by the Assassin during the Assassin's turn are moved to a random side of that enemy at the start of the Assassin's next turn."
    }
  ],
  "Bladedancer": [
    {
      "name": "Acrobatic Artistry",
      "description": "The Bladedancer immediately returns to the cell where they started their turn. This movement does not provoke attacks of opportunity. If the Bladedancer used Death From Above this turn, this movement repeats all uses of this ability in reverse."
    },
    {
      "name": "Bladedance",
      "description": "The Bladedancer makes (2 + AGI bonus/4) melee attacks against random targets (including allies) adjacent to the Bladedancer, each dealing 50% of their normal damage. Blade Dance is a melee burst attack that does not count toward the attack limit per turn. This ability can only be used with a sword equipped. If two swords are equipped, the Bladedancer makes (1 + AGI bonus/4) attacks with each one."
    },
    {
      "name": "Blood Oath",
      "description": "This ability costs (5 + Bladedancer's level / 2) wounds to use. The Bladedancer targets a single enemy, vowing to dispatch their mark. The Bladedancer's next attack against their selected enemy cannot be dodged or parried. If this attack kills the target, the Bladedancer regains +(5 + 2 x TGH bonus) wounds and gains +1 AP along with an additional attack this turn. This ability can be used multiple times per turn, but it grants +1 AP and an additional attack only once per round."
    },
    {
      "name": "Captive Audience",
      "description": "The Bladedancer's next attack inflicts bleeding (AGI bonus + WS bonus) on all targets hit. These targets must pass a Toughness resistance test with a - (10+ 2 x AGI bonus) penalty or become immobilised for 1 round. All enemies immobilised by Captive Audience count as full cover for the Bladedancer and their allies when adjacent to those enemies."
    },
    {
      "name": "Death from Above",
      "description": "The Bladedancer leaps into the air and lands on the selected cell. Upon landing, they deal (AGI bonus + WS bonus) damage to all adjacent enemies. This leap can be made to any unoccupied cell within a 3-cell radius in the Bladedancer's line of sight. This movement does not provoke attacks of opportunity. The Bladedancer cannot jump to a cell that is inaccessible in combat. This ability can be used multiple times per turn, but each use requires a charge to be spent. The Bladedancer gains +1 charge of this ability each time they kill a target (excluding kills made with Death From Above). This ability can only be used with a sword equipped."
    },
    {
      "name": "Oath of Vengeance",
      "description": "This ability costs (5 + Bladedancer's level /2) wounds to use. The Bladedancer selects an ally. Until the end of combat, attacks made by the Bladedancer against enemies who have already attacked that ally gain +(10+AGI bonus)% critical hit chance and +(20 + 2 x WS bonus)% critical damage. This ability can be used multiple times per turn, but the bonuses do not stack."
    },
    {
      "name": "Veil of Blades",
      "description": "This ability costs (5 + Bladedancer's level / 2) wounds to use. The Bladedancer faces a side of their choice and immediately ends their turn.Until the beginning of the Bladedancer's next turn, they can dodge area attacks without moving, are immune to all types of forced movement, gain +20% parry against attacks from that side, and can now parry attacks made against adjacent allies. While under the effect of Veil of Blades, the Bladedancer can even parry ranged attacks (except ranged area attacks) made from that side. The chance to parry a ranged attack is calculated as if it were a melee attack, where the attacker's Weapon Skill is equal to the hit chance of the attack. If an attack is parried in this way, it can be redirected towards one of the enemies on the selected side. The chance of redirection is equal to half of the Bladedancer's parry chance against this attack. ! This ability can only be used with a sword equipped."
    }
  ],
  "Bounty Hunter": [
    {
      "name": "Claim the Bounty",
      "description": "The Bounty Hunter makes a free single attack with the selected weapon. That attack always hits, does not end the Bounty Hunter's Movement, but deals just (4 x (BS bonus + PER bonus))% of usual damage. After each third enemy killed by Claim the Bounty, the Bounty Hunter recovers +1 charge of Hunt Down the Prey. Prey: if Claim the Bounty kills a target marked as prey, the Bounty Hunter receives +2 AP."
    },
    {
      "name": "Cull the Bold",
      "description": "The Bounty Hunter's next attack this turn will have additional effects: - Deals an additional +BS bonus damage. - Enemy's armour will be reduced by -(3 x target's difficulty tier)% against all the Bounty Hunter's attacks until the end of combat. - If Cull the Bold lowers the enemy's armour below 20%, the enemy's dodge is also decreased by -(3 x target's difficulty tier)% against all the Bounty Hunter's attacks until the end of combat, and the Bounty Hunter's next attack this turn deals an additional +(BS bonus +(greater of PER and INT bonus)) damage. Prey: if the target of the attack is marked as prey, the armour and dodge reduction granted by Cull the Bold also work for the attacks of the Bounty Hunter's allies."
    },
    {
      "name": "Ensnare the Prey",
      "description": "The Bounty Hunter sets a trap on a free cell in a 10-cell radius around them. Any enemy entering the 2-cell radius around that trap activates the trap: - Each enemy in a 2-cell radius around that trap suffers (2 x (greater of Bounty Hunter's PER and INT bonus)) direct damage and must pass an Agility resistance test with a -(2 x (greater of Bounty Hunter's PER and INT bonus)) penalty or become immobilised until the enemy's next turn. - The Bounty Hunter gains +AGI bonus MP at the beginning of their next turn. Prey: a target marked as prey is always immobilised until their next turn."
    },
    {
      "name": "Hot on the Trail",
      "description": "The Bounty Hunter designates an enemy in a 10-cell radius as trailed and finishes the turn. Trailed: All allies gain +20% hit chance against a trailed enemy, +30% if the enemy's difficulty tier is more than or equal to V. If an ally kills a trailed enemy: - The Bounty Hunter gains an additional turn after that ally's turn, with all AP and MP remaining from the moment the Bounty Hunter used Hot on the Trail. - The Bounty Hunter gains an additional +(2 + target's difficulty tier / 2) MP. - The cooldown of Hot on the Trail is reset. When Hot on the Trail is used for the third time during combat, the Bounty Hunter recovers +1 charge of Hunt Down the Prey."
    },
    {
      "name": "Hunt Down the Prey",
      "description": "The Bounty Hunter may mark any enemy in combat as prey. Whenever the Bounty Hunter kills a target marked as prey, they gain a stackable bonus until the end of combat. The bonus depends on the enemy difficulty tier (the roman numeral on the enemy's icon): - I-II: +25% of the Bounty Hunter's maximum wounds as temporary wounds - III-IV: +(10 x prey's difficulty tier) % critical damage and + (2 x prey's difficulty tier)% critical hit chance until the end of combat - V-VII: both of the above  Hunt Down The Prey has 3 charges at the start of combat."
    },
    {
      "name": "Piercing Shot",
      "description": "The Bounty Hunter's next attack during this turn will have +100% overpenetration and +(4 x PER bonus)% armour penetration. Prey: the next attack that hits a target marked as prey is always a critical hit."
    },
    {
      "name": "Raid",
      "description": "Until the Bounty Hunter's next turn whenever an ally attacks a target marked as prey, this attack deals +(2 x Bounty Hunter's PER bonus)% additional damage and gains half of the Bounty Hunter's current bonuses to critical hit chance and critical damage granted by Hunt Down the Prey."
    }
  ],
  "Executioner": [
    {
      "name": "Carnival of Misery",
      "description": "Until the end of combat, all damage dealt to enemies by damage-over-time effects is increased by +100% after all other modifiers. This effect stacks and can be inflicted by more than one Executioner."
    },
    {
      "name": "Exsanguination",
      "description": "The Executioner immediately inflicts bleeding (5) on an ally of their choice (including themselves). That ally gains a +(5 + Medicae / 10)% bonus to dodge and +3 additional MP until bleeding ends for any reason."
    },
    {
      "name": "Gift of Torment",
      "description": "Until the start of their next turn, the Executioner gains bonuses to their parameters for each creature (enemy or ally) in combat suffering from the following damage-over-time effects: Bleeding: +(TGH bonus / 2)% armour per creature Burning: +(TGH bonus / 2)% dodge per creature Toxin: +1 deflection per creature up to a maximum of TGH bonus."
    },
    {
      "name": "Merciless Verdict",
      "description": "The Executioner's next ranged attack or psychic staff ability inflicts a damage-over- time effect on all targets hit. The type of this effect depends on the attack's damage type: Physical damage: inflicts toxin Energy damage: inflicts burning The level of this damage-over-time effect is equal to (minimum weapon damage / 7). This effect is only applied once per target after all other effects from the attack are applied."
    },
    {
      "name": "Pain Resonance",
      "description": "All enemies suffering from damage-over- time effects in a 4-cell radius around the Executioner immediately suffer an extra instance of damage from these effects. They must also pass a resistance test with a -(Medicae / 5) penalty or suffer an additional negative effect. The effect and type of the resistance test depend on the initial damage-over-time effect. Bleeding: Agility resistance test, blinded Burning: Willpower resistance test, slowed Toxin: Toughness resistance test, staggered These additional effects are removed at the start of the Executioner's next turn."
    },
    {
      "name": "Reckless Abandon",
      "description": "The Executioner replaces (30% of their maximum wounds) of their wounds with the same number of temporary wounds until the end of combat. While the Executioner has temporary wounds, all of their melee attacks and damage-over-time effects deal an additional +(30% of their maximum wounds)% damage."
    },
    {
      "name": "Terrifying Strike",
      "description": "The Executioner's next melee attack forces all enemies hit to run away from the Executioner in a straight line for up to 3 cells. During this movement, the targets do not provoke attacks of opportunity and leave a bloody trail on the ground, which remains until the end of combat. Movement through these bloodstained cells costs the Executioner 0 MP."
    },
    {
      "name": "Where It Hurts",
      "description": "If the target of the Executioner's next successful attack is under any damage-over-time effects, this target will immediately suffer 3 instances of damage from each of these effects (2 instances if the Executioner makes a burst or area attack). This damage is dealt after all other effects from the attack are applied. Then, all damage-over-time effects are removed from the target. This ability is applied instead of Scourging Strikes and removes all stacks of Forced Repentance."
    }
  ],
  "Grand Strategist": [
    {
      "name": "Blitz Stratagem",
      "description": "The Grand Strategist chooses one of the Combat Tactics areas. For 1 round, all allies within the range of (Grand Strategist's INT + FEL bonus) cells gain the ability to move to that area. This Movement does not provoke attacks of opportunity and does not spend MP."
    },
    {
      "name": "Combat Locus Stratagem",
      "description": "The Grand Strategist chooses one of the Combat Tactics areas. For 1 round, the targeted area's bonuses are doubled. All other tactical areas are discharged and cannot be used this turn, but can be designated again next round."
    },
    {
      "name": "Combat Tactics",
      "description": "The Grand Strategist analyses the battlefield and can create specific areas providing bonuses to all allies including the Grand Strategist: Frontline, Backline, and Rear. In the first turn, all 3 areas can be created. In the following turn, only one of them can be created. All areas can be moved with the corresponding abilities and cannot overlap. If there are two or more Grand Strategists in the party, the Combat Tactics areas are common for all the Grand Strategists, and the highest INT bonus and FEL bonus of all the Grand Strategists is used. There cannot be more than one Frontline, Backline, or Rear on the battlefield. Regardless of the abilities used, the Grand Strategist always acts first in combat."
    },
    {
      "name": "Killzone Stratagem",
      "description": "The Grand Strategist chooses one of the Combat Tactics areas. For 1 round, all enemies in that area are forced to re-roll successful dodge and parry tests against all attacks. Any enemies that suffer damage and are left with less than (2 x (Grand Strategist's INT + FEL bonus)) wounds, immediately die."
    },
    {
      "name": "Overwhelming Stratagem",
      "description": "The Grand Strategist chooses one of the Combat Tactics areas. For 1 round, all attacks by allies in that area gain covering against any enemy that fails a Willpower resistance test. Covering: Enemies suffer —(5 + 2 x (Grand Strategist's INT + FEL bonus)) Ballistic Skill, -25% rate of fire, and —(5 + (Grand Strategist's INT + FEL bonus)) Weapon Skill during attacks against these allies. Additionally, melee enemies have their MP reduced by -3, and ranged enemies will try to get behind cover. An enemy counts as a melee enemy if they have at least one melee weapon. ! This additional effect does not work on some stronger enemies."
    },
    {
      "name": "Stronghold Stratagem",
      "description": "The Grand Strategist chooses one of the Combat Tactics areas. For 1 round, allies in that area gain +(3 + (Grand Strategist's INT + FEL bonus)/2)% armour, cannot be overpenetrated, gain immunity to the prone effect, and gain +((Grand Strategist's INT + FEL bonus)/4) deflection against area attacks. Additionally, they do not suffer injuries for receiving damage."
    },
    {
      "name": "Trenchline Stratagem",
      "description": "The Grand Strategist chooses one of the Combat Tactics areas. For 1 round, all allies in that area gain +(5 + (Grand Strategist's INT + FEL bonus))% cover efficiency and re-roll all failed characteristic tests. Additionally, cover in the area does not suffer any damage."
    }
  ],
  "Master Tactician": [
    {
      "name": "Assign Objective",
      "description": "The Master Tactician marks an enemy. If that enemy is killed by one of the Master Tactician's allies before the beginning of the Master Tactician's next turn, that ally gains 10+2x (that ally's resolve) momentum and +5 to all characteristics until the end of combat."
    },
    {
      "name": "Fervour",
      "description": "The Master Tactician suffers direct damage equal to 20% of their maximum wounds, gains Master Tactician's resolve stacks of tactical advantage, and resets the cooldown of Linchpin, Inspire, and Strongpoint. Until the end of the Master Tactician's turn, these abilities can only target the Master Tactician themselves."
    },
    {
      "name": "Finish the Job",
      "description": "Can only be used on enemies with the unfinished business effect. This effect is applied to enemies which were attacked by the Master Tactician's allies (but not by the Master Tactician) and have less than 50% of their maximum wounds remaining. The Master Tactician immediately attacks the target with a single shot or strike. This attack does not count toward the attacks per turn limit, dealing half of the weapon's maximum damage and an additional +BS bonus damage."
    },
    {
      "name": "Inspire",
      "description": "The target gains +1 damage and +1 additional damage for every 10 stacks of tactical advantage the Master Tactician has, but the Master Tactician loses half of their stacks of tactical advantage (rounded up). This effect stacks and lasts until the end of combat. If the target uses a heroic act before the beginning of the Master Tactician's next turn, they regain +25 momentum."
    },
    {
      "name": "Linchpin",
      "description": "The target ally or the Master Tactician gains +1 resolve for every 5 stacks of tactical advantage the Master Tactician has, but the Master Tactician loses half of their stacks of tactical advantage (rounded up). This effect stacks and lasts until the end of combat. Until the beginning of the Master Tactician's next turn, the Master Tactician gains stacks of tactical advantage equal to (20 + 3 x Master Tactician's FEL bonus)% of all momentum the target gains (instead of the usual 20%)."
    },
    {
      "name": "Press the Advantage",
      "description": "The Master Tactician empowers their next attack to deal +4% additional damage for every stack of tactical advantage the Master Tactician has, and loses half of their stacks of tactical advantage (rounded up)."
    },
    {
      "name": "Strongpoint",
      "description": "The target gains +2 temporary wounds and +1 additional temporary wound for every 2 stacks of tactical advantage the Master Tactician has, but the Master Tactician loses half of their stacks of tactical advantage (rounded up). Until the beginning of the Master Tactician's next turn, whenever the target loses temporary wounds from damage, the target gains momentum equal to the number of temporary wounds lost."
    },
    {
      "name": "Tactical Advantage",
      "description": "The Master Tactician gains +1 stack of tactical advantage per every 5 momentum gained by the Master Tactician or their allies. The Master Tactician begins combat with the amount of tactical advantage stacks equal to their FEL bonus."
    }
  ],
  "Navigator": [
    {
      "name": "Glimpse of Fate",
      "description": "One friendly creature within a 12-cell radius."
    },
    {
      "name": "Held in My Gaze",
      "description": "The Navigator deals (1 + 2 x Willpower bonus)-(6 + 4 x Willpower bonus) damage to an enemy. That enemy must pass a Willpower resistance test or become immobilised until the start of the Navigator's next turn. immobilised targets do not regain Movement points at the beginning of their turn and cannot use abilities that move them or add Movement points."
    },
    {
      "name": "Immolate the Soul",
      "description": "Deals (3 + 2 x WP bonus)-(10 + 4 x WP bonus) damage to all targets in line and inflicts the soul burn effect. Soul Burn: target suffers (3 + Navigator's WP Bonus) damage at the start of their turn. At the end of their turn, they must pass a Willpower test to remove the flames. When burning, psykers suffer additional damage every time they use psychic powers and daemons — every time they attack or use psychic powers."
    },
    {
      "name": "Mend Reality",
      "description": "The Navigator decreases veil degradation by WP bonus points. All allies gain +WP bonus deflection against all warp damage and damage from psychic powers until the end of the Navigator's next turn."
    },
    {
      "name": "Notch of Purpose",
      "description": "The Navigator designates a square. The enemy closest to that square immediately moves up to 4 cells toward it. If multiple enemies are the same distance from that point, all of them move. The targets move even if they are stunned or immobilised."
    },
    {
      "name": "Point of Curiosity",
      "description": "All enemies in a 6-cell radius around the target point must pass a Willpower resistance test or immediately move 3 cells toward that point. The targets move even if they are stunned or immobilised."
    },
    {
      "name": "Reveal the Light",
      "description": "The target ally gains 10+(2 x Navigator's WP bonus) to their Willpower and Toughness until the end of the combat."
    },
    {
      "name": "Scourge of the Red Tide",
      "description": "Creates a 3x3 zone. Every creature that is in it, enters it, or begins their turn in the area, suffers (1 + Navigator's WP bonus)-(4 + 2 x Navigator's WP bonus) damage. The zone remains for 3 rounds or until the Navigator casts it again."
    },
    {
      "name": "Show the Path",
      "description": "This ability can only target allies that have at least one melee weapon in one of their weapon sets. The target immediately gains an additional turn during which they gain the ability to use Charge and only this ability. Charge (0 AP): Allows the target ally to dash in a straight line by 6 cells. If they collide with a creature during that Movement, they attack that creature (even if it is an ally) with their melee weapon."
    },
    {
      "name": "Spot of Apathy",
      "description": "The Navigator creates a circle with a 3-cell radius. Any creature that is inside it, enters it, or ends their turn inside, not under the effect of apathy, makes a Willpower resistance test. Failure applies the Apathy effect to the creature. Apathy: The target is immobilised. After one round passes under the effect of apathy, the target must pass a Willpower resistance test. Success removes apathy. Failure makes the creature unable to dodge or perform attacks of opportunity until the end of its next turn. After one round passes under the effect of apathy, the target must make a Willpower resistance test. Success removes apathy. Failure stuns the creature for 1 round, removes apathy, and makes the creature immune to further effect form Spot of Apathy until the end of the combat."
    },
    {
      "name": "Vigil Beyond Time",
      "description": "The first use on any target marks it with the under the Navigator's watch effect. Enemy targets must pass a Willpower resistance test to avoid this. The second use returns the target to the position where it was during the first use and restores its wounds to the state they were at during that time. If this cell is occupied or unreachable from their current position, they move to the next closest cell in the direction of the Navigator."
    },
    {
      "name": "Waking Nightmare",
      "description": "All enemies within a 4-cell radius circle suffer a -(10 + 2 x Navigator's WP bonus) penalty to their Willpower and Toughness until the end of the combat."
    },
    {
      "name": "Warp Curse Unleashed",
      "description": "The enemy becomes cursed until the end of combat. Cursed: all incoming warp damage is increased by +(10 + 2 x Navigator's WP bonus)% and other types of incoming damage are increased by +(5 + Navigator's WP bonus)%. At the start of their turn, the enemy closest to them also becomes cursed."
    },
    {
      "name": "Zone of Fear",
      "description": "All units in a 3x3 zone must pass a Willpower resistance test or immediately move out of the zone, even if they are stunned or immobilised. This Movement triggers attacks of opportunity from the Navigator's allies that have passed the test or that are outside the zone."
    }
  ],
  "Officer": [
    {
      "name": "Air of Authority",
      "description": "The Officer increases an ally's Resolve by a Resolve until the end of combat. If the target is under the effect of Voice of Command, they will start their next turn with 1 additional action point."
    },
    {
      "name": "Break Their Ranks!",
      "description": "This ability can only target allies who have enemies adjacent to them. Until the start of the Officer's next turn all melee attacks made by the target deal additional damage equal to (Officer's FEL bonus/ 2) multiplied by the number of enemies adjacent to the target when this ability is used. If the target is under the effect of Voice of Command, they immediately make an attack of opportunity against an adjacent enemy, targeting the one with the lowest remaining wounds."
    },
    {
      "name": "Bring It Down!",
      "description": "The Officer immediately grants an ally an extra turn with action points equal to 2 and no movement points. If the ally is under the effect of Voice of Command and kills an enemy before the end of the Officer's turn, the ally gains a one-time additional +(2 x ally's resolve) momentum."
    },
    {
      "name": "Get Back in the Fight!",
      "description": "The Officer encourages a target ally to immediately recover from burning, bleeding, toxin and stun effects. If the target is under Voice of Command effect, it gains +2×(Officer's WP bonus) temporary Wounds."
    },
    {
      "name": "Move, Move, Move!",
      "description": "The Officer immediately grants an ally additional Movement points equal to FEL bonus. If the target is under the effect of Voice of Command, it ignores attacks of opportunity until the end of the Officer's turn."
    },
    {
      "name": "Take Aim!",
      "description": "The target's next attack will ignore cover and will have double the effective distance. If the target is under the effect of voice of command, this attack will ignore enemy dodge. Additionally, the damage from this attack can't be reduced below (30 + 3 x FEL bonus)% for any reason."
    },
    {
      "name": "Voice of Command",
      "description": "The Officer forces an ally to fully push themselves, increasing their characteristics by +(5 + 2 x Officer's FEL bonus) for 1 round. Additionally, all of the Officer's abilities can be applied to the target of Voice of Command from any distance. A character who becomes the target of Voice of Command cannot be targeted by this ability again for the next 2 rounds."
    }
  ],
  "Operative": [
    {
      "name": "Analyse Enemies",
      "description": "The Operative targets one enemy within line of sight. That target immediately gains +(1 + INT bonus / 2) exploits."
    },
    {
      "name": "Expose Weakness",
      "description": "The Operative removes all exploits from the target to decrease the target's dodge, parry, and armour by -(15 + exploits stacks x PER bonus)% until the start of the Operative's next turn. If this ability reduces the target's armour to 0, the Operative only removes only half of the exploits from the target."
    },
    {
      "name": "Intimidation",
      "description": "The Operative's next non-area attack inflicts the intimidated effect on the first target hit by the attack and all enemies in a 5-cell radius around that target. The damage dealt by intimidated enemies is reduced by -(5 + PER bonus/2)% until the Operative's next turn. This negative effect is doubled for enemies with less than (3 x INT bonus)% armour."
    },
    {
      "name": "Joint Analysis",
      "description": "Until the Operative's next turn, their allies' attacks also remove exploits and deal +INT bonus more damage."
    },
    {
      "name": "Perfect Shot",
      "description": "While in cover, the Operative gains +25% cover efficiency, +15 Perception, and +15 Ballistic Skill. This effect lasts until the Operative moves. Does not stack."
    },
    {
      "name": "Precise Attack",
      "description": "For the next attack against a target affected by an exploit, that target's cover efficiency will be reduced by -(15 + (PER bonus/3 x stacks of exploit))%. This attack will have +(15 + PER bonus/3- x stacks of exploit)% hit chance."
    },
    {
      "name": "Tactical Knowledge",
      "description": "The Operative removes -1 exploit from each enemy in a 5-cell radius around a point within 10 cells from the Operative. If there is only one enemy in the area, the Operative removes all exploit stacks from that enemy. All allies gain +(number of removed exploits)% armour until the end of combat. If 4 or more exploits are removed, the Operative gains +(2 x number of removed exploits)% damage until the end of combat."
    }
  ],
  "Overseer": [
    {
      "name": "Apprehend!",
      "description": "The Overseer chooses an enemy in their line of sight. The cyber-mastiff immediately attempts to run to that enemy. If it does not have enough MP, it moves as close to that enemy as possible. Upon reaching the designated target, the cyber-mastiff makes a melee attack, dealing +50% more damage and inflicting the apprehended effect, which lasts as long as the enemy and the cyber-mastiff are adjacent to each other or until another order is given. This ability can be used multiple times per turn, but each subsequent use within a round increases its cost by +1 AP."
    },
    {
      "name": "Battle Mode: Standby",
      "description": "The Overseer orders the cyber-mastiff to fight autonomously It gains the battle mode:standby effect until the end of combat or until a new order is given."
    },
    {
      "name": "Bite",
      "description": "The Overseer chooses an enemy in their ine of sight within cells of the cyber-mastiff. The cyber-mastiff immediately dashes to that enemy and performs a special attack. The target suffers double rending damage and must pass a Toughness  resistance test with a - penalty or fall prone for 1 round. This ability removes the effects of the Apprehend! and Protect! abilities."
    },
    {
      "name": "Blinding Strike",
      "description": "The Overseer selects an unoccupied cell in their line of sight. The cyber-eagle lands at that cell losing the soaring effect. It deals three times its weapon damage to all adjacent enemies without provoking attacks of opportunity. Those enemies must pass an Agility resistance test with a penalty or become blinded for 1 round."
    },
    {
      "name": "Consolidation",
      "description": "The Overseer immediately dashes to their familiar within X cells.T he Overseer can move through allies and enemies but not through obstacles. This movement does not provoke attacks of opportunity. If the familiar is a cyber-eagle that is soaring,the Overseer gains +X MP instead."
    },
    {
      "name": "Dangerous Neighborhood",
      "description": "The servo-skull swarm gains +10 Fellowship. At the start of the Overseer turn,enemies adjacent to the servo-skull swarm must pass a Willpower resistance test with a +20 bonus or suffer +1 stack of perplexed. The servo-skull swarm's deflection is increased by +1 for each perplexed enemy in a 4-cell radius."
    },
    {
      "name": "Extrapolation",
      "description": "Whenever the Overseer uses non-attacking single-target abilities (except psychic powers, Navigator abilities and those granting extra turns) on their servo-skull swarm, they are applied to all relevant targets (allies or enemies) in a 4-cell radius around it, having no effect on the servo-skull swarm itself If the Overseer uses an ability granting an extra turn to an ally in that area (except Finest Hour), the closest ally to the initial target also gains an extra turn."
    },
    {
      "name": "Growl!",
      "description": "The cyber-mastiff lets out a terrifying growl.For 1 round, all enemies in a 2-cell radius deal X% less damage to the cyber-mastiff, the Overseer, and their allies."
    },
    {
      "name": "Halt Relay",
      "description": "The Overseer commands their psyber-raven to stop relaying."
    },
    {
      "name": "Heel!",
      "description": "If the cyber-mastiff is apprehending, it regains 50% of its maximum wounds. protecting, the protected ally gains XX temporary wounds. In battle mode: standby. its next attack scores a guaranteed critical hit. Then, the cyber-mastiff moves to a cell adjacent to its Overseer and begins waiting."
    },
    {
      "name": "Law of Equilibrium",
      "description": "The psyber-raven gains +15 Willpower At the end of the Overseer's turn, allies in a 4-cell radius around the psyber-raven have their burning,toxin and bleeding level reduced by-XX and enemies in that area suffering any of those effects have their level increased by + XX."
    },
    {
      "name": "Life Emanations",
      "description": "Whenever the psyber-raven relays one of the Overseer's non-attacking psychic powers, it gains +5 Willpower for 1 round. If the psyber-raven's Willpower is 80 or more at the end of the Overseer's turn, it immediately heals to full. If it is already at full wounds, it grants +1 resolve to each ally in a 4-cell radius."
    },
    {
      "name": "Live Bait",
      "description": "The Overseer chooses an ally within their line of sight and grants them XX stacks of the bait effect"
    },
    {
      "name": "Obstruct Vision",
      "description": "The Overseer chooses an enemy in their line of sight and an unoccupied cell adjacent to it The cyber-eagle moves to that cell (can move through occupied cells) without provoking attacks of opportunity. If the designated enemy only has a melee weapon, it attacks the cyber-eagle, using the lowest AP-cost attack. If that enemy has a ranged weapon, it shoots at the cyber-eagle, using the lowest AP-cost attack,with an additional +50% chance to hit that enemy's allies (if there are any within a cone behind the cyber-eagle) Then, the cyber-eagle attacks this enemy, dealing +XX% more damage and spending 0 AP. While the cyber-eagle is in that cell, the designated enemy is obstructed. This ability can be used multiple times per turn, but each subsequent use within a round increases its cost by +1 AP until the end of round."
    },
    {
      "name": "Overcharge",
      "description": "The cyber-mastiff immediately heals to full wounds (even if it has 0 wounds. The Overseer's next three abilities cost-1 AP less. Until the end of combat, the cyber-mastiff deals additional damage equal to +XX% of target's maximum wounds."
    },
    {
      "name": "Protect!",
      "description": "The Overseer chooses an ally in their line of sight(can be themselves). The cyber-mastiff immediately attempts to run to that ally. If it does not have enough MP, it moves as close to that ally as possible. Upon reaching them, the cyber-mastiff applies protected to them and makes a melee area attack against adjacent enemies. The protected effect lasts until the cyber-mastiff or the targeted ally's wounds drop to 0 or until another order is given. When used on the Overseer for the first time in combat, the Overseer regains 1 AP."
    },
    {
      "name": "Relocate",
      "description": "The Overseer commands their psyber-raven to immediately move up to XX cells. It can move through occupied cells and does not trigger attacks of opportunity."
    },
    {
      "name": "Soar!",
      "description": "At the end of the Overseer's turn, the cyber-eagle soars high above the battlefield. This action does not provoke attacks of opportunity."
    },
    {
      "name": "Strafe",
      "description": "The Overseer selects a cell within their line of sight in a 12-cell radius around the cyber-eagle and another unoccupied cell within XX cells from the first one. The cyber-eagle moves to the first cell and then dashes to the second cell in a straight line, dealing its weapon damage to each enemy in its path without provoking attacks of opportunity."
    },
    {
      "name": "Strategic Adaptation",
      "description": "Depending on their familiar's number of wounds, the overseer or the familiar gains a special benefit for 1 round.  Less than 50% wounds: the next 3 hits against the familiar have their damage reduced by XX 50% wounds or more: the Overseer deals + XX% more damage per turn, and the Overseer regains any AP spent on it."
    },
    {
      "name": "Thermodynamic Protocol",
      "description": "The servo-skull swarm gains +20 intelligence. At the start of the Overseer's turn, allies in a 4-cell radius around the servo-skull swarm have their burning, toxin, and bleeding level reduced by X At the end of the Overseer's turn, their servo-skull swarm explodes mimicking the effects of fire grenade."
    },
    {
      "name": "Warp Relay",
      "description": "Whenever the Overseer uses non-attacking single-target psychic powers (except those granting extra turns) on their psyber-raven, they are applied to all relevant targets (allies or enemies) in a 4-cell radius around it, having no effect on the psyber-raven itself. Enemies in a 4-cell radius around the psyber-raven are under surveillance."
    }
  ],
  "Psyker": [
    {
      "name": "Biomancy",
      "description": "Biomancy focuses on manipulating living flesh and biological processes. Biomancers can heal wounds and alter physical characteristics."
    },
    {
      "name": "Divination",
      "description": "Divination specializes in gleaning information and using it to turn fortune in your favour. Diviners find useful insights everywhere, manifesting extrasensory abilities and glimpsing the future."
    },
    {
      "name": "Pyromancy",
      "description": "A pyromancer is a master of flame, a psyker who is able to create searing infernos out of thin air. Pyromancy is one of the most spectacular and destructive forms of psychic ability, and those who face a pyromancer in combat are oft reduced to nought but a pile of charred bones."
    },
    {
      "name": "Sanctic Powers",
      "description": "A concentration of faith, sanctic powers are used by pious psykers to protect allies and smite heretics."
    },
    {
      "name": "Telepathy",
      "description": "Telepaths are psykers whose mental expertise lies in contacting and controlling the minds of others. With a single thought, a telepath can tear away his foe's sanity, induce states of numbing terror, or possess his victim's thoughts and mould their actions as if they were his own."
    }
  ],
  "Biomancer": [
    {
      "name": "Enfeeble",
      "description": "Until the end of combat, all targets within the area suffer a -(5 + 3 X psy rating) penalty to Strength and Agility and +(3 + 2 X psy rating)% increase to all incoming damage."
    },
    {
      "name": "Invigorate",
      "description": "Restores (2 X psyker's psy rating + WP bonus) wounds to the target. If this ability brings the target to full wounds, this power also removes all stunned, bleeding, fatigued, blinded, immobilised, staggered, and fresh injury effects from the target."
    },
    {
      "name": "Metabolic Overcharge",
      "description": "The target ally immediately gains an extra turn with twice the number of their normal MP and psyker's psy rating AP, but their organism is subjected to severe stress, making them suffer 5% of their maximum wounds damage at the end of each turn until the end of combat. Every action the target makes during this extra turn will also trigger this damage."
    },
    {
      "name": "Regeneration",
      "description": "Until the end of combat, the target recovers +(psyker's psy rating + WP bonus / 2) wounds at the beginning of each of their turns and removes one toxin, stunned, immobilised, bleeding, blinded, staggered, or fatigued effect. If the target has several effects, the removed effect is selected randomly."
    },
    {
      "name": "Warp Speed",
      "description": "Until the end of combat, the target ally increases their MP by +(3 + psyker's psy rating), their Agility by +(3 + psyker's psy rating), and their AP by +1."
    }
  ],
  "Diviner": [
    {
      "name": "Foreboding",
      "description": "Creates an area that lasts until the start of the psyker's next turn. All allies within that area gain +(3 x psyker's psy rating)% Their dodge chance cannot be less than (psyker's PER bonus + WP bonus)%."
    },
    {
      "name": "Perfect Timing",
      "description": "All allies that are currently affected by any of the psyker's powers gain the perfect timing effect. Perfect Timing: when an ally under this effect dodges or parries an attack, if this ally has a weapon capable of reaching the attacker and has an attack that costs 1 or less AP, that ally immediately counterattacks with this weapon, and the perfect timing effect fades."
    },
    {
      "name": "Precognition",
      "description": "Once per round, the psyker's next turn is moved up by 2 turns in the round initiative sequence. This ability may allow the psyker to have 2 turns during one round."
    },
    {
      "name": "Prescience",
      "description": "The target gains +(4 + 2 x psy rating) Intelligence, Perception, Fellowship, and Willpower until the end of combat."
    },
    {
      "name": "Prophetic Intervention",
      "description": "Whenever an ally suffers damage that would make them fall unconscious, the psyker immediately gains an extra turn. During that turn, the psyker can only use Prophetic Intervention. This power can only be used under these conditions. Prophetic Intervention restores the ally's wounds to the amount they had before the attack that triggered the intervention. However, the psyker's psy rating is reduced by -1 until the end of combat. ! This power can only be used by psykers with a psy rating of 3 or higher."
    }
  ],
  "Pyromancer": [
    {
      "name": "Firestorm",
      "description": "This psychic power only impacts creatures suffering from warp burn or burning. Everyone adjacent to the target point suffers the effects of the Ignite psychic power."
    },
    {
      "name": "Ignite",
      "description": "The target suffers (1 + psyker's WP bonus + 6 X psy rating) - (2 X psyker's WP bonus + 10 X psy rating) damage and gains the warp burn effect. This attack has (5 X psy rating)% armour penetration. Warp Burn: deals (psyker's WP bonus + 2 X psy rating) damage to the target at the end of their turn, with (5 X psy rating)% armour penetration. The target creature must pass an Agility test with a -(5 X psyker's psy rating) penalty to stop burning."
    },
    {
      "name": "Incinerate",
      "description": "The target suffers double the damage the Ignite psychic power and half the fire damage of all the burning creatures within line of sight of the target."
    },
    {
      "name": "Inflame",
      "description": "Until the end of combat, all burning conditions will deal +(2 X psy WB) more damage. Every burning creature in combat immediately suffers damage."
    },
    {
      "name": "Molten Beam",
      "description": "Deals double the damage of Ignite to all creatures in a 12-cell line and reduces their armour by -(10 + 2 X psy rating)% until the end of combat. If the enemy's armour falls to 0, it gains the warp burn effect. Warp Burn: Deals (psyker's WP bonus + 2 X psy rating) damage to the target at the end of their turn, with (5 X psy rating)% armour penetration. The target creature must pass an Agility test with a -(5 X psyker's psy rating) penalty to stop burning."
    },
    {
      "name": "Orchestrate Flames",
      "description": "The target does not stop burning and no longer makes tests to stop burning. Additionally, if the target is an ally, every melee attack that ally makes inflicts full burning damage on targets of their attack, while they themselves now only suffer half burning damage from now on."
    }
  ],
  "Sanctic": [
    {
      "name": "Hammer of the Emperor",
      "description": "All allies affected by Word of the Emperor gain the Hammer of the Emperor effect. Next time they deal damage, this damage is increased by +(5 X psyker's psy rating + ally's resolve), and the effect is removed. ! This psychic power can only be used while there is at least one ally affected by Word of the Emperor."
    },
    {
      "name": "Light of the Emperor",
      "description": "All allies affected by Word of the Emperor are healed for (1 + psyker's psy rating + ally's resolve)-(10 + psyker's psy rating + ally's resolve) wounds. ! This psychic power can only be used while there is at least one ally affected by Word of the Emperor."
    },
    {
      "name": "Purge Soul",
      "description": "Deals (1 + (psyker‘s psy rating + 1) X resolve / 4) - (4 + (psyker's psy rating + 1) X resolve / 4) direct damage. This damage is increased by +50% against xenos, by +100% against Chaos worshippers or Drukhari, by +150% against daemons, and by +50% if the enemy has already damaged the psyker or any of the psyker's allies this combat. These damage bonuses also affect any damage bonuses from other sources. ! This power does not affect targets that lack souls."
    },
    {
      "name": "Shield of the Emperor",
      "description": "Until the start of the psyker's next turn, all allies affected by Word of the Emperor increase their deflection by +(psyker's psy rating / 2) (minimum 1) and armour by +(10 + 2 X ally's resolve). ! This psychic power can only be used while there is at least one ally affected by Word of the Emperor."
    },
    {
      "name": "Sword of Faith",
      "description": "This psychic power costs 50 momentum and can only be used when momentum is 175 or higher. Until the end of combat, the weapon in the psyker's hand is replaced by a sword made of sheer will. - This sword has a single-target attack and an area attack (like a two-handed sword) and can be used to release a cone of fire or a line of fire (like a flamethrower). - The damage of this sword is the same as that of Purge Soul (with all the same bonuses). - If the psyker used a force weapon, all the bonuses from that force weapon remain. For the purposes of talents and other bonuses, the Sword of Faith."
    }
  ],
  "Telepath": [
    {
      "name": "Dominate",
      "description": "The target must pass a Willpower resistance test with a -(5 X psy rating) penalty, or at their next turn they will spend all their movement points to move as close as possible toward the psyker. They can act as normal, but all their MP are spent on moving toward the psyker. At the end of their turn, the target must make the Willpower resistance test again, otherwise they remain under this effect."
    },
    {
      "name": "Mind Bond",
      "description": "At any time until the end of combat, the target of Mind Bond makes Perception, Intelligence, Willpower, or Fellowship tests using either theirs or the psyker's stats, whichever is higher at the moment."
    },
    {
      "name": "Mind Rupture",
      "description": "The target makes a Willpower resistance test. If that test fails, the target immediately attacks its allies. After, the target suffers damage from Psychic Shriek, and their Willpower is reduced by -(10 + 2 x psyker's psy rating) until the end of combat. If the test succeeds, the target just suffers damage from Psychic Scream, and their Willpower is reduced by -(10 + 2 x psyker's psy rating) until the end of combat."
    },
    {
      "name": "Psychic Assault",
      "description": "Everyone within a 7-cell radius cone in front of the psyker suffers Psychic Shriek damage and is forced to make a Willpower resistance test. All targets that fail that test are stunned until the psyker's next turn."
    },
    {
      "name": "Psychic Shriek",
      "description": "Deals (1 + (psyker's WP Bonus x psy rating))-(8 + (psyker's WP Bonus x psy rating)) damage to the target."
    },
    {
      "name": "Sensory Deprivation",
      "description": "The target makes a Willpower resistance test. If it succeeds, the target is merely blinded until the start of the psyker's next turn. If the target fails the test, they become blinded and suffer an additional -(5 x psy rating) penalty to all characteristics reduced by blindness and must make a Willpower resistance test at the end of each turn. The first success makes them just blinded, and second success removes the blinded effect."
    }
  ],
  "Soldier": [
    {
      "name": "Concentrated Fire",
      "description": "The next ranged area attack made by the Soldier deals +((50 + 10 x BS bonus) / number of enemies in the area of effect)% damage and has an additional +(10 + 2 x BS bonus)% dodge reduction."
    },
    {
      "name": "Controlled Shot",
      "description": "The Soldier gives a sign that they are about to open fire. The Soldier and their allies will automatically dodge the Soldier's next attack."
    },
    {
      "name": "Dash",
      "description": "The Soldier immediately dashes in the selected direction, spending all their Movement points. Does not provoke attacks of opportunity. Allows the Soldier to dash through allies and enemies but not through obstacles. Can only be used once per round."
    },
    {
      "name": "Entrench",
      "description": "The Soldier immediately spends all their AP and MP and gains a +30% bonus to cover efficiency. The next time the Soldier uses Run and Gun, they gain back all spent AP and MP plus 1 additional AP. It also resets the 7 cooldown of all other Soldier's abilities except for Run and Gun."
    },
    {
      "name": "Rapid Fire",
      "description": "The Soldier's next burst attacks will have its rate of fire doubled but deal -25% less damage. All the shots will follow random trajectories. Only works with weapons capable of burst fire."
    },
    {
      "name": "Revel in Slaughter",
      "description": "The Soldier immediately removes the winded effect. Until the end of combat, the Soldier gains the following bonuses: - +10 Ballistic Skill - +(5 + 2 x AGI bonus)% critical damage - +AGI bonus% critical hit chance This ability becomes available after the Soldier kills 3 enemies. The kill counter is not reset between rounds."
    },
    {
      "name": "Run and Gun",
      "description": "The Soldier gains +(2 + AGI bonus / 2) MP. Their next attack costs -1 AP less and does not count toward the attack limit per turn. Until the end of the next turn, the Soldier becomes winded. While winded, the Soldier suffers a -10 penalty to Skill and cannot use Run and Gun."
    }
  ],
  "Vanguard": [
    {
      "name": "Bulwark",
      "description": "Until the start of their next turn, the Vanguard gains damage deflection against ranged attacks equal to the number of stacks of unyielding beacon on the Vanguard. Additionally, the Vanguard becomes immune to push and forced Movement effects until their next turn."
    },
    {
      "name": "Defensive Stance",
      "description": "The Vanguard gains +(10 + 2 x number of unyielding beacon stacks)% parry until their next turn. Whenever the Vanguard parries an enemy's attack, they immediately make an attack of opportunity with a -20 penalty to Weapon Skill against that enemy."
    },
    {
      "name": "Follow My Lead",
      "description": "Until the start of their next turn, the Vanguard gains +(10 + 2 x FEL bonus)% damage and +(10 + 2 x FEL bonus)% , armour penetration against enemies in a 2-cell radius around the Vanguard. Additionally, when the ability is cast, all allies in a 2-cell radius around the Vanguard gain the Following! ability until the start of the Vanguard's next turn. Following! (0 AP, 2 MP): The character can move to any cell adjacent to the Vanguard without provoking attack of opportunity."
    },
    {
      "name": "Forced Distraction",
      "description": "The Vanguard chooses an ally. All enemies in a 3-cell radius around this ally must make a Willpower resistance test with a -(5 x Vanguard's FEL bonus) penalty. On a failed test, the Vanguard becomes their priority target. Regardless of the Willpower resistance test results, the chosen ally does not provoke attack of opportunity from these enemies, can shoot enemies in melee range, and move as if not within range of attacks of opportunity."
    },
    {
      "name": "Provocation",
      "description": "The Vanguard forces an enemy in their melee range to immediately attack the Vanguard. All of the Vanguard's allies who are wielding melee weapons and adjacent to the enemy make an attack of opportunity against that enemy. The enemy suffers +FEL bonus more damage from these attacks of opportunity and has a -(10 + 2 x Vanguard's FEL bonus)% penalty to parry and dodge."
    },
    {
      "name": "Unyielding Beacon",
      "description": "Each attack against the Vanguard grants them +1 stack of unyielding beacon. Each stack increases their resolve by +1, up to a maximum of +15. All allies in a 2-cell radius around the Vanguard gain 1/5 of that bonus. Temporary wounds applied to the Vanguard now stack, but only remain stacked until the start of the Vanguard's turn. At the start of their turn, the remaining temporary wounds are reduced to the largest amount granted by one applied effect. If the remaining number of temporary wounds is less than the number of stacks of unyielding beacon, it becomes equal to the number of those stacks even if the Vanguard has no temporary wounds at the start of their turn."
    },
    {
      "name": "Wall of Rockcrete",
      "description": "The Vanguard and all their allies in a 3-cell radius around them gain +(3 + number of unyielding beacon stacks) temporary wounds. All affected allies gain -50% less damage from the next attack. The effect lasts until the start of the Vanguard's next turn."
    }
  ],
  "Warrior": [
    {
      "name": "Break Through",
      "description": "The Warrior gains the Slash ability with (AGI bonus / 2) charges for this round. Slash cannot be used in the same round as Charge. Slash (0 AP): The Warrior dashes through an enemy to the cell on the enemy's opposite side and makes a melee attack with -50% reduced damage. - Can be applied only once for one target per round. - Does not provoke an attack of opportunity."
    },
    {
      "name": "Charge",
      "description": "The Warrior moves in a straight line and launches a melee attack against any target in the Warrior's path. This attack does not count toward the limit of the Warrior's attacks per turn. There must be at least 2 free cells between the Warrior and the target to use Charge."
    },
    {
      "name": "Endure",
      "description": "Until the Warrior's next turn, all incoming damage is reduced by - (TGH bonus/2) and the Warrior gains +(10 + Character Level/6) temporary wounds."
    },
    {
      "name": "Forceful Strike",
      "description": "The Warrior gathers all their strength for a crushing strike. Their next melee attack pushes the enemy away. The distance of that push is equal to (1 + Strength bonus / 2) cells."
    },
    {
      "name": "Reckless Strike",
      "description": "The Warrior's next melee attack gains +(5 x STR bonus)% armour penetration and +(2 x STR bonus) damage and ignores (3 x WS bonus)% of the target's parry. Every enemy who survives an attack enhanced by this ability will attack the Warrior in return, including creatures with ranged weapons."
    },
    {
      "name": "Sworn Enemy",
      "description": "The Warrior marks a target, gaining +(10 + 2 x TGH bonus)% armour and +(2 + STR bonus) damage on melee attacks against that target. If the target attacks the Warrior during this round, the Warrior gains +1 AP (once per round)."
    },
    {
      "name": "Taunting Scream",
      "description": "The Warrior screams at their enemies to draw their attention and becomes a priority target of any enemy who fails a Willpower resistance test."
    }
  ]
}

export const talents: Record<string, { name: string, description: string }[]> = {
  "Common": [
    {
      "name": "AS: Athletics",
      "description": "The character gains +13 Athletics. The character can also reroll failed skill tests (+1 attempt for each test)."
    },
    {
      "name": "AS: Awareness",
      "description": "The character gains +13 Awareness. The character can also reroll failed skill tests (+1 attempt for each test)."
    },
    {
      "name": "AS: Carouse",
      "description": "The character gains +13 Carouse. The character can also reroll failed skill tests (+1 attempt for each test)."
    },
    {
      "name": "AS: Coercion",
      "description": "The character gains +13 Coercion. The character can also reroll failed skill tests (+1 attempt for each test)."
    },
    {
      "name": "AS: Commerce",
      "description": "The character gains +13 Commerce. The character can also reroll failed skill tests (+1 attempt for each test)."
    },
    {
      "name": "AS: Demolition",
      "description": "The character gains +13 Demolition. The character can also reroll failed skill tests (+1 attempt for each test)."
    },
    {
      "name": "AS: Logic",
      "description": "The character gains +13 Logic. The character can also reroll failed skill tests (+1 attempt for each test)."
    },
    {
      "name": "AS: Lore (Imperium)",
      "description": "The character gains +13 Lore (Imperium). The character can also reroll failed skill tests (+1 attempt for each test)."
    },
    {
      "name": "AS: Lore (Warp)",
      "description": "The character gains +13 Lore (Warp). The character can also reroll failed skill tests (+1 attempt for each test)."
    },
    {
      "name": "AS: Lore (Xenos)",
      "description": "The character gains +13 Lore (Xenos). The character can also reroll failed skill tests (+1 attempt for each test)."
    },
    {
      "name": "AS: Medicae",
      "description": "The character gains +13 Medicae. The character can also reroll failed skill tests (+1 attempt for each test)."
    },
    {
      "name": "AS: Persuasion",
      "description": "The character gains +13 Persuasion. The character can also reroll failed skill tests (+1 attempt for each test)."
    },
    {
      "name": "AS: Tech-Use",
      "description": "The character gains +13 Tech-Use. The character can also reroll failed skill tests (+1 attempt for each test)."
    },
    {
      "name": "Aeldari Weapon Proficiency",
      "description": "Allows the character to use Aeldari weapons, such as Aeldari long rifle, shuriken catapult, and others."
    },
    {
      "name": "BS: Athletics",
      "description": "The character gains +7 Athletics. The character may improve this skill even if their archetype or origin does not allow it."
    },
    {
      "name": "BS: Awareness",
      "description": "The character gains +7 Awareness. The character may improve this skill even if their archetype or origin does not allow it."
    },
    {
      "name": "BS: Carouse",
      "description": "The character gains +7 Carouse. The character may improve this skill even if their archetype or origin does not allow it."
    },
    {
      "name": "BS: Coercion",
      "description": "The character gains +7 Coercion. The character may improve this skill even if their archetype or origin does not allow it."
    },
    {
      "name": "BS: Commerce",
      "description": "The character gains +7 Commerce. The character may improve this skill even if their archetype or origin does not allow it."
    },
    {
      "name": "BS: Demolition",
      "description": "The character gains +7 Demolition. The character may improve this skill even if their archetype or origin does not allow it."
    },
    {
      "name": "BS: Logic",
      "description": "The character gains +7 Logic. The character may improve this skill even if their archetype or origin does not allow it."
    },
    {
      "name": "BS: Lore (Imperium)",
      "description": "The character gains +7 Lore (Imperium). The character may improve this skill even if their archetype or origin does not allow it."
    },
    {
      "name": "BS: Lore (Warp)",
      "description": "The character gains +7 Lore (Warp). The character may improve this skill even if their archetype or origin does not allow it."
    },
    {
      "name": "BS: Lore (Xenos)",
      "description": "The character gains +7 Lore (Xenos). The character may improve this skill even if their archetype or origin does not allow it."
    },
    {
      "name": "BS: Medicae",
      "description": "The character gains +7 Medicae. The character may improve this skill even if their archetype or origin does not allow it."
    },
    {
      "name": "BS: Persuasion",
      "description": "The character gains +7 Persuasion. The character may improve this skill even if their archetype or origin does not allow it."
    },
    {
      "name": "BS: Tech-Use",
      "description": "The character gains +7 Tech-Use. The character may improve this skill even if their archetype or origin does not allow it."
    },
    {
      "name": "Bolt Weapon Expert",
      "description": "Bolt weapon attacks gain +10% armour penetration."
    },
    {
      "name": "Bolter Weapon Proficiency",
      "description": "Allows the character to use bolt weapons, such as bolter or bolt pistol."
    },
    {
      "name": "Chain Weapon Expert",
      "description": "Chain weapon attacks gain +4 maximum damage."
    },
    {
      "name": "CT: Agility",
      "description": "The character gains +5 Agility. The character may improve any trained characteristic even if their archetype or origin does not allow it."
    },
    {
      "name": "CT: Ballistic Skill",
      "description": "The character gains +5 Ballistic Skill. The character may improve any trained characteristic even if their archetype or origin does not allow it."
    },
    {
      "name": "CT: Fellowship",
      "description": "The character gains +5 Fellowship. The character may improve any trained characteristic even if their archetype or origin does not allow it."
    },
    {
      "name": "CT: Intelligence",
      "description": "The character gains +5 Intelligence. The character may improve any trained characteristic even if their archetype or origin does not allow it."
    },
    {
      "name": "CT: Perception",
      "description": "The character gains +5 Perception. The character may improve any trained characteristic even if their archetype or origin does not allow it."
    },
    {
      "name": "CT: Strength",
      "description": "The character gains +5 Strength. The character may improve any trained characteristic even if their archetype or origin does not allow it."
    },
    {
      "name": "CT: Strength",
      "description": "The character gains +5 Strength. The character may improve any trained characteristic even if their archetype or origin does not allow it."
    },
    {
      "name": "CT: Toughness",
      "description": "The character gains +5 Toughness. The character may improve any trained characteristic even if their archetype or origin does not allow it."
    },
    {
      "name": "CT: Weapon Skill",
      "description": "The character gains +5 Weapon Skill. The character may improve any trained characteristic even if their archetype or origin does not allow it."
    },
    {
      "name": "CT: Willpower",
      "description": "The character gains +5 Willpower. The character may improve any trained characteristic even if their archetype or origin does not allow it."
    },
    {
      "name": "Combat Master",
      "description": "Enemies gain no melee superiority bonuses against this character."
    },
    {
      "name": "Drukhari Weapon Proficiency",
      "description": "Allows the character to use Drukhari weapons."
    },
    {
      "name": "Dual Weapon Specialist",
      "description": "Using the Sweep attack of the axes and Shove attack of the maces and hammers does not increase the AP cost or reduce the Weapon Skill or Ballistic Skill of another weapon;"
    },
    {
      "name": "Dual-Weapon Combat",
      "description": "The character can attack with the second weapon in their current weapon set in addition to the usual one attack per round. This attack suffers a -20 penalty to WS and BS and costs +1 AP more."
    },
    {
      "name": "Duelling Mastery",
      "description": "Grants +15% bonus to parry."
    },
    {
      "name": "Flame Weapon Expert",
      "description": "Flame weapon attacks cost -1 AP less to use (1 AP minimum)."
    },
    {
      "name": "Flame Weapon Proficiency",
      "description": "Allows the character to use flame weapons, such as a flamer, heavy flamer, and hand flamer."
    },
    {
      "name": "Grenadier",
      "description": "The Soldier's first grenade use in combat does not spend AP and does not count toward the attack limit that turn."
    },
    {
      "name": "Heavy Armour Proficiency",
      "description": "Allows the wearing of heavy armour."
    },
    {
      "name": "Heavy Weapon Proficiency",
      "description": "Reduces the required Strength value for heavy weapons by -25."
    },
    {
      "name": "Hurt Like Hell",
      "description": "When firing heavy weapons, critical hit chance is increased by +BS bonus% and critical damage is increased by +(3 X BS bonus)%."
    },
    {
      "name": "It Will Not Die",
      "description": "Increases wounds by half of the character's level (rounded up)."
    },
    {
      "name": "Las Weapon Expert",
      "description": "Enemies suffer a -20% penalty to dodge against las weapon attacks."
    },
    {
      "name": "Melta Weapon Expert",
      "description": "Melta weapon attacks gain +4 maximum damage."
    },
    {
      "name": "Melta Weapon Proficiency",
      "description": "Allows the character to use melta weapons, such as a meltagun, multi-melta, and others."
    },
    {
      "name": "Nimble",
      "description": "Grants +10% bonus to dodge."
    },
    {
      "name": "Plasma Weapon Expert",
      "description": "Plasma weapon attacks gain +2 maximum damage."
    },
    {
      "name": "Plasma Weapon Proficiency",
      "description": "Allows the character to use plasma weapons, such as plasma gun, plasma pistol, and others."
    },
    {
      "name": "Power Weapon Expert",
      "description": "Power weapon attacks gain +10% armour penetration."
    },
    {
      "name": "Solid Projectile Weapon Expert",
      "description": "Solid projectile weapon attacks gain +2 minimum damage."
    },
    {
      "name": "Swift Movements",
      "description": "Grants +2 movement points."
    },
    {
      "name": "Weapon Specialist",
      "description": "Sweep attack of the axes and Shove attack of the maces and hammers cost 1 less action point."
    }
  ],
  "Arbitrator": [
    {
      "name": "Arbites Physical Training",
      "description": "The Arbitrator gains Toughness equal to half their equipped shield's block."
    },
    {
      "name": "Armour-Piercing",
      "description": "The Arbitrator's successful attacks reduce enemies' armour by XX% for 1 round. Does not stack"
    },
    {
      "name": "Assault Onslaught",
      "description": "The Arbitrator dashes through allies and enemies in a straight line for up to 5 cells without provoking attacks of opportunity.Each enemy they dash through must pass an Agility resistance test or fall prone until the start of that enemy's next turn. This ability can only be used with a shield equipped."
    },
    {
      "name": "Binding Purpose",
      "description": "As long as the Arbitrator has more than 90% wounds, they are immune to the following negative effects: blinded, disturbed, fatigued, perplexed, slowed, staggered"
    },
    {
      "name": "Castigated!",
      "description": "Enemies hit by the Arbitrator or their familiar deal XX% less damage for 1 round. Does not stack."
    },
    {
      "name": "Castigator",
      "description": "The Arbitrator gains the Castigated! and Death Sentence abilities, and can select That's an Order! and In theName of the Lex Imperialis! through progression."
    },
    {
      "name": "Fear of the Condemned",
      "description": "Whenever the Arbitrator hits an enemy from a distance of 2 cells or further that enemy must pass a Willpower resistance test with a - XX penalty or suffer the cannot attack effect for 1 round. If the Arbitrator's attack hits multiple enemies, this effect is applied to the enemy closest to the Arbitrator."
    },
    {
      "name": "Feat of Greatness",
      "description": "Despite having run out of ammunition you defended a critical area for the Arbitrators all by yourself until reinforcements arrived."
    },
    {
      "name": "Illustrious Glory",
      "description": "Your words alone persuaded a group of rebels to join the Arbitrators' side in the midst of a planet-wide uprising, without any need for punitive measures."
    },
    {
      "name": "In the Name of the Lex Imperialis!",
      "description": "For 1 round, the Arbitrator and their allies gain immunity to the prone, stunned, immobilised, and cannot attack effects, as well as to all types of forced movement. Enemies must pass a Willpower resistance test with a XX penalty or become immobilised until the Arbitrator's next turn."
    },
    {
      "name": "Law and Order",
      "description": "The Arbitrator's attacks made on others' turns deal +XX% more damage. The target of such an attack must pass a Willpower resistance test or become immobilised for 1 round."
    },
    {
      "name": "Lawful Intervention",
      "description": "The Arbitrator can parry incoming attacks with a ranged weapon. To calculate the parry chance the Arbitrator's Ballistic Skill is used instead of Weapon Skill. The Arbitrator can make attacks of opportunity with a ranged weapon that they can use in melee range."
    },
    {
      "name": "Mob Justice",
      "description": "Allies in a 3-cell radius around the Arbitrator deal +XX% more damage. Does not stack"
    },
    {
      "name": "Pacification Procedures",
      "description": "Once per turn, the Arbitrator can throw a grenade that does not deal damage on impact. That action costs 0 AP and does not count toward the attack limit per turn."
    },
    {
      "name": "Pillar of the Law",
      "description": "After the Arbitrator uses a heroic act or a desperate measure, they gain + XX to Coercion and +XX% block until the end of combat."
    },
    {
      "name": "Prepared Prosecution",
      "description": "During the tactical phase, the Arbitrator can be placed in a cell adjacent to an enemy."
    },
    {
      "name": "Public Sentencing",
      "description": "Whenever an enemy adjacent to the Arbitrator fails a Willpower resistance test for the first time in a round, that enemy provokes an attack of opportunity from the Arbitrator. If multiple enemies fail this test at the same time, the attack of opportunity is triggered against one af them randomly."
    },
    {
      "name": "Ruthless Suppression",
      "description": "If there are 2 or more enemies in a 2-cell radius around the Arbitrator, no critical hits can be scored against the Arbitrator or their familiar and the Arbitrator and their familiar's critical hit chance is increased by +XX%. Whenever an enemy adjacent to the Arbitrator gets up from being prone, that enemy provokes an  attack of opportunity from the Arbitrator."
    },
    {
      "name": "Shotgun Mastery",
      "description": "The Arbitrators can wield two-handed shotguns in one hand"
    },
    {
      "name": "Swift Justice",
      "description": "Enemies attacked by the Arbitrator or their familiar suffer the swift justice effect until the start of the Arbitrator's next turn. The Arbitrator's shotgun attacks deal +XX% more damage to those enemies."
    },
    {
      "name": "That's an Order!",
      "description": "The Arbitrator chooses a cell within a 6-cell radius. All enemies within a 3-cell radius around the Arbitrator must make a Willpower resistance test with a penalty. On a failed test, if possible, they immediately move to the designated cell."
    },
    {
      "name": "The Steady Hand of Justice",
      "description": "With a one-handed shock baton or a one-handed power maul equipped, the Arbitrator gains +10% to parry and reduces the Weapon Skill of enemies hit with this weapon by -10 until the end of combat(does not stack). This weapon also deals +25% more critical damage."
    }
  ],
  "Arch-Militant": [
    {
      "name": "Accustomed to Glory",
      "description": "Whenever the Arch-Militant or their ally uses a heroic act or a desperate measure, the Arch-Militant gains +2 damage for all attacks until the end of combat."
    },
    {
      "name": "Adaptability",
      "description": "Gaining a stack of versatility increases critical hit chance by +5% until the end turn. Stacks."
    },
    {
      "name": "All Out",
      "description": "While the Arch-Militant is under the effects of Reckless Rush, their attacks do not cost MP."
    },
    {
      "name": "Always Ready",
      "description": "The Arch-Militant begins combat with 2 stacks of versatility."
    },
    {
      "name": "Armsmaster",
      "description": "Killing an enemy with a melee attack makes all the Arch-Militant's ranged attacks this turn cost -1 AP (min 1), and vice versa. Does not stack."
    },
    {
      "name": "Awaiting Orders",
      "description": "Every round, the first single-target ability used by an ally on the Arch-Militant grants +1 action point to that ally."
    },
    {
      "name": "Blood Haze",
      "description": "As long as the Arch-Militant has killed at least one enemy with a melee attack this round, the Arch-Militant gains a +(10 + AGI bonus)% bonus to dodge."
    },
    {
      "name": "Breaking Attack",
      "description": "Devastating Attack also reduces the target's armour by -7% and Toughness by -10 until the end of combat. Does not stack."
    },
    {
      "name": "Broad Expertise",
      "description": "When entering combat the Arch-Militant gains +(2 X BS bonus) Weapon Skill, and +(2 X WS bonus) Ballistic Skill until end of combat."
    },
    {
      "name": "Calm and Steady",
      "description": "While under the effect of Confident Approach, the Arch-Militant keeps half of the usual bonuses from versatility."
    },
    {
      "name": "Close-Quarters Training",
      "description": "The Arch-Militant can use two-handed ranged weapons within melee range but with a -10 penalty to Ballistic Skill."
    },
    {
      "name": "Contempt for the Weak",
      "description": "The Arch-Militant deals +20% critical damage against targets that are stunned, prone, or blinded."
    },
    {
      "name": "Critical Versatility",
      "description": "The Arch-Militant gains a +(5 + number of Versatility stacks)% bonus to critical damage. This bonus is kept when the Arch-Militant uses Cautious Approach or Confident Approach."
    },
    {
      "name": "Dependable",
      "description": "The Arch-Militant gains a +(5 + stack of versatility)% bonus to armour. This bonus is kept when the Arch-Militant uses Cautious Approach or Confident Approach."
    },
    {
      "name": "Discipline",
      "description": "The Arch-Militant gains +1 stack of versatility whenever an ally grants the Arch-Militant an extra turn."
    },
    {
      "name": "Dismantle",
      "description": "Any of the Arch-Militant's area attacks, both melee and ranged, reduce the deflection of all the enemies hit by -2 and their armour by -7% until the end of combat. Does not stack."
    },
    {
      "name": "Distract",
      "description": "Any of the Arch-Militant's burst attacks and melee area attacks reduce dodge of all the enemies hit by -8% until the end of combat. Does not stack."
    },
    {
      "name": "Exploit Weakness",
      "description": "When the Arch-Militant attacks targets that have their armour reduced by any effects applied by the Arch-Militant's allies, the Arch-Militant deals +10% damage. When the Arch-Militant attacks targets that have their deflection reduced by any effects applied by the Arch-Militant's allies, the Arch-Militant deals +2 damage."
    },
    {
      "name": "Flashfire",
      "description": "The cost of Wildfire is reduced by -1 AP for every 3 stacks of versatility instead of 4."
    },
    {
      "name": "Focal Point",
      "description": "The Arch-Militant deals +15% damage to targets that have a priority target regardless of whether that target is the Arch-Militant or someone else."
    },
    {
      "name": "Heavy Gunner",
      "description": "The Arch-Militant's heavy weapon attacks cost -1 action point."
    },
    {
      "name": "Ingenious",
      "description": "Enemies that were forced to make a resistance test by the Arch-Militant will make any resistance tests from any source with a -(10 + 2 X AGI bonus) penalty until the end of combat."
    },
    {
      "name": "Martial Art",
      "description": "Targets of Kick must pass a Toughness resistance test with a -(2 X Arch- Militant's STR bonus) penalty or fall prone for 1 round."
    },
    {
      "name": "Preferred Targets",
      "description": "When the Arch-Militant attacks targets that have their dodge reduced by any effects applied by the Arch-Militant's allies, the Arch-Militant gains +10% critical hit chance. When the Arch-Militant attacks targets that have their parry reduced by ant effects applied by the Arch-Militant's allies, the Arch-Militant deals +20% critical damage."
    },
    {
      "name": "Shoot on the Hands",
      "description": "Any ranged area and burst attacks of the Arch-Militant reduce the Weapon Skill of all enemies hit by -10 until the end of combat. Does not stack."
    },
    {
      "name": "Survivor",
      "description": "Using Cautious Approach also grants the Arch-Militant temporary wounds equal to 10% of the Arch-Militant's maximum wounds. The same happens at the start of every turn while the Arch-Militant remains under the effect of Cautious Approach."
    }
  ],
  "Assassin": [
    {
      "name": "Ambush",
      "description": "At the start of the Assassin's turn, all enemies that do not have the Assassin in their line of sight suffer the unsuspecting effect until the end of the Assassin's turn. Unsuspecting: the Assassin gains +7% hit chance and +7% critical hit chance against unsuspecting enemies."
    },
    {
      "name": "An Eye for the Unscathed",
      "description": "Whenever the Assassin attacks an enemy that is at full wounds, the Assassin gains +20% dodge and dodge reduction against that enemy until the end of the Assassin's next turn."
    },
    {
      "name": "Bringer of Doom",
      "description": "Whenever the Assassin attacks an enemy with a single-target attack, this attack reduces the target's armour and dodge by -15% until the end of the Assassin's turn. Does not stack."
    },
    {
      "name": "Carmine Whisper",
      "description": "The hemorrhage effect applied by Death Whisper deals an additional +10 damage."
    },
    {
      "name": "Create an Opening",
      "description": "If an enemy suffers a critical hit from one of the Assassin's allies, at the start of the Assassin's turn, a new opening is created on whichever side is closest to the Assassin."
    },
    {
      "name": "Deadly Calculation",
      "description": "For every 10 damage dealt by an Assassin's attack, that attack also deal +1 direct damage to the same target. Direct Damage: damage that cannot be reduced by the target's parameters or bonuses."
    },
    {
      "name": "Disarray",
      "description": "Whenever the Assassin deals direct damage, the target must pass an Agility resistance test with a -(2 X Assassin's AGI bonus) penalty or become slowed until the end of their next turn."
    },
    {
      "name": "Elusive Speed",
      "description": "If the Assassin is elusive at the start of their turn, they gain +4 MP and +10 lethality until the end of their turn."
    },
    {
      "name": "Esquive",
      "description": "Each successful dodge grants the Assassin +(Lethality / 5)% damage for the next successful attack."
    },
    {
      "name": "Flawless Lunge",
      "description": "Poised to Strike also reduces the target's dodge by -(2 X AGI bonus)%."
    },
    {
      "name": "Gruesome Gust",
      "description": "The armour penetration penalty of Feinting Attack is reduced to -20%."
    },
    {
      "name": "Imminent Demise",
      "description": "Whenever the Assassin deals direct damage to an enemy, that enemy suffers +1 stack of the vulnerable effect. Vulnerable: the character suffers +(number of vulnerable stacks) X PER bonus% more damage from the Assassin's attacks. Direct Damage: damage that cannot be reduced by the target's parameters or bonuses."
    },
    {
      "name": "Inevitable Enervation",
      "description": "Each use of Aim for the Opening on the same target reduces that target‘s dodge and dodge reduction by -10%. Stacks."
    },
    {
      "name": "Keep Your Distance",
      "description": "Whenever the Assassin has no more than 1 adjacent enemy, any enemy that moves into a cell adjacent to the Assassin must pass an Agility resistance test with a -(2 X STR bonus) penalty or fall prone, if possible, and become immobilised until the start of that enemy's next turn."
    },
    {
      "name": "Killing Spree",
      "description": "Whenever the Assassin hits an opening, the Assassin's damage is increased by +(AGI bonus / 2)% until the end of combat. Stacks."
    },
    {
      "name": "Leave No Witness",
      "description": "The enemy last damaged by the Assassin suffers the witness effect. Witness: if a witness does not have the Assassin in their line of sight at the end of the Assassin's turn, that witness suffers (lethality / 3)% of the maximum base damage of the Assassin's current weapon."
    },
    {
      "name": "Lethality Heightens",
      "description": "Whenever the Assassin deals 5 or more direct damage to an enemy with a single attack, the Assassin gains +10 lethality until the end of combat. Stacks."
    },
    {
      "name": "Lone Killer",
      "description": "While the Assassin has no allies in a 5-cell radius around them, they gain +10% dodge and +10% dodge reduction."
    },
    {
      "name": "Morbid Pirouette",
      "description": "Danse Macabre deals additional +AGI bonus direct damage."
    },
    {
      "name": "Mortally Effective",
      "description": "Whenever the Assassin hits a target with an attack that has 100 lethality or greater for the first time in a round, the Assassin immediately regains the AP spent for that attack."
    },
    {
      "name": "Outsmart",
      "description": "Whenever the Assassin hits an enemy without hitting the enemy's opening, the Assassin gains +2 X (AGI bonus)% dodge until the start of their next turn."
    },
    {
      "name": "Perfect Opening",
      "description": "The Assassin gains +Lethality% chance to deal +5% of target's max wounds more damage to an opening."
    },
    {
      "name": "Professional Acumen",
      "description": "Every turn, the first use of an Assassin ability costs 0 AP."
    },
    {
      "name": "Seize the Advantage",
      "description": "The Assassin gains +15 lethality against enemies that have any of following effects: slowed, immobilised, or hemorrhage. The bonus is gained for each of these effects but cannot exceed +45 lethality."
    }
  ],
  "Astra Militarum Commander": [
    {
      "name": "Field of Fire",
      "description": "While the Astra Militarum commander is under the Regimental Tactics effect, all their allies gain +5% to rate of fire for every attack they have made since the start of this effect."
    },
    {
      "name": "Shoulder to Shoulder",
      "description": "While the Astra Militarum commander is adjacent to any ally, the commander deals an additional +(10 + PER Bonus)% damage to all enemies adjacent to the commander‘s allies. This stacks with Regimental Tactics"
    },
    {
      "name": "Suppression Fire!",
      "description": "While the Astra Militarum commander is under the Regimental Tactics effect, their single target melee, ranged attacks, and area attacks gain +20% to dodge reduction, parry reduction, and cover penetration against enemies adjacent to the commander or their allies."
    },
    {
      "name": "Timely Rescue",
      "description": "While the Astra Militarum commander is under the Regimental Tactics effect, killing an enemy adjacent to any ally grants that ally an additional +10 momentum."
    },
    {
      "name": "Unflinching Heroism",
      "description": "Every time the Astra Militarum commander's ally uses a heroic act, the commander gains +5 to all of their characteristics until the end of combat."
    }
  ],
  "Bladedancer": [
    {
      "name": "Anticipation",
      "description": "Whenever the Bladedancer parries a melee attack while under the effect of Veil of Blades, they deal 50% of their normal damage to the attack. Additionally, while under the effect of Veil of Blades, the bladedancer's chance to deflect a ranged attack at an enemy is increased by +20%."
    },
    {
      "name": "Balancing on the Edge",
      "description": "The Bladedancer can use both a desperate measure and a heroic act in the same combat (but not in the same round). Whenever the blade dancer uses a desperate measure, they gain +10 Weapon Skill and +3 resolve."
    },
    {
      "name": "Blade in His Hand",
      "description": "Any Bladedancer attacks made with a sword deal + AGI bonus% additional damage. This bonus damage is doubled if using a two-handed sword."
    },
    {
      "name": "Blessed Scars",
      "description": "Whenever the Bladedancer is healed for the first time in a round, they are healed for an additional +TGH bonus wounds and gain +10 Toughness until the end of combat. Stacks."
    },
    {
      "name": "Blinding Blades",
      "description": "Enemies attacked by the Bladedancer have their weapon Skill, Ballistic Skill, and Perception reduced by -(10 + Bladedancer's WS bonus) until the start of the Bladedancer's next turn. These penalties do not stack."
    },
    {
      "name": "Blood Bonds",
      "description": "Every ally targeted by Oath of Vengeance gains the same bonuses as the Bladedancer against all affected enemies."
    },
    {
      "name": "Blood Rush",
      "description": "Whenever the Bladedancer uses an ability that costs wounds, they gain +3 MP in the current turn."
    },
    {
      "name": "Bloody Requiem",
      "description": "Whenever the Bladedancer kills an enemy, the Bladedancer's resolve is increased by +1 until the end of combat."
    },
    {
      "name": "Dance Partners",
      "description": "As long as the Bladedancer has two swords equipped, the Bladedancer's Weapon Skill is increased by +AGI bonus."
    },
    {
      "name": "Death Warden",
      "description": "The Bladedancer's Medicae is now determined by Weapon Skill instead of Intelligence (if their Weapon Skill is higher). The Bladedancer deals + (5 + Medicae / 10)% critical damage and can use medikits as if having Medicae skill advancement or the corresponding feature or talent."
    },
    {
      "name": "Duellist",
      "description": "The Bladedancer deals an additional +(5 + Bladedancer's WS bonus)% damage against enemies armed with a melee weapon."
    },
    {
      "name": "Escape Artist",
      "description": "Whenever the Bladedancer dodges an attack made by an enemy who attacks them for the first time, the Bladedancer gains +1 charge of Death From Above."
    },
    {
      "name": "Facing the End",
      "description": "The Bladedancer gains +3 Weapon Skill and +3 Agility for every injury they are currently suffering and +10 Weapon Skill and +10 Agility for every trauma."
    },
    {
      "name": "Feel No Pain",
      "description": "Whenever the Bladedancer uses an ability that costs wounds, they gain half of the wounds spent as temporary wounds. The number of temporary wounds gained cannot be decreased by effects that reduce the cost of abilities."
    },
    {
      "name": "Grand Performance",
      "description": "Targets affected by Captive Audience have their armour, dodge, and parry reduced by -(10 + AGI bonus)% until the end of combat. This penalty is doubled for targets failing the ability's Toughness resistance test."
    },
    {
      "name": "Guillotine",
      "description": "Death From Above deals double damage to enemies that have less than 50% wounds."
    },
    {
      "name": "In Footsteps of Death",
      "description": "Every time an enemy is killed by Blade Dancer's allies, the amount of Movement Points Blade Dancer gets on their next turn increases by 2."
    },
    {
      "name": "It Takes Two",
      "description": "If all the strikes made as part of Blade Dance are directed against the same target, the last strike deals double damage."
    },
    {
      "name": "Killing Rhythm",
      "description": "Whenever the Bladedancer kills an enemy with an attack of opportunity, the Bladedancer immediately gains +1 charge of Death From Above."
    },
    {
      "name": "Paid in Blood",
      "description": "Once the Bladedancer has killed four enemies in total, the next ability which requires spending wounds will cost no wounds and instead restore (5 + 2 x TGH bonus) wounds."
    },
    {
      "name": "Promises of Blood",
      "description": "Blood Oath restores an additional +1 AP."
    },
    {
      "name": "Race Against Death",
      "description": "The Bladedancer's maximum wounds are increased by +(Bladedancer's dodge/10)."
    },
    {
      "name": "Rising Tempo",
      "description": "Each attack made by the Bladedancer increases the damage of all subsequent attacks they make this turn by +5%. This effect stacks up to 3 times. Area attacks, burst attacks (including the Blade Dance), and any other attacks that deal multiple hits are considered single attacks."
    },
    {
      "name": "Shadow Dancer",
      "description": "As long as the Bladedancer has less than 50% wounds, they gain +12% dodge and +3 MP. The Bladedancer also gains +8% dodge and +2 MP for every unconscious ally in combat."
    },
    {
      "name": "Slip Away",
      "description": "Whenever the Bladedancer uses Acrobatic Artistry, their dodge and cover efficiency are increased by +(5 + AGI bonus)% until the end of their next turn. This bonus is doubled against all attacks made by enemies during the Bladedancer's turn (including extra turns)."
    },
    {
      "name": "Spinning Blades",
      "description": "Whenever the Bladedancer parries an attack, the number of attacks made by the next Blade Dance is increased by +1. This effect stacks up to AGI bonus times."
    },
    {
      "name": "Steady Hand",
      "description": "The Bladedancer's parry is increased by +TGH bonus%. An attacker's melee critical hit chance bonus determined by the difference between the attacker's and the Bladedancer's Weapon Skill characteristic is halved."
    },
    {
      "name": "Sweeping Motions",
      "description": "The Bladedancer's melee area attacks cost -1 AP less (but not less than 1)."
    },
    {
      "name": "Unforgiving",
      "description": "After the Bladedancer loses any number of wounds, their next attack deals +(5+TGH bonus)% more damage. If that loss causes the Bladedancer to suffer an injury or trauma, the bonus damage increases to +(10+2 x TGH bonus)%."
    }
  ],
  "Bounty Hunter": [
    {
      "name": "Catch",
      "description": "Whenever the Bounty Hunter hits an enemy with an attack, they inflict the catch effect on that enemy. Catch: at the start of the Bounty Hunter's turn, this target suffers a stacking - (2 X (catch's difficulty tier + PER bonus))% penalty to their armour and dodge. Once the catch moves or suffers damage, the catch effect and the penalties are removed."
    },
    {
      "name": "Claim and Maim",
      "description": "If Claim the Bounty kills an enemy, the Bounty Hunter's next attack this turn will always score a critical hit."
    },
    {
      "name": "Critical Chain",
      "description": "Whenever the Bounty Hunter kills an enemy with a critical hit, all allies in a 7- cell radius around the target gain +target‘s difficulty tier% critical hit chance until the end of combat. Stacks."
    },
    {
      "name": "Cut to the Chase",
      "description": "Whenever the Bounty Hunter scores a critical hit for the first time in a round, they gain +target's difficulty tier movement points."
    },
    {
      "name": "Expert Finesse",
      "description": "Whenever the Bounty Hunter kills an enemy whose difficulty tier is IV or higher, the Bounty Hunter immediately reloads their weapon and attacks the closest enemy in their line of sight. This attack gains +50% overpenetration but deals only (4 x (BS bonus + PER bonus))% of the Bounty Hunter's usual damage."
    },
    {
      "name": "Flay the Bold",
      "description": "Cull the Bold additionally removes -target's difficulty tier deflection, -(2 X target's difficulty tier) Willpower, and -(2 X target's difficulty tier) Toughness from the target."
    },
    {
      "name": "Good Hunting",
      "description": "Every third critical hit scored by the Bounty Hunter restores +1 charge of Hunt Down the Prey."
    },
    {
      "name": "Gruesome Kill",
      "description": "Whenever prey is killed, all enemies in a 10-cell radius around the prey have their Agility reduced by -(5 X prey's difficulty tier) for 2 rounds."
    },
    {
      "name": "Guidance",
      "description": "The Bounty Hunter's first critical hit in a round grants their allies a stacking +(target's difficulty tier + Bounty Hunter's PER bonus / 3)% bonus to armour penetration until the end of combat. Once a character with this bonus reloads, the bonus is removed."
    },
    {
      "name": "Heightened Concentration",
      "description": "Whenever the Bounty Hunter scores a critical hit, they gain +PER bonus% armour penetration until the end of combat. Stacks."
    },
    {
      "name": "Hunter's Ambush",
      "description": "When the Bounty Hunter performs a single-shot attack on an immobilised or stunned target, this attack refunds its cost and does not count for the attack limit. Once per round."
    },
    {
      "name": "Hunting Surge",
      "description": "Whenever an enemy is killed by a critical hit scored by the Bounty Hunter or their ally, the Bounty Hunter gains +(2 X enemy's difficulty tier)% damage or 2 rounds."
    },
    {
      "name": "Inspiring Trophy",
      "description": "Whenever the Bounty Hunter kills prey whose difficulty tier is IV or higher, the Bounty Hunter additionally gains +2 AP."
    },
    {
      "name": "Kill Squad",
      "description": "Raid grants an ally an additional +(2 X prey's difficulty tier)% damage against prey."
    },
    {
      "name": "Pierce and Ruin",
      "description": "Each enemy affected by Piercing Shot has their armour reduced by -BS bonus% until the end of combat. Stacks."
    },
    {
      "name": "Pierce the Armour",
      "description": "Whenever the Bounty Hunter scores a critical hit, the target's armour is reduced by -(BS bonus + target's difficulty tier)% until the end of combat. Stacks."
    },
    {
      "name": "Pounce",
      "description": "The Bounty Hunter's allies gain +(3 + Bounty Hunter's PER bonus) critical hit chance against enemies affected with one or more of the following effects: prey, trailed, or immobilised."
    },
    {
      "name": "Retaliate",
      "description": "Whenever prey deals damage to the Bounty Hunter's ally, the Bounty Hunter gains +prey's difficulty tier% damage against that prey for 2 rounds. Stacks."
    },
    {
      "name": "Savour the Kill",
      "description": "Whenever prey that is not being trailed is killed by an ally, the Bounty Hunter gains an extra turn with half of their MP and AP. The Bounty Hunter cannot attack during this extra turn."
    },
    {
      "name": "Share the Spoils",
      "description": "Whenever an ally kills prey, the Bounty Hunter gains half of the bonuses granted by Hunt Down the Prey."
    },
    {
      "name": "Trail and Shatter",
      "description": "Hot on the Trail now has an unlimited range and reduces the target's armour by -(3 + PER bonus)% for 2 rounds."
    },
    {
      "name": "We Got 'Em",
      "description": "At the start of the Bounty Hunter's turn, they gain +2 MP for each ally who is adjacent to prey."
    },
    {
      "name": "Withdraw",
      "description": "Whenever the Bounty Hunter is attacked in melee range for the first time since the end of their turn, they automatically dodge that attack and move 1 cell in the opposite direction from the enemy. The Bounty Hunter does not provoke attack of opportunity with this movement."
    }
  ],
  "Commissar": [
    {
      "name": "Duty and Honour!",
      "description": "While the Commissar's ally is under the effects of At All Costs!, that ally suffers +50% damage but gains +2 AP and +4 MP (instead of +1 AP and +3 MP)."
    },
    {
      "name": "For the Emperor!",
      "description": "When momentum is less than 100 points, killing the marked enemy or targeting an ally grants +(20 + 2 X FEL bonus) momentum."
    },
    {
      "name": "Motivation",
      "description": "Any time the Commissar grants additional movement points to any ally character, they give +2 movement points more."
    },
    {
      "name": "Show Them Contempt!",
      "description": "While the Commissar is adjacent to an enemy, all their allies gain +(Commissar's FEL bonus / 2) resolve."
    },
    {
      "name": "Summary Execution",
      "description": "If the Commissar kills the target with  At All Costs!, they can use At All Costs! once more this combat for 0 AP."
    }
  ],
  "Crime Lord": [
    {
      "name": "Contingency Plan",
      "description": "If at the start of a turn, the crime lord has no stacks of sure-fire plan, they gain +1 stack."
    },
    {
      "name": "Disorienting Plan",
      "description": "An enemy affected by sure-fire plan also suffers a -(10 + 2 X PER bonus)% penalty 10 dodge and parry reduction."
    },
    {
      "name": "Escape Plan",
      "description": "The bonus to dodge and parry from sure- fire plan are increased by +(2 X AGI bonus %. Dodging or parrying at least one attack by the start of the next round restores 1 stack of sure-fire plan."
    },
    {
      "name": "Killing Plan",
      "description": "The bonus damage of sure-fire plan is increased by +(2 X WS bonus)%. Killing at least one enemy with an attack restores 1 stack of sure-fire plan."
    },
    {
      "name": "Sure-Fire Plan",
      "description": "At the start of combat, the crime lord gains +INT bonus stacks of the sure-fire plan effect. Activation of this ability consumes 1 stack and makes the next action stronger depending on the type of action: - If the crime lord attacks, they deal +(10 + PER bonus)% more damage. - If the crime lord moves, they gain +(10 + PER bonus)% dodge and parry until the start of their next turn. - If the crime lord uses a non-damaging ability on an enemy, that enemy suffers a -(10 + INT bonus)% penalty to damage for one round. Can be used multiple times per turn."
    },
    {
      "name": "The Last Plan",
      "description": "Once per combat, if the crime lord has at least 1 stack of sure-fire plan, they do not die from lethal damage. Instead, they heal (5 X sure-fire plan stacks)% of maximum wounds, lose a stacks, and can no longer gain sure-fire plan stacks."
    }
  ],
  "Death World": [
    {
      "name": "Brutal Hunter",
      "description": "Death world characters gain +15% critical hit chance against targets with the bleeding effect or with 50% or less of their maximum wounds."
    },
    {
      "name": "Hellish Life",
      "description": "Death World characters take TGH bonus less damage from flame, toxic damage, and bleeding effects."
    },
    {
      "name": "Survival Instinct",
      "description": "Once per combat, when the wounds of a death world character drop below 30%, they gain +20% of their maximum wounds as temporary wounds. Death world characters also gain a +20% bonus to dodge and armour while they have at least 1 temporary wound from any a source."
    },
    {
      "name": "Tenacity",
      "description": "Once per combat, when a death world character is suffering from the stunned, blinded, or immobilised condition, this condition is ignored, and they instead gain +20% temporary wounds to their maximum wounds."
    },
    {
      "name": "Trusty Weapons",
      "description": "Death world characters gain +10% to critical hit chance for axes, hammers, and las weapons."
    },
    {
      "name": "Wounded Beast",
      "description": "Every Injury increases the death world character's Agility and Willpower by +5. Every trauma counts as 3 Injuries."
    }
  ],
  "Executioner": [
    {
      "name": "Acute Pain",
      "description": "Whenever an enemy suffers damage from a damage-over-time effect inflicted by the Executioner for the first time in combat, this damage is increased by +100%."
    },
    {
      "name": "All-Encompassing Agony",
      "description": "If an enemy suffering from any of the Executioner's damage-over-time effects is suffering from bleeding, burning (including the effects inflicted by a pyromancer or a Navigator), and toxin (including the effects inflicted by a biomancer) at the same time, all of these damage-over-time effects deal +30% more damage to that enemy."
    },
    {
      "name": "Anatomy Expert",
      "description": "The maximum number of wounds for the Executioner depends on their Medicae instead of Toughness."
    },
    {
      "name": "Battle of Attrition",
      "description": "At the start of each round, all enemies suffering from any damage-over-time effects inflicted by the Executioner have their incoming damage-over-time from any source increased by +20%. Stacks."
    },
    {
      "name": "Bleeding Stigmata",
      "description": "Targets of Exsanguination are also immune to toxin and burning while suffering from bleeding."
    },
    {
      "name": "Bloody Trail",
      "description": "While moving, all bleeding enemies leave a bloody trail on the ground which remains for 1 round. Moving through these bloodstained cells costs the Executioner 0 MP."
    },
    {
      "name": "Death in the Air",
      "description": "Whenever an enemy suffering from toxin inflicted by the Executioner dies, all enemies in a 2-cell radius around that enemy suffer (INT bonus) levels of toxin."
    },
    {
      "name": "Death Warrant",
      "description": "The level of the damage-over-time effect inflicted by the Executioner's Merciless Verdict is increased by +(maximum weapon damage / 5)."
    },
    {
      "name": "Deep Laceration",
      "description": "When using Scourging Strikes, the Executioner's melee critical hits inflict (3 x STR bonus) levels of bleeding on their targets instead of (2 x STR bonus) levels."
    },
    {
      "name": "Does it Hurt?",
      "description": "All damage-over-time effects inflicted by the Executioner gain a 20% critical hit chance. This chance is increased by all bonuses to critical hit chance."
    },
    {
      "name": "Everlasting Agony",
      "description": "The duration of negative effects inflicted by Pain Resonance is increased by +1 round, and the penalty to the corresponding resistance tests is increased to — (20 + medicae/5)."
    },
    {
      "name": "Fragile Playthings",
      "description": "The first instance of damage dealt by the Executioner's damage-over-time effects in around reduces the inflicted enemy's armour by — (10 + INT bonus)% until the end of combat. This effect can be inflicted on multiple enemies per round, but only once per enemy. Stacks."
    },
    {
      "name": "Hardened Body",
      "description": "Whenever the Executioner or their party members are suffering from any damage- over-time effects, these effects deal only 50% of their damage. Stacks multiplicatively (50% damage if there is one Executioner with this talent in the party, 25% damage if there are two Executioners with this talent in the party, etc.)"
    },
    {
      "name": "Internal Bleeding",
      "description": "When pushing an enemy, the Executioner also inflicts (Medicae/10) levels of bleeding on that enemy."
    },
    {
      "name": "Invigorating Screams",
      "description": "Whenever an enemy in a 4-cell radius around the Executioner suffers damage from a damage-over-time effect, the Executioner regains + (TGH bonus/2) wounds."
    },
    {
      "name": "Maddening Flames",
      "description": "At the start of their turn, an enemy suffering from burning inflicted by the Executioner must make a Willpower resistance test. If failed, burning is removed and the enemy falls prone until the start of their next turn."
    },
    {
      "name": "Master of Torture",
      "description": "The Executioner deals +5% more damage to a target for each type of damage-over- time effect inflicted on that target."
    },
    {
      "name": "Perfect Anatomy",
      "description": "The Executioner's armour is increased by + (5 + maximum wounds/20)%."
    },
    {
      "name": "Racking Weakness",
      "description": "The damage dealt by the Executioner's damage-over-time effects is increased by +1% for every -10% penalty to armour suffered by the target from any source."
    },
    {
      "name": "Reprieve",
      "description": "If the Executioner used Reckless Abandon in the previous round and, by the start of their turn, still has temporary wounds, they are healed for + (15% of maximum wounds) wounds."
    },
    {
      "name": "Revelling in Suffering",
      "description": "Each adjacent creature counts as two for the purpose of calculating the bonuses granted by Gift of Torment."
    },
    {
      "name": "Sickening Pain",
      "description": "Whenever a single instance of damage from any of the Executioner's damage-over-time effects deals damage equal to or more than 10% of the enemy's maximum wounds, that enemy gains +1 stack of fatigued."
    },
    {
      "name": "Sower of Distress",
      "description": "Enemies suffering from any damage-over-time effect inflicted by the Executioner also suffer a — (5 + Medicae/20) penalty to their resistance tests."
    },
    {
      "name": "Tormenting Sprain",
      "description": "Whenever an enemy suffering from any of the Executioner's damage-over-time effects dodges the Executioner's attack, all damage-over-time effects currently inflicted on that enemy now deal an additional +10% damage. Stacks."
    },
    {
      "name": "Unbearable Presence",
      "description": "Targets of Terrifying Strike now make a Willpower resistance test with a - (10 + 2 x STR bonus) penalty. If failed, they provoke attacks of opportunity from the Executioner's allies during the forced movement."
    },
    {
      "name": "Vivisection",
      "description": "The Executioner gains a + (Medicae/5) bonus to Lore (Xenos)."
    }
  ],
  "Exemplar": [
    {
      "name": "Attention!",
      "description": "After an ally takes an extra turn provided 1 by the character, the ally gains +7% armour, +7% dodge, and +3 movement points until the end of combat. Does not stack."
    },
    {
      "name": "Breaking Point",
      "description": "Heavy weapons deal +2 damage and ignore 2 deflection."
    },
    {
      "name": "Cataclysm",
      "description": "All damage dealt by the character is increased by +3% until the end of combat for every new enemy damaged by them this combat."
    },
    {
      "name": "Combat Meditation",
      "description": "The character gains +15 Willpower as long as they have no ranged weapons equipped (staves do not count as ranged weapons)."
    },
    {
      "name": "Contagion",
      "description": "Whenever you apply blinded, slowed, fatigued, perplexed, or disturbed effects, one random enemy within 5 cells of the target also gains that effect for 1 round. The same happens if you inflict stunned or prone, but the random target makes a resistance test to avoid the effect."
    },
    {
      "name": "Critical Velocity",
      "description": "The character's critical hit chance and critical damage are increased by +5% of their dodge."
    },
    {
      "name": "Crushing Assault",
      "description": "The character's first melee attack each round deals an additional +2 damage for every cell between the character's current position and the spot where they started their turn. The distance is measured in a direct line, ignoring all terrain, with every second diagonal cell counting as two."
    },
    {
      "name": "Deadly Aim",
      "description": "If the character's dodge reduction is higher than the enemy's dodge, the character's damage against that enemy is increased by +1% for every 5% difference between the character's dodge reduction and the enemy's dodge."
    },
    {
      "name": "Deathdealer",
      "description": "Every round, after the character kills the first enemy, the character immediately makes an additional single attack against the closest enemy they can target with the same weapon if possible. This attack deals 30% base damage with a +10% bonus for every difficulty tier of the first killed enemy, i.e. if the enemy was of difficulty tier 1, this attack deals 40% damage in total."
    },
    {
      "name": "Degraded Defense",
      "description": "Whenever the character deals damage to an enemy, that enemy suffers +1 stack of the degraded defense effect for every 6 damage that the character has dealt. Whenever an ally attacks that enemy, they deal additional damage equal to the number of degraded defense stacks."
    },
    {
      "name": "Destroyer",
      "description": "Every character's melee attack reduces the target's armour by -% until the end of combat. This reduction is applied before damage is calculated. Stacks."
    },
    {
      "name": "Disastrous Collision",
      "description": "When targets pushed by the character collide with enemies or cover, both the target and the object they collide with suffer an additional +(2 x character's STR bonus) damage."
    },
    {
      "name": "Eager for Battle",
      "description": "During the first turn of combat, the character has +2 additional action points."
    },
    {
      "name": "Eager Subordinates",
      "description": "When allies take actions on extra turns given by the character, they deal +15% more damage."
    },
    {
      "name": "Extermination",
      "description": "Any damage the character deals is increased by +1 for every attack they have made this combat. Does not affect damage-over-time effects: bleeding, burning, or toxin."
    },
    {
      "name": "Firebrand",
      "description": "If an extra turn given by the character's abilities or talents grants MP, the target gains +4 additional MP; if AP - the target gains +1 additional AP."
    },
    {
      "name": "Flagbearer",
      "description": "Allies within 2 cells around the character deal +(3 + character's FEL bonus)% more damage and suffer -(3 + character's TGH bonus)% less damage. If multiple characters have this talent, the effect does not stack."
    },
    {
      "name": "Flesh Wounds",
      "description": "At the start of the character's turn, they restore 10% of their maximum wounds. If the character has less than 20% of wounds left, they restore 20% of their maximum wounds instead."
    },
    {
      "name": "Full Attention",
      "description": "Targets that consider the character a priority target deal -40% less damage to the character's allies."
    },
    {
      "name": "Grievous Wounds",
      "description": "Enemies that have 0 deflection or 0% armour against the character's attacks suffer +10% additional damage from the character. If an enemy has both 0 deflection and 0% armour, those damage bonuses stack."
    },
    {
      "name": "Know-It-All",
      "description": "The character gains a +(2 + INT bonus / 2)% bonus to armour, armour penetration, dodge, dodge reduction, critical hit chance, critical damage, and parry chance."
    },
    {
      "name": "Lethal Threat",
      "description": "Enemies hit by the character with a melee attack must pass a Willpower resistance test or make the character their priority target until the start of the character's next turn."
    },
    {
      "name": "Malign Influence",
      "description": "Whenever an enemy fails a Willpower resistance test against the character, they suffer (2 x character's WP bonus) direct damage. On success the damage is doubled."
    },
    {
      "name": "Martyrdom",
      "description": "Whenever the character is attacked by an enemy, they gain momentum equal to the difficulty tier of the attacking creature."
    },
    {
      "name": "Masterful Display",
      "description": "When the character's single shots deal damage to targets other than their main target, they gain +5 Ballistic Skill until the end of combat."
    },
    {
      "name": "Masterful Display",
      "description": "When the character's single shots deal damage to targets other than their main target, they gain +5 Ballistic Skill until the end of combat."
    },
    {
      "name": "Masterful Precision",
      "description": "Deadeye shot deals an additional +(2 x PER bonus)% damage. The following ranged attack abilities gain deadeye shot benefits (x 1.5 range and the additional damage from the talent itself): -Bounty Hunter's Claim the Bounty -Master Tactician's Finish the Job -Assassin's Death Whisper -Assassin's Killing Edge -Assassin's Dispatch -Operative's Dismantling Attack -Bounty Hunter's Wild Hunt."
    },
    {
      "name": "Out of My Way",
      "description": "Whenever the character pushes an enemy, the character gains +4 MP Those MP are added after the attack and allow the character to continue movement. Damage dealt by collisions from pushes is increased by +%."
    },
    {
      "name": "Peak Condition",
      "description": "The character gains a bonus to their Strength equal to 20% of their maximum wounds."
    },
    {
      "name": "Perfection Under Fire",
      "description": "The character gains +5 to all characteristics. This bonus is doubled when they have 25% wounds or less"
    },
    {
      "name": "Pinpoint Accuracy",
      "description": "The character ignores (BS bonus / 2) of the enemy's deflection (rounded down)."
    },
    {
      "name": "Psychic Awakening (Biomancy)",
      "description": "The character becomes an unsanctioned psyker and gains +1 psy rating."
    },
    {
      "name": "Psychic Awakening (Divination)",
      "description": "The character becomes an unsanctioned psyker and gains +1 psy rating."
    },
    {
      "name": "Psychic Awakening (Pyromancy)",
      "description": "The character becomes an unsanctioned psyker and gains +1 psy rating."
    },
    {
      "name": "Psychic Awakening (Sanctic Powers)",
      "description": "The character becomes an unsanctioned psyker and gains +1 psy rating. Deals (from (1 + psyker's WP Bonus x psy rating) to (4 + psyker's WP Bonus x (1 + psy rating))) damage to the target."
    },
    {
      "name": "Psychic Awakening (Telepathy)",
      "description": "The character becomes an unsanctioned psyker and gains +1 psy rating."
    },
    {
      "name": "Puncture",
      "description": "If the character's armour penetration is higher than the enemy's armour, the character's critical hit chance against that enemy is increased by +2% for every 5% difference between the character's armour penetration and the enemy's armour."
    },
    {
      "name": "Relentless",
      "description": "Whenever the character is healed, they regain +(5 x character's TGH bonus)% more wounds."
    },
    {
      "name": "Revenge",
      "description": "Whenever the character loses wounds, their next melee attack gains +1 damage for every 2 wounds the character has lost. Stacks."
    },
    {
      "name": "Shot Through",
      "description": "The character's attacks gain an additional +(BS / 2)% overpenetration. Their overpenetration attacks cannot be dodged."
    },
    {
      "name": "Steel Shell",
      "description": "The character's deflection is doubled against single-target attacks."
    },
    {
      "name": "Tipping Point",
      "description": "The character's dodge reduction and armour penetration are increased by +10% of their critical hit chance."
    },
    {
      "name": "Tough as Steel",
      "description": "The character gains an additional 12 wounds. Those wounds are further increased by Toughness, increasing by +(10 x TGH bonus)%, in the same way as basic wounds."
    },
    {
      "name": "Tricky defense",
      "description": "As long as the character wears light armour, their dodge is increased by half of the armour bonus of that armour."
    },
    {
      "name": "Unbreakable Will",
      "description": "The character gains a bonus to all resistance tests equal to +(5 x deflection)."
    },
    {
      "name": "Unstoppable",
      "description": "The character becomes immune to all effects that reduce their MP. They gain +(TGH bonus / 2) MP."
    },
    {
      "name": "Vital Points",
      "description": "Whenever the character scores a critical hit, they have a chance to increase their critical damage bonus by half. That chance is equal to (character's critical chance - 50)% (minimum of 0%)."
    }
  ],
  "Forge World": [
    {
      "name": "Calculated Relations",
      "description": "Forge world characters can use Persuasion, Coercion, and Commerce based on Intelligence instead of Fellowship."
    },
    {
      "name": "Fires of the Forge",
      "description": "Forge world characters gain +TGH bonus deflection against the burning effect and flame weapons."
    },
    {
      "name": "Persistence of the Forge",
      "description": "Forge world characters gain a stacking +10% bonus to hit chance and dodge reduction against any target they hit with a single-target attack. Successful critical hits from single-target attacks increase the hit chance and dodge reduction by +20%."
    },
    {
      "name": "Pinnacle of Weaponry",
      "description": "The first attack in combat with any plasma, melta, or power weapon deals additional damage equal to INT bonus. For the remainder of combat, the bonus damage is decreased to (INT bonus / 2)."
    },
    {
      "name": "Steel of the Forge",
      "description": "While wearing heavy armour, forge world characters gain +1 MP, +1 deflection, and cannot fall prone."
    }
  ],
  "Fortress World": [
    {
      "name": "Combat Addict",
      "description": "Fortress world characters gain +7 to Ballistic Skill, Perception, and Willpower while in combat. Yet while out of combat, their Intelligence, Fellowship, Perception, and Willpower are decreased by -7."
    },
    {
      "name": "Familiar Kickback",
      "description": "At the end of their turn, fortress world characters gain stacks of never stop shooting equal to (half the minimal damage of the most damaging ranged weapon they used this round)."
    },
    {
      "name": "Hail of Steel",
      "description": "Each round fortress world characters gain a stacking +1% bonus to dodge against ranged attacks for each shot they made during this round. Also, the burst attack grants an additional +10 stacks of never stop shooting."
    },
    {
      "name": "Never Stop Believing",
      "description": "When all stacks of never stop shooting should be lost, they become (WP / 2) number of stacks instead. Additionally, a fortress world character may upgrade their Willpower characteristic even if their current archetypes do not allow it."
    },
    {
      "name": "Never Stop Shooting",
      "description": "Each time a fortress world character kills an enemy, they gain +10 stacks of never stop shooting. At the start of their turn, there is a (stacks of never stop shooting)% chance that the first attack this round will cost 0 AP and will not count toward the attack limit per round. If this effect triggers, all the stacks are lost."
    },
    {
      "name": "Spare Magazine",
      "description": "Fortress world characters' first reload in combat costs 0 AP. Reloading a weapon grants an additional +10 stacks of never stop shooting."
    }
  ],
  "Grand Strategist": [
    {
      "name": "Adjusting Frontline",
      "description": "If there are more enemies than allies in the Frontline area, all allies in the area gain +(3 + (Grand Strategist's INT + FEL bonus) / 2)% to parry and dodge. If there are more allies than enemies in the Frontline area, all allies in the area deal +(3 + (Grand Strategist's INT + FEL bonus) / 2)% damage."
    },
    {
      "name": "Blurred Locus",
      "description": "After the use of Combat Locus Stratagem, one of the areas removed by Combat Locus Stratagem can be recreated immediately."
    },
    {
      "name": "Critical Zone",
      "description": "Using a stratagem on a Backline area grants allies in the area +(3 + (Grand Strategist's INT + FEL bonus) / 2)% increased critical hit chance against enemies they are protected by cover from."
    },
    {
      "name": "Crossfire Zone",
      "description": "Using a stratagem on a Frontline area grants allies in the area +(10 + 2 x (Grand Strategist's INT + FEL bonus))% increased dodge against other allies' attacks."
    },
    {
      "name": "Daunting Zone",
      "description": "Willpower resistance tests forced by Overwhelming Stratagem are made with a -(5 + 2 X (INT + FEL bonus)) penalty."
    },
    {
      "name": "Disputed Zone",
      "description": "Enemies in the same Combat Tactics area with the Grand Strategist suffer a -(3 + (Grand Strategist's INT + FEL bonus) / 2)% penalty to dodge and parry."
    },
    {
      "name": "Diversion Zone",
      "description": "Using a stratagem on a Rear area also makes the allies in that area the enemies' lowest priority targets for 1 round."
    },
    {
      "name": "Enduring Zone",
      "description": "Using a stratagem on a Combat Tactics area grants all allies in the area +INT bonus deflection against the next melee hit they suffer."
    },
    {
      "name": "Fire at Will",
      "description": "If there are no enemies in the Backline area, the first attack in the turn made by every ally in that area costs -1 AP less."
    },
    {
      "name": "Fortress Zone",
      "description": "Allies under the effects of Trenchline Stratagem will dodge area attacks without movement and are immune to all types of forced movement."
    },
    {
      "name": "Improvised Strategy",
      "description": "At the start of combat, the Grand Strategist gains one random unknown stratagem and can use it until the end of combat for 0 AP."
    },
    {
      "name": "Inescapable Zone",
      "description": "Re-rolls forced by Killzone Stratagem are made with a -15 penalty."
    },
    {
      "name": "Mobility Zone",
      "description": "Using a stratagem on a Combat Tactics area grants all allies in the area the ability to move 1 cell without provoking attacks of opportunity."
    },
    {
      "name": "Opening Strategy",
      "description": "The first stratagem used in a turn can be used a second time for 0 AP."
    },
    {
      "name": "Overcoming Zone",
      "description": "Every time allies under the effect of Stronghold Stratagem should have suffered an injury, they gain +(INT + FEL bonus) temporary wounds instead."
    },
    {
      "name": "Personal Combat Zone",
      "description": "Allies gain the ability to reposition the Combat Tactics area they are currently at the cost of 1 AP."
    },
    {
      "name": "Personal Zone",
      "description": "Allies, including the Grand Strategist, in the same Combat Tactics area with the Grand Strategist gain +(3 + INT bonus / 2) Perception and Agility."
    },
    {
      "name": "Point of Interest",
      "description": "All Combat Tactics bonuses are increased by +((INT + FEL bonus) / 2)% if the area was not moved for 2 rounds."
    },
    {
      "name": "Redeployment",
      "description": "Every time a Combat Tactics area is affected by a stratagem, all allies in that area gain +1 MP for the following turn. Stacks with itself."
    },
    {
      "name": "Respite Zone",
      "description": "All allies in the Rear area are healed by medikits for +(5 + Grand Strategist's INT + FEL bonus) more and gain the same amount of temporary wounds. Medikits used by allies in the Rear area cost -1 AP less."
    },
    {
      "name": "Sniping Zone",
      "description": "Each ally in the Rear area gains +(3 + (Grand Strategist's INT + FEL bonus) / 2)% critical hit chance if there are no enemies in a 5-cell radius around the ally."
    },
    {
      "name": "Strategic Offensive",
      "description": "Every enemy killed in the Frontline area increases all bonuses of Combat Tactics areas by +1 until the end of combat."
    },
    {
      "name": "Strategic Perfection",
      "description": "Each time the Grand Strategist uses a stratagem, they gain a stack of the strategic perfection effect. At 6 stacks of strategic perfection, the next stratagem applies the benefits of all stratagems known by the Grand Strategist, then all the stacks are removed."
    },
    {
      "name": "Strongpoint",
      "description": "Using a stratagem on a Combat Tactics area for the second time in a turn refunds 1 AP. This effect can be activated once per turn."
    },
    {
      "name": "Supporting Zone",
      "description": "Using a stratagem on a Combat Tactics area grants the Grand Strategist the ability to use all Officer abilities on allies in the area regardless of distance."
    }
  ],
  "Hive World": [
    {
      "name": "Comradery",
      "description": "Hive world characters can pass Willpower resistance tests using their Fellowship value instead, if the character's Fellowship is higher."
    },
    {
      "name": "Fresh Start",
      "description": "Hive world characters gain a +50% bonus to dodge against the first attack of opportunity every round."
    },
    {
      "name": "Helping Hand",
      "description": "If a hive world character starts their turn adjacent to an ally character, that hive world character gains +2 MP. If a hive world character ends their turn adjacent to allies, they all gain +2 MP on their next turn."
    },
    {
      "name": "Outnumber",
      "description": "If a hive world character has melee superiority against the enemy, the effect is increased by +10. If an enemy has melee superiority against a hive world character, the effect is decreased by -10. Melee Superiority: in melee combat, any target surrounded by more allies then enemies receives a +10 WS bonus for each additional ally. Larger creatures need to be surrounded by more than two enemies to provide this advantage to the attackers."
    },
    {
      "name": "Strength in Numbers",
      "description": "Hive world characters gain +((1 + FEL bonus) / 2) resolve if there are 3 or more creatures (allies or enemies) in a 3-cell radius. Yet they suffer a -2 penalty to resolve with no creatures around."
    },
    {
      "name": "Weapon Personalization",
      "description": "All ranged weapons dealing physical damage have +1 damage, +1% armour penetration, +1 rate of fire, and -5 to recoil."
    },
  ],
  "Imperial World": [
    {
      "name": "Better to Die for the Emperor",
      "description": "While under 40% wounds, Imperial world characters gain a +10 bonus to all characteristics and +2 to resolve."
    },
    {
      "name": "Doing My Part",
      "description": "If no other character in the current party is from an Imperial world, the first use of any of the character's archetype abilities costs -1 AP less."
    },
    {
      "name": "Humanity's Finest",
      "description": "Imperial world characters can select any characteristic (except for Weapon Skill or Ballistic Skill) and add a +10 bonus."
    },
    {
      "name": "Know no Heresy",
      "description": "Imperial world characters gain +10% critical hit chance and +10% armour against xenos or daemonic creatures. Their allies gain half the bonuses of know no heresy. However, Imperial world characters' Lore (Xenos) and Lore (Warp) are always 0."
    },
    {
      "name": "Ready to Serve",
      "description": "When an Imperial world character is affected by an ally's non-damaging ability or affects an ally with such an ability, their resolve is increased by (FEL bonus / 2) for 1 round."
    },
    {
      "name": "Stronger Together",
      "description": "All allies, excluding xenos, in the current party gain +5 to the same characteristic as was chosen for Humanity's Finest."
    }
  ],
  "Master Tactician": [
    {
      "name": "Against All Odds",
      "description": "The Master Tactician begins combat with additional stacks of tactical advantage equal to the number of enemies."
    },
    {
      "name": "Ally Coordination",
      "description": "All allies have +25% dodge against attacks made by allies, deal -25% less damage to allies, and deal -50% less additional damage with critical hits against allies."
    },
    {
      "name": "Brink of Death",
      "description": "The Master Tactician deals +12% more damage to targets with less than 50% wounds and heals +20% more wounds for targets with less than 50% wounds."
    },
    {
      "name": "Comfort in Conformity",
      "description": "Whenever an ally grants the Master Tactician stacks of tactical advantage, that ally also heals 1 wound for every stack granted."
    },
    {
      "name": "Cost-Effective",
      "description": "Grenades and medikits cost -1 less action point to use (minimum 0)."
    },
    {
      "name": "Dawn of Victory",
      "description": "Every critical hit scored by the Master Tactician grants them momentum equal to (resolve / 2). Works up to 3 times per turn."
    },
    {
      "name": "Heroic Inspiration",
      "description": "The first ability the Master Tactician uses after the very first heroic act used in combat will cost 0 action points until the end of combat."
    },
    {
      "name": "Hidden Advantage",
      "description": "All the Master Tactician's abilities work as if the Master Tactician has FEL bonus more stacks of tactical advantage."
    },
    {
      "name": "In the Hero's Footsteps",
      "description": "Whenever the Master Tactician's ally uses a heroic act, the Master Tactician gains +5 Fellowship. Whenever their ally uses a desperate measure, the Master Tactician gains +5 Toughness. These bonuses stack and last until the end of combat."
    },
    {
      "name": "Joint Offensive",
      "description": "For every enemy hit by the Master Tactician's attack, the Master Tactician gains +1 stack of tactical advantage."
    },
    {
      "name": "Logistical Superiority",
      "description": "Whenever the Master Tactician or the Master Tactician's ally uses any consumable item (e.g., grenade, medikit, etc.) or reloads a weapon, the Master Tactician gains +2 stacks of tactical advantage."
    },
    {
      "name": "Nerves of Steel",
      "description": "Whenever the Master Tactician or their allies gain momentum, they gain +1 more. Whenever the Master Tactician or their allies lose momentum, they lose -1 less."
    },
    {
      "name": "Perfect Finish",
      "description": "Finish the Job gains +75% critical hit chance."
    },
    {
      "name": "Personal Involvement",
      "description": "Every enemy killed by the Master Tactician increases the Master Tactician's resolve by +1 until the end of combat."
    },
    {
      "name": "Primary Objective",
      "description": "Assign Objective also makes the target suffer +7% more damage from any source until the beginning of the Master Tactician's next turn."
    },
    {
      "name": "Reliance",
      "description": "Using Linchpin now spends only 1/4 of tactical advantage stacks instead of 1/2."
    },
    {
      "name": "Salvation",
      "description": "Using medikits on an ally under the effects of the Master Tactician's archetype abilities heals that target for additional wounds equal to (Master Tactician's FEL bonus + target's TGH bonus) and removes an extra injury wit out any tests."
    },
    {
      "name": "Stacking the Deck",
      "description": "Whenever the Master Tactician spends tactical advantage stacks on abilities, the critical damage dealt by the Master Tactician increases by +1% for every stack spent until the end of the turn."
    },
    {
      "name": "Stand Resolute",
      "description": "Whenever the Master Tactician heals an ally, that ally gains +1 resolve until the end of combat. This effect stacks up to a maximum of +FEL bonus."
    },
    {
      "name": "Stronghold",
      "description": "Strongpoint also grants half the amount of temporary wounds to the ally closest to the target."
    },
    {
      "name": "Suppressive Fire",
      "description": "All enemies hit by the Master Tactician have +10% higher chances of hitting a cover when shooting at the Master Tactician's allies behind a cover."
    },
    {
      "name": "Tactical Respite",
      "description": "Whenever the Master Tactician reloads a weapon, all allies within a 3-cell radius around the Master Tactician also reload their weapons."
    },
    {
      "name": "Undisputed Advantage",
      "description": "Press the Advantage ignores cover and dodge."
    },
    {
      "name": "Unwavering Motivation",
      "description": "The target of Inspire gains +1 additional damage for every 10 stacks of tactical advantage until the beginning of the Master Tactician's next turn."
    }
  ],
  "Ministorum Priest": [
    {
      "name": "Flensing Faith",
      "description": "Melee, flame, and melta attacks against daemons and psykers deal an additional +(2 X WP bonus) damage and gain +(6 X WP bonus)% armour penetration. Such attacks against xenos deal an additional +WP bonus damage and gain +(3 X WP bonus)% armour penetration."
    },
    {
      "name": "Litany of Hatred",
      "description": "The Ministorum priest and their allies in the area of effect of War Hymn gain +(priest's WP bonus / 2) damage for single shots and attacks of opportunity for 1 round."
    },
    {
      "name": "Litany of Purification",
      "description": "All enemies in the area of effect of War Hymn gain +1 stack of the disturbed effect. Enemies that are adjacent to the priest gain +2 stacks of disturbed instead. Also, all daemons in the area of effect suffer damage equal to the momentum restored to the priest while using this ability."
    },
    {
      "name": "Shield of Faith",
      "description": "The Ministorum priest gains +(4 X WP bonus)% to armour against attacks of daemons and warp damage. The priest's resolve is also permanently increased by (WP bonus / 2)."
    },
    {
      "name": "The Emperor Protects",
      "description": "The Ministorum priest gains a WP bonus% chance to ignore any enemy attack."
    },
    {
      "name": "War Hymn",
      "description": "Grants momentum equal to (2 X devotee's WP bonus). This ability also grants an additional WP bonus momentum for each enemy that is either in a 5-cell radius around the priest or was hit by the priest this turn. ! Can only be used once per combat."
    }
  ],
  "Navigator": [
    {
      "name": "Blood Augury",
      "description": "Enemies damaged by the Navigator suffer +(5 + Navigator's PER bonus)% additional damage from warp damage. The bonus damage stacks for each hit."
    },
    {
      "name": "Ebb and Flow",
      "description": "Every even (second, fourth, etc.) turn, the Navigator gains an additional action point. Every odd turn (first, third, etc.) the Navigator gains +20 Perception."
    },
    {
      "name": "Eye of Oblivion",
      "description": "Every enemy the Navigator has in their line of sight has its dodge and hit chance reduced by -(Navigator's PER bonus)."
    },
    {
      "name": "Guide of Souls",
      "description": "The Navigator starts all turns, including extra turns, with +3 additional movement points. The first ally, targeted each turn by the Navigator with a single-target ability, gains the same amount of additional movement points at the start of their next turn."
    },
    {
      "name": "Mastery of Time",
      "description": "Whenever a Navigator's ally in combat gains an extra turn, the Navigator gains a stacking +5 bonus to Willpower until the end of combat (up to 5 times)."
    },
    {
      "name": "Mind Over Matter",
      "description": "The Navigator makes all resistance test with their Willpower if it is higher than the base characteristic for such test. If the Navigator's Willpower is higher than their Toughness, the Navigator's wounds are calculated according to their Willpower."
    },
    {
      "name": "Open to the Warp",
      "description": "Enemies affected by the Navigator's abilities suffer a stacking -10 penalty to the next resistance test from the Navigator's powers. The penalty is lost after such a test is made."
    },
    {
      "name": "Pass Unscathed",
      "description": "If the Navigator's Perception is higher than their Agility, their dodge is calculated using Perception instead."
    },
    {
      "name": "Perilous Ways",
      "description": "Enemies moved by the Navigator's abilities suffer 1+WP bonus/2 damage at the end of movement. This damage is increased by +1 for every cell the enemy moves."
    },
    {
      "name": "Stable Routes",
      "description": "Whenever the Navigator uses a Navigator's ability, veil degradation is reduced by -1."
    },
    {
      "name": "Strange Vitality (Navigator)",
      "description": "The Navigator heals WP bonus wounds at the beginning of every turn and gains +1 additional wound for every Navigator talent taken. The healing increases by +1 for every creature killed in between the Navigator's turns."
    },
    {
      "name": "The Course Untravelled",
      "description": "Whenever the Navigator uses a Navigator power that hasn't been used this combat, the Navigator gains +2 Perception until the end of combat."
    },
    {
      "name": "Threads and Faults",
      "description": "Whenever an enemy fails a resistance test against a Navigator's power, attacks against them gain +(20 + 2 X PER bonus)% critical hit chance. The effect stacks but is reset by a critical hit."
    },
    {
      "name": "Tonicity",
      "description": "Navigator path powers deal +1 additional damage for every 5 bonus characteristic of the Navigator's currently equipped staff. Castigating, infusing, and devastating count as characteristics for this talent."
    },
    {
      "name": "Unblinking Stare",
      "description": "Until the end of combat, enemies damaged by the Navigator suffer an additional +PER bonus damage from all attack of opportunity and cannot dodge them."
    },
    {
      "name": "Undam the Sea of Souls",
      "description": "While under effect of any Navigator power, enemies have their armour reduced by -(5 + Navigator's WP bonus).This reduction is increased by the devastating parameter of the Navigator's staff but does not stack."
    },
    {
      "name": "Under My Protection",
      "description": "Allies that are targeted by the Navigator's abilities gain +5 to all resistance test against warp effects (caused by daemons, psychic powers, Navigator powers, etc.) until the end of combat. The effect stacks with every applied Navigator ability."
    },
    {
      "name": "Unnatural Allure",
      "description": "The Navigator gains +5 to Fellowship and an additional +1 to Fellowship for every Navigator talent and/or Navigator power taken."
    },
    {
      "name": "Veil of Protection",
      "description": "Allies that are targeted by the Navigator's power gain +10% armour. This additional armour is reduced by the amount of veil degradation (to a minimum of +0%) and increased by the infusing of the currently equipped Navigator's staff."
    }
  ],
  "Navy Officer": [
    {
      "name": "Do Not Falter!",
      "description": "All allies affected by Brace for Impact! do not suffer the negative effects of melee superiority for the entire combat.  Melee Superiority: in melee combat, any target surrounded by more allies than enemies receives a +10 Weapon Skill bonus for each additional ally. Larger creatures need to be surrounded by more than two enemies to provide this advantage to the attackers."
    },
    {
      "name": "Get Into Cover!",
      "description": "All allies affected by Brace for Impact! gain an extra turn with O AP and 3 MP and increase their cover efficiency by +20% for 1 round."
    },
    {
      "name": "Get off Me",
      "description": "Brace for Impact! also allows the Navy Officer to use any ranged weapon in threatened areas, knocks enemies prone, and pushes them 1 cell away during the effect."
    },
    {
      "name": "Perfect Timing",
      "description": "All allies affected by Brace for Impact! gain +30% to cover penetration. The Navy officer also permanently gains + 15% to cover penetration."
    },
    {
      "name": "Scatter",
      "description": "All allies affected by Brace for Impact! suffer only half damage from all attacks of opportunity."
    }
  ],
  "Noble": [
    {
      "name": "You. Do Something.",
      "description": "If a noble uses an ability on their servant, the servant gains +1 AP next turn. Does not stack with itself."
    },
    {
      "name": "You. Go On.",
      "description": "The noble's servant gains +2 movement points every turn."
    },
    {
      "name": "You. Kill It.",
      "description": "If the servant kills the target that the noble dealt damage to last turn, the noble gains +1 AP next turn."
    },
    {
      "name": "You. Protect Me.",
      "description": "If the noble and the servant are adjacent to each other at the start of the noble's turn, they both gain temporary wounds equal to servant's TGH bonus or noble's FEL bonus depending on which is higher."
    },
    {
      "name": "You. Serve Me.",
      "description": "The noble assigns one ally who Will become their servant until the end of combat. Any time the noble's abilities affect the servant, the servant gains +5 to all characteristics until the start of the noble's next turn. Any time the servant attacks a target that the noble dealt damage to last turn, the servant gains +(10 + noble's FEL bonus)% critical hit chance against that target. Can only be used once per combat."
    },
    {
      "name": "You. You Are Next.",
      "description": "If the servant has less than 30% maximum wounds, the noble can use You. Serve Me. once more in battle, designating a new servant and removing the effect from the previous one. The noble cannot designate a character who already was their servant this combat."
    }
  ],
  "Officer": [
    {
      "name": "Armour of Contempt",
      "description": "Whenever an ally is affected by an Officer's ability or talent that grants temporary wounds, that ally's armour is increased by +10% for 1 round. Does not stack."
    },
    {
      "name": "Be Vigilant!",
      "description": "Allies under the effect of the Officer's abilities gain a bonus to their Weapon Skill equal to (3 + Officer's FEL bonus) and will deal +FEL bonus more damage on attacks of opportunity until the start of the Officer's next turn."
    },
    {
      "name": "Blood of Martyrs",
      "description": "Whenever an ally uses a heroic act, that ally gains temporary wounds equal to (10% of their maximum wounds + Resolve)."
    },
    {
      "name": "Commanding Voice",
      "description": "The range of the Officer's abilities is increased by +3. The range of Voice of Command is increased by +6."
    },
    {
      "name": "Focus!",
      "description": "Whenever the Officer uses an ability on an ally, that ally gains a bonus to their Perception and Ballistic Skill equal to 2+(Officer's Resolve Bonus/2). These bonuses stack, but half of the stacks (rounded up) are lost at the end of the target's turn."
    },
    {
      "name": "Heroism",
      "description": "Whenever a heroic act is used in combat by any character, the Officer's next attack will cost 0 AP."
    },
    {
      "name": "Inspire Courage",
      "description": "Whenever the Officer targets an ally with an ability for the first time in a round, that ally gains +WP bonus temporary wounds."
    },
    {
      "name": "Inspiring Speech",
      "description": "Air of Authority immediately grants momentum to the target equal to the target's resolve."
    },
    {
      "name": "Into the Jaws of Hells",
      "description": "The Officer gains +10 Willpower and +10 Fellowship when they have less than 50% of their maximum wounds remaining. They also gain an additional +10 Willpower and +10 Fellowship after using any Officer ability on a target with less than 50% wounds for 1 round. >These two sets of bonuses stack with each other but do not stack with themselves (the Officer can only have up to +20 Willpower and +20 Fellowship granted by 2 this talent at any given time)."
    },
    {
      "name": "Iron Discipline",
      "description": "Allies affected by the Officer's abilities gain a bonus to all resistance tests equal to (2 X Officer's WP bonus)."
    },
    {
      "name": "Lasting Impression",
      "description": "Half of the bonus granted by the Voice of Command remain until the end of combat. This bonus does not stack with itself or with bonuses granted by Voice of Command but does count as an Officer ability effect for the purposes of other talent effects."
    },
    {
      "name": "Lead by Example",
      "description": "Whenever the Officer uses an Officer archetype ability two times in one turn that does not grant an extra turn, they gain the stand witness effect. >Stand Witness: the next Officer archetype ability that does not grant an extra turn will also affect the Officer."
    },
    {
      "name": "Leader's Assault",
      "description": "Whenever the Officer makes an attack, they gain +5 Fellowship until the end of combat."
    },
    {
      "name": "March",
      "description": "Whenever the Officer's ability moves any target, the Officer gains movement points equal to half the distance the target moved. If this happens on another character's turn, the Officer will gain these movement points on their next turn."
    },
    {
      "name": "No Respite",
      "description": "Whenever the Officer's ability grants action points to an ally, that ally also gains +1 to all characteristics for every action point gained until the end of combat."
    },
    {
      "name": "Personal Oversight",
      "description": "Whenever the Officer targets an ally with an action (an ability or an attack), that ally's resolve is increased by +1 until the end of the Officer's next turn. This effect stacks and is prolonged until the end of the Officer's next turn each time it stacks. Cannot be prolonged past the Officer's next turn."
    },
    {
      "name": "Physical Encouragement",
      "description": "Whenever an ally starts a turn (including any extra turn) adjacent to the Officer, that ally gains additional MP equal to (Officer's FEL bonus / 2)."
    },
    {
      "name": "Prepare for an Assault!",
      "description": "Break Their Ranks! works as if there were one more enemy adjacent to the target. This allows this ability to be used on targets with no enemies adjacent to them."
    },
    {
      "name": "Seize the Initiative",
      "description": "Allow officers and allies under the effect of the officer's Voice of Command to deal additional damage to enemies that have not yet acted in this combat."
    },
    {
      "name": "Steady!",
      "description": "Take Aim! also increases the damage of the next ranged attack by 5% + 1% for each cell between the attacker and the target."
    },
    {
      "name": "Steel Resolve",
      "description": "The Officer's resolve is increased by +3."
    },
    {
      "name": "Watch Yourself!",
      "description": "Targets of Move! Move! Move! gain a +10% bonus to dodge and a +10% bonus to cover efficiency until the start of the Officer's next turn."
    },
    {
      "name": "Wounds Are No Excuse!",
      "description": "Get Back in the Fight! removes 1 fresh injury from the target and heals the target for (Officer's WP bonus / 2) wounds for each condition removed by Get Back in the Fight! (including fresh injuries). A minimum of (Officer's WP bonus / 2) wounds is always healed, even if no conditions are removed."
    }
  ],
  "Operative": [
    {
      "name": "Ballistics Calculation",
      "description": "If the Operative attacks a target affected by an exploit from a distance of (15 - PER bonus) cells or farther, that attack deals +15% damage."
    },
    {
      "name": "Combat Insight",
      "description": "While the Operative's Perception bonus is 10 or higher, they gain +1 AP and ignore enemies' deflection."
    },
    {
      "name": "Comprehensive Analysis",
      "description": "If the target of Analyse Enemies has 2 or more exploits, that target suffers +1 additional exploit."
    },
    {
      "name": "Continuous Analysis",
      "description": "At the start of the Operative's turn, the enemy with the largest number of exploits receives an additional exploit stack. If two or more enemies are tied for the largest number of exploit stacks, one of those enemies is chosen at random."
    },
    {
      "name": "Covert Protocol",
      "description": "While the Operative is in half cover, their cover efficiency is increased by +15%. This bonus is doubled if the Operative has not moved during their turn."
    },
    {
      "name": "Fresh Target",
      "description": "Whenever the Operative attacks an enemy that is at full wounds, that attack deals +(10 + PER bonus)% more damage to that enemy."
    },
    {
      "name": "Improved Tactics",
      "description": "Tactical Knowledge requires 3 exploits instead of 4. The Operative's damage is increased by +INT bonus."
    },
    {
      "name": "Inflict Despair",
      "description": "Whenever the Operative hits an enemy that is affected by both an exploit and Expose Weakness, that enemy loses -3 MP and their damage is reduced by -20% on their next turn."
    },
    {
      "name": "Informed Hit",
      "description": "If the Operative uses Precise Attack on a target affected by (10 - INT bonus) or more exploits and scores a hit, that hit becomes a critical hit."
    },
    {
      "name": "Insightful Precision",
      "description": "Precise Attack grants the Operative a bonus to Perception equal to (number of exploits removed / 2) (minimum 1) ."
    },
    {
      "name": "Instant Exposure",
      "description": "Expose Weakness costs 0 AP."
    },
    {
      "name": "Joint Offense",
      "description": "The Operative's allies gain +Operative's INT bonus / 2 hit chance and critical hit chance while attacking targets affected by exploits."
    },
    {
      "name": "Offensive Pattern Prediction",
      "description": "The Operative suffers -(3 x INT bonus)% less damage from enemies affected by exploits."
    },
    {
      "name": "Passive Learning",
      "description": "On their first turn in combat, the Operative randomly distributes the same number of exploits as when using Analyse Enemies among all enemies in a 10-cell radius around the Operative. At the start of each of the Operative's subsequent turns, they distribute half as many exploits (half the base amount) among all enemies in a 2-cell radius around the Operative."
    },
    {
      "name": "Reactive Study",
      "description": "If an enemy affected by an exploit within 5 cells from the Operative attacks the Operative or their ally, that enemy suffers +1 additional exploit."
    },
    {
      "name": "Sharpshooter",
      "description": "If the Operative has not moved this turn, they gain +PER bonus Ballistic Skill and +(INT bonus / 2) damage for every 5 cells between them and the target."
    },
    {
      "name": "Sniper Expertise",
      "description": "Perfect Shot additionally grants the Operative +(5 + PER bonus)% armour penetration against enemies that are 7 cells away or farther."
    },
    {
      "name": "Terrifying Presence",
      "description": "If Intimidation kills the target, the damage of all other enemies in the area of Intimidation is reduced by an additional -(4 X INT bonus)%."
    },
    {
      "name": "Tide of Excellence",
      "description": "Whenever the Operative triggers an exploit on an enemy, the Operative gains +1 damage and +2% armour penetration until the end of combat. Stacks."
    },
    {
      "name": "Uncanny Sight",
      "description": "The Operative inflicts an exploit even on enemies which are out of the Operative's line of sight at the start of the turn."
    },
    {
      "name": "Weak Body, Weak Soul",
      "description": "Expose Weakness also reduces enemies' Toughness and Willpower by -(3 X INT bonus) for 1 round."
    }
  ],
  "Overseer": [
    {
      "name": "\"Heel!\" Protocol",
      "description": "The cyber-mastiff gains +25 Weapon Skill and Strength and deals +400% more damage. The Overseer gains the Heel! ability."
    },
    {
      "name": "Advanced Tracking",
      "description": "Whenever the Overseer relays a psychic power, a random enemy in a 4-cell radius around the psyber-raven becomes immobilised for 1 round. If that enemy is already immobilised, it suffers+1 stack of perplexed instead."
    },
    {
      "name": "Air Support",
      "description": "The cyber-eagle gains +10 Agility and Perception and deals +150% more damage. While the cyber-eagle is soaring, the Overseer gains +XX% critical hit chance for ranged attacks. Critical damage dealt to the obstructed enemy is increased by +XX%"
    },
    {
      "name": "Analytics Module",
      "description": "Whenever an ability extrapolated through the servo-skull swarm affects other creatures, the servo-skull swarm gains a stacking +5 bonus to Intelligence and Fellowship until the end of the Overseer's next turn."
    },
    {
      "name": "Apprehend!",
      "description": "The Overseer chooses an enemy in their line of sight. If it does not have enough Movement Points to move as close as possible to that enemy, it moves as close as possible. Upon reaching this enemy, the cyber-mastiff attacks, dealing +50% more damage and inflicting the apprehended effect, which lasts as long as the enemy and the cyber-mastiff are adjacent to each other or until another order is given. The ability can be used multiple times per turn, but each subsequent use within a round increases its cost by +1 Action Points."
    },
    {
      "name": "Auto-Medicae",
      "description": "If the cyber-mastiff suffers Burning, Toxin, at the start of the Overseer's turn, the level of that effect is reduced by bonus."
    },
    {
      "name": "Battle Mode: Standby",
      "description": "The Overseer may order the cyber-mastiff to fight autonomously. It gains the battle mode: standby effect until the end of combat or until a new order is given."
    },
    {
      "name": "Binding Strike",
      "description": "The Overseer selects an unoccupied cell in their line of sight. The cyber-eagle moves to that cell and deals its weapon damage to all adjacent enemies without provoking attacks of opportunity. Those enemies must pass an Agility resistance test with a –19 penalty or become Blinded for 1 round. Then, the cyber-eagle begins soaring, this ability is replaced with Binding Strike — Soaring."
    },
    {
      "name": "Binding Strike — Soaring",
      "description": "The Overseer selects an unoccupied cell in their line of sight. The cyber-eagle lands at that cell without provoking attacks of opportunity. The cyber-eagle then deals twice its weapon damage to adjacent enemies, and gains temporary wounds for 1 round. The designated enemy becomes immobilised (the effects last while the cyber-eagle is in the designated cell). If the Overseer's ally has a melee weapon, it can make an attack on the cyber-eagle using the lowest AP-cost attack, gaining a +50% chance to hit. If there are any within a cone behind the cyber-eagle, Then, the cyber-eagle attacks this enemy, dealing % more damage and spending 0 AP. This ability can be used multiple times per turn, but each subsequent use within a round increases its cost by +1 AP until the end of round."
    },
    {
      "name": "Bite!",
      "description": "The cyber-mastiff chooses an enemy in their line of sight. The cyber-mastiff immediately signs to that enemy and performs a special attack. The target suffers double Rending damage and must pass a Toughness resistance test with a –10 penalty or fall prone for 1 round. This ability removes the effects of the Apprehend! abilities."
    },
    {
      "name": "Blessing of the Immaterium",
      "description": "The psyber-raven gains +30 WIllpower. While in a 4-cell radius around the psyber-raven, the Overseer's relayed attacking psychic powers."
    },
    {
      "name": "Blood Feast",
      "description": "The cyber-eagle gains +20 Perception and deals +300% damage. Its critical damage against bleeding targets is increased by+25%. At the start of the cyber-eagle's turn, it attacks the obstructed enemy. This attack has the following possible effects: If the obstructed enemy has 100% wounds before that attack, they must pass a Toughness resistance test of suffer XX levels of bleeding If the obstructed enemy has 50% or less wounds before that attack, the attack gains +50% critical hit chance If the obstructed enemy was hit by the Overseer this round, the cyber-eagle's attack gains +20% critical damage"
    },
    {
      "name": "Cohesion",
      "description": "The familiar gains +50% dodge against their Overseer's attacks."
    },
    {
      "name": "Consolidation",
      "description": "The Overseer immediately dashes to their familiar within XX cells. The Overseer can move through allies and enemies but not through obstacles. This movement does not provoke attacks of opportunity. If the familiar is a cyber-eagle that is soaring, the Overseer gains + XX MP instead."
    },
    {
      "name": "Cyber-Eagle Proficiency",
      "description": "The Overseer can use a powerful cyber-eagle with its own unique set of abilities and talents."
    },
    {
      "name": "Cyber-Mastiff Proficiency",
      "description": "The Overseer can use a powerful Cyber-Mastiff with its own unique set of abilities and talents."
    },
    {
      "name": "Cyber-Mastiff Proficiency",
      "description": "The Overseer can use a powerful cyber-mastiff with its own unique set of abilities and Talents."
    },
    {
      "name": "Dangerous Neighborhood",
      "description": "The servo-skull swarm gains +10 Fellowship. At the start of the Overseer's turn,enemies adjacent to the servo-skull swarm must pass a Willpower resistance test with a +20 bonus or suffer+1 stack of perplexed. The servo-skull swarm's deflection is increased by +1 for each perplexed enemy in a 4-cell radius."
    },
    {
      "name": "Dependable Ally",
      "description": "Whenever a familiar's ability is used on an ally (can be the Overseer), for 1 round, that ally gains a +5 bonus to characteristics considered to be key characteristics of the familiar."
    },
    {
      "name": "Domination and Elimination",
      "description": "The cyber-mastiff gains +10 Strength and deals +100% more damage. If the cyber-mastiff is adjacent to an enemy at the end of the Overseer's turn, the Overseer gains +1 resolve until the end of combat. Stacks."
    },
    {
      "name": "Emergency Stimulation",
      "description": "Once per combat, the servo-skull swarm can save an ally. If that ally suffers Lethal damage in a 4-cell radius around the servo-skull swarm, that ally regains (servo-skull swarm's maximum wounds) and remains in combat. Then, the servo-skull swarm suffers (100 - Medicae) / 5 % shock damage."
    },
    {
      "name": "Energy Multiplier",
      "description": "Whenever the Overseer's servo-skull swarm bring it Down! on an ally in a 4-cell radius around the servo-skull swarm, which then also grants an additional Extra Turn to another ally in their area, the servo-skull swarm gains +5 to all characteristics. Stacks."
    },
    {
      "name": "Ether Wind",
      "description": "The psyber-raven gains +40 Willpower. Whenever it relays a psychic power, the Overseer gains +XX MP. Whenever an attacking psychic power is relayed, the damage of the next relayed attacking psychic power is increased by +XX %."
    },
    {
      "name": "Extrapolation",
      "description": "Whenever the Overseer uses non-attacking single-target abilities (except psychic powers, Navigator abilities and those granting Extra Turns) on their servo-skull swarm, they are applied to all relevant targets (allies or enemies) in a 4-cell radius around it, having no effect on the servo-skull swarm itself. If the Overseer uses an ability granting an extra turn to an ally in that area (except Fresh Hour!), the closest ally to the initial target also gains an extra turn. Enemies in a 4-cell radius around the servo-skull swarm are under surveillance."
    },
    {
      "name": "Falconry",
      "description": "The cyber-eagle gains +20 Agility and Perception and deals +400% damage. Whenever the Overseer's attack hits, the cyber-eagle scores a critical hit against the obstructed enemy and reduces their Perception by XX until the end of the round. This penalty does not stack. Whenever the cyber-eagle starts soaring, adjacent enemies lose all temporary wounds and become immobilised for 1 round."
    },
    {
      "name": "Growl!",
      "description": "The cyber-mastiff lets out a terrifying growl. For 1 Round, all enemies in a 2-cell radius deal % less damage to the cyber-mastiff, the Overseer and allies that are more difficult for the cyber-mastiff to pin."
    },
    {
      "name": "Harbinger of Death",
      "description": "The psyber-raven gains +30 Willpower. Targets of the first psychic power of the Overseer in a turn automatically fail their Resistance tests against that psychic power. If the first psychic power in a turn affects 3 or more creatures, the Overseer gains +1 Action Points."
    },
    {
      "name": "Hat Relay",
      "description": "The Overseer commands their psyber-raven to stop laying."
    },
    {
      "name": "Law of Equilibrium",
      "description": "The psyber-raven gains +15 Willpower. At the end of the Overseer's Turn, allies in a 4-cell radius around the psyber-raven have their Burning, Toxin, and Bleeding level reduced by -bonus and enemies in that area suffering any of those effects have their level increased by +bonus."
    },
    {
      "name": "Life Emanations",
      "description": "Whenever the psyber-raven relays one of the Overseer's non-attacking psychic powers, the psyber-raven's Willpower is 80 or more at the end of the Overseer's Turn, it gains +5 Willpower for 1 Round. Stacks. If the psyber-raven's Willpower is 80 or more at the end of the Overseer's Turn, it heals to full. If it is already at full Wounds, it grants +1 Resolve to each ally in a 4-cell radius."
    },
    {
      "name": "Live Bait",
      "description": "The Overseer chooses an enemy. The cyber-eagle chooses an ally within their line of sight and grants them stacks of the boll effect."
    },
    {
      "name": "Master's Patronage",
      "description": "At the start of the Overseer's turn, the familiar gains up to 1 Temporary Wounds per 1 Willpower."
    },
    {
      "name": "Obstruct Vision",
      "description": "The Overseer chooses an enemy in their line of sight and an unoccupied cell adjacent to that enemy. The cyber-eagle moves to that cell (can move through occupied cells) without provoking attacks of opportunity. If the designated enemy only has a melee weapon, it attacks the cyber-eagle, using the lowest AP-cost attack. If that enemy has a ranged weapon, it shoots at the cyber-eagle, using the lowest AP-cost attack, with an additional +50% chance to hit that enemy's allies (if there are any within a cone behind the cyber-eagle). Then, the cyber-eagle attacks this enemy, dealing % damage is in that cell. This designated enemy becomes obstructed. The ability can be used multiple times per turn, but each subsequent use within a round increases its cost by +1 AP until the end of round. While the cyber-eagle is soaring, this ability is replaced with Obstruct Vision — Soaring."
    },
    {
      "name": "Pack Hunting",
      "description": "The cyber-mastiff gains +20 Weapon Skill and Strength. Its maximum Wounds is increased by +50%, and it deals +300% more damage. If the cyber-mastiff attacks the target that any other (than the Overseer) successfully attacks for the first time in a round, the cyber-mastiff regains 20% of its maximum Wounds."
    },
    {
      "name": "Perimeter Defense",
      "description": "If Protect! is used on the Overseer, the cyber-mastiff's Movement Points is doubles when moving to them."
    },
    {
      "name": "Protect!",
      "description": "The Overseer chooses an ally in their line of sight. If it does not have enough Movement Points to move as close as possible to that ally, it moves as close as possible. Upon reaching them, the cyber-mastiff applies protected effect (is protected by the cyber-mastiff) to them and makes a Melee Area Attack against adjacent enemies. The protected effect lasts until the cyber-mastiff or the targeted ally's Wounds drop to 0 or until another order is given. When used on the Overseer for the first time in combat, the Overseer regains 1 Action Points."
    },
    {
      "name": "Psy-Resonator",
      "description": "When the psyber-raven relays a psychic power, the psyber-raven for the first time in a Round, they regain +1 Action Points."
    },
    {
      "name": "Psyber-Raven Proficiency",
      "description": "The Overseer can use a powerful psyber-raven with its own unique set of abilities and Talents."
    },
    {
      "name": "Reactivate",
      "description": "The Overseer chooses an enemy. If the Overseer chooses an Unconscious enemy in their line of sight within a 5-cell radius. That familiar regains up to 10% of its Wounds and returns to combat. Can be used on familiars of other Overseers still in combat."
    },
    {
      "name": "Relentless Pursuit",
      "description": "The apprehended enemy takes +more damage from the Overseer."
    },
    {
      "name": "Relocate",
      "description": "The Overseer commands their psyber-raven to immediately move up to occupied cells. It can move through occupied cells and does not trigger attacks of opportunity."
    },
    {
      "name": "Relocation",
      "description": "The Overseer commands their servo-skull swarm to immediately move up to 10 cells. It can move through occupied cells and does not trigger attacks of opportunity."
    },
    {
      "name": "Rite of Calibration",
      "description": "The first use of the Overseer's Ability in combat costs –1 Action Points."
    },
    {
      "name": "Safe Shelter",
      "description": "If the Overseer or their allies are protected by partial Cover in a 4-cell radius around the servo-skull swarm, they are considered protected by full cover."
    },
    {
      "name": "Screen — Soaring",
      "description": "The Overseer chooses an ally within their line of sight and grants them stacks of the background effect."
    },
    {
      "name": "Servo-Skull Swarm Proficiency",
      "description": "The Overseer can use a powerful servo-skull swarm with its own unique set of abilities and Talents."
    },
    {
      "name": "Side by Side",
      "description": "While the Overseer and their familiar are adjacent to each other, both of them re-roll failed Dodge attempts once per attack."
    },
    {
      "name": "Soar!",
      "description": "The cyber-eagle moves to the cell. The cyber-eagle soars high above the battlefield. This action does not provoke attacks of opportunity."
    },
    {
      "name": "Step into the Abyss",
      "description": "The psyber-raven gains +25 Willpower. At the start of the Overseer's turn, enemies in a 4-cell radius around the psyber-raven immediately move 1 cell toward the psyber-raven and must pass a Willpower Resistance test or become Staggered."
    },
    {
      "name": "Stimulation Protocol",
      "description": "The servo-skull swarm gains +20 Fellowship and Intelligence. Whenever the servo-skull swarm extrapolates, the Overseer gains 1 stack of added stimulus. At 5 stacks, it grants an Extra Turn to the closest ally (excluding the Overseer). Then, all the stacks are removed."
    },
    {
      "name": "Strate",
      "description": "The Overseer selects a cell within their line of sight within a 12-cell radius around the cyber-eagle and another unoccupied cell within 1/2 of that cell. The cyber-eagle moves to the first cell and lands there. It attacks each cell in a straight line, dealing its weapon damage to each enemy in its path without provoking attacks of opportunity. Then, the cyber-eagle begins soaring, this ability is replaced with Strate — Soaring."
    },
    {
      "name": "Strate — Soaring",
      "description": "The Overseer selects two cells within line of sight of the cyber-eagle. The second cell must be unoccupied. The cyber-eagle lands at the first cell, using the soaring effect and dashes to the second cell in a straight line, dealing twice its weapon damage to each enemy in its path. If any of those enemies are bleeding, they must pass an Agility resistance test with a –30 penalty or become immobilised for 1 round. This movement does not provoke attacks of opportunity."
    },
    {
      "name": "Strategic Adaptation",
      "description": "Depending on their familiar's number of Wounds, the Overseer gains a special benefit for 1 round: –Less than 50% wounds: the next 3 hits against the familiar have their damage reduced by –50% wounds or more: the Overseer deals % more damage with their next attack. If that attack kills the target, it does not count toward the attack limit per turn, and the Overseer regains any Action Points spent on it."
    },
    {
      "name": "Symbiosis",
      "description": "The Overseer through the servo-skull swarm for the first time in a Round, they regain +1 Action Points."
    },
    {
      "name": "Synergy",
      "description": "The psyber-raven gains +10 Willpower. If the psyber-raven is adjacent to 2 or more creatures after Relocate is used on it, psychic powers relayed through the psyber-raven are calculated as if Psy Rating were increased by +1 until the end of the Overseer's turn."
    },
    {
      "name": "The Null Directive",
      "description": "Whenever the Overseer fails Unconscious, the cyber-eagle inflicts a portion of its damage on the enemy that dealt the lethal damage. Then, the cyber-eagle starts sharing."
    },
    {
      "name": "Thermodynamic Protocol",
      "description": "The servo-skull swarm gains +20 Intelligence. At the start of the Overseer's turn, allies in a 4-cell radius around the servo-skull swarm have their Toxin, and Bleeding level reduced by –bonus. At the end of the Overseer's turn, their servo-skull swarm explodes, mimicking the effects of a fire grenade."
    },
    {
      "name": "Twisted Fate",
      "description": "At the start of combat, the psyber-raven grants Twisted Fate to their Overseer, providing them with additional protection. The thread of your life has been tangled by the Weaver of Destinies. Not even death can see where this thread begins and ends."
    },
    {
      "name": "Unseen Support",
      "description": "While the Overseer is 5 or more cells away from the servo-skull swarm, their Fellowship is increased by +bonus."
    },
    {
      "name": "Warp Buffer",
      "description": "If there is a wails of the psyber-raven, whenever the Overseer triggers Perils of the Warp, it affects a random enemy inside that area instead of the Overseer. If there are no enemies in this area, perils of the warp affects the Overseer as usual."
    },
    {
      "name": "Warp Relay",
      "description": "Whenever the Overseer uses non-attacking single-target psychic powers (except those granting Extra Turns) on their psyber-raven, they are applied to all relevant targets (allies or enemies) in a 4-cell radius around it, having no effect on the psyber-raven itself. Enemies in a 4-cell radius around the psyber-raven are under surveillance."
    },
    {
      "name": "Weakest Link",
      "description": "Whenever the Overseer's hit hits the same target right after the cyber-mastiff in battle mode: standby hits it, the Overseer's attacks always score a critical hit."
    },
    {
      "name": "Winged Aegis",
      "description": "At the start of combat and whenever the Overseer ends their turn, the cyber-eagle starts soaring and retains it for 1 round. While soaring, it gains a +10% of its maximum wounds at the start of each round."
    }
  ],
  "Pasqal": [
    {
      "name": "Acceleration Protocols",
      "description": "Pasqal gains 4 MP in the first round of combat. Every successful melee attack grants Pasqal +(INT bonus / 2) MP for the next round."
    },
    {
      "name": "Aiming Protocols",
      "description": "Pasqal gains +(5+INT) to Ballistic Skill and a +(10+INT)% to dodge reduction with plasma and melta weapon ranged attacks."
    },
    {
      "name": "Close-up Scanning",
      "description": "Pasqal's melee attacks apply the machine spirit communion effect on all attacked enemies."
    },
    {
      "name": "Exposing Communion",
      "description": "Pasqal's attacks and effects of the Expose Weakness ability gain bonuses against enemies under the effects machine spirit communion, as if those enemies had 2 more stacks of exploit."
    },
    {
      "name": "Filtering Protocols",
      "description": "When Pasqal uses plasma or melta weapons the first time in a round, he gains a +1 AP."
    },
    {
      "name": "Machine Spirit Scan Protocols",
      "description": "Machine Spirit Communion applies 1 stack of exploit on all affected enemies."
    },
    {
      "name": "Manipulator Push",
      "description": "Manipulator mechadendrite attacks enemies in close combat, pushing them up to 2 cells away and dealing (WS + INT bonus) damage. This attack has (5 x Tech-Priest's PER bonus)% armour penetration."
    },
    {
      "name": "Medicae Mechadendrite",
      "description": "The Tech-Priest can use their mechadendrite to restore the wounds of an ally once per combat. The ally against (6 + Medicae / 5) wounds."
    },
    {
      "name": "Overcharge Protocols",
      "description": "Every time Pasqal uses plasma or melta weapons, his damage with these weapons increases by (5+INT)%. Stacks. If Pasqal does not shoot for 1 round, he loses all stacks."
    },
    {
      "name": "Predictions Protocols",
      "description": "Pasqal gains a +(15+INT)% to dodge reduction and parry reduction with melee weapons. If an enemy dodges or parries his attack, the bonus is doubled for the next melee attack against this enemy."
    },
    {
      "name": "Scanner Mechadendrite",
      "description": "An additional servo-skull connected directly to the Tech-Priest's systems increases their Perception by +10."
    },
    {
      "name": "Skirmish Protocols",
      "description": "While Pasqal is under the effects of machine spirit communion, his melee attacks deal an additional +(10+INT)% damage and gain (10+INT)% armour penetration."
    },
    {
      "name": "Utility Mechadendrite",
      "description": "This mechadendrite is equipped with all kinds of tools to communicate with machine spirits. Increases Tech-Use and Demolition by +10."
    }
  ],
  "Psyker": [
    {
      "name": "Blade of Light",
      "description": "Force weapon attacks deal +psy rating more damage and have +(5 X psy rating)% more armour penetration."
    },
    {
      "name": "Enforce Reality",
      "description": "Usage of a heroic act by the psyker decreases veil degradation by INT bonus."
    },
    {
      "name": "Mind Thief",
      "description": "Any time an enemy becomes a target of any particular psyker ability for the first time, this enemy suffers a -5 penalty to their Intelligence and Perception, and the psyker's Intelligence and Perception increase by +2 until the end of combat."
    },
    {
      "name": "Obscured Threat",
      "description": "While the psyker is not in the target's line of sight, or the psyker is in cover, all resistance tests of the target suffer a -(4 X psy rating) penalty."
    },
    {
      "name": "Psychic Barrage",
      "description": "Whenever the psyker uses a damaging psychic power on targets that are 6 cells or farther from the psyker, the targets suffer an additional +BS bonus damage."
    },
    {
      "name": "Psyker Minoris (Psy Rating 1)",
      "description": "Each level of psy rating provides the psyker access to new psychic powers. It also strengthens damaging psychic powers. 4/9"
    },
    {
      "name": "Psyker Majoris (Psy Rating 2)",
      "description": "Each level of psy rating provides the psyker access to new psychic powers. It also strengthens damaging psychic powers. 14/19"
    },
    {
      "name": "Psyker Extremis (Psy Rating 3)",
      "description": "Each level of psy rating provides the psyker access to new psychic powers. It also strengthens damaging psychic powers. 24/29"
    },
    {
      "name": "Psyker Terminus (Psy Rating 4)",
      "description": "Each level of psy rating provides the psyker access to new psychic powers. It also strengthens damaging psychic powers. 34/39"
    },
    {
      "name": "Second Sight",
      "description": "The psyker's psychic powers that have a range of 2 cells or more have their range increased by +PER bonus."
    },
    {
      "name": "Stabilizing Factor",
      "description": "The first psychic power used each turn increases veil degradation by 2 points less. If this talent reduces the effect on veil degradation to less than 0, veil degradation is instead decreased by 1."
    },
    {
      "name": "Subtle Manipulation",
      "description": "The psyker can use a damaging psychic power while being threatened by enemies in melee range without provoking attacks of opportunity. Non-damaging psychic powers do not provoke attacks of opportunity even without this talent."
    }
  ],
  "Biomancy": [
    {
      "name": "Adrenaline Surge",
      "description": "On the first turn of every combat, all psychic powers of the biomancy discipline cost -1 action point."
    },
    {
      "name": "Biophysical Distortion",
      "description": "All the psyker's attacks, including damaging psychic powers, now poison enemies. This poison deals (4 x psy rating) damage every turn."
    },
    {
      "name": "Confer Immunity",
      "description": "Whenever the psyker is healed or heals any ally, if the character being healed is already at full wounds, that character instead gains temporary wounds equal to the healing. These temporary wounds do not stack."
    },
    {
      "name": "Corpus Conversion",
      "description": "When an enemy adjacent to an ally dies, that ally gains a stacking corpus conversion effect. If multiple allies are adjacent to the dead enemy, one is selected at random. The psyker's next psychic power that targets only the target with corpus conversion will work as if the psyker's psy rating is +2 higher, will not damage the veil, will not trigger psychic phenomena or perils of the warp, and will remove -1 stack of corpus conversion from the target."
    },
    {
      "name": "Deterioration",
      "description": "Whenever an effect applied by the psyker increases the damage suffered by a target, this effect is increased by half (for example, a 20% increase turns into a 30% increase)."
    },
    {
      "name": "Pulse of Life",
      "description": "Whenever the psyker heals themselves or another character with a psychic power or an effect applied by a psychic power, this healing can critically heal with a chance of (5 + 2 x WP bonus)%. This critical heal chance is increased by all the effects that increase critical hit chance, and the amount healed is increased by the same value as critical damage."
    },
    {
      "name": "Sanguine Siphon",
      "description": "Every time the psyker deals damage, they gain +1 stack of the sanguine siphon effect. If that damage was dealt to a target adjacent to the psyker, they gain +2 stacks instead. When the psyker suffers lethal damage, the stacks of sanguine siphon are removed to reduce this damage by -1 for each stack, until either all stacks are removed or the damage is no longer lethal."
    },
    {
      "name": "Strange Vitality (Psyker)",
      "description": "When the psyker's allies or the psyker themselves are under the effects of the psychic powers, they gain +5 Toughness for each of such effects."
    }
  ],
  "Divination": [
    {
      "name": "Edge of Fate",
      "description": "At the beginning of every combat, the psyker's allies gain +15% critical hit chance. The first critical hit removes this effect."
    },
    {
      "name": "Fatebringer",
      "description": "Allies under the effect of at least one psychic power gain an additional +(5 + 2 x psyker's psy rating)% armour penetration."
    },
    {
      "name": "Flawless Plan",
      "description": "Every 9th successful dodge and/or parry by the psyker and their allies combined grants the psyker +2 additional AP on the next turn."
    },
    {
      "name": "Predicted Downfall",
      "description": "The first dodge attempt of every enemy in combat suffers a -(7 X psyker's psy rating)% penalty."
    },
    {
      "name": "Unnatural Luck",
      "description": "When the psyker uses a Divination psychic power on an ally without an unnatural luck effect, that ally gains unnatural luck. >Unnatural Luck: when the ally suffers a critical hit, it becomes a normal hit instead and the unnatural luck effect is removed."
    }
  ],
  "Pyromancy": [
    {
      "name": "Backdraft",
      "description": "Whenever a psychic power used by the psyker deals damage, a random enemy within 2 cells from the initial target suffers half of this damage. That damage does not trigger this talent again."
    },
    {
      "name": "Blazing Inferno",
      "description": "The psyker's critical hit chance increases by +1% until the end of combat every time the psyker deals damage by any means."
    },
    {
      "name": "Body of Flames",
      "description": "The psyker gains +(8 X psy rating)% additional armour against fire damage and half this amount as additional armour against energy damage from las, melta, and plasma weapons."
    },
    {
      "name": "Burning Blood",
      "description": "When the psyker uses a psychic power, all enemies adjacent to the psyker suffer (4 X psy rating direct damage. The same also 1 happens when the psyker suffers damage from burning, bleeding, or melee attacks."
    },
    {
      "name": "Fire Within",
      "description": "Every time the psyker kills or scores a critical hit against 8 creatures in one combat, the psyker's next attack (including attacking psychic powers) will cost 0 AP and have no cooldown."
    },
    {
      "name": "Melting Armour",
      "description": "Every time an enemy suffers damage from the psyker, that enemy's armour is reduced by -5%. If the enemy's armour is already 0, this enemy's deflection is reduced by -1 instead."
    },
    {
      "name": "Relentless Blaze",
      "description": "When the psyker is burning, the psyker's psy rating is increased by +1, and the psyker's resolve is increased by 2. Damage from fire no longer reduces the psyker's momentum."
    },
    {
      "name": "Sparks of the Greater Flame",
      "description": "All damage-over-time effects applied by the psyker gain a (5 + 5 x psy rating)% critical hit chance. This chance is increased by all bonuses to critical hit chance."
    }
  ],
  "Sanctic Powers": [
    {
      "name": "Destined",
      "description": "The psyker's armour increases by +5%. This bonus increases by +5% at the start of every turn of combat except the first."
    },
    {
      "name": "Edge of Dawn",
      "description": "Enemies adjacent to the psyker suffer +10% more damage."
    },
    {
      "name": "Eternal Glory",
      "description": "The first time that momentum reaches 200 during the psyker's turn, the psyker gains +5 to all characteristics, +1 to resolve, +1 to deflection, and +1 to all damage that the psyker deals until the end of combat."
    },
    {
      "name": "Hymns of Hatred",
      "description": "Critical hits scored by anyone within the psyker's line of sight (including the psyker themselves) increase the psyker's critical damage by +1% until the end of combat. Stacks."
    },
    {
      "name": "Psalms of Heroes",
      "description": "The psyker's psy rating is increased by +1 until the end of combat every time an ally uses a heroic act."
    },
    {
      "name": "Sanctified Slayer",
      "description": "The psyker's critical hit chance is increased by +Resolve%."
    }
  ],
  "Telepathy": [
    {
      "name": "Aftershock",
      "description": "Every time the psyker deals mental damage from any source other than Aftershock, the target suffers half as much mental damage at the end of its next turn."
    },
    {
      "name": "Mental Breach",
      "description": "Enemies that have taken damage from the psyker at least once suffer a -20 penalty to all resistance test against the psyker until the end of combat."
    },
    {
      "name": "Mind Siege",
      "description": "Enemies that have failed a Willpower resistance test against any of the psyker's psychic powers will suffer an additional +(4 X psy rating) mental damage every time they suffer mental damage until the end of combat."
    },
    {
      "name": "Pain Channelling",
      "description": "Whenever the psyker kills an enemy with a psychic power dealing more damage than wounds of the target, the excess damage will be dealt to the enemy closest to the target."
    },
    {
      "name": "Visions of Doom",
      "description": "Enemies that become targets of the psyker's psychic powers gain a stacking -5% penalty to their dodge and parry until the end of combat."
    },
    {
      "name": "Warp Minds",
      "description": "After every sixth use of a psychic power by the psyker, all enemies gain a stacking -5 penalty to all characteristics until the 1 end of combat."
    },
    {
      "name": "Weak Hearts",
      "description": "Enemies, currently inflicted with blinded, stunned, immobilised, or prone effects by the psyker, suffer +10% more damage."
    }
  ],
  "Sanctioned Psyker": [
    {
      "name": "Inscribed Soul",
      "description": "The psyker gains the Inscribed Soul ability. It costs no AP but deals direct damage to the psyker equal to 25% of the psyker's maximum wounds. The next psychic power used after this ability will not trigger psychic phenomena or perils of the warp and will not degrade the veil."
    },
    {
      "name": "Sacred Rituals",
      "description": "Psychic powers have a 25% chance to regain AP spent on psychic powers when veil degradation is 10 or lower."
    },
    {
      "name": "Still Mind",
      "description": "The psyker's resolve is increased by +(WP bonus / 2) while veil degradation is 10 or lower."
    }
  ],
  "Soldier": [
    {
      "name": "Alacrity",
      "description": "Each shot fired by the Soldier grants them +1 Agility until the end of their next turn."
    },
    {
      "name": "Camaraderie",
      "description": "For each adjacent ally, the Soldier deals +(5 + BS bonus)% more damage to enemies."
    },
    {
      "name": "Combat Medicae",
      "description": "Healing an ally with a medikit in combat restores additional wounds equal to (Medicae / 10). >Using medikits costs -1 AP less."
    },
    {
      "name": "Demolition Engineer",
      "description": "The Soldier's Demolition instead of Intelligence is used to determine additional damage dealt with ranged area attacks. Deals 5% more damage for every 10 points in Demolition (instead of 5% for each 10 points of Intelligence)."
    },
    {
      "name": "Enough Bullets for Everyone",
      "description": "The Soldier's second attack action in a turn deals +(5 + 2 x AGI bonus)% more damage to enemies that have not suffered damage from the Soldier during this turn."
    },
    {
      "name": "Exploit Surroundings",
      "description": "Cover efficiency is increased by +10% for full cover and +20% for half cover."
    },
    {
      "name": "Fired Up",
      "description": "Whenever the Soldier deals damage, their critical damage is increased by +1% until the end of combat."
    },
    {
      "name": "Forewarning",
      "description": "While the Soldier has an ally adjacent to them, Controlled Shot costs -1 AP less to use."
    },
    {
      "name": "Fortress",
      "description": "While the Soldier has full cover against an enemy, the Soldier gains +10% damage against that enemy, and the enemy's attacks deal -20% less damage against the Soldier and their cover if the cover is present at the moment when the shot is fired (even if the cover is destroyed by the shot)."
    },
    {
      "name": "Integrity",
      "description": "While at full wounds, the Soldier has +10 Ballistic Skill and +2 MP."
    },
    {
      "name": "Muzzle Velocity",
      "description": "The first hit of each burst attacks deals additional damage equal to the weapon's current rate of fire."
    },
    {
      "name": "On the Double",
      "description": "The next use of Run and Gun, when used after Entrench, grants an additional +AGI bonus movement points."
    },
    {
      "name": "Point-Blank",
      "description": "All of the Soldier's area attacks gain +(5 + 3 X BS bonus)% armour penetration and ignore (BS bonus / 2) deflection when used against enemies in a 3-cell radius around the Soldier."
    },
    {
      "name": "Rack and Ruin",
      "description": "After the Soldier deals damage to 3 different enemies, the Soldier gains +(10 + 2 X BS bonus)% more damage for their next attack in the current combat."
    },
    {
      "name": "Rapid Reload",
      "description": "Reloading costs -2 AP less (minimum 1). The first reload in a combat does not cost AP."
    },
    {
      "name": "Second Skin",
      "description": "The Soldier's medium armour does not reduce dodge."
    },
    {
      "name": "Swift Slaughter",
      "description": "Revel in Slaughter can be used after 2 kills instead of 3."
    },
    {
      "name": "Tactical Disengage",
      "description": "Dash does not end the Soldier's movement for the turn. Enemies adjacent to the starting point of Dash will consider the Soldier their lowest priority target during their next turn."
    },
    {
      "name": "Tenderize",
      "description": "Enemies damaged by the Soldier's area attacks suffer +(1 + BS bonus / 2) damage from the next attack that hits them."
    },
    {
      "name": "Trace the Trajectory",
      "description": "Whenever the Soldier successfully dodges or uses cover against an enemy's attack, they gain a guaranteed critical hit against that enemy."
    },
    {
      "name": "Unfaltering Fire",
      "description": "Rapid Fire no longer reduces damage."
    },
    {
      "name": "Unpredictable",
      "description": "The Soldier gains +(3 + AGI bonus)% critical hit chance. This bonus is doubled against enemies from which the Soldier is protected by cover at the moment of the attack."
    }
  ],
  "Unsanctioned Psyker": [
    {
      "name": "Advice and Guidance",
      "description": "The first time in combat that an ally becomes the target of the psyker's psychic power, this ally gains +10 to Weapon Skill and Ballistic Skill until end of combat."
    },
    {
      "name": "Power Conduit",
      "description": "After triggering psychic phenomena or perils of the warp first time each turn, the psyker's next psychic power costs -1 less action point."
    },
    {
      "name": "Thriving in Peril",
      "description": "Every perils of the warp increases momentum by +(psyker's WP bonus + resolve + psy rating)."
    }
  ],
  "Vanguard": [
    {
      "name": "Beacon of Might",
      "description": "At the start of the Vanguard's turn, before their temporary wounds are lost, the Vanguard gains +number of temporary wounds Strength for 1 round."
    },
    {
      "name": "Centre of Attention",
      "description": "For each enemy that considers the Vanguard a priority target, the Vanguard's armour is increased by +5%."
    },
    {
      "name": "Counter-Attack Stance",
      "description": "Defensive Stance now has a -10 penalty to Weapon Skill for attacks of opportunity granted by this ability instead of -20. These attacks of opportunity deal an additional +TGH bonus damage."
    },
    {
      "name": "Covering Bulwark",
      "description": "While Bulwark is active, the Vanguard counts as full cover for their allies and grants the adjacent allies +(stacks of unyielding beacon / 2) damage deflection against ranged attacks."
    },
    {
      "name": "Defensive Comrade",
      "description": "While the Vanguard has at least one ally in a 2-cell radius, the Vanguard gains +(3 Vanguard's TGH bonus)% parry."
    },
    {
      "name": "Enduring Shield",
      "description": "While the Vanguard has at least 1 temporary wound, they gain +(5 + TGH Bonus)% parry and armour."
    },
    {
      "name": "Formidable Distraction",
      "description": "All enemies in a 2-cell radius around the Vanguard suffer a -(5 + FEL bonus)% penalty to dodge against all attacks except the Vanguard's. If any of these enemies consider the Vanguard a priority target, those enemies suffer a -(5 + 2 X FEL bonus)% penalty to dodge instead."
    },
    {
      "name": "Offensive Follow",
      "description": "Whenever an ally uses Following!, that ally gains +(5 + 2 X Vanguard's FEL bonus)% more damage against all enemies in a 2-cell radius around the Vanguard for 1 round."
    },
    {
      "name": "On Your Feet!",
      "description": "The next attack made by an ally under the effect of Forced Distraction additionally grants +3 MP to that ally."
    },
    {
      "name": "Overwhelming Provocation",
      "description": "If the target of Provocation is hit by at least one attack of opportunity caused by Provocation, the target gains +1 stack of fatigued until the end of combat. Fatigued: the target suffers a -10 penalty to, Strength, Toughness, and Agility for each stack of fatigued. MP are reduced by -1 for each stack."
    },
    {
      "name": "Protective Word",
      "description": "All allies affected by the Vanguard's abilities (but not the Vanguard themselves) are -(5 + Vanguard's FEL bonus)% less likely to suffer a critical hit."
    },
    {
      "name": "Punish the Imprudent",
      "description": "Once per round, whenever an enemy that considers the Vanguard a priority target enters a cell adjacent to the Vanguard, that enemy provokes an attack of opportunity."
    },
    {
      "name": "Renitent Beacon",
      "description": "Each Stack of unyielding beacon additionally increases armour and parry by +1%."
    },
    {
      "name": "Resilient Beacon",
      "description": "Critical hits deal -(15 + 2 x TGH bonus)% less damage to the Vanguard."
    },
    {
      "name": "Selfless Resilience",
      "description": "Allies affected by any of the Vanguard's abilities gain +(2 X Vanguard's FEL bonus)% armour for 1 round. Does not stack."
    },
    {
      "name": "Taunting defense",
      "description": "The Vanguard gains +(5 + 2 x TGH bonus)% parry against enemies that consider the Vanguard a priority target."
    },
    {
      "name": "Taunting Opportunity",
      "description": "Whenever the Vanguard hits an enemy with an attack of opportunity, that enemy must make a Willpower resistance test. On a failed test, the Vanguard becomes this enemy's priority target until the end of the Vanguard's next turn."
    },
    {
      "name": "Unflinching",
      "description": "Whenever an attack made by an ally hits the Vanguard for the first time in a round, that attack deals no damage to the Vanguard. If this attack is a burst attacks, this applies to each successful hit in the burst."
    },
    {
      "name": "Unyielding Resolve",
      "description": "While at maximum stacks of unyielding beacon, the Vanguard gains +7 resolve."
    },
    {
      "name": "Wall of Ferrocrete",
      "description": "Wall of Rockcrete now grants +TGH bonus temporary wounds to allies."
    },
    {
      "name": "Words of Endurance",
      "description": "Whenever the Vanguard's ally in a 2-cell radius around them is hit, the Vanguard grants that ally +FEL bonus temporary Wounds. Once per round for each ally."
    }
  ],
  "Voidborn": [
    {
      "name": "Fortune",
      "description": "A voidborn character can reroll any failed attack, dodge, parry, characteristic, or skill test with a 20% chance of success. This chance cannot be greater than the base success chance of the roll. Additionally, any enemy dodge or parry against a voidborn character has a 20% chance to fail after a successful roll."
    },
    {
      "name": "Be Smart",
      "description": "Any time an ability or talent uses the Fellowship bonus, a voidborn character can instead use the Intelligence bonus, if it is higher. >Additionally, voidborn characters can always upgrade Intelligence even if their archetype does not allow it."
    },
    {
      "name": "Bloody Mess",
      "description": "Any time a voidborn character scores a critical hit, there is a 10% chance to double the damage."
    },
    {
      "name": "Contagious Luck",
      "description": "Using a non-damaging ability on an ally grants that ally the ability to reroll any failed attack, dodge, parry, characteristic, or skill test with a 20% chance of success for 1 round. This chance cannot be greater than the base success chance of the roll. Using a non-damaging ability on an enemy grants them a 20% chance to fail a successful dodge or parry test against any character for 1 round."
    },
    {
      "name": "Jinx",
      "description": "While a voidborn character has more than 50% wounds, all chances of all creatures (including enemies) in a 3-cell radius are increased by +10%. >While a voidborn character has less than 50% wounds, all chances of all creatures (including enemies) in a 3-cell radius are decreased by -10%."
    },
    {
      "name": "Just a Flesh Wound",
      "description": "The voidborn character has a 20% chance to survive after suffering lethal damage, surviving with 1 wound."
    }
  ],
  "Warrior": [
    {
      "name": "Blade Flurry",
      "description": "Each use of Slash increases the damage dealt by Slash by +1 until the end of combat."
    },
    {
      "name": "Cautious Disengage",
      "description": "Attacks of opportunity deal -(10 + 3 X WS bonus)% less damage to the Warrior. Movement within range of attacks of opportunity costs -1 MP less."
    },
    {
      "name": "Clenched Teeth",
      "description": "The Warrior gains +TGH bonus damage deflection against the first attack made by every enemy this combat."
    },
    {
      "name": "Contempt",
      "description": "Whenever an enemy attacks the Warrior, the Warrior's next melee attack against that enemy deals an additional +TGH bonus damage. Does not stack, but it can be reactivated after another attack made by either the same enemy or a different one."
    },
    {
      "name": "Crowd Kill",
      "description": "Area attacks deal an additional +(1 + STR Bonus / 2) damage for each enemy in the area of effect."
    },
    {
      "name": "Defensive Maneuvers",
      "description": "When the Warrior takes damage, they gain +(5 + 2 X AGI Bonus)% dodge. Stacks up to 3 times and resets after a successful dodge."
    },
    {
      "name": "Defensive Stance",
      "description": "If the Warrior has not attacked this turn, they gain +(10 + 2 X TGH bonus)% armour. Charge and Slash do not affect this bonus."
    },
    {
      "name": "Desolation",
      "description": "The Warrior deals an additional +AGI bonus damage to enemies that have no allies in adjacent cells."
    },
    {
      "name": "Disarm",
      "description": "When the Warrior uses a single-shot attack or a melee attack against a target, the Warrior gains +(5 + 2 X TGH bonus)% armour against attacks made by that target for 1 round."
    },
    {
      "name": "Easy Target",
      "description": "The Warrior's critical damage is increased by +(10 + 2 × STRbonus)% against enemies not armed with a melee weapon."
    },
    {
      "name": "Enrage",
      "description": "If the Warrior has less than 50% wounds, they gain +(5 + (TGH bonus + AGI bonus))% critical hit chance."
    },
    {
      "name": "Epicenter of Slaughter",
      "description": "Whenever the Warrior is attacked, they gain +1 stack of epicenter of slaughter until the end of combat. >At the start of their turn, the Warrior gains +1 temporary wound for each stack. These temporary wounds cannot exceed the Warrior's TGH bonus."
    },
    {
      "name": "Hardened Scars",
      "description": "Whenever the Warrior is hit while under the Endure effect, their damage deflection is increased by +1 until the Warrior's next turn."
    },
    {
      "name": "Impetus",
      "description": "The damage dealt by Charge is increased by +(TGH bonus + STR bonus) when the ability is used from a distance of 5 or more cells."
    },
    {
      "name": "Interception",
      "description": "When the Warrior parries an attack, their next Warrior archetype ability costs -1 AP less."
    },
    {
      "name": "Invigorating Hatred",
      "description": "When the Warrior ends their turn near an enemy affected by the Sworn Enemy ability, the Warrior gains +(2 + TGH bonus) temporary wounds."
    },
    {
      "name": "Living Shield",
      "description": "Enemies suffer a -10% penalty to their hit chance with ranged attacks (including area attacks) against the Warrior for every enemy in a 1-cell radius around the Warrior. Stacks up to 3 times."
    },
    {
      "name": "Open Engagement",
      "description": "If there are no enemies adjacent to the Warrior at the start of the turn, the Warrior's damage is increased by +(2 X STR bonus) for one melee attack."
    },
    {
      "name": "Opening Strike",
      "description": "Charge and push increase the damage of ranged attacks made against affected enemies by +(5 + WS bonus)% until the end of combat. Does not stack."
    },
    {
      "name": "Ramming Speed",
      "description": "Increases Charge distance by +3 cells."
    },
    {
      "name": "Reckless Fury",
      "description": "Whenever the Warrior hits with Reckless Strike, this attack scores a guaranteed critical hit."
    },
    {
      "name": "Rigorous Training",
      "description": "The Warrior becomes incredibly deft. Charge and Slash do not end the Warrior's movement and grant +(10 + AGI bonus)% dodge for 1 round after use."
    },
    {
      "name": "Shearing Strikes",
      "description": "When the Warrior uses Slash with two melee weapons equipped, the Warrior deals damage from both weapons."
    },
    {
      "name": "Thick Skin",
      "description": "The Warrior gains +1 damage deflection. Their parry chance is increased by +25% of the Warrior's total armour."
    }
  ]
}
