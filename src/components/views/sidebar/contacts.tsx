import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import { useTypedSelector } from '../../lib';
import { setActiveChat } from '@store/chat/actions';
import { getAcceptedContacts } from '@store/profile/selectors';

interface ContactProps {
  name: string;
  avatar: string;
  chatId: string;
  connected: boolean;
  conversationId: string;
  isActive: boolean;
  unread?: number;
  eventHandler: (chatId: string, conversationId: string) => void;
}

const Contact: React.FC<ContactProps> = ({
  name,
  avatar,
  chatId,
  connected,
  conversationId,
  isActive,
  unread,
  eventHandler
}) => {
  function handleClick(event: React.MouseEvent): void {
    event.preventDefault();
    eventHandler(chatId, conversationId);
  }

  return (
    <li>
      <a
        className={'media' + (isActive ? ' is-active' : '')}
        onClick={handleClick}
      >
        <figure className="media-left">
          <span className="image is-24x24">
            <img src={avatar} title="User avatar" />
          </span>
        </figure>
        <span className="media-content">
          {name}
          {unread ? (
            <small className="has-text-weight-bold">
              {` [${unread > 99 ? '99+' : unread}]`}
            </small>
          ) : null}
        </span>
        {connected ? (
          <span className="media-right icon is-small has-text-success">
            <FontAwesomeIcon icon="circle" />
          </span>
        ) : null}
      </a>
    </li>
  );
};

interface ListProps {
  filter: string;
}

const ContactList: React.FC<ListProps> = ({ filter }) => {
  const contacts = useSelector(getAcceptedContacts);
  const cache = useTypedSelector(state => state.chat.cache);
  const activeChat = useTypedSelector(state => state.chat.activeChat);
  const dispatch = useDispatch();

  function setActive(chatId: string, conversationId: string): void {
    dispatch(setActiveChat({ chatId, conversationId, isGroupChat: false }));
  }

  return (
    <ul>
      {contacts.map((contact, key) => {
        const { ref, conversation } = contact;
        // Filter by name
        const isMatch = ref.publicName
          .toLowerCase()
          .includes(filter.toLowerCase());
        // Look for unread messages
        const unreadMessages = cache.find(conv => conv._id === conversation)
          ?.unread;
        console.log(cache);
        console.log(unreadMessages);

        return isMatch ? (
          <Contact
            avatar={ref.avatar}
            chatId={ref._id}
            connected={ref.connected}
            name={ref.publicName}
            conversationId={conversation}
            unread={unreadMessages}
            eventHandler={setActive}
            isActive={ref._id === activeChat}
            key={key}
          />
        ) : null;
      })}
    </ul>
  );
};

export { ContactList };
