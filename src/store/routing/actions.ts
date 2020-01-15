import { createAction } from 'typesafe-actions';

// Standard action creators

// After a successful register, automatically redirect to /login
export const setRedirectToLogin = createAction('routing/setRegisterRedirect')<
  boolean
>();
