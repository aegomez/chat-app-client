import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getSingleChatProps, getGroupChatProps } from '@store/chat/selectors';
import { showModal } from '@store/view/actions';

const m = {
  members: 'Members...'
};

const SingleHeader: React.FC = () => {
  // Store state
  const chatProps = useSelector(getSingleChatProps);
  if (!chatProps) {
    return null;
  }

  const { avatar, connected, publicName, userName } = chatProps.ref;

  return (
    <header className="level is-marginless">
      <div className="level-left">
        <div className="level-item">
          <figure className="image is-48x48">
            <img src={avatar} alt="Avatar" />
          </figure>
        </div>
        <div className="level-item">
          <span className="title">{publicName}</span>
        </div>
        <div className="level-item is-hidden-mobile">
          <span className="subtitle is-italic">{userName}</span>
        </div>
        {connected ? (
          <div className="level-item is-hidden-mobile">
            <span className="icon is-small has-text-success">
              <FontAwesomeIcon icon="circle" />
            </span>
          </div>
        ) : null}
      </div>
    </header>
  );
};

const GroupHeader: React.FC = () => {
  // Store state
  const chatProps = useSelector(getGroupChatProps);
  const dispatch = useDispatch();

  // Active chat is undefined or can't be found
  if (!chatProps) {
    return null;
  }

  const { avatar, members, name } = chatProps.ref;
  const numberOfMembers = members.length;

  function showMembers(): void {
    dispatch(showModal('groupMembers'));
  }

  return (
    <header className="level is-marginless">
      <div className="level-left">
        <div className="level-item">
          <figure className="image is-48x48">
            <img src={avatar} alt="Avatar" />
          </figure>
        </div>
        <div className="level-item">
          <span className="title">{name}</span>
        </div>
        <div className="level-item">
          <span className="subtitle">{`[${numberOfMembers}]`}</span>
        </div>
        <div className="level-item">
          <button className="button is-link" onClick={showMembers}>
            {m.members}
          </button>
        </div>
      </div>
    </header>
  );
};

interface HeaderProps {
  isGroup: boolean;
}

const ChatHeader: React.FC<HeaderProps> = ({ isGroup }) => {
  return isGroup ? <GroupHeader /> : <SingleHeader />;
};

export { ChatHeader };
