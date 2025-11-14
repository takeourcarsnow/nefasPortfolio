/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from 'react';
import type { PhotoItem } from '../lib/types/content.ts';

interface ViewerModalProps {
  photos: PhotoItem[];
  index: number;
  onClose: () => void;
  setIndex: (i: number) => void;
}

export const ViewerModal: React.FC<ViewerModalProps> = ({ photos, index, onClose, setIndex }) => {
  const photo = photos[index];

  const goNext = () => setIndex((index + 1) % photos.length);
  const goPrev = () => setIndex((index - 1 + photos.length) % photos.length);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose, goNext, goPrev]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!photo) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.95)',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        style={{
          position: 'absolute',
          top: 24,
          right: 32,
          background: 'none',
          border: 'none',
          color: '#00ff9d',
          fontSize: '2.1em',
          cursor: 'pointer',
          zIndex: 10001
        }}
        onClick={onClose}
      >
        ×
      </button>

      {/* Navigation arrows */}
      <button
        style={{
          position: 'absolute',
          left: 32,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          color: '#00ff9d',
          fontSize: '2.5em',
          cursor: 'pointer',
          zIndex: 10002
        }}
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
      >
        ◀
      </button>
      <button
        style={{
          position: 'absolute',
          right: 32,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          color: '#00ff9d',
          fontSize: '2.5em',
          cursor: 'pointer',
          zIndex: 10002
        }}
        onClick={(e) => { e.stopPropagation(); goNext(); }}
      >
        ▶
      </button>

      {/* Image */}
      <img
        src={photo.image}
        alt={photo.title}
        style={{
          maxWidth: '90vw',
          maxHeight: '80vh',
          objectFit: 'contain',
          borderRadius: 8
        }}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Info */}
      <div style={{
        color: 'white',
        marginTop: 18,
        textAlign: 'center',
        maxWidth: '90vw'
      }}>
        <h3 style={{
          margin: '0 0 5px 0',
          color: '#00ff9d'
        }}>
          {photo.title}
        </h3>
        <p style={{
          margin: '0 0 10px 0',
          color: '#ccc'
        }}>
          {photo.description}
        </p>
        <div style={{ fontSize: '0.9em', color: '#666' }}>
          {index + 1} / {photos.length}
        </div>
      </div>
    </div>
  );
};
