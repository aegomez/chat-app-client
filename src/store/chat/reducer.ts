import { createReducer } from 'typesafe-actions';

import { setActiveChat } from './actions';

const initialState = {
  // id of the contact/group
  activeChat: '',
  // id of the conversation
  activeConversation: '',
  isGroupChat: false
};

export const chatReducer = createReducer(initialState).handleAction(
  setActiveChat,
  (state, action) => {
    const { chatId, conversationId, isGroupChat } = action.payload;
    return {
      ...state,
      activeChat: chatId,
      activeConversation: conversationId,
      isGroupChat
    };
  }
);
