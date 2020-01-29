import React from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../lib';
import { logoutUser } from '@store/auth/actions';
import { showLogout } from '@store/view/actions';
import { Modal } from './Modal';

const m = {
  title: 'Logout',
  message: 'Are you sure you want to log out?',
  confirm: 'OK',
  cancel: 'Cancel'
};

const Logout: React.FC = () => {
  // Redux state
  const isVisible = useTypedSelector(state => state.view.logoutVisible);
  const dispatch = useDispatch();

  // Dispatch actions on button press
  function handleCancel(): void {
    dispatch(showLogout(false));
  }
  function handleConfirm(): void {
    dispatch(logoutUser.request());
  }

  return isVisible ? (
    <Modal closeHandler={handleCancel}>
      <div className="box">
        <p className="title">{m.title}</p>
        <p className="subtitle">{m.message}</p>
        <div className="buttons is-right">
          <button className="button is-info" onClick={handleConfirm}>
            {m.confirm}
          </button>
          <button className="button is-danger" onClick={handleCancel}>
            {m.cancel}
          </button>
        </div>
      </div>
    </Modal>
  ) : null;
};

export { Logout };
