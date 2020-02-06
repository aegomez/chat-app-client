import { createAction } from 'typesafe-actions';

import { NotificationMessage, ModalName } from './types';

// Standard action creators

// After a successful register, automatically redirect to /login
export const setRedirectToLogin = createAction('view/setRegisterRedirect')<
  boolean
>();

// Filter sidebar contacts/groups
export const setFilter = createAction('view/sidebarFilter')<string>();

// Show/hide a modal view, only one can be
// visible at a time, 'none' hides all.
export const showModal = createAction('view/showModal')<ModalName>();

// Show/hide specific success messages
export const showSuccess = createAction('view/showSuccess')<boolean>();

// Show/hide notifications after a request
export const showNotification = createAction('view/notification')<
  NotificationMessage
>();
