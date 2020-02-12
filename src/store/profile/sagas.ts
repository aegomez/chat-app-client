import { all, delay, fork, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { call, retry, select } from 'typed-redux-saga';

import * as actions from './actions';
import { showModal, showSuccess, showNotification } from '../view/actions';
import { logoutUser } from '../auth/actions';
import { NO_SUCCESS, handleErrorSaga } from '../errorHandler';
import { getUserId } from './selectors';

import * as api from '@api/user';
import { clearLoggedInFlag } from '@api/browser/storage';

// User Profile

// This saga's flow is slightly different,
// since its required for the app initialization.
function* getProfileSaga(): SagaIterator {
  try {
    // Take the action and show the loading overlay
    // while waiting for a successful response.
    yield put(showModal('loadingProfile'));
    // Try to fetch the API 3 times, with a 10
    // seconds interval between calls.
    const { getUserProfile, error } = yield* retry(
      3,
      10000,
      api.getUserProfile
    );

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

function* addContactSaga(
  action: ReturnType<typeof actions.addContact.request>
): SagaIterator {
  try {
    const { addContact, error } = yield* call(api.addContact, action.payload);

    if (addContact?.success) {
      yield all([put(actions.addContact.success()), put(showSuccess(true))]);
    } else {
      throw Error(error || NO_SUCCESS);
    }
  } catch (err) {
    yield* call(handleErrorSaga, err);
  }
}

function* deleteContactSaga(
  action: ReturnType<typeof actions.deleteContact.request>
): SagaIterator {
  try {
    const { deleteContact, error } = yield* call(
      api.deleteContact,
      action.payload
    );

    if (deleteContact?.success) {
      yield put(actions.deleteContact.success(action.payload));
    } else {
      throw Error(error || NO_SUCCESS);
    }
  } catch (err) {
    yield* call(handleErrorSaga, err);
  }
}

function* updateContactSaga(
  action: ReturnType<typeof actions.updateContact.request>
): SagaIterator {
  try {
    const { updateContact, error } = yield* call(
      api.updateContact,
      action.payload
    );

    if (updateContact?.success) {
      yield put(actions.updateContact.success(action.payload));
    } else {
      throw Error(error || NO_SUCCESS);
    }
  } catch (err) {
    yield* call(handleErrorSaga, err);
  }
}

// Groups

function* createGroupSaga(
  action: ReturnType<typeof actions.createGroup.request>
): SagaIterator {
  try {
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
  } catch (err) {
    yield* call(handleErrorSaga, err);
  }
}

function* addGroupMemberSaga(
  action: ReturnType<typeof actions.addGroupMember.request>
): SagaIterator {
  try {
    const { addGroupMember, error } = yield* call(
      api.addGroupMember,
      action.payload
    );

    if (addGroupMember?.success) {
      yield put(
        actions.addGroupMember.success({
          groupId: action.payload.groupId,
          ...addGroupMember.newMember
        })
      );
      yield put(showNotification('success'));
      yield delay(2500);
      yield put(showNotification('none'));
    } else {
      throw Error(error || NO_SUCCESS);
    }
  } catch (err) {
    yield* call(handleErrorSaga, err);
  }
}

function* leaveGroupSaga(
  action: ReturnType<typeof actions.leaveGroup.request>
): SagaIterator {
  try {
    const userId = yield* select(getUserId);
    const { deleteGroupMember, error } = yield* call(api.deleteGroupMember, {
      groupId: action.payload,
      userId
    });

    if (deleteGroupMember?.success) {
      yield all([
        put(actions.leaveGroup.success(action.payload)),
        put(showModal('none'))
      ]);
    } else {
      throw Error(error || NO_SUCCESS);
    }
  } catch (err) {
    yield* call(handleErrorSaga, err);
  }
}

// User Settings

function* updateAvatarSaga(
  action: ReturnType<typeof actions.updateAvatar.request>
): SagaIterator {
  try {
    const { updateUserAvatar, error } = yield* call(
      api.updateUserAvatar,
      action.payload
    );

    if (updateUserAvatar?.success) {
      yield all([
        put(actions.updateAvatar.success(action.payload)),
        put(showSuccess(true))
      ]);
    } else {
      throw Error(error || NO_SUCCESS);
    }
  } catch (err) {
    yield* call(handleErrorSaga, err);
  }
}

function* updateLanguageSaga(
  action: ReturnType<typeof actions.updateLanguage.request>
): SagaIterator {
  try {
    const { updateUserLanguage, error } = yield* call(
      api.updateUserLanguage,
      action.payload
    );

    if (updateUserLanguage?.success) {
      yield put(actions.updateLanguage.success(action.payload));
    } else {
      throw Error(error || NO_SUCCESS);
    }
  } catch (err) {
    yield* call(handleErrorSaga, err);
  }
}

function* updatePublicNameSaga(
  action: ReturnType<typeof actions.updatePublicName.request>
): SagaIterator {
  try {
    const { updateUserPublicName, error } = yield* call(
      api.updateUserPublicName,
      action.payload
    );

    if (updateUserPublicName?.success) {
      yield put(actions.updatePublicName.success(action.payload));
    } else {
      throw Error(error || NO_SUCCESS);
    }
  } catch (err) {
    yield* call(handleErrorSaga, err);
  }
}

export function* watchProfileSagas(): SagaIterator<void> {
  yield all([
    takeEvery(actions.getProfile.request, getProfileSaga),
    takeEvery(actions.addContact.request, addContactSaga),
    takeEvery(actions.deleteContact.request, deleteContactSaga),
    takeEvery(actions.updateContact.request, updateContactSaga),
    takeEvery(actions.createGroup.request, createGroupSaga),
    takeEvery(actions.addGroupMember.request, addGroupMemberSaga),
    takeEvery(actions.leaveGroup.request, leaveGroupSaga),
    takeEvery(actions.updateAvatar.request, updateAvatarSaga),
    takeEvery(actions.updateLanguage.request, updateLanguageSaga),
    takeEvery(actions.updatePublicName.request, updatePublicNameSaga)
  ]);
}
