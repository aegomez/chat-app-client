import { combineReducers } from 'redux';
import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import { authReducer } from './auth/reducer';
import { chatReducer } from './chat/reducer';
import { profileReducer } from './profile/reducer';
import { viewReducer } from './view/reducer';

import { watchAuthSagas } from './auth/sagas';
import { watchProfileSagas } from './profile/sagas';
import { watchChatSagas } from './chat/sagas';

export const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  profile: profileReducer,
  view: viewReducer
});

export function* rootSaga(): SagaIterator<void> {
  yield all([
    fork(watchAuthSagas),
    fork(watchChatSagas),
    fork(watchProfileSagas)
  ]);
}
