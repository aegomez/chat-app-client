import { createReducer } from 'typesafe-actions';
import clone from 'rfdc';

import {
  setActiveChat,
  conversationFetched,
  conversationUpdated,
  messageCreated,
  messageUpdated
} from './actions';
import { logoutUser } from '../auth/actions';
import { leaveGroup } from '../profile/actions';
import { Conversation } from '@api/chat';

const initialState = {
  // id of the contact/group
  activeChat: '',
  // id of the conversation
  activeConversation: '',
  isGroupChat: false,
  // conversations cache
  cache: [] as Conversation[]
};

export const chatReducer = createReducer(initialState)
  .handleAction(setActiveChat, (state, action) => {
    const { chatId, conversationId, isGroupChat } = action.payload;
    return {
      ...state,
      activeChat: chatId,
      activeConversation: conversationId,
      isGroupChat
    };
  })

  // Handle socket events

  // Add a conversation to the cache
  .handleAction(conversationFetched, (state, action) => ({
    ...state,
    cache: [...state.cache, action.payload]
  }))

  // A new message was succesfully created.
  .handleAction(messageCreated, (state, action) => {
    const { conversationId, message, itsOwn } = action.payload;

    // Find conversation
    const index = state.cache.findIndex(obj => obj._id === conversationId);
    if (index < 0) {
      return state;
    }

    // Add message to conversation
    const cache = clone()(state.cache);
    cache[index].messages.push(message);

    // If the message is not own and chat
    // is not active, mark as unread.
    if (!itsOwn && state.activeConversation !== conversationId) {
      cache[index].unread = (cache[index].unread || 0) + 1;
    }

    return { ...state, cache };
  })

  // A message was successfully updated:
  // deleted or received/seen.
  .handleAction(messageUpdated, (state, action) => {
    const { conversationId, messageId, newStatus } = action.payload;

    // Find the conversation
    const conversationIndex = state.cache.findIndex(
      obj => obj._id === conversationId
    );
    if (conversationIndex < 0) {
      return state;
    }

    // Find the message
    const conversation = state.cache[conversationIndex];
    const messageIndex = conversation.messages.findIndex(
      obj => obj._id === messageId
    );
    if (messageIndex < 0) {
      return state;
    }

    const cache = clone()(state.cache);
    const message = cache[conversationIndex].messages[messageIndex];

    // Update the message
    message.status = newStatus;
    if (newStatus === 'deleted') {
      message.content = '';
    }

    return { ...state, cache };
  })

  // Mark all messages in a conversation as seen
  .handleAction(conversationUpdated, (state, action) => {
    const { conversationId, newStatus } = action.payload;

    // Find the conversation
    const index = state.cache.findIndex(obj => obj._id === conversationId);
    if (index < 0) {
      return state;
    }

    // Update messages in conversation
    const cache = clone()(state.cache);
    for (const message of cache[index].messages) {
      // Deleted status cannot be undone
      if (message.status !== 'deleted') {
        message.status = newStatus;
        if (newStatus === 'deleted') {
          message.content = '';
        }
      }
    }

    return { ...state, cache };
  })

  // Reset the chat view after logout or
  // leaving the active group
  .handleAction([logoutUser.success, leaveGroup.success], () => initialState);
