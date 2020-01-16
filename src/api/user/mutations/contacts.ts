import { request } from 'graphql-request';

import { USER_API } from '../queries';
import {
  AddContactResponse,
  SuccessResponse,
  UpdateContactArgs
} from '../types';

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

export function addContact(contactName: string): AddContactResponse {
  return request(USER_API, addContactQuery, { contactName });
}

export function deleteContact(input: string): SuccessResponse {
  return request(USER_API, deleteContactQuery, { input });
}

export function updateContact(variables: UpdateContactArgs): SuccessResponse {
  return request(USER_API, updateContactQuery, variables);
}
