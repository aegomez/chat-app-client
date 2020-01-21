import { combineReducers } from 'redux';
import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import { authReducer } from './auth/reducers';
import { routingReducer } from './routing/reducers';
import { profileReducer } from './profile/reducers';

import { watchAuthSagas } from './auth/sagas';
import { watchProfileSagas } from './profile/sagas';

export const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  routing: routingReducer
});

export function* rootSaga(): SagaIterator<void> {
  yield all([fork(watchAuthSagas), fork(watchProfileSagas)]);
}
