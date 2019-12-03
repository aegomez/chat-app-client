import { ChangeEvent } from 'react';
import { PayloadActionCreator } from 'typesafe-actions';

import { Dictionary } from '../lib/types';
import { RootAction } from '@store/types';

/* Common types */

// Context
export interface FormContextValue {
  values: Dictionary<string>;
  errors: Dictionary<string, string | null | undefined>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

/* Component props */

// Form elements' types

export interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: PayloadActionCreator<RootAction['type'], any>;
  linkTo: string;
  stateKeys: string[];
  phrases: {
    home: string;
    title: string;
    subtitle: string;
    link: string;
    submit: string;
  };
}

export interface ControlProps {
  label: string;
  name: string;
}

export interface InputProps extends ControlProps {
  type: 'text' | 'email' | 'password';
  icon: 'user' | 'envelope' | 'lock';
}

export interface ButtonProps {
  label: string;
  customClass?: string;
}
