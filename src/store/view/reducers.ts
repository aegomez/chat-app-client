import { createReducer } from 'typesafe-actions';

import { setRedirectToLogin, failRequest } from './actions';

const initialState = {
  redirectToLogin: false
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
  }));
