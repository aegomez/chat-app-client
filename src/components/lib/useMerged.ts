import { useState } from 'react';

/**
 * React custom hook. Merge the previous
 * state object with new passed properties.
 * @param initialState The object's starting state.
 */
export function useMerged<S>(
  initialState: S
): [S, (props: Partial<S>) => void] {
  const [state, setState] = useState(initialState);
  function setMerged(props: Partial<S>): void {
    setState({ ...state, ...props });
  }
  return [state, setMerged];
}
