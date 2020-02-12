import { createSelector } from 'reselect';

import { RootState } from '@store/types';
import { getGroupChatProps } from '@store/chat/selectors';

/* Selectors */

export const getUserId = (state: RootState): string => state.profile._id;

/* Memoized selectors */

export const getAcceptedContacts = createSelector(
  (state: RootState) => state.profile.contacts,
  contacts => contacts.filter(contact => contact.status === 'accepted')
);

export const getPendingContacts = createSelector(
  (state: RootState) => state.profile.contacts,
  contacts => contacts.filter(contact => contact.status === 'pending')
);

export const getNumberOfPendingContacts = createSelector(
  getPendingContacts,
  contacts => contacts.length
);

export const getNotInGroupContacts = createSelector(
  (state: RootState) => state.profile.contacts,
  getGroupChatProps,
  (contacts, groupChat) => {
    const groupMembers = groupChat?.ref.members.map(member => member._id) || [];
    return contacts.filter(
      contact =>
        contact.status === 'accepted' && !groupMembers.includes(contact.ref._id)
    );
  }
);

export const getGroupRefs = createSelector(
  (state: RootState) => state.profile.groups,
  groups => groups.map(group => group.ref)
);
