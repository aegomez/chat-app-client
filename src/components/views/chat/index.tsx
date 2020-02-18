import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTypedSelector } from '../../lib';
import { ChatBody, GroupChatBody } from './body';
import { ChatFooter } from './footer';
import { Toast } from '../../notifications';
import { Welcome } from './welcome';

import { getConversation, createMessage } from '@store/chat/actions';
import { getCachedConversation } from '@store/chat/selectors';

const Chat: React.FC = () => {
  const ownId = useTypedSelector(state => state.profile._id);
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
    dispatch(
      createMessage({
        content: message,
        conversationId: activeConversation
      })
    );
  }

  return (
    <div className="column has-background-white-bis is-flex-column">
      {conversation ? (
        <>
          <Toast />
          {isGroup ? (
            <GroupChatBody conversation={conversation} ownId={ownId} />
          ) : (
            <ChatBody conversation={conversation} ownId={ownId} />
          )}
          <ChatFooter sendHandler={sendMessage} />
        </>
      ) : (
        <Welcome />
      )}
    </div>
  );
};

export { Chat };
