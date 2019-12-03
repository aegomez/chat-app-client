// Common types

export type Dictionary<Key extends string, Val = string> = Record<Key, Val>;

export type DictionaryAndSetter<S extends string, T = string> = [
  Dictionary<S, T>,
  (nextProps: Partial<Dictionary<S, T>>) => void
];
