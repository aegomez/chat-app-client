import { createReducer } from 'typesafe-actions';

import { setActiveChat } from './actions';
import { logoutUser } from '../auth/actions';
import { leaveGroup } from '../profile/actions';

const initialState = {
  // id of the contact/group
  activeChat: '',
  // id of the conversation
  activeConversation: '',
  isGroupChat: false
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
  // Reset the chat view after logout or
  // leaving the active group
  .handleAction([logoutUser.success, leaveGroup.success], () => initialState);
