import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// import { Chat } from './chat';
import { Sidebar } from './sidebar';
import {
  LoadingProfile,
  Settings,
  AddContact,
  CreateGroup,
  Invitations,
  Logout
} from '../modals';
import { getProfile } from '@store/profile/actions';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(function() {
    console.log('getProfile was called!');
    dispatch(getProfile.request());
  });
  return (
    <section className="columns is-mobile is-fullheight is-marginless">
      <LoadingProfile />
      <Sidebar />
      {/* <Chat /> */}
      <Settings />
      <AddContact />
      <CreateGroup />
      <Invitations />
      <Logout />
    </section>
  );
};

export { Dashboard };
