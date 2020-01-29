import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { call } from 'typed-redux-saga';

import {
  loginUser,
  logoutUser,
  registerUser,
  showRegisterSuccess
} from './actions';
import { setRedirectToLogin } from '@store/view/actions';
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
      yield all([
        put(showRegisterSuccess(false)),
        put(setRedirectToLogin(true))
      ]);
    } else {
      yield put(registerUser.failure(data.errors));
    }
  } catch (error) {
    console.error('>>> loginUserSaga : fatalError', error);
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
    console.error('>>> loginUserSaga : fatalError', error);
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
    console.error('>>> logoutUserSaga : fatalError', error);
  }
}

export function* watchAuthSagas(): SagaIterator<void> {
  // while (true) {
  yield takeLatest(loginUser.request, loginUserSaga);
  yield takeLatest(logoutUser.request, logoutUserSaga);
  yield takeLatest(registerUser.request, registerUserSaga);
  // }
}
