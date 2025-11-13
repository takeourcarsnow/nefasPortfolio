"use client";
import React from 'react';

interface ViewerModalButtonsProps {
  zoom: number;
  onClose: () => void;
  goPrev: () => void;
  goNext: () => void;
}

export const ViewerModalButtons: React.FC<ViewerModalButtonsProps> = ({ zoom, onClose, goPrev, goNext }) => {
  return (
    <>
      {/* Close button */}
      <button
        style={{
          position: 'fixed',
          top: 24,
          right: 32,
          background: 'none',
          border: 'none',
          color: '#00ff9d',
          fontSize: '2.1em',
          cursor: 'pointer',
          zIndex: 10001,
          display: zoom > 1 ? 'none' : 'block'
        }}
        onClick={onClose}
      >
        ×
      </button>

      {/* Navigation arrows */}
      {zoom === 1 && (
        <>
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
        </>
      )}
    </>
  );
};