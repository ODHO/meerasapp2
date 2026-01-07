
import React from 'react';
import { HeirCategory, Language } from '../types';
import { translations } from '../translations';

interface HeirInputProps {
  category: HeirCategory;
  value: number;
  onChange: (id: string, val: number) => void;
  disabled?: boolean;
  lang: Language;
}

const HeirInput: React.FC<HeirInputProps> = ({ category, value, onChange, disabled, lang }) => {
  const t = translations[lang];
  const isUrdu = lang === 'ur';

  return (
    <div className={`p-4 rounded-xl border transition-all ${disabled ? 'opacity-40 bg-gray-50' : 'bg-white shadow-sm hover:shadow-md border-emerald-100'}`}>
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 ${isUrdu ? 'text-right' : 'text-left'}`}>
        <div className="flex-1">
          <h3 className={`font-semibold text-emerald-900 text-lg flex items-center gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
             <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
             <span className={isUrdu ? 'font-amiri' : ''}>{(t as any)[category.nameKey]}</span>
          </h3>
          <p className={`text-xs text-gray-500 mt-1 italic leading-relaxed ${isUrdu ? 'font-amiri' : ''}`}>
            {(t as any)[category.descKey]}
          </p>
        </div>
        
        <div className={`flex items-center gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
          <button 
            type="button"
            onClick={() => onChange(category.id, Math.max(0, value - 1))}
            disabled={disabled || value === 0}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-50 text-emerald-600 hover:bg-emerald-100 disabled:opacity-30 border border-emerald-200"
          >
            <i className="fa-solid fa-minus"></i>
          </button>
          
          <input 
            type="number" 
            min="0"
            max={category.isPlural ? 99 : 1}
            value={value}
            onChange={(e) => {
                const val = parseInt(e.target.value) || 0;
                onChange(category.id, category.isPlural ? val : (val > 0 ? 1 : 0));
            }}
            disabled={disabled}
            className="w-16 text-center font-bold text-lg text-emerald-800 bg-transparent border-b-2 border-emerald-200 focus:border-emerald-500 focus:outline-none py-1"
          />

          <button 
            type="button"
            onClick={() => {
                const limit = category.isPlural ? 99 : 1;
                onChange(category.id, Math.min(limit, value + 1));
            }}
            disabled={disabled || (!category.isPlural && value >= 1)}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-30 shadow-sm"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeirInput;
