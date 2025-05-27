'use client';

import { useContext } from 'react';

import { AuthContext } from '../context/jwt/auth-context';

// ----------------------------------------------------------------------

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};
