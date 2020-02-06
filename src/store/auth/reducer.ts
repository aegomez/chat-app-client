import { createReducer } from 'typesafe-actions';

import {
  loginUser,
  registerUser,
  logoutUser,
  resetErrors,
  showAuthSuccess,
  failPassword
} from './actions';
import { getProfile } from '../profile/actions';
import { getLoggedInFlag } from '@api/browser/storage';
import { RegisterUserErrors, LoginUserErrors } from '@api/auth';

const initialState = {
  isAuthenticated: getLoggedInFlag(),
  successVisible: false,
  errors: {} as Partial<LoginUserErrors & RegisterUserErrors>
};

export const authReducer = createReducer(initialState)
  .handleAction(loginUser.success, state => ({
    ...state,
    isAuthenticated: true,
    errors: { nameOrEmail: null, password: null }
  }))
  .handleAction(registerUser.success, state => ({
    ...state,
    successVisible: true,
    errors: {
      name: null,
      email: null,
      password: null,
      password2: null
    }
  }))
  .handleAction([loginUser.failure, registerUser.failure], (state, action) => ({
    ...state,
    errors: action.payload
  }))
  .handleAction([logoutUser.success, getProfile.failure], state => ({
    ...state,
    isAuthenticated: false,
    successVisible: false,
    errors: {}
  }))
  .handleAction(resetErrors, state => ({ ...state, errors: {} }))
  .handleAction(showAuthSuccess, (state, action) => ({
    ...state,
    successVisible: action.payload,
    errors: {}
  }))
  .handleAction(failPassword, (state, action) => ({
    ...state,
    errors: {
      password: action.payload
    }
  }));
