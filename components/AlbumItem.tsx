"use client";
import React from 'react';
import { LazyImage } from './LazyImage.tsx';
import type { AlbumItem } from '../lib/types/content.ts';

interface AlbumItemProps {
  album: AlbumItem;
  onClick: () => void;
}

export const AlbumItemComponent: React.FC<AlbumItemProps> = ({ album, onClick }) => {
  return (
    <div className="grid-item album-item" style={{ cursor: 'pointer' }} onClick={onClick}>
      <LazyImage
        src={album.coverImage}
        alt={album.title}
        style={{ width: '100%', height: 200, borderRadius: 6 }}
      />
      <h3>{album.title}</h3>
      <p style={{ margin: 0 }}>{album.description}</p>
      <div className="photo-meta" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
        paddingTop: 10,
        borderTop: '1px solid var(--border-color)',
        fontSize: '0.8em'
      }}>
        <span className="photo-date" style={{ color: 'var(--secondary-color)' }}>
          {new Date(album.date).toLocaleDateString()}
        </span>
        <span className="photo-tags" style={{ color: 'var(--accent-color)', fontFamily: 'var(--mono-font)' }}>
          {album.tags?.map(tag => `#${tag}`).join(' ')}
        </span>
      </div>
    </div>
  );
};