import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Chat } from './chat';
import { Sidebar } from './sidebar';
import { ModalManager } from '../modals';
import { getProfile } from '@store/profile/actions';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(function() {
    console.log('getProfile was called!');
    dispatch(getProfile.request());
  });
  return (
    <main className="columns is-mobile is-fullheight is-marginless">
      <Sidebar />
      <Chat />
      <ModalManager />
    </main>
  );
};

export { Dashboard };
