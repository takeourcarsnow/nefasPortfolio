"use client";
import React from 'react';

interface LanguageSwitcherProps {
  lang: 'en' | 'lt';
  setLang: (lang: 'en' | 'lt') => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ lang, setLang }) => {
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', margin: '8px 0' }}>
      <button className={`blog-lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>English</button>
      <button className={`blog-lang-btn ${lang === 'lt' ? 'active' : ''}`} onClick={() => setLang('lt')}>Lietuviškai</button>
    </div>
  );
};