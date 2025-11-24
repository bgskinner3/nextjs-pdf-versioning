/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useRef } from 'react';

export const useDebounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
) => {
  const ref = useRef<ReturnType<typeof setTimeout>>(null);

  return function executedFunction(...args2: Parameters<T>) {
    if (!ref.current) return;
    const later = () => {
      if (!ref.current) return;
      clearTimeout(ref.current);
      func(...args2);
    };

    clearTimeout(ref.current);
    ref.current = setTimeout(later, wait);
  };
};
