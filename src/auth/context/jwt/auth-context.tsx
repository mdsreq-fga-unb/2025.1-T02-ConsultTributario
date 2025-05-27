'use client';

import { createContext } from 'react';

import { IAuthContextValue } from '../../../types/auth';

// ----------------------------------------------------------------------

export const AuthContext = createContext<IAuthContextValue | undefined>(undefined);
