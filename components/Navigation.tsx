"use client";
import React from 'react';
import { useSection, SectionId } from './SectionContext.tsx';

const sections: { id: SectionId; label: string }[] = [
  { id: 'home-content', label: '[ home ]' },
  { id: 'video-content', label: '[ video ]' },
  { id: 'photo-content', label: '[ photo ]' },
  { id: '3d-content', label: '[ 3d ]' },
  { id: 'webdev-content', label: '[ webdev ]' },
  { id: 'blog-content', label: '[ blog ]' },
  { id: 'misc-content', label: '[ misc ]' }
];

export const Navigation: React.FC = () => {
  const { active, setActive } = useSection();
  return (
    <nav id="main-nav" role="navigation" aria-label="Main site navigation">
      {sections.map(s => (
        <a
          key={s.id}
          data-section={s.id}
          onClick={(e) => { e.preventDefault(); setActive(s.id); }}
          className={active === s.id ? 'active' : ''}
          href={`#${s.id}`}
          aria-current={active === s.id ? 'page' : undefined}
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
};
