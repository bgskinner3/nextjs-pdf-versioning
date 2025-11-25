'use client';
import { useEffect } from 'react';

export const useLoadOnce = (callback: () => void) => {
  return useEffect(() => {
    const unmount = callback();

    return unmount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
