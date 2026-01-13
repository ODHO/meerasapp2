
import React from 'react';
import { SHARIA_RULES } from '../rules_constants';
import { Language } from '../types';
import { translations } from '../translations';

interface RulesViewProps {
  onBack: () => void;
  lang: Language;
}

const RulesView: React.FC<RulesViewProps> = ({ onBack, lang }) => {
  const t = translations[lang];
  const isUrdu = lang === 'ur';
  const [search, setSearch] = React.useState('');

  // Filter and Group rules by category
  const filteredRules = SHARIA_RULES.filter(rule => 
    (isUrdu ? rule.titleUr : rule.titleEn).toLowerCase().includes(search.toLowerCase()) ||
    (isUrdu ? rule.contentUr : rule.contentEn).toLowerCase().includes(search.toLowerCase()) ||
    rule.id.includes(search)
  );

  const categoriesMap = filteredRules.reduce((acc, rule) => {
    const cat = isUrdu ? rule.categoryUr : rule.categoryEn;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(rule);
    return acc;
  }, {} as Record<string, typeof SHARIA_RULES>);

  const categories = Object.keys(categoriesMap);

  return (
    <div className={`space-y-8 animate-in fade-in duration-700 ${isUrdu ? 'text-right' : 'text-left'}`}>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100">
        <div className="bg-emerald-900 p-8 text-white relative">
          <button 
            onClick={onBack}
            className={`absolute top-8 ${isUrdu ? 'left-8' : 'right-8'} text-emerald-200 hover:text-white transition-colors flex items-center gap-2 font-bold z-10`}
          >
            <i className={`fa-solid ${isUrdu ? 'fa-arrow-right' : 'fa-arrow-left'}`}></i>
            {t.back}
          </button>
          <h2 className="text-3xl font-bold font-amiri mb-2">{isUrdu ? 'وراثت کے قوانین' : 'Inheritance Rules'}</h2>
          <p className="opacity-70 max-w-2xl mb-8">{isUrdu ? 'تقسیم کے لیے استعمال ہونے والے 44 جامع شرعی اصولوں کی تفصیل۔' : 'Comprehensive breakdown of the 44 Sharia principles used for distribution.'}</p>
          
          <div className="relative max-w-md">
            <i className={`fa-solid fa-magnifying-glass absolute top-1/2 -translate-y-1/2 ${isUrdu ? 'left-4' : 'right-4'} text-emerald-300`}></i>
            <input 
              type="text" 
              placeholder={isUrdu ? 'قوانین تلاش کریں...' : 'Search rules...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full bg-white/10 border border-white/20 rounded-xl py-3 ${isUrdu ? 'pr-4 pl-12 text-right' : 'pl-4 pr-12 text-left'} text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white/20 transition-all`}
            />
          </div>
        </div>

        <div className="p-8 md:p-12 space-y-16">
          {categories.length === 0 ? (
            <div className="text-center py-20">
              <i className="fa-solid fa-folder-open text-6xl text-emerald-100 mb-4"></i>
              <p className="text-gray-400 text-xl">{isUrdu ? 'کوئی قانون نہیں ملا' : 'No rules found'}</p>
            </div>
          ) : (
            categories.map(cat => (
              <section key={cat} className="space-y-8">
                <div className={`flex items-center gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                  <h3 className="text-xl md:text-2xl font-bold text-emerald-800 bg-emerald-50 px-6 py-2 rounded-full border border-emerald-100">
                    {cat}
                  </h3>
                  <div className="h-px flex-1 bg-emerald-100"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoriesMap[cat].map((rule) => (
                    <div key={rule.id} className="group p-6 rounded-2xl border border-emerald-50 hover:border-emerald-200 hover:shadow-md transition-all duration-300 bg-white">
                      <div className={`flex items-start gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold shadow-lg shadow-emerald-200">
                          {rule.id}
                        </div>
                        <div className="space-y-3 flex-1">
                          <h4 className="font-bold text-emerald-900 group-hover:text-emerald-700 transition-colors">
                            {isUrdu ? rule.titleUr : rule.titleEn}
                          </h4>
                          <div className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                            {isUrdu ? rule.contentUr : rule.contentEn}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>

      <div className="flex justify-center pb-12">
        <button 
          onClick={onBack}
          className="px-12 py-4 bg-emerald-800 text-white rounded-full font-bold text-lg hover:bg-emerald-900 shadow-xl transform active:scale-95 transition-all flex items-center gap-3"
        >
          <i className="fa-solid fa-calculator"></i>
          {isUrdu ? 'کیلکولیٹر پر واپس جائیں' : 'Return to Calculator'}
        </button>
      </div>
    </div>
  );
};

export default RulesView;
