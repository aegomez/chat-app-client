import { request } from 'graphql-request';

import { UserProfileResponse } from './types';

const getUserProfileQuery = /* GraphQL */ `
  query {
    getUserProfile {
      success
      profile {
        _id
        avatar
        connected
        language
        lastConnection
        publicName
        userName
        contacts {
          ref {
            _id
            avatar
            connected
            lastConnection
            publicName
            userName
          }
          conversation
          status
        }
        groups {
          ref {
            members {
              _id
              avatar
              publicName
              userName
            }
            _id
            avatar
            conversation
            name
          }
          joined
        }
      }
    }
  }
`;

export const USER_API = '/api/user';

export function getUserProfile(): UserProfileResponse {
  return request(USER_API, getUserProfileQuery);
}
