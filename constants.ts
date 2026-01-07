
import { HeirCategory, DeceasedGender } from './types';

export const HEIR_CATEGORIES: HeirCategory[] = [
  { id: 'husband', nameKey: 'name_husband', descKey: 'desc_husband', isPlural: false, group: 'immediate', genderRestrictions: DeceasedGender.FEMALE },
  { id: 'wives', nameKey: 'name_wives', descKey: 'desc_wives', isPlural: true, group: 'immediate', genderRestrictions: DeceasedGender.MALE },
  { id: 'sons', nameKey: 'name_sons', descKey: 'desc_sons', isPlural: true, group: 'immediate' },
  { id: 'daughters', nameKey: 'name_daughters', descKey: 'desc_daughters', isPlural: true, group: 'immediate' },
  { id: 'father', nameKey: 'name_father', descKey: 'desc_father', isPlural: false, group: 'immediate' },
  { id: 'mother', nameKey: 'name_mother', descKey: 'desc_mother', isPlural: false, group: 'immediate' },
  
  { id: 'grandsons', nameKey: 'name_grandsons', descKey: 'desc_grandsons', isPlural: true, group: 'descendants' },
  { id: 'granddaughters', nameKey: 'name_granddaughters', descKey: 'desc_granddaughters', isPlural: true, group: 'descendants' },
  
  { id: 'grandfather', nameKey: 'name_grandfather', descKey: 'desc_grandfather', isPlural: false, group: 'ascendants' },
  { id: 'paternalGrandmother', nameKey: 'name_paternalGrandmother', descKey: 'desc_paternalGrandmother', isPlural: false, group: 'ascendants' },
  { id: 'maternalGrandmother', nameKey: 'name_maternalGrandmother', descKey: 'desc_maternalGrandmother', isPlural: false, group: 'ascendants' },
  
  { id: 'fullBrothers', nameKey: 'name_fullBrothers', descKey: 'desc_fullBrothers', isPlural: true, group: 'siblings' },
  { id: 'fullSisters', nameKey: 'name_fullSisters', descKey: 'desc_fullSisters', isPlural: true, group: 'siblings' },
  { id: 'paternalBrothers', nameKey: 'name_paternalBrothers', descKey: 'desc_paternalBrothers', isPlural: true, group: 'siblings' },
  { id: 'paternalSisters', nameKey: 'name_paternalSisters', descKey: 'desc_paternalSisters', isPlural: true, group: 'siblings' },
  { id: 'maternalBrothers', nameKey: 'name_maternalBrothers', descKey: 'desc_maternalBrothers', isPlural: true, group: 'siblings' },
  { id: 'maternalSisters', nameKey: 'name_maternalSisters', descKey: 'desc_maternalSisters', isPlural: true, group: 'siblings' },
  
  { id: 'fullNephews', nameKey: 'name_fullNephews', descKey: 'desc_fullNephews', isPlural: true, group: 'extended' },
  { id: 'paternalNephews', nameKey: 'name_paternalNephews', descKey: 'desc_paternalNephews', isPlural: true, group: 'extended' },
  { id: 'fullNephewSons', nameKey: 'name_fullNephewSons', descKey: 'desc_fullNephewSons', isPlural: true, group: 'extended' },
  { id: 'paternalNephewSons', nameKey: 'name_paternalNephewSons', descKey: 'desc_paternalNephewSons', isPlural: true, group: 'extended' },
  { id: 'fullPaternalUncles', nameKey: 'name_fullPaternalUncles', descKey: 'desc_fullPaternalUncles', isPlural: true, group: 'extended' },
  { id: 'paternalPaternalUncles', nameKey: 'name_paternalPaternalUncles', descKey: 'desc_paternalPaternalUncles', isPlural: true, group: 'extended' },
  { id: 'fullCousins', nameKey: 'name_fullCousins', descKey: 'desc_fullCousins', isPlural: true, group: 'extended' },
  { id: 'paternalCousins', nameKey: 'name_paternalCousins', descKey: 'desc_paternalCousins', isPlural: true, group: 'extended' },
  { id: 'fullCousinSons', nameKey: 'name_fullCousinSons', descKey: 'desc_fullCousinSons', isPlural: true, group: 'extended' },
  { id: 'paternalCousinSons', nameKey: 'name_paternalCousinSons', descKey: 'desc_paternalCousinSons', isPlural: true, group: 'extended' },
  { id: 'fullCousinGrandsons', nameKey: 'name_fullCousinGrandsons', descKey: 'desc_fullCousinGrandsons', isPlural: true, group: 'extended' },
  { id: 'paternalCousinGrandsons', nameKey: 'name_paternalCousinGrandsons', descKey: 'desc_paternalCousinGrandsons', isPlural: true, group: 'extended' }
];
