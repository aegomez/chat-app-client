import { createSelector } from 'reselect';

import { RootState } from '@store/types';

/* Memoized selectors */

export const getAcceptedContacts = createSelector(
  (state: RootState) => state.profile.contacts,
  contacts => contacts.filter(contact => contact.status === 'accepted')
);
