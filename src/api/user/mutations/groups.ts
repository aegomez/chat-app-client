import request from 'graphql-request';

import { USER_API } from '../queries';
import {
  CreateGroupResponse,
  SuccessResponse,
  CreateGroupArgs,
  UpdateGroupArgs,
  AddMemberResponse
} from '../types';

/// ----- GraphQL Template Strings ----- ///

const createGroupQuery = /* GraphQL */ `
  mutation create($name: String, $avatar: String) {
    createGroup(name: $name, avatar: $avatar) {
      success
      _id
      conversation
    }
  }
`;

const addGroupMemberQuery = /* GraphQL */ `
  mutation add($groupId: String, $userId: String) {
    addGroupMember(groupId: $groupId, userId: $userId) {
      success
      newMember {
        _id
        avatar
        connected
        lastConnection
        publicName
        userName
      }
    }
  }
`;

const deleteGroupMemberQuery = /* GraphQL */ `
  mutation delete($groupId: String, $userId: String) {
    deleteGroupMember(groupId: $groupId, userId: $userId) {
      success
    }
  }
`;

/// ----- API Abstractions ----- ///

export function createGroup(variables: CreateGroupArgs): CreateGroupResponse {
  return request(USER_API, createGroupQuery, variables);
}

export function addGroupMember(variables: UpdateGroupArgs): AddMemberResponse {
  return request(USER_API, addGroupMemberQuery, variables);
}

export function deleteGroupMember(
  variables: UpdateGroupArgs
): SuccessResponse<'deleteGroupMember'> {
  return request(USER_API, deleteGroupMemberQuery, variables);
}
