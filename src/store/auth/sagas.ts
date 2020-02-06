import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { call } from 'typed-redux-saga';

import {
  loginUser,
  logoutUser,
  registerUser,
  showAuthSuccess,
  updatePassword,
  failPassword
} from './actions';
import { setRedirectToLogin } from '../view/actions';
import { handleErrorSaga, NOT_AUTHORIZED } from '../errorHandler';

import * as authApi from '@api/auth';
import { updateUserConnected } from '@api/user';
import { setLoggedInFlag, clearLoggedInFlag } from '@api/browser/storage';

function* registerUserSaga(
  action: ReturnType<typeof registerUser.request>
): SagaIterator<void> {
  try {
    const response = yield* call(authApi.register, action.payload);
    const data = response.register;
    if (data.success) {
      yield put(registerUser.success());
      yield delay(2000);
      yield all([put(showAuthSuccess(false)), put(setRedirectToLogin(true))]);
    } else {
      yield put(registerUser.failure(data.errors));
    }
  } catch (error) {
    yield* call(handleErrorSaga, error);
  }
}

function* loginUserSaga(
  action: ReturnType<typeof loginUser.request>
): SagaIterator<void> {
  try {
    const response = yield* call(authApi.login, action.payload);
    const data = response.login;
    if (data.success) {
      yield all([put(loginUser.success()), fork(setLoggedInFlag)]);
    } else {
      yield put(loginUser.failure(data.errors));
    }
  } catch (error) {
    yield* call(handleErrorSaga, error);
  }
}

function* logoutUserSaga(): SagaIterator<void> {
  try {
    const response = yield* call(updateUserConnected, false);
    const data = response.updateUserConnected;
    if (data) {
      yield all([put(logoutUser.success()), fork(clearLoggedInFlag)]);
    } else {
      yield put(logoutUser.failure());
    }
  } catch (error) {
    yield* call(handleErrorSaga, error);
  }
}

function* updatePasswordSaga(
  action: ReturnType<typeof updatePassword>
): SagaIterator<void> {
  try {
    const response = yield* call(authApi.updatePassword, action.payload);
    const { success, error } = response.updatePassword;
    if (success) {
      // Show success notification
      yield put(showAuthSuccess(true));
      yield delay(2500);
      yield put(showAuthSuccess(false));
    } else if (error === NOT_AUTHORIZED || typeof error !== 'string') {
      // Token is not-valid or request error.
      throw Error('' + error);
    } else {
      // Wrong password, not-valid newPassword,
      // or passwords are the same.
      yield put(failPassword(error));
    }
  } catch (error) {
    // Network/request error
    yield* call(handleErrorSaga, error);
  }
}

export function* watchAuthSagas(): SagaIterator<void> {
  yield takeLatest(loginUser.request, loginUserSaga);
  yield takeLatest(logoutUser.request, logoutUserSaga);
  yield takeLatest(registerUser.request, registerUserSaga);
  yield takeLatest(updatePassword, updatePasswordSaga);
}
