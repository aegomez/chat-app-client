import { createAction } from 'typesafe-actions';

// Standard action creators

// After a successful register, automatically redirect to /login
export const setRedirectToLogin = createAction('view/setRegisterRedirect')<
  boolean
>();

// Show/hide the settings view
export const showSettings = createAction('view/showSettings')<boolean>();

// Show avatar update success
export const showAvatarSuccess = createAction('view/showAvatarSuccess')<
  boolean
>();

// Show/hide the logout confirmation
export const showLogout = createAction('view/showLogout')<boolean>();

// General request failure action creator
export const failRequest = createAction('user/any/failure')<boolean>();
