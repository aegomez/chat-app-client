import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import {
  showAddContact,
  showCreateGroup,
  showInvitations
} from '@store/view/actions';
import { getNumberOfPendingContacts } from '@store/profile/selectors';

/* TBD i18n */
const m = {
  addContact: 'Add new contact',
  addGroup: 'Create group',
  invitations: 'Contact requests: '
};

const Controls: React.FC = () => {
  const dispatch = useDispatch();
  const pendingContacts = useSelector(getNumberOfPendingContacts);

  function displayAddContact(event: React.MouseEvent): void {
    event.preventDefault();
    dispatch(showAddContact(true));
  }

  function displayCreateGroup(event: React.MouseEvent): void {
    event.preventDefault();
    dispatch(showCreateGroup(true));
  }

  function displayInvitations(event: React.MouseEvent): void {
    event.preventDefault();
    dispatch(showInvitations(true));
  }

  return (
    <ul className="menu-list">
      <li>
        <a className="media" onClick={displayAddContact}>
          <span className="icon media-left">
            <FontAwesomeIcon icon="plus" fixedWidth={true} />
          </span>
          <span className="media-content">{m.addContact}</span>
        </a>
      </li>
      <li>
        <a className="media" onClick={displayCreateGroup}>
          <span className="icon media-left">
            <FontAwesomeIcon icon="users" fixedWidth={true} />
          </span>
          <span className="media-content">{m.addGroup}</span>
        </a>
      </li>
      {pendingContacts ? (
        <li>
          <a className="media" onClick={displayInvitations}>
            <span className="icon media-left has-text-success">
              <FontAwesomeIcon icon="circle" fixedWidth={true} />
            </span>
            <span className="media-content">
              {m.invitations}
              <strong>{pendingContacts}</strong>
            </span>
          </a>
        </li>
      ) : null}
    </ul>
  );
};

export { Controls };
