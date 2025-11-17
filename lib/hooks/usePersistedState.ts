"use client";
import { useState, useEffect } from 'react';

export const usePersistedState = <T,>(key: string, defaultValue: T) => {
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem(key);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (defaultValue instanceof Set && Array.isArray(parsed)) {
              setState(new Set(parsed) as T);
            } else {
              setState(parsed);
            }
          } catch {
            // Fallback: some older/external code might have stored raw values (e.g. en)
            // Try to coerce common primitives, otherwise use the raw string.
            if (stored === 'true' || stored === 'false') {
              // boolean
              setState((stored === 'true') as unknown as T);
            } else if (!Number.isNaN(Number(stored))) {
              // number
              setState((Number(stored) as unknown) as T);
            } else {
              // plain string
              setState((stored as unknown) as T);
            }
          }
        }
      } catch {
        // Storage access blocked, use default
      }
    }
  }, [key]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const valueToStore = state instanceof Set ? [...state] : state;
        sessionStorage.setItem(key, JSON.stringify(valueToStore));
      } catch {
        // Storage access blocked, ignore
      }
    }
  }, [key, state]);

  return [state, setState] as const;
};