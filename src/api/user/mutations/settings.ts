import request from 'graphql-request';

import { USER_API } from '../queries';
import { SuccessResponse, UserLanguage } from '../types';

/// ----- GraphQL Template Strings ----- ///

const updateUserAvatarQuery = /* GraphQL */ `
  mutation avatar($input: String) {
    updateUserAvatar(input: $input) {
      success
    }
  }
`;

// Not implemented for the client
// const updateUserConnectedQuery = /* GraphQL */ `
//   mutation connected($status: Boolean) {
//     updateUserConnected(status: $status) {
//       success
//     }
//   }
// `;

const updateUserLanguageQuery = /* GraphQL */ `
  mutation language($newLanguage: UserLanguageEnum) {
    updateUserLanguage(newLanguage: $newLanguage) {
      success
    }
  }
`;

const updateUserPublicNameQuery = /* GraphQL */ `
  mutation publicName($input: String) {
    updateUserPublicName(input: $input) {
      success
    }
  }
`;

/// ----- API Abstractions ----- ///

export function updateUserAvatar(input: string): SuccessResponse {
  return request(USER_API, updateUserAvatarQuery, { input });
}

// Not implemented for the client
// export function updateUserConnected(status: boolean): SuccessResponse {
//   return request(USER_API, updateUserConnectedQuery, { status });
// }

export function updateUserLanguage(newLanguage: UserLanguage): SuccessResponse {
  return request(USER_API, updateUserLanguageQuery, { newLanguage });
}

export function updateUserPublicName(input: string): SuccessResponse {
  return request(USER_API, updateUserPublicNameQuery, { input });
}
