import { createSelector } from 'reselect';

import { RootState } from '@store/types';

/* Memoized selectors */

export const getAcceptedContacts = createSelector(
  (state: RootState) => state.profile.contacts,
  contacts => contacts.filter(contact => contact.status === 'accepted')
);

export const getGroupRefs = createSelector(
  (state: RootState) => state.profile.groups,
  groups => groups.map(group => group.ref)
);
