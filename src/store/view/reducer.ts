import { createReducer } from 'typesafe-actions';

import {
  setRedirectToLogin,
  showLogout,
  showSettings,
  showAvatarSuccess,
  showAddContact,
  showContactSuccess,
  showCreateGroup,
  showGroupSuccess,
  showInvitations,
  failRequest
} from './actions';
import { logoutUser } from '../auth/actions';

const initialState = {
  redirectToLogin: false,
  failureVisible: false,
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

  .handleAction(logoutUser.success, () => initialState);
