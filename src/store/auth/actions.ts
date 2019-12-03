import { createAsyncAction, createAction } from 'typesafe-actions';

import {
  LoginUserErrors,
  LoginUserSchema,
  RegisterUserErrors,
  RegisterUserSchema
} from '@api/auth';

// Async action creators

export const loginUser = createAsyncAction(
  'LOGIN_USER_REQUEST',
  'LOGIN_USER_SUCCESS',
  'LOGIN_USER_FAILURE'
)<LoginUserSchema, undefined, LoginUserErrors>();

export const registerUser = createAsyncAction(
  'REGISTER_USER_REQUEST',
  'REGISTER_USER_SUCCESS',
  'REGISTER_USER_FAILURE'
)<RegisterUserSchema, undefined, RegisterUserErrors>();

export const logoutUser = createAsyncAction(
  'LOGOUT_USER_REQUEST',
  'LOGOUT_USER_SUCCESS',
  'LOGOUT_USER_FAILURE'
)<undefined, undefined, undefined>();

// Standard action creators

export const resetErrors = createAction('RESET_AUTH_ERRORS')<undefined>();
export const showRegisterSuccess = createAction('SHOW_SUCCESS_MODAL')<
  boolean
>();
