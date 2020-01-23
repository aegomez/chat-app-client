import { createAction } from 'typesafe-actions';

// Standard action creators

// After a successful register, automatically redirect to /login
export const setRedirectToLogin = createAction('view/setRegisterRedirect')<
  boolean
>();

// Make the settings view visible instead of chat
export const makeSettingsVisible = createAction('view/makeSettingsVisible')<
  boolean
>();

// General request failure action creator
export const failRequest = createAction('user/any/failure')<boolean>();
