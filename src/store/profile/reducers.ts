import { createReducer } from 'typesafe-actions';

import {
  getProfile,
  addContact,
  deleteContact,
  updateContact,
  createGroup,
  addGroupMember,
  deleteGroupMember,
  updateAvatar,
  updatePublicName,
  updateLanguage,
  failRequest
} from './actions';
import { UserSchema } from '@api/user';

const initialState: UserSchema & {
  failureVisible: boolean;
} = {
  _id: '',
  avatar: 'img/user.png',
  connected: true,
  contacts: [],
  groups: [],
  language: 'en',
  lastConnection: 0,
  publicName: 'alias',
  userName: 'username',
  failureVisible: false
};

export const profileReducer = createReducer(initialState)
  // Copy the payload as the full profile state
  .handleAction(getProfile.success, (_state, action) => ({
    ...action.payload,
    failureVisible: false
  }))

  // Contacts actions

  // Clone the contacts array and insert a new entry.
  .handleAction(addContact.success, (state, action) => {
    const { conversation, profile } = action.payload;
    const contacts: UserSchema['contacts'] = [
      ...state.contacts,
      {
        conversation,
        ref: profile,
        status: 'pending'
      }
    ];
    return { ...state, contacts };
  })

  // Find and delete an entry from the contacts array.
  .handleAction(deleteContact.success, (state, action) => {
    const contacts = state.contacts.slice();
    const index = contacts.findIndex(obj => obj.ref._id === action.payload);
    if (index < 0) {
      return state;
    }
    contacts.splice(index, 1);
    return { ...state, contacts };
  })

  // Find an entry in the contacts array,
  // and update its status value.
  .handleAction(updateContact.success, (state, action) => {
    const { newStatus, targetId } = action.payload;
    const contacts = state.contacts.slice();
    const found = contacts.find(obj => obj.ref._id === targetId);
    if (!found) {
      return state;
    }
    found.status = newStatus;
    return { ...state, contacts };
  })

  // Groups actions

  // Clone the groups array and insert a new
  // entry, with the user as its only member.
  .handleAction(createGroup.success, (state, action) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { contacts, failureVisible, language, groups, ...userProps } = state;
    const newGroups: UserSchema['groups'] = [
      ...groups,
      {
        ref: {
          ...action.payload,
          members: [userProps]
        },
        joined: Date.now()
      }
    ];
    return { ...state, groups: newGroups };
  })

  // Find a group by id and, if it exists, add a new member.
  .handleAction(addGroupMember.success, (state, action) => {
    const { groupId, ...newMember } = action.payload;
    const groups = state.groups.slice();
    const found = groups.find(obj => obj.ref._id === groupId);
    if (!found) {
      return state;
    }
    found.ref.members.push(newMember);
    return { ...state, groups };
  })

  // Find a group and one of its members by id.
  // If both exist, remove the member from group.
  .handleAction(deleteGroupMember.success, (state, action) => {
    const { groupId, userId } = action.payload;
    const groups = state.groups.slice();
    const foundGroup = groups.find(obj => obj.ref._id === groupId);
    if (!foundGroup) {
      return state;
    }
    const members = foundGroup.ref.members;
    const userIndex = members.findIndex(obj => obj._id === userId);
    if (userIndex < 0) {
      return state;
    }
    members.splice(userIndex, 1);
    return { ...state, groups };
  })

  // User settings actions

  // Update the `avatar` url.
  .handleAction(updateAvatar.success, (state, action) => ({
    ...state,
    avatar: action.payload
  }))

  // Update the `language` setting.
  .handleAction(updateLanguage.success, (state, action) => ({
    ...state,
    language: action.payload
  }))

  // Update the `publicName` string.
  .handleAction(updatePublicName.success, (state, action) => ({
    ...state,
    publicName: action.payload
  }))

  // After a getUserProfile failed request,
  // reset the state.
  .handleAction(getProfile.failure, () => initialState)

  // After any other request failure,
  // show a notification.
  .handleAction(failRequest, (state, action) => ({
    ...state,
    failureVisible: action.payload
  }));
