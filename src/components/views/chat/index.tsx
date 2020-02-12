import React from 'react';

import { useTypedSelector } from '../../lib';
import { ChatHeader } from './header';
import { ChatFooter } from './footer';
import { Message } from './message';

const Chat: React.FC = () => {
  const isGroup = useTypedSelector(state => state.chat.isGroupChat);

  function sendMessage(message: string): void {
    console.log(message);
  }

  return (
    <div className="column has-background-white-bis is-flex-column">
      <ChatHeader isGroup={isGroup} />
      <section className="section chat-body is-scroll"></section>
      <ChatFooter sendHandler={sendMessage} />
    </div>
  );
};

export { Chat };
