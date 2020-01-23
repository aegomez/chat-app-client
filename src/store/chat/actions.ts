import { createAction } from 'typesafe-actions';

import { ActiveChatArgs } from './types';

// Standard action creators

export const setActiveChat = createAction('chat/setActive')<ActiveChatArgs>();
