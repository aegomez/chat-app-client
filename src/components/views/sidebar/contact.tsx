import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ContactProps {
  name: string;
  avatar: string;
  isActiveConversation: boolean;
  isOnline: boolean;
}

const Contact: React.FC<ContactProps> = ({
  name,
  avatar,
  isActiveConversation,
  isOnline
}) => {
  return (
    <li>
      <a className={'media' + (isActiveConversation ? ' is-active' : '')}>
        <figure className="media-left">
          <span className="image is-24x24">
            <img src={avatar} alt="User avatar" />
          </span>
        </figure>
        <span className="media-content">{name}</span>
        {isOnline ? (
          <span className="media-right icon is-small has-text-success">
            <FontAwesomeIcon icon="circle" />
          </span>
        ) : null}
      </a>
    </li>
  );
};

export { Contact };
