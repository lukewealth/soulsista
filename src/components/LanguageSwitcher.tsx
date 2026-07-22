import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../shared/i18n/LanguageContext';
import { Language } from '../shared/i18n/translations';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-forest hover:text-gold transition-colors">
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">
          {languages.find(l => l.code === language)?.flag} {languages.find(l => l.code === language)?.label}
        </span>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-xl border border-forest/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full text-left px-4 py-3 text-sm hover:bg-forest/5 transition-colors flex items-center gap-3 ${
              language === lang.code ? 'bg-gold/10 text-gold font-semibold' : 'text-forest'
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
