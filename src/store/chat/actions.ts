import { createAction, ActionType } from 'typesafe-actions';

import {
  ActiveChatArgs,
  Conversation,
  ConversationArgs,
  NewMessageArgs,
  NewMessageRes,
  UpdateMessageArgs,
  UserProps
} from '@api/chat';

// Standard action creators

export const setActiveChat = createAction('chat/setActive')<ActiveChatArgs>();

// Connect and disconnect from Socket
export const socketConnect = createAction('chat/connect')<undefined>();
export const socketDisconnect = createAction('chat/disconnect')<undefined>();

// Socket action creators

// Events emitted by the client

export const getConversation = createAction('chat/getConversation')<string>();
export const createMessage = createAction('chat/createMessage')<
  NewMessageArgs
>();
export const updateMessage = createAction('chat/updateMessage')<
  UpdateMessageArgs
>();
export const updateConversation = createAction('chat/updateConversation')<
  ConversationArgs
>();

// Events received from the server

// Responses to own requests, notifications
// about other users' actions.
export const conversationFetched = createAction('chat/conversationFetched')<
  Conversation
>();
export const conversationUpdated = createAction('chat/conversationUpdated')<
  ConversationArgs
>();

export const messageCreated = createAction('chat/messageCreated')<
  NewMessageRes
>();
export const messageUpdated = createAction('chat/messageUpdated')<
  UpdateMessageArgs
>();

export const userConnected = createAction('chat/userConnected')<UserProps>();

// All actions that can be emitted
// by the EventChannel.
export type ChannelActions = ActionType<
  | typeof updateMessage
  | typeof conversationFetched
  | typeof conversationUpdated
  | typeof messageCreated
  | typeof messageUpdated
  | typeof userConnected
>;
