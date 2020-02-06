import { createSelector } from 'reselect';

import { RootState } from '@store/types';
import { GroupSchema } from '@api/user';

/* Memoized selectors */

const getFilter = createSelector(
  (state: RootState) => state.view.filter,
  filter => filter.toLowerCase()
);

export const getAcceptedContacts = createSelector(
  (state: RootState) => state.profile.contacts,
  getFilter,
  (contacts, filter) =>
    contacts.filter(
      contact =>
        contact.status === 'accepted' &&
        contact.ref.publicName.toLowerCase().includes(filter)
    )
);

export const getPendingContacts = createSelector(
  (state: RootState) => state.profile.contacts,
  contacts => contacts.filter(contact => contact.status === 'pending')
);

export const getNumberOfPendingContacts = createSelector(
  getPendingContacts,
  contacts => contacts.length
);

export const getGroupRefs = createSelector(
  (state: RootState) => state.profile.groups,
  getFilter,
  (groups, filter) =>
    groups.reduce(
      (result, { ref }) =>
        ref.name.toLowerCase().includes(filter) ? result.concat(ref) : result,
      [] as GroupSchema[]
    )
);
