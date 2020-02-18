import React from 'react';

import { MessageStatus } from '@api/chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const m = {
  deleted: 'Message was deleted.'
};

interface MessageProps {
  content: string;
  date: Date;
  status: MessageStatus;
  own: boolean;
}

interface GroupMessageProps extends MessageProps {
  author: string;
  avatar: string;
}

const Message: React.FC<MessageProps> = ({ content, date, status, own }) => {
  const icon =
    status === 'sent'
      ? 'paper-plane'
      : status === 'received'
      ? 'envelope'
      : status === 'seen'
      ? 'envelope-open'
      : 'trash';
  return (
    <article className="media">
      <div className="media-content">
        <div className={'content' + (own ? ' has-text-right' : '')}>
          <small className="is-size-7">{new Date(date).toLocaleString()}</small>
          {status === 'deleted' ? (
            <p className="has-text-light is-italic">{m.deleted}</p>
          ) : (
            <p>{content}</p>
          )}
        </div>
      </div>
      {own ? (
        <figure className="media-right">
          <span className="icon is-small has-text-dark">
            <FontAwesomeIcon icon={icon} />
          </span>
        </figure>
      ) : null}
    </article>
  );
};

const GroupMessage: React.FC<GroupMessageProps> = ({
  author,
  avatar,
  content,
  date,
  own,
  status
}) => (
  <article className="media">
    {own ? null : (
      <figure className="media-left">
        <span className="image is-32x32">
          <img src={avatar} alt="img" />
        </span>
      </figure>
    )}
    <div className="media-content">
      <div className={'content' + (own ? ' has-text-right' : '')}>
        <strong>{author}</strong>
        <small className="is-size-7">
          {' ' + new Date(date).toLocaleString()}
        </small>
        {status === 'deleted' ? (
          <p className="has-text-light is-italic">{m.deleted}</p>
        ) : (
          <p>{content}</p>
        )}
      </div>
    </div>
  </article>
);

export { Message, GroupMessage };
