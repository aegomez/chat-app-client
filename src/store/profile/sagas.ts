import { all, fork, put, retry } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { call, take } from 'typed-redux-saga';

import * as actions from './actions';
import { showModal, showSuccess } from '../view/actions';
import { logoutUser } from '../auth/actions';
import { NO_SUCCESS, handleErrorSaga } from '../errorHandler';

import * as api from '@api/user';
import { clearLoggedInFlag } from '@api/browser/storage';

// User Profile

// This saga's flow is slightly different,
// since its required for the app initialization.
function* getProfileSaga(): SagaIterator {
  try {
    // Take the action and show the loading overlay
    // while waiting for a successful response.
    yield* take(actions.getProfile.request);
    yield put(showModal('loadingProfile'));
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
    // After that, dispatch a logout action and force clear local storage.
    yield all([put(logoutUser.success()), fork(clearLoggedInFlag)]);
  } finally {
    // Hide the loading overlay
    yield put(showModal('none'));
  }
}

// Contacts

function* addContactSaga(): SagaIterator {
  const action = yield* take(actions.addContact.request);
  const { addContact, error } = yield* call(api.addContact, action.payload);

  if (addContact?.success) {
    yield all([put(actions.addContact.success()), put(showSuccess(true))]);
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
      put(showSuccess(true))
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
      put(showSuccess(true))
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
