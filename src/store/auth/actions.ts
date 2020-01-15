import { createAsyncAction, createAction } from 'typesafe-actions';

import {
  LoginUserErrors,
  LoginUserSchema,
  RegisterUserErrors,
  RegisterUserSchema
} from '@api/auth';

// Async action creators

export const loginUser = createAsyncAction(
  'auth/loginUser/request',
  'auth/loginUser/success',
  'auth/loginUser/failure'
)<LoginUserSchema, undefined, LoginUserErrors>();

export const registerUser = createAsyncAction(
  'auth/registerUser/request',
  'auth/registerUser/success',
  'auth/registerUser/failure'
)<RegisterUserSchema, undefined, RegisterUserErrors>();

export const logoutUser = createAsyncAction(
  'auth/logoutUser/request',
  'auth/logoutUser/success',
  'auth/logoutUser/failure'
)<undefined, undefined, undefined>();

// Standard action creators

export const resetErrors = createAction('auth/resetErrors')<undefined>();
export const showRegisterSuccess = createAction('auth/showRegisterSuccess')<
  boolean
>();
