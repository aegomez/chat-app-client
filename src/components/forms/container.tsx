import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SubmitButton } from './buttons';
import { FormContext } from './contexts';
import { useDictionary, useTypedSelector } from '../lib';
import { resetErrors } from '@store/auth/actions';
import { getAuthErrors } from '@store/auth/selectors';

import { FormProps, ButtonProps } from './types';

const FormContainer: React.FC<FormProps> = ({
  children,
  action,
  linkTo,
  phrases,
  stateKeys
}) => {
  // Internal state hooks
  const [values, setValues] = useDictionary(stateKeys);

  // react-redux hooks
  const dispatch = useDispatch();
  const isSuccess = useTypedSelector(state => state.auth.successVisible);
  // Server-side validation errors
  const errors = useSelector(getAuthErrors);

  // Clear error messages on first render only
  React.useEffect(() => {
    dispatch(resetErrors());
  }, [dispatch]);

  // Validate that all fields are not-empty
  const isValid = useMemo(() => {
    return Object.values(values).every(Boolean);
  }, [values]);

  // Disable the submit button if client-side
  // validation is not passed.
  const buttonProps: ButtonProps = isSuccess
    ? { label: 'OK', customClass: 'is-success' }
    : { label: phrases.submit, disabled: !isValid };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    // Dispatch the action if field values are
    // valid, and we are not in the success
    // state (request already resolved).
    if (isValid && !isSuccess) {
      dispatch(action(values));
    }
  }

  // Control input components
  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setValues({ [name]: value });
  }

  return (
    <section className="card section form-big">
      <div className="field">
        <Link to="/">
          <span className="icon">
            <FontAwesomeIcon icon="long-arrow-alt-left" />
          </span>
          <span>{phrases.home}</span>
        </Link>
      </div>
      <div className="field">
        <h4 className="title">{phrases.title}</h4>
        <p className="subtitle is-6">
          {phrases.subtitle} <Link to={linkTo}>{phrases.link}</Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <FormContext.Provider value={{ values, errors, handleChange }}>
          {children}
        </FormContext.Provider>
        <SubmitButton {...buttonProps} />
      </form>
    </section>
  );
};

export { FormContainer };
