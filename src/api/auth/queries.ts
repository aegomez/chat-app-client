import { request } from 'graphql-request';
import {
  LoginUserSchema,
  RegisterUserSchema,
  LoginResponse,
  RegisterResponse
} from './types';

const loginQuery = /* GraphQL */ `
  mutation loginUser($nameOrEmail: String, $password: String) {
    login(nameOrEmail: $nameOrEmail, password: $password) {
      success
      errors {
        nameOrEmail
        password
      }
    }
  }
`;

const registerQuery = /* GraphQL */ `
  mutation registerUser(
    $name: String
    $email: String
    $password: String
    $password2: String
  ) {
    register(
      name: $name
      email: $email
      password: $password
      password2: $password2
    ) {
      success
      errors {
        name
        email
        password
        password2
      }
    }
  }
`;

export async function login(
  variables: LoginUserSchema
): Promise<LoginResponse> {
  const response = await request<LoginResponse>(
    '/api/auth',
    loginQuery,
    variables
  );
  console.log('>>> authApi loginResult', response);
  return response;
}

export async function register(
  variables: RegisterUserSchema
): Promise<RegisterResponse> {
  const response = await request<RegisterResponse>(
    '/api/auth',
    registerQuery,
    variables
  );
  console.log('>>> authApi registerResult:', response);
  return response;
}
