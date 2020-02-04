import React from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../lib';
import { failOperation, failRequest } from '@store/view/actions';

const m = {
  failedOperation: 'Operation failed!',
  failedRequest:
    'Network error! Check if you are connected to the Internet, or try again later.'
};

const FailedOperation: React.FC = () => {
  const dispatch = useDispatch();
  const isVisible = useTypedSelector(
    state => state.view.failedOperationVisible
  );

  return isVisible ? (
    <div className="notification is-danger is-marginless">
      <button
        className="delete"
        onClick={() => dispatch(failOperation(false))}
      ></button>
      {m.failedOperation}
    </div>
  ) : null;
};

const FailedRequest: React.FC = () => {
  const dispatch = useDispatch();
  const isVisible = useTypedSelector(state => state.view.failedRequestVisible);

  return isVisible ? (
    <div className="notification is-danger is-marginless">
      <button
        className="delete"
        onClick={() => dispatch(failRequest(false))}
      ></button>
      {m.failedRequest}
    </div>
  ) : null;
};

export { FailedOperation, FailedRequest };
