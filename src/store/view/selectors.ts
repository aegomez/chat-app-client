import { RootState } from '../types';

export function getRedirectToLogin(state: RootState): boolean {
  return state.view.redirectToLogin;
}
