'use client';

import { GuestGuard } from '@/auth';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <GuestGuard>
      <div className='min-h-screen bg-gray-50'>{children}</div>
    </GuestGuard>
  );
};

export default AuthLayout;
