import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';
import { Globe, Check, ChevronDown } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'compact-pill' | 'dropdown' | 'mobile-list' | 'footer-inline';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'dropdown',
  className = '',
}) => {
  const { language, setLanguage, languages, currentOption } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 1. Compact Pill (used in Top Bar or Footer)
  if (variant === 'compact-pill') {
    return (
      <div className={`inline-flex items-center bg-zinc-900 border border-zinc-700/80 rounded-sm p-0.5 ${className}`}>
        {languages.map((item) => {
          const isActive = item.code === language;
          return (
            <button
              key={item.code}
              onClick={() => setLanguage(item.code)}
              className={`flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold transition-all rounded-xs cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
              title={item.label}
              aria-label={`Switch to ${item.label}`}
            >
              <span>{item.flag}</span>
              <span>{item.shortLabel}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // 2. Mobile List (for mobile drawer menu)
  if (variant === 'mobile-list') {
    return (
      <div className={`space-y-1.5 ${className}`}>
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1">
          <Globe className="w-3.5 h-3.5 text-emerald-600" />
          <span>Ngôn ngữ / Language / Bahasa</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {languages.map((item) => {
            const isActive = item.code === language;
            return (
              <button
                key={item.code}
                onClick={() => setLanguage(item.code)}
                className={`flex flex-col items-center justify-center p-2 rounded-sm border transition-all text-center cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold shadow-xs'
                    : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-700'
                }`}
              >
                <span className="text-base leading-none mb-1">{item.flag}</span>
                <span className="text-[11px] font-bold leading-tight">{item.shortLabel}</span>
                <span className="text-[9px] text-zinc-500 truncate max-w-[80px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. Footer Inline Selector
  if (variant === 'footer-inline') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Globe className="w-3.5 h-3.5 text-zinc-400" />
        <div className="flex items-center gap-1 bg-zinc-800 border border-zinc-700 p-0.5 rounded-sm">
          {languages.map((item) => {
            const isActive = item.code === language;
            return (
              <button
                key={item.code}
                onClick={() => setLanguage(item.code)}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono transition-colors rounded-xs cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-700'
                }`}
              >
                <span>{item.flag}</span>
                <span>{item.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 4. Default Dropdown (Desktop Navbar)
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border border-zinc-200 hover:border-zinc-300 rounded-sm text-xs font-mono font-bold transition-colors cursor-pointer group"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="text-sm leading-none">{currentOption.flag}</span>
        <span>{currentOption.shortLabel}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-emerald-600' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 bg-white border border-zinc-200 rounded-sm shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 text-left">
          <div className="px-3 py-1 text-[10px] font-mono text-zinc-400 uppercase tracking-wider border-b border-zinc-100">
            Language / Ngôn ngữ
          </div>
          {languages.map((item) => {
            const isActive = item.code === language;
            return (
              <button
                key={item.code}
                onClick={() => {
                  setLanguage(item.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer text-left ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : 'text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{item.flag}</span>
                  <div className="flex flex-col">
                    <span className="leading-tight">{item.label}</span>
                    <span className="text-[10px] text-zinc-400 font-mono">{item.shortLabel}</span>
                  </div>
                </div>
                {isActive && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
