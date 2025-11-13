"use client";
import React from 'react';

interface ContentBlockProps {
  title: string;
  caption: string;
  onJump: () => void;
  children: React.ReactNode;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ title, caption, onJump, children }) => {
  return (
    <section style={{ marginTop: 40 }}>
      <h3 className="decrypt-text home-jump-tab" style={{ marginTop: 40, marginBottom: 5, cursor: 'pointer' }} onClick={onJump}>{title}</h3>
      <p className="typewriter-text" style={{ marginBottom: 20, color: '#00ff9d' }}>{caption}</p>
      {children}
    </section>
  );
};