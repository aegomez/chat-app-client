import { put, delay, all, call, fork } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { logoutUser } from './auth/actions';
import { showNotification, setRedirectToLogin } from './view/actions';
import { NotificationMessage } from './view/types';
import { clearLoggedInFlag } from '@api/browser/storage';

// Constants
export const NO_SUCCESS = 'NO_SUCCESS';
export const NOT_AUTHORIZED = 'NOT_AUTHORIZED';

/**
 * Show error to user for 3 seconds, then hide it.
 * @param message The type of error message to display
 */
function* failRequestSaga(message: NotificationMessage): SagaIterator {
  yield put(showNotification(message));
  yield delay(3000);
  yield put(showNotification('none'));
}

// General error handler
export function* handleErrorSaga(error: Error): SagaIterator {
  if (error.message === NO_SUCCESS) {
    // Request was successful, but operation failed
    // due to a problem with the data or the database.
    console.error('NO_SUCCESS_ERROR');
    yield call(failRequestSaga, 'no-success');
  } else if (error.message === NOT_AUTHORIZED) {
    // The cookie is not valid.
    console.error('NO_AUTH_ERROR: ', error.message);
    yield call(failRequestSaga, 'no-auth');
    yield all([
      // Start a logout action
      put(logoutUser.success()),
      // Clear local storage flag
      fork(clearLoggedInFlag),
      // Redirect to /login
      put(setRedirectToLogin(true))
    ]);
  } else {
    // There was a different error (network, server, etc.)
    console.error('REQUEST_ERROR');
    // Show error to user for 3 seconds, then hide it.
    yield call(failRequestSaga, 'network');
  }
}
