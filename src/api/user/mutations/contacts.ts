import { request } from 'graphql-request';

import { USER_API } from '../queries';
import { SuccessResponse, UpdateContactArgs } from '../types';

/// ----- GraphQL Template Strings ----- ///

const addContactQuery = /* GraphQL */ `
  mutation add($contactName: String) {
    addContact(contactName: $contactName) {
      success
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

export function addContact(contactName: string): SuccessResponse<'addContact'> {
  return request(USER_API, addContactQuery, { contactName });
}

export function deleteContact(input: string): SuccessResponse<'deleteContact'> {
  return request(USER_API, deleteContactQuery, { input });
}

export function updateContact(
  variables: UpdateContactArgs
): SuccessResponse<'updateContact'> {
  return request(USER_API, updateContactQuery, variables);
}
