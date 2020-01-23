import { createReducer } from 'typesafe-actions';

import { setRedirectToLogin } from './actions';

const initialState = {
  redirectToLogin: false
};

export const viewReducer = createReducer(initialState).handleAction(
  setRedirectToLogin,
  (state, action) => ({
    ...state,
    redirectToLogin: action.payload
  })
);
