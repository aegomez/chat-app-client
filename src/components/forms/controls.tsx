import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FormContext } from './contexts';
import { InputProps, ControlProps } from './types';

const InputControl: React.FC<InputProps> = ({ type, label, name, icon }) => {
  const {
    values: { [name]: value },
    errors: { [name]: error },
    handleChange: onChange
  } = useContext(FormContext);

  let className = 'input';
  let rightIcon: JSX.Element | null = null;
  let help = '';

  if (error === null) {
    className += ' is-success';
    rightIcon = <FontAwesomeIcon icon="check" />;
  } else if (error) {
    className += ' is-danger';
    rightIcon = <FontAwesomeIcon icon="exclamation-triangle" />;
    help = error;
  }

  const inputProps = { type, name, value, className, onChange };

  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control has-icons-left has-icons-right">
        <input {...inputProps} />
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={icon} />
        </span>
        <span className="icon is-small is-right">{rightIcon}</span>
        <p className="help is-danger">{help}</p>
      </div>
    </div>
  );
};

const Text: React.FC<ControlProps> = props => (
  <InputControl type="text" icon="user" {...props} />
);

const Email: React.FC<ControlProps> = props => (
  <InputControl type="email" icon="envelope" {...props} />
);

const Password: React.FC<ControlProps> = props => (
  <InputControl type="password" icon="lock" {...props} />
);

export { Text, Email, Password };
