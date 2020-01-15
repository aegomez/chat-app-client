import { request } from 'graphql-request';

import { USER_API } from '../queries';
import { AddContactResponse, SuccessResponse, ContactStatus } from '../types';

/// ----- GraphQL Template Strings ----- ///

const addContactQuery = /* GraphQL */ `
  mutation add($contactName: String) {
    addContact(contactName: $contactName) {
      success
      profile
    }
  }
`;

const deleteContactQuery = /* GraphQL */ `
  mutation delete($input: String) {
    deleteContact(input: $input) {
      success
    }
  }
`;

const updateContactQuery = /* GraphQL */ `
  mutation update($targetId: String, $newStatus: ContactStatus) {
    updateContact(targetId: $targetId, newStatus: $newStatus) {
      success
    }
  }
`;

/// ----- API Abstractions ----- ///

export function addContact(variables: {
  contactName: string;
}): AddContactResponse {
  return request(USER_API, addContactQuery, variables);
}

export function deleteContact(variables: { input: string }): SuccessResponse {
  return request(USER_API, deleteContactQuery, variables);
}

export function updateContact(variables: {
  targetId: string;
  newStatus: ContactStatus;
}): SuccessResponse {
  return request(USER_API, updateContactQuery, variables);
}
