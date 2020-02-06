import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useDictionary, useTypedSelector } from '../lib';
import { FormContext, Password, SubmitButton } from '../forms';
import { updatePassword } from '@store/auth/actions';
import { getPasswordErrors } from '@store/auth/selectors';

const m = {
  back: 'Return to Settings',
  title: 'Change password',
  oldPassword: 'Old password',
  newPassword1: 'New password',
  newPassword2: 'Confirm new password',
  submit: 'Submit',
  length: 'Passwords must be 6-99 characters long.',
  noMatch: 'New password and confirmation are different.',
  same: "New password can't be the same as old password.",
  success: 'Password was updated successfully!'
};

interface Props {
  closeHandler: () => void;
}

const ChangePassword: React.FC<Props> = ({ closeHandler }) => {
  const names = [
    'oldPassword' as const,
    'newPassword1' as const,
    'newPassword2' as const
  ];

  // Internal state
  const [values, setValues] = useDictionary(names);
  const [errors, setErrors] = useDictionary(names);

  // Redux state
  const dispatch = useDispatch();
  const isSuccess = useTypedSelector(state => state.auth.successVisible);
  const requestError = useTypedSelector(getPasswordErrors);

  const notification = requestError || (isSuccess ? m.success : null);

  // Not valid if any of the values is empty
  // or any of the errors is not-empty
  const isValid = useMemo(() => {
    return (
      Object.values(values).every(Boolean) &&
      !Object.values(errors).some(Boolean)
    );
  }, [errors, values]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setValues({ [name]: value });

    // Validate field values

    // target.value is compared, since the
    // state may not be updated yet.
    // *Avoid calling setErrors more than
    // once per event.
    if (value.length < 6 || value.length > 99) {
      return setErrors({ [name]: m.length });
    }

    // Some checks are redundant, because
    // the user may change the values in
    // different order.
    if (name === 'oldPassword') {
      return setErrors({
        oldPassword: '',
        newPassword1: value === values.newPassword1 ? m.same : ''
      });
    }
    if (name === 'newPassword1') {
      return setErrors({
        newPassword1: value === values.oldPassword ? m.same : '',
        newPassword2: value !== values.newPassword2 ? m.noMatch : ''
      });
    }
    if (name === 'newPassword2') {
      setErrors({
        newPassword2: value !== values.newPassword1 ? m.noMatch : ''
      });
    }
  }

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    if (isValid && !isSuccess) {
      const payload = {
        newPassword: values.newPassword1,
        oldPassword: values.oldPassword
      };
      dispatch(updatePassword(payload));
    }
  }

  return (
    <>
      {notification ? (
        <div
          className={
            'notification is-marginless ' +
            (isSuccess ? 'is-success' : 'is-danger')
          }
        >
          {notification}
        </div>
      ) : null}
      <div className="form-big">
        <div className="field">
          <a onClick={closeHandler}>
            <span className="icon">
              <FontAwesomeIcon icon="long-arrow-alt-left" />
            </span>
            <span>{m.back}</span>
          </a>
        </div>
        <div className="field">
          <h4 className="title">{m.title}</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <FormContext.Provider value={{ values, errors, handleChange }}>
            <Password label={m.oldPassword} name={names[0]} />
            <Password label={m.newPassword1} name={names[1]} />
            <Password label={m.newPassword2} name={names[2]} />
          </FormContext.Provider>
          <SubmitButton label={m.submit} disabled={!isValid || isSuccess} />
        </form>
      </div>
    </>
  );
};

export { ChangePassword };
