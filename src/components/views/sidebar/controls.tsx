import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* TBD i18n */
const m = {
  addContact: 'Add new contact',
  addGroup: 'Create group'
};

const Controls: React.FC = () => {
  return (
    <ul className="menu-list">
      <li>
        <a className="media">
          <span className="icon media-left">
            <FontAwesomeIcon icon="plus" fixedWidth={true} />
          </span>
          <span className="media-content">{m.addContact}</span>
        </a>
      </li>
      <li>
        <a className="media">
          <span className="icon media-left">
            <FontAwesomeIcon icon="users" fixedWidth={true} />
          </span>
          <span className="media-content">{m.addGroup}</span>
        </a>
      </li>
    </ul>
  );
};

export { Controls };
