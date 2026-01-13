
import { HeirQuantities, DeceasedGender, CalculationResult, FinalInheritanceResult, Language } from './types';

/**
 * Deterministic Sharia Inheritance Logic following 44 Authentic Rules.
 */
export function calculateMeeras(inputs: HeirQuantities, gender: DeceasedGender, lang: Language = 'en'): FinalInheritanceResult {
  const results: CalculationResult[] = [];
  const calculationSteps: string[] = [];
  const isUrdu = lang === 'ur';

  // --- STAGE 0: Helpers ---
  const hasDescendants = (inputs.sons || 0) > 0 || (inputs.daughters || 0) > 0 ||
    (inputs.grandsons || 0) > 0 || (inputs.granddaughters || 0) > 0;
  const maleDescendants = (inputs.sons || 0) > 0 || (inputs.grandsons || 0) > 0;
  const totalSiblings = (inputs.fullBrothers || 0) + (inputs.fullSisters || 0) +
    (inputs.paternalBrothers || 0) + (inputs.paternalSisters || 0) +
    (inputs.maternalBrothers || 0) + (inputs.maternalSisters || 0);

  // --- STAGE 1: Blocking Rules ---
  const blocked: Record<string, string> = {};

  // Descendants block siblings/nephews
  if ((inputs.sons || 0) > 0 || (inputs.grandsons || 0) > 0) {
    const blocker = (inputs.sons || 0) > 0 ? (isUrdu ? "بیٹا" : "Son") : (isUrdu ? "پوتا" : "Grandson");
    ['fullBrothers', 'fullSisters', 'paternalBrothers', 'paternalSisters', 'maternalBrothers', 'maternalSisters', 'fullNephews', 'paternalNephews'].forEach(h => { if (inputs[h]) blocked[h] = blocker; });
  }
  // Father blocks siblings/grandparents
  if ((inputs.father || 0) > 0) {
    ['grandfather', 'paternalGrandmother', 'fullBrothers', 'fullSisters', 'paternalBrothers', 'paternalSisters', 'maternalBrothers', 'maternalSisters'].forEach(h => { if (inputs[h]) blocked[h] = isUrdu ? "والد" : "Father"; });
  }
  // Mother blocks grandmothers
  if ((inputs.mother || 0) > 0) {
    ['paternalGrandmother', 'maternalGrandmother'].forEach(h => { if (inputs[h]) blocked[h] = isUrdu ? "والدہ" : "Mother"; });
  }

  Object.keys(blocked).forEach(h => {
    if (inputs[h] > 0) calculationSteps.push(isUrdu ? `${h} کو ${blocked[h]} نے محروم کر دیا (قاعدہ 13)` : `${h} blocked by ${blocked[h]} (Rule 13)`);
  });

  // --- STAGE 2: Prescribed Shares ---
  const shares: Record<string, number> = {};

  // Husband
  if (gender === DeceasedGender.FEMALE && inputs.husband) {
    shares['husband'] = hasDescendants ? 1 / 4 : 1 / 2;
    calculationSteps.push(isUrdu ? `شوہر کا حصہ: ${formatFraction(shares['husband'])} (قاعدہ 1)` : `Husband gets the prescribed share of ${formatFraction(shares['husband'])} (Rule 1)`);
  }
  // Wives
  if (gender === DeceasedGender.MALE && (inputs.wives || 0) > 0) {
    const totalWifeShare = hasDescendants ? 1 / 8 : 1 / 4;
    shares['wives'] = totalWifeShare;
    calculationSteps.push(isUrdu ? `بیویوں کا حصہ: ${formatFraction(totalWifeShare)} (قاعدہ 2)` : `Wife gets the prescribed share of ${formatFraction(totalWifeShare)} (Rule 2b)`);
  }

  // Daughters (Fixed share ONLY if no Sons)
  if ((inputs.daughters || 0) > 0 && (inputs.sons || 0) === 0) {
    shares['daughters'] = (inputs.daughters === 1) ? 1 / 2 : 2 / 3;
    calculationSteps.push(isUrdu ? `بیٹیوں کا مقررہ حصہ: ${formatFraction(shares['daughters'])} (قاعدہ 3)` : `Daughters' prescribed share: ${formatFraction(shares['daughters'])} (Rule 3)`);
  }

  // Mother
  if ((inputs.mother || 0) > 0 && !blocked['mother']) {
    const isUmarCase = !hasDescendants && totalSiblings <= 1 && (inputs.father || 0) > 0 && (inputs.husband || inputs.wives);
    if (isUmarCase) {
      calculationSteps.push(isUrdu ? "عمریہ کیس (قاعدہ 21): والدہ کو بقیہ کا 1/3 ملے گا" : "Umar's Case (Rule 21): Mother gets 1/3 of remainder.");
      const spouseShare = (shares['husband'] || shares['wives'] || 0);
      shares['mother'] = (1 - spouseShare) * (1 / 3);
    } else {
      shares['mother'] = (hasDescendants || totalSiblings >= 2) ? 1 / 6 : 1 / 3;
      calculationSteps.push(isUrdu ? `والدہ کا حصہ: ${formatFraction(shares['mother'])} (قاعدہ 6)` : `Mother gets ${formatFraction(shares['mother'])} (Rule 6)`);
    }
  }

  // Father
  if ((inputs.father || 0) > 0 && !blocked['father']) {
    if (hasDescendants) {
      shares['father'] = 1 / 6;
      calculationSteps.push(isUrdu ? "والد کا مقررہ حصہ: 1/6 (قاعدہ 5)" : "Father gets 1/6 (Rule 5)");
    }
  }

  // Maternal Siblings
  if (!blocked['maternalBrothers'] && !blocked['maternalSisters']) {
    const totalMaternals = (inputs.maternalBrothers || 0) + (inputs.maternalSisters || 0);
    if (totalMaternals > 0) {
      const share = totalMaternals === 1 ? 1 / 6 : 1 / 3;
      if (inputs.maternalBrothers) shares['maternalBrothers'] = share * (inputs.maternalBrothers / totalMaternals);
      if (inputs.maternalSisters) shares['maternalSisters'] = share * (inputs.maternalSisters / totalMaternals);
      calculationSteps.push(isUrdu ? `اخیافی بہن بھائیوں کا حصہ: ${formatFraction(share)} (قاعدہ 12)` : `Maternal siblings share: ${formatFraction(share)} (Rule 12)`);
    }
  }

  // --- STAGE 3: 'Awal ---
  let totalFixed = 0;
  Object.values(shares).forEach(s => totalFixed += s);
  if (totalFixed > 1) {
    calculationSteps.push(isUrdu ? "حصوں کا مجموعہ 1 سے زائد ہے - عول کا اطلاق (قاعدہ 18)" : "Total shares exceeds 1 - Applying 'Awal (Rule 18)");
    const factor = 1 / totalFixed;
    Object.keys(shares).forEach(k => shares[k] *= factor);
    totalFixed = 1;
  }

  // --- STAGE 4: Ta'seeb (Residue) ---
  let residue = 1 - totalFixed;
  const asabaResults: Record<string, number> = {};

  if (residue > 0.0001) {
    calculationSteps.push(isUrdu ? `بقیہ ترکہ کی تقسیم (قاعدہ 14): ${formatFraction(residue)}` : `Distribute the remaining shares according to relative priority (Rule 14)`);

    // Priority 1: Descendants
    if ((inputs.sons || 0) > 0 || ((inputs.daughters || 0) > 0 && (inputs.sons || 0) > 0)) {
      // Only push this if there are actually daughters involved for joint ta'seeb
      if ((inputs.daughters || 0) > 0) {
        calculationSteps.push(isUrdu ? "بیٹے اور بیٹی کا 2:1 سے تعصیب (قاعدہ 15, 44)" : "Joint Ta'seeb of Son and Daughter (Rule 44).");
        calculationSteps.push(isUrdu ? "" : "Son and Daughter share in the ratio of 2:1 (Rule 15)");
      } else {
        calculationSteps.push(isUrdu ? "بیٹا عصبہ ہے (قاعدہ 44)" : "Son takes residue as Asaba (Rule 44)");
      }

      const parts = ((inputs.sons || 0) * 2) + (inputs.daughters || 0);
      if (inputs.sons) asabaResults['sons'] = (residue / parts) * 2 * inputs.sons;
      if (inputs.daughters) asabaResults['daughters'] = (residue / parts) * (inputs.daughters || 0);

      // Add the specific final step requested
      if (inputs.sons && inputs.daughters) {
        const sShare = formatFraction(asabaResults['sons'] / inputs.sons);
        const dShare = formatFraction(asabaResults['daughters'] / inputs.daughters);
        if (!isUrdu) {
          calculationSteps.push(`Son gets the share of ${sShare} and Daughter gets the share of ${dShare}. (Rule 15, 44)`);
        }
      }

      residue = 0;
    }
    // Priority 2: Father
    else if ((inputs.father || 0) > 0) {
      asabaResults['father'] = residue;
      calculationSteps.push(isUrdu ? "والد بطور عصبہ بقیہ وصول کریں گے" : "Father takes residue as Asaba.");
      residue = 0;
    }
    // Priority 3: Full Siblings
    else if ((inputs.fullBrothers || 0) > 0 || ((inputs.fullSisters || 0) > 0 && (inputs.fullBrothers || 0) > 0)) {
      const parts = ((inputs.fullBrothers || 0) * 2) + (inputs.fullSisters || 0);
      if (inputs.fullBrothers) asabaResults['fullBrothers'] = (residue / parts) * 2 * inputs.fullBrothers;
      if (inputs.fullSisters) asabaResults['fullSisters'] = (residue / parts) * (inputs.fullSisters || 0);
      calculationSteps.push(isUrdu ? "سگے بہن بھائیوں کا تعصیب (قاعدہ 44)" : "Full Siblings joint Ta'seeb (Rule 44).");
      residue = 0;
    }
    // Priority 4: Grandfather
    else if ((inputs.grandfather || 0) > 0) {
      asabaResults['grandfather'] = residue;
      calculationSteps.push(isUrdu ? "دادا عصبہ ہیں" : "Grandfather takes residue.");
      residue = 0;
    }
  }

  // --- STAGE 5: Radd ---
  if (residue > 0.0001) {
    const raddHeirs = Object.keys(shares).filter(h => h !== 'husband' && h !== 'wives');
    if (raddHeirs.length > 0) {
      calculationSteps.push(isUrdu ? "رد کا قاعدہ (قاعدہ 19)" : "Applying Radd (Rule 19)");
      let raddSum = 0;
      raddHeirs.forEach(h => raddSum += shares[h]);
      const factor = 1 + (residue / raddSum);
      raddHeirs.forEach(h => shares[h] *= factor);
      residue = 0;
    } else if (!inputs.husband && !inputs.wives) {
      calculationSteps.push(isUrdu ? "بیت المال (قاعدہ 27)" : "Estate goes to Bait-ul-Mal (Rule 27).");
    }
  }

  // Map to Results
  const allHeirIds = Object.keys(inputs);
  allHeirIds.forEach(id => {
    const total = (shares[id] || 0) + (asabaResults[id] || 0);
    if (total > 0) {
      results.push({ heirName: id, shareFraction: formatFraction(total), percentage: total * 100, isBlocked: false });
    } else if (inputs[id] > 0) {
      results.push({ heirName: id, shareFraction: "0", percentage: 0, isBlocked: true, blockedBy: blocked[id] || (isUrdu ? 'اعلیٰ وارث' : 'Higher Rank Heir') });
    }
  });

  return { results, calculationSteps };
}

function formatFraction(val: number): string {
  if (val === 0) return "0";
  if (val >= 0.999) return "1/1";

  const tolerance = 1.e-6;
  const commonDenominators = [2, 3, 4, 6, 8, 12, 16, 24, 27, 32, 48];

  for (let d of commonDenominators) {
    let n = Math.round(val * d);
    if (Math.abs(val - n / d) < tolerance) {
      return `${n}/${d}`;
    }
  }

  // Fallback to searching all up to 100
  for (let d = 1; d <= 100; d++) {
    let n = Math.round(val * d);
    if (Math.abs(val - n / d) < tolerance) {
      return `${n}/${d}`;
    }
  }

  return val.toFixed(4);
}
