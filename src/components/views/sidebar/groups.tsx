import React from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../lib';
import { setActiveChat } from '@store/chat/actions';
import { getGroupRefs } from '@store/profile/selectors';

interface GroupProps {
  isActive: boolean;
  eventHandler: (chatId: string, conversationId: string) => void;
  name: string;
  chatId: string;
  conversationId: string;
}

const Group: React.FC<GroupProps> = ({
  name,
  chatId,
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
      <a className={isActive ? 'is-active' : ''} onClick={handleClick}>
        {name}
      </a>
    </li>
  );
};

interface ListProps {
  filter: string;
}

const GroupList: React.FC<ListProps> = ({ filter }) => {
  const groups = useTypedSelector(getGroupRefs);
  const activeChat = useTypedSelector(state => state.chat.activeChat);
  const dispatch = useDispatch();

  function setActive(chatId: string, conversationId: string): void {
    dispatch(setActiveChat({ chatId, conversationId, isGroupChat: true }));
  }

  return (
    <ul>
      {groups.map((group, key) => {
        // Filter by name
        if (filter && filter !== group.name) {
          return null;
        }
        return (
          <Group
            name={group.name}
            chatId={group._id}
            conversationId={group.conversation}
            isActive={group._id === activeChat}
            eventHandler={setActive}
            key={key}
          />
        );
      })}
    </ul>
  );
};

export { GroupList };
