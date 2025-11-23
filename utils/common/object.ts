

/**
 * ## 🧩 Available Methods
 *
 * - `keys` — Returns the keys of an object with full type inference.
 * - `entries` — Returns typed key-value pairs of an object.
 * - `fromEntries` — Builds a typed object from key-value entry tuples.
 * - `values` — Returns the values of an object with inferred types.
 * - `has` — Checks if a nested property exists via dot notation.
 * - `get` — Safely retrieves a nested property using a dot path.
 * - `set` — Safely sets a nested property using a dot path.
 *
 * ---
 * @see {@link CommonUtilsDocs.ObjectUtils}
 */
export class ObjectUtils {
  /**
   * Returns the keys of an object while protecting key inference.
   *
   * @template Obj - The object type
   * @param {Obj} obj - The object to extract keys from
   */
  static keys<Obj extends object>(obj: Obj) {
    return Object.keys(obj) as (keyof Obj)[];
  }
  /**
   * Returns the key-value pairs of an object while protecting type inference.
   *
   * @template T - The object type
   * @param {T} obj - The object to extract key-value pairs from
   */
  static entries<T extends Record<string, unknown>>(
    obj: T,
  ): [keyof T, T[keyof T]][] {
    return obj ? (Object.entries(obj) as [keyof T, T[keyof T]][]) : [];
  }
  /**
   * Constructs an object from an array of entries with type safety.
   */

  // static fromEntries<K extends string, V>(entries: [K, V][]): Record<K, V> {
  //   return Object.fromEntries(entries) as Record<K, V>;
  // }
  static fromEntries<
    K extends string | number | symbol = string, // default key type
    V = unknown,
  >(entries: [K, V][]): Record<K, V> {
    return Object.fromEntries(entries) as Record<K, V>;
  }
  /**
   * Returns the values of an object while protecting type inference.
   *
   * @template Obj - The object type
   * @param {Obj} obj - The object to extract values from
   */
  static values<Obj extends object>(obj: Obj) {
    return Object.values(obj) as Obj[keyof Obj][];
  }

  /**
   * Checks if a nested property exists in an object using dot notation.
   * @param obj - The object to check.
   * @param path - Dot-separated path like 'user.profile.name'
   */
  static has<Obj extends object>(obj: Obj, path: string): boolean {
    if (!path) return false;

    const keys = path.split('.');
    let current: unknown = obj;

    for (const key of keys) {
      // Only check 'in' if current is an object
      if (current == null || typeof current !== 'object' || !(key in current)) {
        return false;
      }
      // TypeScript knows current is object here, so we can index with key
      current = (current as Record<string, unknown>)[key];
    }

    return true;
  }

  /**
   * Safely gets a nested property from an object using dot notation.
   * @param obj - The object to access.
   * @param path - Dot-separated path like 'user.profile.name'
   */
  static get<Obj extends object, Path extends string>(
    obj: Obj,
    path: Path,
  ): unknown {
    if (!path) return undefined;
    const keys = path.split('.');
    let current: unknown = obj;
    for (const key of keys) {
      if (current == null || typeof current !== 'object' || !(key in current)) {
        return undefined;
      }
      current = (current as Record<string, unknown>)[key];
    }
    return current;
  }

  /**
   * Safely sets a nested property on an object using dot notation.
   * Creates intermediate objects as needed.
   * @param obj - The object to modify.
   * @param path - Dot-separated path like 'user.profile.name'
   * @param value - The value to set
   */
  static set<Obj extends object>(obj: Obj, path: string, value: unknown): void {
    if (!path) return;

    const keys = path.split('.');
    let current: unknown = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];

      if (typeof current !== 'object' || current === null) {
        // Should never happen if obj is valid, but safeguard
        return;
      }

      const record = current as Record<string, unknown>;

      if (
        !(key in record) ||
        typeof record[key] !== 'object' ||
        record[key] === null
      ) {
        record[key] = {};
      }

      current = record[key];
    }

    if (typeof current === 'object' && current !== null) {
      (current as Record<string, unknown>)[keys[keys.length - 1]] = value;
    }
  }
}

