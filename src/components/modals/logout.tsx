import React from 'react';
import { useDispatch } from 'react-redux';

import { logoutUser } from '@store/auth/actions';
import { showModal } from '@store/view/actions';
import { Modal } from './modal';

const m = {
  title: 'Logout',
  message: 'Are you sure you want to log out?'
};

const Logout: React.FC = () => {
  // Redux state
  const dispatch = useDispatch();

  // Dispatch actions on button press
  function handleCancel(): void {
    dispatch(showModal('none'));
  }
  function handleConfirm(): void {
    dispatch(logoutUser.request());
  }

  return (
    <Modal
      closeHandler={handleCancel}
      confirmHandler={handleConfirm}
      title={m.title}
      subtitle={m.message}
    />
  );
};

export { Logout };
