"use client";
import { useState, useCallback } from 'react';

export const useTouchSwipe = (goPrev: () => void, goNext: () => void) => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.changedTouches.length === 1) {
      const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
      const deltaX = touchEnd.x - touchStart.x;
      const deltaY = Math.abs(touchEnd.y - touchStart.y);

      // Only trigger swipe if horizontal movement is greater than vertical
      if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
        if (deltaX > 0) goPrev();
        else goNext();
      }
    }
  }, [touchStart, goPrev, goNext]);

  return { handleTouchStart, handleTouchEnd };
};