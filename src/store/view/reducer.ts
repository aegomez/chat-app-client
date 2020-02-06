import { createReducer } from 'typesafe-actions';

import {
  setRedirectToLogin,
  showModal,
  showSuccess,
  showNotification
} from './actions';
import { logoutUser } from '../auth/actions';
import { NotificationMessage, ModalName } from './types';

const initialState = {
  redirectToLogin: false,
  modal: 'none' as ModalName,
  updateSuccess: false,
  notification: 'none' as NotificationMessage
};

export const viewReducer = createReducer(initialState)
  // Redirect from /register after the user already registered.
  .handleAction(setRedirectToLogin, (state, action) => ({
    ...state,
    redirectToLogin: action.payload
  }))
  // Show/hide a modal view, only one can be
  // visible at a time, 'none' hides all.
  .handleAction(showModal, (state, action) => ({
    ...state,
    modal: action.payload
  }))
  // Show success notification after updating settings
  .handleAction(showSuccess, (state, action) => ({
    ...state,
    updateSuccess: action.payload
  }))
  // Show notifications after requests
  .handleAction(showNotification, (state, action) => ({
    ...state,
    notification: action.payload
  }))
  // On a logout action, reset the state.
  .handleAction(logoutUser.success, () => initialState);
