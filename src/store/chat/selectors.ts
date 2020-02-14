import { createSelector } from 'reselect';

import { RootState } from '@store/types';

const getActiveChat = (state: RootState): string => state.chat.activeChat;

/**
 * Get current active chat contact props.
 */
export const getSingleChatProps = createSelector(
  getActiveChat,
  state => state.profile.contacts,
  (activeChat, contacts) =>
    activeChat ? contacts.find(contact => contact.ref._id === activeChat) : null
);

/**
 * Get current active chat groups props.
 */
export const getGroupChatProps = createSelector(
  getActiveChat,
  state => state.profile.groups,
  (activeChat, groups) => {
    return activeChat
      ? groups.find(group => group.ref._id === activeChat)
      : null;
  }
);

/**
 * Try to get active conversation object from cache.
 */
export const getCachedConversation = createSelector(
  (state: RootState) => state.chat.cache,
  state => state.chat.activeConversation,
  (cache, activeId) => cache.find(conv => conv._id === activeId)
);
