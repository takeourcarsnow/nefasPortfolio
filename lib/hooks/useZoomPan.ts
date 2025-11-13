"use client";
import { useState, useCallback } from 'react';

export const useZoomPan = () => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastPan, setLastPan] = useState({ x: 0, y: 0 });

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setLastPan({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom === 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setLastPan(pan);
    e.preventDefault();
  }, [zoom, pan]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || zoom === 1) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setPan({
      x: lastPan.x + deltaX,
      y: lastPan.y + deltaY
    });
  }, [isDragging, zoom, dragStart, lastPan]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleImageClick = useCallback(() => {
    if (isDragging) return;

    if (zoom === 1) {
      setZoom(2);
    } else {
      resetZoom();
    }
  }, [zoom, isDragging, resetZoom]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(1, Math.min(3, zoom + delta));
    setZoom(newZoom);

    if (newZoom === 1) {
      setPan({ x: 0, y: 0 });
      setLastPan({ x: 0, y: 0 });
    }
  }, [zoom]);

  return {
    zoom,
    pan,
    isDragging,
    resetZoom,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleImageClick,
    handleWheel
  };
};