import { TTypeGuard } from '@/types';

export const isNull: TTypeGuard<null> = <T>(term: T | null): term is null =>
  term === null;

export const isArray: TTypeGuard<unknown[]> = <T, U>(
  term: Array<T> | U,
): term is Array<T> => Array.isArray(term);

export const isObject: TTypeGuard<object> = <T extends object, U>(
  term: T | U,
): term is NonNullable<T> =>
  !isNull(term) && !isArray(term) && typeof term === 'object';
