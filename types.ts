
export enum DeceasedGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export type Language = 'en' | 'ur';

export interface HeirCategory {
  id: string;
  nameKey: string;
  descKey: string;
  isPlural: boolean;
  group: 'immediate' | 'descendants' | 'ascendants' | 'siblings' | 'extended';
  genderRestrictions?: DeceasedGender;
}

export type HeirQuantities = Record<string, number>;

export interface CalculationResult {
  heirName: string;
  shareFraction: string;
  percentage: number;
  isBlocked: boolean;
  blockedBy?: string;
}

export interface FinalInheritanceResult {
  results: CalculationResult[];
  totalWealth?: number;
}
