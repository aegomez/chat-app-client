import React from 'react';
import { useDispatch } from 'react-redux';

import { FormContainer, Text, Password } from '../forms';
import { loginUser } from '@store/auth/actions';
import { setRedirectToLogin } from '@store/view/actions';
import { LoginUserKeys } from '@api/auth';

/* TBR i18n */
const phrases = {
  home: 'Back to Home',
  title: 'Login below',
  subtitle: `Don't have an account?`,
  link: 'Register.',
  submit: 'Sign In'
};

const Login: React.FC = () => {
  const stateKeys: LoginUserKeys[] = ['nameOrEmail', 'password'];
  const props = {
    action: loginUser.request,
    linkTo: '/register',
    stateKeys,
    phrases
  };

  const dispatch = useDispatch();
  dispatch(setRedirectToLogin(false));

  return (
    <FormContainer {...props}>
      <Text label="Username/Email" name="nameOrEmail" />
      <Password label="Password" name="password" />
    </FormContainer>
  );
};

export { Login };
