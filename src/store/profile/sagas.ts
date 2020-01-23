import { put, delay, all, takeEvery, fork } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { call } from 'typed-redux-saga';

import * as actions from './actions';
import * as api from '@api/user';
import { clearLoggedInFlag } from '@api/browser/storage';
import { failRequest } from '@store/view/actions';

// Show error to user for 3 seconds, then hide it
function* handleErrorSaga(): SagaIterator {
  yield put(failRequest(true));
  yield delay(3000);
  yield put(failRequest(false));
}

// User Profile

function* getProfileSaga(): SagaIterator {
  const { getUserProfile: data } = yield* call(api.getUserProfile);

  if (data?.success) {
    yield put(actions.getProfile.success(data.profile));
  } else {
    yield* call(handleErrorSaga);
  }
}

// Contacts

function* addContactSaga(
  action: ReturnType<typeof actions.addContact.request>
): SagaIterator {
  const { addContact: data } = yield* call(api.addContact, action.payload);

  if (data?.success) {
    yield put(actions.addContact.success(data));
  } else {
    yield fork(clearLoggedInFlag);
    yield* call(handleErrorSaga);
  }
}

function* deleteContactSaga(
  action: ReturnType<typeof actions.deleteContact.request>
): SagaIterator {
  const { payload } = action;
  const { deleteContact: data } = yield* call(api.deleteContact, payload);

  if (data?.success) {
    yield put(actions.deleteContact.success(payload));
  } else {
    yield* call(handleErrorSaga);
  }
}

function* updateContactSaga(
  action: ReturnType<typeof actions.updateContact.request>
): SagaIterator {
  const { payload } = action;
  const { updateContact: data } = yield* call(api.updateContact, payload);

  if (data?.success) {
    yield put(actions.updateContact.success(payload));
  } else {
    yield* call(handleErrorSaga);
  }
}

// Groups

function* createGroupSaga(
  action: ReturnType<typeof actions.createGroup.request>
): SagaIterator {
  const { createGroup: data } = yield* call(api.createGroup, action.payload);

  if (data?.success) {
    const { _id, conversation } = data;
    yield put(
      actions.createGroup.success({ _id, conversation, ...action.payload })
    );
  } else {
    yield* call(handleErrorSaga);
  }
}

function* addGroupMemberSaga(
  action: ReturnType<typeof actions.addGroupMember.request>
): SagaIterator {
  const { payload } = action;
  const { addGroupMember: data } = yield* call(api.addGroupMember, payload);

  if (data?.success) {
    yield put(
      actions.addGroupMember.success({
        groupId: action.payload.groupId,
        ...data.newMember
      })
    );
  } else {
    yield* call(handleErrorSaga);
  }
}

function* deleteGroupMemberSaga(
  action: ReturnType<typeof actions.deleteGroupMember.request>
): SagaIterator {
  const { payload } = action;
  const { deleteGroupMember: data } = yield* call(
    api.deleteGroupMember,
    payload
  );

  if (data?.success) {
    yield put(actions.deleteGroupMember.success(payload));
  } else {
    yield* call(handleErrorSaga);
  }
}

// User Settings

function* updateAvatarSaga(
  action: ReturnType<typeof actions.updateAvatar.request>
): SagaIterator {
  const { payload } = action;
  const { updateUserAvatar: data } = yield* call(api.updateUserAvatar, payload);

  if (data?.success) {
    yield put(actions.updateAvatar.success(payload));
  } else {
    yield* call(handleErrorSaga);
  }
}

function* updateLanguageSaga(
  action: ReturnType<typeof actions.updateLanguage.request>
): SagaIterator {
  const { payload } = action;
  const { updateUserLanguage: data } = yield* call(
    api.updateUserLanguage,
    payload
  );

  if (data?.success) {
    yield put(actions.updateLanguage.success(payload));
  } else {
    yield* call(handleErrorSaga);
  }
}

function* updatePublicNameSaga(
  action: ReturnType<typeof actions.updatePublicName.request>
): SagaIterator {
  const { payload } = action;
  const { updateUserPublicName: data } = yield* call(
    api.updateUserPublicName,
    payload
  );

  if (data?.success) {
    yield put(actions.updatePublicName.success(payload));
  } else {
    yield* call(handleErrorSaga);
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
    takeEvery(actions.deleteGroupMember.request, deleteGroupMemberSaga),
    takeEvery(actions.updateAvatar.request, updateAvatarSaga),
    takeEvery(actions.updateLanguage.request, updateLanguageSaga),
    takeEvery(actions.updatePublicName.request, updatePublicNameSaga)
  ]);
}
