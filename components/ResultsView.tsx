
import React from 'react';
import { CalculationResult, Language } from '../types';
import { HEIR_CATEGORIES as categories } from '../constants';
import { translations } from '../translations';

interface ResultsViewProps {
  results: CalculationResult[];
  calculationSteps: string[];
  onReset: () => void;
  lang: Language;
}

const ResultsView: React.FC<ResultsViewProps> = ({ results, calculationSteps, onReset, lang }) => {
  const t = translations[lang];
  const isUrdu = lang === 'ur';

  const getCategoryName = (id: string) => {
    const cat = categories.find(c => c.id === id);
    return cat ? (t as any)[cat.nameKey] : id;
  };

  const activeResults = results.filter(r => !r.isBlocked && r.percentage > 0);

  return (
    <div className={`space-y-8 animate-in fade-in duration-700 ${isUrdu ? 'text-right' : 'text-left'}`}>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
        <div className="bg-emerald-800 p-6 text-white text-center">
          <h2 className={`text-2xl font-bold font-amiri`}>{t.summaryTitle}</h2>
          <p className="opacity-80 text-sm">{t.summaryDesc}</p>
        </div>
        
        <div className="p-6">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 ${isUrdu ? 'rtl' : ''}`}>
            {activeResults.map((r, i) => (
              <div key={i} className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                <div className="text-emerald-600 text-xs font-bold uppercase tracking-wider">{getCategoryName(r.heirName)}</div>
                <div className={`flex items-baseline justify-between mt-1 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                  <div className="text-3xl font-bold text-emerald-900">{r.percentage.toFixed(2)}%</div>
                  <div className="text-lg font-medium text-emerald-700 font-amiri">{r.shareFraction}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto border rounded-xl border-gray-100">
            <table className={`w-full ${isUrdu ? 'text-right' : 'text-left'}`} dir={isUrdu ? 'rtl' : 'ltr'}>
              <thead className="bg-gray-50 text-gray-600 text-xs font-semibold uppercase">
                <tr>
                  <th className="px-6 py-4">{t.heirCategory}</th>
                  <th className="px-6 py-4">{t.sharePercent}</th>
                  <th className="px-6 py-4">{t.fraction}</th>
                  <th className="px-6 py-4">{t.status}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {results.map((r, i) => (
                  <tr key={i} className={`hover:bg-gray-50 transition-colors ${r.isBlocked ? 'text-gray-400' : 'text-gray-700'}`}>
                    <td className="px-6 py-4 font-medium">{getCategoryName(r.heirName)}</td>
                    <td className="px-6 py-4">{r.percentage.toFixed(2)}%</td>
                    <td className="px-6 py-4 font-amiri text-lg">{r.shareFraction}</td>
                    <td className="px-6 py-4">
                      {r.isBlocked ? (
                        <span className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs font-bold">{t.blocked}</span>
                      ) : (
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-xs font-bold">{t.eligible}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {calculationSteps.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden animate-in slide-in-from-bottom duration-700 delay-300">
            <div className="bg-emerald-700/10 px-6 py-4 border-b border-emerald-100">
                <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
                    <i className="fa-solid fa-list-check"></i>
                    {t.calculationStepsTitle}
                </h3>
            </div>
            <div className="p-6">
                <ul className="space-y-3">
                    {calculationSteps.map((step, i) => (
                        <li key={i} className={`flex items-start gap-3 text-gray-700 ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                            <span className="text-sm md:text-base leading-relaxed">{step}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      )}

      <div className="flex justify-center">
        <button 
          onClick={onReset}
          className="px-8 py-3 bg-white border-2 border-emerald-800 text-emerald-800 rounded-full font-bold hover:bg-emerald-50 transition-all flex items-center gap-2"
        >
          <i className="fa-solid fa-rotate-left"></i>
          {t.calculateAgain}
        </button>
      </div>



      <div className={`bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-emerald-900 ${isUrdu ? 'font-amiri' : ''}`}>
        <h4 className={`font-bold flex items-center gap-2 mb-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
            <i className="fa-solid fa-circle-info"></i>
            {t.disclaimerTitle}
        </h4>
        <p className="text-sm leading-relaxed">
            {t.disclaimerText}
        </p>
      </div>
    </div>
  );
};

export default ResultsView;
