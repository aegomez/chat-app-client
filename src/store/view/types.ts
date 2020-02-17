export { NewConnection } from '@api/chat';

export type NotificationMessage =
  | 'no-success'
  | 'no-auth'
  | 'network'
  | 'unknown'
  | 'success'
  | 'none'; // Hide notifications

export type ModalName =
  | 'loadingProfile'
  | 'settings'
  | 'logout'
  | 'addContact'
  | 'createGroup'
  | 'invitations'
  | 'groupMembers'
  | 'addMembers'
  | 'none'; // Hide all modals
