import { all, delay, fork, put, retry } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { call, take } from 'typed-redux-saga';

import * as actions from './actions';
import * as api from '@api/user';
import { clearLoggedInFlag } from '@api/browser/storage';
import {
  failOperation,
  failRequest,
  showAvatarSuccess,
  showContactSuccess,
  showGroupSuccess,
  showLoadingProfile
} from '@store/view/actions';
import { logoutUser } from '@store/auth/actions';

// Constants
const NO_SUCCESS = 'NO_SUCCESS';
const NOT_AUTHORIZED = 'NOT_AUTHORIZED';

// General error handler
function* handleErrorSaga(error: Error): SagaIterator {
  console.log('handleErrorSaga was called');
  if (error.message === NO_SUCCESS) {
    // Request was successful, but operation failed
    // due to a problem with the data or the database.
    console.error('NO_SUCCESS_ERROR');
    // Show error to user for 3 seconds, then hide it.
    yield put(failOperation(true));
    yield delay(3000);
    yield put(failOperation(false));
  } else if (error.message === NOT_AUTHORIZED) {
    // The cookie is not valid.
    console.error('NO_AUTH_ERROR: ', error.message);
    yield all([
      // Start a logout action
      put(logoutUser.success()),
      // Clear local storage flag
      fork(clearLoggedInFlag)
    ]);
  } else {
    // There was a different error (network, server, etc.)
    console.error('REQUEST_ERROR');
    // Show error to user for 3 seconds, then hide it.
    yield put(failRequest(true));
    yield delay(3000);
    yield put(failRequest(false));
  }
}

// User Profile

// This saga's flow is slightly different,
// since its required for the app initialization.
function* getProfileSaga(): SagaIterator {
  try {
    // Take the action and show the loading overlay
    // while waiting for a successful response.
    yield* take(actions.getProfile.request);
    yield put(showLoadingProfile(true));
    // Try to fetch the API 3 times, with a 10
    // seconds interval between calls.
    const { getUserProfile, error } = yield retry(3, 10000, api.getUserProfile);

    if (getUserProfile?.success) {
      // If response is ok, set the user profile in the store.
      yield put(actions.getProfile.success(getUserProfile.profile));
    } else {
      throw Error(error || NO_SUCCESS);
    }
  } catch (err) {
    // Pass any error to the handler.
    yield* call(handleErrorSaga, err);
    // After that, dispatch a logout action and clear local storage.
    yield all([put(logoutUser.success()), fork(clearLoggedInFlag)]);
  } finally {
    // Hide the loading overlay
    yield put(showLoadingProfile(false));
  }
}

// Contacts

function* addContactSaga(): SagaIterator {
  const action = yield* take(actions.addContact.request);
  const { addContact, error } = yield* call(api.addContact, action.payload);

  if (addContact?.success) {
    yield all([
      put(actions.addContact.success()),
      put(showContactSuccess(true))
    ]);
  } else {
    throw Error(error || NO_SUCCESS);
  }
}

function* deleteContactSaga(): SagaIterator {
  const { payload } = yield* take(actions.deleteContact.request);
  const { deleteContact, error } = yield* call(api.deleteContact, payload);

  if (deleteContact?.success) {
    yield put(actions.deleteContact.success(payload));
  } else {
    throw Error(error || NO_SUCCESS);
  }
}

function* updateContactSaga(): SagaIterator {
  const { payload } = yield* take(actions.updateContact.request);
  const { updateContact, error } = yield* call(api.updateContact, payload);

  if (updateContact?.success) {
    yield put(actions.updateContact.success(payload));
  } else {
    throw Error(error || NO_SUCCESS);
  }
}

// Groups

function* createGroupSaga(): SagaIterator {
  const action = yield* take(actions.createGroup.request);
  const { createGroup, error } = yield* call(api.createGroup, action.payload);

  if (createGroup?.success) {
    const { _id, conversation } = createGroup;
    yield all([
      put(
        actions.createGroup.success({ _id, conversation, ...action.payload })
      ),
      put(showGroupSuccess(true))
    ]);
  } else {
    throw Error(error || NO_SUCCESS);
  }
}

function* addGroupMemberSaga(): SagaIterator {
  const { payload } = yield* take(actions.addGroupMember.request);
  const { addGroupMember, error } = yield* call(api.addGroupMember, payload);

  if (addGroupMember?.success) {
    yield put(
      actions.addGroupMember.success({
        groupId: payload.groupId,
        ...addGroupMember.newMember
      })
    );
  } else {
    throw Error(error || NO_SUCCESS);
  }
}

function* deleteGroupMemberSaga(): SagaIterator {
  const { payload } = yield* take(actions.deleteGroupMember.request);
  const { deleteGroupMember, error } = yield* call(
    api.deleteGroupMember,
    payload
  );

  if (deleteGroupMember?.success) {
    yield put(actions.deleteGroupMember.success(payload));
  } else {
    throw Error(error || NO_SUCCESS);
  }
}

// User Settings

function* updateAvatarSaga(): SagaIterator {
  const { payload } = yield* take(actions.updateAvatar.request);
  const { updateUserAvatar, error } = yield* call(
    api.updateUserAvatar,
    payload
  );

  if (updateUserAvatar?.success) {
    yield all([
      put(actions.updateAvatar.success(payload)),
      put(showAvatarSuccess(true))
    ]);
  } else {
    throw Error(error || NO_SUCCESS);
  }
}

function* updateLanguageSaga(): SagaIterator {
  const { payload } = yield* take(actions.updateLanguage.request);
  const { updateUserLanguage, error } = yield* call(
    api.updateUserLanguage,
    payload
  );

  if (updateUserLanguage?.success) {
    yield put(actions.updateLanguage.success(payload));
  } else {
    throw Error(error || NO_SUCCESS);
  }
}

function* updatePublicNameSaga(): SagaIterator {
  const { payload } = yield* take(actions.updatePublicName.request);
  const { updateUserPublicName, error } = yield* call(
    api.updateUserPublicName,
    payload
  );

  if (updateUserPublicName?.success) {
    yield put(actions.updatePublicName.success(payload));
  } else {
    throw Error(error || NO_SUCCESS);
  }
}

export function* watchProfileSagas(): SagaIterator<void> {
  const sagas = [
    getProfileSaga,
    addContactSaga,
    deleteContactSaga,
    updateContactSaga,
    createGroupSaga,
    addGroupMemberSaga,
    deleteGroupMemberSaga,
    updateAvatarSaga,
    updateLanguageSaga,
    updatePublicNameSaga
  ];

  yield all(
    sagas.map(saga =>
      fork(function*() {
        while (true) {
          try {
            yield* call(saga);
          } catch (error) {
            yield* call(handleErrorSaga, error);
          }
        }
      })
    )
  );
}
