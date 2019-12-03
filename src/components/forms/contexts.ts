import { createContext } from 'react';

import { FormContextValue } from './types';

// created a single unique context to be able to
// reuse it, despite of typings
export const FormContext = createContext({} as FormContextValue);
