export interface ActiveChatArgs {
  chatId: string;
  conversationId: string;
  isGroupChat: boolean;
}

// DB models

export type MessageStatus = 'sent' | 'received' | 'seen' | 'deleted';

export interface Message {
  _id: string;
  author: string;
  content: string;
  date: Date;
  status: MessageStatus;
}

export interface Conversation {
  _id: string;
  lastUpdate: Date;
  messages: Message[];
}

// Socket events properties

// Client-side requests
export interface ConversationArgs {
  conversationId: string;
  targetId: string;
  newStatus: MessageStatus;
}
export interface NewMessageArgs {
  conversationId: string;
  targetId: string;
  content: string;
}
export interface UpdateMessageArgs extends ConversationArgs {
  messageId: string;
}

// Server-side responses
export interface NewMessageRes {
  conversationId: string;
  message: Message;
  itsOwn: boolean;
}

export interface NewConnection {
  userId: string;
  userName: string;
  connected: boolean;
}
