import React from 'react';
import { ButtonProps } from './types';

const SubmitButton: React.FC<ButtonProps> = ({ label, customClass }) => (
  <div className="field">
    <div className="control">
      <button type="submit" className={`button is-link ${customClass || ''}`}>
        {label}
      </button>
    </div>
  </div>
);

export { SubmitButton };
