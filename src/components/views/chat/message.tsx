import React, { useState } from 'react';

import { MessageStatus } from '@api/chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const m = {
  deleted: 'Message was deleted.',
  deleteMessage: 'Delete message'
};

interface MessageProps {
  _id: string;
  author: string;
  avatar: string;
  content: string;
  date: Date;
  isOwn: boolean;
  status: MessageStatus;
  deleteHandler: (id: string) => void;
}

const Message: React.FC<MessageProps> = ({
  _id,
  author,
  avatar,
  content,
  date,
  isOwn,
  status,
  deleteHandler
}) => {
  // Show/hide the dropdown menu
  const [isActive, setActive] = useState(false);

  const isDeleted = status === 'deleted';
  const icon =
    status === 'sent'
      ? 'paper-plane'
      : status === 'received'
      ? 'envelope'
      : status === 'seen'
      ? 'envelope-open'
      : 'trash';

  function hideDropdown(): void {
    setActive(false);
  }
  function toggleDropdown(): void {
    setActive(!isActive);
  }
  function callDelete(): void {
    if (!isDeleted) {
      deleteHandler(_id);
    }
    setActive(false);
  }

  return (
    <article className="media">
      <figure className="media-left">
        {isOwn ? null : (
          <span className="image is-32x32">
            <img src={avatar} alt="img" />
          </span>
        )}
      </figure>
      <div className="media-content">
        <div className={'content' + (isOwn ? ' has-text-right' : '')}>
          <strong>{author}</strong>
          <small className="is-size-7">
            {' ' + new Date(date).toLocaleString()}
          </small>
          {isDeleted ? (
            <p className="has-text-grey-light is-italic">{m.deleted}</p>
          ) : (
            <p className="is-wrap">{content}</p>
          )}
        </div>
      </div>
      <div className="media-right">
        {!isOwn ? null : isDeleted ? (
          <span className="icon is-small has-text-grey-light">
            <FontAwesomeIcon icon={icon} />
          </span>
        ) : (
          <div
            className={
              'dropdown is-right is-up' + (isActive ? ' is-active' : '')
            }
            onMouseLeave={hideDropdown}
          >
            <figure className="dropdown-trigger">
              <a
                className="icon is-small has-text-dark"
                onClick={toggleDropdown}
              >
                <FontAwesomeIcon icon={icon} />
              </a>
            </figure>
            <div className="dropdown-menu">
              <div className="dropdown-content">
                <a
                  className="dropdown-item has-text-danger"
                  onClick={callDelete}
                >
                  {m.deleteMessage}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export { Message };
