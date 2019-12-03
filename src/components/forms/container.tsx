import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SubmitButton } from './buttons';
import { FormContext } from './contexts';
import { useDictionary } from '../lib';
import { resetErrors } from '@store/auth/actions';
import { getErrors, getSuccessVisible } from '@store/auth/selectors';

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
  const showSuccess = useSelector(getSuccessVisible);
  const errors = useSelector(getErrors, shallowEqual);

  // Clear error messages on first render only
  React.useEffect(() => {
    dispatch(resetErrors());
  }, [dispatch]);

  const buttonProps: ButtonProps = showSuccess
    ? { label: 'OK', customClass: 'is-success' }
    : { label: phrases.submit };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(action(values));
  }

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
