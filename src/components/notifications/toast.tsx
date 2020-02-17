import React from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../lib';
import { showToast } from '@store/view/actions';

const m = {
  connected: ' has connected.',
  disconnected: ' has disconnected.'
};

const Toast: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useTypedSelector(state => state.view.toast);

  const connected = toast?.connected || '';
  const userName = toast?.userName || '';

  return (
    <div className={'notification toast is-dark ' + (toast ? '' : 'is-hidden')}>
      <button
        className="delete"
        onClick={() => dispatch(showToast(null))}
      ></button>
      <strong>{userName}</strong>
      {connected ? m.connected : m.disconnected}
    </div>
  );
};

export { Toast };
