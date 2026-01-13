
import React, { useState } from 'react';
import { HEIR_CATEGORIES } from './constants';
import { DeceasedGender, HeirQuantities, CalculationResult, Language } from './types';
import HeirInput from './components/HeirInput';
import ResultsView from './components/ResultsView';
import RulesView from './components/RulesView';
import ProcessChartView from './components/ProcessChartView';
import BookReader from './components/BookReader';
import { calculateMeeras } from './inheritanceLogic';
import { translations } from './translations';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [step, setStep] = useState<number>(0); // 0: Start, 1: Selection, 2: Results, 3: Rules, 4: Chart, 5: Book
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [gender, setGender] = useState<DeceasedGender>(DeceasedGender.MALE);
  const [inputs, setInputs] = useState<HeirQuantities>({});
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [calculationSteps, setCalculationSteps] = useState<string[]>([]);

  const t = translations[lang];
  const isUrdu = lang === 'ur';

  const handleInputChange = (id: string, val: number) => {
    setInputs(prev => ({ ...prev, [id]: val }));
  };

  const startCalculation = () => {
    setStep(1);
    const initialInputs: HeirQuantities = {};
    HEIR_CATEGORIES.forEach(c => initialInputs[c.id] = 0);
    setInputs(initialInputs);
  };

  const handleCalculate = () => {
    const { results: calcResults, calculationSteps: calcSteps } = calculateMeeras(inputs, gender, lang);
    setResults(calcResults);
    setCalculationSteps(calcSteps);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetAll = () => {
    setStep(0);
    setInputs({});
    setResults([]);
    setCalculationSteps([]);
  };

  const groups = ['immediate', 'descendants', 'ascendants', 'siblings', 'extended'];

  return (
    <div className={`min-h-screen bg-emerald-50/30 pb-20 transition-all duration-300 ${isUrdu ? 'rtl font-amiri' : 'ltr'}`} dir={isUrdu ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-emerald-900 text-white py-4 md:py-6 px-4 shadow-lg mb-8 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className={`flex items-center gap-3 md:gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-lg md:rounded-xl flex items-center justify-center border border-white/20">
                <i className="fa-solid fa-hands-praying text-lg md:text-xl"></i>
            </div>
            <div className={isUrdu ? 'text-right' : 'text-left'}>
                <h1 className="text-lg md:text-2xl font-bold tracking-wide cursor-pointer" onClick={() => {setStep(0); setIsMenuOpen(false);}}>{t.title}</h1>
                <p className="text-emerald-200 text-[10px] md:text-xs font-medium">{t.subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-6">
            <nav className={`hidden lg:flex items-center gap-6 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <button 
                  onClick={() => setStep(3)}
                  className={`text-sm font-bold transition-all ${step === 3 ? 'text-white border-b-2 border-emerald-400' : 'text-emerald-200 hover:text-white'}`}
                >
                  {t.nav_rules}
                </button>
                <button 
                  onClick={() => setStep(4)}
                  className={`text-sm font-bold transition-all ${step === 4 ? 'text-white border-b-2 border-emerald-400' : 'text-emerald-200 hover:text-white'}`}
                >
                  {t.nav_chart}
                </button>
                <button 
                  onClick={() => setStep(5)}
                  className={`text-sm font-bold transition-all ${step === 5 ? 'text-white border-b-2 border-emerald-400' : 'text-emerald-200 hover:text-white'}`}
                >
                  {(t as any).nav_book}
                </button>
            </nav>

            <div className="flex items-center gap-1 md:gap-2 bg-white/10 p-1 rounded-full border border-white/10">
                <button 
                    onClick={() => setLang('en')}
                    className={`px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold transition-all ${lang === 'en' ? 'bg-emerald-600 text-white shadow-md' : 'text-emerald-200 hover:text-white'}`}
                >
                    EN
                </button>
                <button 
                    onClick={() => setLang('ur')}
                    className={`px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold transition-all ${lang === 'ur' ? 'bg-emerald-600 text-white shadow-md' : 'text-emerald-200 hover:text-white'}`}
                >
                    اردو
                </button>
            </div>

            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
            >
                <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
            <nav className="flex flex-col gap-2 p-4 bg-emerald-800/50 rounded-2xl border border-white/5">
                <button 
                    onClick={() => {setStep(3); setIsMenuOpen(false);}}
                    className={`p-3 rounded-xl text-left font-bold ${step === 3 ? 'bg-white/20 text-white' : 'text-emerald-100'}`}
                >
                    <i className="fa-solid fa-scale-balanced mr-3"></i> {t.nav_rules}
                </button>
                <button 
                    onClick={() => {setStep(4); setIsMenuOpen(false);}}
                    className={`p-3 rounded-xl text-left font-bold ${step === 4 ? 'bg-white/20 text-white' : 'text-emerald-100'}`}
                >
                    <i className="fa-solid fa-diagram-project mr-3"></i> {t.nav_chart}
                </button>
                <button 
                    onClick={() => {setStep(5); setIsMenuOpen(false);}}
                    className={`p-3 rounded-xl text-left font-bold ${step === 5 ? 'bg-white/20 text-white' : 'text-emerald-100'}`}
                >
                    <i className="fa-solid fa-book-open mr-3"></i> {(t as any).nav_book}
                </button>
            </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4">
        {step === 0 && (
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-emerald-100 text-center space-y-8 animate-in zoom-in duration-500">
            <div className="max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl font-bold text-emerald-900 font-amiri">{t.title}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {lang === 'en' 
                    ? "Identify legitimate shares of relatives according to Islamic law easily and accurately."
                    : "اسلامی قانون کے مطابق رشتہ داروں کے جائز حصوں کی شناخت آسانی اور درستی سے کریں۔"}
              </p>
            </div>

            <div className="space-y-8 max-w-lg mx-auto bg-emerald-50/50 p-8 rounded-2xl border border-emerald-100">
                <h3 className="text-xl font-bold text-emerald-900">{t.genderTitle}</h3>
                <div className={`flex justify-center gap-6 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                    <button 
                        onClick={() => setGender(DeceasedGender.MALE)}
                        className={`flex-1 p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${gender === DeceasedGender.MALE ? 'bg-emerald-800 text-white border-emerald-800 shadow-lg scale-105' : 'bg-white text-gray-500 border-gray-100 hover:border-emerald-200'}`}
                    >
                        <i className="fa-solid fa-mars text-4xl"></i>
                        <span className="font-bold text-lg uppercase tracking-wider">{t.male}</span>
                    </button>
                    <button 
                        onClick={() => setGender(DeceasedGender.FEMALE)}
                        className={`flex-1 p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${gender === DeceasedGender.FEMALE ? 'bg-emerald-800 text-white border-emerald-800 shadow-lg scale-105' : 'bg-white text-gray-500 border-gray-100 hover:border-emerald-200'}`}
                    >
                        <i className="fa-solid fa-venus text-4xl"></i>
                        <span className="font-bold text-lg uppercase tracking-wider">{t.female}</span>
                    </button>
                </div>
                <button 
                    onClick={startCalculation}
                    className="w-full px-12 py-5 bg-emerald-600 text-white rounded-full font-bold text-xl hover:bg-emerald-700 shadow-xl transform active:scale-95 transition-all"
                >
                    {t.begin}
                </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
            <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-md border border-emerald-100 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <div className={isUrdu ? 'text-right' : 'text-left'}>
                    <h2 className="text-2xl font-bold text-emerald-900">{t.identifyHeirs}</h2>
                    <p className="text-gray-500 text-sm">{t.identifyDesc}</p>
                </div>
                <div className={`flex gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                    <button 
                        onClick={() => setStep(0)}
                        className="px-6 py-3 border-2 border-emerald-800 text-emerald-800 rounded-full font-bold hover:bg-emerald-50 transition-all"
                    >
                        {t.back}
                    </button>
                    <button 
                        onClick={handleCalculate}
                        className="px-10 py-3 bg-emerald-800 text-white rounded-full font-bold shadow-lg hover:bg-emerald-900 transition-all"
                    >
                        {t.calculate}
                    </button>
                </div>
            </div>

            <div className="space-y-12">
              {groups.map(group => {
                const groupHeirs = HEIR_CATEGORIES.filter(c => c.group === group);
                const filteredHeirs = groupHeirs.filter(c => !c.genderRestrictions || c.genderRestrictions === gender);
                
                if (filteredHeirs.length === 0) return null;

                return (
                  <section key={group} className="space-y-4">
                    <div className={`flex items-center gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                        <div className="h-px flex-1 bg-emerald-200"></div>
                        <h3 className="text-lg font-bold text-emerald-800 whitespace-nowrap px-2 uppercase tracking-widest">
                            {(t as any)[`group_${group}`]}
                        </h3>
                        <div className="h-px flex-1 bg-emerald-200"></div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {filteredHeirs.map(category => (
                        <HeirInput 
                          key={category.id}
                          category={category}
                          value={inputs[category.id] || 0}
                          onChange={handleInputChange}
                          lang={lang}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>

            <div className="flex justify-center pt-8 pb-12">
              <button 
                onClick={handleCalculate}
                className="px-16 py-5 bg-emerald-800 text-white rounded-full font-bold text-xl shadow-2xl hover:bg-emerald-900 transform active:scale-95 transition-all flex items-center gap-3"
              >
                <i className="fa-solid fa-calculator"></i>
                {t.calculate}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <ResultsView results={results} calculationSteps={calculationSteps} onReset={resetAll} lang={lang} />
        )}

        {step === 3 && (
          <RulesView onBack={() => setStep(0)} lang={lang} />
        )}

        {step === 4 && (
          <ProcessChartView lang={lang} onBack={() => setStep(0)} />
        )}

        {step === 5 && (
          <BookReader lang={lang} onBack={() => setStep(0)} />
        )}
      </main>

      <footer className="mt-20 border-t border-emerald-100 pt-8 pb-12 text-center">
        <p className="text-emerald-800/40 text-xs font-medium uppercase tracking-widest">
          {isUrdu ? 'اسلامی تعلیمی رہنمائی کے تحت تقسیم کیا گیا' : 'Distributed under Islamic Educational Guidelines'}
        </p>
      </footer>
    </div>
  );
};

export default App;
