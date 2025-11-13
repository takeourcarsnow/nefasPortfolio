"use client";
import { useCallback } from 'react';

export const useNavigation = (index: number, photosLength: number, setIndex: (i: number) => void, resetZoom: () => void) => {
  const goNext = useCallback(() => {
    const nextIndex = (index + 1) % photosLength;
    setIndex(nextIndex);
    resetZoom();
  }, [index, photosLength, setIndex, resetZoom]);

  const goPrev = useCallback(() => {
    const prevIndex = (index - 1 + photosLength) % photosLength;
    setIndex(prevIndex);
    resetZoom();
  }, [index, photosLength, setIndex, resetZoom]);

  return { goNext, goPrev };
};