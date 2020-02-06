import React from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../lib';
import { showNotification } from '@store/view/actions';
import { NotificationMessage } from '@store/view/types';

const m: Record<NotificationMessage, string> = {
  'no-success': 'Operation failed!',
  'no-auth': "We couldn't verify your identity, please login again.",
  network:
    'Network error! Check if you are connected to the Internet, or try again later.',
  unknown: 'Something went wrong...',
  success: 'Operation was completed successfully!',
  none: ''
};

/**
 * Window notification controlled by the redux
 * state. Can only display pre-defined messages.
 */
const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const message = useTypedSelector(state => state.view.notification);

  if (message === 'none') {
    return null;
  } else {
    const className = `notification is-marginless is-${
      message === 'success' ? 'success' : 'danger'
    }`;
    return (
      <div className={className}>
        <button
          className="delete"
          onClick={() => dispatch(showNotification('none'))}
        ></button>
        {m[message]}
      </div>
    );
  }
};

export { Notification };
