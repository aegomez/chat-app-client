import React from 'react';
import { ButtonProps } from './types';

const SubmitButton: React.FC<ButtonProps> = ({
  label,
  customClass,
  disabled
}) => (
  <div className="field">
    <div className="control">
      <button
        type="submit"
        className={`button is-link ${customClass || ''}`}
        disabled={!!disabled}
      >
        {label}
      </button>
    </div>
  </div>
);

export { SubmitButton };
