
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import Standardheirs from '../assets/Standardheirs.jpg';

interface ProcessChartViewProps {
  lang: Language;
  onBack: () => void;
}

const ProcessChartView: React.FC<ProcessChartViewProps> = ({ lang, onBack }) => {
  const t = translations[lang];
  const isUrdu = lang === 'ur';

  const stages = [
    { id: 'blocking', icon: 'fa-user-slash', color: 'bg-red-500' },
    { id: 'shares', icon: 'fa-chart-pie', color: 'bg-blue-500' },
    { id: 'awal', icon: 'fa-arrow-up-right-dots', color: 'bg-amber-500' },
    { id: 'residue', icon: 'fa-plus-circle', color: 'bg-emerald-600' },
    { id: 'radd', icon: 'fa-arrow-rotate-left', color: 'bg-teal-500' },
    { id: 'final', icon: 'fa-check-double', color: 'bg-emerald-800' }
  ];

  const isSmall = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className={`space-y-8 animate-in fade-in zoom-in duration-700 ${isUrdu ? 'text-right' : 'text-left'}`}>
      <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
        <div className="bg-emerald-900 p-8 text-white relative overflow-hidden">
            {/* Abstract Background patterns */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold font-amiri mb-2">{t.processChartTitle}</h2>
                    <p className="text-emerald-100 opacity-80 max-w-xl text-sm md:text-base">
                        {isUrdu 
                            ? "وراثت کی تقسیم کے منطقی مراحل کا بصری نقشہ۔ یہ چارٹ دکھاتا ہے کہ قوانین کس ترتیب سے لاگو ہوتے ہیں۔"
                            : "A visual representation of the logical steps in Sharia inheritance. This chart shows how rules are applied sequentially."}
                    </p>
                </div>
                <button 
                  onClick={onBack}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs md:text-sm font-bold transition-all backdrop-blur-sm self-start md:self-center"
                >
                  {t.back}
                </button>
            </div>
        </div>
<div className="p-8 md:p-12 bg-emerald-50/20">
            <img src={Standardheirs} alt="Standardheirs" />
        </div>
        <div className="p-8 md:p-12 bg-emerald-50/20">
          <div className="max-w-2xl mx-auto relative">
            {/* Central vertical line */}
            <div className={`absolute top-0 bottom-0 w-0.5 bg-emerald-200 left-1/2 -translate-x-1/2 hidden md:block`}></div>

            <div className="space-y-12 relative z-10">
              {stages.map((stage, index) => (
                <div key={stage.id} className={`flex flex-col md:flex-row items-center gap-6 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content side */}
                  <div className={`flex-1 w-full md:w-auto ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className={`bg-white p-5 md:p-6 rounded-2xl shadow-lg border border-emerald-50 hover:border-emerald-200 transition-all hover:shadow-xl transform hover:-translate-y-1 group`}>
                       <span className={`inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl mb-3 text-white shadow-md ${stage.color}`}>
                            <i className={`text-xs md:text-base fa-solid ${stage.icon}`}></i>
                       </span>
                       <h3 className="text-lg md:text-xl font-bold text-emerald-900 mb-2">{(t as any)[`stage_${stage.id}`]}</h3>
                       <p className="text-[11px] md:text-sm text-gray-500 leading-relaxed md:leading-relaxed">
                          {getStageDescription(stage.id, lang)}
                       </p>
                    </div>
                  </div>

                  {/* Indicator side */}
                  <div className="flex flex-row md:flex-col items-center justify-center relative w-full md:w-12 h-0 md:h-12">
                     <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-4 border-white shadow-md z-20 transition-all duration-500 scale-110 md:scale-125 ${stage.color}`}></div>
                     {/* Horizontal line connector for desktop */}
                     <div className={`absolute top-1/2 h-0.5 bg-emerald-200 w-12 hidden md:block ${index % 2 === 0 ? 'right-full' : 'left-full'}`}></div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

function getStageDescription(id: string, lang: Language): string {
    const isUrdu = lang === 'ur';
    const descriptions: Record<string, { en: string, ur: string }> = {
        blocking: {
            en: "Initial check to see who is excluded by closer relatives (e.g., Son blocks Brother).",
            ur: "قریبی رشتہ داروں کی موجودگی میں دور کے رشتہ داروں کی محرومی کا جائزہ (مثلاً بیٹے کی موجودگی میں بھائی محروم ہوجاتا ہے)۔"
        },
        shares: {
            en: "Assigning prescribed portions (1/2, 1/4, etc.) to specifically mentioned heirs like parents or spouse.",
            ur: "قرآن و سنت میں ذکر کردہ مخصوص حصص (مثلاً 1/2، 1/4 وغیرہ) کی وارثین (جیسے والدین، میاں/بیوی) میں تقسیم۔"
        },
        awal: {
            en: "If the sum of fixed shares exceeds 1, all shares are reduced proportionally using the logic of 'Awal.",
            ur: "اگر مقررہ حصوں کا مجموعہ 1 سے زیادہ ہو جائے تو 'عول' کے اصول کے تحت تمام حصوں میں متناسب کمی کی جاتی ہے۔"
        },
        residue: {
            en: "Remaining portion is given to male-line relatives (Asaba) based on their priority ranking.",
            ur: "مقررہ حصوں کی تقسیم کے بعد بچ جانے والا ترکہ 'عصبہ' رشتہ داروں (جیسے بیٹا، بھائی) میں ان کی ترتیب کے مطابق تقسیم ہوتا ہے۔"
        },
        radd: {
            en: "If portions are left and there are no Asaba, the residue is returned to eligible fixed-share heirs.",
            ur: "اگر ترکہ بچ جائے اور کوئی عصبہ نہ ہو، تو بقیہ حصہ اہل مقررہ وارثین کو دوبارہ متناسب تقسیم کر دیا جاتا ہے۔"
        },
        final: {
            en: "Verification and summary of all shares to ensure 100% distribution.",
            ur: "تمام حصوں کی تصدیق اور خلاصہ تاکہ 100 فیصد ترکہ کی تقسیم مکمل ہو سکے۔"
        }
    };
    return descriptions[id][lang];
}

export default ProcessChartView;
