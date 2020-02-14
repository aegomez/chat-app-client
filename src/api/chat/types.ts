export interface ActiveChatArgs {
  chatId: string;
  conversationId: string;
  isGroupChat: boolean;
}

// DB models

type MessageStatus = 'sent' | 'received' | 'seen' | 'deleted';

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
  // Client-only property, tracks
  // the number of unread messages.
  unread?: number;
}

// Socket events properties

// Client-side requests
export interface ConversationArgs {
  conversationId: string;
  newStatus: MessageStatus;
}
export interface NewMessageArgs {
  conversationId: string;
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

export interface UserProps {
  userId: string;
  userName: string;
  connected: boolean;
}
