"use client";
import { useMemo } from 'react';
import type { PhotoEntry, PhotoItem, AlbumItem } from '../types/content.ts';

interface FlatPhoto extends PhotoItem { albumTitle?: string; }

export const useFlattenPhotos = (data: PhotoEntry[] | null | undefined): [FlatPhoto[], AlbumItem[]] => {
  return useMemo(() => {
    if (!data) return [[], []] as [FlatPhoto[], AlbumItem[]];
    const flats: FlatPhoto[] = [];
    const albums: AlbumItem[] = [];
    data.forEach((item: PhotoEntry) => {
      if ('photos' in item) {
        const album = item as AlbumItem;
        albums.push(album);
        album.photos.forEach(p => flats.push(Object.assign({}, p, { type: 'photo', date: album.date, tags: album.tags, albumTitle: album.title })));
      } else {
        flats.push(item as PhotoItem);
      }
    });
    return [flats, albums] as [FlatPhoto[], AlbumItem[]];
  }, [data]);
};