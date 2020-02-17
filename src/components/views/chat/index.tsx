import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTypedSelector } from '../../lib';
import { ChatHeader } from './header';
import { ChatFooter } from './footer';
import { Message } from './message';
import { Toast } from '../../notifications';

import { getConversation } from '@store/chat/actions';
import { getCachedConversation } from '@store/chat/selectors';

const Chat: React.FC = () => {
  const isGroup = useTypedSelector(state => state.chat.isGroupChat);
  const activeConversation = useTypedSelector(
    state => state.chat.activeConversation
  );
  const conversation = useSelector(getCachedConversation);
  const dispatch = useDispatch();

  if (activeConversation && !conversation) {
    dispatch(getConversation(activeConversation));
  }

  function sendMessage(message: string): void {
    console.log(message);
  }

  return (
    <div className="column has-background-white-bis is-flex-column">
      <Toast />
      <ChatHeader isGroup={isGroup} />
      <section className="section chat-body is-scroll"></section>
      <ChatFooter sendHandler={sendMessage} />
    </div>
  );
};

export { Chat };
