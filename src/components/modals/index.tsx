import React from 'react';

import { useTypedSelector } from '../lib';
import { AddContact } from './addContact';
import { CreateGroup } from './createGroup';
import { Invitations } from './invitations';
import { LoadingProfile } from './loadingProfile';
import { Logout } from './logout';
import { Settings } from './settings';

const ModalManager: React.FC = () => {
  const visibleModal = useTypedSelector(state => state.view.modal);

  switch (visibleModal) {
    case 'addContact':
      return <AddContact />;
    case 'createGroup':
      return <CreateGroup />;
    case 'invitations':
      return <Invitations />;
    case 'loadingProfile':
      return <LoadingProfile />;
    case 'logout':
      return <Logout />;
    case 'settings':
      return <Settings />;
    case 'none':
    default:
      return null;
  }
};

export { ModalManager };
