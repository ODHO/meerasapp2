
import { HeirQuantities, DeceasedGender, CalculationResult } from './types';

/**
 * Deterministic Sharia Inheritance Logic.
 * This is a simplified Sunni implementation (Hanafi/General) for educational purposes.
 */
export function calculateMeeras(inputs: HeirQuantities, gender: DeceasedGender): CalculationResult[] {
  const results: CalculationResult[] = [];
  
  // Basic Check Variables
  const hasDescendants = (inputs.sons || 0) > 0 || (inputs.daughters || 0) > 0 || (inputs.grandsons || 0) > 0 || (inputs.granddaughters || 0) > 0;
  const maleDescendants = (inputs.sons || 0) > 0 || (inputs.grandsons || 0) > 0;
  
  // Total siblings (for Mother's rule)
  const totalSiblings = (inputs.fullBrothers || 0) + (inputs.fullSisters || 0) + 
                        (inputs.paternalBrothers || 0) + (inputs.paternalSisters || 0) + 
                        (inputs.maternalBrothers || 0) + (inputs.maternalSisters || 0);

  // Initial Shares (Fixed/Zawil Furud)
  const shares: Record<string, number> = {};

  // 1. Husband
  if (gender === DeceasedGender.FEMALE && inputs.husband) {
    shares['husband'] = hasDescendants ? 1/4 : 1/2;
  }

  // 2. Wives (Shared)
  if (gender === DeceasedGender.MALE && (inputs.wives || 0) > 0) {
    shares['wives'] = hasDescendants ? 1/8 : 1/4;
  }

  // 3. Father
  if ((inputs.father || 0) > 0) {
    if (maleDescendants) shares['father'] = 1/6;
    else if (hasDescendants) shares['father'] = 1/6; // Also Asaba later
    else shares['father'] = 0; // Will be pure Asaba
  }

  // 4. Mother
  if ((inputs.mother || 0) > 0) {
    if (hasDescendants || totalSiblings >= 2) shares['mother'] = 1/6;
    else shares['mother'] = 1/3;
  }

  // 5. Daughters
  if ((inputs.daughters || 0) > 0 && (inputs.sons || 0) === 0) {
    shares['daughters'] = inputs.daughters === 1 ? 1/2 : 2/3;
  }

  // 6. Maternal Siblings (Blocked by father, grandfather, or any descendant)
  const maternalBlocked = (inputs.father || 0) > 0 || (inputs.grandfather || 0) > 0 || hasDescendants;
  if (!maternalBlocked) {
    const totalMaternals = (inputs.maternalBrothers || 0) + (inputs.maternalSisters || 0);
    if (totalMaternals === 1) {
      if (inputs.maternalBrothers) shares['maternalBrothers'] = 1/6;
      if (inputs.maternalSisters) shares['maternalSisters'] = 1/6;
    } else if (totalMaternals > 1) {
      const share = 1/3;
      if (inputs.maternalBrothers) shares['maternalBrothers'] = (share * (inputs.maternalBrothers / totalMaternals));
      if (inputs.maternalSisters) shares['maternalSisters'] = (share * (inputs.maternalSisters / totalMaternals));
    }
  }

  // 7. Full Sisters (Blocked by son, grandson, father)
  const fullSistersBlocked = (inputs.sons || 0) > 0 || (inputs.grandsons || 0) > 0 || (inputs.father || 0) > 0;
  if (!fullSistersBlocked && (inputs.fullSisters || 0) > 0 && (inputs.fullBrothers || 0) === 0) {
    shares['fullSisters'] = inputs.fullSisters === 1 ? 1/2 : 2/3;
  }

  // Calculating Residue
  let totalFixed = 0;
  Object.values(shares).forEach(s => totalFixed += s);

  // Awl Correction (If total fixed > 1)
  if (totalFixed > 1) {
    const factor = 1 / totalFixed;
    Object.keys(shares).forEach(k => shares[k] *= factor);
    totalFixed = 1;
  }

  let residue = 1 - totalFixed;

  // Asaba (Residuary) Calculation
  // Order of Asaba: Descendants -> Ascendants -> Siblings -> Collaterals
  const asabaResults: Record<string, number> = {};

  if (residue > 0) {
    // 1. Sons and Daughters
    if ((inputs.sons || 0) > 0) {
      const parts = (inputs.sons * 2) + (inputs.daughters || 0);
      const perPart = residue / parts;
      asabaResults['sons'] = perPart * 2 * inputs.sons;
      if (inputs.daughters) asabaResults['daughters'] = perPart * inputs.daughters;
      residue = 0;
    }
    // 2. Father as Asaba
    else if ((inputs.father || 0) > 0) {
      asabaResults['father'] = (shares['father'] || 0) + residue;
      delete shares['father'];
      residue = 0;
    }
    // 3. Grandfather (if father not present)
    else if ((inputs.grandfather || 0) > 0) {
       asabaResults['grandfather'] = residue;
       residue = 0;
    }
    // 4. Full Brothers & Full Sisters
    else if ((inputs.fullBrothers || 0) > 0) {
      const parts = (inputs.fullBrothers * 2) + (inputs.fullSisters || 0);
      const perPart = residue / parts;
      asabaResults['fullBrothers'] = perPart * 2 * inputs.fullBrothers;
      if (inputs.fullSisters) asabaResults['fullSisters'] = perPart * inputs.fullSisters;
      residue = 0;
    }
    // Continue for collaterals if needed, but for simplicity of the demo we stop at siblings.
    // In a full implementation, we'd check nephews, uncles, cousins in order.
  }

  // Map to calculation results
  const allHeirIds = Object.keys(inputs);
  allHeirIds.forEach(id => {
    const fixedShare = shares[id] || 0;
    const asabaShare = asabaResults[id] || 0;
    const totalShare = fixedShare + asabaShare;
    
    if (totalShare > 0) {
        results.push({
            heirName: id,
            shareFraction: formatFraction(totalShare),
            percentage: totalShare * 100,
            isBlocked: false
        });
    } else if (inputs[id] > 0) {
        results.push({
            heirName: id,
            shareFraction: "0",
            percentage: 0,
            isBlocked: true,
            blockedBy: 'Higher Priority Heir'
        });
    }
  });

  return results;
}

function formatFraction(val: number): string {
    if (val === 0) return "0";
    // Try to approximate simple fractions
    const tolerance = 1.e-6;
    for (let d = 1; d <= 24; d++) {
        let n = Math.round(val * d);
        if (Math.abs(val - n / d) < tolerance) {
            return `${n}/${d}`;
        }
    }
    return val.toFixed(4);
}
