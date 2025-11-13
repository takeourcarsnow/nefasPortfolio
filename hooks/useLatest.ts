"use client";
import { useEffect, useState } from 'react';

interface LatestState<T> {
  data: T[];
  loading: boolean;
}

export const useLatest = <T,>(url: string, limit = 3) => {
  const [state, setState] = useState<LatestState<T>>({ data: [], loading: true });
  useEffect(() => {
    let cancelled = false;
    fetch(url)
      .then(r => r.json())
      .then((items: T[]) => {
        if (cancelled) return;
        // naive date sort if possible
        const hasDate = (x: unknown): x is { date?: string } => !!x && typeof (x as { date?: unknown }).date === 'string';
        const sorted = [...items].sort((a, b) => {
          if (hasDate(a) && hasDate(b)) return new Date(b.date!).getTime() - new Date(a.date!).getTime();
          return 0;
        });
        setState({ data: sorted.slice(0, limit), loading: false });
      })
      .catch(() => { if (!cancelled) setState({ data: [], loading: false }); });
    return () => { cancelled = true; };
  }, [url, limit]);
  return state;
};