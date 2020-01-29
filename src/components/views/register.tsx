import React from 'react';
import { Redirect } from 'react-router';

import { FormContainer, Text, Email, Password } from '../forms';
import { useTypedSelector } from '../lib';
import { registerUser } from '@store/auth/actions';
import { RegisterUserKeys } from '@api/auth';

/* TBR i18n */
const phrases = {
  home: 'Back to Home',
  title: 'Register below',
  subtitle: 'Already have an account?',
  link: 'Login.',
  submit: 'Sign Up'
};

const Register: React.FC = () => {
  const stateKeys: RegisterUserKeys[] = [
    'email',
    'name',
    'password',
    'password2'
  ];
  const props = {
    action: registerUser.request,
    linkTo: '/login',
    stateKeys,
    phrases
  };

  const redirect = useTypedSelector(state => state.view.redirectToLogin);

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <FormContainer {...props}>
      <Text label="Username" name="name" />
      <Email label="Email" name="email" />
      <Password label="Password" name="password" />
      <Password label="Confirm Password" name="password2" />
    </FormContainer>
  );
};

export { Register };
