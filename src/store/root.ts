import { combineReducers } from 'redux';
import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import { authReducer } from './auth/reducers';
import { routingReducer } from './routing/reducers';

import { watchAuthSagas } from './auth/sagas';

export const rootReducer = combineReducers({
  auth: authReducer,
  routing: routingReducer
});

export function* rootSaga(): SagaIterator<void> {
  yield all([fork(watchAuthSagas)]);
}
