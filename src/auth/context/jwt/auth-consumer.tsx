'use client';

import { AuthContext } from './auth-context';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export const AuthConsumer = ({ children }: Props) => {
  return <AuthContext.Consumer>{auth => (auth ? children : null)}</AuthContext.Consumer>;
};
