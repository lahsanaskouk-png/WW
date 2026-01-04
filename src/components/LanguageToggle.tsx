'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-2xl border border-white/5">
      <button
        type="button"
        onClick={() => setLanguage('ar')}
        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all duration-300 ${
          language === 'ar'
            ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
            : 'text-slate-500 hover:text-white'
        }`}
      >
        العربية
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all duration-300 ${
          language === 'en'
            ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
            : 'text-slate-500 hover:text-white'
        }`}
      >
        English
      </button>
    </div>
  );
}
