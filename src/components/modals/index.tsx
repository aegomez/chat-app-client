import React from 'react';

import { useTypedSelector } from '../lib';
import { AddContact } from './addContact';
import { AddMembers } from './addMembers';
import { CreateGroup } from './createGroup';
import { GroupMembers } from './groupMembers';
import { Invitations } from './invitations';
import { LoadingProfile } from './loadingProfile';
import { Logout } from './logout';
import { Modal } from './modal';
import { Settings } from './settings';

const ModalManager: React.FC = () => {
  const visibleModal = useTypedSelector(state => state.view.modal);

  switch (visibleModal) {
    case 'addContact':
      return <AddContact />;
    case 'addMembers':
      return <AddMembers />;
    case 'createGroup':
      return <CreateGroup />;
    case 'groupMembers':
      return <GroupMembers />;
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

export { ModalManager, Modal, LoadingProfile };
