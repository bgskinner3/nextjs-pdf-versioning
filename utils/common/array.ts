type TArrayLengthMutationKeys =
  | 'splice'
  | 'push'
  | 'pop'
  | 'shift'
  | 'unshift'
  | number;

type TArrayItems<T extends Array<unknown>> =
  T extends Array<infer TItems> ? TItems : never;

type TFixedLengthArray<T extends unknown[]> = Pick<
  T,
  Exclude<keyof T, TArrayLengthMutationKeys>
> & {
  [Symbol.iterator]: () => IterableIterator<TArrayItems<T>>;
} & {
  length: number;
};
export class ArrayUtils {
  /**  @see {@link ArrayUtilsDocs.includes} */
  static includes<T extends U, U>(arr: ReadonlyArray<T>, el: U): el is T {
    return arr.includes(el as T);
  }

  /**  @see {@link ArrayUtilsDocs.createFixedLengthArray} */
  static createFixedLengthArray<T>(
    items: T[],
    length: number,
  ): TFixedLengthArray<T[]> {
    if (items.length !== length) {
      throw new Error(`Array must have exactly ${length} elements`);
    }
    return items satisfies TFixedLengthArray<T[]>;
  }

  /**
   * Returns a shallow copy of an array.
   *
   * @typeParam T - Type of array elements.
   * @param arr - Array to copy.
   * @returns A new array containing all items.
   *
   * @example
   * const original = [1, 2, 3];
   * const copy = ArrayUtils.readAllItems(original);
   * copy.push(4); // Does not affect `original`
   */
  static readAllItems<T>(arr: ReadonlyArray<T>): T[] {
    return [...arr]; // Simply returns a shallow copy of the array
  }
  /** 🧠 Safe map wrapper with correct inference */
  static map<T, U>(
    arr: ReadonlyArray<T>,
    fn: (_value: T, _index: number, _array: ReadonlyArray<T>) => U,
  ): U[] {
    return arr.map(fn);
  }
  /**
   * 🧠 Type-safe forEach for arrays that might be union types.
   * Helps TypeScript narrow union members while iterating.
   *
   * Supports both:
   * - Single arrays: `T[]`
   * - Union of arrays: `T[][]`
   *
   * @typeParam T - The type of array elements.
   *
   * @param arr - The array or array of arrays to iterate over.
   * @param fn - Callback executed for each element.
   *
   * @example
   * // Single array
   * const numbers = [1, 2, 3];
   * ArrayUtils.forEachUnion(numbers, (num, idx) => {
   *   console.log(num * 2, idx);
   * });
   *
   * @example
   * // Union of arrays
   * const arrays: number[][] = [[1, 2], [3, 4]];
   * ArrayUtils.forEachUnion(arrays, (num, idx) => {
   *   console.log(num * 2, idx);
   * });
   */
  static forEachUnion<T>(
    arr: T[] | T[][],
    fn: (item: T, index: number) => void,
  ): void {
    // Flatten the array if it’s an array of arrays
    const flatArr: T[] = Array.isArray(arr[0])
      ? ([] as T[]).concat(...(arr as T[][]))
      : (arr as T[]);
    flatArr.forEach(fn);
  }
  /** 🧠 Safe forEach wrapper with correct inference */
  static forEach<T>(
    arr: ReadonlyArray<T>,
    fn: (value: T, index: number, array: ReadonlyArray<T>) => void,
  ): void {
    arr.forEach(fn);
  }
  static reduce<T, U>(
    arr: ReadonlyArray<T>,
    fn: (
      accumulator: U,
      current: T,
      index: number,
      array: ReadonlyArray<T>,
    ) => U,
    initialValue: U,
  ): U {
    return arr.reduce(fn, initialValue);
  }
  /** 🧠 Type-safe flat for 1-level nested arrays */
  static flat<T>(arr: ReadonlyArray<T | T[]>): T[] {
    return arr.reduce<T[]>((acc, val) => acc.concat(val as T | T[]), []);
  }

  /** 🧠 Type-safe flatMap */
  static flatMap<T, U>(
    arr: ReadonlyArray<T>,
    fn: (item: T, index: number) => U | U[],
  ): U[] {
    return arr.reduce<U[]>((acc, item, i) => {
      const result = fn(item, i);
      return acc.concat(result as U[]);
    }, []);
  }

  /**
   * 🧠 Type-safe filter wrapper
   * Preserves TypeScript type inference.
   *
   * @example
   * const numbers: (number | null)[] = [1, 2, null, 4];
   * const validNumbers = ArrayUtils.filter(numbers, (n): n is number => n != null);
   */
  static filter<T, S extends T>(
    arr: ReadonlyArray<T>,
    predicate: (value: T, index: number, array: ReadonlyArray<T>) => value is S,
  ): S[];
  static filter<T>(
    arr: ReadonlyArray<T>,
    predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean,
  ): T[];
  static filter<T>(
    arr: ReadonlyArray<T>,
    predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean,
  ): T[] {
    return arr.filter(predicate);
  }
  /**
   * Shortcut for filtering out null or undefined values.
   */
  static filterNonNullable<T>(arr: ReadonlyArray<T | null | undefined>): T[] {
    return ArrayUtils.filter(arr, (item): item is T => item != null);
  }
}
