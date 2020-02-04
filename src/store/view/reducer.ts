import { createReducer } from 'typesafe-actions';

import {
  setRedirectToLogin,
  showLoadingProfile,
  showLogout,
  showSettings,
  showAvatarSuccess,
  showAddContact,
  showContactSuccess,
  showCreateGroup,
  showGroupSuccess,
  showInvitations,
  failOperation,
  failRequest
} from './actions';
import { logoutUser } from '../auth/actions';

const initialState = {
  redirectToLogin: false,
  loadingProfile: false,
  failedRequestVisible: false,
  failedOperationVisible: false,
  settingsVisible: false,
  avatarSuccessVisible: false,
  logoutVisible: false,
  addContactVisible: false,
  contactSuccessVisible: false,
  createGroupVisible: false,
  invitationsVisible: false,
  groupSuccessVisible: false
};

export const viewReducer = createReducer(initialState)
  // Redirect from /register after the user already registered.
  .handleAction(setRedirectToLogin, (state, action) => ({
    ...state,
    redirectToLogin: action.payload
  }))
  // Show/hide the loading profile spinner
  .handleAction(showLoadingProfile, (state, action) => ({
    ...state,
    loadingProfile: action.payload
  }))
  // After an operation failure (success === false),
  // show a notification.
  .handleAction(failOperation, (state, action) => ({
    ...state,
    failedOperationVisible: action.payload
  }))
  // After any other request failure,
  // show a notification.
  .handleAction(failRequest, (state, action) => ({
    ...state,
    failedRequestVisible: action.payload
  }))
  // Show/hide the settings view
  .handleAction(showSettings, (state, action) => ({
    ...state,
    settingsVisible: action.payload
  }))
  // Show success notification after updating avatar
  .handleAction(showAvatarSuccess, (state, action) => ({
    ...state,
    avatarSuccessVisible: action.payload
  }))
  // Show/hide the logout confirmation view
  .handleAction(showLogout, (state, action) => ({
    ...state,
    logoutVisible: action.payload
  }))
  // Show/hide the add contact view
  .handleAction(showAddContact, (state, action) => ({
    ...state,
    addContactVisible: action.payload
  }))
  .handleAction(showContactSuccess, (state, action) => ({
    ...state,
    contactSuccessVisible: action.payload
  }))
  // Show/hide the create group view
  .handleAction(showCreateGroup, (state, action) => ({
    ...state,
    createGroupVisible: action.payload
  }))
  .handleAction(showGroupSuccess, (state, action) => ({
    ...state,
    groupSuccessVisible: action.payload
  }))
  // Show/hide the accept/hide contacts modal
  .handleAction(showInvitations, (state, action) => ({
    ...state,
    invitationsVisible: action.payload
  }))
  // On a logout action, reset the state.
  .handleAction(logoutUser.success, () => initialState);
