import { Dictionary, DictionaryAndSetter } from './types';
import { useMerged } from './useMerged';

/**
 * Accepts a list of strings or a single string
 * array. Returns: (a) an object using such
 * strings as key names and an empty string as
 * value, and (b) a function to update that
 * object by passing key/value pairs.
 */
export function useDictionary<S extends string, T = string>(
  ...names: S[]
): DictionaryAndSetter<S, T>;
export function useDictionary<S extends string, T = string>(
  names: S[]
): DictionaryAndSetter<S, T>;
export function useDictionary<S extends string>(names: S[]): unknown {
  const initialState = names.reduce((result, name) => {
    result[name] = '';
    return result;
  }, {} as Dictionary<S>);
  // Call the merge state's hook
  return useMerged(initialState);
}
