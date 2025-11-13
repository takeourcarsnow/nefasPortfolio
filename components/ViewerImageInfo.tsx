"use client";
import React from 'react';
import type { PhotoItem } from '../lib/types/content.ts';

interface ViewerImageInfoProps {
  photo: PhotoItem;
  index: number;
  photosLength: number;
  zoom: number;
}

export const ViewerImageInfo: React.FC<ViewerImageInfoProps> = ({ photo, index, photosLength, zoom }) => {
  const formattedDate = photo.date ? new Date(photo.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : '';
  const tags = photo.tags?.map(tag => `#${tag}`).join(' ') || '';

  return (
    <div style={{
      color: 'white',
      marginTop: 18,
      textAlign: 'center',
      maxWidth: '90vw',
      zIndex: 10001,
      display: zoom > 1 ? 'none' : 'block'
    }}>
      <h3 style={{
        margin: '0 0 5px 0',
        color: '#00ff9d',
        textShadow: '0 0 8px #00ff9d, 0 0 2px #fff'
      }}>
        {photo.title}
      </h3>
      <p style={{
        margin: '0 0 10px 0',
        color: '#ccc',
        fontSize: '1.1em',
        background: 'rgba(0,0,0,0.7)',
        display: 'inline-block',
        padding: '4px 16px',
        borderRadius: 6
      }}>
        {photo.description}
      </p>
      <div style={{ fontSize: '0.9em', color: '#666' }}>
        {formattedDate}{tags ? ` • ${tags}` : ''}
      </div>
      <div style={{ fontSize: '0.8em', color: '#555', marginTop: 8 }}>
        {index + 1} / {photosLength}
      </div>
    </div>
  );
};