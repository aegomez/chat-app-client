import { createAsyncAction, createAction } from 'typesafe-actions';

import {
  UserSchema,
  NewContactData,
  UpdateContactArgs,
  CreateGroupArgs,
  NewGroupData,
  UpdateGroupArgs,
  UserLanguage,
  PartialUserSchema
} from '@api/user/types';

// Async action creators

export const getProfile = createAsyncAction(
  'user/getProfile',
  'user/getProfile/success',
  'user/getProfile/failure'
)<undefined, UserSchema, undefined>();

// Request and success action creators

export const addContact = {
  request: createAction('contacts/add')<string>(),
  success: createAction('contacts/add/success')<NewContactData>()
};
export const deleteContact = {
  request: createAction('contacts/delete')<string>(),
  success: createAction('contacts/delete/success')<string>()
};
export const updateContact = {
  request: createAction('contacts/delete')<UpdateContactArgs>(),
  success: createAction('contacts/delete/success')<UpdateContactArgs>()
};

export const createGroup = {
  request: createAction('groups/create')<CreateGroupArgs>(),
  success: createAction('groups/create/success')<
    CreateGroupArgs & NewGroupData
  >()
};
export const addGroupMember = {
  request: createAction('groups/addMember')<UpdateGroupArgs>(),
  success: createAction('groups/addMember/success')<
    PartialUserSchema & { groupId: string }
  >()
};
export const deleteGroupMember = {
  request: createAction('groups/deleteMember')<UpdateGroupArgs>(),
  success: createAction('groups/deleteMember/success')<UpdateGroupArgs>()
};

export const updateAvatar = {
  request: createAction('settings/avatar')<string>(),
  success: createAction('settings/avatar/success')<string>()
};
export const updateLanguage = {
  request: createAction('settings/language')<UserLanguage>(),
  success: createAction('settings/language/success')<UserLanguage>()
};
export const updatePublicName = {
  request: createAction('settings/publicName')<string>(),
  success: createAction('settings/publicName/success')<string>()
};
