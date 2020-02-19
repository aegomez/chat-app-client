import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ChatHeader } from './header';
import { Message } from './message';

import { Conversation } from '@api/chat';
import { getSingleChatProps, getGroupChatProps } from '@store/chat/selectors';
import { updateConversation } from '@store/chat/actions';
import { showModal } from '@store/view/actions';

const m = {
  members: 'Members...'
};

interface BodyProps {
  conversation: Conversation;
  deleteHandler: (id: string) => void;
  ownId: string;
}

const ChatBody: React.FC<BodyProps> = ({
  conversation,
  deleteHandler,
  ownId
}) => {
  // Store state
  const chatProps = useSelector(getSingleChatProps);
  const dispatch = useDispatch();

  // Active chat is undefined or can't be found
  if (!chatProps) {
    return null;
  }

  // Setup variables
  const { _id, avatar, connected, publicName, userName } = chatProps.ref;
  const headerProps = {
    avatar,
    title: publicName,
    subtitle: userName
  };
  const messages = conversation.messages;

  // If last message is not own:
  // mark all messages in conv as seen.
  const unseen = messages[messages.length - 1]._id !== ownId;

  if (unseen) {
    dispatch(
      updateConversation({
        conversationId: conversation._id,
        targetId: _id,
        newStatus: 'seen'
      })
    );
  }

  return (
    <>
      <ChatHeader {...headerProps}>
        {connected ? (
          <div className="level-item is-hidden-mobile">
            <span className="icon is-small has-text-success">
              <FontAwesomeIcon icon="circle" />
            </span>
          </div>
        ) : null}
      </ChatHeader>

      <section className="section chat-body is-scroll">
        {messages.map((message, key) => {
          const { author, ...rest } = message;
          const isOwn = ownId === author;
          const props = {
            ...rest,
            avatar,
            isOwn,
            author: isOwn ? '' : publicName,
            deleteHandler
          };
          return <Message {...props} key={key} />;
        })}
      </section>
    </>
  );
};

const GroupChatBody: React.FC<BodyProps> = ({
  conversation,
  deleteHandler,
  ownId
}) => {
  // Store state
  const chatProps = useSelector(getGroupChatProps);
  const dispatch = useDispatch();

  // Active chat is undefined or can't be found
  if (!chatProps) {
    return null;
  }

  // Setup variables
  const { avatar, members, name } = chatProps.ref;
  const headerProps = {
    avatar,
    title: name,
    subtitle: `[${members.length}]`
  };
  const messages = conversation.messages;

  // Map the members to an obj, to avoid
  // searching the array multiple times.
  const membersMap = members.reduce((res, obj) => {
    res[obj._id] = {
      avatar: obj.avatar,
      author: obj.publicName
    };
    return res;
  }, {} as { [key: string]: { avatar: string; author: string } });

  // Event handlers

  function showMembers(): void {
    dispatch(showModal('groupMembers'));
  }

  return (
    <>
      <ChatHeader {...headerProps}>
        <div className="level-item">
          <button className="button is-link" onClick={showMembers}>
            {m.members}
          </button>
        </div>
      </ChatHeader>

      <section className="section chat-body is-scroll">
        {messages.map((message, key) => {
          const { author, ...rest } = message;
          const props = {
            ...rest,
            ...membersMap[author],
            isOwn: ownId === author,
            deleteHandler
          };
          return <Message {...props} key={key} />;
        })}
      </section>
    </>
  );
};

export { ChatBody, GroupChatBody };
