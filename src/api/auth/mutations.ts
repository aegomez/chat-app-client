import { request } from 'graphql-request';
import { UpdatePasswordSchema, UpdatePasswordResponse } from './types';

export function updatePassword(
  variables: UpdatePasswordSchema
): Promise<UpdatePasswordResponse> {
  const updatePasswordQuery = /* GraphQL */ `
    mutation password($oldPassword: String, $newPassword: String) {
      updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
        success
        error
      }
    }
  `;

  return request('/api/auth', updatePasswordQuery, variables);
}
