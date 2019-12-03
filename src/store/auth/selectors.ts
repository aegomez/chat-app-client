// import { createSelector } from 'reselect';

import { RootState } from '../types';

export function getIsAuthenticated(state: RootState): boolean {
  return state.auth.isAuthenticated;
}

export function getSuccessVisible(state: RootState): boolean {
  return state.auth.successVisible;
}

export function getErrors(state: RootState): RootState['auth']['errors'] {
  return state.auth.errors;
}
