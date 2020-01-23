import { createReducer } from 'typesafe-actions';

import {
  setRedirectToLogin,
  setLogoutVisible,
  setSettingsVisible,
  failRequest
} from './actions';

const initialState = {
  redirectToLogin: false,
  failureVisible: false,
  settingsVisible: false,
  logoutVisible: false
};

export const viewReducer = createReducer(initialState)
  .handleAction(setRedirectToLogin, (state, action) => ({
    ...state,
    redirectToLogin: action.payload
  }))
  // After any other request failure,
  // show a notification.
  .handleAction(failRequest, (state, action) => ({
    ...state,
    failureVisible: action.payload
  }))
  // Show/hide the settings view
  .handleAction(setSettingsVisible, (state, action) => ({
    ...state,
    settingsVisible: action.payload
  }))

  .handleAction(setLogoutVisible, (state, action) => ({
    ...state,
    logoutVisible: action.payload
  }));
