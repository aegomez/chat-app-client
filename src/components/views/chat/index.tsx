import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTypedSelector } from '../../lib';
import { ChatBody, GroupChatBody } from './body';
import { ChatFooter } from './footer';
import { Welcome } from './welcome';
import { LoadingProfile, Modal } from '../../modals';
import { Toast } from '../../notifications';

import {
  getConversation,
  createMessage,
  updateMessage
} from '@store/chat/actions';
import { getCachedConversation } from '@store/chat/selectors';

const m = {
  deleteMessage: 'Delete Message',
  confirmDelete: 'Delete this message? (Cannot be undone.)'
};

const Chat: React.FC = () => {
  // Access the store state.
  const ownId = useTypedSelector(state => state.profile._id);
  const isGroup = useTypedSelector(state => state.chat.isGroupChat);
  const activeConversation = useTypedSelector(
    state => state.chat.activeConversation
  );
  const activeChat = useTypedSelector(state => state.chat.activeChat);
  const conversation = useSelector(getCachedConversation);
  const dispatch = useDispatch();

  // Set a message to be confirmed before
  // deletion (shows a modal).
  const [toBeDeletedMessage, setToBeDeletedMessage] = useState('');

  // If there is no active conversation:
  // display the welcome screen.
  if (!activeConversation) {
    return (
      <>
        <Welcome />
        <Toast />
      </>
    );
  }

  // If conversation is not in cache:
  // fetch it from server.
  if (!conversation) {
    dispatch(getConversation(activeConversation));
    return <LoadingProfile />;
  }

  // Event handlers

  function sendMessage(message: string): void {
    dispatch(
      createMessage({
        content: message,
        conversationId: activeConversation,
        targetId: activeChat
      })
    );
  }

  // Confirmation modal event handlers
  function cancelConfirmation(): void {
    setToBeDeletedMessage('');
  }
  function acceptConfirmation(): void {
    dispatch(
      updateMessage({
        conversationId: activeConversation,
        targetId: activeChat,
        messageId: toBeDeletedMessage,
        newStatus: 'deleted'
      })
    );
    setToBeDeletedMessage('');
  }

  const chatBodyProps = {
    conversation,
    ownId,
    deleteHandler: setToBeDeletedMessage
  };

  return (
    <div className="column has-background-white-bis is-flex-column">
      {isGroup ? (
        <GroupChatBody {...chatBodyProps} />
      ) : (
        <ChatBody {...chatBodyProps} />
      )}

      <ChatFooter sendHandler={sendMessage} />
      <Toast />

      {toBeDeletedMessage ? (
        <Modal
          closeHandler={cancelConfirmation}
          confirmHandler={acceptConfirmation}
          subtitle={m.confirmDelete}
          title={m.deleteMessage}
          confirmLabel={m.deleteMessage}
        />
      ) : null}
    </div>
  );
};

export { Chat };
