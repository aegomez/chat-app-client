import { createSelector } from 'reselect';

import { RootState } from '@store/types';
import { Dictionary } from 'components/lib/types';

const errorMessages = {
  'name.required': 'Username value is required.',
  'name.length': 'Username must be 1 to 40 characters long.',
  'name.validChars':
    'Username may only contain alphanumeric characters, single hyphens or underscores, and cannot begin or end with an hyphen or underscore.',
  'email.required': 'Email value is required.',
  'email.isEmail': 'Email is invalid.',
  'password.required': 'Password value is required.',
  'password.length': 'Password must be 6 to 99 characters long.',
  'password.unchanged': "Old and new passwords can't be the same.",
  'password.incorrect': 'Incorrect password.',
  'password2.required': 'Confirm password value is required.',
  'password2.isMatch': 'Passwords must match.',
  'nameOrEmail.required': 'Name/Email value is required.',
  'login.incorrect': 'Incorrect username or password',
  'login.service': 'Login service is unavailable.',
  'register.usedName': 'Username is not available.',
  'register.usedEmail': 'Email is already registered.',
  'register.service': 'Registration service is unavailable.',
  unknown: 'Unknown error.'
} as Dictionary<string>;

/**
 * Translate the server errors to help messages
 */
export const getAuthErrors = createSelector(
  (state: RootState) => state.auth.errors,
  errors =>
    Object.keys(errors).reduce((obj, key) => {
      const errorValue = errors[key as keyof typeof errors];
      if (errorValue) {
        obj[key] = errorMessages[errorValue] || errorMessages.unknown;
      }
      return obj;
    }, {} as Dictionary<string>)
);

export const getPasswordErrors = createSelector(
  (state: RootState) => state.auth.errors.password,
  error => (error ? errorMessages[error] || errorMessages.unknown : '')
);
