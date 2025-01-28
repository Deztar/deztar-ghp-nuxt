export interface Attributes {
  hitpoints?: number;
  fatigue?: number;
  resolve?: number;
  initiative?: number;
  meleeAttack?: number;
  meleeDefense?: number;
  rangedAttack?: number;
  rangedDefense?: number;
}

export interface Brother {
  name: string;
  level: number;
  attr: Attributes;
  talents: Attributes;
  className?: string;
}

export interface BrotherExtended {
  data: Brother;
  activePerks: number[];
  classObject?: BrotherClass;
  lvlupsNeeded: Attributes;
  totalLvlups: number;
  overflow: number;
}

export interface BrotherClass {
  name: string;
  link: string;
  attr: Attributes,
  needed: number;
}

export interface BrotherClassExtended {
  data: BrotherClass;
  recruited: number;
  perks: number[];
}
