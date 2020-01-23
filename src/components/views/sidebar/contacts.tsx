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
  eventHandler: (chatId: string, conversationId: string) => void;
}

const Contact: React.FC<ContactProps> = ({
  name,
  avatar,
  chatId,
  connected,
  conversationId,
  isActive,
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
            <img src={avatar} alt="User avatar" />
          </span>
        </figure>
        <span className="media-content">{name}</span>
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
        if (filter && filter !== ref.publicName) {
          return null;
        }
        return (
          <Contact
            avatar={ref.avatar}
            chatId={ref._id}
            connected={ref.connected}
            name={ref.publicName}
            conversationId={conversation}
            eventHandler={setActive}
            isActive={ref._id === activeChat}
            key={key}
          />
        );
      })}
    </ul>
  );
};

export { ContactList };
