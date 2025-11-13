"use client";
import React from 'react';
import { LanguageSwitcher } from './LanguageSwitcher.tsx';

interface Post { id: string; title: string; date: string; tags: string[]; content: { en: string[]; lt?: string[] }; }

interface BlogSnippetProps {
  post: Post;
  index: number;
  isOpen: boolean;
  lang: 'en' | 'lt';
  setLang: (lang: 'en' | 'lt') => void;
  onToggle: (title: string) => void;
}

export const BlogSnippet: React.FC<BlogSnippetProps> = ({ post, index, isOpen, lang, setLang, onToggle }) => {
  const contentArr = post.content[lang] || post.content.en;

  return (
    <div key={post.id ?? post.title ?? index} className="blog-snippet" style={{ marginBottom: 24 }}>
      <div className="blog-snippet-header" style={{ cursor: 'pointer' }} onClick={() => onToggle(post.title)}>
        <h3>&gt; {post.title}</h3>
        <span className="blog-date">{new Date(post.date).toLocaleDateString()}</span>{' '}
        <span className="blog-tags">{post.tags.map(t => <span key={t} className="blog-tag">{t}</span>)}</span>{' '}
        <button
          className="blog-toggle"
          aria-expanded={isOpen}
          onClick={(e) => { e.stopPropagation(); onToggle(post.title); }}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); onToggle(post.title); } }}
          type="button"
        >
          {isOpen ? '[ ...read less ]' : '[ read more... ]'}
        </button>
      </div>
      {isOpen && (
        <div className="blog-full-content expanded">
          <LanguageSwitcher lang={lang} setLang={setLang} />
          <div className="blog-content-text">
            {contentArr.map((para, i) => {
              // use paragraph content + index as a stable-ish key
              const k = (typeof para === 'string' ? para : JSON.stringify(para)).slice(0, 40) + '::' + i;
              return <p key={k}>{para}</p>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};